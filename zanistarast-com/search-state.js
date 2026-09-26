const KEY="zanistarast-com:search-state:v1";
const clean=q=>String(q??"").trim().replace(/\s+/g," ").slice(0,160);
export function createSearchState(storage=globalThis.localStorage){
 const load=()=>{try{const x=JSON.parse(storage?.getItem(KEY)||"{}");return Array.isArray(x.recent)?x.recent:[]}catch{return[]}};
 const save=recent=>{try{storage?.setItem(KEY,JSON.stringify({recent}))}catch{}};
 return Object.freeze({
  recent:()=>Object.freeze(load()),
  remember(q){q=clean(q);if(!q)return;const recent=[q,...load().filter(x=>x.toLocaleLowerCase()!==q.toLocaleLowerCase())].slice(0,8);save(recent)},
  clear(){save([])}
 });
}
export const searchState=createSearchState();
