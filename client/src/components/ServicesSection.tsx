import { Card, CardContent } from "@/components/ui/card";
import { Mic, Camera, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import recordingStudioImg from "@assets/generation-b1e0478d-96f1-48b2-b114-cb8d36f5ee3c_1763434246630.png";
import photoStudioImg from "@assets/셀프사진관6_1763434307399.png";
import boraBoxImg from "@assets/레코딩카페_보라박스_1763434398383.png";

const services = [
  {
    icon: Mic,
    image: recordingStudioImg,
    tag: "노래방처럼 편하게, 프로처럼 녹음하세요",
    title: "레코딩 스튜디오",
    subtitle: "노래방 18번 곡, 진짜 스튜디오에서 불러보세요",
    description: "평소 노래방에서 부르던 그 노래 그대로, 장소만 프로 스튜디오로 바꾸는 거예요. 목소리는 똑같은데 사운드만 완전히 달라져요.",
    details: [
      "평소 즐겨 부르는 곡 하나만 준비해 오세요",
      "마이크 세팅하고 간단히 테스트 (1-2분)",
      "편하게 노래 불러주세요 (2-3번 정도)",
      "바로 들어보고 살짝 다듬어 드려요",
      "내 음원 완성! 완성된 파일은 메일로 보내드려요"
    ],
    note: "처음부터 끝까지 전문가가 옆에서 도와드리니까 처음이어도 전혀 부담 없어요. 그냥 '부르기만' 하면 돼요."
  },
  {
    icon: Camera,
    image: photoStudioImg,
    tag: "특허받은 거울 속 카메라 기술",
    title: "AI 셀프 사진관",
    subtitle: "평소 셀카 찍듯이 거울을 보면서 찍어보세요!",
    description: "특허받은 국내 유일 기술로 거울 속에 카메라가 들어있어요. 무선 리모컨으로 원하는 순간을 포착하고, AI가 스타일링을 완성해드려요.",
    details: [
      "거울 속 카메라로 정면 응시 촬영 (국내 유일 특허)",
      "무선 리모컨으로 원하는 순간 포착",
      "AI가 의상·메이크업·헤어 자동 생성",
      "얼굴 형태와 특징은 100% 그대로 유지",
      "매달 새로운 테마 제공( 예 11월: 씨네마 에디션)"
    ],
    note: "본질은 그대로 두고 '스타일링'만 AI가 담당해요.",
    highlight: "국내 최초 AI 후보정 기술 적용"
  },
  {
    icon: Radio,
    image: boraBoxImg,
    tag: "BORA BOX",
    title: "다채널 라이브 방송",
    subtitle: "한 번의 방송을 4개 채널에 동시 송출",
    description: "노래방 부스처럼 들어가면 바로 라이브가 시작되는 독립형 방송 부스. 한 개의 카메라로 4개 채널에 동시 송출할 수 있어요.",
    details: [
      "호스트 유튜브 계정",
      "게스트(콜라보) 유튜브 계정",
      "광고주 유튜브 계정",
      "기획사/MCN 유튜브 계정"
    ],
    note: "콜라보 방송, 브랜드 협찬 라이브, 아티스트 쇼케이스 등에 최적화된 시스템",
    highlight: "행사장 설치형 독립 부스"
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-20" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#D4AF37' }} data-testid="text-services-title">
            제공 서비스
          </h2>
          <p className="text-sm text-muted-foreground">
            커피 한 잔의 여유로움으로 시작하는 특별한 경험
          </p>
        </div>

        <div className="space-y-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isReversed = index % 2 === 1;
            
            return (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  isReversed ? 'md:grid-flow-dense' : ''
                }`}
                data-testid={`service-${index}`}
              >
                <div className={isReversed ? 'md:col-start-2' : ''}>
                  <div className="aspect-[4/3] rounded-md overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      data-testid={`img-service-${index}`}
                    />
                  </div>
                </div>

                <div className={isReversed ? 'md:col-start-1 md:row-start-1' : ''}>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#D4AF37' }} data-testid={`text-service-title-${index}`}>
                    {service.title}
                  </h3>
                  
                  <p className="text-sm mb-4 text-foreground">
                    {service.subtitle}
                  </p>

                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <p className="text-xs font-semibold mb-2 text-foreground">
                      {index === 2 ? '동시 송출 예시' : '이렇게 진행돼요'}
                    </p>
                    <ul className="space-y-2">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground">
                          {idx + 1}. {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {service.note && (
                    <p className="text-xs text-muted-foreground mb-4">
                      {service.note}
                    </p>
                  )}

                  <Button 
                    size="sm"
                    style={{ backgroundColor: '#D4AF37', color: '#000' }}
                    data-testid={`button-booking-${index}`}
                    asChild
                  >
                    <a href="https://booking.naver.com/booking/12/bizes/1536339" target="_blank" rel="noopener noreferrer">
                      예약하기
                    </a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
