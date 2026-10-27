import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, Copy, Check, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';

export const ContactUsView: React.FC = () => {
  const targetEmail = 'mysticdev65@gmail.com';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Validate fields
  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide your full name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address (e.g., name@example.com).';
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errs.subject = 'Please enter a descriptive subject (at least 3 characters).';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please include a message with details (at least 10 characters).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Dispatches directly to FormSubmit connected to mysticdev65@gmail.com
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[FinGrow User Query] ${formData.subject}`,
          message: formData.message,
          _replyto: formData.email,
          _template: 'table',
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok || data.success === 'true' || data.success === true) {
        setSubmitStatus('success');
        setStatusMessage(
          `Thank you, ${formData.name}! Your message has been successfully delivered to ${targetEmail}. We will get back to your email (${formData.email}) shortly.`
        );
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Fallback: If submission service is blocked, trigger mailto
        setSubmitStatus('error');
        setStatusMessage(
          `Message could not be sent automatically. Click the 'Send via Email App' button below to send your query directly to ${targetEmail}.`
        );
      }
    } catch {
      setSubmitStatus('error');
      setStatusMessage(
        `Network issue connecting to email gateway. You can send your pre-filled inquiry directly to ${targetEmail} using the button below.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMailto = () => {
    const subjectEncoded = encodeURIComponent(`[FinGrow Inquiry] ${formData.subject || 'Website Question'}`);
    const bodyEncoded = encodeURIComponent(
      `Name: ${formData.name || 'User'}\nEmail: ${formData.email || 'N/A'}\n\nMessage:\n${formData.message || ''}`
    );
    window.location.href = `mailto:${targetEmail}?subject=${subjectEncoded}&body=${bodyEncoded}`;
  };

  const handleCopyDraft = () => {
    const draft = `To: ${targetEmail}\nFrom: ${formData.name || 'User'} <${formData.email || 'N/A'}>\nSubject: ${formData.subject || 'FinGrow Inquiry'}\n\nMessage:\n${formData.message}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(draft);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2000);
    }
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto py-2">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Direct Inquiries: {targetEmail}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Contact <span className="text-emerald-600 dark:text-emerald-400">FinGrow</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Have questions regarding our financial formulas, need assistance, or want to suggest a new calculator? Send your query directly to our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Name Field */}
            <div>
              <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Your Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Rajesh Sharma"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors focus:outline-none focus:ring-2 ${
                  errors.name
                    ? 'border-rose-400 focus:ring-rose-500 dark:border-rose-600'
                    : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-600 focus:border-transparent'
                }`}
              />
              {errors.name && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Your Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="rajesh.sharma@example.com"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-rose-400 focus:ring-rose-500 dark:border-rose-600'
                    : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-600 focus:border-transparent'
                }`}
              />
              {errors.email && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.email}</p>}
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Subject <span className="text-rose-500">*</span>
              </label>
              <input
                id="contact-subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Question about SIP or SWP Formula"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors focus:outline-none focus:ring-2 ${
                  errors.subject
                    ? 'border-rose-400 focus:ring-rose-500 dark:border-rose-600'
                    : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-600 focus:border-transparent'
                }`}
              />
              {errors.subject && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.subject}</p>}
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Your Query / Message <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Explain your query, calculation parameters, or feedback in detail..."
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors focus:outline-none focus:ring-2 resize-y ${
                  errors.message
                    ? 'border-rose-400 focus:ring-rose-500 dark:border-rose-600'
                    : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-600 focus:border-transparent'
                }`}
              />
              {errors.message && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.message}</p>}
            </div>

            {/* Live Success Banner */}
            {submitStatus === 'success' && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs space-y-1.5 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-800 dark:text-emerald-300">
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Query Sent to {targetEmail}</span>
                </div>
                <p className="leading-relaxed">{statusMessage}</p>
              </div>
            )}

            {/* Error or Fallback Banner */}
            {submitStatus === 'error' && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs space-y-2">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <span>{statusMessage}</span>
                </div>
                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleMailto}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send directly to {targetEmail}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyDraft}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedDraft ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDraft ? 'Copied!' : 'Copy Draft'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 inline-flex items-center gap-2 cursor-pointer shadow-sm hover:shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Sending Query...' : 'Submit Message'}</span>
              </button>

              <button
                type="button"
                onClick={handleMailto}
                className="px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                title={`Open email client targeting ${targetEmail}`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Open in Mail App</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Information & Destination Info */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <h2 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Direct Support Channel</span>
            </h2>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Primary Query Email:
              </span>
              <a
                href={`mailto:${targetEmail}`}
                className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline break-all block"
              >
                {targetEmail}
              </a>
              <span className="text-[10.5px] text-slate-500 dark:text-slate-400 block pt-1">
                All form submissions are routed directly to this verified mailbox.
              </span>
            </div>

            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2.5 leading-relaxed pt-1">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span><strong>Mathematical Inquiries:</strong> Provide the monthly investment, tenure, and rate used so we can verify the schedule.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span><strong>Independent Tool:</strong> FinGrow provides free educational simulators. We do not sell mutual fund schemes or manage client portfolios.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-5 space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>Fast Response Guarantee</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We monitor <span className="font-mono text-emerald-300">{targetEmail}</span> regularly. Feature suggestions, calculation feedback, and bug reports are typically addressed within 24–48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
