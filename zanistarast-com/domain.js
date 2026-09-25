export const PUBLICATION=Object.freeze({DEMO:"DEMO",PUBLISHED:"PUBLISHED",PENDING:"PENDING",BLOCKED:"BLOCKED",WITHDRAWN:"WITHDRAWN"});
export function isPubliclyRenderable(work){
 if(!work||typeof work.workId!=="string"||!work.workId)return false;
 if(work.demo===true)return work.publicationState===PUBLICATION.DEMO;
 return work.publicationState===PUBLICATION.PUBLISHED&&work.eligible===true&&typeof work.version==="string"&&work.version.length>0;
}
export const publicWorks=works=>works.filter(isPubliclyRenderable);
export const publicWorkById=(works,id)=>publicWorks(works).find(w=>w.workId===id);
