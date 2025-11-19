import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import SpaceSection from "@/components/SpaceSection";
import CreatorOsSection from "@/components/CreatorOsSection";
import BookingSection from "@/components/BookingSection";
import FranchiseSection from "@/components/FranchiseSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <SpaceSection />
        <CreatorOsSection />
        <BookingSection />
        <FranchiseSection />
      </main>
      <Footer />
    </div>
  );
}
