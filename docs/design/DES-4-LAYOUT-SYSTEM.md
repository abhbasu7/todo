# DES-4 — Layout system (spec for REQ-4)

## Unit policy (Abhi's question, decided 2026-11-24)

- rem: font sizes, padding, margins, gaps, radii, control heights —
  scales with the user's root font size.
- px: 1px borders, progress bar height (8px), checkbox (18px),
  priority dots (9px), drag-over bars (3px), focus outlines (2px).
- %/flex/dvh: layout structure, unchanged. Breakpoint in em (43.75em).

## Scales

- Spacing: .25 / .5 / .75 / 1 / 1.5 rem (4/8/12/16/24 at default).
  Column blocks margin .75; cards stack at .5; panel padding 1.
- Radius: .5rem controls, .75rem cards, 999px pills. Nothing else.
- Type: .6875 meta/hints, .75 labels, .875 body/buttons, 1 inputs,
  1.125 both titles. No px font sizes (test-pinned).
- Heights (explicit, so rows align): inputs 2.75rem; toolbar controls
  (filters, sort, fields) 2.5rem; header buttons 2.25rem; icon buttons
  get a 2rem hit area.

## Unifications

- .task and .sub: identical padding (.75rem), radius (.75rem), gap,
  margin — one row component.
- Add-input border: var(--border) (was #9ca3af). Icons and drag handle:
  var(--muted). Priority-low dot: var(--muted).
- New chip variables --chip-today-bg/text and --chip-over-bg/text in
  both themes (dark: deep amber / deep red); .due.today, .due.overdue
  and .install-tip use them.
- Subtask drag-over now var(--accent), matching task rows.
- Delete icon hovers use var(--danger-text) (from REQ-3).
- All form controls at 1rem font — iOS no longer auto-zooms on focus.
- REQ-3's action bar values convert to rem unchanged in effect.
- sw.js cache bumps todo-v2-8 -> todo-v2-9.

## Tests (tests/smoke.check.mjs section 9)

No px font sizes; no #9ca3af; task/sub share padding and radius; chip
variables defined in both themes; subtask drag indicator uses --accent.

## Amendment (2026-11-27)

Row component superseded on this branch by DES-6: rows are flat
(hairline divider, no radius, padding .5rem .75rem) and the checkbox is
a styled 20px circle. See DES-6-COMPACT-ROWS.md.
