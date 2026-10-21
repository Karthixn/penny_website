import React, { useState } from 'react';
import { Download, Copy, Check, Shield, Smartphone, Terminal, HelpCircle } from 'lucide-react';
import { DOWNLOAD_CONFIG, getPrimaryDownloadUrl } from '../data/siteContent';
import { AnimateOnScroll } from './motion';

export const DownloadSection: React.FC = () => {
  const [copiedHash, setCopiedHash] = useState(false);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(DOWNLOAD_CONFIG.sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2500);
  };

  const primaryUrl = getPrimaryDownloadUrl();

  return (
    <section id="download" className="py-24 bg-surface/40 border-t border-border/60 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Download Card */}
        <AnimateOnScroll variant="scale-in" className="relative rounded-3xl bg-gradient-to-b from-surface to-[#131520] border border-primary/40 p-8 sm:p-12 shadow-2xl shadow-primary/10">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-semibold mb-4 border border-primary/30">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Official Android Release</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Get Penny for Android
            </h2>
            
            <p className="text-textMuted text-base sm:text-lg">
              Download the official Penny Android release. Free core features, privacy-first, and zero ads.
            </p>
          </div>

          {/* Primary Download CTA Button */}
          <div className="flex flex-col items-center justify-center mb-10">
            <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-extrabold text-lg sm:text-xl text-white brand-gradient-btn transition-all duration-300 shadow-xl shadow-[#5A46F5]/35 hover:shadow-[#5A46F5]/55 hover:scale-[1.02] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-primary/50"
            >
              <Download className="w-6 h-6 group-hover:-translate-y-0.5 transition-transform" />
              <span>Download Penny APK</span>
              <span className="text-xs bg-black/30 border border-white/20 px-2.5 py-1 rounded-lg text-white font-medium">
                {DOWNLOAD_CONFIG.fileSizeDisplay}
              </span>
            </a>
            
            <p className="text-xs text-textMuted mt-4 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-success" />
              <span>Official Release APK • Free to Download • Instant Access</span>
            </p>
          </div>

          {/* Verified Technical Metadata Box */}
          <div className="bg-[#0B0B10]/90 rounded-2xl border border-border p-5 sm:p-6 mb-8">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary-light" />
                Verified Release Specifications
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-success/20 text-success border border-success/30">
                Official Release
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-5">
              <div>
                <span className="text-xs text-textMuted block">Version</span>
                <span className="font-semibold text-white">{DOWNLOAD_CONFIG.version} ({DOWNLOAD_CONFIG.buildNumber})</span>
              </div>
              <div>
                <span className="text-xs text-textMuted block">Verified File Size</span>
                <span className="font-semibold text-white">{DOWNLOAD_CONFIG.fileSizeDisplay} (58 MB)</span>
              </div>
              <div>
                <span className="text-xs text-textMuted block">Minimum OS</span>
                <span className="font-semibold text-white">{DOWNLOAD_CONFIG.minAndroid}</span>
              </div>
              <div>
                <span className="text-xs text-textMuted block">Architecture</span>
                <span className="font-semibold text-white">{DOWNLOAD_CONFIG.targetArchitecture}</span>
              </div>
            </div>

            {/* SHA-256 Checksum with Copy Button */}
            <div className="bg-surface/90 rounded-xl p-3 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="overflow-hidden">
                <span className="text-[11px] font-semibold text-textMuted uppercase tracking-wider block">
                  SHA-256 Checksum
                </span>
                <span className="text-xs font-mono text-primary-light truncate block select-all">
                  {DOWNLOAD_CONFIG.sha256}
                </span>
              </div>
              
              <button
                onClick={handleCopyHash}
                type="button"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-light hover:bg-surface-hover border border-border text-xs font-semibold text-white transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Copy SHA-256 checksum to clipboard"
              >
                {copiedHash ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-success" />
                    <span className="text-success">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-textMuted" />
                    <span>Copy Hash</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Android Installation Instructions */}
          <div className="rounded-2xl bg-surface/50 border border-border/80 p-5 sm:p-6">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-warning" />
              How to Install Penny APK on Android
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-textMuted">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary-light font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                <div>
                  <strong className="text-white block">Download the APK</strong>
                  <span>Tap "Download Penny APK" above and tap the download icon in your browser to save the file.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary-light font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                <div>
                  <strong className="text-white block">Confirm Download</strong>
                  <span>If your browser or Drive warns that the file is large, tap "Download anyway" to proceed.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary-light font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                <div>
                  <strong className="text-white block">Allow Unknown Apps if Prompted</strong>
                  <span>If Android asks "Install unknown apps", tap Settings and switch "Allow from this source" to ON.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary-light font-bold flex items-center justify-center shrink-0 text-[11px]">4</span>
                <div>
                  <strong className="text-white block">Complete Install & Open</strong>
                  <span>Tap "Install" on the prompt. Penny is ready to use with zero setup!</span>
                </div>
              </div>
            </div>
            
            <p className="text-[11px] text-textDark mt-4 pt-3 border-t border-border/60">
              * Note: Android displays this standard security verification prompt for all APK files installed outside Google Play.
            </p>
          </div>

        </AnimateOnScroll>

      </div>
    </section>
  );
};
