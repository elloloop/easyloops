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

interface WordMatch {
  word: string;
  slugs: MatchedSlug[];
}

interface PopupState {
  visible: boolean;
  x: number;
  y: number;
  selectedText: string;
  matchedSlugs: MatchedSlug[];
  inlineMatches: WordMatch[];
  headingPath: string[];
  pageUrl: string;
  highlightUrl: string;
}

type PromptStyle = 'progressive' | 'quiz-first';

const PROMPT_STYLE_KEY = 'dblclick-prompt-style';
const HIGHLIGHT_CLASS = 'dblclick-highlight';
const HIGHLIGHT_WORD_CLASS = 'dblclick-highlight-word';

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

// Find all individual words in text that have wiki matches
function findInlineMatches(text: string): WordMatch[] {
  const words = text.split(/\s+/).filter((w) => w.length >= 2);
  const seen = new Set<string>();
  const results: WordMatch[] = [];

  for (const raw of words) {
    // Strip punctuation from edges
    const word = raw.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '');
    if (word.length < 2) continue;
    const lower = word.toLowerCase();
    if (seen.has(lower)) continue;

    const matches = findWikiMatches(word);
    if (matches.length > 0) {
      seen.add(lower);
      results.push({ word, slugs: matches });
    }
  }
  return results;
}

// Walk backwards through preceding siblings and parent elements
// to find the heading hierarchy for a given element.
function getHeadingHierarchy(element: HTMLElement): string[] {
  const headings: { level: number; text: string }[] = [];
  const headingTags = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']);

  let node: HTMLElement | null = element;

  while (node) {
    let sibling: Element | null = node.previousElementSibling;
    while (sibling) {
      if (headingTags.has(sibling.tagName)) {
        const level = parseInt(sibling.tagName[1]);
        const text = (sibling.textContent || '').trim();
        if (text) {
          headings.push({ level, text });
        }
      }
      sibling = sibling.previousElementSibling;
    }
    node = node.parentElement;
  }

  const byLevel = new Map<number, string>();
  for (const h of headings) {
    if (!byLevel.has(h.level)) {
      byLevel.set(h.level, h.text);
    }
  }

  return Array.from(byLevel.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([, text]) => text);
}

function buildHighlightUrl(text: string): string {
  const base = window.location.href.split('#')[0];
  const encoded = encodeURIComponent(text);
  return `${base}#:~:text=${encoded}`;
}

function generateProgressivePrompt(
  text: string,
  context: { headingPath: string[]; pageUrl: string }
): string {
  const contextLines: string[] = [];
  if (context.pageUrl) {
    contextLines.push(`Source: ${context.pageUrl}`);
  }
  if (context.headingPath.length > 0) {
    contextLines.push(`Section: ${context.headingPath.join(' > ')}`);
  }
  const contextBlock =
    contextLines.length > 0 ? `\n${contextLines.join('\n')}\n` : '';

  return `You are given the following highlighted text:

"""
${text}
"""
${contextBlock}
Your goal is to help me understand it progressively, checking comprehension and vocabulary at every step.

Global Rules:
- Do not assume prior knowledge.
- Do not introduce or explain a term until I confirm the context I mean.
- If a word or phrase is ambiguous, ask me what I think it means first.
- Stay strictly within the provided text.
- Move to the next level only after I explicitly agree.

Level 1: Explain Like I'm 5 (ELI5)
- Explain the main idea using very simple language.
- Avoid jargon and abstractions.
- Common Misconceptions (Level 1): List 2-3 things people usually assume that are not correct. Contrast each with what the text actually says, in simple terms.
- Vocabulary Check (Level 1): List every non-trivial word you used. Ask me which ones I already understand. Do not explain them yet.
- Mini Quiz (Level 1): 2-3 short questions that check the core idea and understanding of the words used.
- Ask: "Do you want to move to a clearer, more precise explanation?"

Level 2: Clear & Practical Explanation
- Re-explain the concept accurately using proper terminology.
- Use concrete examples tied to real situations.
- Common Misconceptions (Level 2): Compare what people often think vs what the text actually means. Explain why the misconception happens.
- Vocabulary Check (Level 2): List all technical terms. For ambiguous terms, ask me which context I mean before defining them.
- Mini Quiz (Level 2): 3-4 questions that verify conceptual understanding and correct meaning of key terms.
- Ask: "Should we go deeper into an expert-level explanation?"

Level 3: Expert-Level Deep Dive
- Provide a detailed, precise explanation with assumptions, limitations, and edge cases.
- Separate facts from interpretations.
- Common Misconceptions (Level 3): Identify subtle expert-level misunderstandings and show how they lead to incorrect conclusions.
- Vocabulary Check (Level 3): Surface all domain-specific terms. Confirm meaning or context before expanding.
- Mini Quiz (Level 3): Questions that test nuanced understanding, correct terminology usage, and ability to reason with the concept.`;
}

