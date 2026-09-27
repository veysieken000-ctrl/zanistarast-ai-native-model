const ORIGIN=Object.freeze({ORG:"ORG",COM:"COM",EXTERNAL:"EXTERNAL"});
const nonempty=v=>typeof v==="string"&&v.trim().length>0;
const publicStates=new Set(["PUBLISHED","ADMITTED","DEMO"]);
export function normalizeBridgeRecord(x={}){
 return Object.freeze({id:x.id??null,version:x.version??null,origin:x.origin??null,canonicalUrl:x.canonicalUrl??null,title:x.title??"",publicTitle:x.publicTitle??x.title??"",type:x.type??"unknown",language:x.language??null,topics:Object.freeze([...(x.topics??[])]),provenance:x.provenance??null,rightsStatus:x.rightsStatus??null,status:x.status??null,rasterast:x.rasterast??null,related:Object.freeze([...(x.related??[])]),withdrawn:x.withdrawn===true,supersededBy:x.supersededBy??null,checkedAt:x.checkedAt??null});
}
export function bridgeEligible(x){
 const r=normalizeBridgeRecord(x);
 if(!nonempty(r.id)||!nonempty(r.version)||!Object.values(ORIGIN).includes(r.origin)||!nonempty(r.canonicalUrl)||r.withdrawn)return false;
 if(r.origin===ORIGIN.ORG)return r.status==="PUBLISHED";
 if(r.origin===ORIGIN.COM)return publicStates.has(r.status)&&r.rasterast==="PASS";
 return r.status==="ADMITTED"&&["CLEARED","LINK_ONLY","EMBED_ALLOWED"].includes(r.rightsStatus)&&r.rasterast==="PASS";
}
const norm=v=>String(v??"").toLocaleLowerCase("tr");
export function createBridgeIndex(records=[]){
 const eligible=()=>records.map(normalizeBridgeRecord).filter(bridgeEligible);
 return Object.freeze({
  list:()=>Object.freeze(eligible()),
  search(query){const q=norm(query).trim();return Object.freeze(eligible().filter(r=>!q||norm([r.title,r.publicTitle,r.type,r.language,...r.topics].join(" ")).includes(q)))},
  related(id){const pool=eligible(),source=pool.find(x=>x.id===id);if(!source)return Object.freeze([]);const ids=new Set(source.related);return Object.freeze(pool.filter(x=>ids.has(x.id)))}
 });
}
export{ORIGIN as BRIDGE_ORIGIN};

export function bridgeNextSteps(record,index){
 const r=normalizeBridgeRecord(record);if(!bridgeEligible(r))return Object.freeze([]);
 const related=index?.related?.(r.id)??[];
 const label=x=>x.origin===ORIGIN.ORG?"Bilimsel kaynağı oku":x.type==="video"?"Videoyu izle":x.type==="documentary"?"Belgeseli izle":x.type==="interview"?"Söyleşiyi dinle":x.type==="presentation"?"Sunumu aç":x.type==="audio"?"Dinle":"İlgili içeriği aç";
 return Object.freeze(related.map(x=>Object.freeze({id:x.id,version:x.version,origin:x.origin,label:label(x),url:x.canonicalUrl,type:x.type})));
}
export function externalDiscoveryCandidate(x={}){
 return Object.freeze({candidate:true,publiclyIndexed:false,origin:ORIGIN.EXTERNAL,id:x.id??null,version:x.version??null,canonicalUrl:x.canonicalUrl??null,title:x.title??"",type:x.type??"unknown",language:x.language??null,topics:Object.freeze([...(x.topics??[])]),provenance:x.provenance??null,rightsStatus:x.rightsStatus??"UNVERIFIED",status:"DISCOVERED",rasterast:"UNVERIFIED",checkedAt:x.checkedAt??null,requires:Object.freeze(["DEDUPLICATION","RELEVANCE","RIGHTS_LICENSE","SOURCE_TRUST","RASTERAST","ADMISSION"])});
}

export function admitExternalCandidate(candidate,{rightsStatus,sourceTrust,rasterast,reviewedAt,canonicalUrl}={}){
 if(candidate?.origin!==ORIGIN.EXTERNAL||candidate?.candidate!==true)return Object.freeze({admitted:false,reason:"NOT_EXTERNAL_CANDIDATE"});
 if(!nonempty(candidate.id)||!nonempty(candidate.version)||!nonempty(canonicalUrl??candidate.canonicalUrl))return Object.freeze({admitted:false,reason:"IDENTITY_OR_URL_MISSING"});
 if(!["CLEARED","LINK_ONLY","EMBED_ALLOWED"].includes(rightsStatus))return Object.freeze({admitted:false,reason:"RIGHTS_NOT_CLEARED"});
 if(sourceTrust!=="PASS")return Object.freeze({admitted:false,reason:"SOURCE_TRUST_NOT_PASS"});
 if(rasterast!=="PASS")return Object.freeze({admitted:false,reason:"RASTERAST_NOT_PASS"});
 if(!nonempty(reviewedAt))return Object.freeze({admitted:false,reason:"REVIEW_TIME_REQUIRED"});
 const record=normalizeBridgeRecord({...candidate,canonicalUrl:canonicalUrl??candidate.canonicalUrl,rightsStatus,status:"ADMITTED",rasterast,checkedAt:reviewedAt,withdrawn:false});
 return Object.freeze({admitted:bridgeEligible(record),record});
}
export function refreshBridgeRecord(record,{available=true,rightsStatus=record?.rightsStatus,status=record?.status,rasterast=record?.rasterast,checkedAt}={}){
 if(!nonempty(checkedAt))throw new Error("CHECK_TIME_REQUIRED");
 const withdrawn=!available||status==="WITHDRAWN"||rightsStatus==="REVOKED";
 return normalizeBridgeRecord({...record,rightsStatus,status:withdrawn?"WITHDRAWN":status,rasterast,withdrawn,checkedAt});
}
