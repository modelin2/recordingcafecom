import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import JourneySection from "@/components/JourneySection";
import ServicesSection from "@/components/ServicesSection";
import SpaceSection from "@/components/SpaceSection";
import GlobalDistributionSection from "@/components/GlobalDistributionSection";
import RemakeSolutionSection from "@/components/RemakeSolutionSection";
import CreatorOsSection from "@/components/CreatorOsSection";
import ReviewsSection from "@/components/ReviewsSection";
import BookingSection from "@/components/BookingSection";
import FranchiseSection from "@/components/FranchiseSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <JourneySection />
        <SpaceSection />
        <ServicesSection />
        <GlobalDistributionSection />
        <RemakeSolutionSection />
        <CreatorOsSection />
        <ReviewsSection />
        <BookingSection />
        <FranchiseSection />
      </main>
      <Footer />
    </div>
  );
}
