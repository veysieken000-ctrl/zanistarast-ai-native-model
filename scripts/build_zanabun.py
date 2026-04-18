from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent

CSS = """
:root{
  --bg:#05070d;
  --bg-soft:#0c1220;
  --card:#0f1728cc;
  --card-2:#13203a;
  --text:#e6edf3;
  --muted:#aab7c7;
  --line:rgba(255,255,255,.08);
  --accent:#8ab4ff;
  --shadow:0 14px 38px rgba(0,0,0,.28);
}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{
  background:
    radial-gradient(circle at top, #11182a 0%, #070b13 42%, #03050a 100%);
  color:var(--text);
  font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;
  line-height:1.75;
}
a{color:var(--accent);text-decoration:none}
a:hover{text-decoration:underline}
.container{
  max-width:1100px;
  margin:0 auto;
  padding:32px 20px 80px;
}
.back-link{
  display:inline-block;
  margin-bottom:22px;
  font-weight:700;
}
.hero-card{
  background:linear-gradient(180deg, rgba(20,30,52,.82), rgba(10,14,25,.92));
  border:1px solid var(--line);
  border-radius:24px;
  box-shadow:var(--shadow);
  padding:34px 28px;
  margin-bottom:26px;
}
.hero-card h1{
  margin:0 0 10px;
  font-size:clamp(34px,5vw,58px);
  line-height:1.06;
  letter-spacing:-.02em;
}
.hero-card p{
  margin:0;
  font-size:clamp(17px,2vw,22px);
  color:var(--muted);
}
.page-grid{
  display:grid;
  gap:18px;
}
.section-card{
  background:linear-gradient(180deg, rgba(19,32,58,.84), rgba(12,20,35,.9));
  border:1px solid var(--line);
  border-radius:22px;
  box-shadow:var(--shadow);
  padding:24px 22px;
}
.section-card h2{
  margin:0 0 12px;
  font-size:clamp(24px,3vw,34px);
  line-height:1.18;
}
.section-card p{
  margin:0 0 14px;
  color:var(--text);
  font-size:18px;
}
.section-card ul,.section-card ol{
  margin:0 0 14px 22px;
  padding:0;
}
.section-card li{
  margin:8px 0;
  color:var(--text);
  font-size:18px;
}
.formula{
  margin-top:10px;
  padding:14px 16px;
  border-radius:14px;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.06);
  font-weight:800;
  color:#d6e5ff;
  white-space:pre-line;
}
.theory-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
  gap:18px;
}
.theory-link-card{
  display:block;
  background:linear-gradient(180deg, rgba(19,32,58,.84), rgba(12,20,35,.9));
  border:1px solid var(--line);
  border-radius:22px;
  box-shadow:var(--shadow);
  padding:22px 20px;
  min-height:210px;
}
.theory-link-card:hover{
  transform:translateY(-2px);
  text-decoration:none;
}
.theory-index{
  display:inline-block;
  font-weight:900;
  font-size:20px;
  color:#ffffff;
  margin-bottom:10px;
}
.theory-link-card h2{
  margin:0 0 10px;
  color:#fff;
  font-size:32px;
  line-height:1.08;
  letter-spacing:-.02em;
}
.theory-link-card p{
  margin:0;
  color:var(--muted);
  font-size:18px;
  line-height:1.7;
}
@media (max-width:640px){
  .container{padding:24px 14px 56px}
  .hero-card,.section-card,.theory-link-card{border-radius:18px}
  .theory-link-card{min-height:auto}
}
"""
PAGES = [
    {
        "filename": "00_BILGI_TANIKLIK_VE_HAKIKAT.html",
        "title": "Bilgi, Tanıklık ve Hakikat",
        "lead": "Bilgi, tanıklık ve hakikat arasındaki temel epistemolojik bağ.",
        "sections": [
            ("1. Giriş", [
                "Zanabûn epistemolojisinde bilgi yalnızca öğrenilen bir içerik değildir.",
                "Bilgi, insanın varlıkla karşılaşması; tanıklık ise bu karşılaşmanın yük haline gelmesidir.",
                "Hakikat ise bilginin doğruluğu kadar, taşınmış ve sınanmış halidir."
            ], [], "Hakikat = Bilgi + Tanıklık + Sorumluluk"),
            ("2. Bilgi Nedir?", [
                "Bilgi, bilen öznenin bilinen nesneye yönelimiyle ortaya çıkan düzenli anlamdır.",
                "Bu nedenle bilgi salt veri değil, varlıkla kurulan anlamlı ilişkidir."
            ], [
                "gözlem içerir",
                "anlama açılır",
                "sınanabilir olmak zorundadır"
            ], None),
            ("3. Tanıklık Nedir?", [
                "Tanıklık, bilginin kişide yük üretmesidir.",
                "Bilinen şey yalnız söylenmiyor, taşınıyor ve davranışa dönüşüyorsa tanıklık başlar."
            ], [
                "Tanıklık yoksa bilgi hafif kalır",
                "Tanıklık varsa bilgi tarihe ve topluma geçebilir"
            ], None),
            ("4. Sonuç", [
                "Bu bölüm, Zanabûn’un geri kalan tüm halkaları için temeli kurar.",
                "Bilgi, tanıklık olmadan dağılır; hakikat, sorumluluk olmadan görünmez hale gelir."
            ], [], None),
        ],
    },
    {
        "filename": "01_BILGININ_TANIMI_VE_SINIFLANDIRILMASI.html",
        "title": "Bilginin Tanımı ve Sınıflandırılması",
        "lead": "Bilginin ana türleri, yapısı ve sınıflandırma mantığı.",
        "sections": [
            ("1. Giriş", [
                "Her bilgi aynı seviyede değildir.",
                "Zanabûn, bilgiyi hem kaynağına hem de işlevine göre ayırır."
            ], [], None),
            ("2. Temel Ayrım", [
                "Bilgi iki ana eksende okunur: fıtrat/doğa bilgisi ve hüküm/ahlak bilgisi.",
                "Birincisi evrenin düzenini, ikincisi yön verici sonucu açığa çıkarır."
            ], [
                "Fıtrat bilgisi → işleyiş bilgisi",
                "Hüküm bilgisi → yön ve sonuç bilgisi"
            ], None),
            ("3. İnsanla İlişkisi", [
                "İnsan yalnız öğrenen değil, bilgiyi yorumlayıp üst katmana taşıyan varlıktır.",
                "Bu yüzden sınıflandırma teorik değil, yaşamsal bir ayrımdır."
            ], [], None),
            ("4. Sonuç", [
                "Bilgi türleri karıştırıldığında yorum ile hakikat, gözlem ile hüküm birbirine karışır.",
                "Bu bölüm, sonraki katmanlı model için kavramsal haritayı kurar."
            ], [], None),
        ],
    },
    {
        "filename": "02_BILGININ_KATMANLARI.html",
        "title": "Bilginin Katmanları",
        "lead": "Bilginin yüzeyden tanıklığa uzanan katmanlı yapısı.",
        "sections": [
            ("1. Giriş", [
                "Bilgi tek katmanlı değildir.",
                "Her görülen gerçek hakikat değildir; her doğru söz de dönüştürücü bilgi üretmez."
            ], [], None),
            ("2. Katmanlar", [
                "Zanabûn’a göre bilgi en az üç temel katmanda ilerler."
            ], [
                "Görülen bilgi",
                "Anlaşılan bilgi",
                "Taşınan bilgi"
            ], "Bilginin en sahih yoğunluğu = Taşınan bilgi"),
            ("3. Neden Önemli?", [
                "Bir bilgi kişiyi değiştirmiyorsa henüz tam anlamıyla taşınmış değildir.",
                "Katman modeli, epistemik olgunluk ile yüzeysel veri arasındaki farkı görünür kılar."
            ], [], None),
            ("4. Sonuç", [
                "Bu bölüm, tanıklık yasasına geçiş kapısını açar.",
                "Bilginin değeri miktarında değil, hangi katmanda durduğunda ortaya çıkar."
            ], [], None),
        ],
    },
    {
        "filename": "03_AHLAK_VE_HUKUM_YASASI.html",
        "title": "Ahlak ve Hüküm Yasası",
        "lead": "Bilgiden ahlaka ve ahlaktan hükme giden dönüşüm yasası.",
        "sections": [
            ("1. Giriş", [
                "Zanabûn’da bilgi durağan değildir; davranış ve sonuç üretir.",
                "Bu dönüşümün merkezinde ahlak ve hüküm yasası bulunur."
            ], [], None),
            ("2. Yasa", [
                "Her bilgi potansiyel olarak bir ahlaka açılır.",
                "Her ahlak ise bir hükme ulaşır."
            ], [
                "Bilgi → Ahlak",
                "Ahlak → Hüküm",
                "Hüküm → Yeni durum"
            ], "Bilgi → Ahlak → Hüküm"),
            ("3. Epistemolojik Sonuç", [
                "Bilgi ahlaka açılmıyorsa tamamlanmamıştır.",
                "Hüküm üretmeyen ahlak ise sistem içinde kapanmamış sayılır."
            ], [], None),
            ("4. Sonuç", [
                "Bu yasa, bilgi ile yaşam arasındaki boşluğu kapatır.",
                "Zanabûn’da bilgi yalnız görmek değil, yön ve sonuç üretmektir."
            ], [], None),
        ],
    },
    {
        "filename": "04_TANIKLIK_YASASI.html",
        "title": "Tanıklık Yasası",
        "lead": "Bilginin yük haline gelişi ve hakikatin taşıyıcısı olarak tanıklık.",
        "sections": [
            ("1. Giriş", [
                "Bilginin en yüksek yoğunluğu tanıklıkta görünür.",
                "Tanıklık, görülen veya öğrenilen şeyin sorumlulukla taşınmasıdır."
            ], [], None),
            ("2. Tanıklığın Doğası", [
                "Tanıklık söylemekten daha fazlasıdır.",
                "Tanıklık, bilinen şeyin kişide davranış, duruş ve yük üretmesidir."
            ], [
                "Bilmek başka, tanıklık etmek başkadır",
                "Tanıklık hakikati topluma ve tarihe taşır"
            ], None),
            ("3. Tanıklığın Kaybı", [
                "Tanıklık zayıfladığında bilgi çokluğu artabilir ama yön kaybolur.",
                "Toplumda hakikat dağılır, söylem çoğalır, merkez bulanıklaşır."
            ], [], None),
            ("4. Sonuç", [
                "Tanıklık yasası, bilginin neden ağır olduğunu açıklar.",
                "Böylece epistemoloji iç dünyadan toplumsal alana geçmeye başlar."
            ], [], None),
        ],
    },
    {
        "filename": "05_BILGININ_KATMAN_MODELI.html",
        "title": "Bilginin Katman Modeli",
        "lead": "Bilginin oluşum, işlenme ve hükme dönüşme modeli.",
        "sections": [
            ("1. Giriş", [
                "Bilginin katmanları önceki bölümde açıldı; bu bölüm ise bütün akışı tek modelde toplar."
            ], [], None),
            ("2. Model", [
                "Bilgi alt düzeyde gözlemle başlar, üst düzeyde hükümle tamamlanır."
            ], [
                "Algı",
                "İşleme",
                "Anlam",
                "Tanıklık",
                "Ahlak",
                "Hüküm"
            ], "Katmanlı bilgi = Gözlemden hükme uzanan düzen"),
            ("3. İnsan ve Taşıma", [
                "İnsan bu modelin taşıyıcı halkasıdır.",
                "Çünkü insan veri alır, anlamlandırır, yüklenir ve karar üretir."
            ], [], None),
            ("4. Sonuç", [
                "Böylece epistemoloji yalnızca teorik değil, işleyen bir model haline gelir."
            ], [], None),
        ],
    },
    {
       "filename": "06_EPISTEMIK_COKUS.html",
        "title": "Epistemik Çöküş",
        "lead": "Bilginin hakikatten kopuşuyla başlayan epistemolojik kriz modeli.",
        "sections": [
            ("1. Epistemik Çöküş Nedir?", [
                "Epistemik çöküş, bilginin hakikatten kopmasıdır.",
                "Tanıklığın yük olmaktan çıkması ve doğrunun faydaya indirgenmesi bu kırılmanın çekirdeğidir."
            ], [
                "bilginin hakikatten kopması",
                "tanıklığın yük olmaktan çıkması",
                "doğrunun faydaya indirgenmesi"
            ], "Veri artışı ≠ Hakikat artışı"),
            ("2. Çöküş Nasıl Başlar?", [
                "Çöküş bir anda olmaz; bir süreçtir."
            ], [
                "Bilgi araçsallaşır",
                "Hakikat yerini faydaya bırakır",
                "Sorumluluk zayıflar",
                "Tanıklık sembole dönüşür",
                "Toplum yönünü kaybeder"
            ], None),
            ("3. Sonuç", [
                "Zanabûn’a göre uygarlık önce bilgi düzeyinde çöker.",
                "Bilgi çoğalsa bile tanıklık azalıyorsa sistem karanlığa gider."
            ], [], None),
        ],
    },
    {
        "filename": "07_BILGI_GUC_AYRIMI.html",
        "title": "Bilgi-Güç Ayrımı",
        "lead": "Bilginin hakikat üretimi ile gücün etki üretimi arasındaki ayrım.",
        "sections": [
            ("1. Giriş", [
                "Bilgi ve güç aynı şey değildir.",
                "Bilgi hakikati görünür kılmak için vardır; güç ise etki alanı kurmak ister."
            ], [], None),
            ("2. Kırılma Noktası", [
                "Bilgi hakikat için değil, kontrol için kullanılmaya başladığında epistemik sapma başlar."
            ], [
                "bilgi → açıklık",
                "güç → yönlendirme",
                "karışım → manipülasyon riski"
            ], "Hakikat > Güç"),
            ("3. Sonuç", [
                "Zanabûn, bilginin güce indirgenmesine karşı ontolojik bir sınır çizer.",
                "Bilgi güç üretmeye başladığında tanıklık daralır."
            ], [], None),
        ],
    },
    {
        "filename": "08_SEVGI_VE_FITRAT_TEMELLI_BILGI_TURLERI.html",
        "title": "Sevgi ve Fıtrat Temelli Bilgi Türleri",
        "lead": "Akıl dışı değil, aklı tamamlayan fıtrat ve sevgi temelli bilgi biçimleri.",
        "sections": [
            ("1. Giriş", [
                "Bilgi yalnız aklî işlem değildir.",
                "Zanabûn, fıtrat ve sevgi temelli bilgi türlerini de epistemolojik çerçeveye dahil eder."
            ], [], None),
            ("2. Fıtrat Bilgisi", [
                "Fıtrat bilgisi, varlığın doğal düzenini sezgisel ve yapısal biçimde okuma kapasitesidir."
            ], [
                "düzen okur",
                "uyum sezdirir",
                "temel yön verir"
            ], None),
            ("3. Sevgi Temelli Bilgi", [
                "Sevgi burada kör duygu değil, varlığa doğru yönelmenin derin bağıdır.",
                "Bilgiyi canlı ve içsel kılan taşıyıcı enerji olarak görülür."
            ], [], None),
            ("4. Sonuç", [
                "Akıl, fıtrat ve sevgi birlikte işlendiğinde bilgi hem sahih hem de dönüştürücü hale gelir."
            ], [], None),
        ],
    },
    {
        "filename": "09_BILGININ_EVRENSEL_DONGUSU.html",
        "title": "Bilginin Evrensel Döngüsü",
        "lead": "Bilginin oluşup ahlak ve hüküm üzerinden yeniden bilgiye dönmesi.",
        "sections": [
            ("1. Giriş", [
                "Zanabûn’a göre bilgi doğrusal değil, döngüseldir.",
                "Bu döngü bireyde, toplumda ve medeniyet düzeyinde tekrar eder."
            ], [], None),
            ("2. Evrensel Akış", [
                "Bilgi önce doğar, sonra ahlaka, oradan hükme ve nihayet yeni bilgiye dönüşür."
            ], [], "Bilgi → Ahlak → Hüküm → Yeni Bilgi"),
            ("3. Sonuç", [
                "Bu model bilginin donuk değil, sürekli işleyen ve kendini yenileyen bir sistem olduğunu gösterir."
            ], [], None),
        ],
    },
    {
        "filename": "10_BILGI_ZAMAN_ILISKISI.html",
        "title": "Bilgi-Zaman İlişkisi",
        "lead": "Bilginin zaman içinde olgunlaşması, taşınması ve tarihe dönüşmesi.",
        "sections": [
            ("1. Giriş", [
                "Zaman, bilginin dış kabuğu değil; olgunlaşma alanıdır."
            ], [], None),
            ("2. Zamanın Rolü", [
                "Bilgi zamansızlaştırıldığında yüzeyselleşir.",
                "Tanıklık arttığında zaman derinleşir, tarih oluşur."
            ], [
                "zaman sınar",
                "zaman yoğunlaştırır",
                "zaman kalıcılık üretir"
            ], None),
            ("3. Sonuç", [
                "Bilginin kalitesi yalnız içeriğine değil, zamandaki taşınma gücüne de bağlıdır."
            ], [], None),
        ],
    },
    {
"filename": "11_BILGININ_MATEMATIKSEL_SOYUTLANMASI.html",
        "title": "Bilginin Matematiksel Soyutlanması",
        "lead": "Bilginin örüntü ve formül düzeyinde soyutlanabilir yapısı.",
        "sections": [
            ("1. Giriş", [
                "Zanabûn belirli bir olgunluk aşamasında, bilgiyi yalnız kavramsal değil formel olarak da düşünür."
            ], [], None),
            ("2. Soyutlama Mantığı", [
                "Matematik burada sayısal hesaplama kadar, yapısal ilişki dilidir.",
                "Bilginin akışını, dönüşümünü ve denge noktalarını görünür kılar."
            ], [], "B = f(Varlık, Tanıklık, Ahlak, Hüküm)"),
            ("3. Sonuç", [
                "Bu bölüm, Zanabûn’dan meta-bilimsel çerçeveye geçiş için köprü kurar."
            ], [], None),
        ],
    },
    {
        "filename": "12_TANIKLIGIN_TARIH_URETMESI.html",
        "title": "Tanıklığın Tarih Üretmesi",
        "lead": "Tanıklığın zaman içinde yoğunlaşıp tarihe dönüşme mekanizması.",
        "sections": [
            ("1. Giriş", [
                "Her olay tarih olmaz.",
                "Tarih, tanıklıkla taşınan ve kuşaklar arasında süreklilik kazanan bilgidir."
            ], [], None),
            ("2. Tarih Nasıl Doğar?", [
                "Bir olay önce görülür, sonra anlamlandırılır, ardından tanıklıkla taşınır."
            ], [
                "olay",
                "bilgi",
                "tanıklık",
                "tarih"
            ], "Olay → Bilgi → Tanıklık → Tarih"),
            ("3. Sonuç", [
                "Tanıklık zayıfladığında tarih anlatıya, sonra propagandaya dönüşebilir.",
                "Sahih tarih, sorumluluk taşıyan bilginin sürekliliğidir."
            ], [], None),
        ],
    },
    {
        "filename": "13_META_SCIENCE_FRAMEWORK.html",
        "title": "Meta Science Framework",
        "lead": "Bilimi inceleyen, sınırlandıran ve hakikate bağlayan üst çerçeve.",
        "sections": [
            ("1. Giriş", [
                "Meta-bilim, bilimin nasıl kurulduğunu ve hangi sınırlar içinde geçerli olduğunu sorgular."
            ], [], None),
            ("2. Çerçeve", [
                "Zanabûn’da meta-bilim, yöntem ile hakikat arasındaki ilişkiyi görünür kılar."
            ], [
                "gözlem",
                "yöntem",
                "doğrulama",
                "sorumluluk"
            ], "Sahih bilim = veri + yöntem + doğrulama + sorumluluk"),
            ("3. Sonuç", [
                "Bilim yalnız ölçülebilir olana indirgenirse eksik kalır.",
                "Meta-bilim, bilimi ontolojik ve epistemolojik sınırlarıyla birlikte okur."
            ], [], None),
        ],
    },
    {
        "filename": "14_NIHAI_DONGU_MODELI.html",
        "title": "Nihai Döngü Modeli",
        "lead": "Bilgi, tanıklık, ahlak ve hükmün birleştiği nihai epistemik döngü.",
        "sections": [
            ("1. Giriş", [
                "Önceki halkalar bir araya geldiğinde kapanmayan ama çalışan bir epistemik döngü ortaya çıkar."
            ], [], None),
            ("2. Nihai Akış", [
                "Varlık, bilgi üretir; bilgi tanıklığa; tanıklık ahlaka; ahlak hükme; hüküm yeni bilgiye açılır."
            ], [], "Varlık → Bilgi → Tanıklık → Ahlak → Hüküm → Yeni Bilgi"),
            ("3. Sonuç", [
                "Bu model, epistemolojinin yaşamla ve medeniyetle bağını kurar."
            ], [], None),
        ],
    },
    {
        "filename": "15_EPISTEMOLOJIK_AKSIYOMLAR.html",
        "title": "Epistemolojik Aksiyomlar",
        "lead": "Zanabûn sisteminin üzerine kurulduğu temel kurucu kabuller.",
        "sections": [
            ("1. Giriş", [
                "Her sistem görünür veya görünmez bazı başlangıç kabullerine dayanır."
            ], [], None),
            ("2. Temel Aksiyomlar", [
                "Zanabûn’un çekirdeğinde şu kabuller bulunur."
            ], [
                "Varlık bilinebilir",
                "Bilgi katmanlıdır",
                "Hakikat bilgiden büyüktür",
                "Tanıklık zorunludur",
                "Bilgi ahlaka açılır"
            ], None),
            ("3. Sonuç", [
                "Bu aksiyomlar olmadan bilgi sistemi parçalanır.",
                "Bunlar, tüm sonraki halkaların dayandığı temel zemindir."
            ], [], None),
        ],
    },
    {
"filename": "16_BILGI_TURLERININ_NIHAI_KATMAN_MODELI.html",
        "title": "Bilgi Türlerinin Nihai Katman Modeli",
        "lead": "Tüm bilgi türlerini tek hiyerarşik modelde birleştiren son yapı.",
        "sections": [
            ("1. Giriş", [
                "Bilgi türleri dağınık değildir; Zanabûn bunları tek bir katmanlı sistem içinde toplar."
            ], [], None),
            ("2. Hiyerarşi", [
                "Alt katmanlar zorunluluğu, üst katmanlar anlam ve yönü taşır."
            ], [
                "duyusal bilgi",
                "kavramsal bilgi",
                "fıtrat bilgisi",
                "tanıklık bilgisi",
                "ahlaki bilgi",
                "hüküm bilgisi"
            ], None),
            ("3. Sonuç", [
                "Bilgi türlerinin karıştırılması epistemik sapma üretir; doğru diziliş ise hakikati görünür kılar."
            ], [], None),
        ],
    },
    {
        "filename": "17_BILGININ_DOGRULAMA_VE_TEST_MEKANIZMASI.html",
        "title": "Bilginin Doğrulama ve Test Mekanizması",
        "lead": "Bilginin sınanması, doğrulanması ve sahihliğinin kontrolü.",
        "sections": [
            ("1. Giriş", [
                "Bilgi yalnızca üretildiği için doğru kabul edilemez.",
                "Zanabûn’da her bilgi, kendi katmanına uygun biçimde test edilmek zorundadır."
            ], [], None),
            ("2. Test ve Doğrulama", [
                "Duyusal bilgi deneyle; kavramsal bilgi tutarlılıkla; tanıklık bilgisi yaşam ve sonuçla sınanır."
            ], [
                "tekil doğrulama",
                "çoğul doğrulama",
                "yanlışlanabilirlik"
            ], "Sahih bilgi = Test edilmiş ve taşınmış bilgi"),
            ("3. Sonuç", [
                "Doğrulama olmadan bilgi iddia olarak kalır.",
                "Test mekanizması epistemolojinin güvenlik katmanıdır."
            ], [], None),
        ],
    },
    {
        "filename": "18_BILGININ_MATEMATIKSEL_DONGU_MODELI.html",
        "title": "Bilginin Matematiksel Döngü Modeli",
        "lead": "Bilgi döngüsünün formel ve fonksiyonel matematiksel temsili.",
        "sections": [
            ("1. Giriş", [
                "Zanabûn’da bilgi döngüsü işleyen bir sistem olarak formel dile taşınabilir."
            ], [], None),
            ("2. Model", [
                "Bilgi, tanıklık, ahlak ve hüküm arasında bir dönüşüm ağı vardır."
            ], [], "B → T → A → H → B"),
            ("3. Sonuç", [
                "Bu bölüm, döngünün zayıf ve güçlü noktalarını görünür hale getirir.",
                "Böylece sistem yalnız anlatı değil, sınanabilir bir yapı kazanır."
            ], [], None),
        ],
    },
    {
        "filename": "19_BILGININ_TOPLUMSAL_GECISI.html",
        "title": "Bilginin Toplumsal Geçişi",
        "lead": "Bilginin bireyden topluma, kültüre ve medeniyete akışı.",
        "sections": [
            ("1. Giriş", [
                "Bilgi bireyde başlar ama toplumda organize olur."
            ], [], None),
            ("2. Toplumsallaşma Süreci", [
                "Bilgi paylaşım, kabul, kurumlaşma ve kültür üzerinden genişler."
            ], [
                "bireysel bilgi",
                "kolektif bilgi",
                "kurumsal bilgi",
                "medeniyet bilgisi"
            ], "Bilgi → Toplum → Kültür → Medeniyet"),
            ("3. Sonuç", [
                "Bilgi doğru taşınmazsa toplum yönünü kaybeder.",
                "Sahih toplum, sahih bilgi akışıyla ayakta kalır."
            ], [], None),
        ],
    },
    {
"filename": "20_NIHAI_EPISTEMOLOJIK_SONUC.html",
        "title": "Nihai Epistemolojik Sonuç",
        "lead": "Zanabûn epistemolojisinin bütün halkalarını birleştiren nihai sonuç.",
        "sections": [
            ("1. Giriş", [
                "Bütün halkalar bir araya geldiğinde Zanabûn’un nihai sonucu görünür olur."
            ], [], None),
            ("2. Sonuç Cümlesi", [
                "Bilgi yalnız öğrenilen bir içerik değil; varlığa, tanıklığa, ahlaka, zamana ve topluma bağlanan canlı bir hakikat düzenidir."
            ], [], "Hakikat = Bilgi + Tanıklık + Sorumluluk + Süreklilik"),
            ("3. Kapanış", [
                "Bu nedenle epistemoloji kapanmaz; medeniyet inşasına açılır.",
                "Zanabûn, Hebûn’un ontolojik zeminini bilgi ve yön düzeyinde tamamlar."
            ], [], None),
        ],
    },
]

