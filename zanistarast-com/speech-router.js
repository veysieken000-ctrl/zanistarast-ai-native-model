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

export function speechRecognitionSupport(scope=globalThis){
 const Ctor=scope?.SpeechRecognition??scope?.webkitSpeechRecognition;
 return Object.freeze({supported:typeof Ctor==="function",Recognition:Ctor??null});
}

export function createSpeechInput({router,scope=globalThis,locale="ku-TR"}={}){
 const support=speechRecognitionSupport(scope);
 if(!router?.route||!support.supported)return Object.freeze({available:false,start:()=>false,stop:()=>false});
 const recognition=new support.Recognition();
 recognition.lang=locale;
 recognition.interimResults=false;
 recognition.maxAlternatives=1;
 recognition.onresult=event=>router.route(event?.results?.[0]?.[0]?.transcript??"");
 return Object.freeze({available:true,start:()=>{recognition.start();return true},stop:()=>{recognition.stop();return true}});
}
