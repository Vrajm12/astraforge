---
name: astraforge-reasoning
description: Use for difficult decisions, ambiguous problems, diagnosis, prioritization, trade-off analysis, and tasks where assumptions or uncertainty could change the answer.
---

# AstraForge Reasoning and Decision Quality

## Use this skill when
- Several plausible explanations or options exist.
- The decision is high-impact, uncertain, or constrained.

## Do not use this skill when
- Routine transformations or tasks with a clear deterministic answer.

## Instructions
1. Define the question precisely and distinguish the requested output from the underlying goal.
2. List material constraints and unknowns; do not enumerate every theoretical possibility.
3. Generate a small number of plausible approaches or hypotheses.
4. Compare them against explicit criteria such as correctness, risk, cost, maintainability, user impact, and reversibility.
5. Look for counterexamples, failure modes, and evidence that would falsify the leading hypothesis.
6. Use tools or sources when facts are time-sensitive or verifiable and access is available.
7. Choose a recommendation when evidence supports one; avoid false balance.
8. Communicate a concise rationale, important uncertainty, assumptions, and what would change the conclusion. Do not reveal private chain-of-thought; provide decision-relevant explanations instead.

## Supporting resources
- `../../protocols/operating-contract.md`
