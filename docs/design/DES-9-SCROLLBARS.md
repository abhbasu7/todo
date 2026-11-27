# DES-9 — Scrollbar values (EXPERIMENT)

Implements REQ-9 on experiment/drag-divider.

## Values

- Light: --scroll-thumb #e0d3a8, --scroll-thumb-hover #c9b478
  (champagne family — near-default lightness, warmer hue).
- Dark: --scroll-thumb #26386e, --scroll-thumb-hover #3d5ca3
  (the Navy++ border family — visible on #121f45 panels without the
  default light-grey clash).

## Rules (.panel)

- scrollbar-width: thin; scrollbar-color: var(--scroll-thumb)
  transparent (Firefox).
- ::-webkit-scrollbar 10px wide; track transparent; thumb uses
  var(--scroll-thumb), radius 999px, with a 3px transparent border and
  background-clip: padding-box so the thumb floats inset instead of
  filling the gutter; :hover swaps to var(--scroll-thumb-hover).

## Follow-through

- sw.js cache bumps todo-v2-14 -> todo-v2-15.

## Tests (tests/smoke.check.mjs)

- Section 14 (new): thumb var in both themes, WebKit thumb rule,
  Firefox scrollbar-color rule.
