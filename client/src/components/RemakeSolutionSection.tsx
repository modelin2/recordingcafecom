import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Check, AlertTriangle } from "lucide-react";

const benefits = [
  "원곡자 승인부터 저작권료 협의까지 전문가가 대행",
  "까다로운 법적 절차를 대신 처리",
  "정식 라이선싱으로 유튜브 차단 걱정 없음",
  "글로벌 플랫폼에 합법적으로 발매"
];

export default function RemakeSolutionSection() {
  return (
    <section className="py-20 md:py-32 bg-background" data-testid="section-remake">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium mb-6" style={{ color: '#D4AF37' }}>
              Remake Solution
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              평소 부르던 애창곡,
              <br />
              <span style={{ color: '#D4AF37' }}>이제 '내 앨범'으로 내세요</span>
            </h2>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              단순 커버를 넘어, 정식 음원으로 발매하는 솔루션.
              복잡한 절차 없는 One-Stop 해결.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3" style={{ color: '#D4AF37' }} />
                  </div>
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg"
              style={{ backgroundColor: '#D4AF37', color: '#000' }}
              data-testid="button-remake-consult"
              asChild
            >
              <a href="https://booking.naver.com/booking/12/bizes/1536339" target="_blank" rel="noopener noreferrer">
                리메이크 상담하기
              </a>
            </Button>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-red-500/10 border-red-500/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h4 className="font-bold text-red-500 mb-2">기존의 어려움</h4>
                  <p className="text-sm text-muted-foreground">
                    "열심히 연습해서 커버곡을 올렸는데, 저작권 위반으로 차단되었어요"
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-2">
                    혼자서 해결하기 힘든 저작권 장벽
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-2" style={{ borderColor: '#D4AF37' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}>
                  <Music className="h-5 w-5" style={{ color: '#D4AF37' }} />
                </div>
                <div>
                  <h4 className="font-bold mb-2" style={{ color: '#D4AF37' }}>레코딩 카페 솔루션</h4>
                  <p className="text-sm text-muted-foreground">
                    라이선싱 대행으로 원곡자 승인부터 저작권료 협의까지 전문가가 처리합니다.
                  </p>
                  <p className="text-xs mt-2" style={{ color: '#D4AF37' }}>
                    복잡한 절차 없는 One-Stop 해결
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
