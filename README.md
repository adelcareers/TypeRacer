# TypeRacer Application - Requirements and User Stories

[![Deploy to GitHub Pages](https://github.com/adelcareers/TypeRacer/actions/workflows/pages.yml/badge.svg)](https://github.com/adelcareers/TypeRacer/actions/workflows/pages.yml)

This document serves as the source of truth for the TypeRacer project. It combines high-level business requirements with technical UX logic for a professional-grade typing speed application.

---

## 1. Responsive and Accessible Design (Must-Have)
**User Story:** As a user, I want the website to be fully responsive and accessible so that I can practice my typing on any device without layout issues.

**Acceptance Criteria:**
- The layout adapts to desktop, tablet, and smartphone without horizontal scrolling.
- Typing area and target text remain fully visible when the mobile on-screen keyboard is active.
- All interactive elements meet a minimum touch target size of 44x44px.

**Tasks:**
- [ ] Implement a fluid grid layout using CSS Flexbox/Grid.
- [ ] Set up media queries for common breakpoints (mobile, tablet, desktop).
- [ ] Audit typography and button sizes for mobile tappability.
- [ ] Use `100dvh` or a `visualViewport`-based CSS variable to avoid mobile viewport jump.

---

## 2. Intelligent Test Engine (Must-Have)
**User Story:** As a casual user, I want a frictionless way to start and finish the test so that my WPM results are not skewed by manual mouse clicks.

**Acceptance Criteria:**
- Clicking a "Start" button prepares the test and focuses the input area.
- The timer begins automatically on the first keystroke.
- The test ends when the final character is correctly typed (errors must be fixed to finish).
- Input is disabled until the "Start" button is clicked and after the test completes.
- A clear "Retry" action is available to start a new test.

**Tasks:**
- [ ] Create a test state manager (Idle, Ready, Active, Finished).
- [ ] Implement an event listener to trigger the timer on the first `keydown`.
- [ ] Add logic to finish the test when typed text matches target text.
- [ ] Auto-focus the input field when the "Start" state is triggered.

---

## 3. Dynamic Sample Text and Difficulty (Must-Have)
**User Story:** As a user, I want to choose a difficulty level and see a preview of the text so that I can practice with varied content suited to my skill.

**Acceptance Criteria:**
- User can select Easy, Medium, or Hard difficulty.
- Each level pulls from a specific pool of text passages.
- A preview of the selected passage is shown before the test starts.
- A "Change Passage" button allows the user to swap text before the test starts.

**Tasks:**
- [ ] Create a JSON data structure containing text pools for each level.
- [ ] Implement a random selection algorithm that prevents immediate text repetition.
- [ ] Build a UI difficulty selector that updates the displayed sample text instantly.

---

## 4. Character-Level Real-Time Feedback (Must-Have)
**User Story:** As a user, I want to see exactly which character I have typed incorrectly in real time so that I can correct my mistakes immediately.

**Acceptance Criteria:**
- Correctly typed characters are visually distinct from incorrect characters.
- Highlighting updates instantly on every input event.
- The current character position is visually indicated.

**Tasks:**
- [ ] Implement a diffing function to compare the input string vs the target string.
- [ ] Wrap target text characters in `<span>` tags for individual styling.
- [ ] Ensure the current character is visually indicated (e.g., underline or caret).

---

## 5. Standardized Results Calculation (Must-Have)
**User Story:** As a user, I want to see my speed and accuracy calculated using industry standards.

**Acceptance Criteria:**
- WPM uses the standard formula based on correct characters typed.
- Accuracy is calculated as a percentage of correct characters.
- Results are displayed immediately upon test completion.

**Technical Formulas:**
- **WPM:** `(correct characters / 5) / minutes`
- **Accuracy:** `(correct characters / total typed characters) * 100`

**Tasks:**
- [ ] Implement the mathematical logic for WPM and Accuracy.
- [ ] Capture precise `startTime` and `endTime` for elapsed time.
- [ ] Build a results card UI component.

---

## 6. Persistent Best Results (Should-Have)
**User Story:** As a competitive user, I want my best results for each level to be saved on my device.

**Acceptance Criteria:**
- Highest WPM for each level is stored in `localStorage`.
- Best score is displayed on the dashboard for the selected difficulty.

**Tasks:**
- [ ] Create helper functions for `localStorage` (get/set).
- [ ] Implement logic to compare and overwrite high scores.
- [ ] Add a "Clear High Scores" button for user privacy.

---

## 7. Test Instructions Modal (Should-Have)
**User Story:** As a new user, I want a clear explanation of how the test works before I start.

**Acceptance Criteria:**
- A modal explains that the timer starts on the first keystroke.
- The modal is accessible via an "Instructions" button.

**Tasks:**
- [ ] Build a modal UI component with a backdrop overlay.
- [ ] Add a "How it Works" button to the main navigation.

---

## 8. Quick Retry Functionality (Should-Have)
**User Story:** As a user, I want to quickly restart the test to keep practicing.

**Acceptance Criteria:**
- "Retry" resets the timer and clears input.
- "Retry" loads a new passage at the same difficulty level.

**Tasks:**
- [ ] Create a global `resetTest()` function.
- [ ] Ensure the "Retry" button resets all UI highlights and re-focuses the input.

---

## Tech Stack Recommendation
- Frontend: HTML5, CSS3 (Flexbox/Grid), modern JavaScript (ES6+).
- Storage: Browser `localStorage` API.

---

## GitHub Projects Import
Use `project-import.csv` to import these user stories as draft items in GitHub Projects.

Steps:
1. Open your GitHub Project.
2. Use "Add item" and choose "Import from CSV".
3. Upload `project-import.csv`.

---

## Deployment
- Live site: https://adelcareers.github.io/TypeRacer/
- GitHub Pages is deployed via `.github/workflows/pages.yml`.
