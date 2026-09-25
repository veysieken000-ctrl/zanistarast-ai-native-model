export function createDiscoveryService(contentAdapter){
 const eligible=()=>contentAdapter.list();
 const norm=v=>String(v??"").toLocaleLowerCase("tr");
 return Object.freeze({
  search(query){
   const q=norm(query).trim(); if(!q)return eligible();
   return eligible().filter(w=>norm([w.title,w.summary,w.format,w.language,...(w.values??[])].join(" ")).includes(q));
  },
  related(workId,{likedValues=[]}={}){
   const source=contentAdapter.get(workId);if(!source)return[];
   const prefs=new Set(likedValues);
   return eligible().filter(w=>w.workId!==workId).map(w=>{
    const shared=(w.values??[]).filter(v=>source.values?.includes(v)).length;
    const preferred=(w.values??[]).filter(v=>prefs.has(v)).length;
    return {work:w,rank:shared*2+preferred};
   }).sort((a,b)=>b.rank-a.rank||a.work.title.localeCompare(b.work.title,"tr")).map(x=>x.work);
  }
 });
}
