export const ENV=Object.freeze({LOCAL:"local",STAGING:"staging",PRODUCTION:"production"});
export function runtimeConfig(source=globalThis){
 const env=source?.ZANISTARAST_ENV??ENV.LOCAL;
 const apiBase=source?.ZANISTARAST_API_BASE??null;
 const orgDiscoveryBase=source?.ZANISTARAST_ORG_DISCOVERY_BASE??null;
 const country=String(source?.ZANISTARAST_COUNTRY??"").trim().toUpperCase()||null;
 if(env===ENV.PRODUCTION&&(!apiBase||!String(apiBase).startsWith("https://")))throw new Error("Production requires HTTPS API base");
 if(orgDiscoveryBase&&!String(orgDiscoveryBase).startsWith("https://"))throw new Error("Org discovery base requires HTTPS");
 if(country&&!/^[A-Z]{2}$/.test(country))throw new Error("Country hint must be ISO alpha-2");
 return Object.freeze({env,apiBase,orgDiscoveryBase,country,production:env===ENV.PRODUCTION});
}
export const PUBLIC_CONFIG_KEYS=Object.freeze(["ZANISTARAST_ENV","ZANISTARAST_API_BASE","ZANISTARAST_ORG_DISCOVERY_BASE","ZANISTARAST_COUNTRY"]);
