// --- Entry Point ---
/**
 * Bootstraps the typing test UI once the DOM is ready.
 * Side effects: initializes viewport sizing, wires event listeners, and mutates DOM state.
 * Assumes required DOM nodes exist; exits early if any are missing to avoid runtime errors.
 */
function initApp() {
  initViewportHeight();

  const elements = getDomElements();
  if (!elements) {
    return;
  }

  initializeUI(elements);
  bindEventHandlers(elements);
}

window.addEventListener("DOMContentLoaded", initApp);

// --- State and Data ---
/**
 * Global test state for the current session.
 * Side effects: updated by event handlers; read by rendering/logic helpers.
 */
const state = {
  status: "idle",
  startedAt: null,
  endedAt: null,
  difficulty: "Easy",
  lastPassageIndex: null,
};

/**
 * Static text pools by difficulty.
 * Assumes passages are plain strings; used for randomized selection.
 */
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

// --- Core UI Workflow ---
/**
 * Collects required DOM elements.
 * Side effects: none.
 * Returns null if any required node is missing to avoid partial initialization.
 */
function getDomElements() {
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
    return null;
  }

  return {
    startButton,
    retryButton,
    inputEl,
    targetTextEl,
    statusEl,
    difficultyEl,
    changeButton,
  };
}

/**
 * Initializes the UI to a clean idle state.
 * Side effects: updates DOM text, disabled states, and target text rendering.
 */
function initializeUI(elements) {
  setStatus("idle", elements.statusEl);
  elements.inputEl.disabled = true;
  elements.retryButton.disabled = true;
  updateTargetText(elements, state.difficulty);
  updateFeedback(elements.targetTextEl, elements.inputEl.value);
}

/**
 * Wires all UI event handlers.
 * Side effects: registers listeners that mutate state and DOM.
 */
function bindEventHandlers(elements) {
  const { startButton, retryButton, inputEl, targetTextEl, statusEl, difficultyEl, changeButton } =
    elements;

  startButton.addEventListener("click", () => {
    if (state.status === "idle" || state.status === "finished") {
      prepareTest({ ...elements, statusEl });
    }
  });

  retryButton.addEventListener("click", () => {
    prepareTest({ ...elements, statusEl });
  });

  changeButton.addEventListener("click", () => {
    if (state.status === "active") {
      return;
    }
    updateTargetText(elements, state.difficulty);
    updateFeedback(targetTextEl, inputEl.value);
  });

  difficultyEl.addEventListener("change", (event) => {
    if (state.status === "active") {
      // Prevent mid-test difficulty changes to keep metrics consistent.
      difficultyEl.value = state.difficulty;
      return;
    }

    state.difficulty = event.target.value;
    updateTargetText(elements, state.difficulty);
    updateFeedback(targetTextEl, inputEl.value);
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

    updateFeedback(targetTextEl, inputEl.value);
    const target = targetTextEl.textContent || "";
    if (inputEl.value === target) {
      finishTest({ ...elements, statusEl });
    }
  });
}

/**
 * Transitions the test into the ready state.
 * Side effects: clears input, focuses input, resets timer state, and updates controls.
 */
function prepareTest({ inputEl, startButton, retryButton, statusEl, targetTextEl }) {
  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.focus();
  state.startedAt = null;
  state.endedAt = null;
  setStatus("ready", statusEl);
  startButton.disabled = true;
  retryButton.disabled = true;
  updateFeedback(targetTextEl, inputEl.value);
}

/**
 * Finalizes the test once the target text is fully matched.
 * Side effects: stamps end time, disables input, and updates controls.
 */
function finishTest({ inputEl, startButton, retryButton, statusEl }) {
  state.endedAt = performance.now();
  inputEl.disabled = true;
  setStatus("finished", statusEl);
  startButton.disabled = false;
  retryButton.disabled = false;
}

// --- Feedback Rendering ---
/**
 * Updates the displayed target text for the selected difficulty.
 * Side effects: updates the target text DOM and resets input state.
 */
function updateTargetText({ targetTextEl, inputEl }, difficulty) {
  const { text, index } = pickPassage(difficulty);
  renderTargetText(targetTextEl, text);
  state.lastPassageIndex = index;
  inputEl.value = "";
}

/**
 * Renders target text as span-wrapped characters.
 * Side effects: replaces inner HTML to enable per-character styling.
 */
function renderTargetText(targetTextEl, text) {
  targetTextEl.innerHTML = "";
  const fragment = document.createDocumentFragment();
  [...text].forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    fragment.appendChild(span);
  });
  targetTextEl.appendChild(fragment);
}

/**
 * Applies correctness styling for each character based on current input.
 * Side effects: mutates class names on target text spans.
 * Assumes target text has been rendered into spans.
 */
function updateFeedback(targetTextEl, inputValue) {
  const spans = targetTextEl.querySelectorAll("span");
  spans.forEach((span, index) => {
    const typedChar = inputValue[index];
    span.classList.remove("char-correct", "char-incorrect", "char-current");

    if (typedChar == null) {
      if (index === inputValue.length) {
        span.classList.add("char-current");
      }
      return;
    }

    if (typedChar === span.textContent) {
      span.classList.add("char-correct");
    } else {
      span.classList.add("char-incorrect");
    }

    // Keep the caret indicator aligned with the next expected character.
    if (index === inputValue.length) {
      span.classList.add("char-current");
    }
  });
}

// --- Utilities ---
/**
 * Updates status text and state in a single helper.
 * Side effects: mutates global state and updates DOM text.
 */
function setStatus(nextStatus, statusEl) {
  state.status = nextStatus;
  statusEl.textContent = `Status: ${nextStatus}`;
}

/**
 * Selects a passage while avoiding immediate repetition.
 * Side effects: none; uses global state to track the last index.
 */
function pickPassage(difficulty) {
  const pool = textPools[difficulty] || textPools.Easy;
  if (pool.length === 1) {
    return { text: pool[0], index: 0 };
  }

  let index = Math.floor(Math.random() * pool.length);
  // Avoid immediate repetition when possible.
  if (index === state.lastPassageIndex) {
    index = (index + 1) % pool.length;
  }

  return { text: pool[index], index };
}

/**
 * Initializes viewport-dependent sizing for mobile keyboards.
 * Side effects: writes CSS variables and registers resize listeners.
 */
function initViewportHeight() {
  const applyHeight = () => {
    const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    document.documentElement.style.setProperty("--app-height", `${height}px`);
  };

  applyHeight();
  window.addEventListener("resize", applyHeight);
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", applyHeight);
  }
}
