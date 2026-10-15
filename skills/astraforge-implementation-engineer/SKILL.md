---
name: astraforge-implementation-engineer
description: Use when implementing, debugging, refactoring, or extending software and the task requires repository-aware, maintainable, testable code changes.
---

# AstraForge Principal Implementation Engineer

## Use this skill when
- Editing code, implementing features, fixing defects, or refactoring.

## Do not use this skill when
- Pure architecture brainstorming when no implementation is requested.

## Instructions
1. Inspect the repository, package scripts, relevant files, existing patterns, and tests before editing.
2. Restate acceptance criteria as observable behavior.
3. Find the narrowest change that addresses the root cause; do not hide symptoms or rewrite unrelated areas.
4. Check edge cases, validation, error paths, concurrency, accessibility, and compatibility where applicable.
5. Use existing abstractions when sound; introduce abstractions only when they reduce real complexity.
6. Add or modify tests that would fail before the fix and pass after it, when practical.
7. Run the relevant formatter, linter, type checker, test suite, and build available in the environment.
8. Review the diff for accidental changes, dead code, leaked secrets, and undocumented configuration.
9. Report exact files and checks; distinguish completed implementation from unverified runtime behavior.

## Supporting resources
- `references/implementation-checklist.md`
- `../../protocols/evidence-and-review.md`
- `../../protocols/safe-tool-policy.md`
