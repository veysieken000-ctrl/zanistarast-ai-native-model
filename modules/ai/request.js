(() => {
  function getLanguageInstruction(lang) {
    const map = {
      "en-US": "Answer fully in English.",
      "tr-TR": "Cevabı tamamen Türkçe ver.",
      "ku-TR": "Bersivê bi tevahî bi Kurmancî bide.",
      "ar-SA": "أجب بالكامل باللغة العربية.",
      "fa-IR": "پاسخ را کامل به زبان فارسی بده.",
      "fr-FR": "Réponds entièrement en français.",
      "zh-CN": "请完全用中文回答。",
      "ru-RU": "Отвечай полностью на русском языке.",
      "es-ES": "Responde completamente en español.",
      "sv-SE": "Svara helt på svenska.",
      "no-NO": "Svar helt på norsk.",
      "de-DE": "Antworte vollständig auf Deutsch.",
      "it-IT": "Rispondi interamente in italiano.",
      "ja-JP": "日本語だけで完全に答えてください。"
    };

    return map[lang] || "Answer fully in English.";
  }

  async function askQuestion(question) {
    const languageSelect = document.getElementById("languageSelect");
    const selectedLanguage = languageSelect ? languageSelect.value : "en-US";
    const languageInstruction = getLanguageInstruction(selectedLanguage);

    const finalQuestion = `${languageInstruction}\n\nUser request:\n${String(question || "").trim()}`;

    const response = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: finalQuestion,
        language: selectedLanguage
      })
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    return await response.json();
  }

  window.AIRequest = {
    askQuestion
  };
})();
