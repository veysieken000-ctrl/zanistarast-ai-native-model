import assert from "node:assert/strict";
import fs from "node:fs";

const read=p=>fs.readFileSync(new URL(p,import.meta.url),"utf8");
const html=read("./index.html"),css=read("./styles.css"),app=read("./app.js"),data=read("./data.js"),manifest=JSON.parse(read("./manifest.webmanifest")),sw=read("./sw.js");

assert.match(html,/id="main"/);
assert.match(html,/manifest\.webmanifest/);
assert.match(html,/İçeriğe geç/);
assert.match(css,/@media\(max-width:760px\)/);
assert.match(css,/prefers-reduced-motion/);
assert.match(app,/Oku \/ Konuyu Anla/);
assert.match(app,/Kaynak ve güven bilgisi/);
assert.match(app,/eligibleWorks\(\)/);
assert.match(data,/eligible:true/);
assert.match(data,/demo:true/);
assert.doesNotMatch(data,/doi\.org|RASTERAST_ACCEPTED|MÜDEBBIR_APPROVED/i);
assert.equal(manifest.display,"standalone");
assert.ok(manifest.start_url);
assert.match(sw,/caches\.open/);
console.log("zanistarast-com smoke: OK");