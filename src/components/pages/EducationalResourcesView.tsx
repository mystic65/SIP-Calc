import React, { useState } from 'react';
import { BookOpen, TrendingUp, DollarSign, Clock, ArrowRight, ShieldCheck, PieChart, Target, Compass, ChevronRight, Calculator, CheckCircle2 } from 'lucide-react';

interface EducationalResourcesViewProps {
  onNavigateCalculator: (id: string) => void;
  initialArticleId?: string;
}

interface Article {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  category: string;
  relatedCalculator: string;
  calculatorLabel: string;
  content: {
    lead: string;
    sections: {
      heading: string;
      body: string[];
      example?: {
        title: string;
        details: string[];
        disclaimer: string;
      };
    }[];
    takeaways: string[];
  };
}

export const EducationalResourcesView: React.FC<EducationalResourcesViewProps> = ({
  onNavigateCalculator,
  initialArticleId,
}) => {
  const articles: Article[] = [
    {
      id: 'what-is-sip',
      title: 'What is a Systematic Investment Plan (SIP)?',
      summary: 'Learn how monthly systematic investing harnesses rupee-cost averaging and compound interest to build long-term wealth without timing the stock market.',
      readTime: '6 min read',
      category: 'Investing Fundamentals',
      relatedCalculator: 'sip',
      calculatorLabel: 'Open FinGrow SIP Calculator',
      content: {
        lead: 'A Systematic Investment Plan (SIP) is an investment vehicle offered by mutual fund houses that allows individuals to invest a fixed predetermined amount at regular intervals—typically monthly or quarterly—into a selected mutual fund scheme.',
        sections: [
          {
            heading: 'How a SIP Operates: Eliminating Market Timing',
            body: [
              'One of the greatest psychological traps retail investors face is trying to "time" the market—attempting to buy at the absolute bottom and sell at the exact peak. In reality, market tops and bottoms are unpredictable.',
              'A SIP eliminates timing anxiety through mechanical discipline. On a designated date each month (e.g., the 5th or 10th), a pre-authorized sum is debited from your bank account and invested in units of your chosen fund at that day\'s Net Asset Value (NAV).',
            ],
          },
          {
            heading: 'The Core Advantage: Rupee Cost Averaging (RCA)',
            body: [
              'Rupee Cost Averaging is the mathematical mechanism that makes SIPs resilient during volatile market cycles. When stock market valuations tumble, the fund NAV drops, allowing your fixed monthly contribution to acquire a larger quantity of fund units.',
              'Conversely, when market sentiment is euphoric and valuations are elevated, the higher NAV means your contribution purchases fewer units. Over extended multi-year horizons (7 to 15+ years), this automatically drives your average acquisition cost per unit down without requiring any emotional decision-making.',
            ],
            example: {
              title: 'Illustrative Example: Rupee Cost Averaging During Market Volatility',
              details: [
                'Month 1: Invest ₹10,000 at NAV ₹100 = 100.00 Units allocated.',
                'Month 2: Market undergoes correction; NAV drops to ₹80. Invest ₹10,000 = 125.00 Units allocated.',
                'Month 3: Market rebounds; NAV recovers to ₹120. Invest ₹10,000 = 83.33 Units allocated.',
                'Total Invested: ₹30,000 | Total Units Accumulated: 308.33 Units.',
                'Average Cost per Unit: ₹97.30 (notice this is below the initial ₹100 entry price).',
                'Portfolio Value at ₹120 NAV: 308.33 × ₹120 = ₹37,000 (A profit of ₹7,000 despite extreme volatility).',
              ],
              disclaimer: 'Note: This hypothetical calculation is for illustrative educational purposes only and does not reflect actual mutual fund performance.',
            },
          },
          {
            heading: 'Choosing Between Regular SIP and Step-Up SIP',
            body: [
              'As your professional career progresses, your annual income and surplus savings naturally rise. A fixed SIP of ₹10,000 that feels substantial at age 25 may represent an insignificant fraction of your savings capacity at age 35.',
              'A Step-Up SIP (top-up SIP) automatically boosts your monthly contribution by a specified percentage (e.g., 10% or 15%) or a fixed rupee amount once every year. This simple annual adjustment can nearly double your final corpus compared to a flat SIP.',
            ],
          },
        ],
        takeaways: [
          'SIP enforces regular savings habits and removes emotional bias from investing.',
          'Rupee Cost Averaging turns market dips into unit accumulation opportunities.',
          'Small amounts compounded consistently over 15–20 years produce exponential wealth.',
        ],
      },
    },
    {
      id: 'what-is-swp',
      title: 'What is a Systematic Withdrawal Plan (SWP)?',
      summary: 'Explore how retirees and financial independence seekers create predictable monthly income streams while allowing the remaining balance to compound.',
      readTime: '7 min read',
      category: 'Retirement & Cash Flow',
      relatedCalculator: 'swp',
      calculatorLabel: 'Open FinGrow SWP Calculator',
      content: {
        lead: 'While a SIP helps you accumulate capital during your working years, a Systematic Withdrawal Plan (SWP) is designed for the decumulation phase. An SWP enables an investor to redeem a predetermined fixed amount from an existing mutual fund corpus at regular intervals.',
        sections: [
          {
            heading: 'The Mechanics of SWP Cash Flow',
            body: [
              'When you initiate an SWP, your accumulated capital remains invested in the mutual fund scheme, continuing to earn potential capital appreciation or interest. Each month, the fund house automatically redeems just enough units to generate your requested payout and transfers the cash into your registered bank account.',
              'If your annual withdrawal percentage is lower than the annual return rate generated by the remaining corpus, your principal balance continues to grow while funding your regular living expenses.',
            ],
          },
          {
            heading: 'Capital Longevity vs. Capital Depletion',
            body: [
              'A critical parameter in any SWP strategy is the Withdrawal Rate. If you withdraw too aggressively (e.g., 12% annually from a portfolio returning 10%), you will begin eating into the capital base. As capital shrinks, future compounding weakens, accelerating fund depletion.',
              'Financial planners frequently recommend conservative Safe Withdrawal Rates (SWR) between 4% and 6% for Indian retirement portfolios to withstand inflation, sequence of return risk, and prolonged market downturns.',
            ],
            example: {
              title: 'Illustrative Example: Capital Longevity Simulation',
              details: [
                'Initial Retirement Corpus: ₹1,00,00,000 (₹1 Crore).',
                'Monthly Withdrawal: ₹50,000 (₹6,00,000/year or 6% initial withdrawal rate).',
                'Assumed Average Annual Growth: 9% per annum.',
                'Year 1 Total Payout: ₹6,00,000 | Year 1 Return Earned: ~₹8,70,000.',
                'Result: Because returns exceeded withdrawals, the corpus expanded to ~₹1,02,70,000 while fully funding monthly needs.',
              ],
              disclaimer: 'Illustrative simulation assuming uniform returns. In actual markets, a severe crash in Year 1 or 2 (sequence of returns risk) would materially alter outcomes.',
            },
          },
          {
            heading: 'Tax Efficiency: SWP vs. Fixed Deposit (FD) Interest',
            body: [
              'In traditional Bank Fixed Deposits, the entire interest earned is added to your total income and taxed at your applicable slab rate (which can be up to 30% plus surcharges).',
              'With an SWP in equity mutual funds, each withdrawal is treated as a redemption of capital and capital gains. Only the proportionate capital gains component is taxed under LTCG rules (12.5% beyond the ₹1.25 Lakh annual exemption for equity funds). This makes SWP substantially more tax-efficient for individuals in higher tax brackets.',
            ],
          },
        ],
        takeaways: [
          'SWP provides structured, automated monthly cash flows for post-retirement living.',
          'Keeping your withdrawal rate below your portfolio\'s real return preserves wealth across decades.',
          'SWP redemption is significantly more tax-efficient than conventional bank interest payout schemes.',
        ],
      },
    },
    {
      id: 'how-compound-growth-works',
      title: 'How Does Compound Growth Work?',
      summary: 'Delve into the mathematical engine behind long-term investing, including the Rule of 72 and the famous 8-4-3 compounding acceleration law.',
      readTime: '6 min read',
      category: 'Compounding Mathematics',
      relatedCalculator: 'lumpsum',
      calculatorLabel: 'Open FinGrow Lumpsum Calculator',
      content: {
        lead: 'Albert Einstein famously characterized compound interest as the eighth wonder of the world. Compound growth is the process where interest earned on an investment begins generating its own interest over time, leading to non-linear, exponential accumulation.',
        sections: [
          {
            heading: 'Linear Growth vs. Exponential Compounding',
            body: [
              'Simple interest grows linearly: ₹1,00,000 at 10% earns exactly ₹10,000 every year. Over 30 years, it produces ₹3,00,000 in interest.',
              'Compound growth is fundamentally different. In Year 1, you earn ₹10,000. In Year 2, you earn 10% on the new total of ₹1,10,000 (which is ₹11,000). By Year 30, the annual return alone exceeds ₹1,58,000! Over 30 years, that same ₹1,00,000 grows to over ₹17,44,000—nearly six times higher than simple interest.',
            ],
          },
          {
            heading: 'The Rule of 72: Quick Doubling Estimation',
            body: [
              'The Rule of 72 is an indispensable mental math formula used by investors worldwide to calculate how many years it will take for money to double at a given annual rate of return: Doubling Time (Years) ≈ 72 ÷ Annual Return (%).',
              'For example, at an 8% return (typical conservative debt/hybrid portfolio), money doubles every ~9 years. At a 12% return (typical diversified equity benchmark), money doubles every 6 years. At 15%, your money doubles every 4.8 years.',
            ],
          },
          {
            heading: 'The 8-4-3 Rule: Compounding Acceleration in Practice',
            body: [
              'One of the most motivating phenomena in long-term SIP investing is how wealth acceleration compresses over time. In a disciplined equity SIP generating ~12% CAGR:',
              'It takes approximately 8 years to accumulate your first ₹25 Lakhs of net worth.',
              'It takes only 4 additional years to go from ₹25 Lakhs to ₹50 Lakhs.',
              'It takes just 3 additional years to surge from ₹50 Lakhs to ₹1 Crore (₹100 Lakhs).',
              'The first decade feels slow because your contributions dominate portfolio value. In the second and third decades, returns earned dwarf your fresh monthly savings.',
            ],
            example: {
              title: 'Illustrative Example: The Cost of a 5-Year Delay',
              details: [
                'Investor A starts investing ₹10,000/month at age 25. By age 55 (30 years) at 12% CAGR, total wealth is ~₹3.53 Crores (Total Invested: ₹36 Lakhs).',
                'Investor B delays until age 30 and invests ₹10,000/month for 25 years at 12% CAGR. Total wealth is ~₹1.89 Crores (Total Invested: ₹30 Lakhs).',
                'Result: A mere ₹6 Lakhs difference in actual money saved resulted in a staggering ₹1.64 Crore difference in final wealth due to compound time loss.',
              ],
              disclaimer: 'Hypothetical simulation based on monthly compounding. Actual future returns will vary.',
            },
          },
        ],
        takeaways: [
          'Time in the market is vastly more powerful than timing the market.',
          'Early returns look small, but the final 10 years account for the vast majority of total wealth.',
          'Use the Rule of 72 to estimate doubling time across different asset classes.',
        ],
      },
    },
    {
      id: 'inflation-retirement-planning',
      title: 'How Does Inflation Affect Retirement Planning?',
      summary: 'Understand the hidden erosion of purchasing power over decades, healthcare cost inflation in India, and how to compute real inflation-adjusted wealth.',
      readTime: '7 min read',
      category: 'Retirement Strategy',
      relatedCalculator: 'goal',
      calculatorLabel: 'Open FinGrow Goal Planner',
      content: {
        lead: 'Inflation is the persistent, silent decrease in the purchasing power of money over time. When planning for a retirement that may span 25 to 35 years, failing to account for inflation is the single most common cause of retirement shortfall.',
        sections: [
          {
            heading: 'The "Money Illusion" and Nominal vs. Real Returns',
            body: [
              'People often suffer from the "money illusion"—focusing on the face value of currency rather than what that currency can actually buy. If a fixed deposit promises a 7% annual interest rate, but overall inflation averages 6.5%, your real wealth is expanding by less than 0.5% per annum before taxes.',
              'After factoring in 20% to 30% income taxes on FD interest, your purchasing power is actually contracting in real terms. Over a 20-year period, keeping long-term funds in low-yield vehicles guarantees real wealth erosion.',
            ],
          },
          {
            heading: 'The Rule of 70 for Halving Purchasing Power',
            body: [
              'Just as the Rule of 72 determines how quickly money doubles, dividing 70 by the inflation rate reveals how fast purchasing power is cut in half: Halving Time (Years) ≈ 70 ÷ Inflation Rate (%).',
              'With Indian consumer inflation historically averaging approximately 6% to 7% per year, what costs ₹1,00,000 per month today will cost over ₹2,00,000 per month in just 10 to 11 years, and over ₹4,00,000 per month in 22 years.',
            ],
            example: {
              title: 'Illustrative Example: Future Living Cost Projection',
              details: [
                'Current Monthly Living Expenses at age 35: ₹50,000.',
                'Years to Retirement: 25 years (Retirement at age 60).',
                'Assumed Average Annual Inflation: 6.5%.',
                'Monthly Expenses at Retirement: Approximately ₹2,41,400/month.',
                'Total Corpus Required to sustain 30 years post-retirement: Approximately ₹5.8 to ₹6.5 Crores.',
              ],
              disclaimer: 'Illustrative calculation. Medical and educational inflation in urban India frequently outpaces CPI inflation.',
            },
          },
          {
            heading: 'Combating Inflation: The Role of Equity Allocation',
            body: [
              'Historically, diversified equity mutual funds have been one of the few liquid asset classes capable of delivering 4% to 6% "real" alpha above inflation over rolling 10-year windows.',
              'A prudent retirement plan does not switch 100% into fixed income the day you retire. A portion must remain invested in equity to protect against inflation over a 30-year post-retirement lifespan.',
            ],
          },
        ],
        takeaways: [
          'Always calculate retirement goals using inflation-adjusted purchasing power, not nominal rupees.',
          'At 6.5% inflation, living expenses double every 11 years.',
          'Maintaining a calculated equity allocation through retirement is crucial to preserve purchasing power.',
        ],
      },
    },
    {
      id: 'how-to-use-mutual-fund-calculator',
      title: 'How to Use a Mutual Fund Calculator Effectively',
      summary: 'A step-by-step masterclass on selecting realistic return benchmarks, configuring step-ups, and interpreting amortization schedules without common investor pitfalls.',
      readTime: '5 min read',
      category: 'Practical Tools',
      relatedCalculator: 'stepup',
      calculatorLabel: 'Open FinGrow Step-Up Calculator',
      content: {
        lead: 'Financial calculators are powerful tools for charting your path toward financial independence. However, the accuracy of any output is directly bounded by the realism of the inputs you provide—a concept known as "garbage in, garbage out".',
        sections: [
          {
            heading: 'Step 1: Setting Grounded Return Assumptions',
            body: [
              'A common mistake among new investors is assuming historical short-term bull-run returns (e.g., 25% or 30%) will persist for decades. While individual high-momentum years happen, broad equity indices over 15–20 year rolling periods generally deliver 12% to 14% CAGR.',
              'When using FinGrow calculators, conservative planning models should use 11% to 13% for diversified equity funds, 9% to 11% for aggressive hybrid funds, and 6% to 7% for debt funds.',
            ],
          },
          {
            heading: 'Step 2: Accounting for Annual Salary Increments (Step-Up)',
            body: [
              'Entering a flat monthly investment over a 25-year period significantly underestimates what you can achieve. If your salary grows by 8% to 12% annually, increasing your SIP by just 10% each year can supercharge your retirement corpus.',
              'Use the FinGrow Step-Up SIP Calculator to model annual top-ups and see how small increments compound into multi-crore differentials.',
            ],
          },
          {
            heading: 'Step 3: Inspecting Year-by-Year Amortization Tables',
            body: [
              'Do not just look at the final total wealth number. Scroll down to FinGrow\'s Year-by-Year Amortization Schedule to observe the turning point where annual returns earned surpass your annual fresh investments.',
              'Download the schedule as a CSV to incorporate it into your personal spreadsheet or financial review discussions with your certified advisor.',
            ],
          },
        ],
        takeaways: [
          'Use moderate, long-term return assumptions (12–14% for equity) rather than extreme bull-market outliers.',
          'Model step-up increments to align with expected career salary growth.',
          'Review the yearly amortization table to understand the non-linear timeline of compounding.',
        ],
      },
    },
    {
      id: 'interpreting-returns-and-risk',
      title: 'How to Interpret Projected Returns and Investment Risk',
      summary: 'Learn the difference between mathematical averages and real-world volatility, standard deviation, drawdowns, and asset allocation strategies.',
      readTime: '7 min read',
      category: 'Risk Management',
      relatedCalculator: 'sip',
      calculatorLabel: 'Open FinGrow SIP Calculator',
      content: {
        lead: 'Every calculator provides a smooth, upward-sloping compounding curve. In reality, market wealth accumulation is never a straight line. Understanding the distinction between projected average returns and real-world market risk is essential to remaining invested during tough times.',
        sections: [
          {
            heading: 'CAGR vs. Rolling Returns: Why Averages Can Be Misleading',
            body: [
              'Compound Annual Growth Rate (CAGR) measures the geometric mean return of an investment over a multi-year period. However, CAGR masks volatility. A fund with a 14% 5-year CAGR may have suffered a -20% drawdown during Year 2 before staging a massive recovery in Year 4.',
              'Rolling returns provide a clearer picture by measuring returns across every continuous 3-year, 5-year, or 10-year window, demonstrating the probability of experiencing temporary capital losses in the short term.',
            ],
          },
          {
            heading: 'Understanding Drawdowns and Emotional Tolerance',
            body: [
              'A drawdown is the percentage drop from an asset\'s peak value to its subsequent trough. During historic market events (such as the 2008 global financial crisis or the March 2020 COVID crash), broad indices dropped 35% to 55% within months.',
              'Investors who do not understand risk panic-sell at market bottoms, turning paper losses into permanent capital destruction. A mathematical simulation assumes you stay the course without interrupting your SIP.',
            ],
          },
          {
            heading: 'Asset Allocation: The Ultimate Shock Absorber',
            body: [
              'Asset allocation—the division of your portfolio between equities, fixed income (debt), gold, and cash—accounts for over 90% of portfolio return variability and risk profile.',
              'Younger investors with long time horizons (15+ years) can tolerate higher equity exposure (70–80%) to maximize compounding. As you approach major goals or retirement, shifting progressively toward debt preserves accumulated gains against sudden market contractions.',
            ],
          },
        ],
        takeaways: [
          'Calculators show deterministic projections; real markets feature sharp temporary drawdowns.',
          'Staying invested through bear markets is the single prerequisite to realizing long-term compounded gains.',
          'Proper asset allocation balances growth needs with emotional risk tolerance.',
        ],
      },
    },
  ];

  const [activeArticleId, setActiveArticleId] = useState<string>(initialArticleId || articles[0].id);

  const currentArticle = articles.find((a) => a.id === activeArticleId) || articles[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>FinGrow Financial Education Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Educational Resources
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Comprehensive, unbiased educational articles to help you master mutual fund mechanics, compounding principles, retirement safety, and risk management.
        </p>
      </div>

      {/* Main Grid: Sidebar of Articles + Active Article Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Article Navigator / Selector (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1">
            Browse All Guides ({articles.length})
          </div>
          <div className="space-y-2">
            {articles.map((art) => {
              const isSelected = art.id === activeArticleId;
              return (
                <button
                  key={art.id}
                  type="button"
                  onClick={() => {
                    setActiveArticleId(art.id);
                    window.scrollTo({ top: 180, behavior: 'smooth' });
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-emerald-500 shadow-md ring-1 ring-emerald-500/20'
                      : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{art.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                  </div>
                  <h3 className={`text-xs sm:text-sm font-bold line-clamp-2 ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                    {art.title}
                  </h3>
                  <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-slate-400 dark:text-slate-500">
                    <span className="line-clamp-1">{art.summary}</span>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-emerald-500 translate-x-1' : ''}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Article Content Area (8 cols on lg) */}
        <article className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-8">
          {/* Article Header */}
          <div className="space-y-4 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
                {currentArticle.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {currentArticle.readTime}
              </span>
              <span>&bull;</span>
              <span>Independent Educational Guide</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {currentArticle.title}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              {currentArticle.content.lead}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {currentArticle.content.sections.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span>{sec.heading}</span>
                </h3>

                {sec.body.map((p, pIdx) => (
                  <p key={pIdx} className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {p}
                  </p>
                ))}

                {sec.example && (
                  <div className="mt-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
                    <div className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>{sec.example.title}</span>
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-mono">
                      {sec.example.details.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2 text-[11px] text-slate-400 italic border-t border-slate-200 dark:border-slate-700">
                      {sec.example.disclaimer}
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Key Takeaways */}
          <div className="p-5 sm:p-6 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 space-y-3">
            <h4 className="font-bold text-sm sm:text-base text-emerald-950 dark:text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Key Takeaways for Investors</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-200/90">
              {currentArticle.content.takeaways.map((takeaway, tIdx) => (
                <li key={tIdx} className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">&bull;</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Calculator CTA */}
          <div className="p-5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Simulate Your Own Numbers
              </span>
              <h5 className="text-base font-bold text-white">
                Test these concepts with custom inputs on FinGrow
              </h5>
            </div>
            <button
              type="button"
              onClick={() => onNavigateCalculator(currentArticle.relatedCalculator)}
              className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shrink-0 inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>{currentArticle.calculatorLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};
