import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = path.join(root, 'bin', 'astraforge.js');
function run(args) { return spawnSync(process.execPath, [cli, ...args], { cwd: root, encoding: 'utf8' }); }
test('prints version', () => { const r = run(['--version']); assert.equal(r.status, 0); assert.match(r.stdout.trim(), /^\d+\.\d+\.\d+$/); });
test('lists all 12 skills', () => { const r = run(['list']); assert.equal(r.status, 0); assert.match(r.stdout, /12 skills/); assert.match(r.stdout, /astraforge-core/); });
test('doctor validates package structure', () => { const r = run(['doctor']); assert.equal(r.status, 0, r.stderr + r.stdout); assert.match(r.stdout, /validation passed/); });
test('rejects unknown skill', () => { const dest = path.join(root, '.tmp-test-install'); const r = run(['install', 'not-a-real-skill', '--path', dest]); assert.notEqual(r.status, 0); assert.match(r.stderr, /Unknown skill ID/); fs.rmSync(dest, { recursive: true, force: true }); });
test('installs selected skill into temporary custom directory with resolvable protocols', () => {
  const dest = path.join(root, '.tmp-test-install', 'nested', 'skills');
  fs.rmSync(path.join(root, '.tmp-test-install'), { recursive: true, force: true });
  const r = run(['install', 'astraforge-core', '--path', dest]);
  assert.equal(r.status, 0, r.stderr + r.stdout);
  const installedSkillDir = path.join(dest, 'astraforge-core');
  const skillMdPath = path.join(installedSkillDir, 'SKILL.md');
  assert.ok(fs.existsSync(skillMdPath));
  const skillMd = fs.readFileSync(skillMdPath, 'utf8');
  assert.ok(!skillMd.includes('../../protocols/'), 'installed SKILL.md should not contain ../../protocols/ links');
  const refs = [...skillMd.matchAll(/`([^`]+\.md)`/g)].map(m => m[1]);
  assert.ok(refs.length > 0, 'expected supporting resource references in astraforge-core');
  for (const ref of refs) {
    assert.ok(fs.existsSync(path.join(installedSkillDir, ref)), `expected ${ref} to exist in installed skill directory`);
  }
  fs.rmSync(path.join(root, '.tmp-test-install'), { recursive: true, force: true });
});
