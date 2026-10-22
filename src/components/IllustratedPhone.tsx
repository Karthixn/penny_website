import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export const IllustratedPhone: React.FC = () => {
  return (
    <div className="relative w-[260px] sm:w-[280px] mx-auto select-none">
      {/* Phone frame */}
      <div className="rounded-[36px] p-[3px] bg-gradient-to-b from-[#3D3F5C] via-[#24263A] to-[#14151F] shadow-2xl shadow-primary/25">
        <div className="rounded-[33px] bg-[#0B0B10] overflow-hidden">

          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1">
            <span className="text-[10px] font-semibold text-white/70">9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-[2px]">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-[3px] rounded-sm ${i <= 3 ? 'bg-white/70' : 'bg-white/20'}`} style={{ height: 4 + i * 2 }} />
                ))}
              </div>
              <span className="text-[9px] text-white/60 ml-1">5G</span>
              <div className="w-5 h-2.5 rounded-sm border border-white/40 relative ml-0.5">
                <div className="absolute inset-[1px] right-[3px] rounded-[1px] bg-gradient-to-r from-green-400 to-green-500" />
              </div>
            </div>
          </div>

          {/* App content */}
          <div className="px-4 pb-4 pt-2 space-y-3">

            {/* Greeting */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] text-white/40">Good evening</p>
                <p className="text-sm font-bold text-white">Hey, Karthik</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-light">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
            </div>

            {/* Budget card with gradient */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2, ease }}
              className="rounded-2xl p-3.5 bg-gradient-to-br from-[#1A1B2E] to-[#151625] border border-white/[0.06]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-medium text-white/50">Monthly Budget</span>
                <span className="text-[10px] font-bold text-green-400">20% used</span>
              </div>
              {/* Gradient progress bar */}
              <div className="w-full h-1.5 rounded-full bg-white/[0.06] mb-1.5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#7C6FF7] to-[#A78BFA]"
                  initial={{ width: 0 }}
                  animate={{ width: '20%' }}
                  transition={{ duration: 1.2, delay: 1.5, ease }}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-[11px] font-bold text-white">&#8377;2,978</span>
                <span className="text-[9px] text-white/30">of &#8377;15,000</span>
              </div>
            </motion.div>

            {/* Summary cards row */}
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: 'Income', value: '15,000', color: 'from-green-500/20 to-green-600/10', text: 'text-green-400', icon: '↗' },
                { label: 'Expense', value: '2,978', color: 'from-red-500/20 to-red-600/10', text: 'text-red-400', icon: '↘' },
                { label: 'Savings', value: '12,022', color: 'from-blue-500/20 to-blue-600/10', text: 'text-blue-400', icon: '✦' },
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + i * 0.1, ease }}
                  className={`rounded-xl p-2.5 bg-gradient-to-b ${card.color} border border-white/[0.04]`}
                >
                  <div className={`text-[9px] ${card.text} font-semibold flex items-center gap-0.5`}>
                    <span>{card.icon}</span>
                    <span>{card.label}</span>
                  </div>
                  <div className="text-[11px] font-bold text-white mt-0.5">&#8377;{card.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Transaction header */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] font-semibold text-white/80">Recent Transactions</span>
              <span className="text-[8px] text-primary-light font-medium">View All</span>
            </div>

            {/* Transaction items */}
            <div className="space-y-1.5">
              {[
                { name: 'Swiggy', cat: 'Food & Dining', amount: '-380', color: 'from-orange-500 to-red-500', emoji: '🍕' },
                { name: 'Amazon', cat: 'Shopping', amount: '-2,340', color: 'from-blue-500 to-cyan-500', emoji: '🛍️' },
                { name: 'Freelance', cat: 'Income', amount: '+15,000', color: 'from-green-500 to-emerald-500', emoji: '💰', positive: true },
                { name: 'BigBasket', cat: 'Groceries', amount: '-450', color: 'from-green-600 to-lime-500', emoji: '🛒' },
              ].map((tx, i) => (
                <motion.div
                  key={tx.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.8 + i * 0.08, ease }}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors"
                >
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${tx.color} flex items-center justify-center text-[12px] shadow-sm`}>
                    {tx.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-semibold text-white truncate">{tx.name}</div>
                    <div className="text-[8px] text-white/30">{tx.cat}</div>
                  </div>
                  <span className={`text-[10px] font-bold ${tx.positive ? 'text-green-400' : 'text-white/70'}`}>
                    &#8377;{tx.amount}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom nav bar */}
          <div className="flex items-center justify-around py-2 px-3 border-t border-white/[0.04] bg-[#0D0D14]">
            {[
              { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Home', active: true },
              { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', label: 'Groups', active: false },
              { icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6', label: 'Add', active: false, special: true },
              { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Insights', active: false },
              { icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', label: 'Settings', active: false },
            ].map((nav) => (
              <div key={nav.label} className="flex flex-col items-center gap-0.5">
                {nav.special ? (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C6FF7] to-[#5A46F5] flex items-center justify-center shadow-lg shadow-primary/30 -mt-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                      <path d={nav.icon} />
                    </svg>
                  </div>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={nav.active ? 'text-primary-light' : 'text-white/25'}>
                    <path d={nav.icon} />
                  </svg>
                )}
                <span className={`text-[7px] ${nav.active ? 'text-primary-light font-semibold' : 'text-white/25'}`}>
                  {nav.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
