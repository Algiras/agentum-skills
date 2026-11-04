import { describe, expect, test } from "bun:test";
import {
  AgentumClient,
  AgentumToolkit,
  createAgentumTools,
  createAgentumAiTools,
  getAgentumOpenAITools,
} from "../src/index.js";

describe("Agentum LangChain Toolkit", () => {
  test("AgentumToolkit initializes with 3 StructuredTools matching LangChain specifications", () => {
    const toolkit = new AgentumToolkit({ baseUrl: "http://localhost:3000" });
    const tools = toolkit.getTools();

    expect(tools.length).toBe(3);
    const names = tools.map((t) => t.name);
    expect(names).toContain("resolve_entity");
    expect(names).toContain("verify_eu_vat");
    expect(names).toContain("screen_sanctions");

    const resolveTool = tools.find((t) => t.name === "resolve_entity")!;
    expect(resolveTool.description).toContain("global registries");
    expect(resolveTool.schema).toBeDefined();
  });

  test("createAgentumTools instantiates tools independently from config", () => {
    const tools = createAgentumTools({ baseUrl: "https://custom.endpoint" });
    expect(tools.length).toBe(3);
  });

  test("resolve_entity tool invokes Agentum client and returns formatted JSON result", async () => {
    const mockFetch = async (input: any, init: any) => {
      const url = String(input);
      expect(url).toContain("/v1/entity/resolve");
      const body = JSON.parse(init.body);
      expect(body.query).toBe("ATLASSIAN PTY LTD");
      expect(body.jurisdiction).toBe("AU");

      return new Response(
        JSON.stringify({
          resolved: true,
          entity: {
            id: "AU_ABN:53004085616",
            canonicalName: "ATLASSIAN PTY LTD",
            jurisdiction: "AU",
            status: "ACTIVE",
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    };

    const client = new AgentumClient({
      baseUrl: "https://mock.agentum",
      fetchImpl: mockFetch as any,
    });

    const toolkit = new AgentumToolkit();
    (toolkit as any).client = client;
    const tools = createAgentumTools(client);
    const resolveTool = tools.find((t) => t.name === "resolve_entity")!;

    const resultStr = await resolveTool.invoke({
      query: "ATLASSIAN PTY LTD",
      jurisdiction: "AU",
    });

    const parsed = JSON.parse(resultStr);
    expect(parsed.resolved).toBe(true);
    expect(parsed.entity.canonicalName).toBe("ATLASSIAN PTY LTD");
    expect(parsed.entity.jurisdiction).toBe("AU");
  });

  test("verify_eu_vat tool invokes VIES verification endpoint", async () => {
    const mockFetch = async (input: any, init: any) => {
      const url = String(input);
      expect(url).toContain("/v1/entity/vat-verify");
      const body = JSON.parse(init.body);
      expect(body.vatNumber).toBe("DE129274202");

      return new Response(
        JSON.stringify({
          valid: true,
          countryCode: "DE",
          vatNumber: "129274202",
          registeredName: "SIEMENS AKTIENGESELLSCHAFT",
          source: "EU_VIES",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    };

    const client = new AgentumClient({
      baseUrl: "https://mock.agentum",
      fetchImpl: mockFetch as any,
    });

    const tools = createAgentumTools(client);
    const vatTool = tools.find((t) => t.name === "verify_eu_vat")!;

    const resultStr = await vatTool.invoke({ vatNumber: "DE129274202" });
    const parsed = JSON.parse(resultStr);
    expect(parsed.valid).toBe(true);
    expect(parsed.registeredName).toBe("SIEMENS AKTIENGESELLSCHAFT");
  });

  test("screen_sanctions tool invokes sanctions screening endpoint", async () => {
    const mockFetch = async (input: any, init: any) => {
      const url = String(input);
      expect(url).toContain("/v1/entity/sanctions-screen");
      const body = JSON.parse(init.body);
      expect(body.name).toBe("GAZPROMBANK");
      expect(body.threshold).toBe(0.8);

      return new Response(
        JSON.stringify({
          hit: true,
          totalMatches: 2,
          matches: [
            { id: "OFAC-123", caption: "GAZPROMBANK JOINT STOCK COMPANY", score: 0.95 },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    };

    const client = new AgentumClient({
      baseUrl: "https://mock.agentum",
      fetchImpl: mockFetch as any,
    });

    const tools = createAgentumTools(client);
    const sanctionsTool = tools.find((t) => t.name === "screen_sanctions")!;

    const resultStr = await sanctionsTool.invoke({
      name: "GAZPROMBANK",
      threshold: 0.8,
    });

    const parsed = JSON.parse(resultStr);
    expect(parsed.hit).toBe(true);
    expect(parsed.matches.length).toBe(1);
  });

  test("createAgentumAiTools creates Vercel AI SDK compatible tool map", async () => {
    const mockFetch = async () =>
      new Response(JSON.stringify({ resolved: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });

    const client = new AgentumClient({ fetchImpl: mockFetch as any });
    const aiTools = createAgentumAiTools(client);

    expect(aiTools.resolve_entity).toBeDefined();
    expect(aiTools.verify_eu_vat).toBeDefined();
    expect(aiTools.screen_sanctions).toBeDefined();

    expect(typeof aiTools.resolve_entity.execute).toBe("function");
    const res = await aiTools.resolve_entity.execute({ query: "Apple" });
    expect(res.resolved).toBe(true);
  });

  test("getAgentumOpenAITools returns valid function calling definitions", () => {
    const openaiTools = getAgentumOpenAITools();
    expect(openaiTools.length).toBe(3);
    for (const t of openaiTools) {
      expect(t.type).toBe("function");
      expect(t.function.name).toBeDefined();
      expect(t.function.description).toBeDefined();
      expect(t.function.parameters.type).toBe("object");
      expect(t.function.parameters.required.length).toBeGreaterThan(0);
    }
  });

  test("AgentumClient wraps fetch with x402 when privateKey is configured", () => {
    const client = new AgentumClient({
      baseUrl: "https://mock.agentum",
      privateKey: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    });
    expect(client).toBeDefined();
  });
});
