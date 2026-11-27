# DES-5 — Navy++ values + pencil flip (EXPERIMENT)

Implements REQ-5 on experiment/layout-alignment. Supersedes the dark
values in DES-2 (Midnight Navy); light Champagne values are unchanged.

## Dark — Navy++ (Abhi's pick, 2026-11-26)

--bg #03061a · --panel #121f45 · --panel2 #0a1430 · --text #ecf0fb ·
--muted #b0bedd · --border #354b8f · --head #121f45 · --head-text #ecf0fb ·
--head-btn #243a70 · --head-btn-text #ecf0fb · --head-btn-border #3d5ca3 ·
--head-border #354b8f · --hover #1e3268 · --focus #60a5fa (kept) ·
--accent #4f8ff7 · --accent-text #ffffff · --danger-hover #450a0a (kept) ·
--danger-text #f87171 (kept) · --chip-today-bg #572303 ·
--chip-today-text #fcd34d · --chip-over-bg #450a0a (kept) ·
--chip-over-text #fca5a5 (kept)

Contrast after the lift: border vs panel 1.95:1 (was 1.18:1), panel vs
background 1.25:1 (was 1.08:1), hover vs panel 1.31:1 (was 1.10:1).

## Follow-through

- theme-color in render(): dark now #121f45 (the new panel); light
  #fffdf5 unchanged.
- sw.js cache bumps todo-v2-9 -> todo-v2-10.

## Edit icon flip

- `.icon-btn.edit { transform: scaleX(-1) }` mirrors the ✎ button glyph
  in task and subtask rows (the button box itself is symmetric, so only
  the glyph reads differently).
- The hint text wraps its ✎ in `<span class="flip-x">✎</span>` with
  `.flip-x { display:inline-block; transform:scaleX(-1) }`.

## Tests (tests/smoke.check.mjs)

- Section 6: dark --head now #121f45.
- Section 7: dark --bg #03061a, dark --accent #4f8ff7.
- Section 10 (new): pins dark --border #354b8f, --panel #121f45,
  --hover #1e3268, the .icon-btn.edit scaleX(-1) rule, and the flipped
  hint glyph.
