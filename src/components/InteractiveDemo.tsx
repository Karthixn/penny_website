import React, { useState, useEffect, useCallback } from 'react';
import {
  Home,
  Plus,
  Users,
  PieChart,
  Settings,
  Bell,
  ArrowLeft,
  Camera,
  ChevronRight,
  TrendingUp,
  Download,
  Crown,
  Check,
  Zap,
  Smartphone,
  Delete,
} from 'lucide-react';
import { DOWNLOAD_CONFIG, getPrimaryDownloadUrl, isExternalDownload } from '../data/siteContent';

// ─── Types ───
interface DemoExpense {
  id: string;
  description: string;
  amount: number;
  category: string;
  icon: string;
  date: string;
  type: 'expense' | 'income';
  isNew?: boolean;
}

interface DemoGroup {
  name: string;
  emoji: string;
  members: string[];
  total: number;
  yourBalance: number;
}

type Screen = 'home' | 'add' | 'groups' | 'group-detail' | 'insights' | 'settings';

// ─── Constants ───
const CATEGORIES = [
  { name: 'Food & Dining', icon: '🍕', color: '#F59E0B' },
  { name: 'Transport', icon: '🚗', color: '#3B82F6' },
  { name: 'Shopping', icon: '🛍️', color: '#7C6FF7' },
  { name: 'Groceries', icon: '🥬', color: '#00D68F' },
  { name: 'Entertainment', icon: '🎬', color: '#F2994A' },
  { name: 'Other', icon: '📦', color: '#EF4444' },
];

const INITIAL_EXPENSES: DemoExpense[] = [
  { id: '1', description: "Lunch at Meghana's", amount: 450, category: 'Food & Dining', icon: '🍕', date: 'Today', type: 'expense' },
  { id: '2', description: 'Uber to Office', amount: 180, category: 'Transport', icon: '🚗', date: 'Today', type: 'expense' },
  { id: '3', description: 'Freelance Payment', amount: 15000, category: 'Income', icon: '💰', date: 'Today', type: 'income' },
  { id: '4', description: 'Amazon Order', amount: 1299, category: 'Shopping', icon: '🛍️', date: 'Yesterday', type: 'expense' },
  { id: '5', description: 'Reliance Fresh', amount: 850, category: 'Groceries', icon: '🥬', date: 'Yesterday', type: 'expense' },
  { id: '6', description: 'Netflix', amount: 199, category: 'Entertainment', icon: '🎬', date: '2 days ago', type: 'expense' },
];

const DEMO_GROUPS: DemoGroup[] = [
  { name: 'Goa Trip 2026', emoji: '🏖️', members: ['You', 'Rahul', 'Priya', 'Amit'], total: 24000, yourBalance: -2000 },
  { name: 'Flat Rent – Oct', emoji: '🏠', members: ['You', 'Rahul'], total: 18000, yourBalance: 0 },
  { name: 'Office Lunch Club', emoji: '🍱', members: ['You', 'Sneha', 'Vivek'], total: 3200, yourBalance: 450 },
];

const INSIGHTS_DATA = [
  { name: 'Food & Dining', percent: 35, amount: 2950, color: '#F59E0B' },
  { name: 'Shopping', percent: 25, amount: 2100, color: '#7C6FF7' },
  { name: 'Transport', percent: 18, amount: 1520, color: '#3B82F6' },
  { name: 'Groceries', percent: 15, amount: 1260, color: '#00D68F' },
  { name: 'Entertainment', percent: 7, amount: 620, color: '#F2994A' },
];

const fmt = (n: number) => '₹' + n.toLocaleString('en-IN');

// ─── Status Bar ───
const StatusBar: React.FC = () => (
  <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[10px] font-semibold text-white/70" style={{ fontSize: 10 }}>
    <span>9:41</span>
    <div className="flex items-center gap-1.5">
      <div className="flex gap-[2px]">
        {[1,2,3,4].map(i => <div key={i} className="w-[3px] rounded-sm bg-white/60" style={{ height: 4 + i * 2 }} />)}
      </div>
      <span>5G</span>
      <div className="w-5 h-2.5 rounded-sm border border-white/50 relative">
        <div className="absolute inset-[1px] right-[3px] bg-green-400 rounded-[1px]" />
      </div>
    </div>
  </div>
);

