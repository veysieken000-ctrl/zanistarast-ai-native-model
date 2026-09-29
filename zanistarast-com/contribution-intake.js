export const SUBMISSION_KIND=Object.freeze({QUESTION:"QUESTION",OBSERVATION:"OBSERVATION",PROPOSAL:"PROPOSAL",CONTENT:"CONTENT",MEDIA:"MEDIA"});
export const TRUST_STATE=Object.freeze({NORMAL:"NORMAL",REVIEW:"REVIEW",RESTRICTED:"RESTRICTED",BLOCKED:"BLOCKED"});
export const INTAKE_STATE=Object.freeze({QUARANTINED:"QUARANTINED",REJECTED:"REJECTED",STOPPED:"STOPPED"});

const kinds=new Set(Object.values(SUBMISSION_KIND)),trustStates=new Set(Object.values(TRUST_STATE));
const text=v=>String(v??"").trim();

export function senderGate({senderId=null,trustState=TRUST_STATE.NORMAL}={}){
 const validSender=Boolean(text(senderId)),validTrust=trustStates.has(trustState);
 if(!validSender||!validTrust)return Object.freeze({accepted:false,state:INTAKE_STATE.STOPPED,reason:"INVALID_SENDER_CONTEXT",expensiveReviewAllowed:false});
 if(trustState===TRUST_STATE.BLOCKED)return Object.freeze({accepted:false,state:INTAKE_STATE.STOPPED,reason:"SENDER_BLOCKED",expensiveReviewAllowed:false});
 return Object.freeze({accepted:true,state:INTAKE_STATE.QUARANTINED,reason:null,expensiveReviewAllowed:trustState!==TRUST_STATE.RESTRICTED});
}

export function intakeSubmission({submissionId=null,senderId=null,trustState=TRUST_STATE.NORMAL,kind=null,payload=null}={}){
 const gate=senderGate({senderId,trustState});
 if(!gate.accepted)return Object.freeze({...gate,submissionId:text(submissionId)||null,kind:kinds.has(kind)?kind:null});
 if(!text(submissionId)||!kinds.has(kind)||payload==null)return Object.freeze({accepted:false,state:INTAKE_STATE.REJECTED,reason:"INVALID_SUBMISSION",expensiveReviewAllowed:false,submissionId:text(submissionId)||null,kind:kinds.has(kind)?kind:null});
 return Object.freeze({accepted:true,state:INTAKE_STATE.QUARANTINED,reason:null,expensiveReviewAllowed:gate.expensiveReviewAllowed,submissionId:text(submissionId),kind});
}

export function trustTransition(current,event){
 if(!trustStates.has(current))return TRUST_STATE.REVIEW;
 const e=text(event).toUpperCase();
 if(e==="SEVERE_ABUSE")return TRUST_STATE.BLOCKED;
 if(e==="REPEATED_BYPASS"||e==="REPEATED_DECEPTION")return current===TRUST_STATE.RESTRICTED?TRUST_STATE.BLOCKED:TRUST_STATE.RESTRICTED;
 if(e==="REPEATED_REJECTED")return current===TRUST_STATE.NORMAL?TRUST_STATE.REVIEW:current;
 if(e==="RECONSIDERED_CLEAR")return TRUST_STATE.NORMAL;
 return current;
}
