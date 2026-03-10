import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Music, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-recording.jpeg"
          alt="레코딩카페 - 두 사람이 마이크 앞에서 즐겁게 노래하는 모습"
          fill
          priority
          className="object-cover object-center"
        />
        {/* 다크 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/95 via-[#050508]/70 to-[#050508]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/40" />
      </div>

      {/* 골드 빛 효과 */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#D4AF37]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* 배지 */}
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-6">
            <Music className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-semibold tracking-wider uppercase">
              이색 커플 데이트 · K-pop 체험
            </span>
          </div>

          {/* 헤드라인 */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
            우리만의<br />
            <span className="gold-text">노래</span>를<br />
            만들어봐
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
            전문 녹음 스튜디오에서 커버곡 녹음, AI 포토 촬영, 라이브 방송까지.
            평범한 데이트는 그만, <strong className="text-white">레코딩카페</strong>에서 잊지 못할 추억을 만드세요.
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="https://talk.naver.com/ct/wu2kkmv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#F0D060] text-black font-bold px-7 py-3.5 rounded-xl transition-all hover:scale-105 text-base"
            >
              지금 예약하기
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 glass-dark text-white hover:text-[#D4AF37] font-medium px-7 py-3.5 rounded-xl transition-all text-base"
            >
              서비스 보기
            </Link>
          </div>

          {/* 신뢰 지표 */}
          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
              <span>10년+ 엔터테인먼트 경력</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
              <span>특허 보유 AI 촬영 시스템</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
              <span>음원 저작권 등록 가능</span>
            </div>
          </div>
        </div>
      </div>

      {/* 스크롤 힌트 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs animate-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#D4AF37]/60" />
        <span>스크롤</span>
      </div>
    </section>
  );
}
