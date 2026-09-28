import{t}from"./locale.js";
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
export function normalizeRepresentation(rep){
 if(!rep)return null;
 const kind=["video","audio","reading"].includes(rep.kind)?rep.kind:"unknown";
 return Object.freeze({id:rep.id??null,version:rep.version??null,kind,src:rep.src??null,mime:rep.mime??null,poster:rep.poster??null,captions:Object.freeze([...(rep.captions??[])]),transcript:rep.transcript??null,chapters:Object.freeze([...(rep.chapters??[])])});
}
export const hasTraceableMedia=r=>Boolean(r?.id&&r?.version);
export function renderMedia(rep,{demo=false,locale}={}){
 const tx=(key,vars)=>t(key,locale,vars);const r=normalizeRepresentation(rep);
 if(demo)return `<div class="player" role="img" aria-label="${tx("ui.mediaDemo")}"><div><strong>${tx("ui.mediaDemo")}</strong><br><span>${tx("ui.notRealPublication")}</span></div></div>`;
 if(!r||!r.src)return `<p class="media-fallback" role="status">${tx("ui.mediaUnavailable")}</p>`;
 if(!hasTraceableMedia(r))return `<p class="media-fallback" role="status">${tx("ui.mediaUnverified")}</p>`;
 const tracks=r.captions.filter(x=>x?.src&&x?.srclang).map(x=>`<track kind="captions" src="${esc(x.src)}" srclang="${esc(x.srclang)}" label="${esc(x.label??x.srclang)}"${x.default?" default":""}>`).join("");
 const source=`<source src="${esc(r.src)}"${r.mime?` type="${esc(r.mime)}"`:""}>`;
 if(r.kind==="video")return `<video class="media-player" controls preload="metadata"${r.poster?` poster="${esc(r.poster)}"`:""}>${source}${tracks}${tx("ui.videoUnsupported")}</video>`;
 if(r.kind==="audio")return `<audio class="audio-player" controls preload="metadata">${source}${tracks}${tx("ui.audioUnsupported")}</audio>`;
 return `<p class="media-fallback" role="status">${tx("ui.mediaKindUnsupported")}</p>`;
}

export function bindMediaProgress(root,{workId,version,state}){
 const el=root?.querySelector?.("video.media-player, audio.audio-player");
 if(!el||!workId||!version||!state)return()=>{};
 const saved=state.progress(workId,version);
 const restore=()=>{if(saved?.seconds>0&&Number.isFinite(saved.seconds)&&saved.seconds<el.duration)el.currentTime=saved.seconds};
 const persist=()=>{if(Number.isFinite(el.currentTime))state.setProgress(workId,version,{seconds:Math.max(0,Math.floor(el.currentTime)),duration:Number.isFinite(el.duration)?Math.floor(el.duration):null})};
 el.addEventListener("loadedmetadata",restore,{once:true});el.addEventListener("timeupdate",persist);el.addEventListener("pause",persist);
 return()=>{el.removeEventListener("timeupdate",persist);el.removeEventListener("pause",persist)};
}

export function bindPlayerControls(root){
 const media=root?.querySelector?.("video.media-player, audio.audio-player");if(!media)return()=>{};
 const host=media.parentElement;host?.classList.add("gesture-player");
 const badge=document.createElement("div");badge.className="seek-badge";badge.setAttribute("aria-live","polite");host?.append(badge);
 let last={side:null,time:0},timer;const editable=el=>el?.isContentEditable||["INPUT","TEXTAREA","SELECT"].includes(el?.tagName);
 const seek=delta=>{const end=Number.isFinite(media.duration)?media.duration:Infinity;media.currentTime=Math.max(0,Math.min(end,media.currentTime+delta));badge.textContent=(delta>0?"+":"−")+"10 sn";badge.classList.add("show");clearTimeout(timer);timer=setTimeout(()=>badge.classList.remove("show"),650)};
 const click=e=>{if(media.tagName!=="VIDEO")return;const rect=media.getBoundingClientRect(),side=e.clientX<rect.left+rect.width/2?"left":"right",now=Date.now();if(last.side===side&&now-last.time<360){seek(side==="right"?10:-10);last={side:null,time:0}}else last={side,time:now}};
 const key=e=>{if(e.defaultPrevented||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||editable(e.target)||editable(document.activeElement))return;if(e.code==="Space"){e.preventDefault();media.paused?media.play():media.pause()}else if(e.code==="ArrowRight"){e.preventDefault();seek(10)}else if(e.code==="ArrowLeft"){e.preventDefault();seek(-10)}};
 media.addEventListener("click",click);document.addEventListener("keydown",key);
 return()=>{media.removeEventListener("click",click);document.removeEventListener("keydown",key);clearTimeout(timer);badge.remove()};
}

