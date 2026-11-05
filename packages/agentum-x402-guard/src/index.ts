/**
 * agentum-x402-guard: pre-payment OFAC address guard for x402 clients.
 *
 * `createAgentumGuard()` returns a function usable as `x402Client.onBeforePaymentCreation(...)`.
 * Before the client signs, it screens the payment's `payTo` address through Agentum's
 * `screen_address` tool and aborts payment creation on an exact OFAC SDN match.
 *
 * The guard only ever handles public addresses. It never sees keys or signatures.
 */

export const VERSION = "0.1.0";
export const DEFAULT_BASE_URL = "https://agentum.asimplek.cloud";
export const DEFAULT_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
export const DEFAULT_TIMEOUT_MS = 10_000;
export const SCREEN_ADDRESS_PATH = "/v1/compliance/screen-address";

/** Structural subset of @x402/core's PaymentCreationContext (no runtime dependency needed). */
export interface GuardPaymentContext {
  selectedRequirements: { payTo: string; network: string };
}

/** Compatible with @x402/core's BeforePaymentCreationHook: return `{ abort: true, reason }` to stop signing. */
export type BeforePaymentCreationHook = (context: GuardPaymentContext) => Promise<void | { abort: true; reason: string }>;

export type ScreenChain = "evm" | "bitcoin" | "tron" | "solana" | "litecoin" | "other";

export interface ScreenAddressMatch {
  listSource?: string;
  externalId?: string;
  entityName?: string;
  entityType?: string;
  chain?: string;
  programs?: string[];
  remarks?: string;
}

export interface ScreenAddressResult {
  sanctioned: boolean;
  riskLevel: "EXACT_MATCH" | "CLEAR" | "UNKNOWN";
  address: string;
  addressType?: string;
  matches?: ScreenAddressMatch[];
  coverage?: { list?: string; addressesIndexed?: number; lastSyncAt?: string | null };
  degraded?: boolean;
  degradedReason?: string;
  limitations?: string;
}

export type GuardWarningKind = "unknown" | "unscreenable" | "error";

export interface GuardWarning {
  kind: GuardWarningKind;
  address: string;
  network: string;
  message: string;
  /** True when payment creation is allowed to continue despite the warning. */
  allowed: boolean;
}

export interface AgentumGuardOptions {
  /** Agentum base URL. Defaults to https://agentum.asimplek.cloud. */
  baseUrl?: string;
  /** Fetch used to call Agentum. Pass your x402 paying fetch to pay for screening; defaults to global fetch. */
  fetchImpl?: typeof fetch;
  /** How long a verdict is cached per normalized address. Defaults to 24 hours. 0 disables caching. */
  cacheTtlMs?: number;
  /** What to do when the address index is empty/unsynced (riskLevel UNKNOWN). Defaults to "allow". */
  onUnknown?: "allow" | "block";
  /** What to do on network errors and non-2xx responses. Defaults to "open" (allow + warning). */
  failMode?: "open" | "closed";
  /** Addresses that are never screened (e.g. Agentum's own payTo). */
  skipAddresses?: string[];
  /** Sent as the User-Agent header. Defaults to agentum-x402-guard/<version>. */
  userAgent?: string;
  /** Per-request timeout in milliseconds. Defaults to 10000. */
  timeoutMs?: number;
  /** Called for every degraded path (UNKNOWN verdict, unscreenable address, errors), whether or not payment is allowed. */
  onWarning?: (warning: GuardWarning) => void;
}

const EVM_ADDRESS = /^0x[0-9a-fA-F]{40}$/;

/** EVM addresses compare case-insensitively; every other format is case-sensitive and kept as-is. */
export function normalizeAddress(address: string): string {
  const trimmed = address.trim();
  return EVM_ADDRESS.test(trimmed) ? trimmed.toLowerCase() : trimmed;
}

/** Maps an x402 CAIP-2 network id to the optional `chain` hint of screen_address. */
export function chainHintForNetwork(network: string): ScreenChain | undefined {
  if (network.startsWith("eip155:")) return "evm";
  if (network.startsWith("solana:")) return "solana";
  return undefined;
}

class UnscreenableAddressError extends Error {}

