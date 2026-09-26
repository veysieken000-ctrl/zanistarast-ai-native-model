import{CAMPAIGN_STATE}from"./ad-contracts.js";

export const AUDIT_EVENT=Object.freeze({
 ADMITTED:"ADMITTED",PAUSED:"PAUSED",RESUMED:"RESUMED",EXPIRED:"EXPIRED",WITHDRAWN:"WITHDRAWN",DELIVERED:"DELIVERED"
});
const nonempty=v=>typeof v==="string"&&v.trim().length>0;
export function createCampaignAuditLog(seed=[]){
 const events=[...seed];
 return Object.freeze({
  append(event){
   if(!event||!nonempty(event.campaignId)||!nonempty(event.campaignVersion)||!Object.values(AUDIT_EVENT).includes(event.type)||!nonempty(event.at))
    throw new Error("INVALID_AUDIT_EVENT");
   const record=Object.freeze({...event,sequence:events.length+1});events.push(record);return record;
  },
  history:(campaignId=null)=>Object.freeze(events.filter(e=>!campaignId||e.campaignId===campaignId)),
  snapshot:()=>Object.freeze([...events])
 });
}
export function lifecycleTransition(campaign,nextState,{at,reason=null}={}){
 if(!campaign||!Object.values(CAMPAIGN_STATE).includes(nextState))throw new Error("INVALID_CAMPAIGN_STATE");
 if(!nonempty(at))throw new Error("TRANSITION_TIME_REQUIRED");
 if(nextState===CAMPAIGN_STATE.WITHDRAWN&&!nonempty(reason))throw new Error("WITHDRAWAL_REASON_REQUIRED");
 if(nextState===CAMPAIGN_STATE.EXPIRED&&!nonempty(reason))reason="CAMPAIGN_WINDOW_ENDED";
 return Object.freeze({...campaign,state:nextState,lifecycle:Object.freeze({previousState:campaign.state,nextState,at,reason})});
}
export function shouldDeliverCampaign(campaign,now=new Date()){
 if(!campaign)return false;
 if([CAMPAIGN_STATE.PAUSED,CAMPAIGN_STATE.EXPIRED,CAMPAIGN_STATE.WITHDRAWN,CAMPAIGN_STATE.BLOCKED].includes(campaign.state))return false;
 if(campaign.state!==CAMPAIGN_STATE.ADMITTED)return false;
 const t=new Date(now).getTime(),start=new Date(campaign.startAt).getTime(),end=new Date(campaign.endAt).getTime();
 return Number.isFinite(start)&&Number.isFinite(end)&&t>=start&&t<=end;
}
