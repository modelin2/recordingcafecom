import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { Heart, Mic, Camera, Radio } from "lucide-react";

const reasons = [
  {
    icon: Mic,
    title: "함께 부르는 커버곡",
    desc: "전문 장비로 녹음한 우리 목소리. 음원 파일로 영원히 간직할 수 있어요.",
  },
  {
    icon: Camera,
    title: "AI 특허 포토 촬영",
    desc: "거울 촬영 시스템으로 마치 아이돌처럼. 커플 프로필 사진이 달라집니다.",
  },
  {
    icon: Radio,
    title: "보라박스 라이브",
    desc: "동시에 4개 플랫폼으로 라이브 방송. 우리 커플을 세상에 알려보세요.",
  },
  {
    icon: Heart,
    title: "카페 음료 포함",
    desc: "녹음 전후로 커피와 디저트를 즐기며 여유로운 시간을. 완벽한 데이트 코스.",
  },
];

export default function CoupleDateSection() {
  return (
    <section className="py-24 bg-[#050508] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 좌측: 실제 커플 사진 */}
          <ScrollReveal animation="fade-right" duration={800}>
            <div className="relative">
              {/* 메인 이미지 */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
                <Image
                  src="/images/couple-cafe.jpg"
                  alt="레코딩카페에서 즐거운 시간을 보내는 커플"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent" />

                {/* 오버레이 배지 */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-[#D4AF37]/20">
                    <div className="text-[#D4AF37] text-xs font-semibold mb-1">BORA BOX 배경에서</div>
                    <p className="text-white font-bold">우리만의 공간에서 특별한 순간</p>
                  </div>
                </div>
              </div>

              {/* 장식 요소 */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl" />
            </div>
          </ScrollReveal>

          {/* 우측: 텍스트 */}
          <div>
            <ScrollReveal animation="fade-left" duration={700}>
              <div className="text-[#D4AF37] text-sm font-mono uppercase tracking-widest mb-4">
                — Couple Date
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
                평범한 데이트는<br />
                이제 <span className="gold-text">그만</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                영화관, 맛집, 카페... 늘 같은 코스가 지루하다면.
                레코딩카페에서 우리만의 노래를 만들고, 사진을 찍고, 라이브 방송까지.
                <strong className="text-white"> 이야깃거리가 끊이지 않는 데이트</strong>를 경험해보세요.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-4">
              {reasons.map((item, i) => (
                <ScrollReveal key={item.title} animation="fade-up" delay={i * 100} duration={600}>
                  <div className="gold-card rounded-2xl p-5 transition-all hover:scale-[1.02]">
                    <div className="w-10 h-10 bg-[#D4AF37]/15 rounded-xl flex items-center justify-center mb-3">
                      <item.icon className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-white font-bold mb-1.5 text-sm">{item.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
