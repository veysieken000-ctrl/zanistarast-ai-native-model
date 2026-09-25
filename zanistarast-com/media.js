const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
export function normalizeRepresentation(rep){
 if(!rep)return null;
 const kind=["video","audio","reading"].includes(rep.kind)?rep.kind:"unknown";
 return Object.freeze({id:rep.id??null,version:rep.version??null,kind,src:rep.src??null,mime:rep.mime??null,poster:rep.poster??null,captions:Object.freeze([...(rep.captions??[])]),transcript:rep.transcript??null});
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
