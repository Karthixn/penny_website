export interface AppScreenshot {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  badge: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'core' | 'groups' | 'insights' | 'security';
  badge?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type DownloadSourceType = 'direct' | 'gdrive' | 'github';

/**
 * Centralized Download Configuration
 * You can easily switch between direct APK download and Google Drive link!
 */
export const DOWNLOAD_CONFIG = {
  // Configured for Google Drive download exclusively
  sourceType: 'gdrive' as const,

  // User's verified Google Drive release link
  gdriveUrl: 'https://drive.google.com/file/d/1kxwiJyG2Cn6yyIgeRqjrTR1cD9NOStfU/view?usp=sharing',
  apkFileName: 'Penny-v1.0.1-release.apk',

  // Release metadata
  name: 'Penny',
  tagline: 'Split smarter. Spend better.',
  description:
    'The dark-first personal expense tracker and group bill-splitting app for Android. Free core features, 1-tap UPI settlements, debt simplification, and zero ads.',
  version: 'v1.0.1',
  buildNumber: 'Build 17',
  releaseDate: 'October 2026',
  fileSizeBytes: 91936768,
  fileSizeDisplay: '87.7 MB',
  minAndroid: 'Android 7.0+ (API 24)',
  targetArchitecture: 'ARM64 Native AOT',
  sha256: '83F2F4D7F173EDFCC6305C60C65CF9811D73E036060F40CFE4FB1028EDFB65AF',
  contactEmail: 'support@pennyapp.dev',
  developerEmail: 'karthik.dev314@gmail.com',
  deleteAccountUrl: 'https://penny-37mv.onrender.com/delete-account',
};

// Backwards-compatible alias
export const APP_METADATA = {
  ...DOWNLOAD_CONFIG,
  downloadPath: DOWNLOAD_CONFIG.gdriveUrl,
};

export const getPrimaryDownloadUrl = () => {
  return DOWNLOAD_CONFIG.gdriveUrl;
};

export const isExternalDownload = () => {
  return true;
};

export const SCREENSHOTS: AppScreenshot[] = [
  {
    id: 'dashboard',
    title: 'Personal Dashboard',
    subtitle: 'Clear view of total balance, monthly budget, and recent transactions',
    image: './images/screen_home.png',
    description: 'Track personal spending alongside active group balances in one unified dark interface with instant action shortcuts.',
    badge: 'Dashboard',
  },
  {
    id: 'add-expense',
    title: 'Fast Expense Logging',
    subtitle: 'Log expenses with category tags, custom notes, and split options',
    image: './images/screen_add_typed.png',
    description: 'Quick keypad entry with category selector, split mode switch (Personal / Group), and payment method choices.',
    badge: 'Quick Add',
  },
  {
    id: 'group-detail',
    title: 'Group Bill Splitting',
    subtitle: 'Track shared balances among flatmates, trips, and dining groups',
    image: './images/screen_group_expenses.png',
    description: 'Active shared transactions feed with transparent settlement details, member debt records, and instant settlement history.',
    badge: 'Group Bills',
  },
  {
    id: 'insights',
    title: 'Spending Insights',
    subtitle: 'Interactive breakdown by category, weekly trends, and top spends',
    image: './images/screen_insights_shopping.png',
    description: 'Visual category distribution charts, transaction percentage breakdowns, and spending summaries to keep budgets on track.',
    badge: 'Insights',
  },
  {
    id: 'settlement',
    title: 'Export & Statement Sharing',
    subtitle: 'Export statements to Excel/CSV and share summaries via WhatsApp',
    image: './images/screen_settle.png',
    description: 'Generate full Excel/CSV statements or share quick summaries to WhatsApp and clipboard in 1 tap.',
    badge: 'Statements',
  },
  {
    id: 'settings',
    title: 'Security & Profile Settings',
    subtitle: 'OWASP M1–M10 hardened with hardware Keystore encryption',
    image: './images/screen_settings.png',
    description: 'Hardware-backed secure key storage, multi-currency controls, UPI VPA configuration, and complete data deletion control.',
    badge: 'Security',
  },
];

export const FEATURES: Feature[] = [
  {
    id: 'personal-tracking',
    title: 'Personal Expense Tracker',
    description: 'Log daily expenditures with categories, dates, and payment notes. Keep personal finances organized separately from shared expenses.',
    iconName: 'Wallet',
    category: 'core',
    badge: 'Personal',
  },
  {
    id: 'bill-splitting',
    title: 'Group Bill Splitting',
    description: 'Split shared costs with flatmates, roommates, and travel buddies. Split equally, by custom exact amounts, or by percentage shares.',
    iconName: 'Users',
    category: 'groups',
    badge: 'Collaborative',
  },
  {
    id: 'smart-settlements',
    title: 'Debt Simplification',
    description: 'Optimized mathematical settlement algorithm minimizes the total number of transfers needed to square up among group members.',
    iconName: 'GitMerge',
    category: 'groups',
  },
  {
    id: 'upi-integration',
    title: '1-Tap UPI / GPay Settlements',
    description: 'Direct deep-link integration with UPI apps (Google Pay, PhonePe, Paytm). Settle dues in seconds with zero mediator fees.',
    iconName: 'Zap',
    category: 'groups',
    badge: 'Instant Pay',
  },
  {
    id: 'insights',
    title: 'Category Spending Insights',
    description: 'Interactive category breakdown and visual spending distributions. Identify where money goes each month without complex spreadsheets.',
    iconName: 'PieChart',
    category: 'insights',
  },
  {
    id: 'monthly-budget',
    title: 'Monthly Budget Limits',
    description: 'Set custom spending caps with real-time visual progress tracking and threshold alerts before you overspend.',
    iconName: 'TrendingUp',
    category: 'insights',
  },
  {
    id: 'reminders',
    title: 'Payment Due Reminders',
    description: 'Keep track of pending debts with customizable reminders. Send friendly nudge messages directly to WhatsApp.',
    iconName: 'Bell',
    category: 'core',
  },
  {
    id: 'export',
    title: 'Excel & CSV Statement Export',
    description: 'Download full spreadsheets of personal or group transactions anytime. Easy sharing to Google Drive, WhatsApp, or accounting tools.',
    iconName: 'FileSpreadsheet',
    category: 'core',
  },
  {
    id: 'security',
    title: 'Hardware-Backed Encryption',
    description: 'Local credentials protected with Android Keystore encryption via flutter_secure_storage. OWASP Mobile M1–M10 hardened.',
    iconName: 'ShieldCheck',
    category: 'security',
    badge: 'OWASP M1–M10',
  },
  {
    id: 'receipt-scanner',
    title: 'Smart Receipt Scanner',
    description: 'Point your camera at any receipt and on-device OCR extracts the total, merchant, and line items. Review and edit before saving — no manual typing.',
    iconName: 'ScanLine',
    category: 'core',
    badge: 'NEW',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Download & Install the APK',
    description:
      'Download the official Penny APK directly onto your Android device. It installs in seconds with zero bloatware and minimal permissions.',
    iconName: 'DownloadCloud',
  },
  {
    step: '02',
    title: 'Log Daily Expenses or Create Groups',
    description:
      'Record your personal transactions or set up a group for trips, roommates, or dinner outings. Add friends and enter bills with custom split rules.',
    iconName: 'ReceiptText',
  },
  {
    step: '03',
    title: 'Track Balances & Settle via UPI',
    description:
      'View transparent ledgers of who owes whom. Tap to settle dues directly via Google Pay or PhonePe with zero intermediate fees.',
    iconName: 'CheckCircle2',
  },
];

export const FAQS: FAQItem[] = [
  {
    question: 'What is Penny and how does it compare to other expense apps?',
    answer:
      'Penny is a dedicated, dark-themed Android app combining personal financial tracking with group bill-splitting. It offers debt simplification, 1-tap UPI deep-links, and full Excel/CSV statement exports with complete data privacy.',
  },
  {
    question: 'How do group bill splits and debt simplification work?',
    answer:
      'When you add a group expense, you can split it equally, by exact custom amounts, or by percentage shares. Penny calculates optimal settlements across all group members, minimizing the total number of bank transactions required to square up.',
  },
  {
    question: 'How does 1-tap UPI settlement work?',
    answer:
      'Each member can save their UPI ID (VPA) in their profile. When settling up, tapping the settle button automatically generates a standard UPI URI that opens Google Pay, PhonePe, Paytm, or BHIM on your phone with the exact amount and recipient pre-filled.',
  },
  {
    question: 'How do I install the APK on my Android phone?',
    answer:
      '1. Tap "Download Penny APK" on this page.\n2. Tap the Download icon in your browser or Drive (if prompted that file is large, tap "Download anyway").\n3. Open the downloaded APK from your phone\'s notification or "Downloads" folder.\n4. If your browser asks to "Allow from this source", toggle the switch in Android Settings.\n5. Tap "Install", then open Penny.',
  },
  {
    question: 'How is my financial and personal data protected?',
    answer:
      'All traffic is encrypted in transit using HTTPS (TLS 1.3). Passwords are protected with salted bcrypt hashing, and local tokens are encrypted using Android Keystore via flutter_secure_storage. Penny never has access to bank passwords, ATM PINs, or UPI MPINs.',
  },
  {
    question: 'How can I delete my account and data?',
    answer:
      'You can permanently delete your account and all associated data anytime: either in-app via Settings -> Delete Account, or through our public Google Play Data Safety web portal at https://penny-37mv.onrender.com/delete-account.',
  },
  {
    question: 'Can I export my data to Excel or Google Sheets?',
    answer:
      'Yes! Penny features built-in one-tap Excel and CSV statement export for both personal spending and group transaction histories. You can share reports directly via WhatsApp, email, or Google Drive.',
  },
  {
    question: 'How does the receipt scanner work?',
    answer:
      'Penny uses Google ML Kit for on-device OCR. Take a photo of any receipt (camera or gallery) and Penny automatically extracts the total amount, merchant name, and individual line items. You can review and edit everything in an interactive sheet before saving. All processing happens on your device — no images are uploaded to any server.',
  },
];

export const VERIFIED_SECURITY_PRACTICES = [
  {
    title: 'HTTPS (TLS 1.3) & Bcrypt Hashing',
    description:
      'All server communications are encrypted using HTTPS (TLS 1.3) with cleartext traffic disabled. Account passwords are protected with salted bcrypt hashing.',
    iconName: 'Lock',
  },
  {
    title: 'Hardware-Backed Keystore',
    description:
      'Authentication tokens and sensitive local keys are encrypted using Android Keystore hardware cryptography via flutter_secure_storage.',
    iconName: 'KeyRound',
  },
  {
    title: 'Peer-to-Peer Direct Payments',
    description:
      'Settlements use standard UPI deep-links. Penny never acts as an intermediary, never holds user money, and has zero access to your bank passwords.',
    iconName: 'ShieldAlert',
  },
  {
    title: 'Google Play Data Safety Compliant',
    description:
      'Permanent erasure available anytime both in-app and through our public web portal (penny-37mv.onrender.com/delete-account). Full CSV portability.',
    iconName: 'HardDriveDownload',
  },
];
