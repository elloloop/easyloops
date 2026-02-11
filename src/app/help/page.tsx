'use client';

import React from 'react';
import Link from 'next/link';
import { SimpleHeader } from '@/shared/components';

export default function HelpPage() {
  console.log('📄 Help Page: Rendering How You Can Help page');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <SimpleHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            How You Can{' '}
            <span className="text-blue-600 dark:text-blue-400">Help</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join us in democratizing programming education. Every contribution,
            no matter how small, helps make programming accessible to more
            people around the world.
          </p>
        </div>

        {/* Why Help Section */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Why Your Help Matters
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Programming education is still a privilege in many parts of the
            world. By contributing to
            <span className="font-comfortaa"> easyloops</span>, you&apos;re
            helping to break down barriers and create opportunities for people
            who might otherwise never have access to quality programming
            education.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Global Impact
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Your contributions reach learners worldwide, regardless of their
                location or background.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Open Source
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Everything we build is open source, ensuring transparency and
                community ownership.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Innovation
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Help shape the future of programming education with cutting-edge
                approaches.
              </p>
            </div>
          </div>
        </div>

        {/* Ways to Help */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mb-12">
          {/* Development */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-4">💻</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Contribute Code
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Help us build and improve the platform. Whether you&apos;re a
              frontend, backend, or full-stack developer, there are
              opportunities to contribute.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 mb-6">
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Fix bugs and improve existing features</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Add new programming languages</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Improve the user interface and experience</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Optimize performance and scalability</span>
              </li>
            </ul>
            <Link
              href="https://github.com/iarunsaragadam/easyloops"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              View on GitHub
              <svg
                className="w-4 h-4 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </Link>
          </div>

          {/* Content Creation */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Create Content
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Help us expand our educational content. Whether you&apos;re an
              experienced developer or educator, your knowledge can help others
              learn.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 mb-6">
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Write programming exercises and problems</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Create tutorials and learning materials</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Review and improve existing content</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Translate content into different languages</span>
              </li>
            </ul>
            <Link
              href="/questions"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Browse Current Problems
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
            </Link>
          </div>

          {/* Community Support */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-4">🤝</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Support the Community
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Help other learners by sharing your knowledge and experience. Your
              guidance can make a huge difference in someone&apos;s learning
              journey.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 mb-6">
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Answer questions in our community forums</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Mentor new learners</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Share your learning journey and tips</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Help moderate discussions</span>
              </li>
            </ul>
            <Link
              href="/about"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Learn More About Us
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
            </Link>
          </div>

          {/* Spread the Word */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-4">📢</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Spread the Word
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Help us reach more learners by sharing{' '}
              <span className="font-comfortaa">easyloops</span> with your
              network. Every share helps someone discover free programming
              education.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 mb-6">
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Share on social media</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Recommend to friends and colleagues</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Write blog posts or reviews</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Present at meetups or conferences</span>
              </li>
            </ul>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/intent/tweet?text=Check%20out%20easyloops%20-%20free%20programming%20education%20for%20everyone!&url=https://github.com/iarunsaragadam/easyloops"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https://github.com/iarunsaragadam/easyloops"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Getting Started
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl mb-3">1️⃣</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Choose Your Path
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Decide how you&apos;d like to contribute based on your skills
                and interests.
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-3">2️⃣</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Join the Community
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Connect with other contributors and get familiar with our
                processes.
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-3">3️⃣</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Start Contributing
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Begin with small contributions and gradually take on larger
                projects.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Every contribution, no matter how small, helps us move closer to our
            goal of democratizing programming education for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://github.com/iarunsaragadam/easyloops"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg text-lg transition-colors duration-200"
            >
              Start Contributing
            </Link>
            <Link
              href="/questions"
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold py-3 px-6 sm:px-8 rounded-lg text-lg border-2 border-blue-600 dark:border-blue-400 transition-colors duration-200"
            >
              Explore Problems
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
