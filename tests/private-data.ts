import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

// SHA-256 of Arnaud's birth date (DDMMYYYY and YYYYMMDD), digits only.
// Stored as hashes so the value itself never appears in the repo. The phone number is public: it is on the CV.
const SECRET_HASHES = new Set([
  '64bfefe77facd52dcbea7ca4577987cdf6c768903e96d84605f7018ff0e547eb',
  '51c2a87685f55df9f5769ca7f26d417d001ceaf08422a770686e8ebe3ec9999d',
]);
const SECRET_LENGTHS = [8];
const sha256 = (s: string) => createHash('sha256').update(s).digest('hex');

/** True when the text contains the birth date, whatever the separators (spaces, dots, slashes, dashes, +). */
export function containsPrivateData(text: string): boolean {
  for (const [run] of text.matchAll(/\d(?:[\d .\/+-]*\d)?/g)) {
    const digits = run.replace(/\D/g, '');
    for (const length of SECRET_LENGTHS)
      for (let i = 0; i + length <= digits.length; i++) if (SECRET_HASHES.has(sha256(digits.slice(i, i + length)))) return true;
  }
  return false;
}

const BINARY = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.ico', '.woff', '.woff2']);
const isText = (path: string) => !BINARY.has(extname(path).toLowerCase());

/** Files git would publish: tracked plus untracked-but-not-ignored. */
export function repoTextFiles(): string[] {
  const out = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], { encoding: 'utf8' });
  return out.split('\n').filter((path) => path && existsSync(path) && isText(path));
}

export function textFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return textFiles(path);
    return isText(name) ? [path] : [];
  });
}
