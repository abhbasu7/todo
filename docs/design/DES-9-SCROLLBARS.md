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

## Amendment (2026-11-27, Abhi's feedback: rest state too thin)

The classic thin-when-idle pattern, done without the layout shift:
the gutter is fixed at 12px (scrollbar-gutter: stable) and only the
thumb's visual thickness changes. Rest: 3px transparent border ->
~6px thumb. Pane hover or thumb hover: 1px border -> ~10px thumb.
:active (dragging) holds the wide state and the hover color.
Firefox note: scrollbar-width has no hover state, so Firefox keeps
the thin themed bar — a platform limit, not a choice.
Cache: todo-v2-15 -> todo-v2-16.

## Amendment 2 (2026-11-27, Abhi: "highlighted but not wider")

The hover-widen did not take effect in Abhi's browser — the hover
color repainted but the border/geometry change did not (a known
Blink repaint limitation on scrollbar pseudo-elements). Dropped the
thin-at-rest design entirely: gutter 14px, thumb border 1px at rest
-> ~12px visible thumb at all times; hover/active now change only
the color. Firefox: scrollbar-width returns to auto (default width).
Cache: todo-v2-16 -> todo-v2-17.
