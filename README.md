# TypeRacer User Stories

**User story**

As a learner, I want the test to work on desktop, tablet, and mobile so that I can practice anywhere.

**Acceptance Criteria:**

- [ ] Layout adapts for desktop, tablet, and mobile without horizontal scrolling
- [ ] Typing area remains fully visible on small screens
- [ ] Buttons and text are readable and tappable on touch devices

**Tasks:**

- [ ] Create responsive layout rules for common breakpoints
- [ ] Ensure typing area scales to fit small screens
- [ ] Adjust typography and button sizes for touch

---

**User story**

As a new user, I want a simple start button so that I can begin the test quickly.

**Acceptance Criteria:**

- [ ] A single "Start" action begins the test
- [ ] Timer starts on the first keystroke after Start
- [ ] Input focus moves to the typing area automatically

**Tasks:**

- [ ] Add Start button and connect it to test state
- [ ] Start timer on first keystroke after Start
- [ ] Auto-focus the input when Start is clicked

---

**User story**

As a user, I want to choose a difficulty level so that I can take a test that fits my skill.

**Acceptance Criteria:**

- [ ] User can choose at least 3 difficulty levels
- [ ] Each level uses distinct text length/complexity
- [ ] Selected difficulty is shown during the test

**Tasks:**

- [ ] Build difficulty selector UI
- [ ] Map each difficulty to specific text pools
- [ ] Display chosen difficulty in the test view

---

**User story**

As a user, I want a selection of text passages so that I can practice with varied content.

**Acceptance Criteria:**

- [ ] User can switch to another passage before starting
- [ ] Passages are randomly selected from a pool per difficulty
- [ ] No passage repeats immediately on retry (if pool allows)

**Tasks:**

- [ ] Create passage pools per difficulty level
- [ ] Add "change passage" option before start
- [ ] Prevent immediate repeats when retrying

---

**User story**

As a user, I want a paragraph shown before I type so that I can see what I need to enter.

**Acceptance Criteria:**

- [ ] Text to type is visible above the input area
- [ ] Text remains visible throughout the test
- [ ] Displayed text matches the selected difficulty

**Tasks:**

- [ ] Render target paragraph above input
- [ ] Keep paragraph visible while typing
- [ ] Load text based on selected difficulty

---

**User story**

As a user, I want a clear input area so that I can type the displayed text easily.

**Acceptance Criteria:**

- [ ] Input area is visually distinct and easy to focus
- [ ] Supports typing the full paragraph without truncation
- [ ] Disabled before test start and enabled on start

**Tasks:**

- [ ] Style input for visibility and focus
- [ ] Ensure input supports full-length text
- [ ] Disable input until Start is pressed

---

**User story**

As a user, I want my WPM shown after the test so that I can measure my speed.

**Acceptance Criteria:**

- [ ] Results display WPM, accuracy, and time
- [ ] WPM uses standard formula (chars/5 per minute)
- [ ] Results appear immediately after test end

**Tasks:**

- [ ] Implement WPM calculation
- [ ] Capture accuracy and elapsed time
- [ ] Render results on test completion

---

**User story**

As a user, I want a retry option so that I can immediately try again.

**Acceptance Criteria:**

- [ ] "Retry" resets timer, input, and results
- [ ] New text is loaded on retry (if available)
- [ ] Retry is available on the results screen

**Tasks:**

- [ ] Add Retry button to results view
- [ ] Reset test state on retry
- [ ] Load new passage when retrying

---

**User story**

As a user, I want real-time accuracy feedback so that I can correct mistakes as I type.

**Acceptance Criteria:**

- [ ] Incorrect characters are highlighted as typed
- [ ] Correct vs incorrect counts update in real time
- [ ] Accuracy percentage updates during the test

**Tasks:**

- [ ] Compare typed text to target per character
- [ ] Highlight correct/incorrect characters live
- [ ] Update accuracy metrics on each input event

---

**User story**

As a new user, I want clear instructions so that I can understand how the test works.

**Acceptance Criteria:**

- [ ] Instructions are visible before starting
- [ ] Explain start, timing, and error handling
- [ ] Instructions are accessible during the test

**Tasks:**

- [ ] Write concise instruction copy
- [ ] Display instructions in pre-test view
- [ ] Add in-test "How it works" access

---

**User story**

As a returning user, I want to see my best result so that I can track improvement.

**Acceptance Criteria:**

- [ ] Best WPM is saved locally
- [ ] Best result is shown on home or results view
- [ ] User can reset best result (optional)

**Tasks:**

- [ ] Save best WPM in localStorage
- [ ] Display best score in UI
- [ ] Add optional "reset best score" action
