const API_BASE_URL = "https://zanistarast-ai-server.onrender.com";
const CHAT_HISTORY_KEY = "zanistarast_chat_history";

function formatAnswer(text) {
  if (!text) return "";

  return text
    .replace(/\r\n/g, "\n")

    .replace(/^## Definition$/gim, "<h3>Definition</h3>")
    .replace(/^## Structural Analysis$/gim, "<h3>Structural Analysis</h3>")
    .replace(/^## Zanistarast Perspective$/gim, "<h3>Zanistarast Perspective</h3>")
    .replace(/^## Conclusion$/gim, "<h3>Conclusion</h3>")

    .replace(/^## Tanım$/gim, "<h3>Tanım</h3>")
    .replace(/^## Yapısal Analiz$/gim, "<h3>Yapısal Analiz</h3>")
    .replace(/^## Zanistarast Perspektifi$/gim, "<h3>Zanistarast Perspektifi</h3>")
    .replace(/^## Sonuç$/gim, "<h3>Sonuç</h3>")

    .replace(/^## Pênase$/gim, "<h3>Pênase</h3>")
    .replace(/^## Analîza Strukturî$/gim, "<h3>Analîza Strukturî</h3>")
    .replace(/^## Perspektîfa Zanistarast$/gim, "<h3>Perspektîfa Zanistarast</h3>")
    .replace(/^## Encam$/gim, "<h3>Encam</h3>")

    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n+/g, "</p><p>")
    .replace(/\n/g, "<br>")
    .replace(/^(.*)$/s, "<p>$1</p>");
}

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

  // son 8 mesajı tut
  const trimmed = history.slice(-8);
  saveHistory(trimmed);
}

async function askAI() {
  const inputEl = document.getElementById("ai-input");
  const input = inputEl.value.trim();
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

    output.innerHTML =
      "<strong>Answer:</strong> " + formatAnswer(answer);

    pushToHistory("user", input);
    pushToHistory("assistant", answer);

  } catch (error) {
    loading.style.display = "none";
    output.innerHTML =
      "<strong>Answer:</strong> Connection error. Backend not reachable.";
  }
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
});

