export function productionReadiness(checks){
 const required=["smokeGreen","accessibilityChecked","performanceChecked","secretsScanGreen","restoreTested","withdrawalTested","apiConfigured","storageConfigured","deploymentApproved"];
 const missing=required.filter(k=>checks?.[k]!==true);
 return Object.freeze({ready:missing.length===0,missing:Object.freeze(missing)});
}
export function containsLikelySecret(text){
 return /(BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY|postgres(?:ql)?:\/\/[^\s]+:[^\s]+@|api[_-]?key\s*[:=]\s*["'][^"']+|secret\s*[:=]\s*["'][^"']+)/i.test(String(text??""));
}
