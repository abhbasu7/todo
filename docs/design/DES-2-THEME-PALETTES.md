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

## Dark — Midnight Navy (replaced black & gold, 2026-11-23, Abhi's pick)

--bg #050b1f · --panel #0a1430 · --panel2 #071026 · --text #e6ebf7 ·
--muted #93a1c4 · --border #16224a · --head #0a1430 · --head-text #e6ebf7 ·
--head-btn #12204d · --head-btn-text #e6ebf7 · --head-btn-border #1e3468 ·
--head-border #16224a · --hover #101d42 · --focus #60a5fa ·
--accent #3b82f6 · --accent-text #ffffff · --danger-hover #450a0a (kept)

## Follow-through

- theme-color follows the theme in render(): #fffdf5 light, #0a1430 dark;
  static meta default #fffdf5.
- manifest.json: background_color #fbf3d9, theme_color #fffdf5.
- sw.js cache bumps todo-v2-5 -> todo-v2-6.

## Tests (tests/smoke.check.mjs)

- Section 6 values updated: light --head #fffdf5, dark --head #0a1430.
- Section 7 pins the palettes: dark --bg #050b1f, dark --accent #3b82f6,
  light --bg #fbf3d9, light --accent #b45309, and the Add button plus
  selected-task rules use var(--accent).

## Amendment (2026-11-26)

The Midnight Navy dark values above are superseded on the experiment
branch by DES-5 (Navy++): --bg #03061a, --panel #121f45,
--panel2 #0a1430, --border #354b8f, --hover #1e3268, --accent #4f8ff7,
--head-btn #243a70, --muted #b0bedd, --text #ecf0fb; theme-color dark
#121f45; sw cache todo-v2-10. Full values in DES-5-DARK-CONTRAST.md.
