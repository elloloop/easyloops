'use client';
import React from 'react';

interface LanguageDropdownProps {
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
}

const languages = [
  { code: 'english', label: 'English' },
  { code: 'telugu', label: 'Telugu' },
  { code: 'hindi', label: 'Hindi' },
  { code: 'tamil', label: 'Tamil' },
];

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  selectedLanguage,
  setSelectedLanguage,
}) => (
  <div>
    <label
      htmlFor="wiki-language-select"
      className="mr-2 text-gray-700 dark:text-gray-200 font-medium"
    >
      Language:
    </label>
    <select
      id="wiki-language-select"
      value={selectedLanguage}
      onChange={(e) => setSelectedLanguage(e.target.value)}
      className="rounded border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 px-3 py-1"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  </div>
);

export default LanguageDropdown;
