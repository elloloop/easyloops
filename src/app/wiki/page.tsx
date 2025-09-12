import fs from 'fs';
import path from 'path';
import WikiLanguageClient from './WikiLanguageClient';

function getWikiTopics() {
  const wikiDir = path.join(process.cwd(), 'public', 'wiki');
  return fs
    .readdirSync(wikiDir)
    .filter((name) => fs.statSync(path.join(wikiDir, name)).isDirectory());
}

export default function WikiPage() {
  const topics = getWikiTopics();
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <WikiLanguageClient topics={topics} />
      </div>
    </main>
  );
}
