// Smoke checks for the todo app — run: node tests/smoke.check.mjs
// Zero dependencies. Exits non-zero if any check fails. CI runs this on
// every PR; a red run blocks merge. Add a check here for every new
// acceptance criterion that CAN be checked statically or by parsing.
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';

let fails = 0;
const ok = (cond, label) => {
  console.log((cond ? 'PASS' : 'FAIL') + '  ' + label);
  if (!cond) fails++;
};

// 1. Required files exist
for (const f of ['index.html', 'manifest.json', 'sw.js']) ok(existsSync(f), `${f} exists`);

// 2. Inline JS in index.html parses
const html = readFileSync('index.html', 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
ok(scripts.length >= 1, 'index.html has an inline script');
for (const [i, s] of scripts.entries()) {
  try { new vm.Script(s); ok(true, `inline script ${i + 1} parses`); }
  catch (e) { ok(false, `inline script ${i + 1} parses (${e.message})`); }
}

// 3. XSS guardrails: esc() helper exists; no eval / document.write;
//    no external scripts (nothing loaded from outside this repo)
ok(/function esc\(/.test(html), 'esc() helper is defined');
ok(!/\beval\(/.test(html), 'no eval() anywhere');
ok(!/document\.write\(/.test(html), 'no document.write()');
ok(!/<script[^>]+src=["']https?:/i.test(html), 'no external <script src>');

// 4. manifest.json is valid and installable-shaped
try {
  const m = JSON.parse(readFileSync('manifest.json', 'utf8'));
  ok(!!m.name, 'manifest has a name');
  ok(Array.isArray(m.icons) && m.icons.length >= 1, 'manifest has icons');
  ok(!!m.start_url, 'manifest has start_url');
  ok(m.display === 'standalone', 'manifest display is standalone');
} catch (e) { ok(false, `manifest.json parses (${e.message})`); }

// 5. Service worker parses and declares a cache version
const sw = readFileSync('sw.js', 'utf8');
try { new vm.Script(sw); ok(true, 'sw.js parses'); } catch (e) { ok(false, `sw.js parses (${e.message})`); }
ok(/CACHE/.test(sw) && /v\d+/.test(sw), 'sw.js declares a versioned cache name (bump it every release)');


// 6. Top panel follows the theme (REQ-1 / DES-1): light header is light,
//    dark header unchanged, and no literal colors in the header rules
const rootBlock = (html.match(/:root\s*{([^}]*)}/) || [])[1] || '';
const darkBlock = (html.match(/body\.dark\s*{([^}]*)}/) || [])[1] || '';
const headVar = (block) => ((block.match(/--head:\s*(#[0-9a-fA-F]+)/) || [])[1] || '').toLowerCase();
ok(headVar(rootBlock) === '#fffdf5', 'light theme --head is #fffdf5 (champagne panel)');
ok(headVar(darkBlock) === '#0a1430', 'dark theme --head is #0a1430 (midnight navy panel)');
const headerRule = (html.match(/header\s*{([^}]*)}/) || [])[1] || '';
ok(/background:\s*var\(--head\)/.test(headerRule) && /color:\s*var\(--head-text\)/.test(headerRule), 'header uses var(--head) and var(--head-text)');
const headerBtnRule = (html.match(/header button\s*{([^}]*)}/) || [])[1] || '';
ok(/var\(--head-btn\)/.test(headerBtnRule) && !/#[0-9a-fA-F]{3,6}/.test(headerBtnRule), 'header buttons use theme variables, no literal colors');


// 7. Theme palettes (REQ-2 / DES-2): champagne light, black & gold dark
const varOf = (block, name) => ((block.match(new RegExp(name + ':\\s*(#[0-9a-fA-F]+)')) || [])[1] || '').toLowerCase();
ok(varOf(rootBlock, '--bg') === '#fbf3d9', 'light --bg is champagne #fbf3d9');
ok(varOf(rootBlock, '--accent') === '#b45309', 'light --accent is amber #b45309');
ok(varOf(darkBlock, '--bg') === '#050b1f', 'dark --bg is midnight navy #050b1f');
ok(varOf(darkBlock, '--accent') === '#3b82f6', 'dark --accent is azure #3b82f6');
ok(/\.add-row button\s*{[^}]*background:\s*var\(--accent\)/.test(html), 'Add button uses var(--accent)');
ok(/\.task\.selected\s*{[^}]*var\(--accent\)/.test(html), 'selected task ring uses var(--accent)');


// 8. Sticky action bar (REQ-3 / DES-3, experiment)
ok(html.includes('class="action-bar"'), 'detail template renders an action bar');
ok(html.indexOf('id="delTaskBtn"') > html.indexOf('class="action-bar"'), 'Delete button sits inside the action bar');
ok(/\.action-bar\s*{[^}]*position:\s*sticky/.test(html), 'action bar is sticky');
ok(/\.danger\s*{[^}]*background:\s*var\(--danger-hover\)/.test(html), 'Delete uses the theme danger tint');
ok(!html.includes('#fecaca'), 'no hard-coded pink border remains');

console.log(fails ? `\n${fails} check(s) FAILED` : '\nAll smoke checks passed');
process.exit(fails ? 1 : 0);
