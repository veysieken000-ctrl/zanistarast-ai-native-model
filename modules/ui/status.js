(() => {
  const micStatusEl = document.getElementById("micStatus");
  const systemStatusEl = document.getElementById("systemStatus");
  const langStatusEl = document.getElementById("langStatus");
  const modeStatusEl = document.getElementById("modeStatus");
  const listeningLabelEl = document.getElementById("listeningLabel");

  function setMicStatus(active) {
    if (!micStatusEl) return;
    micStatusEl.textContent = active ? "On" : "Off";
    micStatusEl.className = "status-chip-value " + (active ? "mic-on" : "mic-off");
  }

  function setSystemStatus(text) {
    if (!systemStatusEl) return;

    const value = String(text || "");
    const lower = value.toLowerCase();

    if (
      lower.includes("thinking") ||
      lower.includes("düşünüyor") ||
      lower.includes("speaking")
    ) {
      const label = lower.includes("speaking") ? "Speaking" : "Thinking";

      systemStatusEl.innerHTML =
        label +
        '<span class="thinking-dots"><span>.</span><span>.</span><span>.</span></span>';

      systemStatusEl.classList.add("thinking");
      return;
    }

    systemStatusEl.textContent = value;
    systemStatusEl.classList.remove("thinking");
  }

  function setLangStatus(text) {
    if (!langStatusEl) return;
    langStatusEl.textContent = text || "en-US";
  }

  function setModeStatus(text) {
    if (!modeStatusEl) return;
    modeStatusEl.textContent = text || "manual";
  }

  function setListeningLabel(text) {
    if (!listeningLabelEl) return;
    listeningLabelEl.textContent = text || "Listening Language";
  }

  window.UIStatus = {
    setMicStatus,
    setSystemStatus,
    setLangStatus,
    setModeStatus,
    setListeningLabel
  };
})();
