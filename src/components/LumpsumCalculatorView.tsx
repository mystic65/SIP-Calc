import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { calculateLumpsum, formatINR } from '../utils/calculatorMath';
import { InteractiveChart } from './InteractiveChart';
import { AmortizationTable } from './AmortizationTable';
import { FinancialDisclaimerBanner } from './FinancialDisclaimerBanner';

interface LumpsumCalculatorViewProps {
  onNavigateToDisclaimer?: () => void;
}

export const LumpsumCalculatorView: React.FC<LumpsumCalculatorViewProps> = ({
  onNavigateToDisclaimer,
}) => {
  const [investment, setInvestment] = useState<number>(100000); // 1 Lakh
  const [years, setYears] = useState<number>(10);
  const [rate, setRate] = useState<number>(12);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const result = calculateLumpsum(investment, years, rate);

  const chartData = result.yearlyBreakdown.map((row) => ({
    year: row.year,
    invested: result.investedAmount,
    total: row.closingBalance,
  }));

  const tableData = result.yearlyBreakdown.map((row) => ({
    year: row.year,
    openingBalance: row.openingBalance,
    investedOrWithdrawn: 0,
    returnsEarned: row.returnsEarnedThisYear,
    closingBalance: row.closingBalance,
  }));

  const copySummaryText = () => {
    const text = `FinGrow Lumpsum Calculation:\nOne-time Investment: ₹${investment.toLocaleString('en-IN')}\nDuration: ${years} Years\nRate: ${rate}%\nProfit: ₹${result.profit.toLocaleString('en-IN')}\nTotal Wealth: ₹${result.totalWealth.toLocaleString('en-IN')}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Lumpsum Calculator
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Calculate the expected compound returns on a one-time lump-sum mutual fund investment.
        </p>
      </div>

      {/* Mandatory Statutory Disclaimer Banner */}
      <FinancialDisclaimerBanner onNavigateToFullDisclaimer={onNavigateToDisclaimer} calculatorName="Lumpsum Calculator" />

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Investment Amount */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
              Total One-Time Investment
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 font-semibold text-base">
                ₹
              </span>
              <input
                type="number"
                min="1000"
                max="50000000"
                step="5000"
                value={investment || ''}
                onChange={(e) => setInvestment(Math.max(0, Number(e.target.value)))}
                className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 tabular-nums"
                placeholder="1,00,00,000"
              />
            </div>
            <input
              type="range"
              min="10000"
              max="2000000"
              step="10000"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex flex-wrap gap-1 pt-1">
              {[50000, 100000, 250000, 500000, 1000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setInvestment(amt)}
                  className={`text-[11px] px-2 py-0.5 rounded border transition-colors cursor-pointer tabular-nums ${
                    investment === amt
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-600 text-emerald-900 dark:text-emerald-300 font-semibold'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {formatINR(amt, { compact: true })}
                </button>
              ))}
            </div>
          </div>

          {/* Time Period up to 100 years */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Time Period (years)</span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">{years} Yrs</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="100"
                value={years || ''}
                onChange={(e) => setYears(Math.max(1, Math.min(100, Number(e.target.value))))}
                className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-emerald-500 rounded-lg text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 tabular-nums"
                placeholder="10"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-600 dark:text-emerald-400">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex flex-wrap gap-1 pt-1">
              {[5, 10, 20, 30, 50, 75, 100].map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setYears(y)}
                  className={`text-[10.5px] px-1.5 py-0.5 rounded border transition-colors cursor-pointer tabular-nums ${
                    years === y
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-600 text-emerald-900 dark:text-emerald-300 font-semibold'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {y}Y
                </button>
              ))}
            </div>
          </div>

          {/* Expected Return */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Expected Return % (p.a.)</span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">Annualized</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 font-semibold text-base">
                %
              </span>
              <input
                type="number"
                min="1"
                max="35"
                step="0.5"
                value={rate || ''}
                onChange={(e) => setRate(Math.max(1, Math.min(35, Number(e.target.value))))}
                className="w-full pl-9 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-emerald-500 rounded-lg text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 tabular-nums"
                placeholder="12"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-600 dark:text-emerald-400">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Primary Result Box */}
        <div className="mt-8 rounded-2xl border-2 border-emerald-500/70 dark:border-emerald-500/40 bg-gradient-to-b from-emerald-50/20 to-white dark:from-emerald-950/20 dark:to-slate-900 p-6 sm:p-8 text-center shadow-xs">
          <div className="max-w-md mx-auto space-y-2">
            <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
              Invested Amount: <span className="tabular-nums font-semibold text-slate-900 dark:text-white">{formatINR(result.investedAmount)}</span>
            </div>

            <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
              Profit / Est. Returns: <span className="tabular-nums font-semibold text-slate-900 dark:text-white">{formatINR(result.profit)}</span>
            </div>

            <div className="pt-2">
              <span className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">
                Total Wealth:{' '}
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10B981] dark:text-emerald-400 tabular-nums tracking-tight">
                {formatINR(result.totalWealth)}
              </span>
            </div>

            <div className="pt-2">
              <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800 font-semibold px-2.5 py-1 rounded-md text-xs">
                Wealth Multiplier: {result.wealthMultiplier}x your principal
              </span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-emerald-100 dark:border-slate-800 flex items-center justify-center">
            <button
              type="button"
              onClick={copySummaryText}
              className="px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />}
              <span>{copiedSummary ? 'Summary Copied to Clipboard!' : 'Copy Calculation Summary'}</span>
            </button>
          </div>
        </div>

        <div className="mt-8">
          <InteractiveChart
            data={chartData}
            investedLabel="One-Time Capital"
            totalLabel="Total Wealth"
            chartTitle="Lumpsum Compounding Growth Over Time"
          />
        </div>

        <AmortizationTable
          data={tableData}
          title="Lumpsum Growth Year-by-Year"
          investedColumnName="Capital Invested"
          returnsColumnName="Capital Gain This Year"
          fileName="lumpsum_growth.csv"
        />
      </div>
    </div>
  );
};
