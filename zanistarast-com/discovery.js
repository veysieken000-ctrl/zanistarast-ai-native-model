export function createDiscoveryService(contentAdapter){
 const eligible=()=>contentAdapter.list();
 const norm=v=>String(v??"").toLocaleLowerCase("tr");
 const newest=()=>eligible().filter(w=>w.publishedAt).sort((a,b)=>String(b.publishedAt).localeCompare(String(a.publishedAt))||a.workId.localeCompare(b.workId));
 const score=(source,w,prefs)=>{
  const shared=(w.values??[]).filter(v=>source?.values?.includes(v)).length;
  const preferred=(w.values??[]).filter(v=>prefs.values.has(v)).length;
  const likedFormat=prefs.formats.has(w.format)?1:0;
  return shared*4+preferred*2+likedFormat;
 };
 return Object.freeze({
  newest(limit=12){return newest().slice(0,Math.max(0,limit));},
  search(query,{format=null,language=null,value=null}={}){
   const q=norm(query).trim();
   return eligible().filter(w=>{
    if(format&&w.format!==format)return false;
    if(language&&w.language!==language)return false;
    if(value&&!(w.values??[]).includes(value))return false;
    return !q||norm([w.title,w.summary,w.format,w.language,...(w.values??[])].join(" ")).includes(q);
   });
  },
  facets(){
   const ws=eligible(),uniq=xs=>[...new Set(xs.filter(Boolean))].sort((a,b)=>String(a).localeCompare(String(b),"tr"));
   return Object.freeze({formats:Object.freeze(uniq(ws.map(w=>w.format))),languages:Object.freeze(uniq(ws.map(w=>w.language))),values:Object.freeze(uniq(ws.flatMap(w=>w.values??[])))});
  },
  suggest(query,limit=6){
   const q=norm(query).trim();if(!q)return[];
   return this.search(q).slice(0,Math.max(0,limit)).map(w=>Object.freeze({workId:w.workId,title:w.title,format:w.format,language:w.language}));
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
