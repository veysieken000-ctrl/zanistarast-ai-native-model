const FALLBACK="ku";
const COPY={
 ku:{era:"Serdema Fıtrat û Exlaqê",civilization:"Şaristaniya Newroza Kawa"},
 en:{era:"The Age of Fitrah and Morality",civilization:"Newroza Kawa Civilization"},
 de:{era:"Zeitalter von Fitrah und Moral",civilization:"Newroza-Kawa-Zivilisation"},
 tr:{era:"Fıtrat ve Ahlak Çağı",civilization:"Newroza Kawa Uygarlığı"}
};
const base=v=>String(v||"").toLowerCase().split("-")[0];
export function detectLocale(){for(const v of navigator.languages||[navigator.language]){const k=base(v);if(COPY[k])return k}return FALLBACK}
export function applyIdentityLocale(locale=detectLocale()){const k=COPY[base(locale)]?base(locale):FALLBACK;document.documentElement.lang=k;const e=document.querySelector("#era-title"),c=document.querySelector("#civilization-title");if(e)e.textContent=COPY[k].era;if(c)c.textContent=COPY[k].civilization;return k}
export{FALLBACK,COPY};
