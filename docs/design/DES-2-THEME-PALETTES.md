# DES-2 — Theme palettes (spec for REQ-2)

## New variables

--accent and --accent-text join the existing set. The Add button, the active
filter pill, the selected task ring, the drag-over line, checkbox
accent-color, and the progress bar all use var(--accent); the per-theme
hard-coded overrides for the Add button and selected task are deleted.
The due badge uses var(--hover) / var(--muted).

## Light — Champagne

--bg #fbf3d9 · --panel #fffdf5 · --panel2 #faf0d0 · --text #2a2110 ·
--muted #7d6f4a · --border #eadfbc · --head #fffdf5 · --head-text #2a2110 ·
--head-btn #faf0d0 · --head-btn-text #2a2110 · --head-btn-border #eadfbc ·
--head-border #eadfbc · --hover #faf0d0 · --focus #b45309 ·
--accent #b45309 · --accent-text #ffffff · --danger-hover #fee2e2 (kept)

## Dark — Bitcoin black & gold

--bg #0a0908 · --panel #14120e · --panel2 #100e0a · --text #f5efe6 ·
--muted #a89f91 · --border #262019 · --head #14120e · --head-text #f5efe6 ·
--head-btn #262019 · --head-btn-text #f5efe6 · --head-btn-border #3a2f1d ·
--head-border #2a2118 · --hover #1f1a12 · --focus #f7931a ·
--accent #f7931a · --accent-text #000000 · --danger-hover #450a0a (kept)

## Follow-through

- theme-color follows the theme in render(): #fffdf5 light, #14120e dark;
  static meta default #fffdf5.
- manifest.json: background_color #fbf3d9, theme_color #fffdf5.
- sw.js cache bumps todo-v2-5 -> todo-v2-6.

## Tests (tests/smoke.check.mjs)

- Section 6 values updated: light --head #fffdf5, dark --head #14120e.
- Section 7 pins the palettes: dark --bg #0a0908, dark --accent #f7931a,
  light --bg #fbf3d9, light --accent #b45309, and the Add button plus
  selected-task rules use var(--accent).
