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
  difficulty: "Easy",
  lastPassageIndex: null,
};

const textPools = {
  Easy: [
    "The quick brown fox jumps over the lazy dog near the quiet riverbank.",
    "Soft rain taps the window while the morning light fills the room.",
    "A calm breeze moves the leaves as the sun rises over the hills.",
  ],
  Medium: [
    "The curious traveler followed the winding path through the forest at dusk.",
    "Fresh bread and warm coffee made the small kitchen feel welcoming.",
    "The lantern flickered as the boat drifted across the still, dark water.",
  ],
  Hard: [
    "Precision and patience are required to master a new typing rhythm.",
    "An orchestra rehearsed tirelessly, balancing tempo with delicate harmony.",
    "The archaeologist documented each artifact before sealing the chamber.",
  ],
};

const pickPassage = (difficulty) => {
  const pool = textPools[difficulty] || textPools.Easy;
  if (pool.length === 1) {
    return { text: pool[0], index: 0 };
  }

  let index = Math.floor(Math.random() * pool.length);
  if (index === state.lastPassageIndex) {
    index = (index + 1) % pool.length;
  }

  return { text: pool[index], index };
};

const updateTargetText = ({ targetTextEl, inputEl }, difficulty) => {
  const { text, index } = pickPassage(difficulty);
  targetTextEl.textContent = text;
  state.lastPassageIndex = index;
  inputEl.value = "";
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
  const difficultyEl = document.getElementById("difficulty");
  const changeButton = document.getElementById("change-button");

  if (
    !startButton ||
    !retryButton ||
    !inputEl ||
    !targetTextEl ||
    !statusEl ||
    !difficultyEl ||
    !changeButton
  ) {
    return;
  }

  setStatus("idle", statusEl);
  inputEl.disabled = true;
  retryButton.disabled = true;
  updateTargetText({ targetTextEl, inputEl }, state.difficulty);

  startButton.addEventListener("click", () => {
    if (state.status === "idle" || state.status === "finished") {
      prepareTest({ inputEl, startButton, retryButton, statusEl });
    }
  });

  retryButton.addEventListener("click", () => {
    prepareTest({ inputEl, startButton, retryButton, statusEl });
  });

  changeButton.addEventListener("click", () => {
    if (state.status === "active") {
      return;
    }
    updateTargetText({ targetTextEl, inputEl }, state.difficulty);
  });

  difficultyEl.addEventListener("change", (event) => {
    if (state.status === "active") {
      difficultyEl.value = state.difficulty;
      return;
    }

    state.difficulty = event.target.value;
    updateTargetText({ targetTextEl, inputEl }, state.difficulty);
    if (state.status === "finished") {
      setStatus("idle", statusEl);
      inputEl.disabled = true;
      startButton.disabled = false;
      retryButton.disabled = true;
    }
  });

  inputEl.addEventListener("input", () => {
    if (state.status === "ready") {
      state.startedAt = performance.now();
      setStatus("active", statusEl);
    }

    if (state.status !== "active") {
      return;
    }

    const target = targetTextEl.textContent || "";
    if (inputEl.value === target) {
      finishTest({ inputEl, startButton, retryButton, statusEl });
    }
  });
});
