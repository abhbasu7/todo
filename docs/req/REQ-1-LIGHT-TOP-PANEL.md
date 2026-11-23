# REQ-1 — Light theme: light top panel

Requested by Abhi, 2026-11-23. Style A (white panel) approved by Abhi before code.

## Problem

In light theme the top panel (header) stays dark navy, and its buttons stay
dark. The rest of the app is light, so the header reads as a dark-mode leftover.

## Requirement

- Light theme: the header is light, like the panels below it.
- Dark theme: the header does not change at all.
- No hard-coded header colors: header colors come from theme variables, so a
  future theme change cannot leave the header behind again.
- The phone status-bar color (theme-color) follows the selected theme.

## Acceptance

- Light: header background is white, title and button text are dark, buttons
  are light with the standard border, thin border under the header.
- Dark: header background, text, and buttons are pixel-identical to before.
- CI smoke checks cover both themes (see DES-1).
