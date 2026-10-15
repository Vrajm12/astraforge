# Implementation Checklist

Before changes:
- Inspect status, relevant files, conventions, tests, scripts, and dependency versions.
- Confirm acceptance criteria and identify likely regression boundaries.

During changes:
- Fix root cause with a narrow diff.
- Validate inputs and permissions at trust boundaries.
- Preserve compatibility or document intentional breaking changes.
- Handle errors explicitly; avoid swallowing exceptions.
- Add tests for behavior, edge cases, and the original failure.
- Avoid unrelated formatting churn and unrequested dependency changes.

Before completion:
- Inspect the final diff and changed-file list.
- Run targeted tests, then broader checks proportionate to risk.
- Check secrets, logging of sensitive values, accessibility, and migration impact.
- State exactly what passed, failed, or was not run.
