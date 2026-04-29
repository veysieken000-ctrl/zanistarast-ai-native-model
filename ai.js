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

  let matchedItems = [];

  // 🔍 tüm knowledge içinde arama
  Object.keys(KNOWLEDGE).forEach(key => {
    if (q.includes(key.toLowerCase())) {
      matchedItems = matchedItems.concat(KNOWLEDGE[key]);
    }
  });

  // 🧠 dinamik açıklama üret
  let explanation = "";

  if (matchedItems.length > 0) {
    explanation += `<p><strong>${question}</strong> Zanistarast sisteminde aşağıdaki yapılarla ilişkilidir:</p>`;

    explanation += `<ul>`;
    matchedItems.slice(0, 3).forEach(item => {
      explanation += `<li>${item.title} → ${item.category}</li>`;
    });
    explanation += `</ul>`;

  } else {
    explanation = `<p>Bu konu Zanistarast bilgi sisteminde henüz tanımlı değil.</p>`;
  }

  // 📚 liste
  let list = "<ul>";

  matchedItems.forEach(item => {
    list += `<li><strong>${item.title}</strong><br>${item.category}</li>`;
  });

  list += "</ul>";

  answerBox.innerHTML = `
    ${explanation}
    <h3>İlgili sayfalar:</h3>
    ${list}
  `;
}

