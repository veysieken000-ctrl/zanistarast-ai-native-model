export const PROMOTION_KIND=Object.freeze({INTERNAL:"INTERNAL_ANNOUNCEMENT",EXTERNAL:"EXTERNAL_SPONSORED"});
export function promotionEligible(p,workLookup){
 if(!p||!p.id||!p.version||!p.kind)return false;
 if(p.demo===true)return p.state==="DEMO";
 if(p.state!=="ADMITTED"||p.rights!==true||p.rasterast!==true)return false;
 if(p.mudabbirRequired===true&&p.mudabbirApproved!==true)return false;
 if(p.kind===PROMOTION_KIND.INTERNAL){
  const w=workLookup?.(p.targetWorkId);return Boolean(w&&w.version===p.targetVersion);
 }
 return p.kind===PROMOTION_KIND.EXTERNAL;
}
export function createPromotionService(records=[],{workLookup=()=>null,maxPerSession=2,minWorksBetween=3}={}){
 const shown=new Map();let total=0,lastAt=-Infinity;
 const eligible=()=>records.filter(p=>promotionEligible(p,workLookup));
 return Object.freeze({
  shelf:()=>eligible(),
  next(playCount=0){if(total>=maxPerSession||playCount-lastAt<minWorksBetween)return null;const p=eligible().find(x=>(shown.get(x.id)||0)<1);if(!p)return null;shown.set(p.id,(shown.get(p.id)||0)+1);total++;lastAt=playCount;return p},
  remaining:()=>Math.max(0,maxPerSession-total)
 });
}

export function promotionPlayback(p){
 const skipAfter=Math.max(0,Number(p?.skipAfterSeconds??5));
 return Object.freeze({
  skipAfterSeconds:skipAfter,
  canSkip:elapsed=>Number(elapsed)>=skipAfter,
  completionAction:"RESUME_REQUESTED_WORK",
  failureAction:"RESUME_REQUESTED_WORK"
 });
}

export function renderPromotionInterstitial(p){
 if(!p)return"";
 const skip=Math.max(0,Number(p.skipAfterSeconds??5));
 const title=String(p.title??"Tanıtım").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const summary=String(p.summary??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const media=p.representation?.kind==="video"&&p.representation?.src&&p.representation?.id&&p.representation?.version?'<video class="promotion-media" data-promotion-media playsinline preload="metadata"'+(p.representation.poster?' poster="'+String(p.representation.poster).replace(/"/g,"&quot;")+'"':'')+'><source src="'+String(p.representation.src).replace(/"/g,"&quot;")+'"'+(p.representation.mime?' type="'+String(p.representation.mime).replace(/"/g,"&quot;")+'"':'')+'></video>':"";
 return '<section class="promotion-interstitial" data-promotion data-skip-after="'+skip+'" aria-label="Tanıtım"><span class="promotion-label">TANITIM</span>'+media+'<strong>'+title+'</strong><p>'+summary+'</p><button type="button" data-skip disabled>Atla · '+skip+' sn</button></section>';
}
export function bindPromotionInterstitial(root,{onResume=()=>{},durationSeconds=null}={}){
 const box=root?.querySelector?.("[data-promotion]");if(!box)return()=>{};
 const button=box.querySelector("[data-skip]");let left=Math.max(0,Number(box.dataset.skipAfter||5)),done=false,timer,completion=null;
 const finish=(outcome=PROMOTION_OUTCOME.COMPLETED)=>{if(done)return;done=true;clearInterval(timer);if(completion)clearTimeout(completion);box.remove();onResume(promotionOutcome(outcome))};
 const paint=()=>{if(left<=0){button.disabled=false;button.textContent="Atla"}else button.textContent="Atla · "+left+" sn"};
 const media=box.querySelector("[data-promotion-media]");media?.addEventListener("ended",()=>finish(PROMOTION_OUTCOME.COMPLETED),{once:true});media?.addEventListener("error",()=>finish(PROMOTION_OUTCOME.FAILED),{once:true});media?.play?.().catch?.(()=>finish(PROMOTION_OUTCOME.FAILED));paint();timer=setInterval(()=>{left-=1;paint();if(left<=0)clearInterval(timer)},1000);completion=Number(durationSeconds)>0?setTimeout(finish,Number(durationSeconds)*1000):null;
 button?.addEventListener("click",()=>{if(!button.disabled)finish(PROMOTION_OUTCOME.SKIPPED)});
 return finish;
}


const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
export function renderPromotionShelf(records=[]){
 const items=records.filter(Boolean);
 if(!items.length)return"";
 return '<section class="promotion-shelf" aria-label="Tanıtımlar"><h2>Tanıtımlar</h2><div class="promotion-shelf-list">'+items.map(p=>{
  const label=p.kind===PROMOTION_KIND.EXTERNAL?"SPONSORLU":"TANITIM";
  const href=p.targetWorkId?"#/work/"+encodeURIComponent(p.targetWorkId):null;
  const body='<span class="promotion-label">'+label+'</span><strong>'+esc(p.title??"Tanıtım")+'</strong><p>'+esc(p.summary??"")+'</p>';
  return href?'<a class="promotion-card" href="'+href+'">'+body+'</a>':'<article class="promotion-card">'+body+'</article>';
 }).join("")+'</div></section>';
}


export const PROMOTION_OUTCOME=Object.freeze({SKIPPED:"SKIPPED",COMPLETED:"COMPLETED",FAILED:"FAILED"});
export function promotionOutcome(outcome){
 if(!Object.values(PROMOTION_OUTCOME).includes(outcome))return Object.freeze({valid:false,resumeRequestedWork:true,countsAsCompleted:false});
 return Object.freeze({valid:true,resumeRequestedWork:true,countsAsCompleted:outcome===PROMOTION_OUTCOME.COMPLETED});
}
