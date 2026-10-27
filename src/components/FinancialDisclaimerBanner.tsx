import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, ShieldAlert, ExternalLink } from 'lucide-react';

interface FinancialDisclaimerBannerProps {
  onNavigateToFullDisclaimer?: () => void;
  calculatorName?: string;
}

export const FinancialDisclaimerBanner: React.FC<FinancialDisclaimerBannerProps> = ({
  onNavigateToFullDisclaimer,
  calculatorName,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-800/80 rounded-xl p-4 text-xs text-amber-950 dark:text-amber-200 transition-colors">
      <div className="flex items-start gap-3">
        <div className="p-1 rounded-md bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 shrink-0 mt-0.5">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="font-bold text-[12px] uppercase tracking-wider text-amber-900 dark:text-amber-300">
              Mandatory Financial &amp; Indicative Disclaimer
            </span>
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 dark:text-amber-300 hover:text-amber-950 dark:hover:text-amber-100 cursor-pointer"
            >
              <span>{isExpanded ? 'Hide Assumptions' : 'View Assumptions & Scope'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          <p className="leading-relaxed text-amber-900/90 dark:text-amber-200/90 font-medium">
            &ldquo;FinGrow provides educational and informational financial calculators. Results are estimates based on user inputs and assumed rates of return. Actual mutual fund returns are market-linked, fluctuate over time, and are not guaranteed. Calculator results should not be treated as personalized investment advice or a recommendation to buy or sell any financial product.&rdquo;
          </p>

          {isExpanded && (
            <div className="pt-3 mt-2 border-t border-amber-200 dark:border-amber-800/80 space-y-2 text-[11px] text-amber-900/80 dark:text-amber-300/90">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white/60 dark:bg-slate-900/60 p-2.5 rounded-lg border border-amber-100 dark:border-amber-900/50">
                  <span className="font-semibold block text-amber-950 dark:text-amber-200 mb-0.5">
                    Assumptions &amp; Compound Mechanics:
                  </span>
                  Calculations assume a constant annual rate of return compounded periodically. In actual stock and debt markets, volatility, market corrections, and economic cycles cause returns to deviate significantly from annualized averages.
                </div>
                <div className="bg-white/60 dark:bg-slate-900/60 p-2.5 rounded-lg border border-amber-100 dark:border-amber-900/50">
                  <span className="font-semibold block text-amber-950 dark:text-amber-200 mb-0.5">
                    Taxes, Charges &amp; Inflation:
                  </span>
                  Unless explicitly enabled via advanced options, nominal figures do not account for applicable Long Term Capital Gains (LTCG), Short Term Capital Gains (STCG), exit loads, expense ratios (TER), or purchasing power erosion.
                </div>
              </div>

              {onNavigateToFullDisclaimer && (
                <div className="pt-1 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={onNavigateToFullDisclaimer}
                    className="inline-flex items-center gap-1 font-semibold text-emerald-800 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    <span>Read FinGrow Comprehensive Financial Disclaimer</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
