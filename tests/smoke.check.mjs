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
ok(headVar(darkBlock) === '#121f45', 'dark theme --head is #121f45 (navy++ panel)');
const headerRule = (html.match(/header\s*{([^}]*)}/) || [])[1] || '';
ok(/background:\s*var\(--head\)/.test(headerRule) && /color:\s*var\(--head-text\)/.test(headerRule), 'header uses var(--head) and var(--head-text)');
const headerBtnRule = (html.match(/header button\s*{([^}]*)}/) || [])[1] || '';
ok(/var\(--head-btn\)/.test(headerBtnRule) && !/#[0-9a-fA-F]{3,6}/.test(headerBtnRule), 'header buttons use theme variables, no literal colors');


// 7. Theme palettes (REQ-2 / DES-2, dark superseded by REQ-5 / DES-5): champagne light, navy++ dark
const varOf = (block, name) => ((block.match(new RegExp(name + ':\\s*(#[0-9a-fA-F]+)')) || [])[1] || '').toLowerCase();
ok(varOf(rootBlock, '--bg') === '#fbf3d9', 'light --bg is champagne #fbf3d9');
ok(varOf(rootBlock, '--accent') === '#b45309', 'light --accent is amber #b45309');
ok(varOf(darkBlock, '--bg') === '#03061a', 'dark --bg is navy++ #03061a');
ok(varOf(darkBlock, '--accent') === '#4f8ff7', 'dark --accent is bright azure #4f8ff7');
ok(/\.add-row button\s*{[^}]*background:\s*var\(--accent\)/.test(html), 'Add button uses var(--accent)');
ok(/\.task\.selected\s*{[^}]*var\(--accent\)/.test(html), 'selected task ring uses var(--accent)');


// 8. Sticky action bar (REQ-3 / DES-3, experiment)
ok(html.includes('class="action-bar"'), 'detail template renders an action bar');
ok(html.indexOf('id="delTaskBtn"') > html.indexOf('class="action-bar"'), 'Delete button sits inside the action bar');
ok(/\.action-bar\s*{[^}]*position:\s*sticky/.test(html), 'action bar is sticky');
ok(/\.danger\s*{[^}]*background:\s*var\(--danger-hover\)/.test(html), 'Delete uses the theme danger tint');
ok(!html.includes('#fecaca'), 'no hard-coded pink border remains');


// 9. Layout system (REQ-4 / DES-4, experiment)
const cssText = (html.match(/<style>([\s\S]*?)<\/style>/) || [])[1] || '';
ok(!/font-size:\s*[\d.]+px/.test(cssText), 'no px font sizes (rem type scale)');
ok(!cssText.includes('#9ca3af'), 'no hard-coded grey #9ca3af remains');
const ruleOf = sel => (cssText.match(new RegExp(sel.replace(/[.*]/g, m => '\\' + m) + '\\s*{([^}]*)')) || [])[1] || '';
ok(/padding:\s*\.5rem \.75rem/.test(ruleOf('.task')) && /padding:\s*\.5rem \.75rem/.test(ruleOf('.sub')), 'task and subtask rows share compact padding');
ok(/border-radius:\s*0/.test(ruleOf('.task')) && /border-radius:\s*0/.test(ruleOf('.sub')), 'task and subtask rows are flat (no card radius)');
ok((rootBlock.match(/--chip-today-bg/g) || []).length === 1 && (darkBlock.match(/--chip-today-bg/g) || []).length === 1, 'due chips are themed in both themes');
ok(/\.sub\.drag-over\s*{[^}]*var\(--drag-sub\)/.test(cssText), 'subtask drag indicator uses its own color var(--drag-sub)');
ok(varOf(rootBlock, '--drag-sub') === '#0f766e' && varOf(darkBlock, '--drag-sub') === '#2dd4bf', 'drag-sub is teal in both themes');


// 10. Dark contrast + edit icon flip (REQ-5 / DES-5, experiment)
ok(varOf(darkBlock, '--border') === '#354b8f', 'dark --border is lifted navy #354b8f');
ok(varOf(darkBlock, '--panel') === '#121f45', 'dark --panel is #121f45');
ok(varOf(darkBlock, '--hover') === '#1e3268', 'dark --hover is #1e3268');
ok(/\.icon-btn\.edit\s*{[^}]*transform:\s*scaleX\(-1\)/.test(html), 'edit pencil is laterally inverted (scaleX(-1))');
ok(html.includes('class="flip-x">✎'), 'hint pencil glyph is flipped too');

// 11. Wunderlist-flavor compact flat rows + round checkbox (REQ-6 / DES-6, experiment)
ok(/border-bottom:\s*1px solid var\(--border\)/.test(ruleOf('.task')), 'task rows use a hairline divider, not a card border');
ok(/border-bottom:\s*1px solid var\(--border\)/.test(ruleOf('.sub')), 'subtask rows use a hairline divider, not a card border');
ok(/\.task\.selected\s*{[^}]*box-shadow:\s*inset 3px 0 0 var\(--accent\)/.test(cssText), 'selected task uses a left accent bar');
ok(/input\[type="checkbox"\]\s*{[^}]*appearance:\s*none[^}]*border-radius:\s*50%/.test(cssText), 'checkbox is custom-styled round');
ok(/input\[type="checkbox"\]:checked::after\s*{[^}]*clip-path/.test(cssText), 'checked checkbox draws a check mark');

console.log(fails ? `\n${fails} check(s) FAILED` : '\nAll smoke checks passed');
process.exit(fails ? 1 : 0);
