export function nextActivationAction(handoff,resolvedIds=[]){
 const resolved=new Set(resolvedIds);
 for(const action of handoff?.nextActions??[]){
  if(resolved.has(action.checkId))continue;
  const deps=action.dependsOn??[];
  if(deps.every(id=>resolved.has(id)))return Object.freeze({...action});
 }
 return null;
}

export function nextActivationActionFromReceipts(handoff,checklist,receipts=[]){
 const checkIds=(checklist?.checks??[]).map(x=>x.id);
 const resolvedIds=receipts.filter(r=>r?.candidateId===checklist?.candidateId&&r?.version===checklist?.version&&checkIds.includes(r?.checkId)&&r?.state==="RESOLVED"&&Array.isArray(r?.evidence)&&r.evidence.length>0&&r.evidence.every(e=>e?.id&&e?.kind&&e?.reference&&e?.exactVersion===checklist?.version)).map(r=>r.checkId);
 return nextActivationAction(handoff,resolvedIds);
}
