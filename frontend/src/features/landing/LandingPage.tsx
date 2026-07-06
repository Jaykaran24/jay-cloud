import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import InfrastructureSection from "./sections/InfrastructureSection";
import FeaturesSection from "./sections/FeaturesSection";
import Footer from "./components/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <InfrastructureSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
