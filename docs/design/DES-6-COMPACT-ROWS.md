# DES-6 — Flat rows + round checkbox values (EXPERIMENT)

Implements REQ-6 on experiment/layout-alignment. Supersedes the row
component values in DES-4 (padding/radius); the rest of DES-4 stands.

## Rows (.task and .sub, one component as before)

- padding: .5rem .75rem (was .75rem all round)
- border: 0, with border-bottom: 1px solid var(--border)
- border-radius: 0; margin-bottom: 0; background: transparent
- .task.selected: background var(--hover) +
  box-shadow: inset 3px 0 0 var(--accent) (replaces the accent ring,
  which needed a border)
- :focus-within outline offset becomes -2px so the focus ring sits
  inside the flat row instead of overlapping its neighbors
- Drag-over indicator unchanged (3px accent top border reads fine on
  flat rows)

## Checkbox

- The native input stays (type="checkbox"); styling only:
  appearance:none, 20px circle (px exception, joins the DES-4 hairline
  list), 1.5px border in var(--muted), transparent fill.
- :checked fills var(--accent), border var(--accent), and ::after draws
  the check in var(--accent-text) via an 11px clip-path polygon.
- Note: it is deliberately NOT a radio — round is the style, checkbox
  is the behavior (independent toggles, done state).

## Compact stack

- .add-row, .search, .row2 margin-bottom: .75rem -> .5rem.
- Panel padding stays 1rem (the sticky action bar's negative margins
  are built on it, DES-3).

## Follow-through

- sw.js cache bumps todo-v2-10 -> todo-v2-11.

## Tests (tests/smoke.check.mjs)

- Section 9 updated: rows share compact padding (.5rem .75rem); rows
  are flat (border-radius 0).
- Section 11 (new): hairline divider on .task and .sub, selected-row
  inset accent bar, round custom checkbox, checked check mark.

## Amendment (2026-11-27, Abhi's pick)

The subtask drag-over line gets its own color instead of the accent:
new theme variable --drag-sub — light #0f766e, dark #2dd4bf (teal in
both themes). .sub.drag-over uses var(--drag-sub); .task.drag-over
keeps var(--accent). Smoke section 9 pin updated; sw cache todo-v2-12.
