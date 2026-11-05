"""
Example: CrewAI Multi-Agent Compliance Crew with Agentum Tools

Demonstrates a multi-agent team (Compliance Investigator & Risk Officer) using
Agentum tools to autonomously conduct corporate background investigations.

Requirements:
    pip install crewai langchain-community httpx

Run with:
    export OPENAI_API_KEY="sk-..."
    python examples/crewai-due-diligence.py
"""

import json
import os
from typing import Optional
import httpx
from crewai import Agent, Task, Crew, Process
from langchain.tools import tool

AGENTUM_BASE_URL = os.getenv("AGENTUM_URL", "https://agentum.asimplek.cloud")


@tool("resolve_entity")
def resolve_entity(query: str, jurisdiction: Optional[str] = None) -> str:
    """Resolves corporate identity across global national registries (UK, Switzerland,
    Singapore, US, EU, and worldwide GLEIF LEI). Returns legal name, registration number,
    status, and address.
    """
    with httpx.Client(timeout=15.0) as client:
        res = client.post(
            f"{AGENTUM_BASE_URL}/v1/entity/resolve",
            headers={"Content-Type": "application/json", "X-Agent-Id": "crewai-compliance-crew"},
            json={"query": query, "jurisdiction": jurisdiction},
        )
        return json.dumps(res.json(), indent=2)


@tool("screen_sanctions")
def screen_sanctions(name: str, country: Optional[str] = None) -> str:
    """Screens an entity against OFAC SDN, EU Financial Sanctions, and UN Security Council Consolidated lists."""
    with httpx.Client(timeout=10.0) as client:
        res = client.post(
            f"{AGENTUM_BASE_URL}/v1/entity/sanctions-screen",
            headers={"Content-Type": "application/json", "X-Agent-Id": "crewai-compliance-crew"},
            json={"name": name, "country": country, "threshold": 0.75},
        )
        return json.dumps(res.json(), indent=2)


@tool("verify_eu_vat")
def verify_eu_vat(vat_number: str) -> str:
    """Validates an EU VAT number against the live European Commission VIES database."""
    with httpx.Client(timeout=10.0) as client:
        res = client.post(
            f"{AGENTUM_BASE_URL}/v1/entity/vat-verify",
            headers={"Content-Type": "application/json", "X-Agent-Id": "crewai-compliance-crew"},
            json={"vatNumber": vat_number},
        )
        return json.dumps(res.json(), indent=2)


def main():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("Notice: OPENAI_API_KEY is not set. Simulating direct registry lookup:")
        print(resolve_entity.invoke({"query": "53004085616", "jurisdiction": "CH"}))
        return

    # Agent 1: Corporate Investigator
    investigator = Agent(
        role="Senior Corporate Registry Investigator",
        goal="Accurately resolve corporate entities and verify official legal status in national registries.",
        backstory="Expert forensic corporate researcher specialized in international company registries.",
        tools=[resolve_entity, verify_eu_vat],
        verbose=True,
    )

    # Agent 2: Sanctions & Risk Officer
    risk_officer = Agent(
        role="Chief Sanctions & AML Compliance Officer",
        goal="Identify potential sanctions violations, PEP exposures, or high-risk legal structures.",
        backstory="Former international regulator dedicated to protecting financial institutions from illicit counterparties.",
        tools=[screen_sanctions],
        verbose=True,
    )

    # Tasks
    task_investigate = Task(
        description="Verify the corporate identity and registration of 'Grab Holdings' in Singapore and 'Nestle' in Switzerland.",
        expected_output="Detailed registration profile with national ID, status, and jurisdiction for each entity.",
        agent=investigator,
    )

    task_audit = Task(
        description="Screen both verified entities against global sanctions lists and provide a final onboarding recommendation.",
        expected_output="Risk assessment report with sanctions screening results and a clear onboarding decision (APPROVE or REJECT).",
        agent=risk_officer,
    )

    crew = Crew(
        agents=[investigator, risk_officer],
        tasks=[task_investigate, task_audit],
        process=Process.sequential,
        verbose=True,
    )

    result = crew.kickoff()
    print("\n=== CrewAI Due Diligence Report ===")
    print(result)


if __name__ == "__main__":
    main()
