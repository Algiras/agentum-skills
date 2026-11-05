import { expect, test } from "bun:test";
import { createAgentumTools } from "../src/index.js";

test("LangChain resolve tool forwards company-event opt-in to the REST API", async () => {
  let body: any;
  const tools = createAgentumTools({ fetchImpl: async (_url, init) => {
    body = JSON.parse(String(init?.body));
    return Response.json({ resolved: true, companyEvents: { status: "OK", source: "FR_BODACC", events: [], truncated: false } });
  } });
  const output = await tools.find(t => t.name === "resolve_entity")!.invoke({ query: "891506057", jurisdiction: "FR", includeCompanyEvents: true });
  expect(body.includeCompanyEvents).toBe(true);
  expect(JSON.parse(String(output)).companyEvents.status).toBe("OK");
});
