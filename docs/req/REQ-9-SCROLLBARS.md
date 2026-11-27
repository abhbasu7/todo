# REQ-9 — Themed scrollbars for the panes (EXPERIMENT)

Status: experiment branch (experiment/drag-divider, PR #3), stacked on
REQ-8. Requested by Abhi 2026-11-27, with the merge to main in the
same instruction.

## Problem

The task list pane scrolls vertically once tasks overflow it, and the
browser's default scrollbar looks off in dark mode — a light grey bar
against Midnight Navy. Light mode looks fine with the default.

## Requirement

- Style the pane scrollbars from the theme in both modes: a thin bar,
  transparent track, thumb in a theme color that sits quietly on the
  panel, brightening on hover.
- Dark mode is the point of the change; light mode stays close to the
  default feel (soft champagne tones instead of grey).
- Applies to both panes (they share the .panel class and both scroll).
- Cross-browser: WebKit pseudo-elements for Chrome/Safari/Edge,
  scrollbar-width/scrollbar-color for Firefox.

## Acceptance

- --scroll-thumb / --scroll-thumb-hover defined in both themes and
  used by both engines' rules; pinned by smoke checks (section 14).
- Nothing else changes.
