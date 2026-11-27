# REQ-3 — Sticky action bar for Duplicate / Delete (EXPERIMENT)

Status: experiment branch only (experiment/sticky-action-bar). Not on main.
Design option A, picked by Abhi 2026-11-24 from three mocked options.

## Problem

In the detail (subtask) pane, Duplicate and Delete are rendered after the
subtask list in normal flow, so they move up and down as subtasks are added
or removed; on mobile they can fall below the fold. Delete's border is a
hard-coded pale pink (#fecaca) that ignores the theme.

## Requirement

- Duplicate and Delete live in an action bar pinned to the bottom of the
  detail pane; the pane content scrolls above it. Position never changes
  with subtask count, on desktop or mobile.
- Delete separated from Duplicate (bar ends), soft red fill from the theme,
  no hard-coded colors.
- Same confirm-before-delete behavior as today.
