import React, { useState, useRef } from 'react';
import { TrendingUp, Share2, Check, Moon, Sun, BookOpen, Info, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeaderProps {
  activeCalculator: string;
  onSelectCalculator: (id: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCalculator,
  onSelectCalculator,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [copied, setCopied] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  const primaryCalculators = [
    { id: 'sip', label: 'SIP' },
    { id: 'swp', label: 'SWP' },
    { id: 'stepup', label: 'Step-Up' },
    { id: 'lumpsum', label: 'Lumpsum' },
    { id: 'goal', label: 'Goal' },
    { id: 'home_loan', label: 'Loan EMI' },
  ];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getBreadcrumbTitle = () => {
    switch (activeCalculator) {
      case 'sip':
        return 'SIP CALCULATOR';
      case 'swp':
        return 'SWP CALCULATOR';
      case 'stepup':
        return 'STEP-UP SIP CALCULATOR';
      case 'lumpsum':
        return 'LUMPSUM CALCULATOR';
      case 'goal':
      case 'mf_returns':
        return 'GOAL SIP CALCULATOR';
      case 'home_loan':
        return 'HOME LOAN EMI CALCULATOR';
      case 'car_loan':
        return 'CAR LOAN EMI CALCULATOR';
      case 'fd':
        return 'FD CALCULATOR';
      case 'nps':
        return 'NPS CALCULATOR';
      case 'about':
        return 'ABOUT US';
      case 'contact':
        return 'CONTACT US';
      case 'privacy':
        return 'PRIVACY POLICY';
      case 'terms':
        return 'TERMS OF USE';
      case 'disclaimer':
        return 'FINANCIAL DISCLAIMER';
      case 'education':
        return 'EDUCATIONAL RESOURCES';
      default:
        return 'FINANCIAL CALCULATOR';
    }
  };

  const scrollMobileNav = (direction: 'left' | 'right') => {
    if (mobileNavRef.current) {
      const scrollAmount = direction === 'left' ? -150 : 150;
      mobileNavRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const isEducationalOrLegal = ['about', 'contact', 'privacy', 'terms', 'disclaimer', 'education'].includes(activeCalculator);

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 transition-colors duration-200">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          {/* Brand Wordmark & Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
            onClick={() => onSelectCalculator('sip')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-700 to-indigo-900 flex items-center justify-center text-white shadow-xs">
              <TrendingUp className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Fin<span className="text-emerald-600 dark:text-emerald-400">Grow</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-1.5 py-0.2 rounded">
                  Calculators
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-400 dark:text-slate-400 -mt-0.5 tracking-wide">
                Smart Mutual Fund &amp; Wealth Analytics
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs - Modern Pill Bar without any native scrollbars */}
          <nav className="hidden lg:flex items-center gap-1.5 py-1">
            <div className="flex items-center bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
              {primaryCalculators.map((calc) => {
                const isActive = activeCalculator === calc.id;
                return (
                  <button
                    key={calc.id}
                    type="button"
                    onClick={() => onSelectCalculator(calc.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                    }`}
                  >
                    {calc.label}
                  </button>
                );
              })}
            </div>

            {/* Educational Resources Tab */}
            <button
              type="button"
              onClick={() => onSelectCalculator('education')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCalculator === 'education'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/80'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Education</span>
            </button>
          </nav>

          {/* Right Actions: About + Contact + Dark Mode + Share */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick links to About & Contact on desktop */}
            <div className="hidden md:flex items-center gap-1 border-r border-slate-200 dark:border-slate-800 pr-2 mr-1">
              <button
                type="button"
                onClick={() => onSelectCalculator('about')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeCalculator === 'about'
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                About
              </button>
              <button
                type="button"
                onClick={() => onSelectCalculator('contact')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeCalculator === 'contact'
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Contact
              </button>
            </div>

            {/* Dark Mode Toggle Button */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors cursor-pointer"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            {/* Share Tool Button */}
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors cursor-pointer"
              title="Share Calculator"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold hidden sm:inline">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Navigation: Modern swipeable bar with completely hidden scrollbars */}
        <div className="lg:hidden relative border-t border-slate-100 dark:border-slate-800">
          <div
            ref={mobileNavRef}
            className="flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {primaryCalculators.map((calc) => {
              const isActive = activeCalculator === calc.id;
              return (
                <button
                  key={calc.id}
                  type="button"
                  onClick={() => onSelectCalculator(calc.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-emerald-600'
                      : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {calc.label}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => onSelectCalculator('education')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 flex items-center gap-1 cursor-pointer ${
                activeCalculator === 'education'
                  ? 'bg-emerald-600 text-white'
                  : 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800'
              }`}
            >
              <BookOpen className="w-3 h-3" />
              <span>Education</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectCalculator('about')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                activeCalculator === 'about'
                  ? 'bg-slate-900 text-white dark:bg-emerald-600'
                  : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800'
              }`}
            >
              About
            </button>

            <button
              type="button"
              onClick={() => onSelectCalculator('contact')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                activeCalculator === 'contact'
                  ? 'bg-slate-900 text-white dark:bg-emerald-600'
                  : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800'
              }`}
            >
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb row */}
      <div className="bg-slate-50/80 dark:bg-slate-950/60 border-t border-slate-200/70 dark:border-slate-800 py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <button
            type="button"
            onClick={() => onSelectCalculator('sip')}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-slate-600 dark:text-slate-400">
            {isEducationalOrLegal ? 'Information' : 'Calculators'}
          </span>
          <span>/</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200 tracking-wide uppercase">
            {getBreadcrumbTitle()}
          </span>
        </div>
      </div>
    </header>
  );
};
