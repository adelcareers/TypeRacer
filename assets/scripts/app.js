const setAppHeight = () => {
  const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  document.documentElement.style.setProperty("--app-height", `${height}px`);
};

setAppHeight();
window.addEventListener("resize", setAppHeight);
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", setAppHeight);
}

const state = {
  status: "idle",
  startedAt: null,
  endedAt: null,
};

const setStatus = (nextStatus, statusEl) => {
  state.status = nextStatus;
  statusEl.textContent = `Status: ${nextStatus}`;
};

const prepareTest = ({ inputEl, startButton, retryButton, statusEl }) => {
  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.focus();
  state.startedAt = null;
  state.endedAt = null;
  setStatus("ready", statusEl);
  startButton.disabled = true;
  retryButton.disabled = true;
};

const finishTest = ({ inputEl, startButton, retryButton, statusEl }) => {
  state.endedAt = performance.now();
  inputEl.disabled = true;
  setStatus("finished", statusEl);
  startButton.disabled = false;
  retryButton.disabled = false;
};

window.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const retryButton = document.getElementById("retry-button");
  const inputEl = document.getElementById("typing-input");
  const targetTextEl = document.getElementById("target-text");
  const statusEl = document.getElementById("test-status");

  if (!startButton || !retryButton || !inputEl || !targetTextEl || !statusEl) {
    return;
  }

  setStatus("idle", statusEl);
  inputEl.disabled = true;
  retryButton.disabled = true;

  startButton.addEventListener("click", () => {
    if (state.status === "idle" || state.status === "finished") {
      prepareTest({ inputEl, startButton, retryButton, statusEl });
    }
  });

  retryButton.addEventListener("click", () => {
    prepareTest({ inputEl, startButton, retryButton, statusEl });
  });

  inputEl.addEventListener("keydown", () => {
    if (state.status === "ready") {
      state.startedAt = performance.now();
      setStatus("active", statusEl);
    }
  });

  inputEl.addEventListener("input", () => {
    if (state.status !== "active") {
      return;
    }

    const target = targetTextEl.textContent || "";
    if (inputEl.value === target) {
      finishTest({ inputEl, startButton, retryButton, statusEl });
    }
  });
});
