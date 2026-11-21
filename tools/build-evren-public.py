"""Build the public, archive-free view of Evrenin sistemi.

Usage: python3 tools/build-evren-public.py [--source APPROVED_CORPUS_JSON]
Without --source, regenerate the public guide, SVG and PDF from published data.
Only explicitly selected active fields are exported; no archive or contact data.
PDF generation requires ReportLab. No network access or model training occurs.
"""
from pathlib import Path
import argparse,hashlib,html,json,re,textwrap

ROOT=Path(__file__).resolve().parents[1]
SOURCE_COMMIT='f937ba0b2a8fd4035d2c1d9bed8daab26d096f1b'
MODEL_PATH='graph/evrenin-sistemi.json'

def save_json(path,value):
 path.parent.mkdir(parents=True,exist_ok=True)
 path.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

def ids_hash(items):
 return hashlib.sha256('\n'.join(sorted(x['id'] for x in items)).encode()).hexdigest()

def export(source):
 raw=json.loads(source.read_text(encoding='utf-8'));m=raw['active_model'];records={r['id']:r for r in raw['active_display_records']}
 nodes=[]
 for n in m['nodes']:
  v={k:n[k] for k in ['id','label','description','symbol','group','type','status'] if k in n}
  v['claim_label']=n.get('status','Kurucu model tanımı')
  if n['id']=='BH':v['claim_label']='Kurucu araştırma iddiası'
  nodes.append(v)
 edges=[{k:e[k] for k in ['id','source','target','label','kind','scope','epistemic_status'] if k in e} for e in m['edges']]
 axes=[]
 for a in m['axis_type_unit_contract']['axes']:
  slots=[]
  for s in a['slots']:
   v={k:s[k] for k in ['id','name','role','dimension_links','capability','D6_relation','stages'] if k in s}
   v['description']=records.get(s['id'],{}).get('description',s.get('role',s['name']))
   slots.append(v)
  axes.append({'id':a['id'],'name':a['name'],'count_unit':a['count_unit'],'slots':slots})
 stages=[{k:s[k] for k in ['id','namespace','parent','ordinal','name','kind','node_refs','target_scope','definition_status','judgment_subject'] if k in s} for s in m['stage_catalog']]
 pairs=[{k:x[k] for k in ['id','first','second','kind','reading']} for x in raw['binary_scope_catalog']]
 formulas=[{k:x[k] for k in ['id','title','expression','explanation','nodes'] if k in x} for x in m['formulas']]
 refs=[{k:x[k] for k in ['id','title','reference','url','used_scope'] if k in x} for x in raw['external_references']]
 upper_keys=['id','title','formula','shortest_statement','essence_direction','layer_direction','common_morality','fitri_branch','voluntary_branch','same_source_and_return','common_morality_id','equality_claim','arithmetic_composition_claim','metamodel_not_created_dimension','direction_semantics']
 upper={k:m['upper_rule'][k] for k in upper_keys if k in m['upper_rule']}
 applications=[{k:x[k] for k in ['id','name','realm','claim_status','source_id','return_id','common_morality_id','morality_types','essence_creation_direction','layer_creation_direction','layer_creation_subject','clothing_semantics','equality_claim','arithmetic_composition_claim','joint_conditions_preserved','object_identity_inferred','moral_approval_implied','return_creates_source','entity_has_human_volition','applicable_branches','frame_edges','local_reading','cosmic_stage','application_id_is_not_stage_number'] if k in x} for x in m['upper_applications']]
 sections=[
  {'id':'yek','title':'Evren, Yek ve Ehad','lead':'Bu modelde evren, kendi kapsamında bütünlük taşıyan Yek olarak tanımlanır.',
   'paragraphs':["Her atom, her insan, her boyutun alan bütünlüğü ve örgütlü birleşik bütünler kendi kapsamlarında Yek olarak izlenir. Aynı varlık, daha geniş bir bütündeki göreviyle ve kendi bütünlüğüyle ayrı bağlamlarda okunabilir.",
    "Ehad, yaratılmamış Tek ve Yek; bütün yaratılmışların yaratıcısı olarak hepsinin üstündedir. Yaratılmış boyutların toplamından oluşan bir ürün olarak gösterilmez. Fiziksel nesneler için kullanılan merkez-katman ölçütü Ehad'a uygulanmaz.",
    "Zâriyât 51:47, kurucunun genişleme ve gelişim okumasının dinî referansıdır. Fidanın ve bebeğin büyümesi ile kozmolojik genişleme, alanlarına göre farklı gözlenebilirler ve ölçütlerle ele alınır."]},
  {'id':'boyut-evre','title':'Boyut, katman ve evreyi ayırmak','lead':'Aynı sıra numarası, aynı varlık veya aynı ölçüm birimi anlamına gelmez.',
   'paragraphs':["D1-D6 kozmik boyutları; H1-H6 her bir insanın katmanlarını; L1-L6 ise bu araştırmanın üretim katmanlarını gösterir. Bu üç sayım birbirine dönüştürülmez. Mevcut genel Graph'ın konu halkaları da ayrı bir gezinti düzenidir.",
    "Her kozmik boyutta iki evre vardır. Evre numarası, bütün nesneler için zorunlu bir oluşum zamanı veya büyüklük sırası değildir. Sanat/felsefe evreleri, yaratılış devirleri ve insan hayatının durakları kendi ad alanlarında tutulur.",
    "D4'te ruhun tekil katmanlı Yek'e; meleklerin alt alanın bütününe yönelmesi, kurucu kapsam örneğidir. D2-D6 için türetilen benzer rol eşlemeleri, alana özgü fiziksel mekanizmanın deneysel olarak bulunduğu anlamına gelmez."]},
  {'id':'fizik','title':'Fiziksel âlemin iki evresi','lead':'Birinci evre atom evresi; ikinci evre yıldız ve gezegen evresidir.',
   'paragraphs':["Kara delikler, son kurucu açıklamasına göre birinci evrede yer alır. Alt kuruluşun fizikteki görünümü olma yorumu bir kurucu araştırma iddiası olarak kaydedilir. Bu sınıflama, kara deliğin atom veya atomaltı parçacıkla fiziksel olarak özdeş olduğu sonucunu vermez.",
    "Beden benzetmesinde insan fiziksel bedeniyle görünür; kurucunun katmanlı insan anlayışında bu görünüm insanın bütününü tüketmez. Aynı görev karşılaştırması, kara deliğin alt kuruluşun fiziksel görünümü/taşıyıcısı olduğu düşüncesine gerekçe oluşturur. Benzetme, bu yeni fizik bağını tek başına kanıtlamaz.",
    "Görünüm sözü kara deliğin içini doğrudan ışıkla görmek anlamında kullanılmaz. Olay ufkunun maddi bir kabuk olduğu veya iç maddi katmanların ölçüldüğü ileri sürülmez. Gözlenebilir sonuçlar ve rakip açıklamalardan ayıran bir sınama ayrıca gerekir."]},
  {'id':'varliksi','title':'Merkez, katman ve varlıksı','lead':'Varlıksı, kendi nesne ölçeğinde merkez-katman bütünlüğü oluşmamış parçadır.',
   'paragraphs':["Merkez, yalnız geometrik bir nokta değil seçilen bütündeki yapısal/işlevsel örgütlenme odağıdır. Katmanlar bu merkezle ilişkili örgütlü çevre ve kuruluşları ifade eder. Bu terimler her alanda aynı maddi kabuğu veya aynı mekanizmayı göstermez.",
    "Merkez-katman bütünlüğü oluşmamış taşsı parça makro ölçekte varlıksı sayılırken, onu oluşturan atomlar kendi ölçeklerinde Yek olabilir. Bileşenin niteliği üst bütüne otomatik aktarılmaz. Varlıksı fiziksel yokluk demek değildir; bilinmeyen yapı da yok sayılmaz.",
    "Meteor/taş örneği yapısal koşula bağlıdır; bütün taşların aynı iç yapıda olduğu varsayılmaz. Teknik astronomide uzaydaki parça meteoroid, atmosferdeki ışık olayı meteor, yere ulaşan parça meteorit diye ayrılır."]},
  {'id':'bilgi','title':'Zanabûn: iki bilenin onayı','lead':'Bilen öznenin bilinen nesneye yöneliminden bir sonuç doğar; aynı sonuç ve bağlam için iki bilenin onayı bilgi kaydını oluşturur.',
   'paragraphs':["İlk ve ikinci bilen iki ayrı kimlik olarak tutulur. Aynı kişinin veya aynı asistanın ikinci turu yeni bir bilen kimliği oluşturmaz. Özdenetim ayrı bir inceleme işlemidir.",
    "Sonuç kimliği ve bağlamı açık olmalı; iki onay da aynı sonuca ve bağlama ait olmalıdır. Ret, farklı sonucun onayı veya eksik kayıt açık inceleme gerektirir.",
    "İki onay kayıt koşuludur; uzlaşma tek başına doğruluğu yaratmaz. İlgili dayanak, çıkarım, bağımlılıklar, itirazlar ve düzeltme sorumluluğu ayrıca değerlendirilir."]},
  {'id':'hukum','title':'Altıncı boyut: yargılama ve hüküm','lead':"D6'nın birinci evresi yargılama/Haşir; ikinci evresi hükme bağlama ve ebedî hayattır.",
   'paragraphs':["İkinci evre, Cennet veya Cehennem'de ebedî hayat olarak açıklanır. Araf ayrı bir üçüncü kozmik evre olarak eklenmez.",
    "İnsanın iradî ahlakı ve kendi hükmü H6 bağlamında; nihai ilahî hüküm D6 bağlamında tutulur. İnsan hükmünün ve meclislerin öznesi, ilahî hükmün öznesiyle karıştırılmaz."]},
  {'id':'yontem','title':'Denetim neyi gösterir?','lead':'Görsel ve mantıksal uyum, deneysel doğrulamanın yerine geçmez.',
   'paragraphs':["Kaynak v04 modeli seçilmiş kayıt, tip, evre, onay ve ölçek koşulları bakımından denetlendi. 49 kontrol geçti; 38 kasıtlı model bozulmasının tamamı yakalandı. Deneme durumları sentetiktir; bağımsız hakemlik veya yeni fiziksel ölçüm değildir.",
    "Kurucu tanım, ontolojik/teolojik öncül, araştırma iddiası, mantıksal türetim ve gözlemsel dayanak farklı statülerde gösterilir. Özellikle kara delik-alt kuruluş bağı, iç yapı yorumu ve alanlar arası mekanizmaların fiziksel sınama yükleri açıktır.",
    "Haritadaki daireler ve ilişki çizgileri simgeseldir. Yarıçap, enerji, uzaklık veya dalga boyu ölçüsü olarak kullanılmaz. Aynı model verisi haritayı, ayrıntı panelini ve bu açıklamaları besler."]}
 ]
 data={'schema_version':'zanistarast.public-system-map/1','title':'Evrenin sistemi','model_version':'v04','site_revision':'2026-11-22.1','date':'2026-11-22','author':'Veysi yê MALA SAF',
  'source':{'repository':'veysieken000-ctrl/zanistarast-academic-corpus','commit':SOURCE_COMMIT,'version':'v04','access':'Kaynak arşive erişim yetkiye bağlıdır.'},
  'counts':{'nodes':len(nodes),'edges':len(edges),'binary_pairs':len(pairs),'formulas':len(formulas),'upper_applications':len(applications),'cosmic_dimensions':6,'cosmic_stages':12},
  'integrity':{'source_node_ids_sha256':ids_hash(nodes),'source_edge_ids_sha256':ids_hash(edges),'source_stage_ids_sha256':ids_hash(stages)},
  'creator':{'node_id':'E','uncreated':True,'created_aggregate':False},'nodes':nodes,'edges':edges,'axes':axes,'stages':stages,'binary_pairs':pairs,'formulas':formulas,'upper_rule':upper,'upper_applications':applications,'references':refs,'sections':sections,
  'knowledge_gate':{'result_id_required':True,'context_id_required':True,'two_distinct_knowers_required':True,'self_review_is_second_knower':False,'agreement_proves_truth':False},
  'source_validation':{k:v for k,v in raw['stage_compatibility']['summary'].items()},
  'downloads':{'model':MODEL_PATH,'guide':'docs/evrenin-sistemi.md','pdf':'docs/evrenin-sistemi-v04.pdf','svg':'graph/evrenin-sistemi.svg'}}
 save_json(ROOT/MODEL_PATH,data);return data

