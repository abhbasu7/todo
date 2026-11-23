# DES-1 — Light top panel (spec for REQ-1)

## Change, all in index.html

New theme variables, set in `:root` (light) and `body.dark`:

| Variable | Light | Dark |
|---|---|---|
| --head | #fff (was #111827) | #020617 (unchanged) |
| --head-text | #1a1a1a | #fff |
| --head-btn | #f9fafb | #1f2937 (unchanged) |
| --head-btn-text | #1a1a1a | #e5e7eb (unchanged) |
| --head-btn-border | #e5e7eb | #374151 (unchanged) |
| --head-border | #e5e7eb | #020617 (invisible, = bg) |

Rules:

- `header` uses `background:var(--head)`, `color:var(--head-text)`, and gains
  `border-bottom:1px solid var(--head-border)`.
- `header button` uses var(--head-btn), var(--head-btn-text),
  var(--head-btn-border). No literal colors remain in either rule.
- `render()` sets the theme-color meta to #ffffff (light) or #020617 (dark);
  the static meta default becomes #ffffff.

## Release

- sw.js cache bumps todo-v2-4 -> todo-v2-5, or phones keep the old shell.

## Tests (tests/smoke.check.mjs, section 6)

- Light --head is #fff; dark --head is #020617.
- The header rule uses var(--head) and var(--head-text).
- The header button rule uses var(--head-btn) and has no literal hex colors.
