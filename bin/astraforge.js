#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(here, '..');
const skillsRoot = path.join(packageRoot, 'skills');
const protocolsRoot = path.join(packageRoot, 'protocols');
const version = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8')).version;
const help = `AstraForge — model-agnostic agent skill system

Usage:
  astraforge list
  astraforge install --all [--global | --path <directory>] [--force]
  astraforge install <skill-id> [--global | --path <directory>] [--force]
  astraforge doctor
  astraforge --version
  astraforge --help

Defaults:
  Workspace install: .agents/skills/
  Global install:    ~/.gemini/config/skills/ (Antigravity app/IDE)

Options:
  --all       Install all AstraForge skills
  --global    Install to Antigravity app/IDE global skill directory
  --path DIR  Install into a custom skill directory
  --force     Replace only selected AstraForge skill directories (destructive)
`;
function listSkills() {
  return fs.readdirSync(skillsRoot, { withFileTypes: true })
    .filter(e => e.isDirectory() && fs.existsSync(path.join(skillsRoot, e.name, 'SKILL.md')))
    .map(e => e.name).sort();
}
function parseArgs(args) {
  const o = { all: false, global: false, force: false, path: null, positional: [] };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--all') o.all = true;
    else if (a === '--global' || a === '-g') o.global = true;
    else if (a === '--force') o.force = true;
    else if (a === '--path') { if (!args[i + 1]) throw new Error('--path requires a directory'); o.path = args[++i]; }
    else if (a === '--help' || a === '-h') o.help = true;
    else if (a === '--version' || a === '-v') o.version = true;
    else o.positional.push(a);
  }
  if (o.global && o.path) throw new Error('Use either --global or --path, not both.');
  return o;
}
function validate() {
  const ids = listSkills(), errors = [];
  if (!ids.length) errors.push('No skills with SKILL.md found.');
  for (const id of ids) {
    const body = fs.readFileSync(path.join(skillsRoot, id, 'SKILL.md'), 'utf8');
    if (!body.startsWith('---\n')) errors.push(`${id}: missing YAML frontmatter`);
    if (!/^name:\s*\S+/m.test(body)) errors.push(`${id}: missing name`);
    if (!/^description:\s*.+/m.test(body)) errors.push(`${id}: missing description`);
  }
  try {
    const cases = JSON.parse(fs.readFileSync(path.join(packageRoot, 'evaluations', 'cases.json'), 'utf8'));
    if (!Array.isArray(cases) || !cases.length) errors.push('Evaluation cases must be a non-empty JSON array.');
  } catch { errors.push('Cannot parse evaluations/cases.json'); }
  return { ids, errors };
}
function bundleProtocols(dest) {
  const skillFile = path.join(dest, 'SKILL.md');
  const content = fs.readFileSync(skillFile, 'utf8');
  const referenced = [...new Set([...content.matchAll(/\.\.\/\.\.\/protocols\/([a-z0-9._-]+\.md)/gi)].map(m => m[1]))];
  if (!referenced.length) return;
  const destProtocols = path.join(dest, 'protocols');
  fs.mkdirSync(destProtocols, { recursive: true });
  for (const file of referenced) {
    fs.cpSync(path.join(protocolsRoot, file), path.join(destProtocols, file));
  }
  fs.writeFileSync(skillFile, content.replaceAll('../../protocols/', 'protocols/'), 'utf8');
}
function install(o) {
  const available = listSkills();
  const selected = o.all ? available : o.positional.filter(x => x !== 'install');
  if (!selected.length) throw new Error('Choose a skill ID or pass --all. Run `astraforge list` to see skill IDs.');
  const unknown = selected.filter(id => !available.includes(id));
  if (unknown.length) throw new Error(`Unknown skill ID(s): ${unknown.join(', ')}. Run \`astraforge list\`.`);
  const destRoot = o.path ? path.resolve(o.path) : o.global ? path.join(os.homedir(), '.gemini', 'config', 'skills') : path.resolve(process.cwd(), '.agents', 'skills');
  fs.mkdirSync(destRoot, { recursive: true });
  let installed = 0, skipped = 0;
  for (const id of selected) {
    const src = path.join(skillsRoot, id), dest = path.join(destRoot, id);
    if (fs.existsSync(dest) && !o.force) { console.log(`SKIP  ${id} (already exists; use --force only if you intend to replace it)`); skipped++; continue; }
    if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true });
    fs.cpSync(src, dest, { recursive: true, errorOnExist: true, force: false });
    bundleProtocols(dest);
    console.log(`ADD   ${id}`); installed++;
  }
  console.log(`\nAstraForge ${version}: ${installed} installed, ${skipped} skipped.\nDestination: ${destRoot}`);
  console.log('Restart Antigravity or start a new session to rediscover skills.');
}
try {
  const command = process.argv[2] ?? '--help', o = parseArgs(process.argv.slice(2));
  if (o.help || command === '--help' || command === 'help') console.log(help);
  else if (o.version || command === '--version' || command === 'version') console.log(version);
  else if (command === 'list') { for (const id of listSkills()) console.log(id); console.log(`\n${listSkills().length} skills`); }
  else if (command === 'doctor') {
    const { ids, errors } = validate();
    if (errors.length) { console.error('AstraForge validation FAILED'); for (const e of errors) console.error(`- ${e}`); process.exitCode = 1; }
    else console.log(`AstraForge validation passed: ${ids.length} skills and evaluation cases are structurally valid.\nThis does not test Antigravity runtime activation or model performance.`);
  } else if (command === 'install') install(o);
  else { console.error(`Unknown command: ${command}\n`); console.log(help); process.exitCode = 2; }
} catch (e) { console.error(`Error: ${e.message}`); process.exitCode = 1; }