function generateQuizFirstPrompt(
  text: string,
  context: { headingPath: string[]; pageUrl: string }
): string {
  const contextLines: string[] = [];
  if (context.pageUrl) {
    contextLines.push(`Source: ${context.pageUrl}`);
  }
  if (context.headingPath.length > 0) {
    contextLines.push(`Section: ${context.headingPath.join(' > ')}`);
  }
  const contextBlock =
    contextLines.length > 0 ? `\n${contextLines.join('\n')}\n` : '';

  return `You are given the following highlighted text:

"""
${text}
"""
${contextBlock}
Your goal is to first assess my understanding, then explain the text at the right level.

Workflow:
1. Start with a short quiz at medium difficulty.
2. Adjust difficulty up or down based on my answers.
3. Use the quiz to infer my conceptual understanding, my familiarity with the terminology, and any gaps or misconceptions.
4. Only after the quiz, explain the text in a way that fills the gaps you identified.

Quiz Rules:
- Ask 3-5 questions.
- Questions should test both understanding of the idea and understanding of the words used in the text.
- If a term is ambiguous, ask me what context I'm using before explaining it.
- Do not explain anything during the quiz.

Explanation Rules:
- Tailor the explanation strictly to what I got wrong or was unsure about.
- Explicitly address common misconceptions revealed by the quiz.
- Avoid re-explaining what I already know.
- Stay within the provided text.`;
}

function getPromptForStyle(
  text: string,
  style: PromptStyle,
  context: { headingPath: string[]; pageUrl: string }
): string {
  return style === 'progressive'
    ? generateProgressivePrompt(text, context)
    : generateQuizFirstPrompt(text, context);
}

const STYLE_LABELS: Record<PromptStyle, { name: string; description: string }> =
  {
    progressive: {
      name: 'Progressive Understanding',
      description: 'ELI5 first, then deeper levels at your pace',
    },
    'quiz-first': {
      name: 'Quiz-First Adaptive',
      description: 'Tests you first, then explains your gaps',
    },
  };

// Wrap the current browser selection in highlight <mark> elements.
// Returns a cleanup function to remove them.
function applyHighlight(selection: Selection): (() => void) | null {
  if (!selection.rangeCount) return null;

  const range = selection.getRangeAt(0);
  const fragment = range.cloneContents();
  const textContent = fragment.textContent || '';
  if (!textContent.trim()) return null;

  // Use a <mark> wrapper for the highlight
  const mark = document.createElement('mark');
  mark.className = HIGHLIGHT_CLASS;

  try {
    range.surroundContents(mark);
  } catch {
    // surroundContents fails when selection spans multiple elements.
    // Fall back: extract, wrap, re-insert.
    const extracted = range.extractContents();
    mark.appendChild(extracted);
    range.insertNode(mark);
  }

  // Now scan for wiki-matched words inside the mark and annotate them
  annotateWikiWords(mark);

  // Clear browser selection so the blue highlight doesn't compete
  selection.removeAllRanges();

  return () => {
    // Remove annotations first
    const annotations = mark.querySelectorAll(`.${HIGHLIGHT_WORD_CLASS}`);
    annotations.forEach((ann) => {
      const parent = ann.parentNode;
      if (!parent) return;
      while (ann.firstChild) {
        parent.insertBefore(ann.firstChild, ann);
      }
      parent.removeChild(ann);
    });

    // Unwrap the mark: move children out, remove mark
    const parent = mark.parentNode;
    if (parent) {
      while (mark.firstChild) {
        parent.insertBefore(mark.firstChild, mark);
      }
      parent.removeChild(mark);
      parent.normalize(); // merge adjacent text nodes
    }
  };
}

