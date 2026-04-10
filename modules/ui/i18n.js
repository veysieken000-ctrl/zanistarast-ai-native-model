(() => {
  const translations = {
    "en-US": {
      title: "Zanistarast AI & Speech",
      subtitle: "Speak or type. Clean. Fast. Stable.",
      micLabel: "Microphone",
      systemLabel: "System",
      listeningLabel: "Listening Language",
      modeLabel: "Mode",
      startBtn: "🎤 Start",
      stopBtn: "■ Stop",
      sendBtn: "➤ Send",
      speakBtn: "🔊 Read",
      clearBtn: "✕ Clear",
      placeholder: "Type or speak...",
      ready: "Ready",
      thinking: "Thinking",
      speaking: "Speaking",
      done: "Done",
      off: "Off",
      on: "On",
      manual: "manual",
      empty: "Question is empty"
    },

    "tr-TR": {
      title: "Zanistarast AI & Speech",
      subtitle: "Konuş veya yaz. Temiz. Hızlı. Kararlı.",
      micLabel: "Mikrofon",
      systemLabel: "Sistem",
      listeningLabel: "Dinleme Dili",
      modeLabel: "Mod",
      startBtn: "🎤 Başla",
      stopBtn: "■ Durdur",
      sendBtn: "➤ Gönder",
      speakBtn: "🔊 Oku",
      clearBtn: "✕ Temizle",
      placeholder: "Bir şey yaz veya konuş...",
      ready: "Hazır",
      thinking: "Düşünüyor",
      speaking: "Konuşuyor",
      done: "Tamam",
      off: "Kapalı",
      on: "Açık",
      manual: "manuel",
      empty: "Soru boş"
    },

    "ku-TR": {
      title: "Zanistarast AI & Speech",
      subtitle: "Axaftin bike an binivîse. Paqij. Bilez. Ewle.",
      micLabel: "Mîkrofon",
      systemLabel: "Pergal",
      listeningLabel: "Zimanê Guhdanê",
      modeLabel: "Mod",
      startBtn: "🎤 Destpêke",
      stopBtn: "■ Bisekinîne",
      sendBtn: "➤ Bişîne",
      speakBtn: "🔊 Bixwîne",
      clearBtn: "✕ Paqij bike",
      placeholder: "Tiştek binivîse an biaxive...",
      ready: "Amade",
      thinking: "Difizire",
      speaking: "Diaxive",
      done: "Qediya",
      off: "Girtî",
      on: "Vekirî",
      manual: "destî",
      empty: "Pirs vala ye"
    },

    "ar-SA": {
      title: "Zanistarast AI & Speech",
      subtitle: "تحدث أو اكتب. نظيف. سريع. مستقر.",
      micLabel: "الميكروفون",
      systemLabel: "النظام",
      listeningLabel: "لغة الاستماع",
      modeLabel: "الوضع",
      startBtn: "🎤 ابدأ",
      stopBtn: "■ إيقاف",
      sendBtn: "➤ إرسال",
      speakBtn: "🔊 اقرأ",
      clearBtn: "✕ مسح",
      placeholder: "اكتب شيئًا أو تحدث...",
      ready: "جاهز",
      thinking: "يفكر",
      speaking: "يتحدث",
      done: "تم",
      off: "إيقاف",
      on: "تشغيل",
      manual: "يدوي",
      empty: "السؤال فارغ"
    }
  };

  function getPack(lang) {
    return translations[lang] || translations["en-US"];
  }

  function applyLanguage(lang) {
    const pack = getPack(lang);

    const titleText = document.getElementById("titleText");
    const subtitleText = document.getElementById("subtitleText");
    const micLabel = document.getElementById("micLabel");
    const systemLabel = document.getElementById("systemLabel");
    const listeningLabel = document.getElementById("listeningLabel");
    const modeLabel = document.getElementById("modeLabel");
    const startBtn = document.getElementById("startBtn");
    const stopBtn = document.getElementById("stopBtn");
    const sendBtn = document.getElementById("sendBtn");
    const speakBtn = document.getElementById("speakBtn");
    const clearBtn = document.getElementById("clearBtn");
    const questionInput = document.getElementById("questionInput");

    if (titleText) titleText.textContent = pack.title;
    if (subtitleText) subtitleText.textContent = pack.subtitle;
    if (micLabel) micLabel.textContent = pack.micLabel;
    if (systemLabel) systemLabel.textContent = pack.systemLabel;
    if (listeningLabel) listeningLabel.textContent = pack.listeningLabel;
    if (modeLabel) modeLabel.textContent = pack.modeLabel;
    if (startBtn) startBtn.textContent = pack.startBtn;
    if (stopBtn) stopBtn.textContent = pack.stopBtn;
    if (sendBtn) sendBtn.textContent = pack.sendBtn;
    if (speakBtn) speakBtn.textContent = pack.speakBtn;
    if (clearBtn) clearBtn.textContent = pack.clearBtn;
    if (questionInput) questionInput.placeholder = pack.placeholder;

    document.documentElement.lang = lang;

    if (window.UIStatus) {
      if (typeof window.UIStatus.setTranslations === "function") {
        window.UIStatus.setTranslations(pack);
      }

      if (typeof window.UIStatus.setListeningLabel === "function") {
        window.UIStatus.setListeningLabel(pack.listeningLabel);
      }

      if (typeof window.UIStatus.setModeStatus === "function") {
        const modeStatusEl = document.getElementById("modeStatus");
        if (modeStatusEl && modeStatusEl.textContent.trim().toLowerCase() === "manual") {
          window.UIStatus.setModeStatus(pack.manual);
        }
      }
    }
  }

  window.UII18n = {
    applyLanguage,
    getPack
  };
})();
