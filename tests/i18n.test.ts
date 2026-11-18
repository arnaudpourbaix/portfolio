import { describe, expect, test } from 'vitest';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { hashSource, translationStatus, stampFile, sourceDiff } from '../scripts/lib/i18n.mjs';

function setup() {
  const dir = mkdtempSync(join(tmpdir(), 'i18n-'));
  mkdirSync(join(dir, 'skills'));
  const fr = join(dir, 'skills', '00-java.fr.md');
  const en = join(dir, 'skills', '00-java.en.md');
  writeFileSync(fr, '---\ntitle: Java\norder: 0\n---\n');
  return { dir, fr, en };
}

test('hash ignores line endings', () => expect(hashSource('a\r\nb\r\n')).toBe(hashSource('a\nb\n')));

test('a French file without English is missing', () => {
  const { dir, fr } = setup();
  expect(translationStatus(dir)).toEqual({ missing: [fr], stale: [] });
});

test('editing the French file makes the English stale until re-stamped', () => {
  const { dir, fr, en } = setup();
  writeFileSync(en, '---\ntitle: Java\norder: 0\n---\n');
  stampFile(en);
  expect(translationStatus(dir)).toEqual({ missing: [], stale: [] });
  writeFileSync(fr, '---\ntitle: Java (JEE)\norder: 0\n---\n');
  expect(translationStatus(dir).stale).toEqual([fr]);
  stampFile(en);
  expect(translationStatus(dir)).toEqual({ missing: [], stale: [] });
});

test('stampFile only touches sourceHash', () => {
  const { fr, en } = setup();
  const original = "---\ntitle: Java\norder: 0\nitems:\n  - Spring\n---\n\nBody with 'quotes' : and colons.\n";
  writeFileSync(en, original);
  stampFile(en);
  const stamped = readFileSync(en, 'utf8');
  expect(stamped.replace(/^sourceHash: .*\n/m, '')).toBe(original);
  expect(stamped).toContain(`sourceHash: ${hashSource(readFileSync(fr, 'utf8'))}`);
  stampFile(en);
  expect(readFileSync(en, 'utf8')).toBe(stamped);
});

describe('sourceDiff', () => {
  const git = (cwd: string, ...args: string[]) => execFileSync('git', args, { cwd, encoding: 'utf8' });
  function repo() {
    const { dir, fr, en } = setup();
    git(dir, 'init', '-q');
    git(dir, 'config', 'user.email', 'test@example.com');
    git(dir, 'config', 'user.name', 'Test');
    git(dir, 'config', 'core.autocrlf', 'false');
    writeFileSync(en, '---\ntitle: Java\norder: 0\n---\n');
    stampFile(en);
    git(dir, 'add', '.');
    git(dir, 'commit', '-qm', 'translated');
    return { dir, fr, en };
  }

  test('shows an uncommitted French change since the translated version', () => {
    const { dir, fr } = repo();
    writeFileSync(fr, '---\ntitle: Java (JEE)\norder: 0\n---\n');
    expect(sourceDiff(fr, dir)).toContain('+title: Java (JEE)');
  });

  test('finds the translated version even after a later hand edit of the English file', () => {
    const { dir, fr, en } = repo();
    writeFileSync(fr, '---\ntitle: Java (JEE)\norder: 0\n---\n');
    git(dir, 'commit', '-qam', 'french change');
    writeFileSync(en, readFileSync(en, 'utf8').replace('title: Java', 'title: Java EE'));
    git(dir, 'commit', '-qam', 'hand correction');
    expect(sourceDiff(fr, dir)).toContain('+title: Java (JEE)');
  });

  test('throws when no committed version matches the stored hash', () => {
    const { dir, fr, en } = repo();
    writeFileSync(en, readFileSync(en, 'utf8').replace(/sourceHash: \w+/, 'sourceHash: 0000000000000000'));
    expect(() => sourceDiff(fr, dir)).toThrow(/No committed version/);
  });
});
