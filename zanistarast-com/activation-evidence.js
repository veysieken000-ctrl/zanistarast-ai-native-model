const STATES=new Set(["OPEN","RESOLVED"]);
export function validateActivationReceipt(receipt,{candidateId,version,checkIds=[]}={}){
 const errors=[];
 if(!receipt||typeof receipt!=="object")return Object.freeze({valid:false,errors:Object.freeze(["MISSING_RECEIPT"])});
 if(receipt.candidateId!==candidateId)errors.push("CANDIDATE_ID_MISMATCH");
 if(receipt.version!==version)errors.push("VERSION_MISMATCH");
 if(!checkIds.includes(receipt.checkId))errors.push("UNKNOWN_CHECK_ID");
 if(!STATES.has(receipt.state))errors.push("INVALID_STATE");
 const evidence=Array.isArray(receipt.evidence)?receipt.evidence:[];
 if(receipt.state==="RESOLVED"&&evidence.length===0)errors.push("RESOLVED_WITHOUT_EVIDENCE");
 for(const item of evidence){
  if(!item?.id||!item?.kind||!item?.reference)errors.push("INVALID_EVIDENCE_ITEM");
  if(item?.exactVersion!==version)errors.push("EVIDENCE_VERSION_MISMATCH");
 }
 return Object.freeze({valid:errors.length===0,errors:Object.freeze([...new Set(errors)])});
}
