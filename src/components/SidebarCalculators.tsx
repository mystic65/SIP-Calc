import React from 'react';
import {
  TrendingUp,
  Wallet,
  Coins,
  Repeat,
  ArrowDownCircle,
  Building2,
  Landmark,
  Car,
  Home,
  CheckCircle2,
  BookOpen,
  Info,
  Mail,
  ShieldCheck,
  Scale,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

interface SidebarCalculatorsProps {
  activeCalculator: string;
  onSelectCalculator: (id: string, options?: { amcName?: string; defaultRate?: number; articleId?: string }) => void;
}

export const SidebarCalculators: React.FC<SidebarCalculatorsProps> = ({
  activeCalculator,
  onSelectCalculator,
}) => {
  const popularCalculators = [
    {
      id: 'mf_returns',
      label: 'Mutual Fund Returns Calculator',
      icon: TrendingUp,
    },
    {
      id: 'sip',
      label: 'SIP Calculator',
      icon: Repeat,
      badge: 'Popular',
    },
    {
      id: 'lumpsum',
      label: 'Lumpsum Calculator',
      icon: Coins,
    },
    {
      id: 'stepup',
      label: 'Step-Up SIP Calculator',
      icon: TrendingUp,
    },
    {
      id: 'swp',
      label: 'SWP Calculator',
      icon: ArrowDownCircle,
      badge: 'Retirement',
    },
    {
      id: 'fd',
      label: 'FD Calculator',
      icon: Landmark,
    },
    {
      id: 'nps',
      label: 'NPS Calculator',
      icon: Wallet,
    },
    {
      id: 'home_loan',
      label: 'Home Loan EMI Calculator',
      icon: Home,
    },
    {
      id: 'car_loan',
      label: 'Car Loan EMI Calculator',
      icon: Car,
    },
  ];

  const mfCategoriesList = [
    { name: 'Nifty 50 Index Fund', amc: 'Large Cap Index', rate: 13.5, category: 'Low Cost Passive' },
    { name: 'Flexi Cap Equity Fund', amc: 'Diversified Equity', rate: 15.2, category: 'All-Cap Growth' },
    { name: 'Mid Cap Opportunities', amc: 'Mid Cap Equity', rate: 17.4, category: 'High Growth' },
    { name: 'Balanced Advantage Fund', amc: 'Hybrid Dynamic', rate: 11.8, category: 'Moderate Risk' },
    { name: 'Small Cap Discovery Fund', amc: 'Small Cap Equity', rate: 19.5, category: 'Aggressive Alpha' },
  ];

  const educationalArticles = [
    { id: 'what-is-sip', title: 'What is a SIP (Systematic Plan)?' },
    { id: 'what-is-swp', title: 'What is an SWP (Withdrawal Plan)?' },
    { id: 'how-compound-growth-works', title: 'How Compound Growth Works (Rule of 72)' },
    { id: 'inflation-retirement-planning', title: 'How Inflation Affects Retirement' },
    { id: 'how-to-use-mutual-fund-calculator', title: 'How to Use a Mutual Fund Calculator' },
    { id: 'interpreting-returns-and-risk', title: 'Interpreting Returns & Investment Risk' },
  ];

  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-6">
      {/* Popular Calculators Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs transition-colors">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-3 px-1 flex items-center justify-between">
          <span>Popular Calculators</span>
          <span className="text-[11px] font-normal text-slate-400">9 Tools</span>
        </h2>

        <div className="space-y-1.5">
          {popularCalculators.map((calc) => {
            const isActive = activeCalculator === calc.id;
            const Icon = calc.icon;

            return (
              <button
                key={calc.id}
                type="button"
                onClick={() => onSelectCalculator(calc.id)}
                className={`w-full text-left py-2.5 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-emerald-600 dark:text-white shadow-sm ring-1 ring-slate-900 dark:ring-emerald-500'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span className="truncate">{calc.label}</span>
                </div>
                {calc.badge && !isActive && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {calc.badge}
                  </span>
                )}
                {isActive && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-white/90 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Educational Guides Section */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs transition-colors">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Educational Guides</span>
          </h2>
          <button
            type="button"
            onClick={() => onSelectCalculator('education')}
            className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            View All &rarr;
          </button>
        </div>

        <div className="space-y-1.5">
          {educationalArticles.map((art) => (
            <button
              key={art.id}
              type="button"
              onClick={() => onSelectCalculator('education', { articleId: art.id })}
              className="w-full text-left py-2 px-2.5 rounded-lg text-[11.5px] font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-slate-800/60 border border-transparent hover:border-emerald-100 dark:hover:border-slate-700 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <span className="line-clamp-1">{art.title}</span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </div>

      {/* Company, Compliance & Legal Hub */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs transition-colors">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2.5 px-1 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>About &amp; Compliance</span>
        </h2>

        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onSelectCalculator('about')}
            className="w-full text-left py-1.5 px-2.5 rounded-md text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Info className="w-3.5 h-3.5 text-emerald-500" />
            <span>About FinGrow</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectCalculator('contact')}
            className="w-full text-left py-1.5 px-2.5 rounded-md text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-emerald-500" />
            <span>Contact Us</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectCalculator('privacy')}
            className="w-full text-left py-1.5 px-2.5 rounded-md text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Privacy Policy</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectCalculator('terms')}
            className="w-full text-left py-1.5 px-2.5 rounded-md text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Scale className="w-3.5 h-3.5 text-emerald-500" />
            <span>Terms of Use</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectCalculator('disclaimer')}
            className="w-full text-left py-1.5 px-2.5 rounded-md text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Financial Disclaimer</span>
          </button>
        </div>
      </div>

      {/* Mutual Fund Category Benchmark Calculators */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs transition-colors">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-3 px-1 flex items-center justify-between">
          <span>Fund Benchmarks</span>
          <span className="text-[11px] font-normal text-slate-400">Typical CAGR</span>
        </h2>

        <div className="space-y-1.5">
          {mfCategoriesList.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => {
                onSelectCalculator('sip', { amcName: item.name, defaultRate: item.rate });
              }}
              className="w-full text-left py-2.5 px-3 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-emerald-50/50 dark:hover:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                  {item.name}
                </span>
                <span className="text-[10.5px] text-slate-400 dark:text-slate-500">
                  Historical avg: ~{item.rate}% ({item.category})
                </span>
              </div>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                Apply &rarr;
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
