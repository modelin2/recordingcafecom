import { Card } from "@/components/ui/card";

export default function SpaceSection() {
  return (
    <section id="space" className="py-20 md:py-32 bg-muted/30" data-testid="section-space">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium mb-6" style={{ color: '#D4AF37' }}>
              Our Space
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6" data-testid="text-space-title">
              편안함과 전문성이
              <br />
              공존하는 공간
            </h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                레코딩 카페는 따뜻한 우드 인테리어와 세련된 디자인이 조화를 이루는 
                프리미엄 공간입니다. 커피를 즐기며 편안하게 창작 활동을 시작할 수 있습니다.
              </p>
              
              <p>
                10년 이상의 엔터테인먼트 산업 경험을 바탕으로 구축된 전문 시스템과
                일반인도 쉽게 접근할 수 있는 친근한 분위기를 함께 제공합니다.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <Card className="p-4 bg-card">
                  <div className="text-2xl font-bold mb-1" style={{ color: '#D4AF37' }}>프리미엄</div>
                  <div className="text-sm text-muted-foreground">인테리어 & 장비</div>
                </Card>
                <Card className="p-4 bg-card">
                  <div className="text-2xl font-bold mb-1" style={{ color: '#D4AF37' }}>편안한</div>
                  <div className="text-sm text-muted-foreground">카페 분위기</div>
                </Card>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="aspect-[16/10] bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              <div className="text-center text-muted-foreground p-8">
                <p className="text-sm mb-2">메인 공간 이미지 영역</p>
                <p className="text-xs opacity-60">따뜻한 우드 인테리어가 돋보이는 카페 공간</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground p-4">
                  <p className="text-xs">녹음 부스</p>
                </div>
              </div>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground p-4">
                  <p className="text-xs">카페 공간</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
