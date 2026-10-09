// Dependency-free static regression tests; intentionally read-only.
// node --test tests/mira_bridge_regression.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const exists=p=>fs.existsSync(new URL('../'+p,import.meta.url));
test('backend entrypoint has no undefined require under ESM',()=>{
 const pkg=JSON.parse(read('backend/package.json'));const server=read('backend/server.js');
 assert.ok(pkg.type!=='module'||server.includes('const require = createRequire(import.meta.url);'),'ESM server requires createRequire binding');
});
test('server referenced mi_engine route exists',()=>{
 const server=read('backend/server.js');
 if(server.includes('./routes/mi_engine.js'))assert.ok(exists('backend/routes/mi_engine.js'),'mi_engine.js import is missing');
});
test('formal bootstrap resolves to existing entrypoint',()=>{
 const formal=read('api/zanistarast_formal_gateway.js');
 if(formal.includes('require("../backend/bootstrap")'))assert.ok(exists('backend/bootstrap/index.js')||exists('backend/bootstrap.js'),'bootstrap entrypoint absent');
});
test('formal bootstrap is not assumed to be ESM compatible',()=>{
 const pkg=JSON.parse(read('backend/package.json'));
 const bootstrap=read('backend/bootstrap/index.js');
 assert.ok(pkg.type!=='module'||!bootstrap.includes('module.exports')||JSON.parse(read('backend/bootstrap/package.json')).type==='commonjs','CommonJS bootstrap needs its own package scope');
});
test('insufficient evidence is not automatically FALSE',()=>{
 const server=read('backend/server.js');
 assert.ok(!server.includes('If evidence is weak, classify as FALSE'),'Truth prompt conflates unsupported and false');
});
test('Mira helper queue has explicit integration',()=>{
 const server=read('backend/server.js');
 assert.ok(server.includes('mira-yardimci-karar-kuyrugu'),'No queue reference in server; may be integrated elsewhere');
});
