import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import BrandStory from "@/components/BrandStory";
import CustomerJourney from "@/components/CustomerJourney";
import CompetitiveAdvantages from "@/components/CompetitiveAdvantages";
import FranchiseSection from "@/components/FranchiseSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <BrandStory />
        <CustomerJourney />
        <CompetitiveAdvantages />
        <FranchiseSection />
      </main>
      <Footer />
    </div>
  );
}
