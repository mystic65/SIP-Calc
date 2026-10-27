import React from 'react';
import { ShieldAlert, AlertCircle, Info, Calculator, TrendingUp, HelpCircle, ArrowRight } from 'lucide-react';

interface FinancialDisclaimerViewProps {
  onNavigateCalculator: (id: string) => void;
}

export const FinancialDisclaimerView: React.FC<FinancialDisclaimerViewProps> = ({
  onNavigateCalculator,
}) => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-2 text-slate-800 dark:text-slate-200">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Statutory Disclosure</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Financial &amp; Investment Disclaimer
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Clear transparency regarding the formulas, mathematical assumptions, and regulatory limitations of FinGrow calculators.
        </p>
      </div>

      {/* Primary Mandated Disclaimer Hero Card */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-slate-900 border-2 border-amber-300 dark:border-amber-700/80 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <AlertCircle className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-amber-950 dark:text-amber-200">
              Mandatory Regulatory Statement
            </h2>
            <blockquote className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 italic border-l-4 border-amber-500 pl-4 py-1 leading-relaxed">
              &ldquo;FinGrow provides educational and informational financial calculators. Results are estimates based on user inputs and assumed rates of return. Actual mutual fund returns are market-linked, fluctuate over time, and are not guaranteed. Calculator results should not be treated as personalized investment advice or a recommendation to buy or sell any financial product.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>

      {/* Detailed Explanation of Assumptions */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-8 shadow-xs">
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>1. Core Mathematical Assumptions &amp; Model Limitations</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Every simulation rendered on this platform is built on deterministic compound interest formulas. When examining projected corpus values, please consider the following underlying assumptions:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-300">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-white block">Constant Rate of Return vs. Real Market Volatility</span>
              <p className="leading-relaxed">
                Calculators assume a flat, uniform annualized return (e.g., 12% or 15% every single year). In real equity markets (Nifty 50, BSE Sensex, Midcap, Smallcap), returns are deeply non-linear. A fund might deliver +35% in Year 1, -12% in Year 2, and +8% in Year 3.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-white block">Compounding Intervals</span>
              <p className="leading-relaxed">
                SIP calculators assume monthly compounding with installments credited at the start of each month. Mutual fund Net Asset Values (NAVs) fluctuate daily based on underlying securities and cash holdings.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-white block">Systematic Withdrawal Plan (SWP) Mechanics</span>
              <p className="leading-relaxed">
                In SWP simulations, withdrawals are subtracted on a monthly cadence before calculating the remaining balance&apos;s interest. The simulation does not account for bear market drawdowns occurring in the early retirement years (Sequence of Returns Risk).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-white block">Inflation &amp; Purchasing Power</span>
              <p className="leading-relaxed">
                Nominal projected sums (e.g. ₹5 Crores in 30 years) must be evaluated in terms of future purchasing power. At an average inflation rate of 6% to 7% per year, ₹5 Crores in 30 years will have the purchasing power of approximately ₹65 to ₹75 Lakhs today.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Taxation & Expense Ratios */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>2. Taxes, Fund Charges &amp; Expenses</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Unless an advanced tax or inflation parameter is explicitly selected by the user, gross calculator results do not deduct:
          </p>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed">
            <li><strong>Total Expense Ratio (TER):</strong> Mutual fund asset management fees, registrar fees, and marketing costs charged inside the fund NAV.</li>
            <li><strong>Securities Transaction Tax (STT) &amp; Stamp Duty:</strong> Statutory levies applied to equity and mutual fund unit transactions in India.</li>
            <li><strong>Capital Gains Taxes:</strong> As per Indian tax laws (amended July 2024), Long Term Capital Gains (LTCG) on equity funds are taxable at 12.5% on gains exceeding ₹1.25 Lakh per financial year. Short Term Capital Gains (STCG) are taxed at 20%.</li>
            <li><strong>Exit Loads:</strong> Penalties charged by mutual fund schemes if units are redeemed prior to a specified threshold (e.g., within 365 days).</li>
          </ul>
        </section>

        {/* Section 3: Recommendation */}
        <section className="space-y-3 pt-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>3. No Offer or Investment Recommendation</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            References to popular fund houses (such as SBI, HDFC, ICICI, Nippon, or Parag Parikh) or historical benchmark returns (12–15%) are provided strictly as contextual illustrations of broad market benchmarks. They do not constitute an endorsement, recommendation, or ranking of any specific scheme or asset manager.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigateCalculator('sip')}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Back to SIP Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateCalculator('swp')}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Back to SWP Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
