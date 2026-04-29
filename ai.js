function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c");
}

function askAI(question) {
  const answerBox = document.getElementById("answerBox");

  if (!question || !window.KNOWLEDGE) {
    answerBox.innerHTML = "Soru yok veya bilgi sistemi yüklenmedi.";
    return;
  }

  const q = question.toLowerCase();

  // 🔍 ilgili başlıkları bul
  const results = Object.keys(KNOWLEDGE).filter(key =>
    q.includes(key.toLowerCase())
  );

  // 🧠 AI yorum üret
  let explanation = "";

  if (q.includes("hebun")) {
    explanation = `
    <p><strong>Hebûn</strong>, Zanistarast sisteminde varlığın ontolojik temelidir.</p>
    <p>Bu kavram, varlığı katmanlı bir yapı olarak ele alır:
    fiziksel, biyolojik ve zihinsel düzeylerin ötesinde,
    merkez-çevre ilişkisiyle düzenlenen bir varlık sistemidir.</p>
    `;
  } else if (q.includes("zanabun")) {
    explanation = `
    <p><strong>Zanabûn</strong>, bilginin oluşumu ve katmanlı yapısını ifade eder.</p>
    `;
  } else {
    explanation = `<p>Bu konu Zanistarast içinde araştırılıyor...</p>`;
  }

  // 📚 listeyi oluştur
  let list = "<ul>";

  results.forEach(key => {
    KNOWLEDGE[key].forEach(item => {
      list += `<li><strong>${item.title}</strong><br>${item.category}</li>`;
    });
  });

  list += "</ul>";

  // 🎯 final çıktı
  answerBox.innerHTML = `
    ${explanation}
    <h3>İlgili sayfalar:</h3>
    ${list}
  `;
}

