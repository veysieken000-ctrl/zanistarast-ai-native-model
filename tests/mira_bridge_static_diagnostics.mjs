// Safe, read-only static diagnostics. Run from repository root: node tests/mira_bridge_static_diagnostics.mjs
// This script does not modify files, contact external services, or start the server.
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const file=(p)=>path.join(root,p);
const read=(p)=>fs.readFileSync(file(p),'utf8');
const checks=[];
function check(id,ok,detail){checks.push({id,pass:Boolean(ok),detail});}
const pkg=JSON.parse(read('backend/package.json'));
const server=read('backend/server.js');
const formal=read('api/zanistarast_formal_gateway.js');
const route='backend/routes/mi_engine.js';
check('ESM-CJS',!(pkg.type==='module' && /\brequire\s*\(/.test(server)), 'ESM package must not use unbound top-level require');
check('MI-ENGINE-EXISTS',fs.existsSync(file(route)), 'server.js imports '+route);
check('BOOTSTRAP-ENTRY',fs.existsSync(file('backend/bootstrap.js')) || fs.existsSync(file('backend/bootstrap/index.js')), 'formal gateway requires backend/bootstrap; directory index may need explicit resolution depending on module system');
check('EVIDENCE-UNCERTAINTY',!(/If evidence is weak, classify as FALSE/.test(server)), 'insufficient evidence must not be conflated with falsehood');
check('MIRA-QUEUE-INTEGRATION',/mira-yardimci-karar-kuyrugu/.test(server), 'no direct queue integration found in server.js; check other runtime entry points separately');
for(const c of checks) console.log((c.pass?'PASS':'FAIL')+' '+c.id+' — '+c.detail);
console.log('SUMMARY '+checks.filter(c=>c.pass).length+'/'+checks.length+' passed');
if(checks.some(c=>!c.pass))process.exitCode=1;
