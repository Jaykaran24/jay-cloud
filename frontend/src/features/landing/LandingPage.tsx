import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import InfrastructureSection from "./sections/InfrastructureSection";
import FeaturesSection from "./sections/FeaturesSection";
import ProjectsSection from "./sections/ProjectsSection";
import PortfolioSection from "./sections/PortfolioSection";
import ContactSection from "./sections/ContactSection";
import Footer from "./components/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <InfrastructureSection />
      <FeaturesSection />
      <ProjectsSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
