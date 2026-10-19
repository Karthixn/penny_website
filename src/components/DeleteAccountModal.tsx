import React, { useState } from 'react';
import { X, Trash2, AlertTriangle, ExternalLink } from 'lucide-react';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-account-title"
    >
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-surface-light text-textMuted hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-expense/20 text-expense flex items-center justify-center shrink-0">
            <Trash2 className="w-6 h-6" />
          </div>
          <div>
            <h2 id="delete-account-title" className="text-xl font-bold text-white">Account & Data Deletion</h2>
            <span className="text-xs text-textMuted">Google Play Data Safety Compliance</span>
          </div>
        </div>

        {/* Warning Callout */}
        <div className="p-4 rounded-xl bg-expense/10 border border-expense/30 text-xs sm:text-sm text-expense/90 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-expense" />
          <div>
            <strong className="block font-semibold mb-0.5">Warning: Deletion is Permanent</strong>
            <span>Deleting your account will immediately and permanently erase all personal expense records, reminders, group tab balances, and active session tokens from our servers.</span>
          </div>
        </div>

        {/* Live Form pointing to Penny Render Backend */}
        <form
          method="POST"
          action="https://penny-37mv.onrender.com/delete-account"
          className="space-y-4"
          target="_blank"
        >
          <div>
            <label htmlFor="delete-email" className="block text-xs font-semibold text-textMuted uppercase tracking-wider mb-2">
              Registered Account Email
            </label>
            <input
              type="email"
              id="delete-email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-expense focus:outline-none text-white text-sm placeholder:text-textDark transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-expense hover:bg-expense/90 text-white font-bold text-sm transition-all shadow-lg shadow-expense/20 flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Permanently Delete My Account & Data</span>
          </button>
        </form>

        {/* In-app tip */}
        <div className="mt-6 pt-5 border-t border-border text-center">
          <p className="text-xs text-textMuted leading-relaxed">
            <strong className="text-white block mb-1">Instant In-App Deletion:</strong>
            You can also delete directly inside the app: Open Penny &rarr; <em>Settings</em> &rarr; tap <em>Delete Account</em> in the Danger Zone.
          </p>

          <a
            href="https://penny-37mv.onrender.com/delete-account"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-primary-light hover:underline font-semibold mt-3"
          >
            <span>Open Standalone Web Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
