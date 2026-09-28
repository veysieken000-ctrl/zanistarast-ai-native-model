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

export const SPEECH_LOCALES=Object.freeze({ku:"ku-TR",tr:"tr-TR",en:"en-US",de:"de-DE",ar:"ar-SA",fa:"fa-IR",fr:"fr-FR",es:"es-ES",ru:"ru-RU",zh:"zh-CN",ja:"ja-JP",ko:"ko-KR",vi:"vi-VN",th:"th-TH",id:"id-ID"});
export function speechLocale(locale="ku"){return SPEECH_LOCALES[String(locale).toLowerCase().split("-")[0]]??"ku-TR"}

export function createSpeechInput({router,scope=globalThis,locale="ku",onState=()=>{},minConfidence=.45}={}){
 const support=speechRecognitionSupport(scope);
 if(!router?.route||!support.supported)return Object.freeze({available:false,start:()=>false,stop:()=>false});
 const recognition=new support.Recognition();
 recognition.lang=speechLocale(locale);
 recognition.interimResults=false;
 recognition.continuous=false;
 recognition.maxAlternatives=1;
 let terminalState=false;
 recognition.onstart=()=>{terminalState=false;onState("LISTENING")};
 recognition.onend=()=>{if(!terminalState)onState("IDLE")};
 recognition.onerror=event=>{terminalState=true;onState(event?.error==="not-allowed"||event?.error==="service-not-allowed"?"PERMISSION_DENIED":"ERROR")};
 recognition.onresult=event=>{const alt=event?.results?.[0]?.[0],transcript=alt?.transcript??"",confidence=Number(alt?.confidence);onState("TRANSCRIPT",transcript);if(Number.isFinite(confidence)&&confidence<minConfidence){terminalState=true;onState("LOW_CONFIDENCE",transcript);return Object.freeze({status:"LOW_CONFIDENCE",target:null})}const result=router.route(transcript);terminalState=result.status!=="EMPTY";onState(result.status,transcript);return result};
 let active=false;
 recognition.onstart=()=>{active=true;terminalState=false;onState("LISTENING")};
 recognition.onend=()=>{active=false;if(!terminalState)onState("IDLE")};
 return Object.freeze({available:true,start:()=>{if(active)return false;try{recognition.start();return true}catch{onState("ERROR");return false}},stop:()=>{if(!active)return false;try{recognition.stop();return true}catch{return false}}});
}
