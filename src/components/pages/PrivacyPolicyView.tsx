import React from 'react';
import { ShieldCheck, Lock, Cookie, Eye, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-2 text-slate-800 dark:text-slate-200">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Last Updated: October 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          How FinGrow handles your information, respects your privacy, and ensures compliance with global data protection standards.
        </p>
      </div>

      {/* Overview Notice */}
      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300 text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Our Privacy Commitment: Pure Client-Side Financial Calculations</span>
        </div>
        <p className="text-xs sm:text-sm text-emerald-950/90 dark:text-emerald-200/90 leading-relaxed">
          At <strong>FinGrow</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Service&rdquo;), we believe your personal wealth numbers belong to you alone. All calculations, slider inputs, tenure selections, and financial projections you execute on FinGrow are processed <strong>entirely inside your web browser (client-side)</strong>. We do not transmit, log, sell, or store your investment amounts, salary data, or retirement balances on any server.
        </p>
      </div>

      {/* Table of Contents / Quick Jump */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-8 shadow-xs">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>1. Information We Collect</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
            <p>
              We prioritize minimal data collection. We only encounter information in the following specific contexts:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Financial Inputs:</strong> Values entered into our SIP, SWP, Goal, or Loan calculators (such as investment amount, expected rate of return, and tenure) exist solely in memory during your active session. They are never recorded in a database.
              </li>
              <li>
                <strong>Communications:</strong> If you voluntarily reach out to us via our Contact form or email, we receive your name, email address, subject, and the contents of your inquiry solely for the purpose of responding to your request.
              </li>
              <li>
                <strong>Server Logs &amp; Technical Telemetry:</strong> Like almost all web servers, standard access logs (e.g., your browser type, operating system, referring URL, date/time stamps, and anonymized IP addresses) may be generated for network diagnostics and DDoS prevention.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Cookie className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>2. Cookies &amp; Local Storage</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
            <p>
              We use lightweight web technologies to maintain essential website functionality:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Local Storage:</strong> We use your browser&apos;s <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">localStorage</code> to remember your theme preference (Light Mode vs Dark Mode). No personal identities are attached to this key.
              </li>
              <li>
                <strong>Essential Cookies:</strong> Temporary session cookies may be utilized by the hosting infrastructure to balance server load and maintain secure connection handshakes.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Advertising & Google AdSense */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>3. Google AdSense &amp; Third-Party Advertising Technologies</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
            <p>
              To keep FinGrow free and accessible to all users, we may display third-party advertisements via <strong>Google AdSense</strong> once approved and configured by the website owner.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <span className="font-semibold text-slate-900 dark:text-white block">
                Mandatory Google AdSense Disclosures (When Active):
              </span>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300">
                <li>
                  Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites.
                </li>
                <li>
                  Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to your sites and/or other sites on the Internet.
                </li>
                <li>
                  Users may opt out of personalized advertising by visiting{' '}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 underline font-medium"
                  >
                    Google Ads Settings
                  </a>
                  . Alternatively, you can opt out of third-party vendor&apos;s use of cookies for personalized advertising by visiting{' '}
                  <a
                    href="https://www.aboutads.info"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 underline font-medium"
                  >
                    www.aboutads.info
                  </a>
                  .
                </li>
              </ul>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              <strong>Honesty Disclosure:</strong> In current development mode, advertising scripts are disabled until the site operator inputs their verified publisher identification.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>4. User Rights (GDPR, CCPA &amp; Indian DPDP Act)</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
            <p>
              Depending on your jurisdiction, you possess statutory rights regarding your personal information:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Right to Access &amp; Portability:</strong> Request confirmation of what personal data we hold.</li>
              <li><strong>Right to Rectification &amp; Erasure:</strong> Request correction or deletion of email communications you have sent us.</li>
              <li><strong>Right to Object &amp; Restrict Processing:</strong> Opt out of marketing or third-party ad tracking at any time.</li>
            </ul>
          </div>
        </section>

        {/* Section 5: Contact Information */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>5. Contacting Us Regarding Privacy</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please contact the website administrator:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1 font-mono">
              <div><strong>Website:</strong> FinGrow Financial Calculators (fingrow.app / custom domain)</div>
              <div><strong>Owner / Operator:</strong> FinGrow Development Team</div>
              <div><strong>Privacy Inquiries:</strong> mysticdev65@gmail.com</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
