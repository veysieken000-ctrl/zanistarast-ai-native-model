export const REVIEW_STATE=Object.freeze({PENDING:"PENDING",PASS:"PASS",FAIL:"FAIL",NOT_APPROVED:"NOT_APPROVED",APPROVED:"APPROVED"});
const required=["similarityRights","cultureVisual","accessibility","rasterast"];
export function validateEvidenceDecision(review,version){
 if(!review||review.version!==version||review.state!==REVIEW_STATE.PASS)return false;
 return Array.isArray(review.evidence)&&review.evidence.length>0&&review.evidence.every(e=>typeof e==="string"&&e.trim().length>0);
}
export function publicAdmission(reviewState){
 if(!reviewState?.candidateId||!reviewState.version)return"BLOCKED";
 if(!required.every(k=>validateEvidenceDecision(reviewState.reviews?.[k],reviewState.version)))return"BLOCKED";
 const m=reviewState.reviews?.mudabbir;
 if(m?.version!==reviewState.version||m?.state!==REVIEW_STATE.APPROVED||!Array.isArray(m.evidence)||m.evidence.length===0)return"BLOCKED";
 if((reviewState.unresolvedItems??[]).some(x=>x?.blocking!==false))return"BLOCKED";
 return"ADMITTED";
}
