import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = 'https://img.youtube.com/vi/K9qS9jb3zYw/maxresdefault.jpg';
    img.onload = () => setVideoLoaded(true);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden" data-testid="section-hero">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: videoLoaded 
            ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://img.youtube.com/vi/K9qS9jb3zYw/maxresdefault.jpg)` 
            : 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))'
        }}
      />
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight" style={{ color: '#D4AF37' }} data-testid="text-hero-title">
          레코딩 카페
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto" data-testid="text-hero-subtitle">
          음악과 커피가 만나는 특별한 공간
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            className="text-lg px-8 py-6"
            style={{ backgroundColor: '#D4AF37', color: '#000' }}
            asChild
            data-testid="button-booking"
          >
            <a href="#booking">예약하기</a>
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
            asChild
            data-testid="button-watch-video"
          >
            <a href="https://www.youtube.com/watch?v=K9qS9jb3zYw" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              영상 보기
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
