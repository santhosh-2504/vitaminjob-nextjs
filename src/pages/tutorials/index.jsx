import HeroSection from "@/components/tuitions/HeroSection";
import ContactSection from "@/components/tuitions/ContactSection";
import CirriculumSection from "@/components/tuitions/CirriculumSection";
import PricingSection from "@/components/tuitions/PricingSection";
import AboutSection from "@/components/tuitions/AboutSection";

export default function TutorialsPage() {
  return (
    <div className="tutorials-page">
      <h1>Tutorials</h1>
      <p>Welcome to the tutorials section. Here you will find a variety of tutorials to help you learn and grow.</p>
      <HeroSection />
      <AboutSection />
      <CirriculumSection />
      <PricingSection />
      <ContactSection />
    </div>
  );
}
