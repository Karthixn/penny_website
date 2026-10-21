import React from 'react';
import { Rocket, Zap, Bug, Sparkles } from 'lucide-react';

interface ChangelogEntry {
  version: string;
  date: string;
  tag: 'launch' | 'feature' | 'fix' | 'perf';
  title: string;
  items: string[];
}

const CHANGELOG: ChangelogEntry[] = [
  {
    version: 'v1.0.1',
    date: 'October 2026',
    tag: 'perf',
    title: 'Performance & Polish',
    items: [
      'Cache-first loading for groups and stats — instant launch',
      'Optimistic expense save — no waiting for server',
      'Pull-to-refresh runs parallel fetches',
      'Receipt scanner: guaranteed post-tax total selection',
      'Health endpoint + keep-alive pinger for zero cold starts',
    ],
  },
  {
    version: 'v1.0.0',
    date: 'October 2026',
    tag: 'launch',
    title: 'Initial Release',
    items: [
      'Personal expense tracking with categories and notes',
      'Group bill splitting (equal, exact, percentage)',
      'Debt simplification algorithm',
      '1-tap UPI / GPay / PhonePe settlements',
      'Category spending insights with interactive charts',
      'Monthly budget limits with progress tracking',
      'Smart receipt scanner with on-device OCR',
      'Excel & CSV statement export',
      'Hardware-backed encryption (Android Keystore)',
      'Biometric app lock',
      'Dark-first UI designed for AMOLED',
    ],
  },
];

const TAG_CONFIG = {
  launch: { icon: Rocket, label: 'Launch', color: 'text-primary-light bg-primary/20 border-primary/30' },
  feature: { icon: Sparkles, label: 'Feature', color: 'text-success bg-success/20 border-success/30' },
  fix: { icon: Bug, label: 'Fix', color: 'text-warning bg-warning/20 border-warning/30' },
  perf: { icon: Zap, label: 'Performance', color: 'text-[#F59E0B] bg-[#F59E0B]/20 border-[#F59E0B]/30' },
};

export const Changelog: React.FC = () => {
  return (
    <section id="changelog" className="py-24 bg-surface/30 border-t border-border/50 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary-light mb-3">
            <Rocket className="w-3.5 h-3.5" />
            <span>What's New</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Changelog
          </h2>
          <p className="text-textMuted text-base sm:text-lg">
            Every update, improvement, and fix — tracked transparently.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border hidden sm:block" />

          <div className="space-y-8">
            {CHANGELOG.map((entry) => {
              const tagCfg = TAG_CONFIG[entry.tag];
              const TagIcon = tagCfg.icon;
              return (
                <div key={entry.version} className="relative sm:pl-12">
                  {/* Timeline dot */}
                  <div className="absolute left-2.5 top-2 w-3 h-3 rounded-full bg-primary border-2 border-background hidden sm:block" />

                  <div className="rounded-2xl bg-surface/80 border border-border p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-sm font-bold text-white font-mono">{entry.version}</span>
                      <span className="text-xs text-textMuted">{entry.date}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${tagCfg.color}`}>
                        <TagIcon className="w-3 h-3" />
                        {tagCfg.label}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{entry.title}</h3>
                    <ul className="space-y-2">
                      {entry.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-textMuted">
                          <span className="text-primary-light mt-1.5 shrink-0">-</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
