import assert from "node:assert/strict";
import fs from "node:fs";
import{PUBLICATION,isPubliclyRenderable}from"./domain.js";
import{works,eligibleWorks,eligibleWorkById}from"./data.js";

const read=p=>fs.readFileSync(new URL(p,import.meta.url),"utf8");
const html=read("./index.html"),css=read("./styles.css"),app=read("./app.js"),data=read("./data.js"),manifest=JSON.parse(read("./manifest.webmanifest")),sw=read("./sw.js");

assert.match(html,/id="main"/);
assert.match(html,/manifest\.webmanifest/);
assert.match(html,/İçeriğe geç/);
assert.match(css,/@media\(max-width:760px\)/);
assert.match(css,/prefers-reduced-motion/);
assert.match(app,/Oku \/ Konuyu Anla/);
assert.match(app,/Kaynak ve güven bilgisi/);
assert.match(app,/eligibleWorkById\(id\)/);
assert.equal(works.some(w=>w.workId==="blocked-proof"),true);
assert.equal(eligibleWorkById("blocked-proof"),undefined);
assert.equal(eligibleWorks().some(w=>w.workId==="blocked-proof"),false);
assert.ok(eligibleWorks().every(isPubliclyRenderable));
for(const state of [PUBLICATION.PENDING,PUBLICATION.BLOCKED,PUBLICATION.WITHDRAWN]) assert.equal(isPubliclyRenderable({workId:"x",eligible:true,version:"1",publicationState:state,demo:false}),false);
assert.match(data,/publicationState:PUBLICATION\.DEMO/);
assert.match(data,/demo:true/);
assert.doesNotMatch(data,/eligible:true/);
assert.doesNotMatch(data,/doi\.org|RASTERAST_ACCEPTED|MÜDEBBIR_APPROVED/i);
assert.equal(manifest.display,"standalone");
assert.ok(manifest.start_url);
assert.match(sw,/caches\.open/);
console.log("zanistarast-com smoke: OK");