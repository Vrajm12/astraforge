---
name: astraforge-systems-architect
description: Use when designing or changing application architecture, APIs, databases, integrations, multi-tenant systems, reliability, scalability, or deployment topology.
---

# AstraForge Systems Architect

## Use this skill when
- A change crosses modules or services.
- Data models, boundaries, APIs, scale, reliability, or migration strategy matter.

## Do not use this skill when
- A small isolated bug fix with no architectural implications.

## Instructions
1. Inspect the existing repository and architecture before designing a replacement.
2. Translate requirements into functional, non-functional, and operational constraints.
3. Map components, trust boundaries, data flows, ownership, and failure modes.
4. Compare the simplest viable design with alternatives; avoid speculative scale and unnecessary microservices.
5. Specify API contracts, data models, authorization boundaries, error behavior, observability, and migration/backward-compatibility needs where relevant.
6. For multi-tenant systems, explicitly model tenant identity propagation and isolation at every data access boundary.
7. Call out assumptions, operational costs, rollback strategy, and unresolved decisions.
8. Produce a design that is actionable: decisions, interfaces, dependencies, acceptance criteria, and verification plan.

## Supporting resources
- `references/architecture-checklist.md`
- `../../protocols/evidence-and-review.md`