// Walk text nodes inside a mark element and wrap wiki-matched words
// with a clickable annotated span.
function annotateWikiWords(container: HTMLElement) {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let current: Node | null;
  while ((current = walker.nextNode())) {
    textNodes.push(current as Text);
  }

  for (const textNode of textNodes) {
    const text = textNode.textContent || '';
    // Match word boundaries
    const regex = /[a-zA-Z]{2,}/g;
    let match: RegExpExecArray | null;
    const parts: (string | { word: string; slug: string })[] = [];
    let lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      const word = match[0];
      const matches = findWikiMatches(word);
      if (matches.length > 0) {
        if (match.index > lastIndex) {
          parts.push(text.slice(lastIndex, match.index));
        }
        parts.push({ word, slug: matches[0].slug });
        lastIndex = match.index + word.length;
      }
    }

    if (parts.length === 0) continue; // no matches in this text node

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    // Replace text node with annotated fragments
    const frag = document.createDocumentFragment();
    for (const part of parts) {
      if (typeof part === 'string') {
        frag.appendChild(document.createTextNode(part));
      } else {
        const span = document.createElement('span');
        span.className = HIGHLIGHT_WORD_CLASS;
        span.setAttribute('data-wiki-slug', part.slug);
        span.textContent = part.word;
        span.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.open(`/wiki/${part.slug}`, '_blank');
        });
        frag.appendChild(span);
      }
    }

    textNode.parentNode?.replaceChild(frag, textNode);
  }
}

