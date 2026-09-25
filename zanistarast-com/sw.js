const SHELL="zanistarast-com-shell-v1";
const CORE=["./","./index.html","./styles.css","./app.js","./data.js","./manifest.webmanifest"];
self.addEventListener("install",event=>event.waitUntil(caches.open(SHELL).then(c=>c.addAll(CORE))));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==SHELL).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{
 if(event.request.method!=="GET")return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin)return;
 event.respondWith(fetch(event.request).then(response=>{
   if(response.ok&&["style","script","document"].includes(event.request.destination)){
     const copy=response.clone();caches.open(SHELL).then(c=>c.put(event.request,copy));
   }
   return response;
 }).catch(()=>caches.match(event.request).then(hit=>hit||caches.match("./index.html"))));
});