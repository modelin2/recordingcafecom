import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);

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
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: '#D4AF37' }} data-testid="text-hero-title">
          레코딩 카페
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-12" data-testid="text-hero-subtitle">
          음악과 커피가 만나는 특별한 공간
        </p>

        <Button 
          size="lg" 
          className="text-sm px-6" 
          style={{ backgroundColor: '#D4AF37', color: '#000' }}
          data-testid="button-booking"
          asChild
        >
          <a href="https://booking.naver.com/booking/12/bizes/1536339" target="_blank" rel="noopener noreferrer">
            예약하기
          </a>
        </Button>
      </div>
    </section>
  );
}
