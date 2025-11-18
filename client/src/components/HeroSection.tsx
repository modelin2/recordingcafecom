import { Button } from "@/components/ui/button";
import { ArrowRight, Coffee } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      data-testid="section-hero"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="mb-8">
          <Coffee className="h-16 w-16 mx-auto mb-6" style={{ color: '#D4AF37' }} />
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white" data-testid="text-hero-title">
          음악과 커피가 만나는
          <br />
          <span style={{ color: '#D4AF37' }}>특별한 공간</span>
        </h1>

        <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-subtitle">
          편안한 카페 분위기에서 전문 녹음, 프로필 촬영, 라이브 방송을 경험하세요.
          <br />
          당신의 창작 여정이 시작됩니다.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button 
            size="lg" 
            className="text-base px-8" 
            style={{ backgroundColor: '#D4AF37', color: '#000' }}
            data-testid="button-explore"
          >
            둘러보기 <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-base px-8 border-white/30 text-white hover:bg-white/10" 
            data-testid="button-booking"
          >
            예약 문의
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center" data-testid="stat-recording">
            <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#D4AF37' }}>레코딩</div>
            <div className="text-sm text-white/60">전문 녹음 스튜디오</div>
          </div>
          <div className="text-center" data-testid="stat-photo">
            <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#D4AF37' }}>프로필</div>
            <div className="text-sm text-white/60">할리우드 스타일</div>
          </div>
          <div className="text-center" data-testid="stat-live">
            <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#D4AF37' }}>라이브</div>
            <div className="text-sm text-white/60">방송 스튜디오</div>
          </div>
          <div className="text-center" data-testid="stat-cafe">
            <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#D4AF37' }}>카페</div>
            <div className="text-sm text-white/60">편안한 휴식 공간</div>
          </div>
        </div>
      </div>
    </section>
  );
}
