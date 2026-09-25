export const ENV=Object.freeze({LOCAL:"local",STAGING:"staging",PRODUCTION:"production"});
export function runtimeConfig(source=globalThis){
 const env=source?.ZANISTARAST_ENV??ENV.LOCAL;
 const apiBase=source?.ZANISTARAST_API_BASE??null;
 if(env===ENV.PRODUCTION&&(!apiBase||!String(apiBase).startsWith("https://")))throw new Error("Production requires HTTPS API base");
 return Object.freeze({env,apiBase,production:env===ENV.PRODUCTION});
}
export const PUBLIC_CONFIG_KEYS=Object.freeze(["ZANISTARAST_ENV","ZANISTARAST_API_BASE"]);
