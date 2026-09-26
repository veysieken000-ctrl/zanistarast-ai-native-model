const KEY="zanistarast-com:user-state:v1";
const empty=()=>({likes:{},saves:{},progress:{},history:[],queue:[],watchLater:[],autoplayNext:false});
export function createUserState(storage=globalThis.localStorage){
 const read=()=>{try{return {...empty(),...JSON.parse(storage?.getItem(KEY)||"{}")}}catch{return empty()}};
 const write=s=>{try{storage?.setItem(KEY,JSON.stringify(s))}catch{}return s};
 const toggle=(bucket,id)=>{const s=read();s[bucket]={...s[bucket]};s[bucket][id]=!s[bucket][id];write(s);return s[bucket][id]};
 return Object.freeze({
  liked:id=>read().likes[id]===true,
  likedIds:()=>Object.entries(read().likes).filter(([,v])=>v===true).map(([id])=>id),
  saved:id=>read().saves[id]===true,
  savedIds:()=>Object.entries(read().saves).filter(([,v])=>v===true).map(([id])=>id),
  history:()=>[...read().history],
  watchLater:()=>[...read().watchLater],
  watchLaterHas:id=>read().watchLater.includes(id),
  toggleWatchLater:id=>{const s=read();s.watchLater=s.watchLater.includes(id)?s.watchLater.filter(x=>x!==id):[...s.watchLater,id].slice(0,100);write(s);return s.watchLater.includes(id)},
  queue:()=>[...read().queue],
  setQueue:ids=>{const s=read();s.queue=[...new Set(ids.filter(Boolean))].slice(0,100);write(s);return s.queue},
  enqueue:id=>{const s=read();s.queue=s.queue.includes(id)?s.queue:[...s.queue,id].slice(0,100);write(s);return s.queue},
  dequeue:id=>{const s=read();s.queue=s.queue.filter(x=>x!==id);write(s);return s.queue},
  moveQueue:(id,delta)=>{const s=read(),i=s.queue.indexOf(id),j=i+delta;if(i>=0&&j>=0&&j<s.queue.length){[s.queue[i],s.queue[j]]=[s.queue[j],s.queue[i]];write(s)}return s.queue},
  autoplayNext:()=>read().autoplayNext===true,
  setAutoplayNext:value=>{const s=read();s.autoplayNext=value===true;write(s);return s.autoplayNext},
  visit:id=>{const s=read();s.history=[id,...s.history.filter(x=>x!==id)].slice(0,100);write(s);return s.history},
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
