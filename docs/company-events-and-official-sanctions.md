# Company events and direct sanctions feeds

Core implementation merged on 2026-11-05 in [PR #1](https://github.com/Algiras/agentum/pull/1), commit `476c4ee6f38dc49a87717d3ad1bad39a67f74684`. This distribution sync includes the standalone server and SDK support; hosted deployment and new package publication are not yet verified. The original checkout's separate A2A/Glama/Smithery discovery edits are excluded.

## Optional BODACC company notices

The existing REST/MCP `resolve_entity` tool accepts `includeCompanyEvents: true`. The LangChain client, structured tool and raw OpenAI tool schema expose the same option. No new tool or price is introduced.

```json
{
  "query": "891506057",
  "jurisdiction": "FR",
  "includeCompanyEvents": true,
  "checkSanctions": false
}
```

For a resolved French entity with a validated SIREN, `companyEvents` returns `status`, `source`, up to 20 dated notices, and a `truncated` flag. Each notice includes its official BODACC link, publication date, category/type and matching SIREN. `OK` with no events is distinct from `UNAVAILABLE` or `UNSUPPORTED`. Raw upstream errors are not exposed. Notices are requested only on opt-in and fetched after identity-cache lookup; cached identity does not imply cached current event history.

The adapter enforces an exact registry filter, verifies each returned notice's company ID and official URL, bounds the response to 256 KiB, times out and cancels pending body reads. Historical notices never overwrite the entity's registry status or establish beneficial ownership. A live read-only adapter probe returned recent notices for `891506057`; the REST integration is verified with controlled upstream responses, not a deployed backend.

## Direct publisher sanctions ingestion

Default EU FSF, UN Security Council and UK Sanctions List ingestion now reads the publishers' XML/CSV feeds directly. The existing OFAC SDN ingestion remains. This removes the OpenSanctions intermediary from these three default downloads; explicit legacy CSV overrides remain supported.

- XML uses SAX streaming with UTF-8 decoding, rejects DTDs, validates the source root/namespace/structure, limits nesting and per-record size, and requires complete documents.
- UK CSV merges aliases and identifiers by designation ID and requires a nonempty primary name. Empty-name or malformed records cannot become a successful replacement snapshot.
- Existing response-byte limits, retries, attempt fencing, record-count checks and atomic snapshot publication remain. Failure preserves the last good snapshot. Official feed requests default to 120 seconds because an observed EU download exceeded the former 30-second limit.
- Raw downloads are consumed incrementally through generators; accepted canonical entries are still retained until publication. This is not constant-memory ingestion and no production memory benchmark is claimed.
- Live read-only parsing produced 6,269 EU, 1,007 UN and 6,420 UK entries. Counts are observations, not permanent expectations. UK restrictions are preserved in remarks; not every designation has the same legal effect. No non-SDN OFAC lists or new automatic blocking semantics are added.
- Public download access was verified. Publisher reuse terms still need final verification before production release; this document does not assert blanket commercial redistribution rights.

## Verification and recovery

- Main local suite: 246 core, 12 LangChain and 25 Node MCP tests passed. Eight optional database tests skip in that command.
- Dedicated PostgreSQL runs against a disposable local PostgreSQL 17 instance: five snapshot/persistence tests and three payment-ledger tests passed.
- CI now provisions ephemeral PostgreSQL and runs the database files in separate processes. Running both database suites in the full core-test process exhausted the default server's connection limit because repository instances retain pools; the isolated runs avoid pooling interference. Production pool lifecycle/budgeting is not changed by this PR.
- Type checking, LangChain build and whitespace checks passed. Independent review found the pending-reader and empty-primary-name issues; both regressions failed before their fixes and passed afterward.
- Root and SDK lockfiles use public registry URLs. CI checks against reintroducing the private registry used in earlier broken installs.
- No stale Git lock was found. The clean worktree branches from verified `origin/master`; the PR targets `main`, which had 57 reviewed commits pending. That prior backlog is explicitly part of the PR, not a history rewrite or force push.

The user resumed release work after the clean core PR merged. Production health and Railway dashboard navigation timed out during read-only checks; the unsafe environment-replacing release helper was not executed. No production secrets, credentials or signup screenshots were copied into the new worktree.

## Primary sources

- [Official BODACC API and open-data information](https://www.bodacc.fr/pages/donnees-ouvertes-et-api/).
- [EU financial sanctions dataset](https://data.europa.eu/data/datasets/consolidated-list-of-persons-groups-and-entities-subject-to-eu-financial-sanctions?locale=en).
- [UN consolidated list](https://main.un.org/securitycouncil/en/content/un-sc-consolidated-list).
- [Current UK Sanctions List](https://www.gov.uk/government/publications/the-uk-sanctions-list).
