export function createDiscoveryService(contentAdapter){
 const eligible=()=>contentAdapter.list();
 const norm=v=>String(v??"").toLocaleLowerCase("tr");
 const score=(source,w,prefs)=>{
  const shared=(w.values??[]).filter(v=>source?.values?.includes(v)).length;
  const preferred=(w.values??[]).filter(v=>prefs.values.has(v)).length;
  const likedFormat=prefs.formats.has(w.format)?1:0;
  return shared*4+preferred*2+likedFormat;
 };
 return Object.freeze({
  search(query){
   const q=norm(query).trim();if(!q)return eligible();
   return eligible().filter(w=>norm([w.title,w.summary,w.format,w.language,...(w.values??[])].join(" ")).includes(q));
  },
  preferences(likedIds=[]){
   const liked=new Set(likedIds);
   const works=eligible().filter(w=>liked.has(w.workId));
   return Object.freeze({values:new Set(works.flatMap(w=>w.values??[])),formats:new Set(works.map(w=>w.format).filter(Boolean))});
  },
  related(workId,{likedIds=[],likedValues=[]}={}){
   const source=contentAdapter.get(workId);if(!source)return[];
   const derived=this.preferences(likedIds);const prefs={values:new Set([...derived.values,...likedValues]),formats:derived.formats};
   return eligible().filter(w=>w.workId!==workId).map(w=>({work:w,rank:score(source,w,prefs)}))
    .sort((a,b)=>b.rank-a.rank||a.work.title.localeCompare(b.work.title,"tr")||a.work.workId.localeCompare(b.work.workId))
    .map(x=>x.work);
  }
 });
}
