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
  const q = normalizeText(question);

  const answerBox = document.getElementById("answerBox");
  if (!answerBox) return;

  if (!q.trim()) {
    answerBox.innerHTML = "Lütfen bir soru veya kavram yaz.";
    return;
  }

  if (!window.PAPER_PAGES || !Array.isArray(window.PAPER_PAGES)) {
    answerBox.innerHTML = "Paper bilgi ağı yüklenmedi. knowledge.js bağlantısını kontrol et.";
    return;
  }

  const results = window.PAPER_PAGES
    .map(page => {
      const haystack = normalizeText(
        page.title + " " + page.url + " " + page.groupTitle
      );

      let score = 0;

      q.split(/\s+/).forEach(word => {
        if (word.length > 2 && haystack.includes(word)) score += 1;
      });

      if (haystack.includes(q)) score += 5;

      return { ...page, score };
    })
    .filter(page => page.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  if (!results.length) {
    answerBox.innerHTML = `
      <div class="ai-answer">
        <strong>Sonuç bulunamadı.</strong>
        <p>Başka bir kavramla dene: ontoloji, ahlak, ekonomi, zanabun, hebun, tarih, medeniyet.</p>
      </div>
    `;
    return;
  }

  answerBox.innerHTML = `
    <div class="ai-answer">
      <strong>Bulunan ilgili sayfalar:</strong>
      <ul>
        ${results.map(page => `
          <li>
            <a href="${page.url}">${page.title}</a>
            <br>
            <small>${page.groupTitle}</small>
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}


