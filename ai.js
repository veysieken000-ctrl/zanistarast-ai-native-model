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
  const lower = String(text || "").toLowerCase();
  return /[çğıöşü]/.test(lower) ||
    /\b(nedir|neden|nasıl|ve|ile|göre|insan|medeniyet|ahlak|varlık|zaman|uygarlık|bilgi)\b/.test(lower);
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

function getTopicType(question) {
  const q = String(question || "").toLowerCase();

  if (q.includes("hebun") || q.includes("hebûn")) return "hebun";
  if (q.includes("zanabun") || q.includes("zanabûn")) return "zanabun";
  if (q.includes("mabun") || q.includes("mabûn")) return "mabun";
  if (q.includes("rasterast")) return "rasterast";
  if (q.includes("rabun") || q.includes("rabûn")) return "rabun";
  if (q.includes("newroza") || q.includes("medeniyet") || q.includes("uygarlık") || q.includes("civilization")) return "civilization";
  if (q.includes("fitrat") || q.includes("fıtrat") || q.includes("ahlak") || q.includes("ethics")) return "fitrah_ethics";
  if (q.includes("zanistarast")) return "zanistarast";
  if (q.includes("zaman") || q.includes("time")) return "time";
  if (q.includes("jeoloji") || q.includes("geology")) return "geology";
  if (q.includes("felsefe") || q.includes("philosophy")) return "philosophy";
  if (q.includes("matematik") || q.includes("formula") || q.includes("formül")) return "math";
  if (q.includes("insanlık tarihi") || q.includes("human history")) return "human_history";
  if (q.includes("varlık tarihi") || q.includes("history of existence")) return "existence_history";

  return "general";
}

