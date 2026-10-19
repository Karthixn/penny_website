import React from 'react';
import { Download, Sparkles, Shield, ArrowRight, Smartphone, Zap } from 'lucide-react';
import { DOWNLOAD_CONFIG, getPrimaryDownloadUrl, isExternalDownload } from '../data/siteContent';

export const Hero: React.FC = () => {
  const downloadUrl = getPrimaryDownloadUrl();
  const isExternal = isExternalDownload();

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background ambient glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-[#5B4FCF]/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Call to Action */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Version Release Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-light/80 border border-border text-xs font-medium text-textMuted mb-6 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-white font-semibold">{DOWNLOAD_CONFIG.version} Release</span>
              <span className="text-border">|</span>
              <span className="text-primary-light">Free Core Features</span>
              <span className="text-border">|</span>
              <span>Zero Ads</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-5">
              Split smarter.{' '}
              <span className="block mt-1 brand-gradient-text">
                Spend better.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-textMuted max-w-2xl mb-7 leading-relaxed">
              The high-performance Android expense tracker and bill splitter built for clarity.
              Log personal expenses, manage shared flat or trip tabs, and settle debts instantly
              in 1 tap via Google Pay and PhonePe with zero intermediate fees.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-9">
              <a
                href={downloadUrl}
                download={!isExternal ? DOWNLOAD_CONFIG.apkFileName : undefined}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="group inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl font-bold text-base text-white brand-gradient-btn shadow-xl shadow-[#5A46F5]/35 hover:shadow-[#5A46F5]/55 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                aria-label={`Download Penny APK version ${DOWNLOAD_CONFIG.version}`}
              >
                <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                <div className="flex flex-col text-left">
                  <span className="leading-tight">Download Penny APK</span>
                  <span className="text-[11px] font-normal text-white/80">
                    {DOWNLOAD_CONFIG.version} • {DOWNLOAD_CONFIG.fileSizeDisplay} • Android 7.0+
                  </span>
                </div>
              </a>

              <a
                href="#try-demo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-base text-white bg-surface-light hover:bg-surface-hover border border-border transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <span>Try Live Demo</span>
                <ArrowRight className="w-4 h-4 text-primary-light" />
              </a>
            </div>

            {/* Highlights Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl text-left">
              <div className="p-3 rounded-xl bg-surface/70 border border-border/70 backdrop-blur-sm flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary-light">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">1-Tap UPI</div>
                  <div className="text-[11px] text-textMuted">GPay / PhonePe</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface/70 border border-border/70 backdrop-blur-sm flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-success/10 text-success">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Free to Use</div>
                  <div className="text-[11px] text-textMuted">Zero ads ever</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface/70 border border-border/70 backdrop-blur-sm flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary-light">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Hardened</div>
                  <div className="text-[11px] text-textMuted">OWASP M1–M10</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface/70 border border-border/70 backdrop-blur-sm flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-warning/10 text-warning">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Native AOT</div>
                  <div className="text-[11px] text-textMuted">Fast & smooth</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Refined Phone Mockup with Proportional Height */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            
            {/* Glowing Backdrop Circle behind phone */}
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-primary/25 rounded-full blur-[90px] -z-10" />

            {/* Floating Highlight Card 1: GPay Settlement */}
            <div className="hidden sm:flex absolute -left-10 top-16 z-20 items-center gap-3 p-3.5 rounded-2xl bg-surface/90 border border-border/90 backdrop-blur-xl shadow-2xl shadow-black/60 transform -rotate-2 hover:rotate-0 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00D68F] to-[#00F5A0] flex items-center justify-center text-black font-bold shadow-md shadow-success/20">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <div className="text-left">
                <div className="text-[11px] text-textMuted font-medium">1-Tap Settle Up</div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>₹2,450.00</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-success/20 text-success font-semibold">GPay Ready</span>
                </div>
              </div>
            </div>

            {/* Floating Highlight Card 2: Debt Simplification */}
            <div className="hidden sm:flex absolute -right-6 bottom-16 z-20 items-center gap-3 p-3.5 rounded-2xl bg-surface/90 border border-border/90 backdrop-blur-xl shadow-2xl shadow-black/60 transform rotate-3 hover:rotate-0 transition-transform">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-[#5A46F5]/40 border border-white/15 shrink-0 bg-[#0B0B10] flex items-center justify-center">
                <img src="./images/penny_logo.png" alt="Penny Official Logo" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <div className="text-[11px] text-textMuted font-medium">Debt Simplification</div>
                <div className="text-xs font-bold text-white">4 Transfers → 1 Transfer</div>
              </div>
            </div>

            {/* Refined Phone Frame with Proportional Scale */}
            <div className="relative max-h-[500px] sm:max-h-[530px] rounded-[36px] p-2.5 bg-gradient-to-b from-[#2D3042] via-[#1A1C28] to-[#12131C] shadow-2xl shadow-primary/20 border border-white/10 ring-1 ring-black">
              
              {/* Screen Wrapper with overflow hidden */}
              <div className="relative rounded-[28px] overflow-hidden bg-background max-h-[480px] sm:max-h-[510px] aspect-[9/19.5] border border-border/80">
                <img
                  src="./images/screen_home.png"
                  alt="Penny Android App Dashboard showing total expenses, monthly budget, and quick actions"
                  className="w-full h-full object-cover object-top select-none"
                  loading="eager"
                />

                {/* Subtle screen glossy reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
