import React from 'react';
import { X, Shield, ExternalLink, Mail, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDeleteAccount?: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
  onOpenDeleteAccount,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
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
            <h2 id="privacy-title" className="text-xl sm:text-2xl font-bold text-white">
              Penny Privacy Policy
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-textMuted">Last updated: October 9, 2026</span>
              <span className="text-textDark">&bull;</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-success/15 text-success border border-success/30">
                Official Google Play Policy
              </span>
            </div>
          </div>
        </div>

        {/* Core Promise Callout */}
        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 text-xs sm:text-sm text-primary-light mb-6 flex items-start gap-3">
          <Shield className="w-5 h-5 shrink-0 mt-0.5 text-primary-light" />
          <div>
            <strong className="text-white block font-semibold mb-0.5">Our Privacy Commitment</strong>
            <span>
              We only collect information essential to providing and improving the service. We do <strong>not</strong> sell, rent, or trade your personal or financial data to third-party data brokers or advertisers.
            </span>
          </div>
        </div>

        {/* Main Content Body */}
        <div className="space-y-6 text-xs sm:text-sm text-textMuted leading-relaxed">
          
          <div className="p-4 rounded-xl bg-surface-light/40 border border-border/70">
            <h3 className="text-base font-bold text-white mb-2">1. Overview & Scope</h3>
            <p>
              Welcome to <strong>Penny</strong> ("we", "us", "our", or "the Application"). Penny is an expense tracking and group bill-splitting application designed to help users track personal spending, manage shared debts, and settle dues seamlessly.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-light/40 border border-border/70 space-y-3">
            <h3 className="text-base font-bold text-white mb-2">2. Information We Collect and Purpose</h3>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Email Address:</strong> Collected during registration to authenticate securely via One-Time Passcodes (OTP), prevent unauthorized account access, and synchronize your expense records and group ledgers across devices.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Display Name (Optional):</strong> Used to identify you in shared groups and bills so your friends know who created an expense or who owes money.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Expense & Financial Records:</strong> Amounts, categories, descriptions, dates, group associations, and split shares stored strictly to deliver expense tracking, calculate balance settlements, maintain system reliability, and support analytics.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">UPI ID / VPA (Optional):</strong> Collected strictly to facilitate direct peer-to-peer debt settlements via external UPI applications (Google Pay, PhonePe, Paytm, BHIM). <strong>Penny does NOT collect or store bank account numbers, ATM PINs, UPI MPINs, or card numbers.</strong>
                </div>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-surface-light/40 border border-border/70">
            <h3 className="text-base font-bold text-white mb-2">3. Free Service Model & Advertisements</h3>
            <p className="mb-2">
              To provide our core features <strong>free of charge</strong> and maintain ongoing cloud server hosting, database uptime, and active software development, Penny may display non-intrusive advertisements (such as Google AdMob).
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Third-party ad networks use standard device advertising identifiers according to Google Play policies.</li>
              <li>Advertisers do <strong>not</strong> have access to your personal expense details, budget numbers, or group balances.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-surface-light/40 border border-border/70">
            <h3 className="text-base font-bold text-white mb-2">4. Direct UPI Settlements & Security</h3>
            <p>
              When you tap "Settle", Penny generates a standard UPI URI (<code className="text-primary-light bg-black/40 px-1.5 py-0.5 rounded font-mono text-xs">upi://pay?pa=...</code>) containing only the payee's UPI ID, amount, and note. The transfer executes <strong>directly inside your bank-authorized UPI app</strong>. Penny never acts as an intermediary, never holds user funds, and never processes monetary payments directly.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-light/40 border border-border/70">
            <h3 className="text-base font-bold text-white mb-2">5. Security Architecture</h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-white">Encryption in Transit:</strong> Encrypted using modern <strong>HTTPS (TLS 1.3)</strong>. Cleartext traffic is disabled.</li>
              <li><strong className="text-white">Password Hashing:</strong> Protected using salted <strong>bcrypt</strong> hashing.</li>
              <li><strong className="text-white">Session Security:</strong> Authenticated sessions use cryptographically signed JWT tokens with revokable refresh tokens.</li>
              <li><strong className="text-white">Local Storage:</strong> Encrypted via Android Keystore using <code className="text-primary-light bg-black/40 px-1 rounded font-mono text-xs">flutter_secure_storage</code>.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-surface-light/40 border border-border/70">
            <h3 className="text-base font-bold text-white mb-2">6. Account & Data Deletion (User Rights)</h3>
            <p className="mb-2">
              You maintain full sovereignty over your data with two instant deletion options:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mb-3">
              <li><strong className="text-white">In-App Deletion:</strong> Open Penny &rarr; <em>Settings</em> &rarr; tap <em>Delete Account</em> in the Danger Zone.</li>
              <li><strong className="text-white">Web Deletion Portal:</strong> In compliance with Google Play Data Safety mandates, you can initiate data deletion at <a href="https://penny-37mv.onrender.com/delete-account" target="_blank" rel="noopener noreferrer" className="text-primary-light underline">https://penny-37mv.onrender.com/delete-account</a>.</li>
            </ul>
            {onOpenDeleteAccount && (
              <button
                onClick={() => {
                  onClose();
                  onOpenDeleteAccount();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-expense/20 text-expense border border-expense/40 text-xs font-semibold hover:bg-expense/30 transition-colors"
              >
                <span>Open Account Deletion Form</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
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
            href="./docs/privacy-policy.html"
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
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
