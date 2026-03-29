const API_BASE_URL = "https://zanistarast-ai-server.onrender.com";
const CHAT_HISTORY_KEY = "zanistarast_chat_history";
const FOLLOW_UP_KEY = "zanistarast_follow_up";

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history));
}

function pushToHistory(role, content) {
  const history = getHistory();
  history.push({ role, content });
  saveHistory(history.slice(-8));
}

function saveFollowUp(text) {
  if (text) {
    localStorage.setItem(FOLLOW_UP_KEY, text);
  }
}

function getFollowUp() {
  return localStorage.getItem(FOLLOW_UP_KEY) || "";
}

function clearFollowUp() {
  localStorage.removeItem(FOLLOW_UP_KEY);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function extractFollowUpSuggestions(text) {
  const matches = text.match(/İstersen[^.!?]*\?/gim);
  return matches ? matches.slice(0, 2) : [];
}

function renderFollowUpButtons(text) {
  const suggestions = extractFollowUpSuggestions(text);

  if (!suggestions.length) return "";

  return `
    <div class="ai-followups" style="margin-top:16px; display:flex; gap:10px; flex-wrap:wrap;">
      ${suggestions
        .map(
          (item) => `
            <button
              type="button"
              class="ai-followup-btn"
              data-followup="${escapeHtml(item)}"
              style="
                padding:10px 14px;
                border:none;
                border-radius:999px;
                background:#111;
                color:#fff;
                cursor:pointer;
                font-size:14px;
              "
            >
              ${escapeHtml(item)}
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function formatAnswer(text) {
  if (!text) return "";

  const safe = escapeHtml(text)
    .replace(/\r\n/g, "\n")
    .replace(/\n\n+/g, "</p><p>")
    .replace(/\n/g, "<br>");

  return `<p>${safe}</p>${renderFollowUpButtons(text)}`;
}

function normalizeShortFollowUp(input) {
  const shortValue = input.trim().toLowerCase();
  const followUp = getFollowUp();

  const triggers = [
    "evet",
    "başla",
    "tamam",
    "devam et",
    "olur",
    "aç",
    "anlat",
    "karşılaştır"
  ];

  if (triggers.includes(shortValue) && followUp) {
    return followUp;
  }

  return input;
}

async function askAI(customInput = null) {
  const inputEl = document.getElementById("ai-input");
  const rawInput = customInput !== null ? customInput : inputEl.value.trim();
  const input = normalizeShortFollowUp(rawInput);

  const output = document.getElementById("ai-output");
  const loading = document.getElementById("ai-loading");

  if (!input) {
    output.innerHTML = "<strong>Answer:</strong> Please enter a question.";
    return;
  }

  loading.style.display = "flex";
  output.innerHTML = "<strong>Answer:</strong> ";

  const history = getHistory();

  try {
    const response = await fetch(`${API_BASE_URL}/api/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: input,
        history: history
      })
    });

    const data = await response.json();

    loading.style.display = "none";

    const answer = data.answer || "No response from server.";

    output.innerHTML = `<strong>Answer:</strong> ${formatAnswer(answer)}`;

    pushToHistory("user", input);
    pushToHistory("assistant", answer);

    const suggestions = extractFollowUpSuggestions(answer);
    if (suggestions.length) {
      saveFollowUp(suggestions[0]);
    } else {
      clearFollowUp();
    }

    if (customInput === null) {
      inputEl.value = "";
    }

    bindFollowUpButtons();
  } catch (error) {
    loading.style.display = "none";
    output.innerHTML =
      "<strong>Answer:</strong> Connection error. Backend not reachable.";
  }
}

function bindFollowUpButtons() {
  const buttons = document.querySelectorAll(".ai-followup-btn");

  buttons.forEach((button) => {
    button.onclick = () => {
      const followup = button.getAttribute("data-followup");
      if (followup) {
        saveFollowUp(followup);
        askAI(followup);
      }
    };
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("ai-input");

  if (input) {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        askAI();
      }
    });
  }

  bindFollowUpButtons();
});

