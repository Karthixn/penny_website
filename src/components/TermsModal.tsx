import React from 'react';
import { X, ExternalLink, Mail } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-title"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-surface-light text-textMuted hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <img
            src="./images/penny_logo.jpg"
            alt="Penny"
            className="w-12 h-12 rounded-2xl shadow-md border border-white/10"
          />
          <div>
            <h2 id="terms-title" className="text-xl sm:text-2xl font-bold text-white">
              Penny Terms of Service & User Agreement
            </h2>
            <div className="text-xs text-textMuted mt-0.5">
              Effective Date: October 9, 2026
            </div>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-textMuted leading-relaxed">
          <div className="p-4 rounded-xl bg-surface-light/40 border border-border/70">
            <h3 className="text-base font-bold text-white mb-2">1. Acceptance of Terms</h3>
            <p>
              By downloading, installing, registering for, or using the Penny Expense Manager mobile application or backend services, you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy. If you do not agree, do not use the Application.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-light/40 border border-border/70">
            <h3 className="text-base font-bold text-white mb-2">2. Purpose of Penny</h3>
            <p>
              Penny is a personal and group expense organizer that enables users to track personal transactions, split bills among group participants, calculate debt settlements, and launch UPI payment intents. Penny is an informational utility and is not a financial institution, bank, or payment processor.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-light/40 border border-border/70">
            <h3 className="text-base font-bold text-white mb-2">3. User Account & Responsibilities</h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>You must provide a valid email address that you own to register and receive authentication passcodes.</li>
              <li>You are responsible for keeping your login credentials confidential and for all activity occurring under your account.</li>
              <li>You agree not to use the app for any illegal, fraudulent, or abusive purposes.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-surface-light/40 border border-border/70">
            <h3 className="text-base font-bold text-white mb-2">4. Free Service & Advertisements</h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Most features of Penny are provided free of charge.</li>
              <li>To maintain infrastructure, cloud hosting, and continuous feature updates, Penny may display advertisements provided by third-party ad networks (e.g., Google AdMob).</li>
              <li>Future updates may introduce optional in-app purchases or subscriptions for enhanced features or ad-free experiences.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-surface-light/40 border border-border/70">
            <h3 className="text-base font-bold text-white mb-2">5. UPI Settlements & Financial Disclaimers</h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>UPI ID entries are used strictly to create standard payment deep-links for your convenience.</li>
              <li>Penny is not a party to any transactions between users. You are solely responsible for verifying the payee's identity, UPI ID, and the transfer amount prior to completing any transaction in your UPI app.</li>
              <li>Penny does not hold money, does not guarantee debts will be repaid by other users, and holds no liability for disputes arising from external bank transfers.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-surface-light/40 border border-border/70">
            <h3 className="text-base font-bold text-white mb-2">6. Account Termination & Deletion</h3>
            <p>
              You may terminate your account at any time using the in-app deletion button in Settings or via our web deletion portal at <a href="https://penny-37mv.onrender.com/delete-account" target="_blank" rel="noopener noreferrer" className="text-primary-light underline">https://penny-37mv.onrender.com/delete-account</a>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-light/40 border border-border/70">
            <h3 className="text-base font-bold text-white mb-2">7. Contact Information</h3>
            <p className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 text-white">
                <Mail className="w-4 h-4 text-primary-light" />
                <a href="mailto:support@penny.app" className="text-primary-light underline">support@penny.app</a>
              </span>
              <span>or</span>
              <a href="mailto:karthik.dev314@gmail.com" className="text-primary-light underline">karthik.dev314@gmail.com</a>
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
          <a
            href="./docs/terms.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-textMuted hover:text-white transition-colors"
          >
            <span>View Standalone HTML Document</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-dark transition-colors"
          >
            Agree & Close
          </button>
        </div>
      </div>
    </div>
  );
};
