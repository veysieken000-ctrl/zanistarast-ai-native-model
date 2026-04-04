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
  return (
    /[çğıöşü]/.test(lower) ||
    /\b(nedir|neden|nasıl|ne|ile|göre|insan|medeniyet|ahlak|varlık|zaman|uygarlık|bilgi)\b/.test(lower)
  );
}

function escapeHtml(text) {
  return String(text || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatAnswer(text) {
  return escapeHtml(text)
    .replace(/\n\n+/g, "</p><p>")
    .replace(/\n/g, "<br>");
}

function getInputEl() {
  return document.getElementById("questionInput");
}

function getAnswerEl() {
  return document.getElementById("answerBox");
}

function getThinkingEl() {
  return document.getElementById("thinkingBox");
}

function getAskBtnEl() {
  return document.getElementById("askBtn");
}

function getFollowupWrapEl() {
  return document.getElementById("ai-followups");
}

function getFollowupButtonsEl() {
  return document.getElementById("ai-followup-buttons");
}

function setAnswerHtml(html) {
  const output = getAnswerEl();
  if (output) output.innerHTML = html;
}

function setAnswerText(text) {
  const output = getAnswerEl();
  if (output) output.textContent = text;
}

showThinking();
output.innerHTML = "<p>Yanıt hazırlanıyor...</p>";
await new Promise((resolve) => setTimeout(resolve, 900));

function hideThinking() {
  const el = getThinkingEl();
  if (el) el.classList.add("hidden");
}

function fillPrompt(text) {
  const input = getInputEl();
  if (!input) return;
  input.value = text;
  input.focus();
  setTimeout(() => {
    askAI(text);
  }, 80);
}

function clearAI() {
  const input = getInputEl();
  const followups = getFollowupWrapEl();
  const followupButtons = getFollowupButtonsEl();

  if (input) input.value = "";
  setAnswerText("Cevap burada görünecek.");

  if (followups) followups.style.display = "none";
  if (followupButtons) followupButtons.innerHTML = "";

  localStorage.removeItem(CHAT_HISTORY_KEY);
  clearLastFollowup();
}

function getTopicType(question) {
  const q = String(question || "").toLowerCase();

  if (q.includes("hebûn") || q.includes("hebun")) return "hebun";
  if (q.includes("zanabûn") || q.includes("zanabun")) return "zanabun";
  if (q.includes("mabûn") || q.includes("mabun")) return "mabun";
  if (q.includes("rasterast")) return "rasterast";
  if (q.includes("rêbûn") || q.includes("rebun")) return "rebun";

  if (
    q.includes("newroza") ||
    q.includes("medeniyet") ||
    q.includes("uygarlık") ||
    q.includes("civilization")
  ) return "civilization";

  if (
    q.includes("fıtrat") ||
    q.includes("fitrat") ||
    q.includes("ahlak") ||
    q.includes("ethic")
  ) return "fitrah_ethics";

  if (q.includes("zanistarast")) return "zanistarast";
  if (q.includes("zaman") || q.includes("time")) return "time";
  if (q.includes("jeoloji") || q.includes("geology")) return "geology";
  if (q.includes("felsefe") || q.includes("philosophy")) return "philosophy";
  if (q.includes("matematik") || q.includes("formül") || q.includes("formula")) return "math";
  if (q.includes("insanlık tarihi") || q.includes("human history")) return "human_history";
  if (q.includes("varlık tarihi") || q.includes("history of existence")) return "existence_history";

  if (
    q.includes("bilim") ||
    q.includes("science") ||
    q.includes("fizik") ||
    q.includes("physics") ||
    q.includes("biyoloji") ||
    q.includes("biology") ||
    q.includes("zihin") ||
    q.includes("mind")
  ) return "science";

  return "general";
}

function makeLabel(tr, en, isTR) {
  return isTR ? tr : en;
}

function buildFollowups(question, answer) {
  const type = getTopicType(question);
  const isTR = detectTurkish(question) || detectTurkish(answer);
  const make = (tr, en) => makeLabel(tr, en, isTR);

  const followupMap = {
    hebun: [
      make("Hebûn’ü daha derin ontolojik olarak açıkla.", "Explain Hebûn in deeper ontological terms."),
      make("Hebûn’ü klasik ontolojiyle karşılaştır.", "Compare Hebûn with classical ontology."),
      make("Hebûn’ün insan anlayışına etkisini açıkla.", "Explain the effect of Hebûn on the human model.")
    ],
    zanabun: [
      make("Zanabûn’da doğrulama nasıl çalışır?", "How does validation work in Zanabûn?"),
      make("Zanabûn’u pozitivist bilim anlayışıyla karşılaştır.", "Compare Zanabûn with positivist science."),
      make("Zanabûn’un bilgi teorisini derinleştir.", "Deepen the knowledge theory of Zanabûn.")
    ],
    mabun: [
      make("Mabûn’u kapitalizmle karşılaştır.", "Compare Mabûn with capitalism."),
      make("Mabûn’da ekonomi ve sorumluluk ilişkisini açıkla.", "Explain the relation between economy and responsibility in Mabûn."),
      make("Mabûn’un medeniyet üzerindeki etkisini açıkla.", "Explain Mabûn’s impact on civilization.")
    ],
    rasterast: [
      make("Rasterast’ta tutarlılık filtresini açıkla.", "Explain the consistency filter in Rasterast."),
      make("Rasterast’ı klasik bilimsel yöntemle karşılaştır.", "Compare Rasterast with the classical scientific method."),
      make("Rasterast’ın hata eleme mantığını açıkla.", "Explain Rasterast’s error-elimination logic.")
    ],
    rebun: [
      make("Rêbûn yönetim modelini doğa düzeniyle ilişkilendir.", "Relate the Rêbûn governance model to the order of nature."),
      make("Rêbûn’ü modern devlet yapılarıyla karşılaştır.", "Compare Rêbûn with modern state structures."),
      make("Rêbûn modelinde adaletin yerini açıkla.", "Explain the place of justice in the Rêbûn model.")
    ],
    civilization: [
      make("Newroza Kawa uygarlığının temel ilkelerini açıkla.", "Explain the core principles of Newroza Kawa civilization."),
      make("Medeniyetin çöküş ve yeniden inşa mantığını açıkla.", "Explain the collapse and reconstruction logic of civilization."),
      make("Bu konunun Zanistarast sentezi içindeki yerini açıkla.", "Explain where this fits within the Zanistarast synthesis.")
    ],
    fitrah_ethics: [
      make("Fıtrat ve ahlakı sistematik olarak açıkla.", "Explain the logic of fitrah and ethics systematically."),
      make("Fıtrat ile insan doğası ilişkisini açıkla.", "Explain the relation between fitrah and human nature."),
      make("Ahlakın neden yapısal zorunluluk olduğunu açıkla.", "Explain why ethics is a structural necessity.")
    ],
    zanistarast: [
      make("Zanistarast bilimsel sentezini katmanlı olarak açıkla.", "Explain the Zanistarast scientific synthesis in layered form."),
      make("Zanistarast’ı modern bilim anlayışıyla karşılaştır.", "Compare Zanistarast with modern scientific thought."),
      make("Zanistarast’ın medeniyet hedefini açıkla.", "Explain the civilizational aim of Zanistarast.")
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
      make("Felsefenin ontoloji ve epistemolojiyle bağını açıkla.", "Explain philosophy’s relation to ontology and epistemology.")
    ],
    math: [
      make("Matematik formüllerini sistematik olarak açıkla.", "Explain the mathematical formulas systematically."),
      make("YT oranını ayrıntılı açıkla.", "Explain the YT ratio in detail."),
      make("Bu formüllerin boyutsal açılım rolünü açıkla.", "Explain the role of these formulas in dimensional expansion.")
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
    science: [
      make("Bu konuyu fizik-biyoloji-zihin zinciriyle açıkla.", "Explain this through the physics-biology-mind chain."),
      make("Modern bilimi Zanistarast açısından değerlendir.", "Evaluate modern science from the Zanistarast perspective."),
      make("Bu açıklamanın Rasterast filtresinden geçip geçmediğini incele.", "Examine whether this explanation passes the Rasterast filter.")
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
  const wrap = getFollowupWrapEl();
  const container = getFollowupButtonsEl();

  if (!wrap || !container) return;

  const followups = buildFollowups(question, answer);

  if (!followups.length) {
    wrap.style.display = "none";
    container.innerHTML = "";
    clearLastFollowup();
    return;
  }

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
    "evet", "başla", "hadi", "devam", "devam et", "tamam", "olur",
    "ok", "aç", "yes", "continue", "start", "go on"
  ];

  if (continuationWords.includes(lower) && last) {
    return last;
  }

  return input;
}

function chooseEndpoint(question) {
  const q = String(question || "").toLowerCase();

  if (
    q.includes("değerlendir") ||
    q.includes("evaluate") ||
    q.includes("geçerli mi") ||
    q.includes("invalid") ||
    q.includes("valid") ||
    q.includes("çöküş") ||
    q.includes("hüküm ver") ||
    q.includes("rasterast filtresi") ||
    q.includes("structural evaluation")
  ) {
    return "/api/evaluate";
  }

  if (
    q.includes("yorumla") ||
    q.includes("interpret") ||
    q.includes("açıkla") ||
    q.includes("analiz") ||
    q.includes("ilişkilendir") ||
    q.includes("karşılaştır")
  ) {
    return "/api/interpret";
  }

  return "/api/query";
}

function extractAnswer(data) {
  return (
    data?.answer ||
    data?.result ||
    data?.message ||
    "No response returned."
  );
}

function renderRagText(data) {
  if (!data || !data.rag || !Array.isArray(data.rag.chunks)) return "";

  const chunks = data.rag.chunks;
  if (!chunks.length) return "";

  const items = chunks
    .map((item, index) => {
      const title = escapeHtml(item.title || `Chunk #${index + 1}`);
      const domain = escapeHtml(item.domain || "unknown");
      const score =
        typeof item.score === "number" ? item.score.toFixed(2) : "-";

      return `<div class="rag-chip">#${index + 1} ${title} · ${domain} · ${score}</div>`;
    })
    .join("");

  return `
    <div class="rag-box">
      <div class="rag-title">RAG context</div>
      <div class="rag-chip-wrap">${items}</div>
    </div>
  `;
}

async function askAI(customInput = null) {
  const inputEl = getInputEl();
  const output = getAnswerEl();

  if (!output) return;

  const rawInput =
    customInput !== null
      ? customInput
      : (inputEl ? inputEl.value.trim() : "");

  const question = normalizeContinuation(rawInput);

  if (!question) {
    output.innerHTML = "<p>Lütfen bir soru yaz.</p>";
    return;
  }

  showThinking();
  output.innerHTML = "<p>Düşünüyorum...</p>";

  try {
    const endpoint = chooseEndpoint(question);
    const history = getHistory();

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question,
        limit: 8,
        history
      })
    });

    const data = await response.json();
    const answer = extractAnswer(data);
    const ragHtml = renderRagText(data);

    output.innerHTML = `<p>${formatAnswer(answer)}</p>${ragHtml}`;

    pushHistory("user", question);
    pushHistory("assistant", answer);

    renderFollowupButtons(question, answer);

    if (customInput === null && inputEl) {
      inputEl.value = "";
    }
  } catch (error) {
    output.innerHTML =
      "<p>Arka sunucuya ulaşılamadı. Render servis URL’si veya endpoint yapısı kontrol edilmeli.</p>";
  } finally {
    hideThinking();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const input = getInputEl();
  const btn = getAskBtnEl();

  if (btn) {
    btn.addEventListener("click", () => {
      askAI();
    });
  }

  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        askAI();
      }
    });
  }
});
window.fillPrompt = fillPrompt;