function buildFollowups(question, answer) {
  const type = getTopicType(question);
  const isTR = detectTurkish(question) || detectTurkish(answer);
  const make = (tr, en) => (isTR ? tr : en);

  const followupMap = {
    hebun: [
      make("Hebûn'u daha derin ontolojik olarak açıkla.", "Explain Hebûn in deeper ontological terms."),
      make("Hebûn'u klasik ontolojiyle karşılaştır.", "Compare Hebûn with classical ontology."),
      make("Hebûn'un insan anlayışına etkisini açıkla.", "Explain the effect of Hebûn on the human model.")
    ],
    zanabun: [
      make("Zanabûn'da doğrulama nasıl çalışır?", "How does validation work in Zanabûn?"),
      make("Zanabûn'u pozitivist bilim anlayışıyla karşılaştır.", "Compare Zanabûn with positivist science."),
      make("Zanabûn'un bilgi teorisini derinleştir.", "Deepen the knowledge theory of Zanabûn.")
    ],
    mabun: [
      make("Mabûn'u kapitalizmle karşılaştır.", "Compare Mabûn with capitalism."),
      make("Mabûn'da ekonomi ve sorumluluk ilişkisini açıkla.", "Explain the relation between economy and responsibility in Mabûn."),
      make("Mabûn'un medeniyet üzerindeki etkisini açıkla.", "Explain Mabûn's impact on civilization.")
    ],
    rasterast: [
      make("Rasterast'ta tutarlılık filtresini açıkla.", "Explain the consistency filter in Rasterast."),
      make("Rasterast'ı klasik bilimsel yöntemle karşılaştır.", "Compare Rasterast with the classical scientific method."),
      make("Rasterast'ın hata eleme mantığını açıkla.", "Explain Rasterast's error-elimination logic.")
    ],
    rabun: [
      make("Rabûn yönetim modelini doğa düzeniyle ilişkilendir.", "Relate the Rabûn governance model to the order of nature."),
      make("Rabûn'u modern devlet yapılarıyla karşılaştır.", "Compare Rabûn with modern state structures."),
      make("Rabûn modelinde adaletin yerini açıkla.", "Explain the place of justice in the Rabûn model.")
    ],
    civilization: [
      make("Newroza Kawa uygarlığının temel ilkelerini açıkla.", "Explain the core principles of Newroza Kawa Civilization."),
      make("Medeniyetin çöküş ve yeniden inşa mantığını açıkla.", "Explain the collapse and reconstruction logic of civilization."),
      make("Bu konuyu Zanistarast sentezi içinde derinleştir.", "Deepen this within the Zanistarast synthesis.")
    ],
    fitrah_ethics: [
      make("Fıtrat ve ahlak çağını sistematik olarak açıkla.", "Explain the Age of Fitrah and Ethics systematically."),
      make("Fıtrat ile insan doğası ilişkisini açıkla.", "Explain the relation between fitrah and human nature."),
      make("Ahlakın neden yapısal zorunluluk olduğunu açıkla.", "Explain why ethics is a structural necessity.")
    ],
    zanistarast: [
      make("Zanistarast bilimsel sentezini katmanlı olarak açıkla.", "Explain the Zanistarast scientific synthesis in layered form."),
      make("Zanistarast'ı modern bilim anlayışıyla karşılaştır.", "Compare Zanistarast with modern scientific thought."),
      make("Zanistarast'ın medeniyet hedefini açıkla.", "Explain the civilizational aim of Zanistarast.")
    ],
    time: [
      make("Zamanı Zanistarast bilimsel sentezine göre açıkla.", "Explain time through the Zanistarast scientific synthesis."),
      make("Zaman ile varlık ilişkisini açıkla.", "Explain the relation between time and existence."),
      make("Zamanın medeniyet üzerindeki etkisini açıkla.", "Explain the impact of time on civilization.")
    ],
    geology: [
      make("Jeolojiyi katmanlı gerçeklik modeline göre açıkla.", "Explain geology according to the layered model of reality."),
      make("Jeoloji ile varlık tarihi ilişkisini açıkla.", "Explain the relation between geology and the history of existence."),
      make("Jeolojinin insanlık tarihine etkisini açıkla.", "Explain geology’s effect on human history.")
    ],
    philosophy: [
      make("Felsefeyi Zanistarast çerçevesinde yeniden açıkla.", "Re-explain philosophy within the Zanistarast framework."),
      make("Bu konuyu klasik felsefeyle karşılaştır.", "Compare this with classical philosophy."),
      make("Felsefenin ontoloji ve epistemolojiyle bağını açıkla.", "Explain philosophy's relation to ontology and epistemology.")
    ],
    math: [
      make("Matematik formüllerini sistematik olarak açıkla.", "Explain the mathematical formulas systematically."),
      make("K/T oranını ayrıntılı açıkla.", "Explain the K/T ratio in detail."),
      make("Bu formüllerin boyutsal açılımdaki rolünü açıkla.", "Explain the role of these formulas in dimensional expansion.")
    ],
    human_history: [
      make("İnsanlık tarihini boyutsal modele göre açıkla.", "Explain human history according to the dimensional model."),
      make("İnsanlık tarihini medeniyet açısından derinleştir.", "Deepen human history in civilizational terms."),
      make("İnsanlık tarihindeki kırılma noktalarını açıkla.", "Explain the breakpoints in human history.")
    ],
    existence_history: [
      make("Varlık tarihini boyutsal sistemle açıkla.", "Explain the history of existence through the dimensional system."),
      make("Varlık tarihini jeoloji ve biyolojiyle ilişkilendir.", "Relate the history of existence to geology and biology."),
      make("Varlık tarihinin insan ortaya çıkışına nasıl bağlandığını açıkla.", "Explain how the history of existence leads to the emergence of the human.")
    ],
    general: [
      make("Bunu daha derin açıkla.", "Explain this more deeply."),
      make("Bunu Zanistarast bilimsel sentezine göre genişlet.", "Expand this according to the Zanistarast scientific synthesis."),
      make("Bunun medeniyet boyutunu açıkla.", "Explain the civilizational dimension of this.")
    ]
  };

  return followupMap[type] || followupMap.general;
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

  container.innerHTML = "";
  followups.forEach((item) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "followup-chip";
    btn.textContent = item;
    btn.onclick = () => {
      saveLastFollowup(item);
      askAI(item);
    };
    container.appendChild(btn);
  });

  wrap.style.display = "block";
}

function normalizeContinuation(input) {
  const lower = String(input || "").trim().toLowerCase();
  const last = getLastFollowup();

  const continuationWords = [
    "evet", "başla", "basla", "devam", "devam et", "tamam", "olur", "aç", "ac",
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

  loading.style.display = "inline-flex";
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
  } catch (_error) {
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

