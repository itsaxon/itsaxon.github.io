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
const daily = Object.fromEntries(
  fs
    .readdirSync('content/daily')
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
    .sort()
    .reverse()
    .map((file) => [
      path.basename(file, '.md'),
      fs.readFileSync(path.join('content/daily', file), 'utf8'),
    ]),
);
fs.mkdirSync('public/reports', { recursive: true });
for (const [date, markdown] of Object.entries(daily)) {
  fs.writeFileSync(`public/reports/${date}.md`, markdown);
}
fs.mkdirSync('src/lib', { recursive: true });
fs.writeFileSync(
  'src/lib/generated-content.ts',
  '// Generated from content/. Run npm run content after edits.\nexport const journalMarkdown: Record<string, string> = ' +
    JSON.stringify(posts, null, 2) +
    ';\nexport const dailyMarkdown: Record<string, string> = ' +
    JSON.stringify(daily) +
    ';\n',
);
console.log(
  `Generated ${Object.keys(posts).length} posts and ${Object.keys(daily).length} daily reports.`,
);
