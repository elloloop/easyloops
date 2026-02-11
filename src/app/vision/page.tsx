'use client';

import React from 'react';
import Link from 'next/link';
import { SimpleHeader } from '@/shared/components';

export default function VisionPage() {
  console.log('📄 Vision Page: Rendering Vision page');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <SimpleHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our <span className="text-blue-600 dark:text-blue-400">Vision</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            To democratize programming education and create a world where anyone
            can learn to code, regardless of their background, location, or
            financial situation.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            The Future We&apos;re Building
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🌍 Global Accessibility
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We envision a world where high-quality programming education is
                available to every corner of the globe. No more barriers based
                on geography, economic status, or educational background.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Our platform will support multiple languages, work offline, and
                be optimized for low-bandwidth connections to reach learners
                everywhere.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🎓 Personalized Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Every learner is unique, and our vision includes AI-powered
                adaptive learning that tailors the experience to individual
                needs, learning styles, and pace.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                From complete beginners to experienced developers looking to
                upskill, everyone will find a path that works for them.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Innovation Hub
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              A platform where cutting-edge programming concepts are introduced
              and explained in accessible ways, keeping learners ahead of
              industry trends.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-4">🤝</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Community-Driven
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              A vibrant community where learners become teachers, sharing
              knowledge and supporting each other&apos;s growth and development.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-4">💡</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Problem-Solving Focus
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Beyond syntax, we focus on developing critical thinking and
              problem-solving skills that are essential for real-world
              programming challenges.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Our Roadmap
          </h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Enhanced Learning Experience
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  AI-powered hints, personalized learning paths, and advanced
                  analytics to track progress and identify areas for
                  improvement.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Expanded Language Support
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Support for more programming languages, including Rust,
                  Kotlin, Swift, and domain-specific languages for specialized
                  fields.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Collaborative Features
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Pair programming, code reviews, and team challenges to foster
                  collaboration and peer learning.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Industry Integration
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Partnerships with tech companies to provide real-world
                  projects, internships, and job placement opportunities for
                  learners.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Join Us in Building the Future
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Whether you&apos;re a learner, educator, or developer, there&apos;s
            a place for you in our mission to democratize programming education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/questions"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg text-lg transition-colors duration-200"
            >
              Start Learning
            </Link>
            <Link
              href="/help"
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold py-3 px-6 sm:px-8 rounded-lg text-lg border-2 border-blue-600 dark:border-blue-400 transition-colors duration-200"
            >
              How You Can Help
            </Link>
            <Link
              href="/mission"
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold py-3 px-6 sm:px-8 rounded-lg text-lg border-2 border-blue-600 dark:border-blue-400 transition-colors duration-200"
            >
              Our Mission
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
