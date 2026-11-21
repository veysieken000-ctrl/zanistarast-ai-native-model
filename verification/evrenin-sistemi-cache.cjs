// Meaningful cache regression checks. No browser or network is used.
const {readFileSync} = require('node:fs');
const {resolve} = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
(async () => {
  const handlers = {};
  const deleted = [];
  const stored = new Map();
  let networkFailure = false;
  let networkCalls = 0;
  let installed = [];
  const cache = {addAll:async paths => {installed=paths;}, put:async (request,response)=>stored.set(request.url,response), match:async request=>stored.get(request.url)};
  const self = {location:'https://example.org/zanistarast-ai-native-model/service-worker.js',addEventListener:(type,handler)=>handlers[type]=handler,skipWaiting:async()=>{},clients:{claim:async()=>{}}};
  // A URL object gives the worker location the same origin property as WorkerLocation.
  self.location = new URL(self.location);
  const context = {self,URL,Set,Response,caches:{open:async()=>cache,keys:async()=>['zanistarast-core-v1','zanistarast-ai-native-model-old','unrelated-app-cache','zanistarast-ai-native-model-v04-20261122'],delete:async name=>deleted.push(name)},fetch:async()=>{networkCalls++;if(networkFailure)throw Error('offline');return new Response('current');}};
  vm.runInNewContext(readFileSync(resolve(__dirname,'../service-worker.js'),'utf8'),context);
  async function lifecycle(name){let promise;handlers[name]({waitUntil:p=>{promise=p;}});await promise;}
  await lifecycle('install');assert(installed.includes('./graph/evrenin-sistemi.json'));assert(installed.includes('./docs/evrenin-sistemi-v04.pdf'));
  await lifecycle('activate');assert.deepEqual(deleted,['zanistarast-core-v1','zanistarast-ai-native-model-old']);
  async function request(path,options={}){let response;handlers.fetch({request:{url:new URL(path,'https://example.org').href,method:'GET',mode:'cors',...options},respondWith:p=>{response=p;}});return response?await response:null;}
  assert.equal(await (await request('/zanistarast-ai-native-model/graph/evrenin-sistemi.json')).text(),'current');
  networkFailure=true;assert.equal(await (await request('/zanistarast-ai-native-model/graph/evrenin-sistemi.json')).text(),'current');
  assert.equal((await request('/zanistarast-ai-native-model/new.html',{mode:'navigate'})).status,503);
  const before=networkCalls;
  assert.equal(await request('/other-app/graph.html',{mode:'navigate'}),null);
  assert.equal(await request('/zanistarast-ai-native-model/api/private'),null);
  assert.equal(await request('/zanistarast-ai-native-model/graph.html',{method:'POST'}),null);
  assert.equal(await request('/zanistarast-ai-native-model/graph.html?token=example'),null);
  assert.equal(networkCalls,before);
  console.log('PASS: precache, isolated cleanup, current data, offline fallback, scope and private request exclusions');
})().catch(error=>{console.error(error);process.exitCode=1;});
