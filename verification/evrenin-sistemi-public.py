"""Validate public export semantics and reference integrity; no network/dependencies.

Optional --source compares exported fields with the approved active Corpus model.
These are publication checks, not empirical physics tests.
"""
from pathlib import Path
import argparse,copy,hashlib,json,re,sys
ROOT=Path(__file__).resolve().parents[1]

def validate(m):
 errors=[]
 def check(ok,message):
  if not ok:errors.append(message)
 def unique(items,label):
  ids=[x['id'] for x in items];check(len(ids)==len(set(ids)),label+' kimlikleri benzersiz olmalı');return set(ids)
 nodes=unique(m['nodes'],'Kavram');edges=unique(m['edges'],'İlişki');unique(m['stages'],'Evre')
 check(m['schema_version']=='zanistarast.public-system-map/1','Şema sürümü')
 check(m['model_version']=='v04' and m['title']=='Evrenin sistemi','Sürüm ve ad')
 check(m['counts']['nodes']==len(nodes)==143 and m['counts']['edges']==len(edges)==245,'Kaynak kavram/ilişki sayıları')
 check(all(e['source'] in nodes and e['target'] in nodes for e in m['edges']),'İlişki uçları çözülebilmeli')
 check(all(n in nodes for f in m['formulas'] for n in f.get('nodes',[])),'Formül kavramları çözülebilmeli')
 check(all(n in nodes for s in m['stages'] for n in (s.get('node_refs') or [])),'Evre kavramları çözülebilmeli')
 check(len(m['binary_pairs'])==m['counts']['binary_pairs']==33 and len(m['formulas'])==m['counts']['formulas']==31,'İkili kapsam ve simgesel kayıt sayıları')
 for key,items in [('node',m['nodes']),('edge',m['edges']),('stage',m['stages'])]:
  digest=hashlib.sha256('\n'.join(sorted(x['id'] for x in items)).encode()).hexdigest()
  check(m['integrity']['source_'+key+'_ids_sha256']==digest,key+' kimlik özeti')
 check([a['id'] for a in m['axes']]==['COSMIC_DIMENSIONS','INDIVIDUAL_HUMAN_LAYERS','RESEARCH_PRODUCTION'],'D/H/L ad alanları')
 for axis,prefix in zip(m['axes'],['D','H','L']):
  check([s['id'] for s in axis['slots']]==[prefix+str(i) for i in range(1,7)],prefix+' ayrı altılı sayımı')
 cosmic=[s for s in m['stages'] if s['namespace']=='COSMIC']
 check(len(cosmic)==12,'Tam 12 kozmik evre')
 for slot in m['axes'][0]['slots']:
  actual=sorted((s for s in cosmic if s['parent']==slot['id']),key=lambda x:x['ordinal'])
  check([s['ordinal'] for s in actual]==[1,2],slot['id']+' iki evre')
  check([s['name'] for s in actual]==[s['name'] for s in slot['stages']],slot['id']+' tablo/evre adları aynı olmalı')
  check([s['id'] for s in actual]==[s['record_id'] for s in slot['stages']],slot['id']+' evre kimlikleri aynı olmalı')
 d1=sorted([s for s in cosmic if s['parent']=='D1'],key=lambda x:x['ordinal'])
 check(d1[0]['name']=='Atom evresi' and d1[1]['name']=='Yıldız ve gezegen evresi' and 'BH' in d1[0]['node_refs'],'D1 son kurucu yerleştirmesi')
 d6=sorted([s for s in cosmic if s['parent']=='D6'],key=lambda x:x['ordinal'])
 check('Haşir' in d6[0]['name'] and all(x in d6[1]['name'] for x in ['Cennet','Cehennem','ebedî hayat']),'D6 son kurucu evreleri')
 by_id={n['id']:n for n in m['nodes']}
 check(by_id.get('E',{}).get('type')=='UncreatedSource' and m['creator']=={'node_id':'E','uncreated':True,'created_aggregate':False},'Ehad yaratılmış birleşik ürün olamaz')
 check('iddia' in by_id.get('BH',{}).get('claim_label','') and by_id.get('BH',{}).get('type')=='ResearchTarget','Kara delik araştırma statüsü')
 description=by_id.get('Varliksi',{}).get('description','')
 check('ölçe' in description and 'yokluk' in description,'Varlıksı ölçeği ve varlık ayrımı')
 gate=m['knowledge_gate']
 check(all(gate[k] is True for k in ['result_id_required','context_id_required','two_distinct_knowers_required']),'İki onay aynı sonuç/bağlam ve ayrı bilen gerektirir')
 check(gate['self_review_is_second_knower'] is False and gate['agreement_proves_truth'] is False,'Özdenetim/uzlaşma sınırı')
 h6=m['axes'][1]['slots'][5]
 check(h6['id']=='H6' and h6['name']=='İradî ahlak' and h6['role']=='İnsanın hükmü','H6 insan hükmü kapsamını korur')
 check(len(m['upper_applications'])==m['counts']['upper_applications']==33,'33 alan uygulaması')
 check(all(a['source_id']=='E' and a['return_id']=='E' and a['return_creates_source'] is False and a['equality_claim'] is False for a in m['upper_applications']),'Üst şema aynı kaynak/varış ve özdeşlik sınırı')
 allowed={'schema_version','title','model_version','site_revision','date','author','source','counts','integrity','creator','nodes','edges','axes','stages','binary_pairs','formulas','upper_rule','upper_applications','references','sections','knowledge_gate','source_validation','downloads'}
 check(set(m)==allowed,'Kamuya açık kök alanları: arşiv/sohbet/künye dökümü eklenmemeli')
 text=json.dumps(m,ensure_ascii=False)
 check(not re.search(r'[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|(?i:gh[pousr]_)[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN .*PRIVATE KEY',text),'Özel iletişim veya kimlik doğrulama verisi dışa aktarılmamalı')
 check(all(r['url'].startswith('https://') for r in m['references']),'Kaynak HTTPS bağlantıları')
 for path in m['downloads'].values():
  check(not path.startswith('/') and '..' not in Path(path).parts and (ROOT/path).is_file(),'İndirme yolu mevcut ve depo içi olmalı: '+path)
 discovery=json.loads((ROOT/'ai-discovery.json').read_text())
 check(discovery['system_map']['data']=='graph/evrenin-sistemi.json','Makine keşif kaydı doğru veriye bağlanmalı')
 return errors

