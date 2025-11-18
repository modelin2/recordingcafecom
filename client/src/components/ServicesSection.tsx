import { Card, CardContent } from "@/components/ui/card";
import { Mic, Camera, Radio, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Mic,
    title: "레코딩 스튜디오",
    subtitle: "당신의 목소리를 완벽하게",
    description: "전문가 수준의 녹음 환경에서 노래, 팟캐스트, 내레이션 등 다양한 콘텐츠를 제작하세요.",
    features: ["프로 녹음 장비", "AI 피치 보정", "믹싱 & 마스터링", "음원 유통 지원"],
  },
  {
    icon: Camera,
    title: "프로필 촬영",
    subtitle: "첫인상을 빛나게",
    description: "전문 조명과 장비로 완성하는 할리우드 스타일 프로필 사진. SNS, 이력서, 포트폴리오까지.",
    features: ["전문 스튜디오 조명", "리터칭 서비스", "다양한 컨셉 연출", "즉석 출력 가능"],
  },
  {
    icon: Radio,
    title: "라이브 방송",
    subtitle: "실시간으로 소통하세요",
    description: "멀티 카메라와 전문 장비로 퀄리티 높은 라이브 방송을 진행하세요.",
    features: ["멀티 카메라 시스템", "실시간 스트리밍", "크로마키 배경", "전문 음향 시스템"],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-32 bg-background" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium mb-4" style={{ color: '#D4AF37' }}>
            Our Services
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-services-title">
            제공 서비스
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            커피 한 잔의 여유로움으로 시작하는 전문 콘텐츠 제작
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="hover-elevate active-elevate-2 transition-all duration-300 hover:scale-105 overflow-visible border-border/50"
                data-testid={`card-service-${index}`}
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="h-7 w-7" style={{ color: '#D4AF37' }} />
                  </div>

                  <h3 className="text-2xl font-semibold mb-2" data-testid={`text-service-title-${index}`}>
                    {service.title}
                  </h3>
                  
                  <p className="text-sm mb-4" style={{ color: '#D4AF37' }}>
                    {service.subtitle}
                  </p>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#D4AF37' }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="ghost" className="w-full justify-between hover:bg-primary/5" data-testid={`button-details-${index}`}>
                    자세히 보기
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
