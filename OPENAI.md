# Agentum — Global Corporate Entity, VAT & Sanctions Resolver (OpenAI & ChatGPT Integration)

Connect **Agentum** to OpenAI Custom GPTs, ChatGPT Actions, and the OpenAI API.

## 1. ChatGPT Custom GPT (Actions)

To add Agentum as an Action in your Custom GPT:

1. Go to [chatgpt.com/gpts/editor](https://chatgpt.com/gpts/editor) → **Configure**.
2. Scroll to **Actions** → Click **Create new action**.
3. Under **Schema**, select **Import from URL** and paste:
   ```text
   https://agentum.asimplek.cloud/openapi.json
   ```
4. **Authentication:** Set to **None** (Agentum provides 5 free calls/day automatically).
5. **Privacy Policy:** `https://agentum.asimplek.cloud/privacy`
6. Save and publish your Custom GPT.

## 2. OpenAI Plugin Manifest

For platforms supporting the OpenAI Plugin specification:
- **Manifest URL:** `https://agentum.asimplek.cloud/.well-known/ai-plugin.json`
- **OpenAPI Spec:** `https://agentum.asimplek.cloud/openapi.json`

## 3. OpenAI Node.js / Python Function Calling

Using `agentum-langchain`:

```typescript
import { OpenAI } from "openai";
import { getAgentumOpenAITools } from "agentum-langchain";

const openai = new OpenAI();
const tools = getAgentumOpenAITools();

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "Verify vendor Revolut Bank UAB in Lithuania" }],
  tools,
});
```

## Available Tools

1. `resolve_entity`: Deterministic corporate registry lookup worldwide (US SEC, UK Companies House, CH ZEFIX, AU ABR, SG ACRA, EU Registries, Worldwide GLEIF LEI).
2. `verify_eu_vat`: Live European Commission VIES validation with entity linking.
3. `screen_sanctions`: US OFAC SDN, EU Financial Sanctions, and UN Security Council cross-screening.
4. `check_vendor`: 1-shot KYB due diligence returning `APPROVED`, `FLAGGED_FOR_REVIEW`, or `REJECTED`.
5. `verify_bank_payee`: IBAN ISO-13616 Mod-97 verification and country mismatch check.
6. `batch_resolve`: Concurrent resolution for up to 25 companies.
