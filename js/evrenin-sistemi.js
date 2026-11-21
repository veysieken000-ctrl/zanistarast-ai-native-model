/* Versioned public view. No dependencies, analytics, remote API or private archive. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const make = (tag, text, className) => {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (className) el.className = className;
    return el;
  };
  const normalize = value => String(value).toLocaleLowerCase('tr').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');
  const topTabs = [...document.querySelectorAll('[data-graph-view]')];
  function setView(view, save = true) {
    const general = view === 'genel';
    $('evrenin-sistemi').hidden = general;
    $('generalGraph').hidden = !general;
    topTabs.forEach(b => { const active = b.dataset.graphView === view; b.setAttribute('aria-selected', active); b.tabIndex = active ? 0 : -1; });
    if (save) history.replaceState(null, '', general ? '#genel-graph' : '#evrenin-sistemi');
  }
  topTabs.forEach(b => b.addEventListener('click', () => setView(b.dataset.graphView)));
  function keyboardTabs(buttons) {
    buttons.forEach((button, index) => button.addEventListener('keydown', event => {
      const deltas = {ArrowRight:1, ArrowLeft:-1};
      if (!(event.key in deltas) && !['Home','End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + deltas[event.key] + buttons.length) % buttons.length;
      buttons[next].focus(); buttons[next].click();
    }));
  }
  keyboardTabs(topTabs);
  setView(location.hash === '#genel-graph' ? 'genel' : 'evren', false);
  window.addEventListener('hashchange', () => setView(location.hash === '#genel-graph' ? 'genel' : 'evren', false));

  async function load() {
    const response = await fetch('graph/evrenin-sistemi.json');
    if (!response.ok) throw new Error('Model verisi yüklenemedi.');
    const model = await response.json();
    if (model.schema_version !== 'zanistarast.public-system-map/1' || !Array.isArray(model.nodes) || !Array.isArray(model.axes)) throw new Error('Model sürümü okunamadı.');
    const core = new Map(model.nodes.map(n => [n.id,n]));
    const all = new Map(core);
    const slots = new Map();
    model.axes.forEach((axis, index) => axis.slots.forEach(slot => {
      slots.set(slot.id, {...slot, axis:index});
      if (!all.has(slot.id)) all.set(slot.id, {...slot, label:slot.id + ' · ' + slot.name, status:axis.name, type:index === 1 ? 'HumanLayer' : 'ResearchLayer', claim_label:'Ayrı katman kaydı'});
    }));
    let axisIndex = 0;
    let selected = 'D1';
    const shortNames = ['Fizik','Biyoloji','Zihin','Ruh','Ahlak','Hüküm'];
    const colors = ['#2b6b83','#255b72','#214d63','#1c4156','#17354b','#132c40'];
    $('es-version').textContent = model.model_version + ' · 22 Kasım 2026';
    $('es-author').textContent = model.author;
    $('es-metrics').replaceChildren();
    [[model.counts.cosmic_dimensions,'boyut'],[model.counts.nodes,'kavram'],[model.counts.edges,'ilişki']].forEach(([count,label]) => {
      const span = make('span'); span.append(make('strong', String(count)), document.createTextNode(' ' + label)); $('es-metrics').append(span);
    });
    function nodeButton(id, label, className = 'es-node-button') {
      const b = make('button', label, className); b.type = 'button'; b.dataset.nodeId = id;
      b.addEventListener('click', () => select(id, true)); return b;
    }
    const creator = $('es-creator');
    creator.replaceChildren(make('strong','EHAD · TEK VE YEK'),make('span','Her şeyin yaratıcısı · Yaratılmışların üstünde'));
    creator.addEventListener('click', () => select('E', true));
    function activateButtons() {
      document.querySelectorAll('[data-node-id]').forEach(b => b.setAttribute('aria-pressed', b.dataset.nodeId === selected ? 'true' : 'false'));
      creator.setAttribute('aria-pressed', selected === 'E' ? 'true' : 'false');
    }
    function renderAxis() {
      const axis = model.axes[axisIndex];
      $('es-axis-note').textContent = axisIndex === 0 ? 'D1–D6 · Kozmik boyutlar' : axisIndex === 1 ? 'H1–H6 · Her bir insanın katmanları' : 'L1–L6 · Araştırma üretimi';
      $('es-map').replaceChildren();
      if (axisIndex === 0) {
        const ns = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(ns,'svg'); svg.setAttribute('viewBox','0 0 500 500'); svg.classList.add('es-rings'); svg.setAttribute('role','group'); svg.setAttribute('aria-label','Altı boyutun iç içe simgesel halkaları');
        [...axis.slots].reverse().forEach((slot,i) => {
          const r = 232 - i * 35;
          const g = document.createElementNS(ns,'g'); g.classList.add('es-ring'); g.dataset.nodeId = slot.id; g.setAttribute('role','button'); g.setAttribute('tabindex','0'); g.setAttribute('aria-label',slot.id+' '+shortNames[5-i]);
          const circle = document.createElementNS(ns,'circle'); circle.setAttribute('cx','250');circle.setAttribute('cy','250');circle.setAttribute('r',String(r));circle.setAttribute('fill',colors[5-i]);
          const text = document.createElementNS(ns,'text');text.setAttribute('x','250');text.setAttribute('y',String(250-r+27));text.setAttribute('text-anchor','middle');text.textContent = slot.id;
          g.append(circle,text);g.addEventListener('click',()=>select(slot.id,true));g.addEventListener('keydown', e => {if(['Enter',' '].includes(e.key)){e.preventDefault();select(slot.id,true);}});svg.append(g);
        });
        const center = document.createElementNS(ns,'text');center.setAttribute('x','250');center.setAttribute('y','260');center.setAttribute('text-anchor','middle');center.classList.add('es-ring-center');center.textContent = 'Yek';svg.append(center);
        const legend = make('div',undefined,'es-map-legend');
        axis.slots.forEach((slot,i)=>legend.append(nodeButton(slot.id,slot.id+' · '+shortNames[i])));
        $('es-map').append(svg,legend);
      } else {
        const list = make('ol',undefined,'es-layer-list');
        axis.slots.forEach(slot=>{const li=make('li');const b=nodeButton(slot.id,undefined,'es-layer-item');b.append(make('strong',slot.id),make('span',slot.name));li.append(b);list.append(li);});
        $('es-map').append(list);
      }
      activateButtons();
    }
    const axisTabs = [...document.querySelectorAll('[data-es-axis]')];
    function setAxis(index, chooseFirst = true) {
      axisIndex = index;
      axisTabs.forEach((b,i)=>{b.setAttribute('aria-selected',i===index);b.tabIndex=i===index?0:-1;});
      $('es-axis-panel').setAttribute('aria-labelledby',axisTabs[index].id);
      renderAxis(); if(chooseFirst) select(model.axes[index].slots[0].id);
    }
    axisTabs.forEach((b,i)=>b.addEventListener('click',()=>setAxis(i)));
    keyboardTabs(axisTabs);
    function select(id, moveFocus = false) {
      const node = all.get(id); if(!node)return;
      if (slots.has(id) && slots.get(id).axis !== axisIndex) setAxis(slots.get(id).axis, false);
      selected = id; activateButtons();
      const panel = $('es-node-detail');panel.replaceChildren();
      const header = make('div',undefined,'es-detail-header');
      const badge=make('span',node.claim_label,'es-pill'+(node.type==='ResearchTarget'?' es-pill-claim':''));
      header.append(make('span',id,'es-pill'),badge,make('h2',node.label || node.name),make('p',node.description));panel.append(header);
      if(node.status && node.status !== node.claim_label) panel.append(make('p','Statü: '+node.status));
      const slot=slots.get(id);
      if(slot && slot.role)panel.append(make('p','Rol: '+slot.role));
      if(slot && slot.stages){
        panel.append(make('h3','İki evre'));const stages=make('ol',undefined,'es-stage-list');
        slot.stages.forEach(stage=>{const li=make('li');li.append(make('strong',stage.stage+'. evre'),make('span',stage.name));stages.append(li);});panel.append(stages);
      }
      if(slot && slot.D6_relation)panel.append(make('p',slot.D6_relation));
      const edges=model.edges.filter(e=>e.source===id || e.target===id);
      if(edges.length){
        panel.append(make('h3','Bağlantılar · '+edges.length));const list=make('ul',undefined,'es-neighbors');
        edges.forEach(edge=>{
          const otherId=edge.source===id?edge.target:edge.source;const other=all.get(otherId);const li=make('li');
          li.append(nodeButton(otherId,other?other.label:otherId,'es-neighbor-button'),make('span',(edge.source===id?'Bu kavramdan → ':'Bu kavrama ← ')+edge.label));
          const detail=make('details');detail.append(make('summary',edge.id+' · '+(edge.kind||'İlişki')),make('p',(edge.scope||'')+' '+(edge.epistemic_status||'')));li.append(detail);list.append(li);
        });panel.append(list);
      }
      if(slot && slot.dimension_links){
        panel.append(make('h3','İlgili boyut kapsamları'));
        const links=make('div',undefined,'es-downloads');slot.dimension_links.forEach(d=>links.append(nodeButton(d,d)));panel.append(links);
        panel.append(make('p','Bağlantı, insan katmanını kozmik boyutla özdeşleştirmez.'));
      }
      const formulas=model.formulas.filter(f=>Array.isArray(f.nodes)&&f.nodes.includes(id));
      if(formulas.length){panel.append(make('h3','Simgesel kayıtlar'));formulas.forEach(f=>{const detail=make('details',undefined,'es-formula');detail.append(make('summary',f.title),make('code',f.expression),make('p',f.explanation));panel.append(detail);});}
      $('es-selection-status').textContent = (node.label||node.name)+' seçildi.';
      if(moveFocus){
        $('es-detail').scrollTop=0;
        if(matchMedia('(max-width:900px)').matches){$('es-detail').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});$('es-node-detail').focus({preventScroll:true});}
      }
    }
    function renderSearch(){
      const query=normalize($('es-search').value.trim());const results=$('es-results');results.replaceChildren();
      if(!query){results.hidden=true;$('es-search-status').textContent=model.nodes.length+' kavram ve 12 ayrı H/L katman kaydı içinde arayın.';return;}
      const score=n=>normalize(n.id)===query?3:normalize(n.label||n.name).includes(query)?2:1;
      const matches=[...all.values()].filter(n=>normalize(n.id+' '+(n.label||n.name)+' '+n.description).includes(query)).sort((a,b)=>score(b)-score(a));
      results.hidden=false;matches.slice(0,24).forEach(n=>{const b=nodeButton(n.id,n.label||n.name,'es-result');b.append(make('small',n.id+' · '+(n.claim_label||n.status)));results.append(b);});
      $('es-search-status').textContent=matches.length?(matches.length+' sonuç'+(matches.length>24?' · İlk 24 gösteriliyor. Aramanızı daraltabilirsiniz.':'.')):'Sonuç bulunamadı. Farklı bir sözcük deneyin.';
    }
    $('es-search').addEventListener('input',renderSearch);
    $('es-search').addEventListener('keydown',e=>{if(e.key==='Escape'){$('es-search').value='';renderSearch();}if(e.key==='Enter'){const first=$('es-results').querySelector('button');if(first){e.preventDefault();first.click();}}});
    $('es-clear').addEventListener('click',()=>{$('es-search').value='';renderSearch();$('es-search').focus();});
    $('es-back').addEventListener('click',()=>{const b=document.querySelector('#es-map [data-node-id="'+selected+'"]')||creator;b.scrollIntoView({block:'center',behavior:'smooth'});b.focus({preventScroll:true});});
    model.sections.forEach(section=>{
      const detail=make('details');detail.id='aciklama-'+section.id;detail.append(make('summary',section.title),make('p',section.lead));section.paragraphs.forEach(p=>detail.append(make('p',p)));$('es-sections').append(detail);
    });
    model.axes[0].slots.forEach(slot=>{const tr=make('tr');tr.append(make('td',slot.id+' · '+slot.name),make('td',slot.stages[0].name),make('td',slot.stages[1].name));$('es-stage-body').append(tr);});
    const upper=make('details');upper.append(make('summary',model.upper_rule.title),make('p',model.upper_rule.formula));
    ['essence_direction','layer_direction','common_morality','fitri_branch','voluntary_branch'].forEach(key=>upper.append(make('p',model.upper_rule[key])));
    upper.append(make('p',model.upper_rule.direction_semantics.time));$('es-sections').append(upper);
    const applications=make('details');applications.append(make('summary','Üst şemanın alan uygulamaları · '+model.upper_applications.length));
    model.upper_applications.forEach(app=>{const detail=make('details');detail.append(make('summary',app.id+' · '+app.name),make('p',app.claim_status));Object.entries(app.local_reading).forEach(([key,value])=>detail.append(make('p',key+': '+value)));applications.append(detail);});$('es-sections').append(applications);
    const lists=[['İkili kapsamlar',model.binary_pairs, p=>p.id+' · '+p.first+' / '+p.second,p=>p.reading],['Simgesel kayıt dizini',model.formulas,f=>f.id+' · '+f.title,f=>f.expression+' — '+f.explanation],['Diğer evre ve devir kayıtları',model.stages.filter(s=>s.namespace!=='COSMIC'),s=>s.id,s=>s.name]];
    lists.forEach(([title,items,label,description])=>{const d=make('details');d.append(make('summary',title+' · '+items.length));items.forEach(item=>{const p=make('p');p.append(make('strong',label(item)),make('br'),document.createTextNode(description(item)));d.append(p);});$('es-sections').append(d);});
    model.references.forEach(ref=>{const li=make('li');const a=make('a',ref.title||ref.reference||ref.id);a.href=ref.url;a.rel='noopener noreferrer';li.append(a);if(ref.used_scope)li.append(make('small',ref.used_scope));$('es-references').append(li);});
    const validation=model.source_validation;
    $('es-validation').textContent='Kaynak v04: '+validation.passed+'/'+validation.checks_total+' seçilmiş model/kayıt kontrolü; '+validation.faults_detected+'/'+validation.faults_total+' kasıtlı bozulma yakalandı. Bu denetimler deneysel fizik doğrulaması değildir.';
    $('es-provenance').textContent='Kaynak model: '+model.source.version+' · '+model.source.commit.slice(0,12)+' · Web sürümü '+model.site_revision;
    [['pdf','PDF açıklama'],['svg','SVG harita'],['model','JSON veri'],['guide','Metin rehberi']].forEach(([key,label])=>{const a=make('a',label,'es-button');a.href=model.downloads[key];if(key!=='guide')a.setAttribute('download','');$('es-downloads').append(a);});
    $('es-loading').hidden=true;$('es-content').hidden=false;
    renderAxis();select('D1');renderSearch();
  }
  load().catch(error=>{
    $('es-loading').className='es-error';$('es-loading').textContent=error.message+' Açıklamayı PDF veya metin rehberinden okuyabilir, Genel Graph görünümünü kullanabilirsiniz.';
  });
  if('serviceWorker' in navigator)navigator.serviceWorker.register('service-worker.js').catch(()=>{/* Online content remains available. */});
})();
