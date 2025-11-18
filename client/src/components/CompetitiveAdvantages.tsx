import { Card, CardContent } from "@/components/ui/card";
import { Globe, TrendingUp, Shield, Zap } from "lucide-react";

const advantages = [
  {
    icon: Shield,
    stat: "미국",
    label: "저작권 파트너십",
    description: "미국 대표 저작권 관리 단체와 공식 파트너십. 글로벌 저작권 보호 시스템.",
  },
  {
    icon: Globe,
    stat: "도우인·샤오홍슈",
    label: "직접 광고 계정",
    description: "국내 유일 도우인, 샤오홍슈 직접 광고주 계정 운영. 중국 시장 직접 진입.",
  },
  {
    icon: TrendingUp,
    stat: "2,000억",
    label: "검증된 실적",
    description: "6개월 만에 2,000억 원 매출 달성 경험. 폭발적 성장 가능성 입증.",
  },
  {
    icon: Zap,
    stat: "모듈화",
    label: "글로벌 확장성",
    description: "표준화된 시스템으로 어디서나 동일한 경험. 프랜차이즈 최적화 모델.",
  },
];

export default function CompetitiveAdvantages() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-muted/30" data-testid="section-advantages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-advantages-title">
            우리의 차별점
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            10년간 쌓아온 노하우와 글로벌 네트워크
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <Card key={index} className="hover-elevate" data-testid={`card-advantage-${index}`}>
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                    {advantage.stat}
                  </div>
                  <div className="text-sm font-semibold mb-3">
                    {advantage.label}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-card">
            <div className="text-sm text-muted-foreground mb-2">전문성</div>
            <div className="text-2xl font-bold mb-1">10+</div>
            <div className="text-sm">년간 엔터 산업 경험</div>
          </Card>
          <Card className="p-6 bg-card">
            <div className="text-sm text-muted-foreground mb-2">안정성</div>
            <div className="text-2xl font-bold mb-1">50+</div>
            <div className="text-sm">아티스트 배출 실적</div>
          </Card>
          <Card className="p-6 bg-card">
            <div className="text-sm text-muted-foreground mb-2">확장성</div>
            <div className="text-2xl font-bold mb-1">3개국</div>
            <div className="text-sm">한국·미국·중국 진출</div>
          </Card>
        </div>
      </div>
    </section>
  );
}
