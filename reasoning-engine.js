function classifyQuestion(q) {
  const text = q.toLowerCase();

  let category = "genel";
  if (text.includes("yapay zeka") || text.includes("ai")) category = "teknoloji";
  if (text.includes("sağlık") || text.includes("hasta")) category = "sağlık";
  if (text.includes("kur'an") || text.includes("ayet")) category = "katmanlı okuma";
  if (text.includes("toplum") || text.includes("medeniyet")) category = "medeniyet";
  if (text.includes("ahlak") || text.includes("vicdan")) category = "ahlak";

  return {
    original: q,
    category,
    complexity: q.length > 80 ? "yüksek" : "orta"
  };
}

function hebunAnalysis(ctx) {
  return `Hebûn açısından bu soru önce varlığın doğru tanımını ister. "${ctx.original}" sorusunda ele alınan konu yalnızca yüzeysel bir olay değil, kendi zemini içinde anlaşılması gereken bir varlık alanıdır.`;
}

function zanabunAnalysis(ctx) {
  return `Zanabûn açısından mesele, bu varlığın nasıl bilineceğidir. Bilgi sadece veri toplamak değildir; konu kendi bağlamı, ilişkileri ve etkileriyle birlikte anlaşılmalıdır.`;
}

function mabunAnalysis(ctx) {
  return `Mabûn açısından bu bilgi bir düzene bağlanmalıdır. Eğer bilgi insan, toplum, ahlak ve sistem içinde yerini bulmazsa eksik kalır.`;
}

function rabunAnalysis(ctx) {
  return `Rabûn açısından bu düzen hayata geçirilmelidir. Rabûn, Hebûn'da görülen doğal düzenin insan dünyasında bilinçli olarak kurulmuş hâlidir.`;
}

function rasterastValidation(ctx) {
  return `Rasterast doğrulama filtresi bu cevabı şu ölçülerle denetler: Çelişki var mı? Manipülasyon var mı? İnsan, canlı ve çevre zarar görüyor mu? Bilgi açık ve doğrudan mı?`;
}

function newrozaImpact(ctx) {
  return `Newroza Kawa açısından bu mesele yalnızca bireysel değil, medeniyet kurucu bir sorudur. Doğru anlaşılırsa insanı, toplumu ve ahlakı yükselten bir sonuca bağlanabilir.`;
}
