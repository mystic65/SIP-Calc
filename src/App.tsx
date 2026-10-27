/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SidebarCalculators } from './components/SidebarCalculators';
import { SIPCalculatorView } from './components/SIPCalculatorView';
import { SWPCalculatorView } from './components/SWPCalculatorView';
import { LumpsumCalculatorView } from './components/LumpsumCalculatorView';
import { StepUpSIPCalculatorView } from './components/StepUpSIPCalculatorView';
import { GoalSIPCalculatorView } from './components/GoalSIPCalculatorView';
import { LoanEMICalculatorView } from './components/LoanEMICalculatorView';
import { TheaAssistantModal } from './components/TheaAssistantModal';
import { Footer } from './components/Footer';
import { AboutUsView } from './components/pages/AboutUsView';
import { ContactUsView } from './components/pages/ContactUsView';
import { PrivacyPolicyView } from './components/pages/PrivacyPolicyView';
import { TermsOfUseView } from './components/pages/TermsOfUseView';
import { FinancialDisclaimerView } from './components/pages/FinancialDisclaimerView';
import { EducationalResourcesView } from './components/pages/EducationalResourcesView';
import { Headphones } from 'lucide-react';

export default function App() {
  const [activeCalculator, setActiveCalculator] = useState<string>('sip');
  const [selectedAmc, setSelectedAmc] = useState<string | undefined>(undefined);
  const [amcRate, setAmcRate] = useState<number | undefined>(undefined);
  const [selectedArticleId, setSelectedArticleId] = useState<string | undefined>(undefined);

  // Dark mode state with localStorage persistence and system preference fallback
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('fingrow_theme');
      if (savedTheme === 'dark') return true;
      if (savedTheme === 'light') return false;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('fingrow_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('fingrow_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // THEA FAQ modal
  const [isTheaOpen, setIsTheaOpen] = useState(false);

  const handleSelectCalculator = (id: string, options?: { amcName?: string; defaultRate?: number; articleId?: string }) => {
    setActiveCalculator(id);
    if (options?.amcName) {
      setSelectedAmc(options.amcName);
      setAmcRate(options.defaultRate);
    } else {
      setSelectedAmc(undefined);
      setAmcRate(undefined);
    }

    if (options?.articleId) {
      setSelectedArticleId(options.articleId);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isStandalonePage = ['about', 'contact', 'privacy', 'terms', 'disclaimer', 'education'].includes(activeCalculator);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Top Header: FinGrow brand + Navigation + Theme toggle + Share */}
      <Header
        activeCalculator={activeCalculator}
        onSelectCalculator={handleSelectCalculator}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {isStandalonePage ? (
          /* Full-width standalone view for articles and legal pages */
          <div className="w-full">
            {activeCalculator === 'about' && (
              <AboutUsView
                onNavigateCalculator={handleSelectCalculator}
                onNavigateEducation={(artId) => handleSelectCalculator('education', { articleId: artId })}
              />
            )}

            {activeCalculator === 'contact' && (
              <ContactUsView />
            )}

            {activeCalculator === 'privacy' && (
              <PrivacyPolicyView />
            )}

            {activeCalculator === 'terms' && (
              <TermsOfUseView />
            )}

            {activeCalculator === 'disclaimer' && (
              <FinancialDisclaimerView
                onNavigateCalculator={handleSelectCalculator}
              />
            )}

            {activeCalculator === 'education' && (
              <EducationalResourcesView
                onNavigateCalculator={handleSelectCalculator}
                initialArticleId={selectedArticleId}
              />
            )}
          </div>
        ) : (
          /* Two-column layout for calculators and sidebar */
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Main Calculator Center View */}
            <div className="flex-1 w-full min-w-0">
              {activeCalculator === 'sip' && (
                <SIPCalculatorView
                  initialRate={amcRate || 15}
                  amcPreset={selectedAmc}
                  onNavigateToDisclaimer={() => handleSelectCalculator('disclaimer')}
                />
              )}

              {activeCalculator === 'swp' && (
                <SWPCalculatorView
                  onNavigateToDisclaimer={() => handleSelectCalculator('disclaimer')}
                />
              )}

              {activeCalculator === 'lumpsum' && (
                <LumpsumCalculatorView
                  onNavigateToDisclaimer={() => handleSelectCalculator('disclaimer')}
                />
              )}

              {activeCalculator === 'stepup' && (
                <StepUpSIPCalculatorView
                  onNavigateToDisclaimer={() => handleSelectCalculator('disclaimer')}
                />
              )}

              {(activeCalculator === 'goal' || activeCalculator === 'mf_returns') && (
                <GoalSIPCalculatorView
                  onNavigateToDisclaimer={() => handleSelectCalculator('disclaimer')}
                />
              )}

              {activeCalculator === 'home_loan' && (
                <LoanEMICalculatorView
                  isCarLoan={false}
                  onNavigateToDisclaimer={() => handleSelectCalculator('disclaimer')}
                />
              )}

              {activeCalculator === 'car_loan' && (
                <LoanEMICalculatorView
                  isCarLoan={true}
                  onNavigateToDisclaimer={() => handleSelectCalculator('disclaimer')}
                />
              )}

              {(activeCalculator === 'fd' || activeCalculator === 'nps') && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
                    ₹
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                    {activeCalculator === 'fd' ? 'Fixed Deposit (FD) vs SIP Analysis' : 'National Pension System (NPS) Calculator'}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                    {activeCalculator === 'fd'
                      ? 'Bank FDs offer fixed interest, but after tax and inflation, real returns are often below 1%. Systematic Investment Plans (SIP) in diversified equity historically generate 12–15% CAGR over long horizons.'
                      : 'Plan your retirement pension and wealth accumulation with our comprehensive mutual fund calculators.'}
                  </p>
                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={() => handleSelectCalculator('sip')}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Switch to SIP Calculator
                    </button>
                    <button
                      onClick={() => handleSelectCalculator('swp')}
                      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Switch to SWP Calculator
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <SidebarCalculators
              activeCalculator={activeCalculator}
              onSelectCalculator={handleSelectCalculator}
            />
          </div>
        )}
      </main>

      {/* Floating THEA Virtual Assistant Button */}
      <aside aria-label="Virtual Assistant THEA" className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsTheaOpen(true)}
          className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
          aria-label="Open THEA Assistant"
        >
          <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-emerald-600 flex items-center justify-center text-white shadow-xs">
            <Headphones className="w-4 h-4 text-emerald-400 dark:text-white" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 dark:text-white leading-none">
              THEA
            </div>
            <div className="text-[9.5px] text-slate-500 dark:text-slate-400 font-medium">FinGrow Guide</div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -top-1 -right-1 ring-2 ring-white dark:ring-slate-900" />
        </button>
      </aside>

      {/* Modals */}
      <TheaAssistantModal
        isOpen={isTheaOpen}
        onClose={() => setIsTheaOpen(false)}
        activeCalculator={activeCalculator}
      />

      {/* Footer with all compliance, navigation, and legal links */}
      <Footer onSelectView={handleSelectCalculator} />
    </div>
  );
}
