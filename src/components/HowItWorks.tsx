import React from 'react';
import { DownloadCloud, ReceiptText, CheckCircle2, ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS_STEPS, APP_METADATA } from '../data/siteContent';

const stepIcons: Record<string, React.ReactNode> = {
  DownloadCloud: <DownloadCloud className="w-8 h-8 text-primary-light" />,
  ReceiptText: <ReceiptText className="w-8 h-8 text-primary-light" />,
  CheckCircle2: <CheckCircle2 className="w-8 h-8 text-success" />,
};

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-surface/30 border-y border-border/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary-light mb-3">
            <span>Fast Setup</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            How Penny Works
          </h2>
          <p className="text-textMuted text-base sm:text-lg">
            Up and running in less than a minute. No complex account setups, no intrusive credit checks, and no payment gateways.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {HOW_IT_WORKS_STEPS.map((stepItem, idx) => (
            <div
              key={stepItem.step}
              className="relative p-8 rounded-2xl bg-surface/80 border border-border flex flex-col justify-between hover:border-primary/50 transition-all duration-300 shadow-xl"
            >
              {/* Step Number Watermark */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-surface-light border border-border flex items-center justify-center shadow-md">
                  {stepIcons[stepItem.iconName]}
                </div>
                <span className="text-3xl font-black text-textDark/40 font-mono">
                  {stepItem.step}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {stepItem.title}
                </h3>
                <p className="text-textMuted text-sm leading-relaxed mb-6">
                  {stepItem.description}
                </p>
              </div>

              {idx === 0 && (
                <div className="pt-4 border-t border-border">
                  <a
                    href={APP_METADATA.downloadPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-primary-light hover:text-white transition-colors"
                  >
                    <span>Download Penny APK ({APP_METADATA.fileSizeDisplay})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
              {idx === 1 && (
                <div className="pt-4 border-t border-border">
                  <span className="text-xs font-medium text-textMuted">
                    Supports Equal, Exact Amount & Shares split
                  </span>
                </div>
              )}
              {idx === 2 && (
                <div className="pt-4 border-t border-border">
                  <span className="text-xs font-medium text-success flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-success" />
                    Direct UPI Deep-Link • 0% Transaction Fees
                  </span>
                </div>
              )}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};
