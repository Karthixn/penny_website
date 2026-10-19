import React from 'react';
import {
  Wallet,
  Users,
  Zap,
  PieChart,
  TrendingUp,
  FileSpreadsheet,
  Check,
  ShieldCheck,
  ScanLine,
} from 'lucide-react';

export const FeatureGrid: React.FC = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary-light mb-3">
            <Check className="w-3.5 h-3.5" />
            <span>Complete Financial Control</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Engineered for Everyday Clarity
          </h2>
          <p className="text-textMuted text-base sm:text-lg">
            No convoluted financial jargon and zero hidden fees. Penny delivers seamless individual tracking, group expense settling, and optional Pro features for power users.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Bento Item 1 (Double Width on LG): Group Bill Splitting & UPI */}
          <div className="lg:col-span-2 group relative p-8 rounded-3xl bg-gradient-to-br from-surface to-surface-light border border-border hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary-light">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-warning/15 text-warning border border-warning/30 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>1-Tap UPI Settlements</span>
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-light transition-colors">
                Group Bill Splitting & Debt Simplification
              </h3>
              <p className="text-textMuted text-sm sm:text-base leading-relaxed max-w-xl mb-6">
                Split restaurant bills, shared apartments, or holiday trips with friends. Choose equal splits, exact amounts, or custom shares. Penny automatically calculates the minimum number of transfers needed to square up.
              </p>

              {/* Interactive Mini Mockup Card */}
              <div className="p-4 rounded-2xl bg-[#0E1018] border border-border/80 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-surface/80 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-textMuted block">Group Balance</span>
                    <span className="text-sm font-bold text-white">All Settled Up</span>
                  </div>
                  <span className="text-xs font-bold text-success px-2 py-0.5 rounded bg-success/15 border border-success/30">
                    ₹0.00
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface/80 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-textMuted block">Debt Optimization</span>
                    <span className="text-sm font-bold text-white">4 Debts &rarr; 1 Pay</span>
                  </div>
                  <span className="text-xs font-bold text-primary-light px-2 py-0.5 rounded bg-primary/15 border border-primary/30">
                    GPay Ready
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs text-textMuted">
              <span>Supports Google Pay, PhonePe, Paytm & BHIM</span>
              <span className="text-success font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Zero Middleman Fees
              </span>
            </div>
          </div>

          {/* Bento Item 2: Personal Expense Tracker */}
          <div className="group relative p-8 rounded-3xl bg-surface/75 border border-border hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-surface-light border border-border flex items-center justify-center text-primary-light group-hover:bg-primary/20 transition-colors">
                  <Wallet className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-surface-light text-primary-light border border-border">
                  Daily Logging
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-light transition-colors">
                Personal Expense Tracker
              </h3>
              <p className="text-textMuted text-sm leading-relaxed mb-6">
                Log daily expenditures with quick categories, payment notes, and tags. Keep personal transactions organized apart from shared group tabs.
              </p>

              {/* Mini category tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="px-2.5 py-1 rounded-lg bg-surface-light text-[11px] text-white border border-white/5 font-medium">🍕 Food & Dining</span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-light text-[11px] text-white border border-white/5 font-medium">🚗 Transport</span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-light text-[11px] text-white border border-white/5 font-medium">🛍️ Shopping</span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-light text-[11px] text-white border border-white/5 font-medium">🛒 Groceries</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50 text-xs text-textMuted flex items-center justify-between">
              <span>Fast Keypad Entry</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
          </div>

          {/* Bento Item 3: Category Insights */}
          <div className="group relative p-8 rounded-3xl bg-surface/75 border border-border hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-surface-light border border-border flex items-center justify-center text-success group-hover:bg-success/20 transition-colors">
                  <PieChart className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-surface-light text-success border border-border">
                  Analytics
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-light transition-colors">
                Category Spending Insights
              </h3>
              <p className="text-textMuted text-sm leading-relaxed mb-5">
                Interactive percentage distributions, average spend calculations, and spending trends generated strictly on-device without cloud tracking.
              </p>

              {/* Progress preview */}
              <div className="space-y-2 mb-4 p-3 rounded-xl bg-[#0E1018] border border-border/60">
                <div className="flex justify-between text-[11px] text-textMuted">
                  <span>Shopping</span>
                  <span className="text-white font-bold">50.0%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-light rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-[#E056FD] rounded-full" />
                </div>
                <div className="flex justify-between text-[11px] text-textMuted">
                  <span>Groceries</span>
                  <span className="text-white font-bold">27.5%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-light rounded-full overflow-hidden">
                  <div className="w-[27.5%] h-full bg-success rounded-full" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50 text-xs text-textMuted flex items-center justify-between">
              <span>100% On-Device Stats</span>
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
            </div>
          </div>

          {/* Bento Item 4: Monthly Budget */}
          <div className="group relative p-8 rounded-3xl bg-surface/75 border border-border hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-surface-light border border-border flex items-center justify-center text-primary-light group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-surface-light text-primary-light border border-border">
                  Budgeting
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-light transition-colors">
                Monthly Spending Limits
              </h3>
              <p className="text-textMuted text-sm leading-relaxed mb-6">
                Set personalized monthly budget targets. Monitor real-time remaining limits, percentage used, and receive warnings before you overspend.
              </p>
            </div>

            <div className="pt-4 border-t border-border/50 text-xs text-textMuted flex items-center justify-between">
              <span>Real-Time Alert Thresholds</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
          </div>

          {/* Bento Item 5: Statements & Export */}
          <div className="group relative p-8 rounded-3xl bg-surface/75 border border-border hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-surface-light border border-border flex items-center justify-center text-success group-hover:bg-success/20 transition-colors">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-surface-light text-success border border-border">
                  Data Portability
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-light transition-colors">
                Excel & CSV Statement Export
              </h3>
              <p className="text-textMuted text-sm leading-relaxed mb-6">
                One-tap download of all personal or group transactions into structured CSV and Excel spreadsheets. Direct sharing to WhatsApp, Google Drive, or email.
              </p>
            </div>

            <div className="pt-4 border-t border-border/50 text-xs text-textMuted flex items-center justify-between">
              <span>Instant Share via WhatsApp</span>
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
            </div>
          </div>

          {/* Bento Item 6: Privacy by Design & Hardware Keystore */}
          <div className="group relative p-8 rounded-3xl bg-surface/75 border border-border hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-success/15 border border-success/30 flex items-center justify-center text-success group-hover:bg-success/25 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-success" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-surface-light text-success border border-border">
                  100% Privacy
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-light transition-colors">
                Hardware Keystore & Zero Telemetry
              </h3>
              <p className="text-textMuted text-sm leading-relaxed mb-4">
                Your transaction data and split balances are encrypted on-device via Android Keystore. No trackers, no data mining, and zero external analytics.
              </p>

              {/* Security badges */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0B0B10] border border-border/80 text-xs text-textMuted">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-white font-medium">On-Device Storage</span>
                <span className="text-border">|</span>
                <span>TLS 1.3 Certified</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50 text-xs text-textMuted flex items-center justify-between">
              <span>Google Play Data Safety Compliant</span>
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
            </div>
          </div>

          {/* Bento Item 7 (Double Width): Receipt Scanner */}
          <div className="lg:col-span-2 group relative p-8 rounded-3xl bg-gradient-to-br from-surface to-surface-light border border-border hover:border-primary/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary-light">
                  <ScanLine className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/20 text-primary-light border border-primary/30 flex items-center gap-1.5 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-light" />
                  <span>NEW</span>
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-light transition-colors">
                Smart Receipt Scanner
              </h3>
              <p className="text-textMuted text-sm sm:text-base leading-relaxed max-w-xl mb-6">
                Point your camera at any receipt and Penny's on-device OCR instantly extracts the total amount, merchant name, and line items. Review and edit before saving — no manual typing needed.
              </p>

              <div className="p-4 rounded-2xl bg-[#0E1018] border border-border/80 grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-surface/80 border border-white/5 text-center">
                  <span className="text-lg">📸</span>
                  <div className="text-[11px] text-textMuted mt-1">Camera or Gallery</div>
                  <div className="text-xs font-bold text-white mt-0.5">Snap & Scan</div>
                </div>
                <div className="p-3 rounded-xl bg-surface/80 border border-white/5 text-center">
                  <span className="text-lg">🔍</span>
                  <div className="text-[11px] text-textMuted mt-1">ML Kit OCR</div>
                  <div className="text-xs font-bold text-white mt-0.5">Auto-Extract</div>
                </div>
                <div className="p-3 rounded-xl bg-surface/80 border border-white/5 text-center">
                  <span className="text-lg">✏️</span>
                  <div className="text-[11px] text-textMuted mt-1">Interactive Review</div>
                  <div className="text-xs font-bold text-white mt-0.5">Edit & Split</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs text-textMuted">
              <span>Powered by Google ML Kit — fully on-device processing</span>
              <span className="text-primary-light font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Zero Cloud Upload
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