// ─── Bottom Nav ───
const BottomNav: React.FC<{ active: Screen; onNavigate: (s: Screen) => void; hasHint: boolean }> = ({ active, onNavigate, hasHint }) => {
  const tabs: { id: Screen; icon: React.ReactNode; label: string }[] = [
    { id: 'home', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { id: 'add', icon: <Plus className="w-5 h-5" />, label: 'Add' },
    { id: 'groups', icon: <Users className="w-5 h-5" />, label: 'Groups' },
    { id: 'insights', icon: <PieChart className="w-5 h-5" />, label: 'Insights' },
    { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];
  return (
    <div className="flex items-center justify-around py-2 border-t" style={{ borderColor: '#262636', background: '#0C0D14' }}>
      {tabs.map(t => {
        const isActive = active === t.id || (active === 'group-detail' && t.id === 'groups');
        return (
          <button key={t.id} onClick={() => onNavigate(t.id)} className="flex flex-col items-center gap-0.5 px-3 py-1 relative transition-colors duration-200">
            <div className={isActive ? 'text-[#7C6FF7]' : 'text-[#5E6074]'}>{t.icon}</div>
            <span className={`text-[9px] font-medium ${isActive ? 'text-[#7C6FF7]' : 'text-[#5E6074]'}`}>{t.label}</span>
            {t.id === 'add' && hasHint && (
              <span className="absolute -top-1 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C6FF7] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#7C6FF7]" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

// ─── Toast ───
const Toast: React.FC<{ message: string; visible: boolean }> = ({ message, visible }) => (
  <div className={`absolute top-10 left-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`} style={{ background: '#00D68F' }}>
    <Check className="w-3.5 h-3.5" />
    {message}
  </div>
);

// ─── Home Screen ───
const HomeScreen: React.FC<{ expenses: DemoExpense[] }> = ({ expenses }) => {
  const totalExpense = expenses.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0);
  const totalIncome = expenses.filter(e => e.type === 'income').reduce((s, e) => s + e.amount, 0);
  const budget = 15000;
  const progress = Math.min(totalExpense / budget, 1);

  return (
    <div className="px-4 pb-4 space-y-4">
      {/* Greeting */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <p className="text-[11px] text-[#9496A8]">Good evening</p>
          <p className="text-base font-bold text-white">Hey, Karthik 👋</p>
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#191B26' }}>
          <Bell className="w-4 h-4 text-[#9496A8]" />
        </div>
      </div>

      {/* Budget Card */}
      <div className="rounded-2xl p-4" style={{ background: '#191B26' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-[#9496A8]">Monthly Budget</span>
          <span className="text-[11px] font-bold text-[#7C6FF7]">{Math.round(progress * 100)}% used</span>
        </div>
        <div className="w-full h-2 rounded-full mb-2" style={{ background: '#262636' }}>
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${progress * 100}%`, background: progress > 0.8 ? '#EF4444' : 'linear-gradient(90deg, #5A46F5, #7C6FF7)' }} />
        </div>
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-white font-bold">{fmt(totalExpense)}</span>
          <span className="text-[#5E6074]">of {fmt(budget)}</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Income', value: totalIncome, color: '#00D68F', icon: <TrendingUp className="w-3 h-3" /> },
          { label: 'Expense', value: totalExpense, color: '#EF4444', icon: <TrendingUp className="w-3 h-3 rotate-180" /> },
          { label: 'Savings', value: totalIncome - totalExpense, color: '#7C6FF7', icon: <Zap className="w-3 h-3" /> },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: '#191B26' }}>
            <div className="flex items-center justify-center gap-1 mb-1" style={{ color: s.color }}>
              {s.icon}
              <span className="text-[9px] font-semibold">{s.label}</span>
            </div>
            <p className="text-xs font-bold text-white">{fmt(s.value)}</p>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-white">Recent Transactions</span>
          <span className="text-[10px] text-[#7C6FF7] font-semibold">View All</span>
        </div>
        <div className="space-y-1.5">
          {expenses.slice(0, 6).map(exp => (
            <div
              key={exp.id}
              className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-500 ${exp.isNew ? 'ring-1 ring-[#7C6FF7]/50' : ''}`}
              style={{ background: exp.isNew ? '#191B26' : '#14151E' }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: '#191B26' }}>
                {exp.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-white truncate">{exp.description}</p>
                <p className="text-[9px] text-[#5E6074]">{exp.category} · {exp.date}</p>
              </div>
              <span className={`text-xs font-bold ${exp.type === 'income' ? 'text-[#00D68F]' : 'text-white'}`}>
                {exp.type === 'income' ? '+' : '-'}{fmt(exp.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Add Expense Screen ───
const AddExpenseScreen: React.FC<{
  onAdd: (desc: string, amount: number, category: string, icon: string) => void;
  onBack: () => void;
}> = ({ onAdd, onBack }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCat, setSelectedCat] = useState(0);

  const handleKey = useCallback((key: string) => {
    if (key === 'del') {
      setAmount(prev => prev.slice(0, -1));
    } else if (key === '.') {
      if (!amount.includes('.')) setAmount(prev => prev + '.');
    } else {
      if (amount.length < 8) setAmount(prev => prev + key);
    }
  }, [amount]);

  const handleAdd = () => {
    const num = parseFloat(amount);
    if (!num || num <= 0) return;
    const cat = CATEGORIES[selectedCat];
    onAdd(description || cat.name, num, cat.name, cat.icon);
    setAmount('');
    setDescription('');
  };

  return (
    <div className="px-4 pb-3 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pt-2 mb-4">
        <button onClick={onBack} className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <span className="text-sm font-bold text-white">Add Expense</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#191B26' }}>
          <Camera className="w-4 h-4 text-[#7C6FF7]" />
        </div>
      </div>

      {/* Amount Display */}
      <div className="text-center mb-3">
        <p className="text-3xl font-extrabold text-white tracking-tight">
          {'₹'}{amount || '0'}
        </p>
      </div>

      {/* Description */}
      <div className="mb-3">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What was this for?"
          className="w-full px-3 py-2 rounded-xl text-xs text-white placeholder-[#5E6074] border-none outline-none"
          style={{ background: '#191B26' }}
        />
      </div>

      {/* Category Pills */}
      <div className="grid grid-cols-3 gap-1.5 mb-3">
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCat(i)}
            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
              selectedCat === i ? 'text-white ring-1' : 'text-[#9496A8]'
            }`}
            style={{
              background: selectedCat === i ? cat.color + '25' : '#191B26',
              ...(selectedCat === i ? { ringColor: cat.color } : {}),
              borderColor: selectedCat === i ? cat.color : 'transparent',
              border: selectedCat === i ? `1px solid ${cat.color}40` : '1px solid transparent',
            }}
          >
            <span>{cat.icon}</span>
            <span className="truncate">{cat.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-1.5 mb-3 flex-1">
        {['1','2','3','4','5','6','7','8','9','.','0','del'].map(key => (
          <button
            key={key}
            onClick={() => handleKey(key)}
            className="rounded-xl flex items-center justify-center text-base font-bold text-white active:scale-95 transition-transform py-2.5"
            style={{ background: key === 'del' ? '#262636' : '#191B26' }}
          >
            {key === 'del' ? <Delete className="w-5 h-5 text-[#9496A8]" /> : key}
          </button>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={handleAdd}
        disabled={!amount || parseFloat(amount) <= 0}
        className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.98] disabled:opacity-40"
        style={{ background: 'linear-gradient(135deg, #5A46F5, #7C6FF7)' }}
      >
        Add Expense
      </button>
    </div>
  );
};

// ─── Groups Screen ───
const GroupsScreen: React.FC<{ onGroupTap: (idx: number) => void }> = ({ onGroupTap }) => (
  <div className="px-4 pb-4">
    <div className="flex items-center justify-between pt-2 mb-4">
      <p className="text-base font-bold text-white">Groups</p>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#191B26' }}>
        <Plus className="w-4 h-4 text-[#7C6FF7]" />
      </div>
    </div>
    <div className="space-y-2.5">
      {DEMO_GROUPS.map((g, i) => (
        <button key={g.name} onClick={() => onGroupTap(i)} className="w-full flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all active:scale-[0.98]" style={{ background: '#191B26' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: '#262636' }}>
            {g.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white">{g.name}</p>
            <p className="text-[10px] text-[#5E6074]">{g.members.length} members · {fmt(g.total)} total</p>
          </div>
          <div className="text-right flex items-center gap-2">
            <div>
              {g.yourBalance === 0 ? (
                <span className="text-[10px] font-semibold text-[#00D68F]">Settled ✓</span>
              ) : g.yourBalance < 0 ? (
                <span className="text-[10px] font-semibold text-[#EF4444]">You owe {fmt(Math.abs(g.yourBalance))}</span>
              ) : (
                <span className="text-[10px] font-semibold text-[#00D68F]">You get {fmt(g.yourBalance)}</span>
              )}
            </div>
            <ChevronRight className="w-4 h-4 text-[#5E6074]" />
          </div>
        </button>
      ))}
    </div>
  </div>
);

// ─── Group Detail Screen ───
const GroupDetailScreen: React.FC<{ group: DemoGroup; onBack: () => void }> = ({ group, onBack }) => {
  const memberBalances = group.members.map((m, i) => ({
    name: m,
    avatar: m[0],
    balance: i === 0 ? group.yourBalance : (i === 1 ? 2000 : i === 2 ? -1500 : -500),
    color: ['#7C6FF7', '#F59E0B', '#00D68F', '#3B82F6'][i] || '#9496A8',
  }));

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center gap-3 pt-2 mb-4">
        <button onClick={onBack} className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1">
          <p className="text-sm font-bold text-white">{group.emoji} {group.name}</p>
          <p className="text-[10px] text-[#5E6074]">{group.members.length} members</p>
        </div>
      </div>

      {/* Total Card */}
      <div className="rounded-2xl p-4 mb-4" style={{ background: '#191B26' }}>
        <p className="text-[10px] text-[#9496A8] mb-1">Total Group Expenses</p>
        <p className="text-xl font-extrabold text-white">{fmt(group.total)}</p>
        <p className="text-[10px] text-[#5E6074] mt-1">{fmt(group.total / group.members.length)} per person</p>
      </div>

      {/* Member Balances */}
      <p className="text-xs font-bold text-white mb-2">Member Balances</p>
      <div className="space-y-2">
        {memberBalances.map(m => (
          <div key={m.name} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#191B26' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: m.color }}>
              {m.avatar}
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-white">{m.name}</p>
            </div>
            <span className={`text-xs font-bold ${m.balance === 0 ? 'text-[#00D68F]' : m.balance < 0 ? 'text-[#EF4444]' : 'text-[#00D68F]'}`}>
              {m.balance === 0 ? 'Settled' : m.balance < 0 ? `Owes ${fmt(Math.abs(m.balance))}` : `Gets ${fmt(m.balance)}`}
            </span>
          </div>
        ))}
      </div>

      {/* Settle Up */}
      <button className="w-full mt-4 py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #5A46F5, #7C6FF7)' }}>
        <Zap className="w-4 h-4" />
        Settle Up via UPI
      </button>
    </div>
  );
};

// ─── Insights Screen ───
const InsightsScreen: React.FC<{ expenses: DemoExpense[] }> = ({ expenses }) => {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  const totalExpense = expenses.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0);

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center justify-between pt-2 mb-4">
        <div>
          <p className="text-base font-bold text-white">Insights</p>
          <p className="text-[10px] text-[#5E6074]">October 2026</p>
        </div>
      </div>

      {/* Total Spent */}
      <div className="rounded-2xl p-4 mb-4 text-center" style={{ background: '#191B26' }}>
        <p className="text-[10px] text-[#9496A8] mb-1">Total Spent This Month</p>
        <p className="text-2xl font-extrabold text-white">{fmt(totalExpense)}</p>
      </div>

      {/* Category Breakdown */}
      <p className="text-xs font-bold text-white mb-3">Spending by Category</p>
      <div className="space-y-3">
        {INSIGHTS_DATA.map(cat => (
          <div key={cat.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold text-white">{cat.name}</span>
              <span className="text-[10px] font-bold" style={{ color: cat.color }}>{cat.percent}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full" style={{ background: '#262636' }}>
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: animated ? `${cat.percent}%` : '0%', background: cat.color }}
              />
            </div>
            <p className="text-[9px] text-[#5E6074] mt-0.5">{fmt(cat.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Settings Screen ───
const SettingsScreen: React.FC = () => {
  const settingsItems = [
    { label: 'Currency', value: 'INR ₹', locked: false },
    { label: 'Reminders', value: '3 active', locked: false },
    { label: 'Receipt Scanner', value: 'OCR', locked: true },
    { label: 'Custom Categories', value: 'Create', locked: true },
    { label: 'Multi-Currency', value: '36+ currencies', locked: true },
    { label: 'Export Data', value: 'Excel / CSV', locked: false },
    { label: 'App Lock', value: 'Biometrics', locked: false },
  ];

  return (
    <div className="px-4 pb-4">
      <p className="text-base font-bold text-white pt-2 mb-4">Settings</p>

      {/* Profile Card */}
      <div className="flex items-center gap-3 p-4 rounded-2xl mb-4" style={{ background: '#191B26' }}>
        <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #5A46F5, #7C6FF7)' }}>
          K
        </div>
        <div>
          <p className="text-xs font-bold text-white">Karthik</p>
          <p className="text-[10px] text-[#5E6074]">karthik@email.com</p>
        </div>
      </div>

      {/* Settings List */}
      <div className="space-y-1">
        {settingsItems.map(item => (
          <div key={item.label} className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#14151E' }}>
            <span className="text-[11px] font-semibold text-white">{item.label}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#9496A8]">{item.value}</span>
              {item.locked ? (
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded" style={{ background: '#7C6FF720', color: '#7C6FF7' }}>PRO</span>
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-[#5E6074]" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pro Upsell */}
      <div className="mt-4 p-4 rounded-2xl border" style={{ background: '#191B26', borderColor: '#7C6FF730' }}>
        <div className="flex items-center gap-2 mb-2">
          <Crown className="w-4 h-4 text-[#F59E0B]" />
          <span className="text-xs font-bold text-white">Upgrade to Penny Pro</span>
        </div>
        <p className="text-[10px] text-[#9496A8] mb-3">Unlock receipt scanner, custom categories, multi-currency, and more.</p>
        <div className="flex gap-2">
          {[{ label: '₹49/mo', sub: 'Monthly' }, { label: '₹399/yr', sub: 'Annual' }, { label: '₹899', sub: 'Lifetime' }].map(p => (
            <div key={p.sub} className="flex-1 text-center p-2 rounded-lg" style={{ background: '#262636' }}>
              <p className="text-[10px] font-bold text-white">{p.label}</p>
              <p className="text-[8px] text-[#5E6074]">{p.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-[9px] text-[#5E6074] mt-4">Penny v1 · Build 17</p>
    </div>
  );
};


// ─── Main Component ───
export const InteractiveDemo: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [expenses, setExpenses] = useState<DemoExpense[]>(INITIAL_EXPENSES);
  const [selectedGroupIdx, setSelectedGroupIdx] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [hasAdded, setHasAdded] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const handleAddExpense = (desc: string, amount: number, category: string, icon: string) => {
    const newExp: DemoExpense = {
      id: `demo_${Date.now()}`,
      description: desc,
      amount,
      category,
      icon,
      date: 'Just now',
      type: 'expense',
      isNew: true,
    };
    setExpenses(prev => [newExp, ...prev]);
    setHasAdded(true);
    setScreen('home');
    showToast(`Expense added! ${fmt(amount)}`);
    setTimeout(() => {
      setExpenses(prev => prev.map(e => e.id === newExp.id ? { ...e, isNew: false } : e));
    }, 2000);
  };

  const handleNavigate = (s: Screen) => {
    setScreen(s);
  };

  const handleGroupTap = (idx: number) => {
    setSelectedGroupIdx(idx);
    setScreen('group-detail');
  };

  const downloadUrl = getPrimaryDownloadUrl();
  const isExternal = isExternalDownload();

  const renderScreen = () => {
    switch (screen) {
      case 'home': return <HomeScreen expenses={expenses} />;
      case 'add': return <AddExpenseScreen onAdd={handleAddExpense} onBack={() => setScreen('home')} />;
      case 'groups': return <GroupsScreen onGroupTap={handleGroupTap} />;
      case 'group-detail': return <GroupDetailScreen group={DEMO_GROUPS[selectedGroupIdx]} onBack={() => setScreen('groups')} />;
      case 'insights': return <InsightsScreen expenses={expenses} />;
      case 'settings': return <SettingsScreen />;
    }
  };

  return (
    <section id="try-demo" className="py-20 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/15 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-[#5B4FCF]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary-light mb-3">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Live Interactive Demo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Try Penny Before You Download
          </h2>
          <p className="text-textMuted text-sm sm:text-base">
            Navigate between screens, add expenses, explore groups and insights &mdash; all right in your browser. No install needed.
          </p>
        </div>

        {/* Demo Area */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 lg:gap-16">

          {/* Phone Frame */}
          <div className="relative shrink-0">
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-primary/20 rounded-[42px] blur-3xl -z-10 scale-90" />

            {/* Device bezel */}
            <div className="rounded-[40px] p-[10px] shadow-2xl shadow-primary/20" style={{ background: 'linear-gradient(180deg, #2D3042, #1A1C28 50%, #12131C)' }}>
              {/* Screen */}
              <div
                className="relative rounded-[30px] overflow-hidden flex flex-col"
                style={{ width: 310, height: 660, background: '#0C0D14' }}
              >
                <StatusBar />
                <Toast message={toast || ''} visible={!!toast} />
                <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'thin', scrollbarColor: '#262636 transparent' }}>
                  {renderScreen()}
                </div>
                <BottomNav active={screen} onNavigate={handleNavigate} hasHint={!hasAdded} />
              </div>
            </div>
          </div>

          {/* Side Panel: Dynamic feature highlights */}
          <div className="max-w-md w-full">
            {/* Screen-specific info */}
            {screen === 'home' && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Personal Dashboard</h3>
                  <p className="text-textMuted text-sm leading-relaxed">
                    Your financial command center. See monthly budget progress, income vs. expense breakdown, and recent transactions at a glance.
                  </p>
                </div>
                <div className="space-y-3">
                  {['Real-time budget tracking with progress bar', 'Income, expense & savings summary cards', 'Chronological transaction feed with categories'].map(h => (
                    <div key={h} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-success shrink-0" />
                      <span className="text-sm text-white">{h}</span>
                    </div>
                  ))}
                </div>
                {!hasAdded && (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20">
                    <span className="text-primary-light text-xl">☝</span>
                    <p className="text-xs text-primary-light font-medium">
                      Tap the <strong>+</strong> button in the phone to try adding an expense!
                    </p>
                  </div>
                )}
              </div>
            )}
            {screen === 'add' && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Quick Expense Entry</h3>
                  <p className="text-textMuted text-sm leading-relaxed">
                    Log expenses in under 3 seconds. Pick a category, key in the amount, and tap Add. Your dashboard updates instantly.
                  </p>
                </div>
                <div className="space-y-3">
                  {['6 quick-tap categories with emoji identifiers', 'Full number pad for fast entry', 'Smart receipt scanner with ML-powered OCR (Pro)'].map(h => (
                    <div key={h} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-success shrink-0" />
                      <span className="text-sm text-white">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {(screen === 'groups' || screen === 'group-detail') && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Group Splitting & Settlements</h3>
                  <p className="text-textMuted text-sm leading-relaxed">
                    Manage shared expenses for trips, flat rent, and dining. Penny calculates who owes whom and simplifies debts into minimal transfers.
                  </p>
                </div>
                <div className="space-y-3">
                  {['Equal, exact, or percentage-based splits', 'Debt simplification: 4 debts → 1 transfer', '1-tap UPI settlement via Google Pay / PhonePe'].map(h => (
                    <div key={h} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-success shrink-0" />
                      <span className="text-sm text-white">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {screen === 'insights' && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Spending Insights</h3>
                  <p className="text-textMuted text-sm leading-relaxed">
                    Visual category breakdowns show exactly where your money goes. No complex spreadsheets needed &mdash; just clear, actionable data.
                  </p>
                </div>
                <div className="space-y-3">
                  {['Animated category distribution bars', 'Percentage breakdown by spending type', '100% on-device calculations — zero telemetry'].map(h => (
                    <div key={h} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-success shrink-0" />
                      <span className="text-sm text-white">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {screen === 'settings' && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Settings & Penny Pro</h3>
                  <p className="text-textMuted text-sm leading-relaxed">
                    Configure currency, reminders, and app lock. Upgrade to Pro for receipt scanning, custom categories, and multi-currency support.
                  </p>
                </div>
                <div className="space-y-3">
                  {['Free: Budget tracking, groups, insights, exports, app lock', 'Pro: Receipt OCR scanner, custom categories, 36+ currencies', 'OWASP M1–M10 hardened · Hardware Keystore encryption'].map(h => (
                    <div key={h} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-success shrink-0" />
                      <span className="text-sm text-white">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 pt-6 border-t border-border/50">
              <p className="text-xs text-textMuted mb-3">Ready for the real thing?</p>
              <a
                href={downloadUrl}
                download={!isExternal ? DOWNLOAD_CONFIG.apkFileName : undefined}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="group inline-flex items-center gap-3 px-5 py-3 rounded-2xl font-bold text-sm text-white brand-gradient-btn shadow-lg shadow-[#5A46F5]/30 hover:shadow-[#5A46F5]/50 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Penny APK</span>
                <span className="text-[10px] bg-black/30 border border-white/20 px-2 py-0.5 rounded-lg font-medium">
                  {DOWNLOAD_CONFIG.fileSizeDisplay}
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
