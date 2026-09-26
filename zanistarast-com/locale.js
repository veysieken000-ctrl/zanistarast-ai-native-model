const FALLBACK="ku";
const COPY={
 ku:{era:"Serdema Fıtrat û Exlaqê",civilization:"Şaristaniya Newroza Kawa"},
 en:{era:"The Age of Fitrah and Morality",civilization:"Newroza Kawa Civilization"},
 de:{era:"Zeitalter von Fitrah und Moral",civilization:"Newroza-Kawa-Zivilisation"},
 tr:{era:"Fıtrat ve Ahlak Çağı",civilization:"Newroza Kawa Uygarlığı"}
};
const LOCALE_KEY="zanistarast-com:locale:v1";
const base=v=>String(v||"").toLowerCase().split("-")[0];
export function savedLocale(){try{const k=base(localStorage.getItem(LOCALE_KEY));return COPY[k]?k:null}catch{return null}}
export function setLocale(locale){const k=COPY[base(locale)]?base(locale):FALLBACK;try{localStorage.setItem(LOCALE_KEY,k)}catch{}applyIdentityLocale(k);return k}
export function detectLocale(){const saved=savedLocale();if(saved)return saved;for(const v of navigator.languages||[navigator.language]){const k=base(v);if(COPY[k])return k}return FALLBACK}
export function applyIdentityLocale(locale=detectLocale()){const k=COPY[base(locale)]?base(locale):FALLBACK;document.documentElement.lang=k;const e=document.querySelector("#era-title"),c=document.querySelector("#civilization-title");if(e)e.textContent=COPY[k].era;if(c)c.textContent=COPY[k].civilization;return k}
export{FALLBACK,COPY};
