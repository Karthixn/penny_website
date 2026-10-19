import React from 'react';
import { Download, Mail, ExternalLink, Trash2 } from 'lucide-react';
import { DOWNLOAD_CONFIG, getPrimaryDownloadUrl } from '../data/siteContent';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenDeleteAccount?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onOpenDeleteAccount,
}) => {
  const downloadUrl = getPrimaryDownloadUrl();

  return (
    <footer className="bg-[#0B0B10] border-t border-border pt-16 pb-12 text-sm text-textMuted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-[#5A46F5]/30 border border-white/10 shrink-0 bg-[#0B0B10] flex items-center justify-center">
                <img
                  src="./images/penny_logo.png"
                  alt="Penny Official Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Penny Expense Manager</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-[#A78BFA] border border-[#7C6FF7]/30">
                {DOWNLOAD_CONFIG.version}
              </span>
            </div>

            <p className="text-textMuted max-w-sm text-sm leading-relaxed">
              Smart, privacy-first personal finance tracker and group bill splitter with 1-tap UPI settlements and zero paywalls.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface hover:bg-surface-light border border-border text-xs font-semibold text-white transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-primary-light" />
                <span>Download Penny APK ({DOWNLOAD_CONFIG.fileSizeDisplay})</span>
              </a>

              <a
                href={`mailto:${DOWNLOAD_CONFIG.contactEmail}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface hover:bg-surface-light border border-border text-xs font-semibold text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-success" />
                <span>support@penny.app</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#preview" className="hover:text-white transition-colors">
                  Interactive App Tour
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#download" className="hover:text-white transition-colors">
                  Download Release
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal and Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Legal & Compliance
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-white text-left transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-white text-left transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              {onOpenDeleteAccount && (
                <li>
                  <button
                    onClick={onOpenDeleteAccount}
                    className="text-expense/90 hover:text-expense text-left transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Account Deletion Request</span>
                  </button>
                </li>
              )}
              <li>
                <a
                  href="https://penny-37mv.onrender.com/delete-account"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-xs transition-colors flex items-center gap-1 text-textDark"
                >
                  <span>Web Deletion Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="pt-2 text-xs text-textDark">
                <span>Architecture: {DOWNLOAD_CONFIG.targetArchitecture}</span>
              </li>
              <li className="text-xs text-textDark">
                <span>Contact: karthik.dev314@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-textDark">
          <p>&copy; {new Date().getFullYear()} Penny Expense Manager. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="./docs/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Privacy (HTML)
            </a>
            <span>&bull;</span>
            <a href="./docs/terms.html" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Terms (HTML)
            </a>
            <span>&bull;</span>
            <a href="./docs/delete-account.html" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Deletion (HTML)
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
