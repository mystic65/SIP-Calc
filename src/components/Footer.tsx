import React from 'react';
import { ShieldCheck, TrendingUp, BookOpen, Scale, Mail, Info, FileText, AlertTriangle } from 'lucide-react';

interface FooterProps {
  onSelectView?: (viewId: string, options?: { articleId?: string }) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectView }) => {
  const handleNav = (viewId: string, options?: { articleId?: string }) => {
    if (onSelectView) {
      onSelectView(viewId, options);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-3">
            <div
              className="flex items-center gap-2 cursor-pointer inline-flex"
              onClick={() => handleNav('sip')}
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                <TrendingUp className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-white font-extrabold text-base tracking-tight">
                Fin<span className="text-emerald-400">Grow</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              FinGrow is an independent educational platform providing high-precision calculators and resources for SIP, SWP, compounding growth, goal planning, and loan EMI calculations.
            </p>
            <div className="pt-2 text-[11px] text-slate-500">
              Free &bull; Client-Side Privacy &bull; Unbiased
            </div>
          </div>

          {/* Col 2: Calculators */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-3 flex items-center gap-1.5">
              <span>Financial Calculators</span>
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('sip')}
                  className="hover:text-emerald-400 text-slate-400 transition-colors text-left cursor-pointer"
                >
                  SIP Calculator (Monthly Investment)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('swp')}
                  className="hover:text-emerald-400 text-slate-400 transition-colors text-left cursor-pointer"
                >
                  SWP Calculator (Systematic Withdrawal)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('stepup')}
                  className="hover:text-emerald-400 text-slate-400 transition-colors text-left cursor-pointer"
                >
                  Step-Up SIP Calculator (Annual Top-up)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('lumpsum')}
                  className="hover:text-emerald-400 text-slate-400 transition-colors text-left cursor-pointer"
                >
                  Lumpsum Mutual Fund Calculator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('goal')}
                  className="hover:text-emerald-400 text-slate-400 transition-colors text-left cursor-pointer"
                >
                  Goal SIP &amp; Target Wealth Planner
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('home_loan')}
                  className="hover:text-emerald-400 text-slate-400 transition-colors text-left cursor-pointer"
                >
                  Home Loan &amp; Car Loan EMI Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Educational Resources */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-3 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Educational Resources</span>
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('education', { articleId: 'what-is-sip' })}
                  className="hover:text-emerald-400 text-slate-400 transition-colors text-left cursor-pointer"
                >
                  What is a Systematic Investment Plan (SIP)?
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('education', { articleId: 'what-is-swp' })}
                  className="hover:text-emerald-400 text-slate-400 transition-colors text-left cursor-pointer"
                >
                  What is a Systematic Withdrawal Plan (SWP)?
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('education', { articleId: 'how-compound-growth-works' })}
                  className="hover:text-emerald-400 text-slate-400 transition-colors text-left cursor-pointer"
                >
                  How Does Compound Growth Work?
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('education', { articleId: 'inflation-retirement-planning' })}
                  className="hover:text-emerald-400 text-slate-400 transition-colors text-left cursor-pointer"
                >
                  How Does Inflation Affect Retirement?
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('education', { articleId: 'how-to-use-mutual-fund-calculator' })}
                  className="hover:text-emerald-400 text-slate-400 transition-colors text-left cursor-pointer"
                >
                  How to Use a Mutual Fund Calculator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('education', { articleId: 'interpreting-returns-and-risk' })}
                  className="hover:text-emerald-400 text-slate-400 transition-colors text-left cursor-pointer"
                >
                  Interpreting Projected Returns &amp; Risk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & Legal */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-3 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              <span>Company &amp; Legal</span>
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className="hover:text-emerald-400 text-slate-400 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <Info className="w-3 h-3 text-emerald-500" />
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className="hover:text-emerald-400 text-slate-400 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <Mail className="w-3 h-3 text-emerald-500" />
                  <span>Contact Us</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('privacy')}
                  className="hover:text-emerald-400 text-slate-400 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="w-3 h-3 text-emerald-500" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('terms')}
                  className="hover:text-emerald-400 text-slate-400 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <Scale className="w-3 h-3 text-emerald-500" />
                  <span>Terms of Use</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('disclaimer')}
                  className="hover:text-emerald-400 text-slate-400 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <AlertTriangle className="w-3 h-3 text-amber-500" />
                  <span>Financial Disclaimer</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Verbatim Mandatory Disclaimer Section in Footer */}
        <div className="pt-6 border-t border-slate-800 text-[11px] leading-relaxed text-slate-400 space-y-2 bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wide">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>FinGrow Mandatory Disclaimer</span>
          </div>
          <p className="text-slate-300">
            &ldquo;FinGrow provides educational and informational financial calculators. Results are estimates based on user inputs and assumed rates of return. Actual mutual fund returns are market-linked, fluctuate over time, and are not guaranteed. Calculator results should not be treated as personalized investment advice or a recommendation to buy or sell any financial product.&rdquo;
          </p>
          <div className="pt-1 flex flex-wrap gap-4 text-[10px] text-slate-500">
            <span>Mathematical calculations assume uniform compounding intervals.</span>
            <span>Non-advisory educational platform.</span>
            <button
              type="button"
              onClick={() => handleNav('disclaimer')}
              className="text-emerald-400 hover:underline cursor-pointer"
            >
              Read full disclosure &rarr;
            </button>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div>
            &copy; {new Date().getFullYear()} FinGrow Financial Calculators. All rights reserved.
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <button type="button" onClick={() => handleNav('privacy')} className="hover:text-slate-300 cursor-pointer">
              Privacy Policy
            </button>
            <span>&bull;</span>
            <button type="button" onClick={() => handleNav('terms')} className="hover:text-slate-300 cursor-pointer">
              Terms of Use
            </button>
            <span>&bull;</span>
            <button type="button" onClick={() => handleNav('disclaimer')} className="hover:text-slate-300 cursor-pointer">
              Disclaimer
            </button>
            <span>&bull;</span>
            <button type="button" onClick={() => handleNav('contact')} className="hover:text-slate-300 cursor-pointer">
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
