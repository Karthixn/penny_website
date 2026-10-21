import React, { useState } from 'react';
import { SCREENSHOTS } from '../data/siteContent';
import {
  Smartphone,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  PlusCircle,
  Users,
  PieChart,
  FileSpreadsheet,
  ShieldCheck,
} from 'lucide-react';
import { AnimateOnScroll } from './motion';

const tabIcons = [
  <LayoutDashboard key="dash" className="w-4 h-4" />,
  <PlusCircle key="add" className="w-4 h-4" />,
  <Users key="grp" className="w-4 h-4" />,
  <PieChart key="insights" className="w-4 h-4" />,
  <FileSpreadsheet key="stmt" className="w-4 h-4" />,
  <ShieldCheck key="sec" className="w-4 h-4" />,
];

export const AppPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const currentScreenshot = SCREENSHOTS[activeTab];

  const handlePrev = () => {
    setActiveTab((prev) => (prev === 0 ? SCREENSHOTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveTab((prev) => (prev === SCREENSHOTS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="preview" className="py-20 bg-surface/30 border-y border-border/50 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <AnimateOnScroll className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary-light mb-3">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Interactive App Tour</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            See Penny in Action
          </h2>
          <p className="text-textMuted text-sm sm:text-base">
            Click through real Android screens to explore personal tracking, group splitting, spending analytics, and one-tap exports.
          </p>
        </AnimateOnScroll>

        {/* Tab Strip (Pills) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar">
          {SCREENSHOTS.map((screen, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={screen.id}
                onClick={() => setActiveTab(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary ${
                  isActive
                    ? 'brand-gradient-btn text-white shadow-lg shadow-[#5A46F5]/40 scale-105'
                    : 'bg-surface hover:bg-surface-light text-textMuted hover:text-white border border-border'
                }`}
                aria-selected={isActive}
                role="tab"
              >
                <span>{tabIcons[idx]}</span>
                <span>{screen.badge}</span>
              </button>
            );
          })}
        </div>

        {/* Main Showcase Container */}
        <AnimateOnScroll variant="scale-in" className="bg-surface/85 border border-border rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Screen Details & Key Highlights */}
            <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
              
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-light text-xs font-bold text-primary-light border border-border">
                  {tabIcons[activeTab]}
                  <span>Screen {activeTab + 1} of {SCREENSHOTS.length}</span>
                </span>
                
                <span className="text-xs text-textMuted font-mono">
                  {currentScreenshot.badge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
                {currentScreenshot.title}
              </h3>

              <p className="text-base sm:text-lg text-primary-light font-medium mb-3">
                {currentScreenshot.subtitle}
              </p>

              <p className="text-textMuted text-sm sm:text-base leading-relaxed mb-6">
                {currentScreenshot.description}
              </p>

              {/* Dynamic Highlights tailored to each screen */}
              <div className="space-y-3 mb-8 bg-surface-light/40 border border-border/80 rounded-2xl p-4 sm:p-5">
                {activeTab === 0 && (
                  <>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      <span>Monthly budget progress bar with remaining amount & percentage used</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      <span>Separate cards for Total Income, Expenses, and Net Savings</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      <span>1-tap shortcut to add personal transactions right from home</span>
                    </div>
                  </>
                )}
                {activeTab === 1 && (
                  <>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      <span>Full category selector: Food, Transport, Shopping, Groceries & more</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      <span>Quick toggle between Personal expense or Group Split</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      <span>Record payment methods: UPI (GPay/PhonePe), Credit Card, or Debit Card</span>
                    </div>
                  </>
                )}
                {activeTab === 2 && (
                  <>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      <span>Real group expenses ledger showing who paid and who shares the cost</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      <span>Settlement status tracker: "You are all settled up" badge</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      <span>Member overview tabs and multi-party expense timeline</span>
                    </div>
                  </>
                )}
                {activeTab === 3 && (
                  <>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      <span>Category breakdown with exact percentages (e.g. Shopping 50%, Groceries 27.5%)</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      <span>Category cards showing Total Spent, Average Spend, and Highest Bill</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      <span>100% on-device calculations: zero transaction data sent to analytics networks</span>
                    </div>
                  </>
                )}
                {activeTab === 4 && (
                  <>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      <span>One-tap "Share Excel / CSV File" to WhatsApp or Google Drive</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      <span>Formatted summary sharing for easy group WhatsApp communication</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      <span>Copy summary to clipboard with a single tap</span>
                    </div>
                  </>
                )}
                {activeTab === 5 && (
                  <>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      <span>OWASP M1–M10 Hardened certified badge & production release tag</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      <span>Hardware-backed encryption via Android Keystore (flutter_secure_storage)</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      <span>Full data sovereignty: complete account deletion and CSV export controls</span>
                    </div>
                  </>
                )}
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-xl bg-surface-light hover:bg-surface-hover border border-border text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded-xl bg-surface-light hover:bg-surface-hover border border-border text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Dot Indicators */}
                <div className="flex items-center gap-1.5">
                  {SCREENSHOTS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeTab === i ? 'w-6 bg-primary' : 'w-2 bg-border hover:bg-textDark'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Sleek Modern Phone Frame (Proportional Height, No Clunky Notch Collision) */}
            <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
              <div className="relative group">
                
                {/* Ambient glow behind mockup */}
                <div className="absolute inset-0 bg-primary/20 rounded-[38px] blur-2xl -z-10 group-hover:bg-primary/30 transition-all duration-300" />

                {/* Refined device container with proportional max height */}
                <div className="relative max-h-[500px] sm:max-h-[530px] rounded-[36px] p-2 sm:p-2.5 bg-gradient-to-b from-[#2D3042] via-[#1A1C28] to-[#12131C] shadow-2xl border border-white/10 ring-1 ring-black">
                  
                  {/* Clean screen frame with overflow hidden */}
                  <div className="relative rounded-[28px] overflow-hidden bg-background max-h-[480px] sm:max-h-[510px] aspect-[9/19.5] border border-border/80">
                    <img
                      key={currentScreenshot.id}
                      src={currentScreenshot.image}
                      alt={`${currentScreenshot.title} - ${currentScreenshot.description}`}
                      className="w-full h-full object-cover object-top transition-opacity duration-300 select-none animate-in fade-in"
                      loading="lazy"
                    />

                    {/* Subtle sleek glass reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </AnimateOnScroll>

      </div>
    </section>
  );
};
