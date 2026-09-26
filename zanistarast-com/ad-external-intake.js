import{CREATIVE_ORIGIN}from"./ad-contracts.js";
import{normalizeAdvertiserAsset}from"./ad-source-ledger.js";

const nonempty=v=>typeof v==="string"&&v.trim().length>0;
const HTTPS=/^https:\/\//i;

export function advertiserIntake({campaign,asset,legalAccepted=false,privacyAccepted=false,deploymentReady=false}={}){
 const normalized=normalizeAdvertiserAsset(asset);
 const blockers=[];
 if(!campaign?.campaignId||!campaign?.version)blockers.push("CAMPAIGN_IDENTITY_REQUIRED");
 if(!normalized.assetId||!normalized.version)blockers.push("ASSET_IDENTITY_REQUIRED");
 if(!legalAccepted)blockers.push("LEGAL_ACCEPTANCE_REQUIRED");
 if(!privacyAccepted)blockers.push("PRIVACY_ACCEPTANCE_REQUIRED");
 if(!deploymentReady)blockers.push("DEPLOYMENT_READINESS_REQUIRED");
 if(!nonempty(campaign?.sponsor?.name))blockers.push("SPONSOR_DISCLOSURE_REQUIRED");
 if(!nonempty(campaign?.targetUrl)||!HTTPS.test(campaign.targetUrl))blockers.push("HTTPS_TARGET_REQUIRED");
 return Object.freeze({
  readyForReview:blockers.length===0,
  blockers:Object.freeze(blockers),
  asset:normalized,
  creativeOrigin:CREATIVE_ORIGIN.ADVERTISER,
  directPublishAllowed:false,
  billingAllowed:false,
  requiresExactVersionReview:true
 });
}

export function billingEligibility({intake,admissionState,commercialApproval=false}={}){
 if(!intake?.readyForReview)return Object.freeze({allowed:false,reason:"INTAKE_NOT_READY"});
 if(admissionState!=="ADMITTED")return Object.freeze({allowed:false,reason:"CREATIVE_NOT_ADMITTED"});
 if(commercialApproval!==true)return Object.freeze({allowed:false,reason:"COMMERCIAL_APPROVAL_REQUIRED"});
 return Object.freeze({allowed:true,reason:"APPROVED_FOR_BILLING_SETUP"});
}
