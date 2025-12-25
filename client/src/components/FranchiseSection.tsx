import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, TrendingUp } from "lucide-react";

export default function FranchiseSection() {
  return (
    <section id="franchise" className="py-20 md:py-32 bg-muted/30" data-testid="section-franchise">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium mb-4" style={{ color: '#D4AF37' }}>
            Franchise
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-franchise-title">
            가맹점 안내
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-border/50 hover-elevate">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Handshake className="h-6 w-6" style={{ color: '#D4AF37' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4">정식 가맹점 혜택</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }} />
                  <span>특허 기술 합법적 사용권</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }} />
                  <span>세계 최초 AI 후보정 비즈니스 모델 제공</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }} />
                  <span>안정적인 사업 운영 보장</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }} />
                  <span>법적 리스크 완전 해소</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover-elevate">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6" style={{ color: '#D4AF37' }} />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI 시대의 새로운 수익 모델</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                인공지능 기술을 활용한 혁신적인 비즈니스 모델로 
                더 큰 수익 창출이 가능합니다.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                상생 협력을 통해 함께 성장하는 
                파트너십을 제안합니다.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2" style={{ borderColor: '#D4AF37' }}>
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">가맹점 사업설명회</h3>
            <p className="text-muted-foreground mb-6">
              자세한 문의 및 가맹점 신청은 사업설명회에 참여하세요
            </p>
            <Button 
              size="lg"
              style={{ backgroundColor: '#D4AF37', color: '#000' }}
              data-testid="button-franchise-inquiry"
              asChild
            >
              <a href="https://booking.naver.com/booking/12/bizes/1536339" target="_blank" rel="noopener noreferrer">
                네이버 예약 &gt; 가맹점 사업설명회 신청
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
