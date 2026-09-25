export function normalizeRepresentation(rep){
 if(!rep)return null;
 const kind=["video","audio","reading"].includes(rep.kind)?rep.kind:"unknown";
 return Object.freeze({id:rep.id??null,version:rep.version??null,kind,src:rep.src??null,mime:rep.mime??null,poster:rep.poster??null,captions:Object.freeze([...(rep.captions??[])]),transcript:rep.transcript??null});
}
export function renderMedia(rep,{demo=false}={}){
 const r=normalizeRepresentation(rep);
 if(!r||demo||!r.src)return '<div class="player" role="img" aria-label="Demo medya oynatıcı alanı"><div><strong>DEMO MEDYA ALANI</strong><br><span>Gerçek yayın değildir</span></div></div>';
 const tracks=r.captions.filter(x=>x?.src&&x?.srclang).map(x=>`<track kind="captions" src="${x.src}" srclang="${x.srclang}" label="${x.label??x.srclang}"${x.default?" default":""}>`).join("");
 if(r.kind==="video")return `<video class="media-player" controls preload="metadata"${r.poster?` poster="${r.poster}"`:""}><source src="${r.src}"${r.mime?` type="${r.mime}"`:""}>${tracks}Tarayıcınız video oynatmayı desteklemiyor.</video>`;
 if(r.kind==="audio")return `<audio class="audio-player" controls preload="metadata"><source src="${r.src}"${r.mime?` type="${r.mime}"`:""}>${tracks}Tarayıcınız ses oynatmayı desteklemiyor.</audio>`;
 return '<p class="media-fallback">Bu temsil için medya oynatıcı yok. Okuma katmanını kullanabilirsiniz.</p>';
}
