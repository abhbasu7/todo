# Backlog: a Wunderlist-inspired task app

Reviewed: November 22, 2026. Status: proposed build plan, not implemented work.

## Product direction

Build a personal task app that brings back the usefulness and feel of Wunderlist: quick capture, organized lists, clear task details, dependable reminders, and easy sharing. Keep everyday actions close at hand and make the app pleasant to open.

Wunderlist is our main product reference. Todoist, TickTick, and Microsoft To Do provide secondary examples of capabilities we lack. The order below is our recommendation based on the current code and recent usage; it is not a claim that every listed feature existed in Wunderlist.

Historical context: Microsoft announced its acquisition in [June 2015](https://blogs.microsoft.com/blog/2015/06/02/welcome-6wunderkinder-microsoft-acquires-wunderlist/). Wunderlist's shutdown was scheduled for May 6, 2020; see this [contemporary report](https://www.windowscentral.com/wunderlist-shuts-down-may-6-heres-how-switch-microsoft-do). This plan recreates the workflow with our own identity and implementation.

## What we already have

Baseline: the current local `index.html`, `manifest.json`, and `sw.js`, including recent changes that have not yet been pushed. The README predates some of these changes.

- Tasks and one level of subtasks; completion and progress counts.
- Inline title editing; plain-text task notes/descriptions.
- Task due dates and three priority levels.
- Search across task titles, notes, and subtask titles, ignoring capitalization.
- All / Active / Done filters; Manual / Due date / Priority / Newest sorting.
- Task reordering in Manual mode; subtask reordering independent of task sort.
- Task duplication; deletion and clearing completed tasks.
- Hover highlights and focus indicators; champagne light and midnight navy dark themes, and the top panel follows the theme in both (REQ-1, REQ-2).
- JSON export and replacement import; automatic migration from v1 data.
- Browser-local storage and a responsive layout.
- Manifest, icons, and an offline app-shell service worker for supported hosted use.

These are implemented capabilities, not backlog items. Touch reordering, complete keyboard operation, and behavior on every mobile browser still need dedicated verification.

## What other apps show us

| Reference | Relevant capabilities we lack | Implication for our app |
|---|---|---|
| Historical Wunderlist | Folders, reminders, files, and task comments alongside notes; see this [historical walkthrough](https://www.iphonelife.com/content/manage-your-personal-professional-life-wunderlist-task-manager). | Bring organization and richer task details into the existing simple interface. |
| Todoist | Projects, sections, labels, saved filters, recurring dates, bulk actions, calendar/board views, and templates. [Feature documentation](https://www.todoist.com/help/todoist/features) | Start with lists and useful views; defer advanced layouts. |
| Todoist | Project sharing and task assignment. [Projects documentation](https://www.todoist.com/help/todoist/features/introduction-to-projects-TLTjNftLM) | Sharing belongs in the long-term core, after sync and permissions exist. |
| Todoist | Automatic backups on eligible paid plans, and keyboard shortcuts including Undo. [Backups](https://www.todoist.com/help/account-and-billing/security/download-or-restore-backups-in-todoist-ywaJeQbN), [shortcuts](https://www.todoist.com/help/todoist/features/use-keyboard-shortcuts-in-todoist-Wyovn2) | Make recovery and fast keyboard use deliberate features. |
| Microsoft To Do | Planned views, reminder date/time, and repeating due dates. [Scheduling documentation](https://support.microsoft.com/en-us/todo/add-due-dates-and-reminders-in-microsoft-to-do) | A due-date badge alone does not provide planning or reminders. |
| TickTick | Tags, filters, calendar views, reminders, recurring rules, shared lists, focus timers, and habits. [Features](https://ticktick.com/features) | Use the planning examples; leave timers and habits optional. |

Feature availability may vary by plan and platform. The comparison concerns capabilities, not pricing or a promise of exact parity.

## Ranked backlog

P0 = reliability foundation. P1 = core Wunderlist-style experience. P2 = richer daily use. P3 = optional expansion. Sizes are relative engineering scope, not delivery dates: S is small, M touches several flows, L needs a substantial feature, XL crosses architecture/services.

| ID | Priority | Build | Why it matters | Size / dependency |
|---|---|---|---|---|
| B01 | P0 | Safe saving, backup, validated import | The only working copy currently lives in the browser. | M; foundation |
| B02 | P0 | Local date handling | Today/overdue must agree with the user's calendar day. | S; before date-based views |
| B03 | P0 | Undo, Trash, and restore | Recover accidental deletes, clears, and reorders. | M; B01 |
| B04 | P1 | Inbox and named lists | Separate Work, Personal, Shopping, and other contexts. | L; B01 |
| B05 | P1 | Starred tasks and smart views | Reach important, due, and overdue work quickly. | M; B02, B04 |
| B06 | P1 | Folders and list organization | Group related lists without clutter. | M; B04 |
| B07 | P1 | Repeat tasks | Support bills, chores, and recurring follow-ups. | L; B02, B03 |
| B08 | P1 | Reminder date/time and snooze | Prompt action rather than only displaying deadlines. | L/XL; B02, hosted runtime decision |
| B09 | P1 | Keyboard and touch operation | Make capture, selection, and reorder dependable across devices. | M; apply throughout |
| B10 | P1 | Cross-device sync | Phone and computer should share the same tasks. | XL; B01, B04, hosted backend |
| B11 | P1 | Shared lists and assignment | Support a household, partner, or small team. | XL; B10 and authorization |
| B12 | P2 | Timestamped task comments | Preserve updates and decisions separately from the main note. | M locally; L with B11 |
| B13 | P2 | Richer search and tags | Find a person, project, or topic and see why it matched. | M; B04 for list scope |
| B14 | P2 | Bulk actions | Move, reschedule, complete, or tag multiple tasks. | M; B03, B04 |
| B15 | P2 | Attachments and useful links | Keep documents, receipts, and reference material with tasks. | L; storage/export design |
| B16 | P2 | Templates and fast capture | Reuse checklists and paste multiple tasks at once. | M; B04 |
| B17 | P2 | Completed history and list archive | Retain useful records without crowding active work. | M; B01, B04 |
| B18 | P2 | Visual polish and preferences | List colors/backgrounds, density, optional completion sound. | M; B04, accessible defaults |
| B19 | P3 | Calendar and external capture | Date overview, calendar export, browser/email capture. | L/XL; scheduling model, optional services |
| B20 | P3 | Focus timer, habits, analytics, boards | Potential extensions once the list app is dependable. | L; demand-driven |

Sync and sharing are essential to the final direction even though their technical dependencies put them later in the build sequence.

## Acceptance criteria for the next builds

### B01 — Protect existing data

- Catch storage failures and show an explicit unsaved/error state; never report success after a failed write.
- Add a versioned backup format and validate task/subtask IDs, text, booleans, dates, and arrays before import changes live data.
- Preview import counts; preserve a recoverable snapshot before replacement. Keep existing JSON backups readable.
- Add last-export information and a backup reminder. Browser snapshots help recovery but are not an independent backup.
- Flush pending note saves on relevant lifecycle events and before destructive replacement. Verify immediate edit/export/reload flows.

### B02 — Correct dates before adding scheduling

- Replace the current UTC-derived `todayStr()` with the user's local calendar date.
- Test near local midnight, DST boundaries, and users east and west of UTC.
- Keep an all-day due date separate from a reminder timestamp. Do not silently turn a date into a midnight alarm.

### B03 — Recovery

- Show Undo after task/subtask deletion, clearing completed items, and reordering.
- Restore content, completion state, parent/list membership, and prior order.
- Keep deleted items in a persistent Trash with explicit permanent deletion; define retention visibly.
- Ctrl/Cmd+Z in text fields continues to undo text; application undo must not intercept normal editing.

### B04 — Lists first

- Add a list sidebar alongside the current task list and detail view on desktop; use navigable screens on mobile.
- Create, rename, reorder, and archive lists; move tasks between them without losing subtasks or notes.
- Put existing tasks into an Inbox through a versioned migration that preserves IDs, ordering, and all existing data.
- Search can cover all lists or the current list, with the active scope visible.
- Provide a sensible default destination for quick capture and avoid accidental task deletion when removing a list.

### B05–B06 — Stars, views, and folders

- Add a Star independent of priority; offer Starred, Today, Next 7 Days, Overdue, All, and Completed views.
- Display list names and counts in aggregate views. Show search/filter state and a clear way to reset it.
- Today includes tasks due on the local date; overdue appears separately. Completed items are excluded from active date views.
- Allow one level of folders, list ordering within folders, and moving a list between folders.
- Views reference the same tasks; editing from a smart view must not create copies.

### B07 — Repeating tasks

- Start with daily, weekdays, weekly, monthly, and custom intervals.
- Define both schedule-based and completion-based repetition before implementation; make the chosen behavior clear.
- Completing an occurrence records its completion and creates exactly one next occurrence. Define subtask reset behavior.
- Test month-end dates, leap days, overdue occurrences, Undo, and repeated completion clicks.

### B08 — Reminders in two stages

- First: reminder date/time, snooze, overdue-reminder state, and in-app alerts while running.
- Next: supported background notifications using an HTTPS-hosted app and a delivery service, with permission and device testing.
- Distinguish reminders from due dates. Handle denied permission, offline use, duplicate alerts, edits, completion, and deletion.
- Do not promise reliable closed-app alerts from a local file or an ordinary JavaScript timer.

### B09 — Interaction completeness

- Add accessible labels, task selection by keyboard, shortcut help, and focus restoration after rendering.
- Offer Move up/down controls usable without dragging; test touch scrolling and handle dragging on actual mobile browsers.
- Keep native editing shortcuts; scope app shortcuts outside text fields.
- Verify focus/hover states, empty views, selected tasks, dark mode, and narrow layouts together.

### B10–B11 — Sync, then collaboration

- Keep local capture available offline; add accounts and a hosted data service without making an account mandatory for local use.
- Show pending/synced/error states; preserve task order and edits after reconnecting.
- Use explicit conflict handling and deletion records; do not silently replace a whole device's data with another copy.
- Validate edits, completions, reorders, and deletes made concurrently on two devices.
- Add shared-list invitations, revocation, membership, assignment, and server-enforced access checks.
- A removed member loses access; unrelated private lists never become visible through sharing.

## Additional feature boundaries

- **Comments:** notes hold the current description; comments hold timestamped updates. Include comment search and export. Add author identity when sharing exists.
- **Search/tags:** add matching note snippets and text highlighting, list/tag/priority/date filters, result counts, and explicit hidden-filter messages. Keep the recently fixed notes search covered by regression tests.
- **Attachments:** begin with URLs; use IndexedDB for local binary files or object storage for synced files. Define size limits, offline availability, and backup behavior before accepting uploads.
- **Templates/capture:** save a task with ordered subtasks as a reusable template; support multiline paste and optional explicit date parsing. Existing Duplicate remains useful.
- **History:** store completion timestamps and support restoring archived lists. Completed history and Trash serve different purposes.
- **Personalization:** preserve readable contrast and keyboard focus with every background. Make sounds and animation optional.
- **Calendar:** begin with a read-only agenda or export before attempting two-way calendar synchronization.
- **Legacy imports:** consider old Wunderlist exports only when an actual sample format is available; do not assume the retired service can supply data.

## Architecture and reliability observations

These are code-review findings or constraints, not claims that each failure has been reproduced:

1. `save()` writes directly to localStorage without error handling. `load()` catches errors and falls back to an empty state; corrupt data should instead offer recovery before a new save overwrites it.
2. Import currently checks only the outer task array and then normalizes fields. Wrongly typed nested content needs validation before use or replacement.
3. `todayStr()` currently uses `toISOString()`, so local Today/overdue labels can disagree with the local day near midnight.
4. Full rerenders can remove the focused control. Adding CSS focus rings does not finish keyboard accessibility or focus management.
5. Notes update state immediately but persistence is delayed by 300 ms. Leaving immediately after an edit needs a deliberate flush policy.
6. Multiple tabs can overwrite browser-local state. Define a storage-event/revision policy before calling same-browser multi-tab use safe.
7. Service-worker activation currently removes every cache except its own version. Scope cleanup to this app's cache names, and cache successful intended app resources only.
8. Update handling needs a visible refresh/version path that preserves unsaved work.

The current `file:///` workflow remains useful for local development, but browser storage for file URLs has undefined, browser-dependent behavior. Moving to HTTPS creates a different storage origin, so offer export/import migration rather than assuming tasks follow automatically. [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

Service workers require a supported secure context; use HTTPS deployment or localhost for hosted PWA development. Background push depends on a service worker and messages sent through a server/push service, so reminders require more than adding a timer to this HTML file. [MDN Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), [MDN Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)

Keep deployment simple. Lists, stars, folders, recurrence, recovery, and better search can begin locally. Introduce a storage adapter and versioned migrations before sync; select a backend when implementing sync/sharing, rather than coupling today's UI to an unchosen service.

## Suggested delivery sequence

1. **Protect the current app:** B01–B03, storage/import regressions, and focus/date fixes.
2. **Make it feel like the target product:** B04–B06 plus B09. The first visible feature to build should be Inbox and named lists.
3. **Make planning dependable:** B07 and B08's in-app stage; basic history and templates as useful additions.
4. **Make it work everywhere:** HTTPS migration, B10, supported background reminders, then B11.
5. **Make shared work richer:** comments, attachments, bulk actions, and targeted visual polish.
6. **Reassess extras:** calendar integrations and P3 items only after the core experience is useful daily.

The first milestone is complete when existing tasks migrate safely into Inbox, users can create and switch lists, star tasks, use date-based views, reorder with mouse/keyboard/touch alternatives, and recover mistakes. Test the desktop file workflow separately from the hosted mobile PWA workflow.

## Documentation and Git

`BACKLOG.md` is an explicitly requested documentation exception in `.gitignore` so the backlog can be versioned alongside the deployment files. Other local documentation and development artifacts remain excluded under the minimal Git policy.

Before the next release, update the README to describe notes search, subtask reordering, hover/focus behavior, and the supported hosted install flow. Keep real account names out of documentation examples; use `<username>`.
