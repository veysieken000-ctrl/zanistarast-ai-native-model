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
 return '<section class="promotion-interstitial" data-promotion data-skip-after="'+skip+'" aria-label="Tanıtım"><span class="promotion-label">TANITIM</span><strong>'+title+'</strong><p>'+summary+'</p><button type="button" data-skip disabled>Atla · '+skip+' sn</button></section>';
}
export function bindPromotionInterstitial(root,{onResume=()=>{}}={}){
 const box=root?.querySelector?.("[data-promotion]");if(!box)return()=>{};
 const button=box.querySelector("[data-skip]");let left=Math.max(0,Number(box.dataset.skipAfter||5)),done=false,timer;
 const finish=()=>{if(done)return;done=true;clearInterval(timer);box.remove();onResume()};
 const paint=()=>{if(left<=0){button.disabled=false;button.textContent="Atla"}else button.textContent="Atla · "+left+" sn"};
 paint();timer=setInterval(()=>{left-=1;paint();if(left<=0)clearInterval(timer)},1000);
 button?.addEventListener("click",()=>{if(!button.disabled)finish()});
 return finish;
}
