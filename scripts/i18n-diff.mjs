// Shows what changed in a French file since its English translation was made.
// Usage: npm run i18n:diff -- content/resume/skills/06-java.fr.md
import { sourceDiff } from './lib/i18n.mjs';

const file = process.argv[2];
if (!file) {
  console.error('Usage: npm run i18n:diff -- <French .fr.md file>');
  process.exit(1);
}
try {
  console.log(sourceDiff(file) || 'No change since the English version was translated.');
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
