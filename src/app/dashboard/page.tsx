'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { SimpleHeader } from '@/shared/components';
import { useAuth } from '@/features/auth';

interface CompletedQuestion {
  id: string;
  title: string;
  completedAt: string;
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [completedQuestions, setCompletedQuestions] = useState<
    CompletedQuestion[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only fetch completed questions if user is logged in
    if (!loading && user) {
      fetchCompletedQuestions();
    }
  }, [user, loading]);

  const fetchCompletedQuestions = async () => {
    try {
      // TODO: Replace with actual API call to fetch completed questions
      // This is a mock implementation
      const mockData = [
        {
          id: '1',
          title: 'Variables and Data Types',
          completedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Control Flow',
          completedAt: new Date().toISOString(),
        },
      ];

      setCompletedQuestions(mockData);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch completed questions:', error);
      setIsLoading(false);
    }
  };

  if (loading || isLoading) {
    return (
      <div>
        <SimpleHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/4"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <SimpleHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
            <p className="text-gray-600 dark:text-gray-300">
              You need to be logged in to view your dashboard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SimpleHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Your Progress Dashboard</h1>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Completed Questions</h2>
            {completedQuestions.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">
                You haven&apos;t completed any questions yet. Start solving
                problems to track your progress!
              </p>
            ) : (
              <ul className="space-y-4">
                {completedQuestions.map((question) => (
                  <li
                    key={question.id}
                    className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <Link
                        href={`/questions/${question.id}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      >
                        {question.title}
                      </Link>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Completed on{' '}
                        {new Date(question.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      href={`/questions/${question.id}`}
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Review
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t dark:border-gray-700 pt-6">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Total Completed
                </p>
                <p className="text-2xl font-bold">
                  {completedQuestions.length}
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-green-600 dark:text-green-400">
                  Success Rate
                </p>
                <p className="text-2xl font-bold">100%</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Streak
                </p>
                <p className="text-2xl font-bold">1 day</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
