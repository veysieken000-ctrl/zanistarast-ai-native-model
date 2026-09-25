import{publicAdmission}from"./review-gates.js";
export function verifyPilotPackage(manifest,reviewState,unresolved){
 const errors=[];
 if(!manifest||!reviewState||!unresolved)return{valid:false,admission:"BLOCKED",errors:["MISSING_PACKAGE_PART"]};
 if(manifest.candidateId!==reviewState.candidateId||manifest.candidateId!==unresolved.candidateId)errors.push("CANDIDATE_ID_MISMATCH");
 if(manifest.version!==reviewState.version||manifest.version!==unresolved.version)errors.push("VERSION_MISMATCH");
 const items=unresolved.items??[];
 const state={...reviewState,unresolvedItems:items.map(x=>({id:x.id,blocking:x.blocking,status:x.status}))};
 const computed=publicAdmission(state);
 if(manifest.publicAdmission!==computed)errors.push("MANIFEST_ADMISSION_MISMATCH");
 if(computed==="ADMITTED"&&items.some(x=>x.blocking!==false&&x.status!=="RESOLVED"))errors.push("OPEN_BLOCKER");
 return Object.freeze({valid:errors.length===0,admission:errors.length?"BLOCKED":computed,errors:Object.freeze(errors)});
}
