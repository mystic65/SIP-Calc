import React, { useState } from 'react';
import { X, Headphones, Send, ChevronRight } from 'lucide-react';

interface TheaAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCalculator: string;
}

export const TheaAssistantModal: React.FC<TheaAssistantModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'faq' | 'ask'>('faq');
  const [userQuery, setUserQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'thea' | 'user'; text: string }>>([
    {
      sender: 'thea',
      text: "Namaste! I'm THEA, your FinGrow wealth & calculator assistant. How can I help you understand your SIP or SWP calculations today?",
    },
  ]);

  const presetFaqs = [
    {
      q: 'What is the main difference between SIP and SWP?',
      a: 'SIP (Systematic Investment Plan) is for WEALTH ACCUMULATION: you invest a fixed amount regularly from your bank into mutual funds. SWP (Systematic Withdrawal Plan) is for WEALTH DISTRIBUTION: you deposit a lump sum corpus (like retirement savings) and withdraw regular monthly income while the remaining balance stays invested and continues earning returns.',
    },
    {
      q: 'How does Rupee Cost Averaging work in SIP?',
      a: 'When market prices (NAV) fall, your fixed monthly SIP buys more units automatically. When markets rise, it buys fewer units. This averages out your purchase cost without having to predict market timing.',
    },
    {
      q: 'What is the Safe Withdrawal Rate for an Indian SWP?',
      a: 'In India, where long-term inflation is around 5–6% and balanced hybrid funds historically return 9–11%, a withdrawal rate of 5% to 6% of your initial corpus per annum is typically considered very safe and sustainable for 25–30+ years.',
    },
    {
      q: 'What are the current tax rules on Mutual Fund returns in India?',
      a: 'Under the latest Indian Union Budget rules: Equity mutual fund gains held for over 12 months are classified as LTCG, taxed at 12.5% on gains exceeding ₹1.25 Lakh per financial year (first ₹1.25L gain is tax-free). Short-term capital gains (under 12 months) are taxed at 20%. SWP withdrawals only attract tax on the realized gain portion, not on your returned principal.',
    },
    {
      q: 'Why should I consider a Step-Up SIP?',
      a: 'A Step-Up SIP increases your monthly contribution annually (typically by 10%, in line with annual salary increments). Over a 15–20 year horizon, a 10% annual step-up often yields 40% to 65% higher total wealth than a flat, unchanging SIP.',
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const query = userQuery.trim().toLowerCase();
    const newMessages = [...messages, { sender: 'user' as const, text: userQuery }];
    setUserQuery('');

    let reply = "That's a great question regarding mutual funds. Consistently investing via SIP through bear and bull markets is the most proven wealth generator. Would you like to test different return scenarios in our calculator?";

    if (query.includes('tax') || query.includes('ltcg') || query.includes('stcg')) {
      reply = "For equity mutual funds in India: LTCG (>1 year holding) is taxed at 12.5% on gains exceeding ₹1.25 Lakh per financial year. STCG (<1 year holding) is taxed at 20%. Debt funds are taxed according to your individual income tax slab.";
    } else if (query.includes('swp') || query.includes('retire') || query.includes('withdrawal')) {
      reply = "SWP is the most tax-efficient method to generate monthly retirement pension in India. Unlike Bank FDs where all interest is taxed at your slab rate, an SWP only taxes the proportionate capital gain component of each withdrawal.";
    } else if (query.includes('step up') || query.includes('salary') || query.includes('increase')) {
      reply = "Step-Up SIP is recommended by all wealth managers! Stepping up your SIP by just 10% each year can nearly double your final 20-year corpus without putting sudden strain on your budget.";
    } else if (query.includes('best') || query.includes('fund') || query.includes('which')) {
      reply = "For a 10+ year horizon, a balanced combination of Large & Mid Cap, Flexi Cap, and a small allocation to Mid/Small Cap funds offers an optimal risk-return profile. You can benchmark different rates (12%, 14%, 16%) in our calculator.";
    }

    setMessages([...newMessages, { sender: 'thea' as const, text: reply }]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh] transition-colors">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-emerald-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white">
              <Headphones className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm tracking-wide">THEA Assistant</h3>
                <span className="text-[10px] bg-emerald-400 text-slate-900 font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                  Online
                </span>
              </div>
              <p className="text-xs text-slate-300">FinGrow Wealth &amp; Calculator Guide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-semibold bg-slate-50 dark:bg-slate-800">
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex-1 py-2.5 text-center transition-colors cursor-pointer ${
              activeTab === 'faq'
                ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-400 border-b-2 border-emerald-700 dark:border-emerald-500 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Compounding FAQs &amp; Rules
          </button>
          <button
            onClick={() => setActiveTab('ask')}
            className={`flex-1 py-2.5 text-center transition-colors cursor-pointer ${
              activeTab === 'ask'
                ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-400 border-b-2 border-emerald-700 dark:border-emerald-500 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Ask Questions
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {activeTab === 'faq' ? (
            <div className="space-y-2.5">
              {presetFaqs.map((faq, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-750 text-xs space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white flex items-start gap-1.5">
                    <ChevronRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 pl-5 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-slate-900 dark:bg-emerald-600 text-white font-medium'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Bar for Ask Tab */}
        {activeTab === 'ask' && (
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 dark:border-slate-800 flex gap-2 bg-white dark:bg-slate-900">
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Ask about taxation, compounding, or SWP..."
              className="flex-1 px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
