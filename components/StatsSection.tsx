import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { value: "10+", label: "년 엔터테인먼트 경력", sub: "K-pop 아티스트 50+ 배출" },
  { value: "4", label: "플랫폼 동시 라이브", sub: "유튜브·인스타·틱톡·Douyin" },
  { value: "3", label: "국가 프랜차이즈", sub: "글로벌 확장 중" },
  { value: "100%", label: "당일 파일 제공", sub: "MP3/WAV 즉시 수령" },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-[#050508] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      {/* 배경 이미지 (어둡게) */}
      <div className="absolute inset-0">
        <Image
          src="/images/studio-dark.png"
          alt=""
          fill
          className="object-cover object-center opacity-10"
        />
        <div className="absolute inset-0 bg-[#050508]/80" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="text-center mb-12">
            <div className="text-[#D4AF37] text-sm font-mono uppercase tracking-widest mb-4">— Numbers</div>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              숫자로 보는 <span className="gold-text">레코딩카페</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} animation="zoom-in" delay={i * 100} duration={650}>
              <div className="gold-card rounded-2xl p-6 text-center">
                <div className="text-4xl sm:text-5xl font-black gold-text mb-2">{stat.value}</div>
                <div className="text-white font-semibold text-sm mb-1">{stat.label}</div>
                <div className="text-slate-500 text-xs">{stat.sub}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
