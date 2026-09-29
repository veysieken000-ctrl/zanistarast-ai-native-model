export const REVIEW_STATE=Object.freeze({PENDING:"PENDING",PASS:"PASS",FAIL:"FAIL",UNCERTAIN:"UNCERTAIN",INSUFFICIENT:"INSUFFICIENT",NOT_APPROVED:"NOT_APPROVED",APPROVED:"APPROVED"});
export const REQUIRED_CONTENT_REVIEWS=Object.freeze(["provenance","rights","quality","similarityRights","cultureVisual","accessibility"]);
export function validateEvidenceDecision(review,version){
 if(!review||review.version!==version||review.state!==REVIEW_STATE.PASS)return false;
 return Array.isArray(review.evidence)&&review.evidence.length>0&&review.evidence.every(e=>typeof e==="string"&&e.trim().length>0);
}
const evidenced=(review,version,state)=>review?.version===version&&review?.state===state&&Array.isArray(review.evidence)&&review.evidence.length>0&&review.evidence.every(e=>typeof e==="string"&&e.trim());
export function rasterastDecision(reviewState){
 const version=reviewState?.version,r=reviewState?.reviews?.rasterast;
 if(evidenced(r,version,REVIEW_STATE.PASS))return"PASS";
 if(r?.version===version&&(r.state===REVIEW_STATE.UNCERTAIN||r.state===REVIEW_STATE.INSUFFICIENT))return"MIRA_REQUIRED";
 return"BLOCKED";
}
export function publicAdmission(reviewState){
 if(!reviewState?.candidateId||!reviewState.version)return"BLOCKED";
 if(!REQUIRED_CONTENT_REVIEWS.every(k=>validateEvidenceDecision(reviewState.reviews?.[k],reviewState.version)))return"BLOCKED";
 const rasterast=rasterastDecision(reviewState);
 if(rasterast==="BLOCKED")return"BLOCKED";
 if(rasterast==="MIRA_REQUIRED"&&!evidenced(reviewState.reviews?.mira,reviewState.version,REVIEW_STATE.APPROVED))return"BLOCKED";
 if((reviewState.unresolvedItems??[]).some(x=>x?.blocking!==false))return"BLOCKED";
 return"ADMITTED";
}
