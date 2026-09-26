const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
export function normalizeRepresentation(rep){
 if(!rep)return null;
 const kind=["video","audio","reading"].includes(rep.kind)?rep.kind:"unknown";
 return Object.freeze({id:rep.id??null,version:rep.version??null,kind,src:rep.src??null,mime:rep.mime??null,poster:rep.poster??null,captions:Object.freeze([...(rep.captions??[])]),transcript:rep.transcript??null,chapters:Object.freeze([...(rep.chapters??[])])});
}
export const hasTraceableMedia=r=>Boolean(r?.id&&r?.version);
export function renderMedia(rep,{demo=false}={}){
 const r=normalizeRepresentation(rep);
 if(demo)return '<div class="player" role="img" aria-label="Demo medya oynatıcı alanı"><div><strong>DEMO MEDYA ALANI</strong><br><span>Gerçek yayın değildir</span></div></div>';
 if(!r||!r.src)return '<p class="media-fallback" role="status">Medya şu anda kullanılamıyor. Okuma veya transkript katmanını kullanabilirsiniz.</p>';
 if(!hasTraceableMedia(r))return '<p class="media-fallback" role="status">Bu medya temsilinin sürüm bilgisi doğrulanamadı. Güvenli alternatif olarak okuma katmanını kullanın.</p>';
 const tracks=r.captions.filter(x=>x?.src&&x?.srclang).map(x=>`<track kind="captions" src="${esc(x.src)}" srclang="${esc(x.srclang)}" label="${esc(x.label??x.srclang)}"${x.default?" default":""}>`).join("");
 const source=`<source src="${esc(r.src)}"${r.mime?` type="${esc(r.mime)}"`:""}>`;
 if(r.kind==="video")return `<video class="media-player" controls preload="metadata"${r.poster?` poster="${esc(r.poster)}"`:""}>${source}${tracks}Tarayıcınız video oynatmayı desteklemiyor.</video>`;
 if(r.kind==="audio")return `<audio class="audio-player" controls preload="metadata">${source}${tracks}Tarayıcınız ses oynatmayı desteklemiyor.</audio>`;
 return '<p class="media-fallback" role="status">Bu temsil türü oynatılamıyor. Okuma veya transkript katmanını kullanabilirsiniz.</p>';
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
 let last={side:null,time:0},timer;
 const seek=delta=>{const end=Number.isFinite(media.duration)?media.duration:Infinity;media.currentTime=Math.max(0,Math.min(end,media.currentTime+delta));badge.textContent=(delta>0?"+":"−")+"10 sn";badge.classList.add("show");clearTimeout(timer);timer=setTimeout(()=>badge.classList.remove("show"),650)};
 const click=e=>{if(media.tagName!=="VIDEO")return;const rect=media.getBoundingClientRect(),side=e.clientX<rect.left+rect.width/2?"left":"right",now=Date.now();if(last.side===side&&now-last.time<360){seek(side==="right"?10:-10);last={side:null,time:0}}else last={side,time:now}};
 const key=e=>{if(!["INPUT","TEXTAREA"].includes(document.activeElement?.tagName)){if(e.code==="Space"){e.preventDefault();media.paused?media.play():media.pause()}else if(e.code==="ArrowRight")seek(10);else if(e.code==="ArrowLeft")seek(-10)}};
 media.addEventListener("click",click);document.addEventListener("keydown",key);
 return()=>{media.removeEventListener("click",click);document.removeEventListener("keydown",key);clearTimeout(timer);badge.remove()};
}

export function bindAdvancedPlayer(root,{nextHref=null,autoplayNext=false}={}){
 const media=root?.querySelector?.("video.media-player");if(!media)return()=>{};
 const bar=document.createElement("div");bar.className="player-tools";bar.innerHTML='<label>Hız <select data-speed aria-label="Oynatma hızı"><option value=".5">0.5×</option><option value=".75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option></select></label><button type="button" data-captions>Altyazı</button><button type="button" data-pip>Resim içinde resim</button><button type="button" data-full>Tam ekran</button>';
 media.insertAdjacentElement("afterend",bar);
 const pip=async()=>{try{if(document.pictureInPictureElement)await document.exitPictureInPicture();else if(document.pictureInPictureEnabled&&media.requestPictureInPicture)await media.requestPictureInPicture()}catch{}};
 const full=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await media.requestFullscreen?.()}catch{}};
 const speed=e=>{media.playbackRate=Number(e.currentTarget.value)||1};
 const captions=()=>{const tracks=[...media.textTracks];if(!tracks.length)return;const on=tracks.some(t=>t.mode==="showing");tracks.forEach((t,i)=>t.mode=!on&&i===0?"showing":"disabled");bar.querySelector("[data-captions]").textContent=on?"Altyazı":"Altyazı kapat"};
 const ended=()=>{if(autoplayNext&&nextHref)location.hash=nextHref};
 bar.querySelector("[data-speed]")?.addEventListener("change",speed);bar.querySelector("[data-captions]")?.addEventListener("click",captions);bar.querySelector("[data-pip]")?.addEventListener("click",pip);bar.querySelector("[data-full]")?.addEventListener("click",full);media.addEventListener("ended",ended);
 return()=>{media.removeEventListener("ended",ended);bar.remove()};
}
