import ScrollReveal from "./ScrollReveal";
import { Phone, MapPin, Mic, Download } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "예약 문의",
    desc: "네이버 톡톡으로 간단히 문의. 원하는 날짜와 서비스를 알려주시면 바로 확인해드립니다.",
  },
  {
    number: "02",
    icon: MapPin,
    title: "방문",
    desc: "홍대 근처 레코딩카페로 오세요. 카페에서 음료를 즐기며 긴장을 풀고 시작합니다.",
  },
  {
    number: "03",
    icon: Mic,
    title: "녹음 & 체험",
    desc: "전문 스태프가 안내하는 대로 녹음, 촬영, 방송 중 원하는 서비스를 즐깁니다.",
  },
  {
    number: "04",
    icon: Download,
    title: "파일 수령",
    desc: "완성된 음원 파일과 사진을 바로 받아가세요. 당일 완성이 기본입니다.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="howto" className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="text-center mb-16">
            <div className="text-[#D4AF37] text-sm font-mono uppercase tracking-widest mb-4">— How It Works</div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              4단계로 <span className="gold-text">완성</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-md mx-auto">
              복잡한 것 없이 간단하게. 처음이어도 괜찮아요.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} animation="fade-up" delay={i * 120} duration={650}>
              <div className="relative gold-card rounded-2xl p-6 h-full">
                {/* 번호 */}
                <div className="text-5xl font-black text-[#D4AF37]/15 mb-4 leading-none">{step.number}</div>

                {/* 아이콘 */}
                <div className="w-11 h-11 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-[#D4AF37]" />
                </div>

                <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>

                {/* 연결선 (마지막 제외) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-[#D4AF37]/30" />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
