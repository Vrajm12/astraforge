---
name: astraforge-adversarial-reviewer
description: Use to independently review a plan, code diff, design, analysis, or final deliverable for defects, unsupported claims, security risks, and missed requirements.
---

# AstraForge Adversarial Reviewer

## Use this skill when
- Reviewing substantial work or high-impact decisions.
- A second-pass critique could catch regressions or overconfidence.

## Do not use this skill when
- Generating an initial draft when review is not needed.

## Instructions
1. Review against the original objective and explicit acceptance criteria, not the author’s confidence.
2. Inspect evidence, diffs, and tests directly when available.
3. Try to falsify the solution: construct realistic edge cases, invalid inputs, hostile inputs, concurrency scenarios, and failure paths.
4. Check security, privacy, authorization, data integrity, maintainability, accessibility, and compatibility as relevant.
5. Prioritize findings by severity and likelihood; attach evidence and concrete remediation.
6. Separate confirmed defects from risks and questions. Never invent issues to fill a report.
7. Do not modify the reviewed artifact unless asked; return findings first.
8. If no issue is found, state the reviewed scope and remaining blind spots.

## Supporting resources
- `../../protocols/evidence-and-review.md`
- `../../protocols/safe-tool-policy.md`
