import { Card } from "@/components/ui/card";
import { Quote, Camera } from "lucide-react";

export default function BrandStory() {
  return (
    <section id="story" className="py-16 md:py-24 lg:py-32 bg-muted/30" data-testid="section-story">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
              우리의 이야기
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" data-testid="text-story-title">
              10년간의 노하우를
              <br />
              <span className="text-primary">이제 모두에게</span>
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                이 공간을 운영한 지 벌써 10년이 넘었습니다. 처음에는 저희 기획사의 전속 아티스트 50여명의
                트레이닝과 음원 제작을 위한 완전한 내부 전용 시스템으로 구축되었습니다.
              </p>
              
              <p>
                그동안 이를 프랜차이즈화하거나 외부에 노하우를 공유할 생각이 없었습니다. 그만큼 이 시스템은
                단순한 비즈니스 모델이 아닌, 진짜 아티스트를 만들기 위한 핵심 자산이었기 때문입니다.
              </p>

              <p>
                하지만 최근 한국 문화에 대한 세계적 관심이 폭발적으로 커지고, 단순한 콘텐츠 소비를 넘어
                직접 경험하고 창작하고자 하는 수요가 빠르게 증가하고 있음을 체감했습니다.
              </p>
            </div>

            <Card className="mt-8 p-6 bg-card border-primary/20">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <p className="text-lg font-medium mb-2">
                "이제는 이 공간과 시스템이 더 이상 내부에만 머물러 있어서는 안 되겠다는 생각이 들었습니다."
              </p>
              <p className="text-sm text-muted-foreground">
                - 대표, 레코딩 카페
              </p>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="aspect-[4/3] bg-muted rounded-md flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">브랜드 스토리 이미지 영역</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">2,000억</div>
                <div className="text-sm text-muted-foreground">6개월 매출 달성 경험</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">글로벌</div>
                <div className="text-sm text-muted-foreground">미국 저작권 파트너십</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
