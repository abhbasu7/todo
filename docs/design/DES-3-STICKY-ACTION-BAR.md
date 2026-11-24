# DES-3 — Sticky action bar (spec for REQ-3)

- New .action-bar rule: position:sticky; bottom:-16px (offsets the panel's
  16px padding so the bar sits flush); negative side margins stretch it
  full-width; background var(--panel2); border-top var(--border);
  display:flex; justify-content:space-between; bottom padding adds
  env(safe-area-inset-bottom) for phone home indicators.
- Template: the two buttons move into <div class="action-bar">, Delete
  (class danger) left, Duplicate (class ghost) right. Labels shorten to
  "Delete task" / "Duplicate". IDs unchanged (delTaskBtn / dupBtn), so the
  existing handlers and confirm dialog are untouched.
- .danger restyled: background var(--danger-hover), border transparent,
  color var(--danger-text) — a NEW variable: light #b91c1c, dark #f87171.
  The hard-coded #fecaca border is deleted.
- .ghost restyled: background var(--panel), same padding/weight as .danger.
- sw.js cache bumps todo-v2-7 -> todo-v2-8.
- Tests: smoke section 8 pins the bar's presence, stickiness, Delete inside
  the bar, the danger-tint rule, and the absence of #fecaca.
