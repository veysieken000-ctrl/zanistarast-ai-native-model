import{CAMPAIGN_STATE,CREATIVE_ORIGIN}from"./ad-contracts.js";
import{createAdSourceLedger,miraCreativeHandoff}from"./ad-source-ledger.js";
import{inspectAdCreative,antiManipulationReviewEvidence}from"./ad-inspection.js";

export function buildDemoCampaign(){
 const campaign=Object.freeze({campaignId:"demo-h9-mission",version:"demo-v1",state:CAMPAIGN_STATE.REVIEW,sponsor:{name:"Zanistarast DEMO"},startAt:"2026-09-01T00:00:00Z",endAt:"2027-09-01T00:00:00Z",impressionEntitlement:12,targetUrl:"#/work/demo-merhamet",claims:[{id:"claim-1",text:"DEMO TANITIM"}],rightsEvidence:["self-created-demo"]});
 const ledger=createAdSourceLedger({campaignId:campaign.campaignId,campaignVersion:campaign.version,sources:[{id:"src-1",origin:"MIRA_INTERNAL",rightsStatus:"CLEARED",reference:"demo-only"}],claims:[{id:"claim-1",status:"SUPPORTED",sourceIds:["src-1"]}]});
 const handoff=miraCreativeHandoff(campaign,ledger);
 const creative=Object.freeze({creativeId:"demo-h9-creative",version:"creative-v1",campaignId:campaign.campaignId,campaignVersion:campaign.version,origin:CREATIVE_ORIGIN.MIRA,representation:{id:"demo-h9-representation",version:"creative-v1",kind:"video",src:"./demo/promotion-placeholder.mp4"},inspectionSignals:[]});
 const inspection=inspectAdCreative(creative,{declaredText:["DEMO TANITIM"],declaredAudio:["demo narration"],declaredVisuals:["demo visual"],framesReviewed:true,audioReviewed:true,metadataReviewed:true,reviewerNotes:["Synthetic H9 fixture; not publication evidence."]});
 return Object.freeze({demo:true,publicDeliveryAllowed:false,campaign,ledger,handoff,creative,inspection,antiManipulation:antiManipulationReviewEvidence(inspection)});
}
