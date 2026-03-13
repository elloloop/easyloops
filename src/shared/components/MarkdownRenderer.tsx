import { Marked } from 'marked';
import React from 'react';
import { wikiSlugs, questionSlugs } from '@/constants/wikiSlugs';
import PythonPlayground from './PythonPlayground';

export type MarkdownRendererProps = {
  content: string;
  className?: string;
};

const PYPLAY_START = '___PYPLAY_START___';
const PYPLAY_END = '___PYPLAY_END___';

const processLinks = (markdown: string) => {
  // Handle [[type:slug]] patterns for different link types
  return markdown.replace(/\[\[([\w-]+):([\w-]+)\]\]/g, (_, type, slug) => {
    switch (type) {
      case 'wiki':
        if (wikiSlugs.includes(slug)) {
          return `[${slug}](/wiki/${slug})`;
        } else {
          return `<span class="text-red-500 font-semibold">[[wiki:${slug}]]</span>`;
        }
      case 'question':
        if (questionSlugs.includes(slug)) {
          return `[${slug}](/questions/${slug})`;
        } else {
          return `<span class="text-red-500 font-semibold">[[question:${slug}]]</span>`;
        }
      default:
        return `<span class="text-red-500 font-semibold">[[${type}:${slug}]]</span>`;
    }
  });
};

// Create a marked instance with custom code renderer
const createMarkedInstance = () => {
  const instance = new Marked();
  instance.use({
    renderer: {
      code({ text, lang }: { text: string; lang?: string }) {
        if (lang === 'python') {
          return `${PYPLAY_START}${encodeURIComponent(text)}${PYPLAY_END}`;
        }
        const escaped = text
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        const langClass = lang ? ` class="language-${lang}"` : '';
        return `<pre><code${langClass}>${escaped}</code></pre>`;
      },
    },
  });
  return instance;
};

const markedInstance = createMarkedInstance();

type Segment =
  | { type: 'html'; content: string }
  | { type: 'python'; content: string };

function splitAtPlaygrounds(html: string): Segment[] {
  const result: Segment[] = [];
  const regex = new RegExp(`${PYPLAY_START}(.*?)${PYPLAY_END}`, 'g');
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      result.push({
        type: 'html',
        content: html.slice(lastIndex, match.index),
      });
    }
    result.push({ type: 'python', content: decodeURIComponent(match[1]) });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < html.length) {
    result.push({ type: 'html', content: html.slice(lastIndex) });
  }

  return result;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className,
}) => {
  const segments = React.useMemo(() => {
    const processedContent = processLinks(content);
    const html = markedInstance.parse(processedContent) as string;
    return splitAtPlaygrounds(html);
  }, [content]);

  const hasPython = segments.some((s) => s.type === 'python');

  // If no Python blocks, render as before (single div, no extra wrappers)
  if (!hasPython) {
    return (
      <div
        data-testid="markdown-container"
        className={`markdown-content prose prose-sm max-w-none ${className || ''}`}
        dangerouslySetInnerHTML={{ __html: segments[0]?.content || '' }}
      />
    );
  }

  return (
    <div
      data-testid="markdown-container"
      className={`markdown-content prose prose-sm max-w-none ${className || ''}`}
    >
      {segments.map((seg, i) =>
        seg.type === 'html' ? (
          <div key={i} dangerouslySetInnerHTML={{ __html: seg.content }} />
        ) : (
          <PythonPlayground key={i} initialCode={seg.content} />
        )
      )}
    </div>
  );
};

export default MarkdownRenderer;
