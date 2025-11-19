import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import SpaceSection from "@/components/SpaceSection";
import CreatorOsSection from "@/components/CreatorOsSection";
import ReviewsSection from "@/components/ReviewsSection";
import BookingSection from "@/components/BookingSection";
import FranchiseSection from "@/components/FranchiseSection";
import Footer from "@/components/Footer";

export default function HomeEn() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <SpaceSection />
        <ServicesSection />
        <CreatorOsSection />
        <ReviewsSection />
        <BookingSection />
        <FranchiseSection />
      </main>
      <Footer />
    </div>
  );
}
