'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { wikiSlugs } from '@/constants/wikiSlugs';

interface PopupState {
  visible: boolean;
  x: number;
  y: number;
  word: string;
  slug: string;
  hasWikiPage: boolean;
}

function toSlug(word: string): string {
  return word
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generateAIPrompt(word: string): string {
  return `Explain "${word}" in simple terms as if I'm learning it for the first time. Include:
1. A clear definition
2. Why it matters
3. A concrete example
4. Common misconceptions`;
}

const DoubleClickLookup: React.FC = () => {
  const [popup, setPopup] = useState<PopupState>({
    visible: false,
    x: 0,
    y: 0,
    word: '',
    slug: '',
    hasWikiPage: false,
  });
  const [copied, setCopied] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleDoubleClick = useCallback((e: MouseEvent) => {
    const selection = window.getSelection();
    const word = selection?.toString().trim();

    if (!word || word.length < 2 || word.includes(' ')) return;

    // Don't trigger on inputs, textareas, or code editors
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.closest('.monaco-editor')
    ) {
      return;
    }

    const slug = toSlug(word);
    if (!slug) return;

    const hasWikiPage = (wikiSlugs as readonly string[]).includes(slug);

    if (hasWikiPage) {
      window.open(`/wiki/${slug}`, '_blank');
      selection?.removeAllRanges();
      return;
    }

    // Show popup with AI prompt
    setPopup({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      word,
      slug,
      hasWikiPage: false,
    });
    setCopied(false);
  }, []);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        popup.visible &&
        popupRef.current &&
        !popupRef.current.contains(e.target as Node)
      ) {
        setPopup((prev) => ({ ...prev, visible: false }));
      }
    },
    [popup.visible]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && popup.visible) {
        setPopup((prev) => ({ ...prev, visible: false }));
      }
    },
    [popup.visible]
  );

  useEffect(() => {
    document.addEventListener('dblclick', handleDoubleClick);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('dblclick', handleDoubleClick);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleDoubleClick, handleClickOutside, handleKeyDown]);

  const copyPrompt = async () => {
    const prompt = generateAIPrompt(popup.word);
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = prompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!popup.visible) return null;

  // Calculate position to keep popup in viewport
  const popupWidth = 340;
  const popupHeight = 200;
  let left = popup.x;
  let top = popup.y + 10;

  if (left + popupWidth > window.innerWidth) {
    left = window.innerWidth - popupWidth - 16;
  }
  if (top + popupHeight > window.innerHeight) {
    top = popup.y - popupHeight - 10;
  }
  if (left < 8) left = 8;
  if (top < 8) top = 8;

  return (
    <div
      ref={popupRef}
      className="dblclick-popup"
      style={{
        position: 'fixed',
        left: `${left}px`,
        top: `${top}px`,
        zIndex: 9999,
      }}
    >
      <div className="dblclick-popup-header">
        <span className="dblclick-popup-word">{popup.word}</span>
        <button
          className="dblclick-popup-close"
          onClick={() => setPopup((prev) => ({ ...prev, visible: false }))}
          aria-label="Close"
        >
          x
        </button>
      </div>
      <p className="dblclick-popup-info">
        No wiki page found for &quot;{popup.word}&quot;. Copy this prompt to
        learn from an AI assistant:
      </p>
      <div className="dblclick-popup-prompt">
        <code>{generateAIPrompt(popup.word)}</code>
      </div>
      <button className="dblclick-popup-copy" onClick={copyPrompt}>
        {copied ? 'Copied!' : 'Copy Prompt'}
      </button>
    </div>
  );
};

export default DoubleClickLookup;
