import React, { useState } from 'react';
import { Check, Home, Car, Copy } from 'lucide-react';
import { calculateLoanEMI, formatINR } from '../utils/calculatorMath';
import { InteractiveChart } from './InteractiveChart';
import { AmortizationTable } from './AmortizationTable';
import { FinancialDisclaimerBanner } from './FinancialDisclaimerBanner';

interface LoanEMICalculatorViewProps {
  isCarLoan?: boolean;
  onNavigateToDisclaimer?: () => void;
}

export const LoanEMICalculatorView: React.FC<LoanEMICalculatorViewProps> = ({
  isCarLoan = false,
  onNavigateToDisclaimer,
}) => {
  const defaultPrincipal = isCarLoan ? 1200000 : 5000000;
  const defaultRate = isCarLoan ? 9.2 : 8.5;
  const defaultTenure = isCarLoan ? 5 : 20;

  const [principal, setPrincipal] = useState<number>(defaultPrincipal);
  const [rate, setRate] = useState<number>(defaultRate);
  const [tenureYears, setTenureYears] = useState<number>(defaultTenure);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const result = calculateLoanEMI(principal, rate, tenureYears);

  const chartData = result.yearlyBreakdown.map((row) => ({
    year: row.year,
    invested: row.totalPaidThisYear * row.year,
    total: row.closingBalance,
  }));

  const tableData = result.yearlyBreakdown.map((row) => ({
    year: row.year,
    openingBalance: row.openingBalance,
    investedOrWithdrawn: row.principalPaidThisYear,
    returnsEarned: row.interestPaidThisYear,
    closingBalance: row.closingBalance,
  }));

  const copySummaryText = () => {
    const text = `FinGrow ${isCarLoan ? 'Car Loan' : 'Home Loan'} Calculation:\nLoan Principal: ₹${principal.toLocaleString('en-IN')}\nInterest Rate: ${rate}%\nTenure: ${tenureYears} Years\nMonthly EMI: ₹${result.monthlyEMI.toLocaleString('en-IN')}/mo\nTotal Interest: ₹${result.totalInterest.toLocaleString('en-IN')}\nTotal Payable: ₹${result.totalPayment.toLocaleString('en-IN')}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          {isCarLoan ? <Car className="w-8 h-8 text-emerald-600 dark:text-emerald-400 inline" /> : <Home className="w-8 h-8 text-emerald-600 dark:text-emerald-400 inline" />}
          <span>{isCarLoan ? 'Car Loan EMI Calculator' : 'Home Loan EMI Calculator'}</span>
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Calculate your monthly EMI, total interest payable, and amortization schedule for {isCarLoan ? 'vehicle financing' : 'housing loans'}.
        </p>
      </div>

      {/* Mandatory Statutory Disclaimer Banner */}
      <FinancialDisclaimerBanner onNavigateToFullDisclaimer={onNavigateToDisclaimer} calculatorName={isCarLoan ? 'Car Loan Calculator' : 'Home Loan Calculator'} />

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xs transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Loan Amount */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Loan Amount</span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold tabular-nums">
                {formatINR(principal, { compact: true })}
              </span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 font-semibold">₹</span>
              <input
                type="number"
                min="50000"
                max="50000000"
                step="50000"
                value={principal || ''}
                onChange={(e) => setPrincipal(Math.max(10000, Number(e.target.value)))}
                className="w-full pl-8 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white font-medium tabular-nums"
              />
            </div>
            <input
              type="range"
              min="100000"
              max={isCarLoan ? 5000000 : 20000000}
              step="50000"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Interest Rate % (p.a.)</span>
              <span className="text-xs text-slate-400 dark:text-slate-500">{rate}%</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 font-semibold">%</span>
              <input
                type="number"
                min="5"
                max="22"
                step="0.1"
                value={rate || ''}
                onChange={(e) => setRate(Math.max(3, Math.min(25, Number(e.target.value))))}
                className="w-full pl-8 pr-8 py-2 bg-white dark:bg-slate-800 border border-emerald-500 rounded-lg text-sm text-slate-900 dark:text-white font-medium tabular-nums"
              />
              <span className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-emerald-600 dark:text-emerald-400">
                <Check className="w-4 h-4" />
              </span>
            </div>
            <input
              type="range"
              min="6"
              max="18"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>

          {/* Tenure */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Tenure (years)</span>
              <span className="text-xs text-slate-400 dark:text-slate-500">{tenureYears * 12} Months</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="30"
                value={tenureYears || ''}
                onChange={(e) => setTenureYears(Math.max(1, Math.min(30, Number(e.target.value))))}
                className="w-full pl-4 pr-8 py-2 bg-white dark:bg-slate-800 border border-emerald-500 rounded-lg text-sm text-slate-900 dark:text-white font-medium tabular-nums"
              />
              <span className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-emerald-600 dark:text-emerald-400">
                <Check className="w-4 h-4" />
              </span>
            </div>
            <input
              type="range"
              min="1"
              max={isCarLoan ? 8 : 30}
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>
        </div>

        {/* Primary Result Box */}
        <div className="mt-8 rounded-2xl border-2 border-emerald-500/70 dark:border-emerald-500/40 bg-gradient-to-b from-emerald-50/20 to-white dark:from-emerald-950/20 dark:to-slate-900 p-6 sm:p-8 text-center shadow-xs">
          <div className="max-w-md mx-auto space-y-2">
            <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
              Monthly Loan EMI:
            </div>

            <div className="text-3xl sm:text-4xl font-extrabold text-[#10B981] dark:text-emerald-400 tabular-nums tracking-tight">
              {formatINR(result.monthlyEMI)} <span className="text-base font-normal text-slate-600 dark:text-slate-400">/ month</span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <div className="text-slate-500 dark:text-slate-400">Principal Amount</div>
                <div className="font-bold text-slate-900 dark:text-white tabular-nums">{formatINR(result.principal)}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/50">
                <div className="text-rose-700 dark:text-rose-400">Total Interest Payable</div>
                <div className="font-bold text-rose-950 dark:text-rose-200 tabular-nums">{formatINR(result.totalInterest)}</div>
              </div>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              Total Amount Payable (Principal + Interest): <strong className="text-slate-800 dark:text-slate-200 tabular-nums">{formatINR(result.totalPayment)}</strong>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-emerald-100 dark:border-slate-800 flex items-center justify-center">
            <button
              type="button"
              onClick={copySummaryText}
              className="px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />}
              <span>{copiedSummary ? 'Summary Copied to Clipboard!' : 'Copy EMI Summary'}</span>
            </button>
          </div>
        </div>

        <AmortizationTable
          data={tableData}
          title="Loan Repayment Schedule (Yearly Principal vs Interest Split)"
          investedColumnName="Principal Paid (Yr)"
          returnsColumnName="Interest Paid (Yr)"
          fileName="loan_emi_schedule.csv"
        />
      </div>
    </div>
  );
};
