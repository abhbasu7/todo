# REQ-2 — New theme palettes: black & gold dark, champagne light

Requested by Abhi, 2026-11-23. Both palettes shown to Abhi as mocks and
approved by him before code (dark as shown; light = L2 Champagne).

## Problem

After REQ-1 the dark theme's elevation runs backwards: a near-black header
(#020617) sits on lighter panels, with lighter buttons floating on it.
The light theme's layers are all within a shade of white, so panels do not
read as panels.

## Requirement

- Dark: black with orange and gold, in the iseebtc / Bitcoin direction.
  Warm black surfaces, Bitcoin orange spent only on actions and selection.
- Light: color in place of white — champagne (warm gold wash) in every layer.
- Both themes keep the REQ-1 ladder: background darkest, panel one step up,
  header = panel, buttons one step up again.
- Accent-driven elements (Add button, active filter, selected task,
  checkboxes, progress bar) take the theme accent in both themes — no
  hard-coded per-theme overrides left.

## Acceptance

- Dark values match DES-2 exactly; orange appears on Add, active filter,
  selected ring, checkbox, progress, and focus outlines — nowhere else large.
- Light values match DES-2 exactly; no pure-white surface remains.
- CI smoke checks pin both palettes (DES-2).
