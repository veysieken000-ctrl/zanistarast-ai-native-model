const base=v=>String(v||"").toLowerCase().split("-")[0];
export function resolveLocalizedWork(work,locale){
 const lang=base(locale),variants=work?.localizations;
 if(!variants||typeof variants!=="object")return work;
 const variant=variants[locale]??variants[lang];
 if(!variant)return work;
 return Object.freeze({...work,title:variant.title??work.title,summary:variant.summary??work.summary,reading:variant.reading??work.reading,sourceSummary:variant.sourceSummary??work.sourceSummary,representation:variant.representation??work.representation,transcript:variant.transcript??variant.representation?.transcript??work.transcript,language:variant.language??lang});
}
