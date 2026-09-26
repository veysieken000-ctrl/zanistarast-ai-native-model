export const INSPECTION_STATE=Object.freeze({PASS:"PASS",REVIEW:"REVIEW",BLOCK:"BLOCK"});
const nonempty=v=>typeof v==="string"&&v.trim().length>0;

export function inspectAdCreative(creative,{declaredText=[],declaredAudio=[],declaredVisuals=[],framesReviewed=false,audioReviewed=false,metadataReviewed=false,reviewerNotes=[]}={}){
 const findings=[];
 if(!nonempty(creative?.creativeId)||!nonempty(creative?.version))findings.push({code:"IDENTITY_MISSING",state:INSPECTION_STATE.BLOCK});
 if(!creative?.representation?.id||creative.representation.version!==creative?.version)findings.push({code:"EXACT_VERSION_MISSING",state:INSPECTION_STATE.BLOCK});
 const kind=creative?.representation?.kind??"unknown";
 if(kind==="video"&&!framesReviewed)findings.push({code:"FRAME_REVIEW_REQUIRED",state:INSPECTION_STATE.REVIEW});
 if((kind==="video"||kind==="audio")&&!audioReviewed)findings.push({code:"AUDIO_REVIEW_REQUIRED",state:INSPECTION_STATE.REVIEW});
 if(!metadataReviewed)findings.push({code:"METADATA_REVIEW_REQUIRED",state:INSPECTION_STATE.REVIEW});
 const declarations=[...declaredText,...declaredAudio,...declaredVisuals];
 if(declarations.some(x=>!nonempty(x)))findings.push({code:"EMPTY_DECLARATION",state:INSPECTION_STATE.REVIEW});
 const prohibited=creative?.inspectionSignals??[];
 for(const signal of prohibited){
  if(["HIDDEN_MESSAGE","SYSTEM_WARNING_IMPERSONATION","UNDISCLOSED_SPONSORSHIP","DECEPTIVE_COUNTDOWN","FORCED_CLICK","SENSORY_MANIPULATION"].includes(signal))
   findings.push({code:signal,state:INSPECTION_STATE.BLOCK});
 }
 const state=findings.some(x=>x.state===INSPECTION_STATE.BLOCK)?INSPECTION_STATE.BLOCK:
  findings.some(x=>x.state===INSPECTION_STATE.REVIEW)?INSPECTION_STATE.REVIEW:INSPECTION_STATE.PASS;
 return Object.freeze({creativeId:creative?.creativeId??null,version:creative?.version??null,state,findings:Object.freeze(findings),reviewerNotes:Object.freeze([...reviewerNotes]),automatedClearance:false});
}

export function antiManipulationReviewEvidence(inspection){
 if(!inspection||inspection.state!==INSPECTION_STATE.PASS)return Object.freeze({ready:false,reason:"INSPECTION_NOT_PASS"});
 return Object.freeze({ready:true,review:Object.freeze({version:inspection.version,state:"PASS",evidence:Object.freeze(["static-media-inspection:"+inspection.creativeId+":"+inspection.version])}),humanOrGovernedReviewRequired:true});
}
