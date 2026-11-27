# REQ-6 — Wunderlist-flavor compact rows + round checkbox (EXPERIMENT)

Status: experiment branch only (experiment/layout-alignment), stacked on
REQ-5. Not on main.
Requested by Abhi 2026-11-27 with a reference screenshot (flat list row,
hairline divider, circular outline control next to the title).

## Problem

- Task and subtask rows render as bordered cards (full border, radius,
  gaps between rows). They read as textboxes, not list items, and take
  more vertical room than the Wunderlist-style list Abhi wants.
- The checkbox is the browser's default square box.
- Control-stack spacing (add row, search, filters) is looser than the
  compact list feel he asked for.

## Requirement

- Rows become flat list items: no card border or radius, no gap between
  rows; a 1px hairline divider (theme border color) under each row.
  Slightly different from the reference, in our own flavor: the selected
  task gets a tinted background plus a 3px accent bar on its left edge
  (a ring is impossible without a border).
- The checkbox stays a checkbox (same input, same behavior) but is
  styled round like the reference: circular outline in muted, filled
  with the theme accent and a check mark when done.
- More compact: row padding tightens to .5rem vertical / .75rem
  horizontal; add-row, search and filter stack margins drop from
  .75rem to .5rem. Screen (panel) padding stays 1rem; icon-button hit
  areas stay 2rem.

## Acceptance

- No border/radius/gap on .task and .sub rows; hairline divider pinned
  by smoke checks.
- Checkbox renders round in both themes, accent-filled with a check
  when checked; pinned by smoke checks.
- Everything else (themes, sticky action bar, layout scale) unchanged.
