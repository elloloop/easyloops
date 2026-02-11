'use client';

import React from 'react';
import Link from 'next/link';
import { SimpleHeader } from '@/shared/components';

export default function MissionPage() {
  console.log('📄 Mission Page: Rendering Mission page');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <SimpleHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our{' '}
            <span className="text-blue-600 dark:text-blue-400">Mission</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            To democratize programming education by making it accessible,
            interactive, comprehensive, modern, and community-driven for
            everyone.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Breaking Down Barriers
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            In a world where programming education is often expensive,
            fragmented, or inaccessible, easyloops bridges the gap by providing
            a comprehensive, free platform that serves learners at every level.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                💰 Financial Accessibility
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Completely free platform with no paywalls, premium features, or
                hidden costs. Quality education should not be a privilege.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🌐 Global Reach
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Available to anyone with internet access, regardless of their
                location, background, or educational history.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Progressive Learning
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our structured curriculum builds knowledge step-by-step, ensuring
              that learners develop a solid foundation before moving to advanced
              concepts.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>200+ carefully sequenced exercises</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Clear learning objectives for each problem</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Comprehensive test cases for validation</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Contextual hints to guide learning</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Real-World Application
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Practical exercises that mirror industry scenarios, helping
              learners develop skills that are immediately applicable in
              professional settings.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Industry-standard coding practices</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Test-driven development approach</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Performance and optimization focus</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Modern development workflows</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Excellence
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We maintain the highest standards in educational content, code
                quality, and user experience.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Inclusivity
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We welcome learners from all backgrounds and create an
                environment where everyone can thrive.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Innovation
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We continuously evolve our platform with cutting-edge
                technologies and pedagogical approaches.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🌱</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Growth
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We believe in continuous learning and improvement, both for our
                users and our platform.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🔓</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Openness
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We are committed to open-source principles and transparent
                development.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Empowerment
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We empower learners to take control of their education and
                career paths.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Community-Driven Development
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            easyloops is powered by contributions from developers worldwide. Our
            mission extends beyond just providing education—we&apos;re building
            a community of learners, educators, and developers who share our
            vision.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                👥 For Developers, By Developers
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our content is created and reviewed by experienced developers
                who understand the challenges and needs of learners at every
                level.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🔄 Continuous Improvement
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We actively seek feedback from our community to improve our
                platform, content, and learning experience.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Be Part of Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join thousands of learners who have improved their programming
            skills with easyloops. Start your journey today.
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
              href="/about"
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold py-3 px-6 sm:px-8 rounded-lg text-lg border-2 border-blue-600 dark:border-blue-400 transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
