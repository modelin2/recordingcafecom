import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BookingSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
    toast({
      title: "예약 문의가 접수되었습니다",
      description: "담당자가 확인 후 연락드리겠습니다.",
    });
    setFormData({ name: "", phone: "", email: "", service: "", date: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
          <CardContent className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-base">이름 *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="홍길동"
                    required
                    className="mt-2"
                    data-testid="input-name"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-base">연락처 *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="010-1234-5678"
                    required
                    className="mt-2"
                    data-testid="input-phone"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-base">이메일</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="mt-2"
                  data-testid="input-email"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="service" className="text-base">서비스 선택 *</Label>
                  <Select 
                    value={formData.service} 
                    onValueChange={(value) => setFormData({...formData, service: value})}
                  >
                    <SelectTrigger className="mt-2" data-testid="select-service">
                      <SelectValue placeholder="서비스를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recording">레코딩 스튜디오</SelectItem>
                      <SelectItem value="photo">프로필 촬영</SelectItem>
                      <SelectItem value="live">라이브 방송</SelectItem>
                      <SelectItem value="package">패키지</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date" className="text-base">희망 일정</Label>
                  <div className="relative mt-2">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="pl-10"
                      data-testid="input-date"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-base">문의 내용</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="문의하실 내용이나 특별한 요청사항이 있으시면 자유롭게 작성해주세요."
                  rows={5}
                  className="mt-2"
                  data-testid="input-message"
                />
              </div>

              <div className="flex flex-col gap-4">
                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full"
                  style={{ backgroundColor: '#D4AF37', color: '#000' }}
                  data-testid="button-submit"
                >
                  예약 문의하기
                  <Send className="ml-2 h-4 w-4" />
                </Button>
                
                <p className="text-sm text-muted-foreground text-center">
                  영업시간: 평일 10:00 - 22:00 | 주말 10:00 - 20:00
                </p>
              </div>
            </form>
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