function describeMatch(result: ScreenAddressResult): string {
  const matches = result.matches ?? [];
  const match = matches[0];
  if (!match) return "an entry on the OFAC SDN list";
  const entity = match.entityName ? `"${match.entityName}"` : "a sanctioned entity";
  const list = match.listSource ?? "OFAC_SDN";
  const details = [match.externalId, match.programs?.length ? `programs ${match.programs.join(", ")}` : undefined]
    .filter(Boolean)
    .join("; ");
  const more = matches.length > 1 ? ` (+${matches.length - 1} more match(es))` : "";
  return `${entity} on ${list}${details ? ` (${details})` : ""}${more}`;
}

export function createAgentumGuard(options: AgentumGuardOptions = {}): BeforePaymentCreationHook {
  const baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, "");
  const doFetch: typeof fetch = options.fetchImpl ?? ((input, init) => fetch(input, init));
  const ttl = options.cacheTtlMs ?? DEFAULT_CACHE_TTL_MS;
  const onUnknown = options.onUnknown ?? "allow";
  const failMode = options.failMode ?? "open";
  const userAgent = options.userAgent ?? `agentum-x402-guard/${VERSION}`;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const skip = new Set((options.skipAddresses ?? []).map(normalizeAddress));
  const cache = new Map<string, { expiresAt: number; result: ScreenAddressResult }>();
  const inflight = new Map<string, Promise<ScreenAddressResult>>();

  const warn = (warning: GuardWarning) => {
    try {
      options.onWarning?.(warning);
    } catch {
      // A throwing callback must never break the payment decision.
    }
  };

  async function request(address: string, network: string): Promise<ScreenAddressResult> {
    const chain = chainHintForNetwork(network);
    const response = await doFetch(`${baseUrl}${SCREEN_ADDRESS_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", "User-Agent": userAgent },
      body: JSON.stringify(chain ? { address, chain } : { address }),
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (response.status === 400) {
      throw new UnscreenableAddressError(`Agentum could not screen address ${address} (HTTP 400: not a recognised address format)`);
    }
    if (!response.ok) throw new Error(`Agentum screen_address returned HTTP ${response.status}`);
    const body = (await response.json()) as Partial<ScreenAddressResult> | null;
    const level = body?.riskLevel;
    if (level !== "EXACT_MATCH" && level !== "CLEAR" && level !== "UNKNOWN") {
      throw new Error("Agentum screen_address returned an unexpected response shape");
    }
    return body as ScreenAddressResult;
  }

  function screen(key: string, address: string, network: string): Promise<ScreenAddressResult> {
    const existing = inflight.get(key);
    if (existing) return existing;
    const promise = request(address, network).finally(() => inflight.delete(key));
    inflight.set(key, promise);
    return promise;
  }

  return async ({ selectedRequirements }) => {
    const { payTo, network } = selectedRequirements;
    const key = normalizeAddress(payTo);
    if (skip.has(key)) return;

    let result: ScreenAddressResult | undefined;
    const cached = cache.get(key);
    if (cached && cached.expiresAt > Date.now()) result = cached.result;

    if (!result) {
      try {
        result = await screen(key, payTo.trim(), network);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (error instanceof UnscreenableAddressError) {
          const allowed = onUnknown === "allow";
          warn({ kind: "unscreenable", address: payTo, network, message, allowed });
          return allowed
            ? undefined
            : { abort: true, reason: `Agentum guard blocked payment: ${message} and onUnknown is "block".` };
        }
        const allowed = failMode === "open";
        warn({ kind: "error", address: payTo, network, message, allowed });
        return allowed
          ? undefined
          : {
              abort: true,
              reason: `Agentum guard blocked payment to ${payTo}: sanctions screening unavailable (${message}) and failMode is "closed".`,
            };
      }
      // UNKNOWN verdicts are never cached: the index may be synced a moment later.
      if (ttl > 0 && result.riskLevel !== "UNKNOWN") cache.set(key, { expiresAt: Date.now() + ttl, result });
    }

    if (result.riskLevel === "EXACT_MATCH") {
      return {
        abort: true,
        reason: `Agentum guard blocked payment to ${payTo}: address is an exact match for ${describeMatch(result)}. No payment was signed.`,
      };
    }
    if (result.riskLevel === "UNKNOWN") {
      const allowed = onUnknown === "allow";
      const message = `Agentum could not verify ${payTo} (${result.degradedReason ?? "address index unavailable"}); this is not a CLEAR verdict`;
      warn({ kind: "unknown", address: payTo, network, message, allowed });
      return allowed ? undefined : { abort: true, reason: `Agentum guard blocked payment: ${message} and onUnknown is "block".` };
    }
    return undefined;
  };
}
