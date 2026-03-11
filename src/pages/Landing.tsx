import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import PainSection from "@/components/landing/PainSection";
import SolutionSection from "@/components/landing/SolutionSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ObjectionsSection from "@/components/landing/ObjectionsSection";
import ValueProofSection from "@/components/landing/ValueProofSection";
import OfferSection from "@/components/landing/OfferSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import Footer from "@/components/landing/Footer";
import AuthModal from "@/components/auth/AuthModal";
import { AuthModalProvider, useAuthModal } from "@/contexts/AuthModalContext";
import { useEffect } from "react";

const LandingContent = () => {
  const { isOpen, setIsOpen } = useAuthModal();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <PainSection />
        <SolutionSection />
        <BenefitsSection />
        <HowItWorksSection />
        <ObjectionsSection />
        <ValueProofSection />
        <OfferSection />
        <FinalCTASection />
      </main>
      <Footer />
      <AuthModal open={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
};

const Landing = () => {
  useEffect(() => {
    // Force light theme for landing page
    const root = window.document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
    
    // Cleanup: restore dark theme when leaving landing page
    return () => {
      root.classList.remove('light');
      root.classList.add('dark');
    };
  }, []);

  return (
    <AuthModalProvider>
      <LandingContent />
    </AuthModalProvider>
  );
};

export default Landing;
