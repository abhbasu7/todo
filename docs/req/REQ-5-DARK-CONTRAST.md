# REQ-5 — Dark contrast lift (Navy++) + edit icon flip (EXPERIMENT)

Status: experiment branch only (experiment/layout-alignment), stacked on
REQ-4. Not on main.
Requested by Abhi 2026-11-26; dark options shown as mocks, Abhi picked
B · Navy++.

## Problem

- Dark mode (Midnight Navy, REQ-2): the UI layers sit within a few shades
  of each other, so elements barely separate. Measured: card border vs
  card 1.18:1, detail pane vs list pane 1.04:1, panel vs background
  1.08:1 (WCAG contrast ratios).
- The edit pencil glyph (✎) points the wrong way for Abhi; he asked for
  it laterally inverted.

## Requirement

- Keep the Midnight Navy hue family; spread the layers apart: darker
  background, lighter panels, clearly visible borders, hover and header
  buttons, brighter muted text, accent nudged lighter so it still pops
  against the lighter panels. Exact values in DES-5.
- Mirror the edit pencil horizontally everywhere it appears: task rows,
  subtask rows, and the hint text.
- Light theme (Champagne) unchanged.

## Acceptance

- Dark values match DES-5 exactly; smoke checks pin --bg, --panel,
  --border, --hover, --head, --accent for dark.
- Edit buttons render the pencil flipped; the flip rule and the flipped
  hint glyph are pinned by smoke checks.
- theme-color meta follows the new dark panel color.
