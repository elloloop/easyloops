'use client';

import React, { useState, useEffect, useRef } from 'react';
import MarkdownRenderer from '@/shared/components/MarkdownRenderer';
import ClientHeader from '@/shared/components/ClientHeader';
import type { SupportedLanguage } from '@/shared/lib/wikiLoader';

interface WikiPageClientProps {
  slug: string;
  allContent: Record<SupportedLanguage, string>;
}

const WikiPageClient: React.FC<WikiPageClientProps> = ({
  slug,
  allContent,
}) => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage>('python');
  const contentRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language as SupportedLanguage);
    console.log(`Language changed to: ${language}`);
  };

  // Get the current content based on selected language
  const currentContent = allContent[selectedLanguage] || allContent.python;

  // Add copy buttons to .copy-prompt-container elements after render
  useEffect(() => {
    if (!contentRef.current) return;
    const containers = contentRef.current.querySelectorAll(
      '.copy-prompt-container'
    );
    containers.forEach((container) => {
      // Skip if button already added
      if (container.querySelector('.copy-prompt-btn')) return;
      const promptTextEl = container.querySelector('.copy-prompt-text');
      if (!promptTextEl) return;

      const btn = document.createElement('button');
      btn.className = 'copy-prompt-btn';
      btn.textContent = 'Copy Prompt';
      btn.addEventListener('click', async () => {
        const text = promptTextEl.textContent || '';
        // Strip the "Prompt: " prefix if present
        const prompt = text.replace(/^Prompt:\s*"?|"?\s*$/g, '');
        try {
          await navigator.clipboard.writeText(prompt);
          btn.textContent = 'Copied!';
          setTimeout(() => {
            btn.textContent = 'Copy Prompt';
          }, 2000);
        } catch {
          const textarea = document.createElement('textarea');
          textarea.value = prompt;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          btn.textContent = 'Copied!';
          setTimeout(() => {
            btn.textContent = 'Copy Prompt';
          }, 2000);
        }
      });
      container.appendChild(btn);
    });
  }, [currentContent]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <ClientHeader
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        showLanguageSelector={true}
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 transition-colors duration-300 border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {slug
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </h1>
            <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400"></div>
          </div>

          <div
            ref={contentRef}
            className="prose prose-lg max-w-none text-gray-900 dark:text-gray-100"
          >
            <MarkdownRenderer content={currentContent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WikiPageClient;
