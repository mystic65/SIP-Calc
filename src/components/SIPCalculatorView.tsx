import React, { useState, useEffect } from 'react';
import { Check, ShieldCheck, Copy, RefreshCw } from 'lucide-react';
import { calculateSIP, formatINR } from '../utils/calculatorMath';
import { InteractiveChart } from './InteractiveChart';
import { AmortizationTable } from './AmortizationTable';
import { FinancialDisclaimerBanner } from './FinancialDisclaimerBanner';

interface SIPCalculatorViewProps {
  initialRate?: number;
  amcPreset?: string;
  onNavigateToDisclaimer?: () => void;
}

export const SIPCalculatorView: React.FC<SIPCalculatorViewProps> = ({
  initialRate = 15,
  amcPreset,
  onNavigateToDisclaimer,
}) => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [years, setYears] = useState<number>(20);
  const [expectedRate, setExpectedRate] = useState<number>(initialRate);
  const [stepUpPercent, setStepUpPercent] = useState<number>(0);
  const [inflationRate, setInflationRate] = useState<number>(0);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    if (initialRate) {
      setExpectedRate(initialRate);
    }
  }, [initialRate, amcPreset]);

  const result = calculateSIP(monthlyInvestment, years, expectedRate, stepUpPercent, inflationRate);

  const chartData = result.yearlyBreakdown.map((row) => ({
    year: row.year,
    invested: row.totalInvestedSoFar,
    total: row.closingBalance,
  }));

  const tableData = result.yearlyBreakdown.map((row) => ({
    year: row.year,
    openingBalance: row.openingBalance,
    investedOrWithdrawn: row.investedThisYear,
    returnsEarned: row.returnsEarnedThisYear,
    closingBalance: row.closingBalance,
  }));

  const copySummaryText = () => {
    const text = `FinGrow SIP Calculation:\nMonthly Investment: ₹${monthlyInvestment.toLocaleString('en-IN')}\nDuration: ${years} Years\nExpected Return: ${expectedRate}%\nInvested: ₹${result.investedAmount.toLocaleString('en-IN')}\nProfit: ₹${result.profit.toLocaleString('en-IN')}\nTotal Wealth: ₹${result.totalWealth.toLocaleString('en-IN')}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          SIP Calculator
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Calculate the compound growth of your monthly Systematic Investment Plan (SIP).
          {amcPreset && (
            <span className="ml-2 font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded text-xs border border-emerald-200 dark:border-emerald-800">
              Benchmark: {amcPreset} (~{expectedRate}%)
            </span>
          )}
        </p>
      </div>

      {/* Mandatory Statutory Disclaimer Banner */}
      <FinancialDisclaimerBanner onNavigateToFullDisclaimer={onNavigateToDisclaimer} calculatorName="SIP Calculator" />

      {/* Main Calculator Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Input 1: Monthly Investment */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>How much will you be saving each month?</span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold tabular-nums">
                {formatINR(monthlyInvestment, { compact: true })} / mo
              </span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 font-semibold text-base">
                ₹
              </span>
              <input
                type="number"
                min="500"
                max="10000000"
                step="1000"
                value={monthlyInvestment || ''}
                onChange={(e) => setMonthlyInvestment(Math.max(0, Number(e.target.value)))}
                className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent tabular-nums"
                placeholder="5,000"
              />
            </div>
            {/* Slider up to 10 Lakh */}
            <input
              type="range"
              min="500"
              max="1000000"
              step="1000"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            {/* Quick chips up to 10 Lakhs */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[5000, 25000, 50000, 100000, 250000, 500000, 1000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setMonthlyInvestment(amt)}
                  className={`text-[11px] px-2 py-1 rounded border transition-colors cursor-pointer tabular-nums ${
                    monthlyInvestment === amt
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-600 text-emerald-900 dark:text-emerald-300 font-semibold'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {formatINR(amt, { compact: true })}
                </button>
              ))}
            </div>
          </div>

          {/* Input 2: Time Period up to 100 years */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Time (years)</span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">
                {years * 12} Months
              </span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="100"
                value={years || ''}
                onChange={(e) => setYears(Math.max(1, Math.min(100, Number(e.target.value))))}
                className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-emerald-500 rounded-lg text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent tabular-nums"
                placeholder="20"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-600 dark:text-emerald-400">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </span>
            </div>
            {/* Slider up to 100 years */}
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            {/* Quick chips up to 100 years */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[5, 10, 20, 30, 50, 75, 100].map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setYears(y)}
                  className={`text-[11px] px-2 py-1 rounded border transition-colors cursor-pointer tabular-nums ${
                    years === y
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-600 text-emerald-900 dark:text-emerald-300 font-semibold'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {y} Years
                </button>
              ))}
            </div>
          </div>

          {/* Input 3: Expected Rate of Return */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Expected Rate of Return % (p.a.)</span>
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
                value={expectedRate || ''}
                onChange={(e) => setExpectedRate(Math.max(1, Math.min(40, Number(e.target.value))))}
                className="w-full pl-9 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-emerald-500 rounded-lg text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent tabular-nums"
                placeholder="15"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-600 dark:text-emerald-400">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </span>
            </div>
            {/* Slider */}
            <input
              type="range"
              min="5"
              max="25"
              step="0.5"
              value={expectedRate}
              onChange={(e) => setExpectedRate(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            {/* Asset benchmarks */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { label: '8% Debt', rate: 8 },
                { label: '12% Large Cap', rate: 12 },
                { label: '15% Equity (Hist.)', rate: 15 },
                { label: '18% Mid/Small', rate: 18 },
              ].map((bench) => (
                <button
                  key={bench.rate}
                  type="button"
                  onClick={() => setExpectedRate(bench.rate)}
                  className={`text-[11px] px-2 py-1 rounded border transition-colors cursor-pointer ${
                    expectedRate === bench.rate
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-600 text-emerald-900 dark:text-emerald-300 font-semibold'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {bench.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calculate CTA Button */}
          <div className="flex flex-col justify-end pt-2 md:pt-7">
            <button
              type="button"
              className="w-full py-3.5 px-6 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-700 to-indigo-900 hover:from-emerald-700 hover:to-indigo-950 border border-emerald-600 shadow-sm transition-all transform active:scale-[0.99] cursor-pointer tracking-wide uppercase flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Calculate Wealth</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 font-semibold mt-3 text-center cursor-pointer"
            >
              {showAdvanced ? '− Hide Advanced Options (Step-up & Inflation)' : '+ Advanced: Annual Step-Up & Inflation Adjustment'}
            </button>
          </div>
        </div>

        {/* Advanced Accordion for Step-Up SIP and Inflation */}
        {showAdvanced && (
          <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/70 dark:bg-slate-800/50 p-4 rounded-xl border dark:border-slate-700">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Annual Step-Up (% increase per year)</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">{stepUpPercent}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="25"
                step="5"
                value={stepUpPercent}
                onChange={(e) => setStepUpPercent(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Increases your SIP with annual salary increments (e.g., 10% each year).
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Inflation Rate Adjustment</span>
                <span className="font-bold text-amber-700 dark:text-amber-400">{inflationRate}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Calculates real purchasing power in today's rupee terms.
              </p>
            </div>
          </div>
        )}

        {/* Primary Result Box */}
        <div className="mt-8 rounded-2xl border-2 border-emerald-500/70 dark:border-emerald-500/40 bg-gradient-to-b from-emerald-50/20 to-white dark:from-emerald-950/20 dark:to-slate-900 p-6 sm:p-8 text-center shadow-xs">
          <div className="max-w-md mx-auto space-y-2">
            <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
              Invested Amount: <span className="tabular-nums font-semibold text-slate-900 dark:text-white">{formatINR(result.investedAmount)}</span>
            </div>

            <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
              Profit: <span className="tabular-nums font-semibold text-slate-900 dark:text-white">{formatINR(result.profit)}</span>
            </div>

            <div className="pt-2">
              <span className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">
                Total Amount:{' '}
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10B981] dark:text-emerald-400 tabular-nums tracking-tight">
                {formatINR(result.totalWealth)}
              </span>
            </div>

            {/* Wealth multiplier badge */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold px-2.5 py-1 rounded-md border border-emerald-100 dark:border-emerald-800">
                Wealth Multiplier: {result.wealthMultiplier}x
              </span>
              {inflationRate > 0 && (
                <span className="bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold px-2.5 py-1 rounded-md border border-amber-100 dark:border-amber-800">
                  In Today's Value: {formatINR(result.inflationAdjustedWealth)}
                </span>
              )}
            </div>
          </div>

          {/* Quick copy summary action */}
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

        {/* Growth Curve Chart */}
        <div className="mt-8">
          <InteractiveChart
            data={chartData}
            investedLabel="Invested Amount"
            totalLabel="Total Wealth"
            chartTitle="SIP Compounding Growth Curve (Invested vs Total)"
            investedColor="#10B981"
            totalColor="#0F172A"
          />
        </div>

        {/* Year-by-Year Amortization Schedule Table */}
        <AmortizationTable
          data={tableData}
          title="SIP Compounding Schedule (Yearly Growth Breakdown)"
          investedColumnName="Invested Amount (Yr)"
          returnsColumnName="Returns Earned (Yr)"
          fileName="sip_wealth_schedule.csv"
        />
      </div>

      {/* Educational Guide & FAQs */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 transition-colors">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>Understanding SIP (Systematic Investment Plan)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Rupee Cost Averaging</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              When markets dip, your fixed monthly SIP buys more mutual fund units. When markets rise, you buy fewer. Over 10–20 years, this smooths out market volatility.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">The 8-4-3 Rule of Compounding</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              It takes ~8 years to make your first ₹25 Lakhs, only 4 more years to reach ₹50 Lakhs, and just 3 more years to reach ₹1 Crore at 12% returns. Compounding accelerates exponentially in later years.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Indian Tax Rules (LTCG / STCG)</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              For equity mutual funds held over 12 months, Long Term Capital Gains (LTCG) are taxed at 12.5% on gains exceeding ₹1.25 Lakh per financial year.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
