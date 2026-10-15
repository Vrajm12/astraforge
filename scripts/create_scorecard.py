#!/usr/bin/env python3
"""Create a blank CSV scorecard for a repeatable AstraForge evaluation run."""
import argparse, csv, json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', default=str(ROOT / 'evaluations' / 'scorecard.csv'))
args = parser.parse_args()
cases = json.loads((ROOT / 'evaluations' / 'cases.json').read_text(encoding='utf-8'))
fields = [
    'run_id','date','model_version','project_snapshot','skills_enabled','case_id','category',
    'objective_fit_0_4','correctness_0_4','completeness_0_4','evidence_0_4',
    'safety_0_4','maintainability_usability_0_4','efficiency_0_4',
    'critical_safety_failure','fabricated_verification','notes'
]
out = Path(args.output)
out.parent.mkdir(parents=True, exist_ok=True)
with out.open('w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=fields)
    writer.writeheader()
    for case in cases:
        writer.writerow({'case_id':case['id'], 'category':case['category']})
print(f'Created {len(cases)} blank evaluation rows: {out}')
print('Fill scores manually using evaluations/rubric.md; do not treat keyword matching as a quality score.')
