'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { wikiSlugs } from '@/constants/wikiSlugs';

// Maps common single words to their wiki slug(s).
// This lets users double-click "vectors" and land on "vector-spaces", etc.
const wordToSlugs: Record<string, string[]> = {
  set: ['sets-and-notation'],
  sets: ['sets-and-notation'],
  notation: ['sets-and-notation'],
  membership: ['sets-and-notation'],
  subset: ['sets-and-notation'],
  subsets: ['sets-and-notation'],
  cartesian: ['sets-and-notation'],
  union: ['sets-and-notation'],
  intersection: ['sets-and-notation'],
  function: ['functions', 'functions-math'],
  functions: ['functions', 'functions-math'],
  codomain: ['functions-math'],
  domain: ['functions-math'],
  injective: ['functions-math'],
  surjective: ['functions-math'],
  bijective: ['functions-math'],
  field: ['fields'],
  fields: ['fields'],
  axiom: ['fields', 'vector-spaces'],
  axioms: ['fields', 'vector-spaces'],
  inverse: ['fields'],
  inverses: ['fields'],
  vector: ['vector-spaces'],
  vectors: ['vector-spaces'],
  scalar: ['scalars-vs-vectors'],
  scalars: ['scalars-vs-vectors'],
  concrete: ['concrete-vector-spaces'],
  complex: ['concrete-vector-spaces'],
  operations: ['operations-as-functions'],
  closure: ['operations-as-functions'],
  linear: ['linear-maps'],
  linearity: ['linear-maps'],
  additivity: ['linear-maps'],
  homogeneity: ['linear-maps'],
  transformation: ['linear-maps'],
  matrix: ['matrices'],
  matrices: ['matrices'],
  basis: ['matrices'],
  bases: ['matrices'],
  norm: ['inner-products-norms-geometry'],
  norms: ['inner-products-norms-geometry'],
  inner: ['inner-products-norms-geometry'],
  dot: ['inner-products-norms-geometry'],
  orthogonal: ['inner-products-norms-geometry'],
  orthogonality: ['inner-products-norms-geometry'],
  geometry: ['inner-products-norms-geometry'],
  distance: ['inner-products-norms-geometry'],
  roadmap: ['ml-math-roadmap'],
  probability: ['ml-math-roadmap'],
  gradient: ['ml-math-roadmap'],
  tensor: ['ml-math-roadmap'],
  tensors: ['ml-math-roadmap'],
  attention: ['ml-math-roadmap'],
  algorithm: ['algorithms'],
  array: ['arrays'],
  backtrack: ['backtracking'],
  recursion: ['recursion'],
  recursive: ['recursion'],
  loop: ['loops'],
  loops: ['loops'],
  string: ['strings'],
  strings: ['strings'],
  sort: ['sorting'],
  sorting: ['sorting'],
  tree: ['trees'],
  trees: ['trees'],
  graph: ['graphs'],
  graphs: ['graphs'],
  inheritance: ['inheritance'],
  polymorphism: ['polymorphism'],
  interface: ['interfaces'],
  interfaces: ['interfaces'],
  debugging: ['debugging'],
  threading: ['threading'],
  optimization: ['optimization'],
  parsing: ['parsing'],
};

interface MatchedSlug {
  slug: string;
  label: string;
}

interface PopupState {
  visible: boolean;
  x: number;
  y: number;
  word: string;
  matchedSlugs: MatchedSlug[];
}

function toSlug(word: string): string {
  return word
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function slugToLabel(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function findWikiMatches(word: string): MatchedSlug[] {
  const slug = toSlug(word);
  const results: MatchedSlug[] = [];
  const seen = new Set<string>();

  // 1. Exact slug match
  if ((wikiSlugs as readonly string[]).includes(slug)) {
    results.push({ slug, label: slugToLabel(slug) });
    seen.add(slug);
  }

  // 2. Check word-to-slug mapping
  const lowerWord = word.toLowerCase();
  const mapped = wordToSlugs[lowerWord];
  if (mapped) {
    for (const s of mapped) {
      if (!seen.has(s) && (wikiSlugs as readonly string[]).includes(s)) {
        results.push({ slug: s, label: slugToLabel(s) });
        seen.add(s);
      }
    }
  }

  // 3. Partial match: slug contains the word
  if (slug.length >= 3) {
    for (const ws of wikiSlugs) {
      if (!seen.has(ws) && ws.includes(slug)) {
        results.push({ slug: ws, label: slugToLabel(ws) });
        seen.add(ws);
      }
    }
  }

  return results;
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
    matchedSlugs: [],
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

    const matches = findWikiMatches(word);

    // Single exact match: open directly
    if (matches.length === 1) {
      window.open(`/wiki/${matches[0].slug}`, '_blank');
      selection?.removeAllRanges();
      return;
    }

    // Multiple matches or no matches: show popup
    setPopup({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      word,
      matchedSlugs: matches,
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

  const hasMatches = popup.matchedSlugs.length > 0;

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

      {hasMatches ? (
        <>
          <p className="dblclick-popup-info">
            Multiple wiki pages match &quot;{popup.word}&quot;:
          </p>
          <div className="dblclick-popup-links">
            {popup.matchedSlugs.map((m) => (
              <a
                key={m.slug}
                href={`/wiki/${m.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="dblclick-popup-link"
              >
                {m.label}
              </a>
            ))}
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default DoubleClickLookup;
