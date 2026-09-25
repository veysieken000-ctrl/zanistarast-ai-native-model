const KEY="zanistarast-com:user-state:v1";
const empty=()=>({likes:{},saves:{},progress:{}});
export function createUserState(storage=globalThis.localStorage){
 const read=()=>{try{return {...empty(),...JSON.parse(storage?.getItem(KEY)||"{}")}}catch{return empty()}};
 const write=s=>{try{storage?.setItem(KEY,JSON.stringify(s))}catch{}return s};
 const toggle=(bucket,id)=>{const s=read();s[bucket]={...s[bucket]};s[bucket][id]=!s[bucket][id];write(s);return s[bucket][id]};
 return Object.freeze({
  liked:id=>read().likes[id]===true,
  likedIds:()=>Object.entries(read().likes).filter(([,v])=>v===true).map(([id])=>id),
  saved:id=>read().saves[id]===true,
  toggleLike:id=>toggle("likes",id),
  toggleSave:id=>toggle("saves",id),
  progress:(id,version)=>read().progress[`${id}@${version}`]??null,
  setProgress:(id,version,value)=>{const s=read();s.progress={...s.progress,[`${id}@${version}`]:value};write(s);return value},
  clear:()=>write(empty())
 });
}
export function createAccountStateAdapter(remote){
 return Object.freeze({
  load:()=>remote?.load?.(),
  save:state=>remote?.save?.(state),
  available:()=>Boolean(remote?.load&&remote?.save)
 });
}
export const userState=createUserState();
