export const KURMANCI="ku";
export const KURMANCI_VISIBILITY_COUNTRIES=Object.freeze(["TR","IR","SY","IQ"]);

const normCountry=value=>String(value??"").trim().toUpperCase();
const normLocale=value=>String(value??"").trim().toLowerCase().replace("_","-").split("-")[0];

export function resolveInitialLocale({savedLocale=null,browserLocales=[],country=null,availableLocales=[]}={}){
 const available=new Set(availableLocales);
 const saved=normLocale(savedLocale);if(saved&&available.has(saved))return saved;
 for(const candidate of Array.isArray(browserLocales)?browserLocales:[]){
  const locale=normLocale(candidate);if(available.has(locale))return locale;
 }
 return available.has(KURMANCI)?KURMANCI:[...available][0]??KURMANCI;
}

export function kurmanciVisibility({country=null,activeLocale=null}={}){
 const countryCode=normCountry(country),regional=KURMANCI_VISIBILITY_COUNTRIES.includes(countryCode);
 return Object.freeze({
  regional,
  showPersistentKurmanciChoice:regional&&normLocale(activeLocale)!==KURMANCI,
  inferEthnicity:false,
  forceLocale:false
 });
}