def render_page(page):
    cards = []
    for heading, paragraphs, bullets, formula in page["sections"]:
        parts = [f"<section class='section-card'><h2>{heading}</h2>"]
        for p in paragraphs:
            parts.append(f"<p>{p}</p>")
        if bullets:
            parts.append("<ul>")
            for item in bullets:
                parts.append(f"<li>{item}</li>")
            parts.append("</ul>")
        if formula:
            parts.append(f"<div class='formula'>{formula}</div>")
        parts.append("</section>")
        cards.append("\n".join(parts))

    return f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Zanabûn – {page["title"]}</title>
  <style>{CSS}</style>
</head>
<body>
  <main class="container">
    <a class="back-link" href="thesis-zanabun.html">← Back to Zanabun</a>
    <section class="hero-card">
      <h1>{page["title"]}</h1>
      <p>{page["lead"]}</p>
    </section>
    <div class="page-grid">
      {"".join(cards)}
    </div>
  </main>
</body>
</html>
"""

def build_index():
    cards = []
    for i, page in enumerate(PAGES):
        idx = f"{i:02d}"
        cards.append(f"""
<a class="theory-link-card" href="{page['filename']}">
  <span class="theory-index">{idx}</span>
  <h2>{page['title']}</h2>
  <p>{page['lead']}</p>
