const translations = {
  tr: {
    "site.title": "ZANISTARAST",
    "site.subtitle": "Doğal, yapay ve insani sistemleri modelleyen yapısal ve test edilebilir çerçeve.",
    "nav.paper": "Paper",
    "nav.graph": "Graph",
    "nav.ai": "AI & Speech",
    "nav.tags": "Etiketler",
    "nav.favorites": "Favoriler"
  },

  ku: {
    "site.title": "ZANISTARAST",
    "site.subtitle": "Çarçoveyek avahîdar û ceribandinbar ji bo modelkirina pergalên xwezayî, hesabî û mirovî.",
    "nav.paper": "Paper",
    "nav.graph": "Graph",
    "nav.ai": "AI & Speech",
    "nav.tags": "Etîket",
    "nav.favorites": "Bijare"
  },

  en: {
    "site.title": "ZANISTARAST",
    "site.subtitle": "A structured, testable framework for modeling natural, computational, and human systems.",
    "nav.paper": "Paper",
    "nav.graph": "Graph",
    "nav.ai": "AI & Speech",
    "nav.tags": "Tags",
    "nav.favorites": "Favorites"
  }
};

function setLanguage(lang) {
  localStorage.setItem("zanistarast_lang", lang);

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    const key = el.getAttribute("data-i18n");

    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const savedLang = localStorage.getItem("zanistarast_lang") || "tr";
  setLanguage(savedLang);
});