export function bindAdvancedPlayer(root,{nextHref=null,autoplayNext=false,chapters=[],locale}={}){
 const media=root?.querySelector?.("video.media-player");if(!media)return()=>{};const host=media.parentElement,tx=(key,vars)=>t(key,locale,vars);
 const bar=document.createElement("div");bar.className="player-tools";bar.innerHTML=`<label>${tx("ui.speed")} <select data-speed aria-label="${tx("ui.playbackSpeed")}"><option value=".5">0.5×</option><option value=".75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option></select></label><button type="button" data-captions>${tx("ui.captions")}</button><button type="button" data-pip>${tx("ui.pip")}</button><button type="button" data-full>${tx("ui.fullscreen")}</button>`;
 media.insertAdjacentElement("afterend",bar);
 const safeChapters=(Array.isArray(chapters)?chapters:[]).filter(x=>Number.isFinite(x?.start)&&x.start>=0&&typeof x?.title==="string"&&x.title.trim()).map(x=>Object.freeze({...x,title:x.title.trim()})).sort((a,b)=>a.start-b.start);if(safeChapters.length){const nav=document.createElement("nav");nav.className="chapters";nav.setAttribute("aria-label",tx("ui.chapters"));nav.innerHTML=safeChapters.map((x,i)=>'<button type="button" data-chapter="'+i+'">'+esc(x.title)+'</button>').join("");bar.insertAdjacentElement("afterend",nav);nav.addEventListener("click",e=>{const i=Number(e.target?.dataset?.chapter),chapter=safeChapters[i];if(!Number.isInteger(i)||!chapter)return;const end=Number.isFinite(media.duration)?media.duration:Infinity;media.currentTime=Math.min(end,chapter.start)})}

 const pip=async()=>{try{if(document.pictureInPictureElement)await document.exitPictureInPicture();else if(document.pictureInPictureEnabled&&media.requestPictureInPicture)await media.requestPictureInPicture()}catch{}};
 const full=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen?.();else if(media.requestFullscreen)await media.requestFullscreen()}catch{}};
 const speed=e=>{media.playbackRate=Number(e.currentTarget.value)||1};
 const captions=()=>{const tracks=[...media.textTracks];if(!tracks.length)return;const on=tracks.some(t=>t.mode==="showing");tracks.forEach((t,i)=>t.mode=!on&&i===0?"showing":"disabled");bar.querySelector("[data-captions]").textContent=on?tx("ui.captions"):tx("ui.captionsOff")};const captionButton=bar.querySelector("[data-captions]");if(captionButton&&!media.textTracks?.length){captionButton.disabled=true;captionButton.setAttribute("aria-disabled","true")}const pipButton=bar.querySelector("[data-pip]");if(pipButton&&!(document.pictureInPictureEnabled&&media.requestPictureInPicture)){pipButton.hidden=true}const fullButton=bar.querySelector("[data-full]");if(fullButton&&!(media.requestFullscreen||document.fullscreenElement)){fullButton.hidden=true};
 let countdown=null,count=5;
 const cancelNext=()=>{if(countdown)clearInterval(countdown);countdown=null;root.querySelector(".next-countdown")?.remove()};
 const ended=()=>{if(!autoplayNext||!nextHref)return;cancelNext();count=5;const box=document.createElement("div");box.className="next-countdown";box.setAttribute("role","status");box.innerHTML=`<span data-count></span><button type="button">${tx("ui.cancel")}</button>`;host?.append(box);const paint=()=>box.querySelector("[data-count]").textContent=tx("ui.nextIn",{seconds:count});paint();box.querySelector("button").addEventListener("click",cancelNext);countdown=setInterval(()=>{count-=1;if(count<=0){cancelNext();location.hash=nextHref}else paint()},1000)};
 bar.querySelector("[data-speed]")?.addEventListener("change",speed);bar.querySelector("[data-captions]")?.addEventListener("click",captions);bar.querySelector("[data-pip]")?.addEventListener("click",pip);bar.querySelector("[data-full]")?.addEventListener("click",full);media.addEventListener("ended",ended);
 return()=>{cancelNext();media.removeEventListener("ended",ended);bar.remove()};
}
