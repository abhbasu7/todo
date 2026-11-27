# DES-8 — Draggable divider implementation (EXPERIMENT)

Implements REQ-8. Branches off main (post REQ-7 merge).

## Mechanism

- One element: `<div class="splitter" id="splitter" role="separator"
  aria-orientation="vertical" tabindex="0">` between the two sections.
  5px wide, pulled 5px left over the list pane's edge so it sits on the
  existing border line; cursor col-resize; tints var(--accent) at 55%
  opacity on hover / focus / while dragging.
- Drag uses Pointer Events with setPointerCapture on the splitter;
  body.resizing locks the cursor and text selection during the drag.
- Width is applied as an inline style on .left (px + max-width:none),
  clamped in applyListW(): [288, min(640, 60% of layout width)].
  Persisted as state.listW (rides the existing save()/load(); carries
  through export/import harmlessly).
- Double-click clears state.listW and the inline style (back to the
  stylesheet default 44% / max 500px). Arrow keys adjust ±16px and
  save.
- Mobile guard: inside the 43.75em media query the splitter is
  display:none and .left gets width:100% !important /
  max-width:none !important, so an inline desktop width can never
  break the single-column layout.

## Follow-through

- sw.js cache bumps todo-v2-13 -> todo-v2-14.

## Tests (tests/smoke.check.mjs)

- Section 13 (new): splitter element present, col-resize handle,
  hidden on mobile, bounds constants present, state.listW persistence.
