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

export function speechLocale(locale="ku"){return({ku:"ku-TR",tr:"tr-TR",en:"en-US",de:"de-DE"})[String(locale).toLowerCase().split("-")[0]]??"ku-TR"}

export function createSpeechInput({router,scope=globalThis,locale="ku",onState=()=>{}}={}){
 const support=speechRecognitionSupport(scope);
 if(!router?.route||!support.supported)return Object.freeze({available:false,start:()=>false,stop:()=>false});
 const recognition=new support.Recognition();
 recognition.lang=speechLocale(locale);
 recognition.interimResults=false;
 recognition.continuous=false;
 recognition.maxAlternatives=1;
 recognition.onstart=()=>onState("LISTENING");
 recognition.onend=()=>onState("IDLE");
 recognition.onerror=event=>onState(event?.error==="not-allowed"||event?.error==="service-not-allowed"?"PERMISSION_DENIED":"ERROR");
 recognition.onresult=event=>{const transcript=event?.results?.[0]?.[0]?.transcript??"";const result=router.route(transcript);onState(result.status);return result};
 return Object.freeze({available:true,start:()=>{try{recognition.start();return true}catch{onState("ERROR");return false}},stop:()=>{try{recognition.stop();return true}catch{return false}}});
}
