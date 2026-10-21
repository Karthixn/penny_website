import React from 'react';
import { Download, Sparkles, Shield, ArrowRight, Smartphone, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { DOWNLOAD_CONFIG, getPrimaryDownloadUrl, isExternalDownload } from '../data/siteContent';

const ease = [0.22, 1, 0.36, 1] as const;

export const Hero: React.FC = () => {
  const downloadUrl = getPrimaryDownloadUrl();
  const isExternal = isExternalDownload();

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.22, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-[#5B4FCF]/20 rounded-full blur-[120px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-success/8 rounded-full blur-[100px]"
          animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-light/80 border border-border text-xs font-medium text-textMuted mb-6 backdrop-blur-md"
            >
              <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-white font-semibold">{DOWNLOAD_CONFIG.version} Release</span>
              <span className="text-border">|</span>
              <span className="text-primary-light">Free Core Features</span>
              <span className="text-border">|</span>
              <span>Zero Ads</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-5"
            >
              Split smarter.{' '}
              <span className="block mt-1 brand-gradient-text">
                Spend better.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease }}
              className="text-base sm:text-lg text-textMuted max-w-2xl mb-7 leading-relaxed"
            >
              The high-performance Android expense tracker and bill splitter built for clarity.
              Log personal expenses, manage shared flat or trip tabs, and settle debts instantly
              in 1 tap via Google Pay and PhonePe with zero intermediate fees.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-9"
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl text-left"
            >
              {[
                { icon: <Zap className="w-4 h-4" />, title: '1-Tap UPI', sub: 'GPay / PhonePe', bg: 'bg-primary/10 text-primary-light' },
                { icon: <Sparkles className="w-4 h-4" />, title: 'Free to Use', sub: 'Zero ads ever', bg: 'bg-success/10 text-success' },
                { icon: <Shield className="w-4 h-4" />, title: 'Hardened', sub: 'OWASP M1–M10', bg: 'bg-primary/10 text-primary-light' },
                { icon: <Smartphone className="w-4 h-4" />, title: 'Native AOT', sub: 'Fast & smooth', bg: 'bg-warning/10 text-warning' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.75 + i * 0.08, ease }}
                  className="p-3 rounded-xl bg-surface/70 border border-border/70 backdrop-blur-sm flex items-center gap-2.5 hover:border-primary/30 transition-colors duration-300"
                >
                  <div className={`p-1.5 rounded-lg ${item.bg}`}>{item.icon}</div>
                  <div>
                    <div className="text-xs font-semibold text-white">{item.title}</div>
                    <div className="text-[11px] text-textMuted">{item.sub}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <motion.div
              className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-primary/25 rounded-full blur-[90px] -z-10"
              animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.35, 0.25] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Floating card 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease }}
              className="hidden sm:block absolute -left-10 top-16 z-20"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface/90 border border-border/90 backdrop-blur-xl shadow-2xl shadow-black/60"
              >
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
              </motion.div>
            </motion.div>

            {/* Floating card 2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease }}
              className="hidden sm:block absolute -right-6 bottom-16 z-20"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface/90 border border-border/90 backdrop-blur-xl shadow-2xl shadow-black/60"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-[#5A46F5]/40 border border-white/15 shrink-0 bg-[#0B0B10] flex items-center justify-center">
                  <img src="./images/penny_logo.png" alt="Penny Official Logo" className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] text-textMuted font-medium">Debt Simplification</div>
                  <div className="text-xs font-bold text-white">4 Transfers → 1 Transfer</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Phone with floating animation */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative max-h-[500px] sm:max-h-[530px] rounded-[36px] p-2.5 bg-gradient-to-b from-[#2D3042] via-[#1A1C28] to-[#12131C] shadow-2xl shadow-primary/20 border border-white/10 ring-1 ring-black"
              >
                <div className="relative rounded-[28px] overflow-hidden bg-background max-h-[480px] sm:max-h-[510px] aspect-[9/19.5] border border-border/80">
                  <img
                    src="./images/screen_home.png"
                    alt="Penny Android App Dashboard showing total expenses, monthly budget, and quick actions"
                    className="w-full h-full object-cover object-top select-none"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
