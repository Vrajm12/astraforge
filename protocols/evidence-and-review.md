# Evidence and Independent Review

## Verification ladder
1. Static inspection
2. Formatter/linter/type checker
3. Focused unit tests
4. Integration tests
5. End-to-end/browser/runtime checks
6. Security or performance checks where relevant
7. Deployment/production confirmation only when actually authorized and observed

Use the highest useful level available; do not imply lower levels prove higher ones.

## Independent review procedure
The reviewer receives the task, acceptance criteria, relevant diff, and test results. It should independently search for:
- unmet requirements and edge cases
- data loss, security, privacy, and authorization failures
- regression risk and backward compatibility
- poor error handling, race conditions, and resource leaks
- brittle tests or tests that do not assert the desired behavior
- unverified claims and unnecessary complexity

Report only actionable findings, with severity, evidence, impact, and a specific fix. Do not invent findings to appear rigorous. If no finding is identified, say what was reviewed and what remains outside scope.

## Stop conditions
Do not call work done when a critical acceptance criterion is untested, a high-severity issue remains unresolved, the build fails, or the agent lacks required access. Explain the blocker and provide the safest next action.
