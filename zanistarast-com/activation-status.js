import{validateActivationReceipt}from"./activation-evidence.js";

export function activationStatus(checklist,receipts=[]){
 const checks=checklist?.checks??[];
 const ctx={candidateId:checklist?.candidateId,version:checklist?.version,checkIds:checks.map(x=>x.id)};
 const byId=new Map();
 for(const receipt of receipts){
  const result=validateActivationReceipt(receipt,ctx);
  if(!result.valid)continue;
  byId.set(receipt.checkId,receipt);
 }
 const states=checks.map(check=>{
  const receipt=byId.get(check.id);
  return Object.freeze({id:check.id,state:receipt?.state==="RESOLVED"?"RESOLVED":"OPEN"});
 });
 const ready=checks.length>0&&states.every(x=>x.state==="RESOLVED");
 return Object.freeze({ready,status:ready?"EVIDENCE_COMPLETE":"BLOCKED",checks:Object.freeze(states)});
}
