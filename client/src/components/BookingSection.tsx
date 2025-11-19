import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Send } from "lucide-react";
import { useLocation } from "wouter";

export default function BookingSection() {
  const [location] = useLocation();

  const getCurrentLanguage = () => {
    if (location.startsWith('/en')) return 'en';
    if (location.startsWith('/zh')) return 'zh';
    return 'ko';
  };

  const getText = () => {
    const lang = getCurrentLanguage();
    if (lang === 'en') {
      return {
        title: "Reservation Inquiry",
        description: "You can easily make a reservation through our Naver booking system.",
        buttonText: "Book on Naver",
        hours: "Operating Hours",
        hoursDetail: "Weekdays 12:00-21:00",
        required: "Reservation Required",
        requiredDetail: "Advance booking recommended",
        response: "Quick Response",
        responseDetail: "Average response within 10 minutes"
      };
    } else if (lang === 'zh') {
      return {
        title: "预约咨询",
        description: "您可以通过Naver预约系统轻松预约。",
        buttonText: "Naver预约",
        hours: "营业时间",
        hoursDetail: "工作日 12:00-21:00",
        required: "需要预约",
        requiredDetail: "建议提前预约",
        response: "快速响应",
        responseDetail: "平均10分钟内回复"
      };
    }
    return {
      title: "예약 문의",
      description: "네이버 예약 시스템을 통해 간편하게 예약하실 수 있습니다.",
      buttonText: "네이버 예약하기",
      hours: "운영 시간",
      hoursDetail: "평일 12:00-21:00",
      required: "예약 필수",
      requiredDetail: "사전 예약 권장",
      response: "빠른 응답",
      responseDetail: "평균 10분 내 답변"
    };
  };


  return (
    <section id="booking" className="py-20 md:py-32 bg-background" data-testid="section-booking">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium mb-4" style={{ color: '#D4AF37' }}>
            Reservation
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-booking-title">
            {getText().title}
          </h2>
        </div>

        <Card className="border-border/50">
          <CardContent className="p-8 md:p-12 text-center">
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {getText().description}
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
                  {getText().buttonText}
                  <Send className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 text-center bg-card">
            <Calendar className="h-8 w-8 mx-auto mb-3" style={{ color: '#D4AF37' }} />
            <div className="font-semibold mb-1">{getText().hours}</div>
            <div className="text-sm text-muted-foreground">{getText().hoursDetail}</div>
          </Card>
          <Card className="p-6 text-center bg-card">
            <Clock className="h-8 w-8 mx-auto mb-3" style={{ color: '#D4AF37' }} />
            <div className="font-semibold mb-1">{getText().required}</div>
            <div className="text-sm text-muted-foreground">{getText().requiredDetail}</div>
          </Card>
          <Card className="p-6 text-center bg-card">
            <Send className="h-8 w-8 mx-auto mb-3" style={{ color: '#D4AF37' }} />
            <div className="font-semibold mb-1">{getText().response}</div>
            <div className="text-sm text-muted-foreground">{getText().responseDetail}</div>
          </Card>
        </div>
      </div>
    </section>
  );
}
