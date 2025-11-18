import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Send } from "lucide-react";

export default function BookingSection() {


  return (
    <section id="booking" className="py-20 md:py-32 bg-background" data-testid="section-booking">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium mb-4" style={{ color: '#D4AF37' }}>
            Reservation
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-booking-title">
            예약 문의
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            원하시는 서비스와 일정을 알려주시면 신속하게 안내해 드리겠습니다
          </p>
        </div>

        <Card className="border-border/50">
          <CardContent className="p-8 md:p-12 text-center">
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              원하시는 서비스와 일정을 네이버 예약 시스템을 통해<br />
              간편하게 예약하실 수 있습니다.
            </p>

            <div className="flex flex-col gap-4">
              <Button 
                size="lg"
                className="w-full"
                style={{ backgroundColor: '#D4AF37', color: '#000' }}
                data-testid="button-submit"
                asChild
              >
                <a href="https://booking.naver.com/booking/12/bizes/1536339" target="_blank" rel="noopener noreferrer">
                  네이버 예약하기
                  <Send className="ml-2 h-4 w-4" />
                </a>
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                영업시간: 평일 10:00 - 22:00 | 주말 10:00 - 20:00
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 text-center bg-card">
            <Calendar className="h-8 w-8 mx-auto mb-3" style={{ color: '#D4AF37' }} />
            <div className="font-semibold mb-1">운영 시간</div>
            <div className="text-sm text-muted-foreground">평일 10:00-22:00</div>
          </Card>
          <Card className="p-6 text-center bg-card">
            <Clock className="h-8 w-8 mx-auto mb-3" style={{ color: '#D4AF37' }} />
            <div className="font-semibold mb-1">예약 필수</div>
            <div className="text-sm text-muted-foreground">사전 예약 권장</div>
          </Card>
          <Card className="p-6 text-center bg-card">
            <Send className="h-8 w-8 mx-auto mb-3" style={{ color: '#D4AF37' }} />
            <div className="font-semibold mb-1">빠른 응답</div>
            <div className="text-sm text-muted-foreground">24시간 내 답변</div>
          </Card>
        </div>
      </div>
    </section>
  );
}
