import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="inline-block mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            10년 이상의 엔터테인먼트 경험 | 글로벌 프랜차이즈 | 미국 저작권 파트너십
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" data-testid="text-hero-title">
          엔터테인먼트 산업의
          <br />
          <span className="text-primary">미래를 만듭니다</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-subtitle">
          일반인 엔터테이너를 위한 창업공간. 새로운 인공지능 엔터산업의 선구자.
          <br />
          녹음, 사진, 라이브방송을 통해 누구나 콘텐츠 크리에이터가 될 수 있습니다.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button size="lg" className="text-base px-8" data-testid="button-start-journey">
            시작하기 <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-base px-8" data-testid="button-watch-video">
            <Play className="mr-2 h-5 w-5" />
            소개 영상 보기
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
          <div className="text-center" data-testid="stat-experience">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10+</div>
            <div className="text-muted-foreground">년 운영 경험</div>
          </div>
          <div className="text-center" data-testid="stat-artists">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">전속 아티스트 배출</div>
          </div>
          <div className="text-center" data-testid="stat-countries">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">3</div>
            <div className="text-muted-foreground">개국 진출 예정</div>
          </div>
        </div>
      </div>
    </section>
  );
}
