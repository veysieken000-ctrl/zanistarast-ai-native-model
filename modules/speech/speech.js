(() => {
  const API_URL = "https://zanistarast-ai-server.onrender.com/api/ask";

  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const sendBtn = document.getElementById("sendBtn");
  const speakBtn = document.getElementById("speakBtn");
  const clearBtn = document.getElementById("clearBtn");

  const input = document.getElementById("questionInput");
  const answer = document.getElementById("answerOutput");

  const langSelect = document.getElementById("languageSelect");

  const micStatus = document.getElementById("micStatus");
  const systemStatus = document.getElementById("systemStatus");
  const modeStatus = document.getElementById("modeStatus");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition = null;
  let mode = "manual"; // 🔥 kritik
  let manualBaseText = "";
  
  function setMode(m) {
    mode = m;
    if (modeStatus) modeStatus.textContent = m;
  }

  function setSystem(t) {
    if (systemStatus) systemStatus.textContent = t;
  }

  function setMic(on) {
    if (!micStatus) return;
    micStatus.textContent = on ? "On" : "Off";
  }

  function buildRec() {
    if (!SpeechRecognition) {
      setSystem("Speech not supported");
      return null;
    }

    const r = new SpeechRecognition();
    r.continuous = true;
    r.interimResults = true;

    r.onstart = () => {
      setMic(true);
      setMode("voice");
      setSystem("Listening...");
    };

    r.onend = () => {
      setMic(false);
      setMode("manual");
      setSystem("Ready");
    };

    r.onerror = (e) => {
      setSystem("Error: " + e.error);
    };

   r.onresult = (event) => {
  if (mode !== "voice") return;

  let text = "";

  for (let i = event.resultIndex; i < event.results.length; i++) {
    text += event.results[i][0].transcript + " ";
  }

  const speechText = text.trim();

  if (input) {
    input.value = [manualBaseText, speechText].filter(Boolean).join(" ").trim();
  }
};
    return r;
  }

  function start() {
  if (!recognition) recognition = buildRec();
  if (!recognition) return;

  manualBaseText = input ? input.value.trim() : "";

  try {
    recognition.lang = langSelect ? langSelect.value : "en-US";
    recognition.start();
  } catch {}
}
  function stop() {
    if (recognition) {
      try {
        recognition.stop();
      } catch {}
    }
  }

  async function send() {
    if (!input || !input.value.trim()) return;

    setSystem("Thinking...");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input.value.trim() })
      });

      const data = await res.json();

      if (answer) answer.textContent = data.answer || "No answer";

      setSystem("Done");
    } catch {
      setSystem("Error");
    }
  }

  function speak() {
    if (!answer || !answer.textContent) return;

    const u = new SpeechSynthesisUtterance(answer.textContent);
    u.lang = langSelect ? langSelect.value : "en-US";

    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }

  function clearAll() {
    if (input) input.value = "";
    if (answer) answer.textContent = "";
    setSystem("Cleared");
  }

  if (startBtn) startBtn.onclick = start;
  if (stopBtn) stopBtn.onclick = stop;
  if (sendBtn) sendBtn.onclick = send;
  if (speakBtn) speakBtn.onclick = speak;
  if (clearBtn) clearBtn.onclick = clearAll;

  setMode("manual");
  setSystem("Ready");
})();






