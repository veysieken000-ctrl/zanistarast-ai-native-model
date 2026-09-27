export const OFFLINE_RELEASE_CHECKS=Object.freeze(["smokeGreen","staticBoundaryGreen","secretsScanGreen","restoreTested","withdrawalTested"]);
export const LIVE_RELEASE_CHECKS=Object.freeze(["accessibilityChecked","performanceChecked","apiConfigured","storageConfigured","deploymentApproved"]);
export function productionReadiness(checks){
 const required=[...OFFLINE_RELEASE_CHECKS,...LIVE_RELEASE_CHECKS];
 const missing=required.filter(k=>checks?.[k]!==true);
 return Object.freeze({ready:missing.length===0,missing:Object.freeze(missing)});
}
export function offlineReleaseReadiness(checks){
 const missing=OFFLINE_RELEASE_CHECKS.filter(k=>checks?.[k]!==true);
 return Object.freeze({ready:missing.length===0,missing:Object.freeze(missing)});
}
export function containsLikelySecret(text){
 return /(BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY|postgres(?:ql)?:\/\/[^\s]+:[^\s]+@|api[_-]?key\s*[:=]\s*["'][^"']+|secret\s*[:=]\s*["'][^"']+)/i.test(String(text??""));
}
