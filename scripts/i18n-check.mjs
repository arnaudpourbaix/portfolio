// Lists French content files whose English translation is missing or out of date.
// Exits 1 when something needs translating, unless --warn is given.
import { relative, sep } from 'node:path';
import { translationStatus } from './lib/i18n.mjs';

const warnOnly = process.argv.includes('--warn');
const { missing, stale } = translationStatus('content/resume');
const list = (files) => files.map((f) => `  ${relative('.', f).split(sep).join('/')}`).join('\n');

if (!missing.length && !stale.length) {
  console.log('i18n: every French file has an up-to-date English translation.');
  process.exit(0);
}
if (missing.length) console.warn(`i18n: ${missing.length} file(s) without English translation:\n${list(missing)}`);
if (stale.length) console.warn(`i18n: ${stale.length} English file(s) out of date with their French source:\n${list(stale)}`);
if (!warnOnly) process.exit(1);