def make_svg(data):
 out=['<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="1160" viewBox="0 0 1100 1160" role="img" aria-labelledby="title desc">','<title id="title">Evrenin sistemi - v04</title><desc id="desc">Ehad üstte yaratıcı, altı boyut iç içe simgesel daireler ve evre tablosuyla gösterilir.</desc>','<rect width="1100" height="1160" fill="#f7fafc"/>','<g fill="#16304b" font-family="DejaVu Sans, sans-serif">']
 def txt(x,y,s,size=16,weight='normal',anchor='start'):
  out.append(f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" text-anchor="{anchor}">{html.escape(s)}</text>')
 def box(x,y,w,h,fill='#e4eef4'):
  out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="{fill}" stroke="#c2d5df"/>')
 txt(42,47,'Evrenin sistemi',29,'bold');txt(42,77,'Zanistarast bilimsel sentezi - kavramsal model v04',16)
 box(200,105,700,102,'#d9eee9');txt(550,143,'EHAD - TEK VE YEK',24,'bold','middle');txt(550,177,'Her şeyin yaratıcısı; bütün yaratılmışların üstünde',18,'normal','middle')
 txt(280,257,'Yaratılmış Yek / evren kapsamları',18,'bold','middle')
 for i,r in enumerate([225,191,157,123,89,55]):
  out.append(f'<circle cx="280" cy="535" r="{r}" fill="{["#eaf1f6","#dfebf0","#d0e3e9","#c2dce3","#b0ceda","#97bfce"][i]}" stroke="#fff" stroke-width="2"/>')
  txt(280,535-r+23,['D6 Hüküm','D5 Ahlak','D4 Ruh','D3 Zihin','D2 Biyoloji','D1 Fizik'][i],14,'bold','middle')
 txt(280,547,'Tek / öz',17,'bold','middle')
 box(545,295,513,44,'#16304b');out.append('<g fill="#fff">');txt(560,324,'Boyut',14,'bold');txt(673,324,'1. evre',14,'bold');txt(858,324,'2. evre',14,'bold');out.append('</g>')
 for i,slot in enumerate(data['axes'][0]['slots']):
  y=352+i*80;box(545,y,513,73)
  for x,s,width in [(559,slot['id']+' '+slot['name'],16),(673,slot['stages'][0]['name'],24),(859,slot['stages'][1]['name'],24)]:
   for j,line in enumerate(textwrap.wrap(s,width=width)):txt(x,y+23+j*19,line,13)
 txt(545,857,'Kara delikler: birinci evrede kurucu araştırma iddiası.',13)
 txt(545,884,'Evre sırası, evrensel bir zaman veya büyüklük sırası değildir.',13)
 box(42,931,1016,117,'#d9eee9');txt(62,963,'İnsan katmanları H1-H6; araştırma katmanları L1-L6 ayrı sayımlardır.',16,'bold');txt(62,994,'Varlıksı: kendi ölçeğinde merkez-katman bütünlüğü oluşmamış parça.',15);txt(62,1024,'Zanabûn: aynı sonuç ve bağlam için iki ayrı bilenin onayı.',15)
 txt(42,1080,'Daireler simgeseldir; uzaklık veya dalga boyu ölçeği değildir.',14)
 txt(42,1113,'Veysi yê MALA SAF - 22 Kasım 2026 - v04',14)
 out.append('</g></svg>');(ROOT/'graph/evrenin-sistemi.svg').write_text('\n'.join(out)+'\n',encoding='utf-8')

def make_guide(data):
 lines=['# Evrenin sistemi','',f"Zanistarast bilimsel sentezi | {data['author']} | v04 | 22 Kasım 2026",'',
 'Bu yayın, etiketli kavramsal model verisidir. Kaynak arşiv, eski modeller, sohbet dökümleri veya iletişim alanları bu dosyaya eklenmez.','',
 '[Etkileşimli harita](../graph.html#evrenin-sistemi) · [PDF](evrenin-sistemi-v04.pdf) · [JSON](../graph/evrenin-sistemi.json) · [SVG](../graph/evrenin-sistemi.svg)','']
 for s in data['sections']:
  lines+=['## '+s['title'],'',s['lead'],'']
  for p in s['paragraphs']:lines += [p,'']
 lines+=['## Kozmik boyutların evreleri','','| Boyut | Birinci evre | İkinci evre |','|---|---|---|']
 for slot in data['axes'][0]['slots']:lines.append('| '+slot['id']+' '+slot['name']+' | '+slot['stages'][0]['name']+' | '+slot['stages'][1]['name']+' |')
 lines+=['','## Kavram ve ilişki dizini','',f"Veri {len(data['nodes'])} kavram, {len(data['edges'])} ilişki, {len(data['binary_pairs'])} ikili kapsam ve {len(data['formulas'])} simgesel kayıt içerir. Tüm kimlikler JSON dosyasında korunur.",'','## Kaynaklar','']
 for r in data['references']:lines+=['- '+r.get('title',r.get('reference',r['id']))+': '+r['url']]
 lines+=['','## Sürüm ve yeniden denetim','',f"Kaynak model: `{data['source']['repository']}`; commit `{SOURCE_COMMIT}`. Bu sürüm sabit kaynağın aktif alanlarından üretilmiştir.",'',
 'Kamuya açık veri denetimi: `python3 verification/evrenin-sistemi-public.py`. Belge/SVG/PDF üretimi: `python3 tools/build-evren-public.py`. PDF için ReportLab gerekir.','',
 'Yetkili yerel Corpus girdisinden yeniden dışa aktarmak için `python3 tools/build-evren-public.py --source ONAYLI_MODEL.json` kullanılır. Bu araç ağdan veri almaz; yayımlama veya model eğitimi yapmaz.','']
 path=ROOT/'docs/evrenin-sistemi.md';path.parent.mkdir(exist_ok=True);path.write_text('\n'.join(lines),encoding='utf-8')

def make_pdf(data):
 from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,Table,TableStyle,PageBreak,KeepTogether
 from reportlab.lib.styles import ParagraphStyle
 from reportlab.lib import colors
 from reportlab.lib.pagesizes import A4
 from reportlab.pdfbase import pdfmetrics
 from reportlab.pdfbase.ttfonts import TTFont
 for name,file in [('EvrenText','DejaVuSans.ttf'),('EvrenBold','DejaVuSans-Bold.ttf')]:pdfmetrics.registerFont(TTFont(name,'/usr/share/fonts/truetype/dejavu/'+file))
 styles={'body':ParagraphStyle('body',fontName='EvrenText',fontSize=10,leading=15,spaceAfter=10,textColor=colors.HexColor('#263645')),'h1':ParagraphStyle('h1',fontName='EvrenBold',fontSize=19,leading=26,spaceAfter=14,spaceBefore=15,keepWithNext=True,textColor=colors.HexColor('#16304b')),'h2':ParagraphStyle('h2',fontName='EvrenBold',fontSize=12,leading=18,spaceAfter=8,spaceBefore=13,keepWithNext=True,textColor=colors.HexColor('#167d86')),'cell':ParagraphStyle('cell',fontName='EvrenText',fontSize=9,leading=13),'small':ParagraphStyle('small',fontName='EvrenText',fontSize=8.3,leading=12,spaceAfter=8)}
 def para(s,style='body'):return Paragraph(html.escape(s).replace('–','-').replace('—','-'),styles[style])
 out=[]
 out+=[para('Evrenin sistemi','h1'),para('Zanistarast bilimsel sentezi - Kavramsal model v04'),para('Veysi yê MALA SAF | 22 Kasım 2026'),Spacer(1,15),para('Varlık, bilgi, ahlak ve hüküm ilişkileri','h2'),para('Bu belge yayıma ayrılmış model açıklamasıdır. Kurucu tanımlar, ontolojik araştırma iddiaları ve gözlemsel dayanaklar ayrı statülerde tutulur. Kaynak arşiv ve iletişim alanları içermez.'),para('143 kavram - 245 ilişki - 6 kozmik boyut - 12 kozmik evre'),Spacer(1,10),para('Kozmik boyutların evreleri','h2')]
 rows=[[para(x,'cell') for x in ['Boyut','Birinci evre','İkinci evre']]]
 for s in data['axes'][0]['slots']:rows.append([para(s['id']+' '+s['name'],'cell'),para(s['stages'][0]['name'],'cell'),para(s['stages'][1]['name'],'cell')])
 t=Table(rows,colWidths=[124,158,225],repeatRows=1,hAlign='LEFT');t.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('BACKGROUND',(0,0),(-1,0),colors.HexColor('#d9eee9')),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,colors.HexColor('#eef4f7')]),('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8)]));out+=[t,Spacer(1,13),para('Kara delikler, birinci evreye kurucu araştırma iddiası olarak yerleştirilir. D6 ikinci evre Cennet veya Cehennem’de ebedî hayattır.','small'),PageBreak()]
 for s in data['sections']:
  out+=[para(s['title'],'h1'),para(s['lead'],'h2')]+[para(p) for p in s['paragraphs']]
 out+=[PageBreak(),para('Kaynaklar ve model kaydı','h1')]
 for r in data['references']:out += [para(r.get('title',r.get('reference',r['id'])),'h2'),para(r['url'],'small')]
 out += [para('Sürüm','h2'),para('v04 - Kaynak commit: '+SOURCE_COMMIT,'small'),para('Kaynak modelin 49 seçilmiş kontrolü ve 38 kasıtlı bozulma denemesi model/kayıt uyumuna aittir. Yeni fiziksel ölçüm veya bağımsız hakemlik sonucu değildir.'),para('Etkileşimli görünüm, kavram ve ilişki verileri aynı yayımlanmış JSON’dan üretilir. Kamuya açık veri, kimlik ve evre kontrolleri verification/evrenin-sistemi-public.py ile yeniden çalıştırılabilir.')]
 def footer(c,doc):
  c.saveState();c.setStrokeColor(colors.HexColor('#c9dce5'));c.line(44,42,A4[0]-44,42);c.setFont('EvrenText',8);c.setFillColor(colors.HexColor('#5a6e82'));c.drawString(44,28,'Zanistarast | Evrenin sistemi | v04');c.drawRightString(A4[0]-44,28,str(doc.page));c.restoreState()
 doc=SimpleDocTemplate(str(ROOT/'docs/evrenin-sistemi-v04.pdf'),pagesize=A4,leftMargin=44,rightMargin=44,topMargin=43,bottomMargin=58,title='Evrenin sistemi - Kavramsal model v04',author=data['author']);doc.build(out,onFirstPage=footer,onLaterPages=footer)

if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--source',type=Path);a=p.parse_args()
 data=export(a.source) if a.source else json.loads((ROOT/MODEL_PATH).read_text(encoding='utf-8'))
 make_svg(data);make_guide(data);make_pdf(data)
 print(json.dumps({'model':data['model_version'],'nodes':len(data['nodes']),'edges':len(data['edges']),'source_commit':data['source']['commit']},ensure_ascii=False))
