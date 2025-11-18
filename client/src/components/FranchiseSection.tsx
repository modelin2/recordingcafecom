import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const benefits = [
  "표준화된 운영 시스템",
  "모듈화된 매장 구성",
  "글로벌 저작권 관리 지원",
  "음원 유통 인프라 제공",
  "지속적인 수익 모델",
  "마케팅 및 홍보 지원",
  "전문 교육 프로그램",
  "중국 시장 진출 지원",
];

export default function FranchiseSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Franchise inquiry submitted:", formData);
    toast({
      title: "문의가 접수되었습니다",
      description: "빠른 시일 내에 연락드리겠습니다.",
    });
    setFormData({ name: "", email: "", phone: "", country: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="franchise" className="py-16 md:py-24 lg:py-32" data-testid="section-franchise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-franchise-title">
            프랜차이즈 <span className="text-primary">가맹 문의</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            검증된 비즈니스 모델로 함께 성장하세요
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">가맹점 혜택</h3>
            
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2" data-testid={`benefit-${index}`}>
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">비즈니스 모델</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary mt-2" />
                    <span>1차: 오프라인 가맹점 모델</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary mt-2" />
                    <span>2차: 체험 + 판매 수익 모델</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary mt-2" />
                    <span>3차: IP 저작권 수익화</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="mt-6 p-6 bg-muted/50 rounded-md">
              <p className="text-sm text-muted-foreground mb-4">
                레코딩 카페는 문화-창작-창업이 융합된 신개념 유통 구조로,
                글로벌 확산과 투자 유치 가능성을 모두 내포하고 있습니다.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <div className="font-semibold">중국 대리점</div>
                  <div className="text-muted-foreground">계약금 입금 완료</div>
                </div>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6">문의하기</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">이름 *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="홍길동"
                    required
                    data-testid="input-name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">이메일 *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    required
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">연락처 *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="010-1234-5678"
                    required
                    data-testid="input-phone"
                  />
                </div>

                <div>
                  <Label htmlFor="country">희망 지역</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="서울 강남구"
                    data-testid="input-country"
                  />
                </div>

                <div>
                  <Label htmlFor="message">문의 내용</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="프랜차이즈에 대해 궁금하신 내용을 자유롭게 작성해주세요."
                    rows={4}
                    data-testid="input-message"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" data-testid="button-submit">
                  문의 보내기
                  <Send className="ml-2 h-4 w-4" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  제출하신 정보는 프랜차이즈 상담 목적으로만 사용됩니다.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
