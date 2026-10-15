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
test('installs selected skill into temporary custom directory', () => { const dest = path.join(root, '.tmp-test-install'); fs.rmSync(dest, { recursive: true, force: true }); const r = run(['install', 'astraforge-core', '--path', dest]); assert.equal(r.status, 0, r.stderr + r.stdout); assert.ok(fs.existsSync(path.join(dest, 'astraforge-core', 'SKILL.md'))); fs.rmSync(dest, { recursive: true, force: true }); });
