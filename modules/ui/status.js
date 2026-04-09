(() => {
  const micStatusEl = document.getElementById("micStatus");
  const systemStatusEl = document.getElementById("systemStatus");
  const langStatusEl = document.getElementById("langStatus");
  const modeStatusEl = document.getElementById("modeStatus");

  function setMicStatus(active) {
    if (!micStatusEl) return;

    micStatusEl.textContent = active ? "On" : "Off";
    micStatusEl.className = "status-value " + (active ? "mic-on" : "mic-off");
  }

  function setSystemStatus(text) {
  if (!systemStatusEl) return;

  const value = String(text || "");
  const lower = value.toLowerCase();

  if (
    lower.includes("düşünülüyor") ||
    lower.includes("thinking") ||
    lower.includes("speaking")
  ) {
    const label =
      lower.includes("speaking") ? "Speaking" : "Düşünülüyor";

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
    langStatusEl.textContent = text;
  }

  function setModeStatus(text) {
    if (!modeStatusEl) return;
    modeStatusEl.textContent = text;
  }

  window.UIStatus = {
    setMicStatus,
    setSystemStatus,
    setLangStatus,
    setModeStatus
  };
})();
