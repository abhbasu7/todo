# REQ-8 — Draggable divider between list and detail (EXPERIMENT)

Status: experiment — shown to Abhi as code before check-in, per his
confirm-before-commit rule (2026-11-27).
Requested by Abhi 2026-11-27.

## Requirement

- On desktop / laptop / widescreen, the divider between the task list
  (left) and the detail pane (right) can be dragged left and right to
  resize the list — within limits.
- Bounds: list width 288px min, 640px max, and never more than 60% of
  the layout width.
- The chosen width is remembered across reloads (per device).
- Double-click the divider resets to the default (44%, max 500px).
- Keyboard: arrow keys nudge a focused divider by 16px.
- Mobile is untouched: no divider in the single-column layout, and a
  saved desktop width must not leak into it.

## Acceptance

- Splitter present, draggable, bounded, persisted; pinned by smoke
  checks (section 13).
- No change to panes' content, themes, or mobile layout.
