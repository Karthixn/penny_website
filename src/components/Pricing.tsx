import React from 'react';
import { Check, Crown, Sparkles, Download } from 'lucide-react';
import { getPrimaryDownloadUrl } from '../data/siteContent';

const FREE_FEATURES = [
  'Personal expense tracking',
  'Group bill splitting (equal, exact, percentage)',
  'Debt simplification algorithm',
  '1-tap UPI / GPay settlements',
  'Category spending insights',
  'Monthly budget limits',
  'Payment due reminders',
  'Excel & CSV statement export',
  'Hardware-backed encryption',
  'Smart receipt scanner (OCR)',
  'Biometric app lock',
];

const PRO_FEATURES = [
  'Everything in Free',
  'Recurring expenses (auto-log)',
  'Multi-currency support',
  'Advanced analytics & trends',
  'Priority support',
];

export const Pricing: React.FC = () => {
  const downloadUrl = getPrimaryDownloadUrl();

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary-light mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Free at the Core. Pro When You're Ready.
          </h2>
          <p className="text-textMuted text-base sm:text-lg">
            Every essential feature is free forever. Pro unlocks power features for serious budgeters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="rounded-3xl bg-surface/80 border border-border p-8 flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-extrabold text-white mb-1">Free</h3>
              <p className="text-textMuted text-sm">Everything you need to manage expenses</p>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="text-textMuted text-sm ml-1">forever</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white">
                  <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface-light hover:bg-surface-hover border border-border font-bold text-white transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Free
            </a>
          </div>

          {/* Pro Tier */}
          <div className="rounded-3xl bg-gradient-to-b from-primary/20 to-surface/80 border border-primary/40 p-8 flex flex-col relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-bold">
              Coming Soon
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-extrabold text-white mb-1 flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#F59E0B]" />
                Pro
              </h3>
              <p className="text-textMuted text-sm">For power users who want more</p>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-white">TBD</span>
                <span className="text-textMuted text-sm ml-1">/ month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white">
                  <Check className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              disabled
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary/30 border border-primary/40 font-bold text-white/60 cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
