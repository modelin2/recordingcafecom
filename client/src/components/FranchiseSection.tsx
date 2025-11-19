import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Handshake, TrendingUp } from "lucide-react";

export default function FranchiseSection() {
  return (
    <section id="franchise" className="py-16 md:py-20" data-testid="section-franchise">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#D4AF37' }} data-testid="text-franchise-title">
            가맹점 안내
          </h2>
        </div>

        <div className="mb-12 p-6 border-l-2" style={{ borderColor: '#D4AF37' }}>
          <h3 className="text-lg font-bold mb-3">
            특허 무단 사용 중지 및 정식 가맹점 전환 절차 안내
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            현재 무단으로 당사의 특허 기술을 사용 중인 셀프 사진관 관계자 여러분께서는, 
            운영 수익이 증가할수록 그에 대한 법적 리스크(배상액) 또한 증가하고 있다는 점을 인지하시어 
            정식 가맹점으로의 전환을 권고드립니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#D4AF37' }}>정식 가맹점 혜택</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>• 특허 기술 합법적 사용권</li>
              <li>• 세계 최초 AI 후보정 비즈니스 모델 제공</li>
              <li>• 안정적인 사업 운영 보장</li>
              <li>• 법적 리스크 완전 해소</li>
            </ul>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#D4AF37' }}>AI 시대의 새로운 수익 모델</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              인공지능 기술을 활용한 혁신적인 비즈니스 모델로 
              더 큰 수익 창출이 가능합니다.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              상생 협력을 통해 함께 성장하는 
              파트너십을 제안합니다.
            </p>
          </div>
        </div>

        <div className="text-center p-8 border-t">
          <h3 className="text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>가맹점 사업설명회</h3>
          <p className="text-sm text-muted-foreground mb-6">
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
        </div>
      </div>
    </section>
  );
}
