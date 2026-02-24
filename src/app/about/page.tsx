'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SimpleHeader } from '@/shared/components';

export default function AboutPage() {
  console.log('📄 About Page: Rendering About page');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <SimpleHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About{' '}
            <span className="text-blue-600 dark:text-blue-400 font-comfortaa">
              easyloops
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive interactive programming education platform designed
            to democratize programming education and make it accessible to
            everyone.
          </p>
        </div>

        {/* Letter from the Founder */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-12">
          <div className="text-left mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Why I&apos;m Building{' '}
              <span className="font-comfortaa">easyloops</span>
            </h2>
            <div className="flex items-center justify-start space-x-4 mb-4">
              <Image
                src="/images/arun-saragadam.jpg"
                alt="Arun Saragadam"
                width={64}
                height={64}
                className="rounded-full object-cover border-2 border-blue-600 shadow-sm"
                onError={() => {
                  // Fallback is handled by the parent component
                }}
              />
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Arun Saragadam
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Founder
                </p>
                <a
                  href="https://www.linkedin.com/in/iarunsaragadam/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              No matter the country—developed or developing—education has
              remained more accessible to those who can afford it. In developing
              nations, meaningful learning often comes only through private
              institutions. In developed ones, it&apos;s those with already
              educated parents or access to private tutoring who continue to
              thrive.
            </p>

            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              In many places, young students are told that success comes from
              getting expensive degrees and studying at big-name colleges.
              It&apos;s a powerful and appealing promise—that if you study
              there, you&apos;ll have a better life. But for many students,
              especially those from families with limited means, chasing that
              dream can be overwhelming. They take on big loans or make tough
              sacrifices, and the pressure to &ldquo;make it worth it&rdquo;
              often takes the joy out of learning. Education becomes more about
              paying a high price than discovering your potential.
            </p>

            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              <span className="font-comfortaa">easyloops</span> is my small but
              intentional step in the other direction. I believe programming is
              one of the rare skills that doesn&apos;t require expensive tools
              or years of academic background. With the right structure and
              guidance, it can be learned by anyone, anywhere.
            </p>

            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              I also believe that learning should happen in a language that
              feels natural. Making programming local and fun isn&apos;t just a
              feature—it&apos;s a principle. Because when learners understand
              the &ldquo;why&rdquo; in their own words, the &ldquo;how&rdquo;
              becomes much more accessible.
            </p>

            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              This isn&apos;t a replacement for formal education. It&apos;s a
              complement—a way to give more people a fair shot at a skill
              that&apos;s becoming essential across every field.
            </p>

            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 rounded-r-lg">
              <p className="text-xl font-bold text-blue-900 dark:text-blue-100 leading-relaxed text-center">
                Programming is logic. And logic belongs to everyone.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Our Story
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              easyloops was born from the recognition that programming education
              is often expensive, fragmented, or inaccessible to many aspiring
              developers. We believe that everyone should have access to
              high-quality programming education, regardless of their background
              or financial situation.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Our platform combines modern web technologies with pedagogical
              best practices to create an engaging, interactive learning
              experience that grows with you from your first &ldquo;Hello,
              World!&rdquo; to advanced system programming concepts.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              What We Offer
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>200+ interactive programming exercises</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>
                  Multi-language support (Python, Go, JavaScript, Java, C++)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Real-time code execution with instant feedback</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Progressive learning path from beginner to expert</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>Completely free and open-source</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Our Approach
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We believe in learning by doing. Each exercise is carefully designed
            to build upon previous concepts, ensuring a solid foundation before
            moving to more advanced topics. Our test-driven approach helps you
            understand not just how to write code, but how to write good,
            reliable code.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Focused Learning
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                One concept at a time, with clear objectives and outcomes
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Interactive Practice
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Write, test, and iterate with immediate feedback
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Progressive Growth
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Build skills systematically from fundamentals to advanced topics
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join thousands of learners who have improved their programming
            skills with easyloops.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/questions"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg text-lg transition-colors duration-200"
            >
              Browse Problems
            </Link>
            <Link
              href="/help"
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold py-3 px-6 sm:px-8 rounded-lg text-lg border-2 border-blue-600 dark:border-blue-400 transition-colors duration-200"
            >
              How You Can Help
            </Link>
            <Link
              href="/vision"
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold py-3 px-6 sm:px-8 rounded-lg text-lg border-2 border-blue-600 dark:border-blue-400 transition-colors duration-200"
            >
              Our Vision
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
