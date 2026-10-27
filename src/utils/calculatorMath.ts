/**
 * Financial calculation formulas and formatting utilities for SIP, SWP, Lumpsum, and Loan calculators.
 * Follows standard Indian mutual fund and banking compounding standards.
 */

export interface SIPResult {
  investedAmount: number;
  totalWealth: number;
  profit: number;
  wealthMultiplier: number;
  inflationAdjustedWealth: number;
  yearlyBreakdown: {
    year: number;
    openingBalance: number;
    investedThisYear: number;
    totalInvestedSoFar: number;
    returnsEarnedThisYear: number;
    closingBalance: number;
    monthlyInstallment: number;
  }[];
}

export interface SWPResult {
  initialInvestment: number;
  totalWithdrawn: number;
  finalBalance: number;
  isDepleted: boolean;
  depletionYear: number | null;
  depletionMonth: number | null;
  netBenefit: number; // totalWithdrawn + finalBalance - initialInvestment
  yearlyBreakdown: {
    year: number;
    openingBalance: number;
    withdrawnThisYear: number;
    totalWithdrawnSoFar: number;
    returnsEarnedThisYear: number;
    closingBalance: number;
  }[];
}

export interface LumpsumResult {
  investedAmount: number;
  totalWealth: number;
  profit: number;
  wealthMultiplier: number;
  yearlyBreakdown: {
    year: number;
    openingBalance: number;
    returnsEarnedThisYear: number;
    closingBalance: number;
  }[];
}

export interface GoalSIPResult {
  targetAmount: number;
  years: number;
  annualRate: number;
  requiredMonthlySIP: number;
  totalInvestment: number;
  totalReturns: number;
}

export interface LoanEMIResult {
  principal: number;
  monthlyEMI: number;
  totalInterest: number;
  totalPayment: number;
  yearlyBreakdown: {
    year: number;
    openingBalance: number;
    principalPaidThisYear: number;
    interestPaidThisYear: number;
    totalPaidThisYear: number;
    closingBalance: number;
  }[];
}

/**
 * Format numbers according to Indian Currency numbering format (Lakhs and Crores)
 * e.g., ₹75,79,775 or ₹12,00,000
 */
export function formatINR(val: number, options?: { compact?: boolean; hideSymbol?: boolean; showDecimals?: boolean }): string {
  if (isNaN(val) || val === null || val === undefined) return '₹0';
  if (!isFinite(val)) return options?.hideSymbol ? '∞' : '₹∞';

  const isNegative = val < 0;
  const absVal = Math.abs(val);

  if (options?.compact) {
    let formatted = '';
    if (absVal >= 10000000) {
      const crVal = absVal / 10000000;
      formatted = `${crVal >= 1000 ? Math.round(crVal).toLocaleString('en-IN') : crVal.toFixed(2)} Cr`;
    } else if (absVal >= 100000) {
      formatted = `${(absVal / 100000).toFixed(2)} L`;
    } else if (absVal >= 1000) {
      formatted = `${(absVal / 1000).toFixed(1)} K`;
    } else {
      formatted = Math.round(absVal).toString();
    }
    return `${isNegative ? '-' : ''}${options?.hideSymbol ? '' : '₹'}${formatted}`;
  }

  // For numbers over 100 Crores, show readable Crores representation
  if (absVal >= 1000000000) {
    const crVal = absVal / 10000000;
    const formatted = `${Math.round(crVal).toLocaleString('en-IN')} Cr`;
    return `${isNegative ? '-' : ''}${options?.hideSymbol ? '' : '₹'}${formatted}`;
  }

  const rounded = Math.round(absVal);
  const formatted = rounded.toLocaleString('en-IN');
  return `${isNegative ? '-' : ''}${options?.hideSymbol ? '' : '₹'}${formatted}`;
}

/**
 * Calculate SIP (Systematic Investment Plan)
 * Standard formula with monthly compounding:
 * M = P * [((1 + i)^n - 1) / i] * (1 + i)
 * Supports Step-Up SIP (increasing monthly investment by stepUpPercent every 12 months)
 */
