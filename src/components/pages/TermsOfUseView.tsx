import React from 'react';
import { Scale, CheckCircle, AlertTriangle, ShieldAlert, FileText } from 'lucide-react';

export const TermsOfUseView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-2 text-slate-800 dark:text-slate-200">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Last Updated: October 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Terms of Use
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Please review the terms and conditions governing your access to and use of FinGrow financial calculators and educational materials.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-8 shadow-xs">
        {/* Section 1: Acceptance */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>1. Acceptance of Terms</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            By visiting, accessing, or using the FinGrow website and its associated computational tools, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree with any part of these terms, please discontinue use of the website immediately.
          </p>
        </section>

        {/* Section 2: Permitted Use */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>2. Permitted Use &amp; Educational Purpose</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            FinGrow provides educational simulators, compounding models, and financial literacy content. You are granted a non-exclusive, non-transferable, revocable license to access and use the calculators solely for personal, non-commercial, and informational evaluation. You agree not to:
          </p>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed">
            <li>Scrape, reverse-engineer, or deploy automated bots to extract calculation outputs or programmatic assets.</li>
            <li>Use the website to transmit malicious code, interfere with server infrastructure, or bypass security protocols.</li>
            <li>Frame or re-brand FinGrow calculator outputs to misrepresent them as guaranteed financial products or certified investment advice.</li>
          </ul>
        </section>

        {/* Section 3: Calculator Estimates & Limitations */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>3. Nature of Estimates &amp; Mathematical Limitations</span>
          </h2>
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-xs sm:text-sm text-amber-900 dark:text-amber-200 space-y-2 leading-relaxed">
            <p>
              <strong>Hypothetical Simulations Only:</strong> The calculations performed on FinGrow (including SIP, SWP, Step-Up SIP, Lumpsum, Goal Planning, and Loan EMIs) represent hypothetical projections based upon user-inputted numbers and uniform compounding interest equations.
            </p>
            <p>
              Actual investment returns in equity markets, debt funds, and real estate are unpredictable, non-linear, and subject to economic cycles, regulatory reforms, and market downturns. Constant percentage growth curves shown in graphs never reflect day-to-day NAV fluctuations.
            </p>
          </div>
        </section>

        {/* Section 4: User Responsibilities */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <ShieldAlert className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>4. User Responsibilities &amp; Professional Advice</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            You are solely responsible for evaluating the suitability, risk, and tax consequences of any investment or borrowing decisions. Before making any financial commitment, purchasing mutual funds, executing systematic withdrawal plans, or taking on debt, you should consult a licensed <strong>SEBI Registered Investment Advisor (RIA)</strong>, Chartered Accountant (CA), or Certified Financial Planner (CFP).
          </p>
        </section>

        {/* Section 5: Third-Party Links & Advertising */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Scale className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>5. Third-Party Links &amp; Advertising</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            The website may contain links to external third-party websites or serve advertisements powered by Google AdSense or certified advertising networks. FinGrow exercises no control over third-party content, policies, or product offerings, and assumes no liability for goods or services obtained through third-party platforms.
          </p>
        </section>

        {/* Section 6: Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span>6. Limitation of Liability (&ldquo;As Is&rdquo; Service)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To the maximum extent permitted under applicable law, FinGrow and its creators, operators, and affiliates provide this website on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express, implied, or statutory. In no event shall FinGrow be liable for any direct, indirect, incidental, consequential, special, or punitive damages, including without limitation loss of profits, investment losses, computational discrepancies, or business interruptions arising out of your use or inability to use the calculators.
          </p>
        </section>

        {/* Section 7: Intellectual Property */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>7. Intellectual Property &amp; Updates</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            All proprietary code, branding, interface designs, original educational articles, and visual graphics are the property of FinGrow. We reserve the right to revise or update these Terms of Use at any time without prior individual notice. Your continued use of the website following any posted modifications constitutes agreement to the updated terms.
          </p>
        </section>
      </div>
    </div>
  );
};
