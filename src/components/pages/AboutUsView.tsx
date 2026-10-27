import React from 'react';
import { TrendingUp, ShieldCheck, BookOpen, Target, Calculator, PieChart, Sparkles, Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutUsViewProps {
  onNavigateCalculator: (id: string) => void;
  onNavigateEducation: (articleId?: string) => void;
}

export const AboutUsView: React.FC<AboutUsViewProps> = ({
  onNavigateCalculator,
  onNavigateEducation,
}) => {
  return (
    <div className="space-y-10 max-w-4xl mx-auto py-2">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Independent Financial Literacy &amp; Simulation Platform</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About <span className="text-emerald-600 dark:text-emerald-400">FinGrow</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          FinGrow is an independent educational tool suite dedicated to bringing mathematical clarity, compounding literacy, and unbiased financial planning tools to everyday investors.
        </p>
      </div>

      {/* Core Mission Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <TrendingUp className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">Our Founding Mission</h2>
          </div>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            Financial decisions shouldn&apos;t be obscured by opaque formulas or aggressive sales pitches. At FinGrow, we provide intuitive, high-precision simulators that empower individuals to map out long-term compounding, stress-test retirement cash flows, and take informed ownership of their financial future.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-emerald-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free &amp; Unbiased
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Client-Side Privacy
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No Mandatory Registration
            </span>
          </div>
        </div>
      </div>

      {/* Independent Educational Status Notice */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2.5 text-amber-900 dark:text-amber-300 font-bold text-sm sm:text-base">
          <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>Independent Educational Tool &amp; Non-Advisory Disclosure</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-950/90 dark:text-amber-200/90 leading-relaxed">
          FinGrow is an independent computational utility and financial education resource. We are <strong>not</strong> a SEBI-registered investment advisor (RIA), broker, asset management company (AMC), or portfolio manager. FinGrow does not sell securities, distribute mutual funds, solicit investments, or execute transactions.
        </p>
        <p className="text-xs sm:text-sm text-amber-950/90 dark:text-amber-200/90 leading-relaxed">
          <strong>Important:</strong> FinGrow does not guarantee investment returns. All figures produced by our calculators are mathematical simulations based on assumptions provided by the user and constant rates of return. Real financial markets are volatile, subject to macroeconomic cycles, inflation, and unpredictable drawdowns. Past simulated performance is never a guarantee of future real-world outcomes.
        </p>
      </div>

      {/* What FinGrow Provides */}
      <div className="space-y-6">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Comprehensive Suite of Financial Planning Tools
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            FinGrow provides a diverse collection of computational models tailored for Indian investors:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-2 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Systematic Investment Plan (SIP)
              </h3>
              <button
                onClick={() => onNavigateCalculator('sip')}
                className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1"
              >
                Launch <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Visualize rupee-cost averaging and long-term compounding up to 100 years. Includes step-up increments, inflation-adjusted purchasing power, and downloadable amortization schedules.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-2 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <PieChart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Systematic Withdrawal Plan (SWP)
              </h3>
              <button
                onClick={() => onNavigateCalculator('swp')}
                className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1"
              >
                Launch <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Engineered for retirees and financial independence seekers. Model regular monthly cash inflows from an accumulated corpus, analyze capital longevity, and test depletion risks.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-2 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Goal SIP &amp; Retirement Planner
              </h3>
              <button
                onClick={() => onNavigateCalculator('goal')}
                className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1"
              >
                Launch <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Reverse-engineer your financial targets. Enter your dream corpus (e.g., child&apos;s higher education, home down payment, retirement fund) to compute the exact monthly SIP needed.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-2 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Loan EMI &amp; Debt Amortization
              </h3>
              <button
                onClick={() => onNavigateCalculator('home_loan')}
                className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1"
              >
                Launch <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Compute precise principal-to-interest breakdowns for Home Loans and Car Loans using standard reducing-balance formulas. Compare pre-payment strategies and interest savings.
            </p>
          </div>
        </div>
      </div>

      {/* Educational Dedication */}
      <div className="bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-lg">
          <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>Commitment to High-Quality Financial Education</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Calculators are only as valuable as the understanding of the person using them. FinGrow publishes original educational guides explaining critical concepts such as the Rule of 72, the 8-4-3 compounding phenomenon, sequence of returns risk, and the impact of inflation on purchasing power.
        </p>
        <div>
          <button
            type="button"
            onClick={() => onNavigateEducation()}
            className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Explore Educational Guides</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
