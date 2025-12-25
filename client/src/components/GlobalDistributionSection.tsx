import { Card } from "@/components/ui/card";
import { Globe, Shield, Building2, Rocket, FileCheck, DollarSign } from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "One-Stop Service",
    description: "녹음 파일만 있다면 발매 - 유통 - 정산 - 관리가 한 곳에서 이루어집니다."
  },
  {
    icon: FileCheck,
    title: "Professional Agency",
    description: "유통사 계약, 저작권 협회 가입, 해외 정산 등 모든 복잡한 절차를 대신합니다."
  },
  {
    icon: DollarSign,
    title: "수익 극대화",
    description: "수수료 절감 및 해외 저작권료 100% 징수. 국내 최초 직접 징수 모델."
  }
];

const partnerships = [
  {
    icon: Shield,
    title: "미국 저작권 협회 공식 파트너",
    description: "ASCAP, BMI, SESAC와 직접 파트너십 체결"
  },
  {
    icon: Globe,
    title: "전 세계 200개국 징수",
    description: "미국, 유럽 등 전 세계 스트리밍 수익을 1원 단위까지 찾아냅니다"
  },
  {
    icon: Building2,
    title: "미국 현지 법인 운영",
    description: "복잡한 글로벌 이슈와 권리 문제에 실시간 대응"
  }
];

export default function GlobalDistributionSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/30" data-testid="section-global">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium mb-4" style={{ color: '#D4AF37' }}>
            Global Distribution
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            국내 유일, 유통과 저작권 관리를 동시에
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            음원 제작, 유통, 저작권 징수까지 직접 수행하는 최초의 비즈니스 모델.
            <br />
            한국에 앉아서 미국 저작권료를 받으세요.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 bg-card" data-testid={`card-feature-${index}`}>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6" style={{ color: '#D4AF37' }} />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        <div className="bg-black text-white rounded-xl p-8 md:p-12">
          <div className="text-center mb-10">
            <p className="text-sm font-medium tracking-widest mb-2" style={{ color: '#D4AF37' }}>
              GLOBAL POWER
            </p>
            <h3 className="text-2xl md:text-3xl font-bold">
              레코딩 카페는 전 세계 시장과 당신을 연결합니다
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnerships.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8" style={{ color: '#D4AF37' }} />
                  </div>
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-white/60">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
