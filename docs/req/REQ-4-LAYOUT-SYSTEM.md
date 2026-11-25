# REQ-4 — Layout system: spacing, radii, alignment (EXPERIMENT)

Status: experiment branch only (experiment/layout-alignment), stacked on
experiment/sticky-action-bar (REQ-3). Not on main.
Approved by Abhi 2026-11-24 after a full CSS audit of the live app.

## Problem (measured in the audit)

- 17 different padding values; gaps of 2/5/7/9/10/11/14px beside 4/8/12/16.
- Radii compete: task row 12px, subtask row 10px, inputs 8 and 10px.
- Hard-coded colors that ignore the theme: #9ca3af borders/icons, due
  chips and install tip fixed to light-mode amber/red.
- Three input heights (~42/38/34px); icon-button tap targets ~22px.
- Search/fields/notes at 14px font trigger iOS auto-zoom on focus.
- Drag-over indicator: accent on task rows, text color on subtask rows.

## Requirement

One system (DES-4): spacing scale 4/8/12/16/24, radius scale 8/12/999,
fixed control heights, task and subtask rows as one component, every
color from a theme variable, and the hybrid unit policy — rem for type
and spacing, px for hairlines, %/flex/dvh for layout.
