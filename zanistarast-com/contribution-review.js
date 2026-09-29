export const PREFILTER_REASON=Object.freeze({
 EMPTY:"EMPTY",UNDECLARED_PROMOTION:"UNDECLARED_PROMOTION",MISSING_SOURCE:"MISSING_SOURCE",MISSING_RIGHTS:"MISSING_RIGHTS",UNSAFE:"UNSAFE"
});
const text=v=>String(v??"").trim();

export function contributionPrefilter({kind=null,textContent=null,sourceRefs=[],rightsDeclared=false,promotionDeclared=false,containsPromotion=false,safetyFlag=false}={}){
 const hasBody=Boolean(text(textContent));
 if(!hasBody)return Object.freeze({pass:false,reason:PREFILTER_REASON.EMPTY});
 if(safetyFlag===true)return Object.freeze({pass:false,reason:PREFILTER_REASON.UNSAFE});
 if(containsPromotion===true&&promotionDeclared!==true)return Object.freeze({pass:false,reason:PREFILTER_REASON.UNDECLARED_PROMOTION});
 const contentLike=kind==="CONTENT"||kind==="MEDIA";
 if(contentLike&&(!Array.isArray(sourceRefs)||sourceRefs.length===0||!sourceRefs.every(x=>text(x))))return Object.freeze({pass:false,reason:PREFILTER_REASON.MISSING_SOURCE});
 if(contentLike&&rightsDeclared!==true)return Object.freeze({pass:false,reason:PREFILTER_REASON.MISSING_RIGHTS});
 return Object.freeze({pass:true,reason:null});
}

export function contributionReviewPlan({senderGateResult=null,prefilterResult=null}={}){
 if(senderGateResult?.accepted!==true)return Object.freeze({proceed:false,next:"STOP",expensiveReviewAllowed:false});
 if(prefilterResult?.pass!==true)return Object.freeze({proceed:false,next:"REJECT_OR_REVIEW",expensiveReviewAllowed:false});
 if(senderGateResult.expensiveReviewAllowed!==true)return Object.freeze({proceed:true,next:"MANUAL_TRUST_REVIEW",expensiveReviewAllowed:false});
 return Object.freeze({proceed:true,next:"PROVENANCE_RIGHTS_SUITABILITY",expensiveReviewAllowed:true});
}
