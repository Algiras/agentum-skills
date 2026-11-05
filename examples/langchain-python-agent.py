"""
Example: Python LangChain Agent with Agentum Corporate Entity & Compliance API

Demonstrates how to build a Python LangChain agent that resolves corporate entities across
global registries (UK, Switzerland, Singapore, US, EU) and screens sanctions.

Requirements:
    pip install langchain langchain-openai httpx

Run with:
    export OPENAI_API_KEY="sk-..."
    python examples/langchain-python-agent.py
"""

import json
import os
from typing import Optional
import httpx
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langchain.agents import create_react_agent, AgentExecutor
from langchain_core.prompts import PromptTemplate

AGENTUM_BASE_URL = os.getenv("AGENTUM_URL", "https://agentum.asimplek.cloud")
AGENT_ID = "langchain-python-agent"


@tool
def resolve_entity(query: str, jurisdiction: Optional[str] = None, check_sanctions: bool = False, verify_vat: bool = False) -> str:
    """Authoritative deterministic corporate identity resolution across global national registries
    (UK Companies House, Swiss ZEFIX, Singapore ACRA, US SEC EDGAR, European Registries, and Worldwide GLEIF LEI).
    Resolves registration number, legal form, status, registered address, tax ID, and LEI.
    """
    payload = {
        "query": query,
        "jurisdiction": jurisdiction,
        "checkSanctions": check_sanctions,
        "verifyVat": verify_vat,
    }
    with httpx.Client(timeout=15.0) as client:
        res = client.post(
            f"{AGENTUM_BASE_URL}/v1/entity/resolve",
            headers={"Content-Type": "application/json", "X-Agent-Id": AGENT_ID},
            json=payload,
        )
        res.raise_for_status()
        return json.dumps(res.json(), indent=2)


@tool
def verify_eu_vat(vat_number: str) -> str:
    """Validates any European Union VAT number against the live European Commission VIES database.
    Returns validity, registered legal name, registered address, and request timestamp.
    """
    with httpx.Client(timeout=10.0) as client:
        res = client.post(
            f"{AGENTUM_BASE_URL}/v1/entity/vat-verify",
            headers={"Content-Type": "application/json", "X-Agent-Id": AGENT_ID},
            json={"vatNumber": vat_number},
        )
        res.raise_for_status()
        return json.dumps(res.json(), indent=2)


@tool
def screen_sanctions(name: str, country: Optional[str] = None, threshold: float = 0.75) -> str:
    """Screens companies and individuals against 26,650+ records from the US Treasury OFAC SDN List,
    EU Consolidated Financial Sanctions, and UN Security Council Consolidated List using Cyrillic/Greek
    homoglyph normalization and word-window trigram similarity.
    """
    payload = {"name": name, "country": country, "threshold": threshold}
    with httpx.Client(timeout=10.0) as client:
        res = client.post(
            f"{AGENTUM_BASE_URL}/v1/entity/sanctions-screen",
            headers={"Content-Type": "application/json", "X-Agent-Id": AGENT_ID},
            json=payload,
        )
        res.raise_for_status()
        return json.dumps(res.json(), indent=2)


def main():
    tools = [resolve_entity, verify_eu_vat, screen_sanctions]
    print(f"Loaded {len(tools)} Agentum Python LangChain tools: {[t.name for t in tools]}")

    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("\nNotice: OPENAI_API_KEY is not set. Executing direct tool queries as a test:\n")
        print("1. Resolving Swiss entity 'Nestle SA' via ZEFIX:")
        print(resolve_entity.invoke({"query": "Nestle SA", "jurisdiction": "CH"}))
        print("\n2. Resolving Singapore entity 'Grab Holdings Services' via ACRA:")
        print(resolve_entity.invoke({"query": "Grab Holdings Services", "jurisdiction": "SG"}))
        return

    llm = ChatOpenAI(model="gpt-4o", temperature=0)

    prompt = PromptTemplate.from_template("""Answer the following questions as best you can. You have access to the following tools:

{tools}

Use the following format:

Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question

Begin!

Question: {input}
Thought:{agent_scratchpad}""")

    agent = create_react_agent(llm, tools, prompt)
    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

    query = (
        "Verify 'Revolut Bank UAB' in Lithuania with EU VAT LT100011706713, and 'Nestle' in Switzerland. "
        "Confirm their official registration numbers, check VAT validity, and verify whether either has any sanctions hits."
    )

    result = agent_executor.invoke({"input": query})
    print("\n=== Agent Result ===")
    print(result["output"])


if __name__ == "__main__":
    main()
