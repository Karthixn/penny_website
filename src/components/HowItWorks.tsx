import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS_STEPS, APP_METADATA } from '../data/siteContent';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from './motion';

const GradientIllustration: React.FC<{ step: number }> = ({ step }) => {
  if (step === 1) {
    return (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <defs>
          <linearGradient id="dl1" x1="0" y1="0" x2="56" y2="56">
            <stop stopColor="#A78BFA" />
            <stop offset="1" stopColor="#5A46F5" />
          </linearGradient>
        </defs>
        <rect x="12" y="4" width="32" height="48" rx="8" stroke="url(#dl1)" strokeWidth="2.5" fill="none" />
        <rect x="22" y="6" width="12" height="3" rx="1.5" fill="#7C6FF7" opacity="0.5" />
        <path d="M28 22 L28 36" stroke="url(#dl1)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M22 30 L28 36 L34 30" stroke="url(#dl1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="18" y="40" width="20" height="2" rx="1" fill="#7C6FF7" opacity="0.3" />
      </svg>
    );
  }
  if (step === 2) {
    return (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <defs>
          <linearGradient id="rc1" x1="0" y1="0" x2="56" y2="56">
            <stop stopColor="#A78BFA" />
            <stop offset="1" stopColor="#7C6FF7" />
          </linearGradient>
          <linearGradient id="rc2" x1="0" y1="0" x2="56" y2="56">
            <stop stopColor="#00D68F" />
            <stop offset="1" stopColor="#00F5A0" />
          </linearGradient>
        </defs>
        <rect x="8" y="10" width="40" height="36" rx="6" stroke="url(#rc1)" strokeWidth="2.5" fill="none" />
        <path d="M8 20 L48 20" stroke="#7C6FF7" strokeWidth="1.5" opacity="0.3" />
        <rect x="14" y="25" width="18" height="2" rx="1" fill="#7C6FF7" opacity="0.5" />
        <rect x="14" y="31" width="12" height="2" rx="1" fill="#7C6FF7" opacity="0.3" />
        <rect x="14" y="37" width="15" height="2" rx="1" fill="#7C6FF7" opacity="0.3" />
        <circle cx="40" cy="32" r="6" stroke="url(#rc2)" strokeWidth="2" fill="none" />
        <path d="M38 32 L39.5 33.5 L42.5 30.5" stroke="#00D68F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="st1" x1="0" y1="0" x2="56" y2="56">
          <stop stopColor="#00D68F" />
          <stop offset="1" stopColor="#00F5A0" />
        </linearGradient>
        <linearGradient id="st2" x1="10" y1="10" x2="46" y2="46">
          <stop stopColor="#A78BFA" />
          <stop offset="1" stopColor="#5A46F5" />
        </linearGradient>
      </defs>
      <circle cx="28" cy="28" r="20" stroke="url(#st1)" strokeWidth="2.5" fill="none" />
      <path d="M20 28 L25 33 L36 22" stroke="url(#st1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 42 L10 48" stroke="url(#st2)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M42 42 L46 48" stroke="url(#st2)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="10" cy="48" r="2" fill="#7C6FF7" opacity="0.4" />
      <circle cx="46" cy="48" r="2" fill="#7C6FF7" opacity="0.4" />
    </svg>
  );
};

const stepIcons: Record<string, React.ReactNode> = {
  DownloadCloud: <GradientIllustration step={1} />,
  ReceiptText: <GradientIllustration step={2} />,
  CheckCircle2: <GradientIllustration step={3} />,
};

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-surface/30 border-y border-border/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <AnimateOnScroll className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary-light mb-3">
            <span>Fast Setup</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            How Penny Works
          </h2>
          <p className="text-textMuted text-base sm:text-lg">
            Up and running in less than a minute. No complex account setups, no intrusive credit checks, and no payment gateways.
          </p>
        </AnimateOnScroll>

        {/* Steps Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 relative" stagger={0.15}>

          {HOW_IT_WORKS_STEPS.map((stepItem, idx) => (
            <StaggerItem
              key={stepItem.step}
              className="relative p-8 rounded-2xl bg-surface/80 border border-border flex flex-col justify-between hover:border-primary/50 transition-all duration-300 shadow-xl"
            >
              {/* Step Number Watermark */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-surface-light to-surface border border-border/60 flex items-center justify-center shadow-md">
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
            </StaggerItem>
          ))}

        </StaggerContainer>

      </div>
    </section>
  );
};
