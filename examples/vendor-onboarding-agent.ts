/**
 * Agent Recipe: Automated B2B Vendor Due Diligence & KYB Pipeline
 *
 * Demonstrates how an AI agent autonomously verifies a corporate vendor
 * using Agentum's zero-signup API (with 5 free calls/day + Dual-402 fallback).
 *
 * Run with:
 *   bun run examples/vendor-onboarding-agent.ts
 */

const AGENTUM_URL = process.env.AGENTUM_URL || "https://agentum.asimplek.cloud";

interface VendorInput {
  name: string;
  vatNumber?: string;
  country: string;
}

interface KybReport {
  vendorName: string;
  verdict: "APPROVED" | "FLAGGED_FOR_REVIEW" | "REJECTED";
  confidenceScore: number;
  vatValid: boolean | null;
  lei: string | null;
  sanctionsHit: boolean;
  timestamp: string;
  auditTrail: string[];
}

async function verifyVendor(vendor: VendorInput): Promise<KybReport> {
  const auditTrail: string[] = [];
  auditTrail.push(`[1/3] Initiating KYB resolution for '${vendor.name}' (${vendor.country})...`);

  // Step 1: VAT verification if VAT number is provided
  let vatValid: boolean | null = null;
  if (vendor.vatNumber) {
    auditTrail.push(`[2/3] Validating EU VAT '${vendor.vatNumber}' against European Commission VIES...`);
    const vatRes = await fetch(`${AGENTUM_URL}/v1/entity/vat-verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Agent-Id": "agent-kyb-worker" },
      body: JSON.stringify({ vatNumber: vendor.vatNumber }),
    });
    const vatData = await vatRes.json();
    vatValid = vatData.valid;
    auditTrail.push(`      VIES VAT Valid: ${vatValid} (Name: ${vatData.name || "N/A"})`);
  }

  // Step 2: Canonical corporate entity resolution
  auditTrail.push(`[3/3] Resolving canonical entity and screening global sanctions (OFAC/EU/UN)...`);
  const entityRes = await fetch(`${AGENTUM_URL}/v1/entity/resolve`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Agent-Id": "agent-kyb-worker" },
    body: JSON.stringify({
      query: vendor.name,
      jurisdictionHint: vendor.country,
    }),
  });
  const entityData = await entityRes.json();

  const entity = entityData.entity;
  const compliance = entityData.compliance;
  const isSanctioned = compliance?.sanctioned === true;
  const lei = entity?.lei || null;

  auditTrail.push(`      Canonical Legal Name: ${entity?.canonicalName || vendor.name}`);
  auditTrail.push(`      GLEIF LEI: ${lei || "None"}`);
  auditTrail.push(`      Sanctions Risk: ${compliance?.riskLevel || "CLEAR"} (Hit: ${isSanctioned})`);

  // Compute final compliance verdict
  let verdict: KybReport["verdict"] = "APPROVED";
  if (isSanctioned) {
    verdict = "REJECTED";
  } else if (vatValid === false || entityData.confidence < 0.7) {
    verdict = "FLAGGED_FOR_REVIEW";
  }

  return {
    vendorName: vendor.name,
    verdict,
    confidenceScore: entityData.confidence || 0,
    vatValid,
    lei,
    sanctionsHit: isSanctioned,
    timestamp: new Date().toISOString(),
    auditTrail,
  };
}

// Example execution
async function main() {
  console.log("=============================================================");
  console.log("Agentum Autonomous KYB Due Diligence Pipeline");
  console.log("=============================================================\n");

  const vendor: VendorInput = {
    name: "Siemens AG",
    vatNumber: "DE129274202",
    country: "DE",
  };

  const report = await verifyVendor(vendor);

  console.log(report.auditTrail.join("\n"));
  console.log("\n-------------------------------------------------------------");
  console.log(`FINAL COMPLIANCE VERDICT: [${report.verdict}]`);
  console.log(`Confidence: ${report.confidenceScore * 100}% | LEI: ${report.lei}`);
  console.log("-------------------------------------------------------------\n");
}

main().catch(console.error);
