import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Send } from "lucide-react";

export default function BookingSection() {


  return (
    <section id="booking" className="py-16 md:py-20" data-testid="section-booking">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#D4AF37' }} data-testid="text-booking-title">
            예약 문의
          </h2>
          <p className="text-sm text-muted-foreground">
            네이버 예약 시스템을 통해 간편하게 예약하실 수 있습니다
          </p>
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            style={{ backgroundColor: '#D4AF37', color: '#000' }}
            data-testid="button-submit"
            asChild
          >
            <a href="https://booking.naver.com/booking/12/bizes/1536339" target="_blank" rel="noopener noreferrer">
              네이버 예약하기
            </a>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12 text-center">
          <div>
            <div className="text-xs font-semibold mb-1">운영 시간</div>
            <div className="text-xs text-muted-foreground">평일 12:00-21:00</div>
          </div>
          <div>
            <div className="text-xs font-semibold mb-1">예약 필수</div>
            <div className="text-xs text-muted-foreground">사전 예약 권장</div>
          </div>
          <div>
            <div className="text-xs font-semibold mb-1">빠른 응답</div>
            <div className="text-xs text-muted-foreground">평균 10분 내 답변</div>
          </div>
        </div>
      </div>
    </section>
  );
}
