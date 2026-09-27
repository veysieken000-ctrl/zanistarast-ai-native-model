import{verifyPilotPackage}from"./pilot-verifier.js";

const same=(a,b)=>a?.candidateId===b?.candidateId&&a?.version===b?.version;
export function verifyContentPackage({manifest,reviewState,unresolved,evidenceIndex,publicContent,mediaManifest,representations,publicCopy}={}){
 const errors=[];
 const parts=[reviewState,unresolved,evidenceIndex,publicContent,mediaManifest,representations,publicCopy];
 if(!manifest||parts.some(x=>!x))return Object.freeze({valid:false,admission:"BLOCKED",errors:Object.freeze(["MISSING_PACKAGE_PART"])});
 for(const part of parts)if(!same(manifest,part)){errors.push("IDENTITY_OR_VERSION_MISMATCH");break}
 const pilot=verifyPilotPackage(manifest,reviewState,unresolved);
 if(!pilot.valid)errors.push(...pilot.errors);
 const expectedSurfaceAdmission=pilot.admission==="ADMITTED"?"ADMITTED":"BLOCKED";
 if(publicContent.publicAdmission!==expectedSurfaceAdmission||representations.publicAdmission!==expectedSurfaceAdmission||publicCopy.publicAdmission!==expectedSurfaceAdmission)errors.push(pilot.admission==="ADMITTED"?"PUBLIC_SURFACES_NOT_ADMITTED":"PREMATURE_PUBLIC_ADMISSION");
 if(mediaManifest.status!=="NO_FINAL_MEDIA"&&(!Array.isArray(mediaManifest.assets)||mediaManifest.assets.length===0))errors.push("MEDIA_STATUS_WITHOUT_ASSETS");
 if((representations.representations??[]).some(r=>r.final===true)&&mediaManifest.status!=="FINAL_MEDIA")errors.push("FINAL_REPRESENTATION_WITHOUT_FINAL_MEDIA");
 if(pilot.admission==="ADMITTED"){
  if(mediaManifest.status!=="FINAL_MEDIA"||!Array.isArray(mediaManifest.assets)||mediaManifest.assets.length===0)errors.push("FINAL_MEDIA_REQUIRED");
  if((representations.representations??[]).some(r=>r.final!==true))errors.push("NON_FINAL_REPRESENTATION");
 }
 const admission=errors.length===0&&pilot.admission==="ADMITTED"?"ADMITTED":"BLOCKED";
 return Object.freeze({valid:errors.length===0,admission,errors:Object.freeze([...new Set(errors)])});
}
