// Tracks which English content files are missing or out of date with their French source.
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, relative, resolve, sep } from 'node:path';

/** Short hash of a French source file, independent of CRLF/LF line endings. */
export function hashSource(text) {
  const normalized = text.replace(/\r\n?/g, '\n').trimEnd();
  return createHash('sha256').update(normalized).digest('hex').slice(0, 16);
}

const englishPathOf = (frPath) => frPath.replace(/\.fr\.md$/, '.en.md');
const frenchPathOf = (enPath) => enPath.replace(/\.en\.md$/, '.fr.md');

function frenchFiles(dir) {
  return readdirSync(dir)
    .sort()
    .flatMap((name) => {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) return frenchFiles(path);
      return name.endsWith('.fr.md') ? [path] : [];
    });
}

function storedHash(enText) {
  return enText.match(/^sourceHash:\s*(\S+)\s*$/m)?.[1];
}

export function translationStatus(contentDir) {
  const missing = [];
  const stale = [];
  for (const fr of frenchFiles(contentDir)) {
    const en = englishPathOf(fr);
    if (!existsSync(en)) missing.push(fr);
    else if (storedHash(readFileSync(en, 'utf8')) !== hashSource(readFileSync(fr, 'utf8'))) stale.push(fr);
  }
  return { missing, stale };
}

/** Records the hash of the French sibling in the English file's frontmatter. */
export function stampFile(enPath) {
  const text = readFileSync(enPath, 'utf8');
  const eol = text.includes('\r\n') ? '\r\n' : '\n';
  const line = `sourceHash: ${hashSource(readFileSync(frenchPathOf(enPath), 'utf8'))}`;
  const updated = /^sourceHash:.*$/m.test(text)
    ? text.replace(/^sourceHash:.*$/m, line)
    : text.replace(/^(---\r?\n[\s\S]*?)(\r?\n---\r?\n)/, `$1${eol}${line}$2`);
  if (updated === text && !text.includes(line)) throw new Error(`No frontmatter in ${enPath}`);
  writeFileSync(enPath, updated);
}

/**
 * The diff between the French version an English file was translated from (found by its stored
 * sourceHash in the French file's git history) and the French file as it is now, uncommitted
 * changes included.
 */
export function sourceDiff(frPath, cwd = '.') {
  const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8', maxBuffer: 1 << 26 });
  const stored = storedHash(readFileSync(englishPathOf(frPath), 'utf8'));
  const top = git('rev-parse', '--show-toplevel').trim();
  const repoPath = relative(top, resolve(cwd, frPath)).split(sep).join('/');
  for (const rev of git('log', '--format=%H', '--', repoPath).split('\n').filter(Boolean)) {
    if (hashSource(git('show', `${rev}:${repoPath}`)) === stored) return git('diff', rev, '--', repoPath);
  }
  throw new Error(`No committed version of ${repoPath} matches the English file's sourceHash; translate it again from scratch.`);
}
