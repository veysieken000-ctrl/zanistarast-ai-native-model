(() => {
  const micStatusEl = document.getElementById("micStatus");
  const systemStatusEl = document.getElementById("systemStatus");
  const langStatusEl = document.getElementById("langStatus");
  const modeStatusEl = document.getElementById("modeStatus");
  const listeningLabelEl = document.getElementById("listeningLabel");

  let currentPack = {
    ready: "Ready",
    thinking: "Thinking",
    speaking: "Speaking",
    done: "Done",
    off: "Off",
    on: "On",
    manual: "manual",
    listeningLabel: "Listening Language"
  };

  function setTranslations(pack) {
    currentPack = { ...currentPack, ...(pack || {}) };
  }

  function setMicStatus(active) {
    if (!micStatusEl) return;
    micStatusEl.textContent = active ? currentPack.on : currentPack.off;
    micStatusEl.className = "status-chip-value " + (active ? "mic-on" : "mic-off");
  }

  function setSystemStatus(text) {
    if (!systemStatusEl) return;

    const value = String(text || "");
    const lower = value.toLowerCase();

    const thinkingWords = [
      "thinking",
      "düşünüyor",
      "difizire",
      "يفكر"
    ];

    const speakingWords = [
      "speaking",
      "konuşuyor",
      "diaxive",
      "يتحدث"
    ];

    const isThinking = thinkingWords.some((x) => lower.includes(x));
    const isSpeaking = speakingWords.some((x) => lower.includes(x));

    if (isThinking || isSpeaking) {
      const label = isSpeaking ? currentPack.speaking : currentPack.thinking;

      systemStatusEl.innerHTML =
        label +
        '<span class="thinking-dots"><span>.</span><span>.</span><span>.</span></span>';

      systemStatusEl.classList.add("thinking");
      return;
    }

    if (lower === "ready") {
      systemStatusEl.textContent = currentPack.ready;
    } else if (lower === "done") {
      systemStatusEl.textContent = currentPack.done;
    } else {
      systemStatusEl.textContent = value;
    }

    systemStatusEl.classList.remove("thinking");
  }

  function setLangStatus(text) {
    if (!langStatusEl) return;
    langStatusEl.textContent = text || "en-US";
  }

  function setModeStatus(text) {
    if (!modeStatusEl) return;

    const value = String(text || "").toLowerCase();
    if (value === "manual") {
      modeStatusEl.textContent = currentPack.manual;
      return;
    }

    modeStatusEl.textContent = text || currentPack.manual;
  }

  function setListeningLabel(text) {
    if (!listeningLabelEl) return;
    listeningLabelEl.textContent = text || currentPack.listeningLabel;
  }

  window.UIStatus = {
    setMicStatus,
    setSystemStatus,
    setLangStatus,
    setModeStatus,
    setListeningLabel,
    setTranslations
  };
})();
