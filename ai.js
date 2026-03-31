const API_BASE_URL = "https://zanistarast-ai-server.onrender.com";
const CHAT_HISTORY_KEY = "zanistarast_chat_history";
const LAST_FOLLOWUP_KEY = "zanistarast_last_followup";

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history.slice(-10)));
}

function pushHistory(role, content) {
  const history = getHistory();
  history.push({ role, content });
  saveHistory(history);
}

function saveLastFollowup(text) {
  if (text) {
    localStorage.setItem(LAST_FOLLOWUP_KEY, text);
  }
}

function getLastFollowup() {
  return localStorage.getItem(LAST_FOLLOWUP_KEY) || "";
}

function clearLastFollowup() {
  localStorage.removeItem(LAST_FOLLOWUP_KEY);
}

function detectTurkish(text) {
  const lower = text.toLowerCase();
  return /[çğıöşü]/.test(lower) ||
    /\b(nedir|neden|nasıl|ve|ile|göre|insan|medeniyet|ahlak|varlık|zaman)\b/.test(lower);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatAnswer(text) {
  return escapeHtml(text)
    .replace(/\n\n+/g, "</p><p>")
    .replace(/\n/g, "<br>");
}

function fillPrompt(text) {
  const input = document.getElementById("ai-input");
  input.value = text;
  input.focus();
}

function clearAI() {
  document.getElementById("ai-input").value = "";
  document.getElementById("ai-output").innerHTML = "Ask a question to begin.";
  document.getElementById("ai-followups").style.display = "none";
  document.getElementById("ai-followup-buttons").innerHTML = "";
  localStorage.removeItem(CHAT_HISTORY_KEY);
  clearLastFollowup();
}

function buildFollowups(question, answer) {
  const q = question.toLowerCase();
  const isTR = detectTurkish(question) || detectTurkish(answer);

  const make = (tr, en) => isTR ? tr : en;

  if (q.includes("hebun") || q.includes("hebûn")) {
    return [
      make("Hebûn'u daha derin ontolojik olarak açıkla.", "Explain Hebûn in deeper ontological terms."),
      make("Hebûn'u klasik ontolojiyle karşılaştır.", "Compare Hebûn with classical ontology."),
      make("Hebûn'un insan anlayışına etkisini açıkla.", "Explain the impact of Hebûn on the concept of the human.")
    ];
  }

  if (q.includes("zanabun") || q.includes("zanabûn")) {
    return [
      make("Zanabûn'u pozitivist bilim anlayışıyla karşılaştır.", "Compare Zanabûn with positivist science."),
      make("Zanabûn'da doğrulama nasıl çalışır?", "How does validation work in Zanabûn?"),
      make("Zanabûn'un bilgi teorisini derinleştir.", "Deepen the theory of knowledge in Zanabûn.")
    ];
  }

  if (q.includes("mabun") || q.includes("mabûn")) {
    return [
      make("Mabûn'u kapitalizmle karşılaştır.", "Compare Mabûn with capitalism."),
      make("Mabûn'da ekonomi ve sorumluluk ilişkisini açıkla.", "Explain the relation between economy and responsibility in Mabûn."),
      make("Mabûn'un medeniyet üzerindeki etkisini açıkla.", "Explain Mabûn's impact on civilization.")
    ];
  }

  if (q.includes("rasterast")) {
    return [
      make("Rasterast'ta tutarlılık filtresini açıkla.", "Explain the consistency filter in Rasterast."),
      make("Rasterast'ı klasik bilimsel yöntemle karşılaştır.", "Compare Rasterast with the classical scientific method."),
      make("Rasterast'ın hata eleme mantığını açıkla.", "Explain the error-elimination logic of Rasterast.")
    ];
  }

  if (q.includes("rabun") || q.includes("rabûn")) {
    return [
      make("Rabûn yönetim modelini doğa düzeniyle ilişkilendir.", "Relate the Rabûn governance model to the order of nature."),
      make("Rabûn'u modern devlet yapılarıyla karşılaştır.", "Compare Rabûn with modern state structures."),
      make("Rabûn modelinde adaletin yerini açıkla.", "Explain the place of justice in the Rabûn model.")
    ];
  }

  if (q.includes("newroza") || q.includes("medeniyet") || q.includes("civilization")) {
    return [
      make("Newroza Kawa uygarlığının temel ilkelerini açıkla.", "Explain the core principles of Newroza Kawa Civilization."),
      make("Medeniyetin çöküş ve yeniden inşa mantığını açıkla.", "Explain the collapse and reconstruction logic of civilization."),
      make("Bu konuyu Zanistarast sentezi içinde derinleştir.", "Deepen this in the context of Zanistarast synthesis.")
    ];
  }

  if (q.includes("fitrah") || q.includes("fıtrat") || q.includes("ahlak") || q.includes("ethics")) {
    return [
      make("Fıtrat ve ahlak çağını sistematik olarak açıkla.", "Explain the Age of Fitrah and Ethics systematically."),
      make("Fıtrat ile insan doğası ilişkisini açıkla.", "Explain the relation between fitrah and human nature."),
      make("Ahlakın neden yapısal zorunluluk olduğunu açıkla.", "Explain why ethics is a structural necessity.")
    ];
  }

  if (q.includes("zaman") || q.includes("time")) {
    return [
      make("Zamanı Zanistarast bilimsel sentezine göre açıkla.", "Explain time through the Zanistarast scientific synthesis."),
      make("Zaman ile varlık ilişkisini açıkla.", "Explain the relation between time and existence."),
      make("Zamanın medeniyet üzerindeki etkisini açıkla.", "Explain the impact of time on civilization.")
    ];
  }

  if (q.includes("jeoloji") || q.includes("geology")) {
    return [
      make("Jeolojiyi katmanlı gerçeklik modeline göre açıkla.", "Explain geology according to the layered model of reality."),
      make("Jeoloji ile varlık tarihi ilişkisini açıkla.", "Explain the relation between geology and the history of existence."),
      make("Jeolojinin insanlık tarihine etkisini açıkla.", "Explain geology’s effect on human history.")
    ];
  }

  return [
    make("Bunu daha derin açıkla.", "Explain this more deeply."),
    make("Bunu Zanistarast bilimsel sentezine göre genişlet.", "Expand this according to the Zanistarast scientific synthesis."),
    make("Bunun medeniyet boyutunu açıkla.", "Explain the civilizational dimension of this.")
  ];
}

function renderFollowupButtons(question, answer) {
  const wrap = document.getElementById("ai-followups");
  const container = document.getElementById("ai-followup-buttons");

  const followups = buildFollowups(question, answer);

  if (!followups.length) {
    wrap.style.display = "none";
    container.innerHTML = "";
    clearLastFollowup();
    return;
  }

  saveLastFollowup(followups[0]);

  container.innerHTML = followups
    .map((item) => {
      const safe = escapeHtml(item);
      return `<button type="button" class="followup-chip" data-followup="${safe}">${safe}</button>`;
    })
    .join("");

  wrap.style.display = "block";

  document.querySelectorAll(".followup-chip").forEach((btn) => {
    btn.onclick = () => {
      const text = btn.getAttribute("data-followup");
      if (text) {
        saveLastFollowup(text);
        askAI(text);
      }
    };
  });
}

function normalizeContinuation(input) {
  const lower = input.trim().toLowerCase();
  const last = getLastFollowup();

  const continuationWords = [
    "evet", "başla", "devam et", "tamam", "olur", "aç", "karşılaştır",
    "yes", "continue", "ok", "start", "go on", "compare"
  ];

  if (continuationWords.includes(lower) && last) {
    return last;
  }

  return input;
}

async function askAI(customInput = null) {
  const inputEl = document.getElementById("ai-input");
  const output = document.getElementById("ai-output");
  const loading = document.getElementById("ai-loading");

  const rawInput = customInput !== null ? customInput : inputEl.value.trim();
  const question = normalizeContinuation(rawInput);

  if (!question) {
    output.innerHTML = "Please enter a question.";
    return;
  }

  loading.style.display = "flex";
  output.innerHTML = "Thinking...";

  const history = getHistory();

  try {
    const response = await fetch(`${API_BASE_URL}/api/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question,
        history
      })
    });

    const data = await response.json();
    const answer = data.answer || "No response returned.";

    output.innerHTML = `<p>${formatAnswer(answer)}</p>`;

    pushHistory("user", question);
    pushHistory("assistant", answer);

    renderFollowupButtons(question, answer);

    if (customInput === null) {
      inputEl.value = "";
    }
  } catch (error) {
    output.innerHTML = "<p>Arka sunucuya ulaşamıyorum.</p>";
  } finally {
    loading.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("ai-input");

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askAI();
    }
  });
});
