'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { SimpleHeader } from '@/shared/components';

interface CompletedQuestion {
  id: string;
  title: string;
  completedAt: string;
}

export default function DashboardPage() {
  console.log(' Dashboard Page: Rendering user dashboard');
  const [completedQuestions, setCompletedQuestions] = useState<
    CompletedQuestion[]
  >([]);

  // Example: useEffect to fetch completed questions (replace with real API call)
  useEffect(() => {
    // Simulate fetch
    setCompletedQuestions([
      { id: '1', title: 'Variables', completedAt: '2025-07-29' },
      { id: '2', title: 'Loops', completedAt: '2025-07-28' },
    ]);
  }, []);

  return (
    <div>
      <SimpleHeader />
      <h2>Completed Questions</h2>
      <ul>
        {completedQuestions.map((q) => (
          <li key={q.id}>
            <Link href={`/questions/${q.id}`}>{q.title}</Link> - Completed on{' '}
            {q.completedAt}
          </li>
        ))}
      </ul>
    </div>
  );
}
