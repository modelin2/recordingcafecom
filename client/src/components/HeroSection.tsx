import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      data-testid="section-hero"
    >
      <div className="absolute inset-0">
        <iframe
          className="absolute inset-0 w-full h-full object-cover"
          src="https://www.youtube.com/embed/kTsgj9n-9ks?autoplay=1&mute=1&loop=1&playlist=kTsgj9n-9ks&controls=0&showinfo=0&rel=0&modestbranding=1"
          title="레코딩 카페 홍보 영상"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ pointerEvents: 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-white" data-testid="text-hero-title">
          <span style={{ color: '#D4AF37' }}>Recording Café</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-12 font-light" data-testid="text-hero-subtitle">
          음악과 커피가 만나는 특별한 공간
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="text-base px-8" 
            style={{ backgroundColor: '#D4AF37', color: '#000' }}
            data-testid="button-explore"
            asChild
          >
            <a href="#services">
              둘러보기 <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-base px-8 border-white/30 text-white hover:bg-white/10" 
            data-testid="button-booking"
            asChild
          >
            <a href="https://booking.naver.com/booking/12/bizes/1536339" target="_blank" rel="noopener noreferrer">
              예약하기
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
