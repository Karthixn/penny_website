import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveDemo } from './components/InteractiveDemo';
import { AppPreview } from './components/AppPreview';
import { FeatureGrid } from './components/FeatureGrid';
import { HowItWorks } from './components/HowItWorks';
import { DownloadSection } from './components/DownloadSection';
import { FAQ } from './components/FAQ';
import { Pricing } from './components/Pricing';
import { Changelog } from './components/Changelog';
import { Footer } from './components/Footer';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { TermsModal } from './components/TermsModal';
import { DeleteAccountModal } from './components/DeleteAccountModal';

export const App: React.FC = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 selection:text-white flex flex-col font-sans">
      {/* Skip to Main Content Link for screen readers & keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary text-white font-bold rounded-lg shadow-lg"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <Navbar
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
        onOpenTerms={() => setTermsModalOpen(true)}
      />

      {/* Main Page Content */}
      <main id="main-content" className="flex-grow">
        <Hero />
        <InteractiveDemo />
        <AppPreview />
        <FeatureGrid />
        <HowItWorks />
        <Pricing />
        <DownloadSection />
        <FAQ />
        <Changelog />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
        onOpenTerms={() => setTermsModalOpen(true)}
        onOpenDeleteAccount={() => setDeleteAccountModalOpen(true)}
      />

      {/* Interactive Modals */}
      <PrivacyPolicyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        onOpenDeleteAccount={() => setDeleteAccountModalOpen(true)}
      />
      <TermsModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
      />
      <DeleteAccountModal
        isOpen={deleteAccountModalOpen}
        onClose={() => setDeleteAccountModalOpen(false)}
      />
    </div>
  );
};

export default App;
