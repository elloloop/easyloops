'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAvailableQuestions } from '@/shared/lib';
import { formatQuestionName } from '@/shared/lib/formatters';
import { SimpleHeader } from '@/shared/components';

// Fallback for getQuestionDetails (replace with actual import if available)
const getQuestionDetails = async (questionId: string) => {
  // Placeholder: Replace with your actual API call
  const response = await fetch(`/api/questions/${questionId}`, {
    cache: 'force-cache', // Cache to speed up subsequent loads
  });
  return response.json();
};

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [navigating, setNavigating] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getAvailableQuestions()
      .then((questionList) => {
        console.log('Loaded questions:', questionList);
        setQuestions(questionList);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading questions:', err);
        setError(err.message || 'Failed to load questions');
        setLoading(false);
      });
  }, []);

  // Preload question details on hover
  const preloadQuestion = async (questionId: string) => {
    try {
      await getQuestionDetails(questionId);
    } catch (err) {
      console.error(`Failed to preload ${questionId}:`, err);
    }
  };

  // Handle click to show navigation loading state
  const handleQuestionClick = (questionId: string) => {
    setNavigating(questionId); // Show spinner for this question
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            Loading problems...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors">
        <div className="text-center">
          <div className="text-red-600 dark:text-red-400 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Error Loading Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors">
        <div className="text-center">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Questions Available
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            No practice problems are currently available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <SimpleHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Practice Problems
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Choose a problem to start practicing. Problems are organized by
            difficulty and topic.
          </p>
        </div>

        {/* Problem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map((questionId) => (
            <Link
              key={questionId}
              href={`/questions/${questionId}`}
              prefetch={true} // Enable Next.js prefetching
              onMouseEnter={() => preloadQuestion(questionId)} // Preload on hover
              onClick={() => handleQuestionClick(questionId)} // Show navigation loading
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200 hover:border-blue-300 dark:hover:border-blue-500 relative ${
                navigating === questionId
                  ? 'opacity-50 pointer-events-none'
                  : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatQuestionName(questionId)}
                </h3>
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                  {questionId.split('-')[0]}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Practice {questionId.replace(/-/g, ' ').replace(/\d+-/, '')}{' '}
                concepts and improve your skills.
              </p>
              <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                <span>Start Problem</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              {/* Subtle loading indicator during navigation */}
              {navigating === questionId && (
                <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 bg-opacity-75">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
