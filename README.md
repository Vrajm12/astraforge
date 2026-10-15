# AstraForge — Custom Antigravity Skill System

A model-agnostic skill ecosystem for improving the reliability of reasoning, software engineering, research, design, writing, business analysis, and tool execution in Google Antigravity.

**It does not upgrade the underlying model.** It structures work, reduces avoidable omissions, makes uncertainty visible, and requires evidence for completion claims.

## Package contents

- `skills/`: 12 focused skills, each with a concise `SKILL.md` and optional supporting references.
- `protocols/`: shared operating, safety, and evidence standards.
- `evaluations/`: repeatable scenarios and a lightweight validator.
- `scripts/validate.py`: checks frontmatter, required sections, path references, skill IDs, and evaluation cases using Python's standard library.
- `INSTALL.md`: workspace/global installation guidance and caveats.

## Design principles

1. **Progressive disclosure:** short skill entrypoints; deeper details live in references and protocols.
2. **Evidence over confidence:** distinguish inspected facts, assumptions, and unverified claims.
3. **Plan proportional to risk:** do not force heavyweight plans onto trivial tasks.
4. **Challenge independently:** review work against acceptance criteria, not the builder's confidence.
5. **Safe tool use:** inspect before modifying; ask before consequential or destructive actions when authorization is unclear.
6. **No fake autonomy:** only claim actions actually performed by available tools.
7. **Model-agnostic:** no prompts that pretend to change the model's identity, hidden reasoning, context limit, or capabilities.
8. **Evaluation first:** assess observable outcomes rather than how impressive the response sounds.

## Skill map

| Skill | Primary use |
|---|---|
| `astraforge-core` | Shared operating contract and routing |
| `astraforge-task-router` | Select a proportional workflow and specialist skills |
| `astraforge-reasoning` | Decision quality, uncertainty, trade-offs |
| `astraforge-systems-architect` | Architecture and technical design |
| `astraforge-implementation-engineer` | Feature implementation and debugging |
| `astraforge-adversarial-reviewer` | Independent critique and failure analysis |
| `astraforge-verification-engineer` | Tests, validation, and evidence reports |
| `astraforge-research-integrity` | Source quality, factual research, citations |
| `astraforge-writing-intelligence` | Writing, editing, and communication |
| `astraforge-product-design` | UX, interface systems, accessibility |
| `astraforge-data-ai-engineering` | Data, ML, and AI application work |
| `astraforge-safe-tool-operator` | Shell, filesystem, deployment, and external actions |

## Quick start with the CLI

Once the package is published to npm, the intended commands are:

```bash
npx astraforge-skillkit list
npx astraforge-skillkit install --all
npx astraforge-skillkit install --all --global
npx astraforge-skillkit install astraforge-systems-architect
npx astraforge-skillkit doctor
```

The npm package name must be confirmed as available and published by its owner before
these `npx` commands will work. Until publication, run the CLI locally with
`node bin/astraforge.js ...`.

## How to use it

Copy the desired skill directories into the skill directory recognized by your Antigravity host. See `INSTALL.md`. Start a new agent session so the host can rediscover them.

Use `astraforge-core` as the shared operating contract and install the focused specialists relevant to your work. Do not expect every skill to activate on every task; discovery depends on each skill's description and the host's implementation.

## Validation

Run:

```bash
python scripts/validate.py
```

This is a structural package validator, not a test of Antigravity's actual activation behavior or model quality. To evaluate behavioral quality, use the scenarios in `evaluations/cases.json` with the same model, project, tools, and task before/after installation, and score using `evaluations/rubric.md`.

## Compatibility note

The package uses the directory-based `SKILL.md` convention described in the Antigravity Skill Vault README supplied by the user. This environment cannot inspect the user's local Antigravity installation or install files directly into their machine. No unverified slash commands are referenced. Verify host-specific skill directories and activation behavior locally before deployment.
