export const FEEDBACK_ACTION=Object.freeze({LIKE:"LIKE",NOT_INTERESTED:"NOT_INTERESTED",REPORT:"REPORT",REQUEST:"REQUEST",SUGGESTION:"SUGGESTION",COMPLAINT:"COMPLAINT"});
export const REPORT_REASON=Object.freeze({MISLEADING:"MISLEADING",SOURCE:"SOURCE",RIGHTS:"RIGHTS",INAPPROPRIATE_VISUAL:"INAPPROPRIATE_VISUAL",HIDDEN_PROMOTION:"HIDDEN_PROMOTION",HATE_OR_ABUSE:"HATE_OR_ABUSE",TECHNICAL:"TECHNICAL",OTHER:"OTHER"});
const actions=new Set(Object.values(FEEDBACK_ACTION)),reasons=new Set(Object.values(REPORT_REASON));
const LIMIT=Object.freeze({ID:160,DETAIL:2000,QUEUE:200});
const clean=(v,max=LIMIT.ID)=>String(v??"").trim().slice(0,max);

export function normalizeFeedback({feedbackId=null,senderId=null,workId=null,version=null,action=null,reason=null,detail=null}={}){
 const id=clean(feedbackId),sender=clean(senderId),work=clean(workId),exactVersion=clean(version);
 if(!id||!sender||!work||!exactVersion||!actions.has(action))return Object.freeze({accepted:false,reason:"INVALID_FEEDBACK"});
 if(action===FEEDBACK_ACTION.REPORT&&!reasons.has(reason))return Object.freeze({accepted:false,reason:"REPORT_REASON_REQUIRED"});
 return Object.freeze({accepted:true,feedbackId:id,senderId:sender,workId:work,version:exactVersion,action,reason:action===FEEDBACK_ACTION.REPORT?reason:null,detail:clean(detail,LIMIT.DETAIL)||null});
}

export function feedbackReviewRoute(feedback){
 if(feedback?.accepted!==true)return Object.freeze({next:"STOP",humanSignal:false,automaticVerdict:false});
 if(feedback.action===FEEDBACK_ACTION.LIKE||feedback.action===FEEDBACK_ACTION.NOT_INTERESTED)return Object.freeze({next:"PERSONALIZATION",humanSignal:true,automaticVerdict:false});
 if(feedback.action===FEEDBACK_ACTION.REPORT)return Object.freeze({next:"REVIEW_QUEUE",humanSignal:true,automaticVerdict:false});
 return Object.freeze({next:"FEEDBACK_INTAKE",humanSignal:true,automaticVerdict:false});
}

export function createFeedbackStore(storage=globalThis.localStorage,key="zanistarast-com:feedback:v1"){
 const read=()=>{try{const value=JSON.parse(storage?.getItem(key)||"[]");return Array.isArray(value)?value:[]}catch{return[]}};
 const write=items=>{try{storage?.setItem(key,JSON.stringify(items))}catch{}return items};
 return Object.freeze({
  submit:input=>{const feedback=normalizeFeedback(input);if(!feedback.accepted)return feedback;const existing=read();if(existing.some(x=>x?.feedbackId===feedback.feedbackId))return Object.freeze({accepted:false,reason:"DUPLICATE_FEEDBACK"});const route=feedbackReviewRoute(feedback),record=Object.freeze({...feedback,route:route.next,automaticVerdict:false});write([...existing,record].slice(-LIMIT.QUEUE));return record},
  pending:()=>Object.freeze(read().slice(-LIMIT.QUEUE).map(x=>Object.freeze({...x}))),
  clear:()=>write([])
 });
}
