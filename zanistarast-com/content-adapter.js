import{works}from"./data.js";
import{canRenderPublic,toWorkDetail,toWorkSummary}from"./contracts.js";

export function createContentAdapter(records=works){
 const admitted=()=>records.filter(canRenderPublic);
 return Object.freeze({
   list:()=>admitted().map(toWorkSummary).filter(Boolean),
   get:id=>{const r=admitted().find(x=>x.workId===id);return r?toWorkDetail(r):null}
 });
}
export const contentAdapter=createContentAdapter();
