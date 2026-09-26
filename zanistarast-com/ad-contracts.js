export const CAMPAIGN_STATE=Object.freeze({DRAFT:"DRAFT",REVIEW:"REVIEW",ADMITTED:"ADMITTED",PAUSED:"PAUSED",EXPIRED:"EXPIRED",WITHDRAWN:"WITHDRAWN",BLOCKED:"BLOCKED"});
export const CREATIVE_ORIGIN=Object.freeze({MIRA:"MIRA_ORIGINAL",ADVERTISER:"ADVERTISER_SUPPLIED"});

const nonempty=v=>typeof v==="string"&&v.trim().length>0;
export function validateCampaign(c){
 const errors=[];
 if(!nonempty(c?.campaignId))errors.push("campaignId");
 if(!nonempty(c?.version))errors.push("version");
 if(!nonempty(c?.sponsor?.name))errors.push("sponsor.name");
 if(!nonempty(c?.startAt))errors.push("startAt");
 if(!nonempty(c?.endAt))errors.push("endAt");
 if(!Array.isArray(c?.claims))errors.push("claims");
 if(!Array.isArray(c?.rightsEvidence)||!c.rightsEvidence.length)errors.push("rightsEvidence");
 if(!nonempty(c?.targetUrl))errors.push("targetUrl");
 return Object.freeze({valid:errors.length===0,errors:Object.freeze(errors)});
}
export function validateCreative(x){
 const errors=[];
 if(!nonempty(x?.creativeId))errors.push("creativeId");
 if(!nonempty(x?.version))errors.push("version");
 if(!Object.values(CREATIVE_ORIGIN).includes(x?.origin))errors.push("origin");
 if(!nonempty(x?.representation?.id))errors.push("representation.id");
 if(!nonempty(x?.representation?.version))errors.push("representation.version");
 if(x?.origin===CREATIVE_ORIGIN.ADVERTISER&&x?.trusted===true)errors.push("advertiserCreativeCannotBePretrusted");
 return Object.freeze({valid:errors.length===0,errors:Object.freeze(errors)});
}
export function exactVersionAdmission(campaign,creative,reviews={}){
 if(!validateCampaign(campaign).valid||!validateCreative(creative).valid)return"BLOCKED";
 if(campaign.state!==CAMPAIGN_STATE.ADMITTED)return"BLOCKED";
 if(creative.campaignId!==campaign.campaignId||creative.campaignVersion!==campaign.version)return"BLOCKED";
 const required=["rights","claims","antiManipulation","culturalMoral","rasterast"];
 if(required.some(k=>reviews[k]?.version!==creative.version||reviews[k]?.state!=="PASS"))return"BLOCKED";
 if(reviews.mudabbir?.required===true&&(reviews.mudabbir.version!==creative.version||reviews.mudabbir.state!=="APPROVED"))return"BLOCKED";
 return"ADMITTED";
}
