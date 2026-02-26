'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const pathname = usePathname();

  const navItems = [
    { href: '/questions', label: 'Problems' },
    { href: '/about', label: 'About' },
    { href: '/vision', label: 'Vision' },
    { href: '/mission', label: 'Mission' },
    { href: '/help', label: 'Help' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  const handleNavigation = (href: string, label: string) => {
    console.log(`🔗 Navigation: Navigating to ${label} (${href})`);
  };

  return (
    <nav className={`hidden md:flex items-center space-x-6 ${className}`}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => handleNavigation(item.href, item.label)}
          className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400 ${
            isActive(item.href)
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
