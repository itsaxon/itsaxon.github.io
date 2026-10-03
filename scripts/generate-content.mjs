import fs from 'node:fs';
import path from 'node:path';
const posts = Object.fromEntries(
  fs
    .readdirSync('content/posts')
    .filter((f) => f.endsWith('.md'))
    .map((file) => [
      path.basename(file, '.md'),
      fs.readFileSync(path.join('content/posts', file), 'utf8'),
    ]),
);
const daily = fs.readFileSync('content/daily/2026-09-27.md', 'utf8');
fs.mkdirSync('src/lib', { recursive: true });
fs.writeFileSync(
  'src/lib/generated-content.ts',
  '// Generated from content/. Run npm run content after edits.\nexport const journalMarkdown: Record<string, string> = ' +
    JSON.stringify(posts, null, 2) +
    ';\nexport const dailyExample = ' +
    JSON.stringify(daily) +
    ';\n',
);
console.log('Generated ' + Object.keys(posts).length + ' Markdown posts and one daily report.');
