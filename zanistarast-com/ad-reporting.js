export const DELIVERY_STATUS=Object.freeze({ACTIVE:"ACTIVE",NEAR_LIMIT:"NEAR_LIMIT",FULFILLED:"FULFILLED",EXPIRED:"EXPIRED",PAUSED:"PAUSED",WITHDRAWN:"WITHDRAWN"});
export function externalCampaignReport(campaign,metrics={},now=new Date()){
 if(!campaign||campaign.kind==="INTERNAL_ANNOUNCEMENT")return null;
 const purchased=Math.max(0,Number(campaign.impressionEntitlement??0));
 const delivered=Math.max(0,Number(metrics.impressions??0));
 const remaining=Math.max(0,purchased-delivered);
 const percent=purchased?Math.min(100,(delivered/purchased)*100):0;
 const end=new Date(campaign.endAt),t=now instanceof Date?now:new Date(now);
 let status=DELIVERY_STATUS.ACTIVE;
 if(campaign.state==="PAUSED")status=DELIVERY_STATUS.PAUSED;
 else if(campaign.state==="WITHDRAWN")status=DELIVERY_STATUS.WITHDRAWN;
 else if(purchased>0&&remaining===0)status=DELIVERY_STATUS.FULFILLED;
 else if(Number.isFinite(end.getTime())&&t>end)status=DELIVERY_STATUS.EXPIRED;
 else if(purchased>0&&remaining/purchased<=0.1)status=DELIVERY_STATUS.NEAR_LIMIT;
 return Object.freeze({campaignId:campaign.campaignId,version:campaign.version,sponsor:campaign.sponsor?.name??null,purchasedImpressions:purchased,deliveredImpressions:delivered,remainingImpressions:remaining,deliveryPercent:Number(percent.toFixed(2)),status,startAt:campaign.startAt,endAt:campaign.endAt,lastUpdatedAt:metrics.lastUpdatedAt??null});
}
export function shouldIssueCampaignReport(report,{periodDue=false}={}){
 if(!report)return false;
 return periodDue||[DELIVERY_STATUS.NEAR_LIMIT,DELIVERY_STATUS.FULFILLED,DELIVERY_STATUS.EXPIRED,DELIVERY_STATUS.WITHDRAWN].includes(report.status);
}
