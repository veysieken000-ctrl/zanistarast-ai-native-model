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
