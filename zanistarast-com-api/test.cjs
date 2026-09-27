const assert=require("node:assert/strict"),http=require("node:http"),fs=require("node:fs"),os=require("node:os"),path=require("node:path");
const{memoryAdapter,fileAdapter}=require("./storage.cjs");
process.env.PORT="0";process.env.ALLOWED_ORIGINS="https://veysieken000-ctrl.github.io";process.env.BUILD_SHA="test-sha";
const server=require("./server.cjs");
const request=(port,path,origin="https://veysieken000-ctrl.github.io",method="GET")=>new Promise((resolve,reject)=>{const q=http.request({host:"127.0.0.1",port,path,method,headers:{Origin:origin}},r=>{let b="";r.on("data",x=>b+=x);r.on("end",()=>resolve({status:r.statusCode,headers:r.headers,body:b?JSON.parse(b):null}))});q.on("error",reject);q.end()});
server.on("listening",async()=>{try{
 const mem=memoryAdapter();await mem.put("a",{n:1});assert.deepEqual(await mem.get("a"),{n:1});assert.equal(mem.persistent,false);
 const memBackup=await mem.backup();await mem.put("a",{n:9});await mem.restore(memBackup);assert.deepEqual(await mem.get("a"),{n:1});await assert.rejects(()=>mem.restore({version:999,records:{}}),/INVALID_BACKUP/);
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),"zan-com-"));const disk=fileAdapter(dir);await disk.put("a",{n:2});const diskBackup=await disk.backup();await disk.put("a",{n:3});await disk.restore(diskBackup);const disk2=fileAdapter(dir);assert.deepEqual(await disk2.get("a"),{n:2});assert.equal(disk.persistent,true);
 fs.writeFileSync(path.join(dir,"state-v1.json"),"{bad json");assert.throws(()=>fileAdapter(dir).snapshot(),SyntaxError);fs.rmSync(dir,{recursive:true,force:true});
 const port=server.address().port;
 const health=await request(port,"/health");assert.equal(health.status,200);assert.equal(health.headers["cache-control"],"no-store");assert.equal(health.headers["x-content-type-options"],"nosniff");assert.equal(health.headers["access-control-allow-origin"],"https://veysieken000-ctrl.github.io");assert.equal(health.body.build,"test-sha");
 const ready=await request(port,"/readiness");assert.equal(ready.status,200);assert.equal(ready.body.publication,"fail-closed");assert.equal(ready.body.checks.persistentStorage,false);assert.equal(ready.body.checks.storageKind,"memory");assert.equal(ready.body.checks.domain,false);
 const denied=await request(port,"/health","https://evil.example");assert.equal(denied.headers["access-control-allow-origin"],undefined);
 const preflight=await request(port,"/health","https://evil.example","OPTIONS");assert.equal(preflight.status,403);
 server.close(()=>process.exit(0));
 }catch(e){console.error(e);server.close(()=>process.exit(1))}});
