'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';

interface MobileNavigationProps {
  className?: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/questions', label: 'Problems' },
    { href: '/about', label: 'About' },
    { href: '/vision', label: 'Vision' },
    { href: '/mission', label: 'Mission' },
    { href: '/help', label: 'Help' },
  ];

  const isActive = (href: string) => {
    if (!pathname) {
      return false; // Handle null pathname
    }
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        console.log('📱 Mobile Navigation: Opening mobile menu');
      } else {
        console.log('📱 Mobile Navigation: Closing mobile menu');
      }
      return next;
    });
  };

  const closeMenu = () => {
    setIsOpen(false);
    console.log('📱 Mobile Navigation: Closing mobile menu');
  };

  const handleNavigation = (href: string, label: string) => {
    console.log(`🔗 Mobile Navigation: Navigating to ${label} (${href})`);
    closeMenu();
  };

  return (
    <div className={`relative md:hidden ${className}`}>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle navigation menu"
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
        <MobileMenuPortal>
          <div
            className="fixed inset-0 top-[64px] z-40 bg-black/10 md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />

          <div className="fixed left-0 top-[64px] w-full bg-gray-900 bg-opacity-95 z-50 overflow-auto max-h-[calc(100vh-64px)] md:hidden">
            <nav className="w-full px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavigation(item.href, item.label)}
                  className={`block w-full px-4 py-3 text-lg font-medium hover:transition-colors duration-200 ${
                    {
                      // placeholder to satisfy template literal formatting
                    }
                  } ${
                    isActive(item.href)
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-white hover:text-blue-300'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </MobileMenuPortal>
      )}
    </div>
  );
};

export default MobileNavigation;

// Portal wrapper component to render menu into document.body on the client.
function MobileMenuPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const portalRoot = document.body;

  return createPortal(<>{children}</>, portalRoot);
}
