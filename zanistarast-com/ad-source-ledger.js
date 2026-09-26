export const CLAIM_STATUS=Object.freeze({UNVERIFIED:"UNVERIFIED",SUPPORTED:"SUPPORTED",REJECTED:"REJECTED",DISPUTED:"DISPUTED"});
export function createAdSourceLedger({campaignId,campaignVersion,sources=[],claims=[]}={}){
 const normalizedSources=sources.map((s,i)=>Object.freeze({sourceId:s.sourceId??"source-"+(i+1),origin:s.origin??"ADVERTISER",rightsStatus:s.rightsStatus??"UNVERIFIED",reference:s.reference??null}));
 const ids=new Set(normalizedSources.map(s=>s.sourceId));
 const normalizedClaims=claims.map((c,i)=>Object.freeze({claimId:c.claimId??"claim-"+(i+1),text:c.text??"",status:c.status??CLAIM_STATUS.UNVERIFIED,sourceIds:Object.freeze([...(c.sourceIds??[])]),notes:c.notes??null}));
 const errors=[];
 if(!campaignId||!campaignVersion)errors.push("campaignIdentity");
 for(const c of normalizedClaims)if(c.sourceIds.some(id=>!ids.has(id)))errors.push("unknownClaimSource:"+c.claimId);
 return Object.freeze({campaignId,campaignVersion,sources:Object.freeze(normalizedSources),claims:Object.freeze(normalizedClaims),valid:errors.length===0,errors:Object.freeze(errors)});
}
export function miraCreativeHandoff(ledger,{creativeId,version,brief=""}={}){
 if(!ledger?.valid||!creativeId||!version)return Object.freeze({ready:false,reason:"INVALID_HANDOFF"});
 const unresolved=ledger.claims.filter(c=>c.status!==CLAIM_STATUS.SUPPORTED);
 const rightsOpen=ledger.sources.filter(s=>s.rightsStatus!=="CLEARED");
 if(unresolved.length||rightsOpen.length)return Object.freeze({ready:false,reason:"SOURCE_OR_CLAIM_REVIEW_OPEN",unresolvedClaims:Object.freeze(unresolved.map(x=>x.claimId)),unresolvedRights:Object.freeze(rightsOpen.map(x=>x.sourceId))});
 return Object.freeze({ready:true,creativeId,version,origin:"MIRA_ORIGINAL",campaignId:ledger.campaignId,campaignVersion:ledger.campaignVersion,brief,sourceLedger:Object.freeze({campaignId:ledger.campaignId,campaignVersion:ledger.campaignVersion})});
}
