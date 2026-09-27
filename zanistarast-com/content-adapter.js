import{works}from"./data.js";
import{canRenderPublic,toWorkDetail,toWorkSummary}from"./contracts.js";

export function createContentAdapter(records=works){
 const admitted=()=>records.filter(canRenderPublic);
 return Object.freeze({
   list:()=>admitted().map(toWorkSummary).filter(Boolean),
   get:id=>{const r=admitted().find(x=>x.workId===id);return r?toWorkDetail(r):null}
 });
}

export function admitVerifiedCandidate(record,verification){
 if(!record||verification?.valid!==true||verification?.admission!=="ADMITTED")return null;
 if(record.demo===true||record.publicationState!=="PUBLISHED"||record.eligible!==true)return null;
 return canRenderPublic(record)?Object.freeze({...record}):null;
}

export const contentAdapter=createContentAdapter();
