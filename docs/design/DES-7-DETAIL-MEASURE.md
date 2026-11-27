# DES-7 — Detail measure values (EXPERIMENT)

Implements REQ-7 on experiment/layout-alignment.

## Change

- New rule: `#detailContent { max-width:46rem; margin-inline:auto; }`.
  #detailContent wraps everything the detail view renders (title,
  fields, notes, subtask list, action bar, and the empty state), so one
  rule caps them all. The back button stays outside the column; it only
  shows on mobile, where the cap never binds.
- .action-bar margin: `1rem -1rem -1rem` -> `1rem 0 -1rem`. The
  negative side margins existed to bleed the bar over the panel's 1rem
  padding to the pane edges (DES-3). Inside a centered column the bar
  must end where the content ends, so the bleed goes away; the -1rem
  bottom margin and bottom:-1rem stay (they cover the panel's bottom
  padding, unchanged).

## Why 46rem

736px sits in the range other apps use for a reading/editing column
(Notion ~720-900px, Todoist ~800px) and keeps subtask rows — which carry
drag handle, checkbox, title, and two icon buttons — uncrowded. The
fixed-sidebar alternative (Things / MS To Do, 360-480px) would need the
two-pane split itself reworked; the cap gets the compactness without
that.

## Follow-through

- sw.js cache bumps todo-v2-12 -> todo-v2-13.

## Tests (tests/smoke.check.mjs)

- Section 12 (new): #detailContent max-width 46rem, margin-inline auto,
  and the action bar's column-flush margin.
