import React, { useState, useEffect } from 'react';
import { Download, Menu, X, ArrowUpRight } from 'lucide-react';
import { DOWNLOAD_CONFIG, getPrimaryDownloadUrl, isExternalDownload } from '../data/siteContent';

interface NavbarProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Try Demo', href: '#try-demo' },
    { name: 'Features', href: '#features' },
    { name: 'App Tour', href: '#preview' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Download', href: '#download' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const downloadUrl = getPrimaryDownloadUrl();
  const isExternal = isExternalDownload();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0B10]/95 backdrop-blur-md border-b border-border/80 shadow-xl py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary rounded-xl p-1"
            aria-label="Penny Home"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-[#5A46F5]/40 group-hover:scale-105 transition-transform bg-[#0B0B10] border border-white/10 flex items-center justify-center">
              <img
                src="./images/penny_logo.png"
                alt="Penny Official Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-primary-light transition-colors">
                  Penny
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary/20 text-[#A78BFA] border border-[#7C6FF7]/30">
                  {DOWNLOAD_CONFIG.version}
                </span>
              </div>
              <span className="text-[10px] text-textMuted tracking-wide uppercase font-medium">Expense & Split</span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-textMuted hover:text-white transition-colors focus:outline-none focus:text-white"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Download CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={downloadUrl}
              download={!isExternal ? DOWNLOAD_CONFIG.apkFileName : undefined}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white brand-gradient-btn shadow-md shadow-[#5A46F5]/30 hover:shadow-[#5A46F5]/50 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              <Download className="w-4 h-4" />
              <span>Download APK</span>
              <span className="text-xs bg-black/30 border border-white/20 px-1.5 py-0.5 rounded text-white/90">
                {DOWNLOAD_CONFIG.fileSizeDisplay}
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={downloadUrl}
              download={!isExternal ? DOWNLOAD_CONFIG.apkFileName : undefined}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary-dark transition-all"
              aria-label="Download APK"
            >
              <Download className="w-3.5 h-3.5" />
              <span>APK</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-textMuted hover:text-white hover:bg-surface-light focus:outline-none focus:ring-2 focus:ring-primary"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-surface/95 border border-border backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="px-3 py-2 rounded-lg text-base font-medium text-textMuted hover:text-white hover:bg-surface-light transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </a>
              ))}
              <div className="pt-2 border-t border-border mt-1">
                <a
                  href={downloadUrl}
                  download={!isExternal ? DOWNLOAD_CONFIG.apkFileName : undefined}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  onClick={handleLinkClick}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-base font-semibold text-white bg-primary hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Penny APK ({DOWNLOAD_CONFIG.fileSizeDisplay})</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
