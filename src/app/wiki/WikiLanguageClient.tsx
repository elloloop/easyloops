'use client';
import React from 'react';
import Link from 'next/link';
import LanguageDropdown from './LanguageDropdown';

// ...existing code...

export default function WikiLanguageClient({ topics }: { topics: string[] }) {
  const [selectedLanguage, setSelectedLanguage] = React.useState('english');
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Wiki
        </h1>
        <LanguageDropdown
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
      </div>
      <p className="text-gray-700 dark:text-gray-200 mb-8">
        Welcome to the Easyloops Wiki! Select a topic below.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <Link
            key={topic}
            href={`/wiki/${topic}?lang=${selectedLanguage}`}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700 p-6 h-full group"
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
                  {topic
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Explore resources and guides about {topic.replace(/-/g, ' ')}.
                </p>
              </div>
              <span className="mt-4 inline-block text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                View Wiki
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
