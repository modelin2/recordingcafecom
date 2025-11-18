import { Card, CardContent } from "@/components/ui/card";
import { Mic, Camera, Radio, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Mic,
    title: "레코딩 스튜디오",
    description: "전문가 수준의 녹음 환경에서 당신만의 음원을 제작하세요. 저작권 등록부터 유통까지 전 과정을 지원합니다.",
    features: ["AI 피치 보정", "저작권 등록", "음원 유통", "수익 창출"],
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: Camera,
    title: "할리우드 프로필",
    description: "전문 브랜드 사진 촬영으로 해외 진출의 꿈을 현실로. 글로벌 시장을 겨냥한 프로필을 만듭니다.",
    features: ["전문 조명", "헤어 & 메이크업", "글로벌 포트폴리오", "SNS 최적화"],
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Radio,
    title: "라이브 방송",
    description: "광고주와 크리에이터가 함께 성장하는 플랫폼. 실시간 소통으로 당신의 팬덤을 만드세요.",
    features: ["멀티 카메라", "실시간 채팅", "광고 매칭", "수익 분배"],
    color: "from-orange-500/20 to-red-500/20",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 lg:py-32" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-services-title">
            우리의 서비스
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            일반인도 쉽게 시작할 수 있는 전문적인 콘텐츠 제작 환경
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="hover-elevate active-elevate-2 transition-transform hover:scale-105 overflow-visible"
                data-testid={`card-service-${index}`}
              >
                <CardContent className="p-6 md:p-8">
                  <div
                    className={`w-16 h-16 rounded-md bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}
                  >
                    <Icon className="h-8 w-8 text-primary" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold mb-3" data-testid={`text-service-title-${index}`}>
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="ghost" className="w-full justify-between" data-testid={`button-learn-more-${index}`}>
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
