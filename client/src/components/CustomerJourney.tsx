import { Card, CardContent } from "@/components/ui/card";
import { User, Music, Upload, TrendingUp } from "lucide-react";

const journeySteps = [
  {
    icon: User,
    title: "발견",
    description: "21살 직장인 지우는 노래를 좋아하지만 어디서부터 시작해야 할지 몰랐습니다.",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    icon: Music,
    title: "첫 녹음",
    description: "레코딩 카페를 방문해 처음으로 전문 스튜디오에서 자신의 목소리를 녹음했습니다.",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Upload,
    title: "음원 발매",
    description: "믿을 수 없게도 자신의 노래가 Spotify와 Apple Music에 올라갔습니다.",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    icon: TrendingUp,
    title: "성장",
    description: "이제 주말마다 새로운 곡을 만들며 작은 팬덤을 키워가고 있습니다.",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
];

export default function CustomerJourney() {
  return (
    <section className="py-16 md:py-24 lg:py-32" data-testid="section-journey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-journey-title">
            평범한 사람에서
            <br />
            <span className="text-primary">크리에이터로</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            지우의 여정을 통해 본 레코딩 카페
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="relative hover-elevate" data-testid={`card-journey-${index}`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full ${step.color} mx-auto mb-4 flex items-center justify-center`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <Card className="mt-12 p-8 bg-muted/50">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <User className="h-12 w-12 text-muted-foreground opacity-50" />
            </div>
            <div className="text-center md:text-left flex-1">
              <p className="text-lg mb-2">
                "기획사에 들어가지 못하면 꿈을 접어야 한다고 생각했어요. 레코딩 카페는 저에게
                새로운 가능성을 열어줬습니다."
              </p>
              <p className="text-sm text-muted-foreground">
                - 김지우, 21세 직장인
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
