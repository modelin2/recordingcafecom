import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export default function CreatorOsSection() {
  const pipelines = [
    {
      title: "배우 OS",
      subtitle: "할리우드 프로필",
      description: "AI 헤어/메이크업/로케이션 시뮬레이션. 글로벌 캐스팅 사이트 프로필 등록 대행 사업",
      result: "오디션 합격률 향상, 해외 진출 기회 확대",
      link: "https://holly.ai.kr/",
      buttonText: "할리우드 프로필"
    },
    {
      title: "가수 OS",
      subtitle: "레코딩 카페",
      description: "AI 어시스트 창작부터 타임스탬프/저작권 등록, 해외 유통까지",
      result: "초기 로열티 발생, 음악 자산 포트폴리오 구축",
      link: "https://chinastage.co.kr/",
      buttonText: "중국 팬미팅 전문 대행"
    },
    {
      title: "인플루언서 OS",
      subtitle: "보라박스",
      description: "구독자가 적은 인플루언서도 콜라보를 통해 성장. 예술인 인증을 통한 기초생활 지원",
      result: "다양한 수익원 확보, 안정적 인플루언서로 성장",
      link: "https://influencer.kr/",
      buttonText: "한국인플루언서협회"
    }
  ];

  return (
    <section id="creator-os" className="py-20 md:py-32 bg-background" data-testid="section-creator-os">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium mb-6" style={{ color: '#D4AF37' }}>
            Creator OS
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6" data-testid="text-creator-os-title">
            크리에이터 운영체제
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            <span style={{ color: '#D4AF37' }}>AI × Entertainment × Finance</span><br className="hidden sm:block" />
            창작자의 생애 수익 구조를 설계 운영
          </p>

          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            AI 기술로 창작자의 꿈을 현실로 만드는 투자
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pipelines.map((pipeline, index) => (
            <Card key={index} className="border-border/50 hover-elevate" data-testid={`card-pipeline-${index}`}>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">{pipeline.title}</h3>
                <p className="text-sm mb-4" style={{ color: '#D4AF37' }}>{pipeline.subtitle}</p>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {pipeline.description}
                </p>

                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-start gap-2 mb-4">
                    <Sparkles className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <p className="text-sm text-muted-foreground">{pipeline.result}</p>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full group"
                    style={{ backgroundColor: '#D4AF37', color: '#000' }}
                    data-testid={`button-pipeline-${index}`}
                    asChild
                  >
                    <a href={pipeline.link} target="_blank" rel="noopener noreferrer">
                      <span>{pipeline.buttonText}</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-muted/30 border-border/50">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed text-muted-foreground">
                레코딩 카페는 프로로 성장하기 위한<br className="hidden sm:block" />
                <span className="font-semibold text-foreground">성공적인 커리어 운영체제(OS)</span>를 제공합니다
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
