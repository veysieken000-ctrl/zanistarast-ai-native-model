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

 .panel-status-top {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 18px;
}

.panel-status-bottom {
  display: flex;
  justify-content: flex-start;
  margin-top: 16px;
}

.status-chip {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  padding: 12px 14px;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.18);
}

.status-chip-label {
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #9fb0c8;
  margin-bottom: 8px;
  font-weight: 800;
}

.status-chip-value {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 34px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 18px;
  font-weight: 900;
  line-height: 1;
  border: 1px solid transparent;
}

/* dil */
#langStatus.status-chip-value {
  background: rgba(90, 150, 255, 0.16);
  color: #9ec5ff;
  border-color: rgba(90, 150, 255, 0.28);
}

/* mikrofon */
#micStatus.status-chip-value.mic-on {
  background: rgba(66, 211, 146, 0.16);
  color: #5df2af;
  border-color: rgba(66, 211, 146, 0.28);
}

#micStatus.status-chip-value.mic-off {
  background: rgba(255, 120, 140, 0.14);
  color: #ffb3bf;
  border-color: rgba(255, 120, 140, 0.24);
}

/* sistem */
#systemStatus.status-chip-value {
  background: rgba(255,255,255,0.06);
  color: #ffffff;
  border-color: rgba(255,255,255,0.08);
}

#systemStatus.status-chip-value.is-ready,
#systemStatus.status-chip-value.is-done {
  background: rgba(66, 211, 146, 0.16);
  color: #5df2af;
  border-color: rgba(66, 211, 146, 0.28);
}

#systemStatus.status-chip-value.is-thinking,
#systemStatus.status-chip-value.is-speaking {
  background: rgba(255, 208, 90, 0.16);
  color: #ffd76e;
  border-color: rgba(255, 208, 90, 0.28);
}

#systemStatus.status-chip-value.is-error {
  background: rgba(255, 120, 140, 0.14);
  color: #ffb3bf;
  border-color: rgba(255, 120, 140, 0.24);
}

/* mode */
#modeStatus.status-chip-value {
  background: rgba(178, 136, 255, 0.16);
  color: #ceb2ff;
  border-color: rgba(178, 136, 255, 0.28);
}

.status-chip-center {
  text-align: center;
}

.status-chip-center .status-chip-value {
  justify-content: center;
  width: 100%;
}

.status-chip-bottom {
  min-width: 210px;
}

@media (max-width: 980px) {
  .panel-status-top {
    grid-template-columns: 1fr;
  }

  .status-chip-bottom {
    min-width: 100%;
  }
}
