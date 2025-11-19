import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [location] = useLocation();

  const getCurrentLanguage = () => {
    if (location.startsWith('/en')) return 'en';
    if (location.startsWith('/zh')) return 'zh';
    if (location.startsWith('/jp')) return 'jp';
    return 'ko';
  };

  const getText = () => {
    const lang = getCurrentLanguage();
    if (lang === 'en') {
      return {
        subtitle: "Where Music Meets Coffee",
        bookingButton: "Book Now"
      };
    } else if (lang === 'zh') {
      return {
        subtitle: "音乐与咖啡的特别空间",
        bookingButton: "立即预约"
      };
    } else if (lang === 'jp') {
      return {
        subtitle: "音楽とコーヒーが出会う特別な空間",
        bookingButton: "予約する"
      };
    }
    return {
      subtitle: "음악과 커피가 만나는 특별한 공간",
      bookingButton: "예약하기"
    };
  };

  useEffect(() => {
    // Preload video thumbnail
    const img = new Image();
    img.src = "https://i.ytimg.com/vi/kTsgj9n-9ks/maxresdefault.jpg";
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      data-testid="section-hero"
    >
      <div className="absolute inset-0">
        {/* Fallback background image while video loads */}
        {!videoLoaded && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://i.ytimg.com/vi/kTsgj9n-9ks/maxresdefault.jpg')" }}
          />
        )}
        
        <iframe
          className="absolute inset-0 w-full h-full object-cover"
          src="https://www.youtube.com/embed/kTsgj9n-9ks?autoplay=1&mute=1&loop=1&playlist=kTsgj9n-9ks&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1"
          title="레코딩 카페 홍보 영상"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ pointerEvents: 'none' }}
          onLoad={() => setVideoLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <p className="text-xl md:text-2xl text-white/90 mb-12 font-light" data-testid="text-hero-subtitle">
          {getText().subtitle}
        </p>

        <Button 
          size="lg" 
          className="text-base px-8" 
          style={{ backgroundColor: '#D4AF37', color: '#000' }}
          data-testid="button-booking"
          asChild
        >
          <a href="https://booking.naver.com/booking/12/bizes/1536339" target="_blank" rel="noopener noreferrer">
            {getText().bookingButton} <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
      </div>
    </section>
  );
}
