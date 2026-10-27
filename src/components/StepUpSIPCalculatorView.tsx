import React, { useState } from 'react';
import { Check, TrendingUp, Copy } from 'lucide-react';
import { calculateSIP, formatINR } from '../utils/calculatorMath';
import { InteractiveChart } from './InteractiveChart';
import { AmortizationTable } from './AmortizationTable';
import { FinancialDisclaimerBanner } from './FinancialDisclaimerBanner';

interface StepUpSIPCalculatorViewProps {
  onNavigateToDisclaimer?: () => void;
}

export const StepUpSIPCalculatorView: React.FC<StepUpSIPCalculatorViewProps> = ({
  onNavigateToDisclaimer,
}) => {
  const [initialMonthly, setInitialMonthly] = useState<number>(10000);
  const [stepUpPercent, setStepUpPercent] = useState<number>(10);
  const [years, setYears] = useState<number>(15);
  const [expectedRate, setExpectedRate] = useState<number>(13.5);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const stepUpResult = calculateSIP(initialMonthly, years, expectedRate, stepUpPercent);
  const regularResult = calculateSIP(initialMonthly, years, expectedRate, 0);

  const extraWealth = stepUpResult.totalWealth - regularResult.totalWealth;
  const extraPercent = Math.round((extraWealth / regularResult.totalWealth) * 100);

  const chartData = stepUpResult.yearlyBreakdown.map((row) => ({
    year: row.year,
    invested: row.totalInvestedSoFar,
    total: row.closingBalance,
  }));

  const tableData = stepUpResult.yearlyBreakdown.map((row) => ({
    year: row.year,
    openingBalance: row.openingBalance,
    investedOrWithdrawn: row.investedThisYear,
    returnsEarned: row.returnsEarnedThisYear,
    closingBalance: row.closingBalance,
  }));

  const copySummaryText = () => {
    const text = `FinGrow Step-Up SIP Calculation:\nStarting Monthly: ₹${initialMonthly.toLocaleString('en-IN')}\nAnnual Step-Up: ${stepUpPercent}%\nDuration: ${years} Years\nRate: ${expectedRate}%\nTotal Invested: ₹${stepUpResult.investedAmount.toLocaleString('en-IN')}\nTotal Wealth: ₹${stepUpResult.totalWealth.toLocaleString('en-IN')}\nExtra Wealth vs Flat SIP: +₹${extraWealth.toLocaleString('en-IN')} (+${extraPercent}%)`;
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
          Step-Up SIP Calculator
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          See how increasing your SIP amount annually with salary increments supercharges your wealth!
        </p>
      </div>

      {/* Mandatory Statutory Disclaimer Banner */}
      <FinancialDisclaimerBanner onNavigateToFullDisclaimer={onNavigateToDisclaimer} calculatorName="Step-Up SIP Calculator" />

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {/* Initial Monthly up to 10 Lakhs */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Starting Monthly SIP</span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold tabular-nums">
                {formatINR(initialMonthly, { compact: true })}
              </span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 font-semibold">₹</span>
              <input
                type="number"
                min="1000"
                max="10000000"
                step="1000"
                value={initialMonthly || ''}
                onChange={(e) => setInitialMonthly(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white font-medium tabular-nums"
                placeholder="10,000"
              />
            </div>
            <input
              type="range"
              min="1000"
              max="1000000"
              step="1000"
              value={initialMonthly}
              onChange={(e) => setInitialMonthly(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex flex-wrap gap-1 pt-1">
              {[10000, 25000, 50000, 100000, 250000, 500000, 1000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setInitialMonthly(amt)}
                  className={`text-[10.5px] px-1.5 py-0.5 rounded border transition-colors cursor-pointer tabular-nums ${
                    initialMonthly === amt
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-600 text-emerald-900 dark:text-emerald-300 font-semibold'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {formatINR(amt, { compact: true })}
                </button>
              ))}
            </div>
          </div>

          {/* Annual Step Up % */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Annual Step-Up</span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">{stepUpPercent}% / yr</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 font-semibold">%</span>
              <input
                type="number"
                min="1"
                max="30"
                value={stepUpPercent || ''}
                onChange={(e) => setStepUpPercent(Math.max(0, Math.min(50, Number(e.target.value))))}
                className="w-full pl-8 pr-8 py-2 bg-white dark:bg-slate-800 border border-emerald-500 rounded-lg text-sm text-slate-900 dark:text-white font-medium tabular-nums"
              />
              <span className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-emerald-600 dark:text-emerald-400">
                <Check className="w-4 h-4" />
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              step="1"
              value={stepUpPercent}
              onChange={(e) => setStepUpPercent(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Time (years) up to 100 years */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Duration (Years)</span>
              <span className="text-xs text-slate-400 dark:text-slate-500">{years} Yrs</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="100"
                value={years || ''}
                onChange={(e) => setYears(Math.max(1, Math.min(100, Number(e.target.value))))}
                className="w-full pl-4 pr-8 py-2 bg-white dark:bg-slate-800 border border-emerald-500 rounded-lg text-sm text-slate-900 dark:text-white font-medium tabular-nums"
              />
              <span className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-emerald-600 dark:text-emerald-400">
                <Check className="w-4 h-4" />
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

          {/* Return Rate */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Expected Return %</span>
              <span className="text-xs text-slate-400 dark:text-slate-500">{expectedRate}%</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 font-semibold">%</span>
              <input
                type="number"
                min="1"
                max="30"
                step="0.5"
                value={expectedRate || ''}
                onChange={(e) => setExpectedRate(Math.max(1, Math.min(30, Number(e.target.value))))}
                className="w-full pl-8 pr-8 py-2 bg-white dark:bg-slate-800 border border-emerald-500 rounded-lg text-sm text-slate-900 dark:text-white font-medium tabular-nums"
              />
              <span className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-emerald-600 dark:text-emerald-400">
                <Check className="w-4 h-4" />
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="22"
              step="0.5"
              value={expectedRate}
              onChange={(e) => setExpectedRate(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Step-Up vs Regular SIP comparison banner */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-slate-900 border border-emerald-100 dark:border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-950 dark:text-emerald-300 uppercase tracking-wider">
                Step-Up Advantage
              </div>
              <div className="text-sm text-slate-700 dark:text-slate-300">
                By stepping up <strong className="text-emerald-900 dark:text-emerald-400">{stepUpPercent}%/yr</strong>, you generate{' '}
                <strong className="text-emerald-700 dark:text-emerald-400">+{formatINR(extraWealth)} (+{extraPercent}%)</strong> more wealth compared to a flat SIP!
              </div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs text-slate-500 dark:text-slate-400">Fixed SIP Corpus</div>
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 tabular-nums">{formatINR(regularResult.totalWealth)}</div>
          </div>
        </div>

        {/* Primary Result Box */}
        <div className="mt-6 rounded-2xl border-2 border-emerald-500/70 dark:border-emerald-500/40 bg-gradient-to-b from-emerald-50/20 to-white dark:from-emerald-950/20 dark:to-slate-900 p-6 sm:p-8 text-center shadow-xs">
          <div className="max-w-md mx-auto space-y-2">
            <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
              Total Invested Amount: <span className="tabular-nums font-semibold text-slate-900 dark:text-white">{formatINR(stepUpResult.investedAmount)}</span>
            </div>

            <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
              Estimated Returns: <span className="tabular-nums font-semibold text-slate-900 dark:text-white">{formatINR(stepUpResult.profit)}</span>
            </div>

            <div className="pt-2">
              <span className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">
                Total Wealth Accumulated:{' '}
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10B981] dark:text-emerald-400 tabular-nums tracking-tight">
                {formatINR(stepUpResult.totalWealth)}
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
            investedLabel="Invested (Stepped Up)"
            totalLabel="Total Wealth"
            chartTitle="Step-Up SIP Growth Trajectory"
          />
        </div>

        <AmortizationTable
          data={tableData}
          title="Step-Up SIP Yearly Progression (Installment Increases Annually)"
          investedColumnName="Invested Amount (Yr)"
          returnsColumnName="Returns Earned (Yr)"
          fileName="stepup_sip_schedule.csv"
        />
      </div>
    </div>
  );
};