const DoubleClickLookup: React.FC = () => {
  const [popup, setPopup] = useState<PopupState>({
    visible: false,
    x: 0,
    y: 0,
    selectedText: '',
    matchedSlugs: [],
    inlineMatches: [],
    headingPath: [],
    pageUrl: '',
    highlightUrl: '',
  });
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [promptStyle, setPromptStyle] = useState<PromptStyle>('progressive');
  const popupRef = useRef<HTMLDivElement>(null);
  const cleanupHighlightRef = useRef<(() => void) | null>(null);

  // Load saved prompt style preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        PROMPT_STYLE_KEY
      ) as PromptStyle | null;
      if (saved && (saved === 'progressive' || saved === 'quiz-first')) {
        setPromptStyle(saved);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const handleStyleChange = (style: PromptStyle) => {
    setPromptStyle(style);
    setCopied(false);
    try {
      localStorage.setItem(PROMPT_STYLE_KEY, style);
    } catch {
      // localStorage unavailable
    }
  };

  // Track whether a dblclick just fired so mouseup doesn't double-trigger
  const dblclickFiredRef = useRef(false);
  // Track mousedown to detect drag selections
  const mouseDownTargetRef = useRef<HTMLElement | null>(null);

  const dismissPopup = useCallback(() => {
    if (cleanupHighlightRef.current) {
      cleanupHighlightRef.current();
      cleanupHighlightRef.current = null;
    }
    setPopup((prev) => ({ ...prev, visible: false }));
  }, []);

  // Core logic: given selected text and a target element + coordinates, show popup
  const showPopupForSelection = useCallback(
    (text: string, target: HTMLElement, clientX: number, clientY: number) => {
      // Clean up previous highlight if any
      if (cleanupHighlightRef.current) {
        cleanupHighlightRef.current();
        cleanupHighlightRef.current = null;
      }

      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      const isSingleWord = !text.includes(' ');
      const allMatches = isSingleWord ? findWikiMatches(text) : [];
      const inlineMatches = findInlineMatches(text);

      let matchedSlugs = allMatches;
      if (!isSingleWord) {
        const seen = new Set<string>();
        matchedSlugs = [];
        for (const im of inlineMatches) {
          for (const s of im.slugs) {
            if (!seen.has(s.slug)) {
              seen.add(s.slug);
              matchedSlugs.push(s);
            }
          }
        }
      }

      const headingPath = getHeadingHierarchy(target);
      const pageUrl = window.location.href.split('#')[0];
      const highlightUrl = buildHighlightUrl(text);

      const cleanup = applyHighlight(selection);
      cleanupHighlightRef.current = cleanup;

      setPopup({
        visible: true,
        x: clientX,
        y: clientY,
        selectedText: text,
        matchedSlugs,
        inlineMatches,
        headingPath,
        pageUrl,
        highlightUrl,
      });
      setCopied(false);
      setLinkCopied(false);
    },
    []
  );

  const isExcludedTarget = useCallback((target: HTMLElement) => {
    return (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.closest('.monaco-editor') ||
      target.closest('.dblclick-popup') ||
      target.closest(`.${HIGHLIGHT_WORD_CLASS}`)
    );
  }, []);

  // Double-click: fires for single word selection (browser auto-selects a word)
  const handleDoubleClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isExcludedTarget(target)) return;

      const selection = window.getSelection();
      const text = selection?.toString().trim();
      if (!text || text.length < 2) return;

      dblclickFiredRef.current = true;
      // Reset after a tick so mouseup doesn't also fire
      setTimeout(() => {
        dblclickFiredRef.current = false;
      }, 100);

      showPopupForSelection(text, target, e.clientX, e.clientY);
    },
    [isExcludedTarget, showPopupForSelection]
  );

  // Track mousedown to know where drag started
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      mouseDownTargetRef.current = target;

      // Handle click-outside dismissal
      if (!popup.visible) return;
      if (popupRef.current && popupRef.current.contains(target)) return;
      if (
        target.closest(`.${HIGHLIGHT_CLASS}`) ||
        target.closest(`.${HIGHLIGHT_WORD_CLASS}`)
      )
        return;

      dismissPopup();
    },
    [popup.visible, dismissPopup]
  );

  // Mouse up after drag: detect multi-word selections
  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      // Skip if a dblclick just fired (it already handled it)
      if (dblclickFiredRef.current) return;

      const target = e.target as HTMLElement;
      if (isExcludedTarget(target)) return;

      const selection = window.getSelection();
      const text = selection?.toString().trim();

      // Only trigger for multi-word drag selections (2+ words with spaces)
      if (!text || text.length < 3 || !text.includes(' ')) return;

      // Use the mousedown target for heading hierarchy (where selection started)
      const anchorTarget = mouseDownTargetRef.current || target;
      showPopupForSelection(text, anchorTarget, e.clientX, e.clientY);
    },
    [isExcludedTarget, showPopupForSelection]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && popup.visible) {
        dismissPopup();
      }
    },
    [popup.visible, dismissPopup]
  );

  useEffect(() => {
    document.addEventListener('dblclick', handleDoubleClick);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('dblclick', handleDoubleClick);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleDoubleClick, handleMouseDown, handleMouseUp, handleKeyDown]);

  // Cleanup highlight on unmount
  useEffect(() => {
    return () => {
      if (cleanupHighlightRef.current) {
        cleanupHighlightRef.current();
      }
    };
  }, []);

  const copyPrompt = async () => {
    const prompt = getPromptForStyle(popup.selectedText, promptStyle, {
      headingPath: popup.headingPath,
      pageUrl: popup.pageUrl,
    });
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
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

  const copyHighlightLink = async () => {
    try {
      await navigator.clipboard.writeText(popup.highlightUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = popup.highlightUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  if (!popup.visible) return null;

  const popupWidth = 380;
  const popupHeight = 320;
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
  const displayText =
    popup.selectedText.length > 60
      ? popup.selectedText.slice(0, 57) + '...'
      : popup.selectedText;

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
        <div className="dblclick-popup-header-left">
          <span className="dblclick-popup-word">
            &ldquo;{displayText}&rdquo;
          </span>
          {popup.headingPath.length > 0 && (
            <span className="dblclick-popup-breadcrumb">
              {popup.headingPath.join(' > ')}
            </span>
          )}
        </div>
        <button
          className="dblclick-popup-close"
          onClick={dismissPopup}
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      {hasMatches && (
        <div className="dblclick-popup-section">
          <p className="dblclick-popup-section-label">Wiki Pages</p>
          <p className="dblclick-popup-hint">
            Click a link below, or click annotated words in the highlighted
            text.
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
        </div>
      )}

      <div className="dblclick-popup-section">
        <p className="dblclick-popup-section-label">Learn with AI</p>
        <p className="dblclick-popup-hint">
          Copy the prompt below and paste it into your favourite AI assistant to
          learn about this topic.
        </p>

        <div className="dblclick-popup-style-tabs">
          {(Object.keys(STYLE_LABELS) as PromptStyle[]).map((style) => (
            <button
              key={style}
              className={`dblclick-popup-style-tab ${promptStyle === style ? 'active' : ''}`}
              onClick={() => handleStyleChange(style)}
              title={STYLE_LABELS[style].description}
            >
              {STYLE_LABELS[style].name}
            </button>
          ))}
        </div>

        <p className="dblclick-popup-style-desc">
          {STYLE_LABELS[promptStyle].description}
        </p>

        <button className="dblclick-popup-copy" onClick={copyPrompt}>
          {copied ? 'Copied!' : 'Copy Prompt'}
        </button>
      </div>

      <div className="dblclick-popup-section dblclick-popup-share">
        <button
          className="dblclick-popup-share-btn"
          onClick={copyHighlightLink}
        >
          {linkCopied ? 'Link Copied!' : 'Copy Highlight Link'}
        </button>
      </div>
    </div>
  );
};

export default DoubleClickLookup;
