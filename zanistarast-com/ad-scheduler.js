import{campaignDeliveryState}from"./ad-contracts.js";

export const AD_PLACEMENT=Object.freeze({
 PRE_ROLL:"PRE_ROLL",NATURAL_BREAK_MID_ROLL:"NATURAL_BREAK_MID_ROLL",
 FEED_SPONSORED_CARD:"FEED_SPONSORED_CARD",WATCH_SIDE_OR_BELOW_CARD:"WATCH_SIDE_OR_BELOW_CARD",
 SHORT_FORM_BETWEEN_ITEMS:"SHORT_FORM_BETWEEN_ITEMS",QUIET_SPONSORED_BANNER:"QUIET_SPONSORED_BANNER"
});
const INTERRUPTIVE=new Set([AD_PLACEMENT.PRE_ROLL,AD_PLACEMENT.NATURAL_BREAK_MID_ROLL]);
const n=v=>Math.max(0,Number(v)||0);

export function createAdScheduler({maxInterruptivePerSession=3,maxSameCreativePerSession=2,minMinutesBetween=15,minWorksBetween=3}={}){
 const shown=new Map();let interruptive=0,lastInterruptiveAt=null,lastInterruptiveConsumed=0;
 const key=(campaign,creative)=>campaign.campaignId+"@"+campaign.version+":"+creative.creativeId+"@"+creative.version;
 function eligible({campaign,creative,reviews,placement,now=new Date(),metrics={},session={}}){
  if(campaignDeliveryState(campaign,creative,reviews,now)!=="ACTIVE")return{ok:false,reason:"CAMPAIGN_NOT_ACTIVE"};
  const entitlement=n(campaign.impressionEntitlement);
  if(entitlement<=0||n(metrics.delivered)>=entitlement)return{ok:false,reason:"ENTITLEMENT_FULFILLED"};
  const k=key(campaign,creative);
  if((shown.get(k)||0)>=maxSameCreativePerSession)return{ok:false,reason:"SESSION_CREATIVE_CAP"};
  if(!INTERRUPTIVE.has(placement))return{ok:true,reason:"ELIGIBLE"};
  if(interruptive>=maxInterruptivePerSession)return{ok:false,reason:"SESSION_INTERRUPTIVE_CAP"};
  if(lastInterruptiveAt){
   const elapsed=(new Date(now)-lastInterruptiveAt)/60000;
   const works=n(session.consumedWorks)-lastInterruptiveConsumed;
   // Viewer-protective interpretation: require both spacing thresholds.
   if(elapsed<minMinutesBetween||works<minWorksBetween)return{ok:false,reason:"INTERRUPTIVE_SPACING"};
  }
  return{ok:true,reason:"ELIGIBLE"};
 }
 function record({campaign,creative,placement,now=new Date(),session={}}){
  const k=key(campaign,creative);shown.set(k,(shown.get(k)||0)+1);
  if(INTERRUPTIVE.has(placement)){interruptive++;lastInterruptiveAt=new Date(now);lastInterruptiveConsumed=n(session.consumedWorks);}
 }
 return Object.freeze({eligible,record,sessionState:()=>Object.freeze({interruptive,shown:Object.freeze(Object.fromEntries(shown))})});
}

export function selectPromotionOrInternal({scheduler,candidates=[],internalAnnouncements=[],placement,now=new Date(),session={},metricsByCampaign={}}){
 for(const x of candidates){
  const metrics=metricsByCampaign[x.campaign.campaignId+"@"+x.campaign.version]??{};
  const verdict=scheduler.eligible({...x,placement,now,session,metrics});
  if(verdict.ok)return Object.freeze({kind:"EXTERNAL_SPONSORED",item:x,verdict});
 }
 const internal=internalAnnouncements.find(x=>x?.eligible===true&&x?.admitted===true)??null;
 return internal?Object.freeze({kind:"INTERNAL_ANNOUNCEMENT",item:internal}):Object.freeze({kind:"EMPTY",item:null});
}
