function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("û", "u")
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

  const q = normalizeText(question);
  let matchedItems = [];

  if (window.PAPER_PAGES && Array.isArray(window.PAPER_PAGES)) {
    matchedItems = window.PAPER_PAGES.filter(page => {
      const text = normalizeText(
        page.title + " " + page.url + " " + page.groupTitle
      );

      return q
        .split(/\s+/)
        .some(word => word.length > 2 && text.includes(word));
    });
  }

  let explanation = "";

  if (q.includes("hebun")) {
    explanation = `
      <p>
        <strong>Hebûn</strong>, Zanistarast sisteminde varlığın ontolojik temelidir.
        Katmanlar; yer, gök, merkez-çevre, nefs, ruh, insan yapısı, zaman ve ekonomik denge
        üzerinden varlığın düzenini açıklar.
      </p>
    `;
  } else if (q.includes("zanabun")) {
    explanation = `
      <p>
        <strong>Zanabûn</strong>, bilginin oluşumu, tanıklık, hakikat, ahlak ve hükümle
        ilişkisini açıklayan epistemolojik bilgi sistemidir.
      </p>
    `;
  } else if (q.includes("mabun") || q.includes("ekonomi")) {
    explanation = `
      <p>
        <strong>Mabûn / Yaşam Temelli Ekonomi</strong>, rızık, ihtiyaç, üretim, paylaşım
        ve medeniyet düzeni arasındaki ilişkiyi açıklar.
      </p>
    `;
  } else if (q.includes("medeniyet")) {
    explanation = `
      <p>
        <strong>Medeniyet modeli</strong>, insan, toplum ve kâinat arasında ahlak, hüküm
        ve ekonomi dengesi kuran üst sistemdir.
      </p>
    `;
  } else if (matchedItems.length > 0) {
    explanation = `
      <p>
        <strong>${question}</strong> Zanistarast bilgi ağı içinde aşağıdaki sayfalarla ilişkilidir.
      </p>
    `;
  } else {
    explanation = `
      <p>Bu konu Zanistarast bilgi sisteminde henüz açık tanımlı değil.</p>
    `;
  }

  let list = "<ul>";

  matchedItems.slice(0, 8).forEach(item => {
    const title = item.title || "Başlıksız";
    const group = item.groupTitle || item.category || "Zanistarast";
    const url = item.url || "#";

    list += `
      <li>
        <a href="${url}"><strong>${title}</strong></a><br>
        <small>${group}</small>
      </li>
    `;
  });

  list += "</ul>";

  answerBox.innerHTML = `
    ${explanation}
    <h3>İlgili sayfalar:</h3>
    ${list}
  `;
}
  const q = normalizeText(question);

  let matchedItems = [];

  Object.keys(window.KNOWLEDGE).forEach(key => {
    const group = window.KNOWLEDGE[key];

    if (key === "paperSystem" && window.PAPER_PAGES) {
      matchedItems = matchedItems.concat(
        window.PAPER_PAGES.filter(page => {
          const text = normalizeText(
            page.title + " " + page.url + " " + page.groupTitle
          );
          return q.split(/\s+/).some(word => word.length > 2 && text.includes(word));
        })
      );
      return;
    }

    const keyMatch = q.includes(normalizeText(key));
    const titleMatch = group && group.title && q.includes(normalizeText(group.title));

    if (keyMatch || titleMatch) {
      if (Array.isArray(group)) {
        matchedItems = matchedItems.concat(group);
      } else if (group && Array.isArray(group.pages)) {
        matchedItems = matchedItems.concat(group.pages);
      }
    }
  });

  let explanation = "";

  if (matchedItems.length > 0) {
    explanation += `<p><strong>${question}</strong> Zanistarast sisteminde şu yapılarla ilişkilidir:</p>`;
  } else {
    explanation = `<p>Bu konu Zanistarast bilgi sisteminde henüz tanımlı değil.</p>`;
  }

  let list = "<ul>";

  matchedItems.slice(0, 8).forEach(item => {
    const title = item.title || "Başlıksız";
    const group = item.groupTitle || item.category || "Zanistarast";
    const url = item.url || "#";

    list += `
      <li>
        <a href="${url}"><strong>${title}</strong></a><br>
        <small>${group}</small>
      </li>
    `;
  });

  list += "</ul>";

  answerBox.innerHTML = `
    ${explanation}
    <h3>İlgili sayfalar:</h3>
    ${list}
  `;
}

