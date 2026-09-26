export const GOVERNANCE=Object.freeze({DEMO:"DEMO",ADMITTED:"ADMITTED",PENDING:"PENDING",BLOCKED:"BLOCKED",WITHDRAWN:"WITHDRAWN"});

export function toWorkSummary(record){
 if(!record||!record.workId||!record.title||!record.summary)return null;
 return Object.freeze({workId:record.workId,version:record.version??null,title:record.title,summary:record.summary,format:record.format??"",language:record.language??"",values:Object.freeze([...(record.values??[])]),demo:record.demo===true,publishedAt:record.publishedAt??record.addedAt??null,localizations:record.localizations??null});
}

export function toWorkDetail(record){
 const summary=toWorkSummary(record);if(!summary)return null;
 return Object.freeze({...summary,reading:record.reading??"",sourceSummary:record.sourceSummary??record.source??"",representation:record.representation??null,transcript:record.transcript??record.representation?.transcript??null});
}

export function publicGovernance(record){
 if(record?.demo===true)return record.publicationState==="DEMO"?GOVERNANCE.DEMO:GOVERNANCE.BLOCKED;
 if(record?.publicationState==="WITHDRAWN")return GOVERNANCE.WITHDRAWN;
 if(record?.publicationState==="BLOCKED")return GOVERNANCE.BLOCKED;
 if(record?.publicationState!=="PUBLISHED")return GOVERNANCE.PENDING;
 const g=record.governance;
 if(!record.version||record.eligible!==true||g?.rights!==true||g?.rasterast!==true||g?.mudabbirRequired===true&&g?.mudabbirApproved!==true)return GOVERNANCE.BLOCKED;
 return GOVERNANCE.ADMITTED;
}

export const canRenderPublic=record=>[GOVERNANCE.DEMO,GOVERNANCE.ADMITTED].includes(publicGovernance(record));
