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

console.log(fails ? `\n${fails} check(s) FAILED` : '\nAll smoke checks passed');
process.exit(fails ? 1 : 0);
