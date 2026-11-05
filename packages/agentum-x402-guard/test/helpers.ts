/** Mock Agentum server implementing the screen_address contract (docs/superpowers/specs/2026-11-05-wallet-agent-guard-design.md). */

export const SANCTIONED_EVM = "0x8576acc5c05d6ce88f4e49bf65bdf0c62f91353c";
export const CLEAN_EVM = "0x2222222222222222222222222222222222222222";

export interface RecordedCall {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: any;
}

export function clearResult(address: string) {
  return {
    sanctioned: false,
    riskLevel: "CLEAR",
    address,
    addressType: "EVM",
    matches: [],
    coverage: { list: "OFAC_SDN", addressesIndexed: 514, lastSyncAt: "2026-11-05T00:00:00.000Z" },
    degraded: false,
    limitations: "Exact match against the official OFAC SDN digital-currency-address entries only; not behavioural or cluster risk.",
  };
}

export function matchResult(address: string) {
  return {
    ...clearResult(address),
    sanctioned: true,
    riskLevel: "EXACT_MATCH",
    matches: [
      {
        listSource: "OFAC_SDN",
        externalId: "OFAC-12345",
        entityName: "EXAMPLE MIXER LLC",
        entityType: "ENTITY",
        chain: "ETH",
        programs: ["CYBER2"],
        remarks: "Digital Currency Address - ETH 0x...",
      },
    ],
  };
}

export function unknownResult(address: string) {
  return {
    ...clearResult(address),
    sanctioned: false,
    riskLevel: "UNKNOWN",
    matches: [],
    coverage: { list: "OFAC_SDN", addressesIndexed: 0, lastSyncAt: null },
    degraded: true,
    degradedReason: "OFAC address index is empty",
  };
}

/** Server that classifies by address (case-insensitive for EVM, like the real one). */
export function screenServer(opts: { unknown?: boolean } = {}) {
  const calls: RecordedCall[] = [];
  const fetchImpl: typeof fetch = async (input, init) => {
    const request = new Request(input, init);
    const headers: Record<string, string> = {};
    request.headers.forEach((v, k) => (headers[k.toLowerCase()] = v));
    const text = await request.text();
    const body = text ? JSON.parse(text) : undefined;
    calls.push({ url: request.url, method: request.method, headers, body });
    if (new URL(request.url).pathname !== "/v1/compliance/screen-address") return new Response("not found", { status: 404 });
    if (opts.unknown) return Response.json(unknownResult(body.address));
    if (body.address.toLowerCase() === SANCTIONED_EVM) return Response.json(matchResult(SANCTIONED_EVM));
    return Response.json(clearResult(body.address.toLowerCase()));
  };
  return { fetchImpl, calls };
}

export function ctx(payTo: string, network = "eip155:8453") {
  return { selectedRequirements: { payTo, network } };
}