</a>""")
    return f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Zanabun Epistemology</title>
  <style>{CSS}</style>
</head>
<body>
  <main class="container">
    <a class="back-link" href="theses.html">← Back to Theses</a>
    <section class="hero-card">
      <h1>Zanabun Epistemology</h1>
      <p>Bilgi, tanıklık, hakikat, ahlak, hüküm, zaman ve toplum ilişkisini kuran katmanlı epistemoloji dizisi.</p>
    </section>
    <section class="theory-grid">
      {''.join(cards)}
    </section>
  </main>
</body>
</html>
"""

def patch_theses():
    theses = ROOT / "theses.html"
    if not theses.exists():
        return "theses.html bulunamadı, patch atlandı."
    text = theses.read_text(encoding="utf-8")

    pattern = re.compile(
        r'<a class="theory-link-card" href="[^"]*">\s*<span class="theory-index">02</span>\s*<h2>Zanabun Epistemology</h2>.*?</a>',
        re.S
    )
    replacement = """<a class="theory-link-card" href="thesis-zanabun.html">
  <span class="theory-index">02</span>
  <h2>Zanabun Epistemology</h2>
  <p>
    Bilgi, tanıklık, hakikat, ahlak ve hüküm ilişkisini kuran
    katmanlı epistemolojik yapı.
  </p>
</a>"""
    if pattern.search(text):
        text = pattern.sub(replacement, text)
        theses.write_text(text, encoding="utf-8")
        return "theses.html içindeki Zanabun kartı güncellendi."
    return "Zanabun kartı pattern ile bulunamadı, theses.html patch atlandı."

def main():
    for page in PAGES:
        (ROOT / page["filename"]).write_text(render_page(page), encoding="utf-8")
        print(f"Yazıldı: {page['filename']}")

    (ROOT / "thesis-zanabun.html").write_text(build_index(), encoding="utf-8")
    print("Yazıldı: thesis-zanabun.html")

    print(patch_theses())
    print("Tamamlandı: Zanabun sayfaları kök dizinde yeniden oluşturuldu.")

if __name__ == "__main__":
    main()





