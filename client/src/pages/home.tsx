import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import ArchitectureSection from "@/components/architecture-section";
import SecuritySection from "@/components/security-section";
import DemoSection from "@/components/demo-section";
import SpecsSection from "@/components/specs-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <ArchitectureSection />
      <SecuritySection />
      <DemoSection />
      <SpecsSection />
      <Footer />
    </div>
  );
}