export function calculateSIP(
  monthlyInvestment: number,
  years: number,
  annualRate: number,
  stepUpPercent = 0,
  inflationRate = 0
): SIPResult {
  const safeInvestment = Math.max(0, monthlyInvestment || 0);
  const safeYears = Math.min(100, Math.max(0.08, years || 1));
  const safeRate = Math.max(0, annualRate || 0);
  const safeStepUp = Math.max(0, stepUpPercent || 0);
  const safeInflation = Math.max(0, inflationRate || 0);

  const totalMonths = Math.max(1, Math.round(safeYears * 12));
  const monthlyRate = safeRate / 100 / 12;

  let currentMonthlyInvestment = safeInvestment;
  let runningBalance = 0;
  let totalInvested = 0;

  const yearlyBreakdown: SIPResult['yearlyBreakdown'] = [];

  let yearOpeningBalance = 0;
  let yearInvested = 0;
  let yearReturns = 0;

  for (let month = 1; month <= totalMonths; month++) {
    // If step-up is enabled, increment after every 12 months
    if (safeStepUp > 0 && month > 1 && (month - 1) % 12 === 0) {
      currentMonthlyInvestment = Math.round(currentMonthlyInvestment * (1 + safeStepUp / 100));
    }

    totalInvested += currentMonthlyInvestment;
    yearInvested += currentMonthlyInvestment;

    // Monthly compounding with payment at beginning of month:
    // (Balance + P) * (1 + r)
    const monthStartBalance = runningBalance + currentMonthlyInvestment;
    const interestEarned = monthStartBalance * monthlyRate;
    runningBalance = monthStartBalance + interestEarned;
    yearReturns += interestEarned;

    // At the end of each year (or final month)
    if (month % 12 === 0 || month === totalMonths) {
      const yearNumber = Math.ceil(month / 12);
      yearlyBreakdown.push({
        year: yearNumber,
        openingBalance: Math.round(yearOpeningBalance),
        investedThisYear: Math.round(yearInvested),
        totalInvestedSoFar: Math.round(totalInvested),
        returnsEarnedThisYear: Math.round(yearReturns),
        closingBalance: Math.round(runningBalance),
        monthlyInstallment: Math.round(currentMonthlyInvestment),
      });

      yearOpeningBalance = runningBalance;
      yearInvested = 0;
      yearReturns = 0;
    }
  }

  const finalWealth = Math.round(runningBalance);
  const totalProfit = Math.max(0, finalWealth - totalInvested);
  const multiplier = totalInvested > 0 ? Number((finalWealth / totalInvested).toFixed(2)) : 1;

  // Inflation adjusted real purchasing power: PV = FV / (1 + inf)^years
  const inflationFactor = Math.pow(1 + safeInflation / 100, safeYears);
  const inflationAdjusted = Math.round(finalWealth / (inflationFactor || 1));

  return {
    investedAmount: totalInvested,
    totalWealth: finalWealth,
    profit: totalProfit,
    wealthMultiplier: multiplier,
    inflationAdjustedWealth: inflationAdjusted,
    yearlyBreakdown,
  };
}

/**
 * Calculate SWP (Systematic Withdrawal Plan)
 * User deposits initial lump sum corpus, then withdraws a fixed monthly amount.
 * The remaining balance keeps compounding at the annualRate.
 */
export function calculateSWP(
  initialInvestment: number,
  monthlyWithdrawal: number,
  annualRate: number,
  years: number
): SWPResult {
  const safeInvestment = Math.max(0, initialInvestment || 0);
  const safeWithdrawal = Math.max(0, monthlyWithdrawal || 0);
  const safeRate = Math.max(0, annualRate || 0);
  const safeYears = Math.min(100, Math.max(0.08, years || 1));

  const totalMonths = Math.max(1, Math.round(safeYears * 12));
  const monthlyRate = safeRate / 100 / 12;

  let balance = safeInvestment;
  let totalWithdrawn = 0;
  let isDepleted = false;
  let depletionYear: number | null = null;
  let depletionMonth: number | null = null;

  const yearlyBreakdown: SWPResult['yearlyBreakdown'] = [];

  let yearOpeningBalance = balance;
  let yearWithdrawn = 0;
  let yearReturns = 0;

  for (let month = 1; month <= totalMonths; month++) {
    if (balance <= 0) {
      if (!isDepleted) {
        isDepleted = true;
        depletionYear = Math.ceil(month / 12);
        depletionMonth = month;
      }
      balance = 0;
    }

    // Withdrawal amount for this month
    const actualWithdrawal = Math.min(balance, safeWithdrawal);
    totalWithdrawn += actualWithdrawal;
    yearWithdrawn += actualWithdrawal;
    balance -= actualWithdrawal;

    // Remaining balance earns return
    const interest = balance * monthlyRate;
    balance += interest;
    yearReturns += interest;

    if (month % 12 === 0 || month === totalMonths) {
      const yearNumber = Math.ceil(month / 12);
      yearlyBreakdown.push({
        year: yearNumber,
        openingBalance: Math.round(yearOpeningBalance),
        withdrawnThisYear: Math.round(yearWithdrawn),
        totalWithdrawnSoFar: Math.round(totalWithdrawn),
        returnsEarnedThisYear: Math.round(yearReturns),
        closingBalance: Math.round(Math.max(0, balance)),
      });

      yearOpeningBalance = Math.max(0, balance);
      yearWithdrawn = 0;
      yearReturns = 0;
    }
  }

  const finalBalance = Math.round(Math.max(0, balance));
  const netBenefit = Math.round(totalWithdrawn + finalBalance - safeInvestment);

  return {
    initialInvestment: safeInvestment,
    totalWithdrawn: Math.round(totalWithdrawn),
    finalBalance,
    isDepleted,
    depletionYear,
    depletionMonth,
    netBenefit,
    yearlyBreakdown,
  };
}

