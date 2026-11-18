import { expect, test } from 'vitest';
import { readFileSync } from 'node:fs';
import { containsPrivateData, repoTextFiles } from './private-data';

test('detects the birth date whatever the separators', () => {
  // Built from parts so this file doesn't contain the value itself.
  expect(containsPrivateData(['02', '10', '1976'].join('/'))).toBe(true);
  expect(containsPrivateData(['1976', '10', '02'].join('-'))).toBe(true);
  expect(containsPrivateData('Angular (9-17), 2026-03, 06 12 34 56 78')).toBe(false);
});

test('the phone number is not private: it is on the CV', () => {
  expect(containsPrivateData('06 26 12 27 68')).toBe(false);
});

test('no birth date in any file of the repo', () => {
  const leaks = repoTextFiles().filter((file) => containsPrivateData(readFileSync(file, 'utf8')));
  expect(leaks).toEqual([]);
});
