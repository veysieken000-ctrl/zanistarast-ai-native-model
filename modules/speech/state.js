(() => {
  let mode = "manual";
  let listening = false;

  function getMode() {
    return mode;
  }

  function setMode(value) {
    mode = value || "manual";

    if (window.UIStatus && typeof window.UIStatus.setModeStatus === "function") {
      window.UIStatus.setModeStatus(mode);
    }
  }

  function isListening() {
    return listening;
  }

  function setListening(value) {
    listening = Boolean(value);

    if (window.UIStatus && typeof window.UIStatus.setMicStatus === "function") {
      window.UIStatus.setMicStatus(listening);
    }
  }

  function resetSpeechState() {
    mode = "manual";
    listening = false;

    if (window.UIStatus) {
      if (typeof window.UIStatus.setModeStatus === "function") {
        window.UIStatus.setModeStatus(mode);
      }

      if (typeof window.UIStatus.setMicStatus === "function") {
        window.UIStatus.setMicStatus(false);
      }
    }
  }

  window.SpeechState = {
    getMode,
    setMode,
    isListening,
    setListening,
    resetSpeechState
  };
})();

