import React, { useState } from 'react';
import { Check, ShieldCheck, Copy, AlertTriangle, RefreshCw } from 'lucide-react';
import { calculateSWP, formatINR } from '../utils/calculatorMath';
import { InteractiveChart } from './InteractiveChart';
import { AmortizationTable } from './AmortizationTable';
import { FinancialDisclaimerBanner } from './FinancialDisclaimerBanner';

interface SWPCalculatorViewProps {
  onNavigateToDisclaimer?: () => void;
}

export const SWPCalculatorView: React.FC<SWPCalculatorViewProps> = ({
  onNavigateToDisclaimer,
}) => {
  const [totalInvestment, setTotalInvestment] = useState<number>(5000000); // 50 Lakhs default
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState<number>(35000); // 35k/month
  const [expectedRate, setExpectedRate] = useState<number>(9.5); // 9.5% typical hybrid
  const [years, setYears] = useState<number>(20);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const result = calculateSWP(totalInvestment, monthlyWithdrawal, expectedRate, years);

  const annualWithdrawalAmount = monthlyWithdrawal * 12;
  const withdrawalRatePercent = totalInvestment > 0 ? ((annualWithdrawalAmount / totalInvestment) * 100).toFixed(1) : '0';

  const chartData = result.yearlyBreakdown.map((row) => ({
    year: row.year,
    invested: row.totalWithdrawnSoFar,
    total: row.closingBalance,
  }));

  const tableData = result.yearlyBreakdown.map((row) => ({
    year: row.year,
    openingBalance: row.openingBalance,
    investedOrWithdrawn: row.withdrawnThisYear,
    returnsEarned: row.returnsEarnedThisYear,
    closingBalance: row.closingBalance,
  }));

  const copySummaryText = () => {
    const text = `FinGrow SWP Calculation:\nInitial Corpus: ₹${totalInvestment.toLocaleString('en-IN')}\nMonthly Withdrawal: ₹${monthlyWithdrawal.toLocaleString('en-IN')}\nDuration: ${years} Years\nRate: ${expectedRate}%\nTotal Cash Received: ₹${result.totalWithdrawn.toLocaleString('en-IN')}\nFinal Remaining Balance: ₹${result.finalBalance.toLocaleString('en-IN')}`;
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
          SWP Calculator
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Systematic Withdrawal Plan (SWP) Calculator to plan regular monthly cashflow &amp; pension from your mutual fund corpus.
        </p>
      </div>

      {/* Mandatory Statutory Disclaimer Banner */}
      <FinancialDisclaimerBanner onNavigateToFullDisclaimer={onNavigateToDisclaimer} calculatorName="SWP Calculator" />

      {/* Main Calculator Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Input 1: Total Investment Corpus */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Total Investment Corpus (Initial Lump Sum)</span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold tabular-nums">
                {formatINR(totalInvestment, { compact: true })}
              </span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 font-semibold text-base">
                ₹
              </span>
              <input
                type="number"
                min="100000"
                max="100000000"
                step="50000"
                value={totalInvestment || ''}
                onChange={(e) => setTotalInvestment(Math.max(0, Number(e.target.value)))}
                className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent tabular-nums"
                placeholder="50,00,000"
              />
            </div>
            {/* Slider */}
            <input
              type="range"
              min="500000"
              max="20000000"
              step="100000"
              value={totalInvestment}
              onChange={(e) => setTotalInvestment(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            {/* Quick chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[2500000, 5000000, 10000000, 20000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTotalInvestment(amt)}
                  className={`text-[11px] px-2 py-1 rounded border transition-colors cursor-pointer tabular-nums ${
                    totalInvestment === amt
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-600 text-emerald-900 dark:text-emerald-300 font-semibold'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {formatINR(amt, { compact: true })}
                </button>
              ))}
            </div>
          </div>

          {/* Input 2: Monthly Withdrawal Amount up to 10 Lakhs */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Withdrawal Per Month</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                Annual: {formatINR(annualWithdrawalAmount)} ({withdrawalRatePercent}% of corpus)
              </span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 font-semibold text-base">
                ₹
              </span>
              <input
                type="number"
                min="1000"
                max="10000000"
                step="5000"
                value={monthlyWithdrawal || ''}
                onChange={(e) => setMonthlyWithdrawal(Math.max(0, Number(e.target.value)))}
                className="w-full pl-9 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-emerald-500 rounded-lg text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent tabular-nums"
                placeholder="35,000"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-600 dark:text-emerald-400">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </span>
            </div>
            {/* Slider up to 10 Lakhs */}
            <input
              type="range"
              min="5000"
              max="1000000"
              step="5000"
              value={monthlyWithdrawal}
              onChange={(e) => setMonthlyWithdrawal(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            {/* Quick chips up to 10 Lakhs */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[25000, 50000, 100000, 250000, 500000, 1000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setMonthlyWithdrawal(amt)}
                  className={`text-[11px] px-2 py-1 rounded border transition-colors cursor-pointer tabular-nums ${
                    monthlyWithdrawal === amt
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-600 text-emerald-900 dark:text-emerald-300 font-semibold'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {formatINR(amt, { compact: true })}/mo
                </button>
              ))}
            </div>
          </div>

          {/* Input 3: Expected Rate of Return */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Expected Rate of Return % (p.a.)</span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">Annualized growth on balance</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 font-semibold text-base">
                %
              </span>
              <input
                type="number"
                min="1"
                max="30"
                step="0.5"
                value={expectedRate || ''}
                onChange={(e) => setExpectedRate(Math.max(1, Math.min(30, Number(e.target.value))))}
                className="w-full pl-9 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-emerald-500 rounded-lg text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent tabular-nums"
                placeholder="9.5"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-600 dark:text-emerald-400">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </span>
            </div>
            {/* Slider */}
            <input
              type="range"
              min="5"
              max="18"
              step="0.5"
              value={expectedRate}
              onChange={(e) => setExpectedRate(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            {/* Category recommendations */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { label: '7.5% Conservative Debt', rate: 7.5 },
                { label: '9.5% Balanced Hybrid', rate: 9.5 },
                { label: '12% Multi Asset', rate: 12 },
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

          {/* Input 4: Time Horizon up to 100 years */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Time Period (years)</span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">
                {years * 12} Withdrawal Months
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
        </div>

        {/* Primary Result Box */}
        <div className="mt-8 rounded-2xl border-2 border-emerald-500/70 dark:border-emerald-500/40 bg-gradient-to-b from-emerald-50/20 to-white dark:from-emerald-950/20 dark:to-slate-900 p-6 sm:p-8 text-center shadow-xs">
          <div className="max-w-md mx-auto space-y-2">
            <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
              Total Investment: <span className="tabular-nums font-semibold text-slate-900 dark:text-white">{formatINR(result.initialInvestment)}</span>
            </div>

            <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
              Total Amount Withdrawn: <span className="tabular-nums font-semibold text-emerald-700 dark:text-emerald-400">{formatINR(result.totalWithdrawn)}</span>
            </div>

            <div className="pt-2">
              <span className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">
                Final Value (Remaining):{' '}
              </span>
              <span className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tabular-nums tracking-tight ${
                result.finalBalance > 0 ? 'text-[#10B981] dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
              }`}>
                {formatINR(result.finalBalance)}
              </span>
            </div>

            {/* Sustainability Badge */}
            <div className="pt-3">
              {result.isDepleted ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-semibold">
                  <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>
                    Warning: Corpus depletes in Year {result.depletionYear} (Month {result.depletionMonth}). Consider lowering withdrawal or increasing return.
                  </span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>
                    Sustainable Plan: Your corpus remains healthy at {formatINR(result.finalBalance)} after providing {formatINR(result.totalWithdrawn)} in cash!
                  </span>
                </div>
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
              <span>{copiedSummary ? 'Summary Copied to Clipboard!' : 'Copy SWP Summary'}</span>
            </button>
          </div>
        </div>

        {/* SWP Progression Chart */}
        <div className="mt-8">
          <InteractiveChart
            data={chartData}
            investedLabel="Cumulative Cash Received"
            totalLabel="Remaining Portfolio Corpus"
            chartTitle="SWP Cashflow & Portfolio Balance Over Time"
            investedColor="#10B981"
            totalColor="#0F172A"
          />
        </div>

        {/* Year-by-Year Schedule */}
        <AmortizationTable
          data={tableData}
          title="SWP Year-by-Year Withdrawal Schedule"
          investedColumnName="Cash Withdrawn (Yr)"
          returnsColumnName="Interest / Gains Earned"
          fileName="swp_pension_schedule.csv"
        />
      </div>

      {/* SWP Tax Advantage */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 transition-colors">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>Why SWP is Far Superior to Bank Fixed Deposit (FD) Monthly Interest</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Taxation on Gains Only</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              In a Fixed Deposit, 100% of your interest is taxed at your income slab. In an SWP, each withdrawal is a redemption of capital + gain, so tax applies only to the small gain portion!
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Beat Inflation</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              A 7% bank FD after 30% tax yields only 4.9%, losing money to 6% inflation. A hybrid mutual fund SWP yielding 9–11% keeps growing your principal even as you withdraw every month.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Flexibility &amp; Liquidity</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              You can pause, increase, decrease, or withdraw your entire balance at any time without penalty, unlike fixed bank lock-ins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