if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--source',type=Path);p.add_argument('--self-test',action='store_true');a=p.parse_args()
 m=json.loads((ROOT/'graph/evrenin-sistemi.json').read_text());errors=validate(m)
 if a.source:
  source=json.loads(a.source.read_text());active=source['active_model']
  for kind in ['nodes','edges']:
   original={x['id']:x for x in active[kind]}
   if set(original)!={x['id'] for x in m[kind]}:errors.append(kind+' kaynak kimlikleri değişti')
   for item in m[kind]:
    for key,value in item.items():
     if key!='claim_label' and original.get(item['id'],{}).get(key)!=value:errors.append(item['id']+' kaynak alanı değişti: '+key)
  if {x['id'] for x in active['stage_catalog']}!={x['id'] for x in m['stages']}:errors.append('Evre kaynak kimlikleri değişti')
  for kind in ['upper_applications']:
   original={x['id']:x for x in active[kind]}
   if set(original)!={x['id'] for x in m[kind]}:errors.append(kind+' kaynak kimlikleri değişti')
   for item in m[kind]:
    if any(original.get(item['id'],{}).get(key)!=value for key,value in item.items()):errors.append(item['id']+' uygulama alanları değişti')
 corruptions=0
 if a.self_test:
  def mutate_case(case):
   bad=copy.deepcopy(m)
   if case==0:bad['edges'][0]['target']='MISSING'
   if case==1:bad['nodes'][0]['id']=bad['nodes'][1]['id']
   if case==2:bad['creator']['created_aggregate']=True
   if case==3:bad['knowledge_gate']['self_review_is_second_knower']=True
   if case==4:bad['axes'][1]['slots'][5]['id']='D6'
   if case==5:next(n for n in bad['nodes'] if n['id']=='BH')['claim_label']='Deneysel olarak kanıtlandı'
   if case==6:bad['stages'].append(dict(bad['stages'][0],id='EXTRA',parent='D6',ordinal=3,name='Araf'))
   if case==7:bad['private_contact']='private@example.org'
   return bad
  for case in range(8):
   if validate(mutate_case(case)):corruptions+=1
   else:errors.append('Bozulma denemesi kaçırıldı: '+str(case))
 result={'scope':'public-export-semantics','status':'PASS' if not errors else 'FAIL','nodes':len(m['nodes']),'edges':len(m['edges']),'source_compared':bool(a.source),'publication_faults_detected':corruptions,'errors':errors}
 print(json.dumps(result,ensure_ascii=False,indent=2));sys.exit(bool(errors))
