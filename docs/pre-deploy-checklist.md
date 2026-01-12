# Pre-Deployment Checklist

Use this checklist before the first deployment of TypeRacer.

## Manual QA
- [ ] Desktop (1280px): no horizontal scroll, controls aligned, results visible.
- [ ] Tablet (768px): cards stack cleanly, no overflow or clipped text.
- [ ] Mobile (360px): buttons/inputs tappable, no horizontal scroll.
- [ ] Mobile keyboard: typing area and target text remain visible.

## Functional Flow
- [ ] Start -> type -> finish completes and results show immediately.
- [ ] WPM, accuracy, and time display reasonable values.
- [ ] Retry clears input, refreshes passage, and refocuses input.
- [ ] Difficulty changes update the passage preview.
- [ ] Instructions modal opens and closes properly.
- [ ] Best WPM persists across refresh per difficulty.

## Cross-Browser
- [ ] Chrome
- [ ] Safari
- [ ] Firefox

## Accessibility
- [ ] Tab order follows UI flow and focus ring visible.
- [ ] Modal is reachable and closable via keyboard.
- [ ] Screen reader labels make sense for input and buttons.

## Performance
- [ ] Lighthouse Performance score is acceptable for a static page.
- [ ] No long tasks or layout shifts during typing.
