import React, { useState } from 'react';
import { Target, Check, Copy } from 'lucide-react';
import { calculateGoalSIP, calculateSIP, formatINR } from '../utils/calculatorMath';
import { InteractiveChart } from './InteractiveChart';
import { AmortizationTable } from './AmortizationTable';
import { FinancialDisclaimerBanner } from './FinancialDisclaimerBanner';

interface GoalSIPCalculatorViewProps {
  onNavigateToDisclaimer?: () => void;
}

export const GoalSIPCalculatorView: React.FC<GoalSIPCalculatorViewProps> = ({
  onNavigateToDisclaimer,
}) => {
  const [targetAmount, setTargetAmount] = useState<number>(10000000); // 1 Crore
  const [years, setYears] = useState<number>(15);
  const [expectedRate, setExpectedRate] = useState<number>(14);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const goal = calculateGoalSIP(targetAmount, years, expectedRate);
  const sipResult = calculateSIP(goal.requiredMonthlySIP, years, expectedRate, 0);

  const chartData = sipResult.yearlyBreakdown.map((row) => ({
    year: row.year,
    invested: row.totalInvestedSoFar,
    total: row.closingBalance,
  }));

  const tableData = sipResult.yearlyBreakdown.map((row) => ({
    year: row.year,
    openingBalance: row.openingBalance,
    investedOrWithdrawn: row.investedThisYear,
    returnsEarned: row.returnsEarnedThisYear,
    closingBalance: row.closingBalance,
  }));

  const copySummaryText = () => {
    const text = `FinGrow Goal SIP Calculation:\nTarget Wealth: ₹${targetAmount.toLocaleString('en-IN')}\nTime Horizon: ${years} Years\nRate: ${expectedRate}%\nRequired Monthly SIP: ₹${goal.requiredMonthlySIP.toLocaleString('en-IN')}/month\nTotal Investment: ₹${goal.totalInvestment.toLocaleString('en-IN')}\nTotal Returns: ₹${goal.totalReturns.toLocaleString('en-IN')}`;
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
          Goal SIP &amp; Returns Planner
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Define your target financial goal and calculate the exact monthly SIP required to achieve it.
        </p>
      </div>

      {/* Mandatory Statutory Disclaimer Banner */}
      <FinancialDisclaimerBanner onNavigateToFullDisclaimer={onNavigateToDisclaimer} calculatorName="Goal SIP Planner" />

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Target Amount */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Target Wealth Goal</span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold tabular-nums">
                {formatINR(targetAmount, { compact: true })}
              </span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 font-semibold text-base">₹</span>
              <input
                type="number"
                min="100000"
                max="100000000"
                step="100000"
                value={targetAmount || ''}
                onChange={(e) => setTargetAmount(Math.max(10000, Number(e.target.value)))}
                className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium tabular-nums"
                placeholder="1,00,00,000"
              />
            </div>
            <input
              type="range"
              min="500000"
              max="50000000"
              step="500000"
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[2500000, 5000000, 10000000, 20000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTargetAmount(amt)}
                  className={`text-[11px] px-2 py-0.5 rounded border transition-colors cursor-pointer tabular-nums ${
                    targetAmount === amt
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-600 text-emerald-900 dark:text-emerald-300 font-semibold'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {formatINR(amt, { compact: true })}
                </button>
              ))}
            </div>
          </div>

          {/* Time to Goal up to 100 years */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Time Horizon (years)</span>
              <span className="text-xs text-slate-400 dark:text-slate-500">{years} Years</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="100"
                value={years || ''}
                onChange={(e) => setYears(Math.max(1, Math.min(100, Number(e.target.value))))}
                className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-emerald-500 rounded-lg text-slate-900 dark:text-white font-medium tabular-nums"
                placeholder="15"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-emerald-600 dark:text-emerald-400">
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
              <span className="text-xs text-slate-400 dark:text-slate-500">Equity CAGR</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 font-semibold">%</span>
              <input
                type="number"
                min="5"
                max="25"
                step="0.5"
                value={expectedRate || ''}
                onChange={(e) => setExpectedRate(Math.max(1, Math.min(30, Number(e.target.value))))}
                className="w-full pl-9 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-emerald-500 rounded-lg text-slate-900 dark:text-white font-medium tabular-nums"
                placeholder="14"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-emerald-600 dark:text-emerald-400">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </span>
            </div>
            <input
              type="range"
              min="6"
              max="20"
              step="0.5"
              value={expectedRate}
              onChange={(e) => setExpectedRate(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>
        </div>

        {/* Primary Result Box */}
        <div className="mt-8 rounded-2xl border-2 border-emerald-500/70 dark:border-emerald-500/40 bg-gradient-to-b from-emerald-50/20 to-white dark:from-emerald-950/20 dark:to-slate-900 p-6 sm:p-8 text-center shadow-xs">
          <div className="max-w-md mx-auto space-y-2">
            <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
              Required Monthly SIP:
            </div>

            <div className="text-3xl sm:text-4xl font-extrabold text-[#10B981] dark:text-emerald-400 tabular-nums tracking-tight">
              {formatINR(goal.requiredMonthlySIP)} <span className="text-base font-normal text-slate-600 dark:text-slate-400">/ month</span>
            </div>

            <div className="pt-2 text-sm text-slate-700 dark:text-slate-300">
              Your Total Investment will be <span className="font-semibold text-slate-900 dark:text-white">{formatINR(goal.totalInvestment)}</span>, with{' '}
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">{formatINR(goal.totalReturns)}</span> generated in compound returns to hit your{' '}
              <span className="font-bold text-slate-900 dark:text-white">{formatINR(targetAmount)}</span> goal!
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-emerald-100 dark:border-slate-800 flex items-center justify-center">
            <button
              type="button"
              onClick={copySummaryText}
              className="px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />}
              <span>{copiedSummary ? 'Summary Copied to Clipboard!' : 'Copy Plan Summary'}</span>
            </button>
          </div>
        </div>

        <div className="mt-8">
          <InteractiveChart
            data={chartData}
            investedLabel="Your Monthly Contributions"
            totalLabel="Goal Wealth Progress"
            chartTitle="Goal Accumulation Trajectory"
          />
        </div>

        <AmortizationTable
          data={tableData}
          title="Goal SIP Yearly Progression"
          investedColumnName="Annual Deposit"
          returnsColumnName="Returns Earned"
          fileName="goal_sip_plan.csv"
        />
      </div>
    </div>
  );
};
