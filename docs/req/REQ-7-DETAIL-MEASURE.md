# REQ-7 — Detail pane measure: capped, centered column (EXPERIMENT)

Status: experiment branch only (experiment/layout-alignment), stacked on
REQ-6. Not on main.
Requested by Abhi 2026-11-27.

## Problem

The detail (right) pane is flex:1 with only the panel's 1rem padding, so
on a wide screen its content — title, fields, notes, subtask rows —
stretches the full width of the window, thousands of px. Lines are hard
to scan and the form fields sprawl.

What other apps do that we were missing:

- A maximum content width ("measure"). Todoist caps its task view at
  ~800px, Notion centers a ~720-900px column; Things and Microsoft To
  Do go further and make the detail a fixed-width sidebar (~360-480px).
- Auto side margins, so the column centers instead of hugging the left
  edge of an arbitrarily wide pane.
- Form elements sized to the column, never full-bleed on desktop.

The list pane already has this (44%, max 500px). The detail pane had no
equivalent at all.

## Requirement

- Detail content gets a capped, centered column: max-width 46rem
  (736px, in the Todoist/Notion range) with auto side margins.
- The sticky action bar stays flush with the column (it previously
  bled out to the pane edges; now it aligns with the content above it).
- Mobile is unchanged: below the cap the column is simply full width.
- If Abhi later wants the narrower sidebar feel (~30rem), it is a
  one-value change to the same rule.

## Acceptance

- #detailContent capped and centered; pinned by smoke checks.
- Action bar width matches the column at every viewport; pinned.
- No other layout or theme changes.
