// Records, in each given English file, the hash of the French source it was translated from.
// Usage: npm run i18n:stamp -- content/resume/skills/06-java.en.md [...]
import { stampFile } from './lib/i18n.mjs';

const files = process.argv.slice(2);
if (!files.length) {
  console.error('Usage: npm run i18n:stamp -- <English .en.md files>');
  process.exit(1);
}
for (const file of files) stampFile(file);
console.log(`i18n: stamped ${files.length} file(s).`);
