export const FEEDBACK_ACTION=Object.freeze({LIKE:"LIKE",NOT_INTERESTED:"NOT_INTERESTED",REPORT:"REPORT",REQUEST:"REQUEST",SUGGESTION:"SUGGESTION",COMPLAINT:"COMPLAINT"});
export const REPORT_REASON=Object.freeze({MISLEADING:"MISLEADING",SOURCE:"SOURCE",RIGHTS:"RIGHTS",INAPPROPRIATE_VISUAL:"INAPPROPRIATE_VISUAL",HIDDEN_PROMOTION:"HIDDEN_PROMOTION",HATE_OR_ABUSE:"HATE_OR_ABUSE",TECHNICAL:"TECHNICAL",OTHER:"OTHER"});
const actions=new Set(Object.values(FEEDBACK_ACTION)),reasons=new Set(Object.values(REPORT_REASON));
const clean=v=>String(v??"").trim();

export function normalizeFeedback({feedbackId=null,senderId=null,workId=null,version=null,action=null,reason=null,detail=null}={}){
 if(!clean(feedbackId)||!clean(senderId)||!clean(workId)||!clean(version)||!actions.has(action))return Object.freeze({accepted:false,reason:"INVALID_FEEDBACK"});
 if(action===FEEDBACK_ACTION.REPORT&&!reasons.has(reason))return Object.freeze({accepted:false,reason:"REPORT_REASON_REQUIRED"});
 return Object.freeze({accepted:true,feedbackId:clean(feedbackId),senderId:clean(senderId),workId:clean(workId),version:clean(version),action,reason:action===FEEDBACK_ACTION.REPORT?reason:null,detail:clean(detail)||null});
}

export function feedbackReviewRoute(feedback){
 if(feedback?.accepted!==true)return Object.freeze({next:"STOP",humanSignal:false,automaticVerdict:false});
 if(feedback.action===FEEDBACK_ACTION.LIKE||feedback.action===FEEDBACK_ACTION.NOT_INTERESTED)return Object.freeze({next:"PERSONALIZATION",humanSignal:true,automaticVerdict:false});
 if(feedback.action===FEEDBACK_ACTION.REPORT)return Object.freeze({next:"REVIEW_QUEUE",humanSignal:true,automaticVerdict:false});
 return Object.freeze({next:"FEEDBACK_INTAKE",humanSignal:true,automaticVerdict:false});
}