/**
 * Calculate Lumpsum Investment Return
 * A = P * (1 + r/100)^t
 */
export function calculateLumpsum(oneTimeInvestment: number, years: number, annualRate: number): LumpsumResult {
  const safeInvestment = Math.max(0, oneTimeInvestment || 0);
  const safeYears = Math.min(100, Math.max(1, Math.round(years || 1)));
  const safeRate = Math.max(0, annualRate || 0);

  const yearlyBreakdown: LumpsumResult['yearlyBreakdown'] = [];
  let balance = safeInvestment;
  const rateMultiplier = 1 + safeRate / 100;

  for (let y = 1; y <= safeYears; y++) {
    const opening = balance;
    const closing = balance * rateMultiplier;
    const returnsEarned = closing - opening;
    balance = closing;

    yearlyBreakdown.push({
      year: y,
      openingBalance: Math.round(opening),
      returnsEarnedThisYear: Math.round(returnsEarned),
      closingBalance: Math.round(closing),
    });
  }

  const finalWealth = Math.round(balance);
  const profit = Math.max(0, Math.round(finalWealth - safeInvestment));
  const multiplier = safeInvestment > 0 ? Number((finalWealth / safeInvestment).toFixed(2)) : 1;

  return {
    investedAmount: safeInvestment,
    totalWealth: finalWealth,
    profit,
    wealthMultiplier: multiplier,
    yearlyBreakdown,
  };
}

/**
 * Calculate Required Monthly SIP to reach a Goal Target Amount
 * P = M / [(((1+i)^n - 1)/i) * (1+i)]
 */
export function calculateGoalSIP(targetAmount: number, years: number, annualRate: number): GoalSIPResult {
  const safeTarget = Math.max(0, targetAmount || 0);
  const safeYears = Math.min(100, Math.max(0.1, years || 1));
  const safeRate = Math.max(0, annualRate || 0);

  const months = Math.max(1, Math.round(safeYears * 12));
  const i = safeRate / 100 / 12;

  let requiredMonthlySIP = 0;
  if (i === 0) {
    requiredMonthlySIP = Math.round(safeTarget / months);
  } else {
    const factor = ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
    requiredMonthlySIP = factor > 0 ? Math.round(safeTarget / factor) : 0;
  }

  const totalInvestment = requiredMonthlySIP * months;
  const totalReturns = Math.max(0, safeTarget - totalInvestment);

  return {
    targetAmount: safeTarget,
    years: safeYears,
    annualRate: safeRate,
    requiredMonthlySIP,
    totalInvestment,
    totalReturns,
  };
}

/**
 * Loan EMI calculation
 * EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
 */
export function calculateLoanEMI(principal: number, annualRate: number, tenureYears: number): LoanEMIResult {
  const safePrincipal = Math.max(0, principal || 0);
  const safeRate = Math.max(0, annualRate || 0);
  const safeTenure = Math.min(100, Math.max(1, Math.round(tenureYears || 1)));

  const totalMonths = safeTenure * 12;
  const monthlyRate = safeRate / 100 / 12;

  let monthlyEMI = 0;
  if (monthlyRate === 0) {
    monthlyEMI = Math.round(safePrincipal / totalMonths);
  } else {
    const emiFactor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyEMI = Math.round((safePrincipal * monthlyRate * emiFactor) / (emiFactor - 1));
  }

  const totalPayment = monthlyEMI * totalMonths;
  const totalInterest = Math.max(0, totalPayment - safePrincipal);

  let balance = safePrincipal;
  const yearlyBreakdown: LoanEMIResult['yearlyBreakdown'] = [];

  for (let y = 1; y <= safeTenure; y++) {
    const yearOpening = balance;
    let interestThisYear = 0;
    let principalThisYear = 0;

    for (let m = 1; m <= 12; m++) {
      const interestMonth = balance * monthlyRate;
      const principalMonth = monthlyEMI - interestMonth;
      balance = Math.max(0, balance - principalMonth);
      interestThisYear += interestMonth;
      principalThisYear += principalMonth;
    }

    yearlyBreakdown.push({
      year: y,
      openingBalance: Math.round(yearOpening),
      principalPaidThisYear: Math.round(principalThisYear),
      interestPaidThisYear: Math.round(interestThisYear),
      totalPaidThisYear: Math.round(principalThisYear + interestThisYear),
      closingBalance: Math.round(balance),
    });
  }

  return {
    principal,
    monthlyEMI,
    totalInterest,
    totalPayment,
    yearlyBreakdown,
  };
}
