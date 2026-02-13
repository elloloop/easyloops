'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileNavigationProps {
  className?: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [navigating, setNavigating] = useState<string | null>(null);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { href: '/questions', label: 'Problems' },
    { href: '/about', label: 'About' },
    { href: '/vision', label: 'Vision' },
    { href: '/mission', label: 'Mission' },
    { href: '/help', label: 'Help' },
  ];

  const isActive = (href: string) => {
    if (!pathname) return false; // Handle null pathname
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const toggleMenu = () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `📱 Mobile Navigation: ${isOpen ? 'Closing' : 'Opening'} mobile menu`
      );
    }
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('📱 Mobile Navigation: Closing mobile menu');
    }
    setIsOpen(false);
    buttonRef.current?.focus(); // Return focus to button for accessibility
  };

  const handleNavigation = (href: string, label: string) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`🔗 Mobile Navigation: Navigating to ${label} (${href})`);
    }
    setNavigating(href); // Show loading state
    closeMenu();
  };

  // Focus management and keyboard support
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll('a, button');
      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeMenu();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  // Reset navigating state after navigation
  useEffect(() => {
    setNavigating(null); // Clear on pathname change
  }, [pathname]);

  return (
    <div className={`md:hidden ${className}`}>
      {/* Hamburger Button */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg z-50"
        >
          <nav className="px-4 py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={item.href === '/questions'} // Preload /questions page
                onClick={() => handleNavigation(item.href, item.label)}
                className={`relative block px-4 py-3 text-sm font-medium transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                  isActive(item.href)
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-700 dark:text-gray-300'
                } ${navigating === item.href ? 'opacity-50 pointer-events-none' : ''}`}
              >
                {item.label}
                {navigating === item.href && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNavigation;
