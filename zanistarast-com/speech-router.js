const clean=s=>String(s??"").toLocaleLowerCase().normalize("NFKC").trim();

export function createSpeechRouter({search,open}={}){
 if(typeof search!=="function"||typeof open!=="function")throw new TypeError("SEARCH_AND_OPEN_REQUIRED");
 return Object.freeze({
  route:query=>{
   const q=clean(query);
   if(!q)return Object.freeze({status:"EMPTY",target:null});
   const results=search(q)??[];
   const target=results.find(x=>x?.workId);
   if(!target)return Object.freeze({status:"NO_MATCH",target:null});
   open(target.workId);
   return Object.freeze({status:"ROUTED",target:target.workId});
  }
 });
}
