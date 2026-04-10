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

  systemStatusEl.classList.remove(
    "thinking",
    "is-ready",
    "is-done",
    "is-thinking",
    "is-speaking",
    "is-error"
  );

  if (
    lower.includes("düşünüyorum") ||
    lower.includes("düşünülüyor") ||
    lower.includes("thinking") ||
    lower.includes("speaking")
  ) {
    const isSpeaking = lower.includes("speaking");
    const label = isSpeaking ? "Speaking" : "Düşünüyorum";

    systemStatusEl.innerHTML =
      label +
      ' <span class="thinking-dots"><span>.</span><span>.</span><span>.</span></span>';

    systemStatusEl.classList.add("thinking", "status-value");
    systemStatusEl.classList.add(isSpeaking ? "is-speaking" : "is-thinking");
    return;
  }

  systemStatusEl.textContent = value;

  if (lower.includes("ready")) {
    systemStatusEl.classList.add("is-ready");
  } else if (lower.includes("done")) {
    systemStatusEl.classList.add("is-done");
  } else if (lower.includes("error")) {
    systemStatusEl.classList.add("is-error");
  }
}

