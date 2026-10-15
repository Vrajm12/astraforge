#!/usr/bin/env python3
"""Structural validator for AstraForge skill package; Python standard library only."""
from pathlib import Path
import json, re, sys
ROOT = Path(__file__).resolve().parents[1]
SKILLS = ROOT / "skills"
errors, warnings = [], []
required_sections = ["## Use this skill when", "## Do not use this skill when", "## Instructions"]
seen_names = set()
for skill_dir in sorted(p for p in SKILLS.iterdir() if p.is_dir()):
    file = skill_dir / "SKILL.md"
    if not file.is_file():
        errors.append(f"{skill_dir.name}: missing SKILL.md")
        continue
    text = file.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        errors.append(f"{file.relative_to(ROOT)}: missing YAML frontmatter")
        continue
    match = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if not match:
        errors.append(f"{file.relative_to(ROOT)}: malformed frontmatter delimiters")
        continue
    fm = match.group(1)
    name_match = re.search(r"^name:\s*([a-z0-9-]+)\s*$", fm, re.M)
    desc_match = re.search(r"^description:\s*(.+)$", fm, re.M)
    if not name_match: errors.append(f"{file.relative_to(ROOT)}: missing/invalid name")
    else:
        name = name_match.group(1)
        if name != skill_dir.name: errors.append(f"{file.relative_to(ROOT)}: name '{name}' does not match directory")
        if name in seen_names: errors.append(f"duplicate skill name: {name}")
        seen_names.add(name)
    if not desc_match or len(desc_match.group(1).strip()) < 20:
        errors.append(f"{file.relative_to(ROOT)}: missing or too-short description")
    for section in required_sections:
        if section not in text: errors.append(f"{file.relative_to(ROOT)}: missing section {section}")
    if len(text.splitlines()) > 100:
        warnings.append(f"{file.relative_to(ROOT)}: {len(text.splitlines())} lines; consider moving detail to references")
    for raw in re.findall(r"`([^`]+)`", text):
        if raw.startswith(("../", "./")) and (skill_dir / raw).resolve().is_relative_to(ROOT):
            target = (skill_dir / raw).resolve()
            if not target.exists(): errors.append(f"{file.relative_to(ROOT)}: broken local reference {raw}")

cases_file = ROOT / "evaluations" / "cases.json"
try:
    cases = json.loads(cases_file.read_text(encoding="utf-8"))
    ids = [case.get("id") for case in cases]
    if len(ids) != len(set(ids)): errors.append("evaluations/cases.json: duplicate case IDs")
    for i, case in enumerate(cases):
        for key in ("id", "category", "prompt", "must_include", "must_not_include"):
            if key not in case: errors.append(f"evaluation case {i}: missing key {key}")
except Exception as exc:
    errors.append(f"Could not parse evaluations/cases.json: {exc}")

print(f"AstraForge structural validation: {len(seen_names)} skill(s)")
print(f"Evaluation cases: {len(cases) if 'cases' in locals() else 'unavailable'}")
for w in warnings: print("WARN:", w)
for e in errors: print("ERROR:", e)
if errors:
    print(f"FAILED: {len(errors)} error(s)")
    sys.exit(1)
print("PASSED: required metadata, sections, local references, and evaluation schema are valid.")
print("NOTE: this does not test Antigravity activation or behavioral quality.")
