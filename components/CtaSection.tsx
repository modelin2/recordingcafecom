import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-24 bg-[#050508] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <Image
          src="/images/couple-cafe.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/80 to-[#050508]" />
      </div>

      {/* 골드 빛 효과 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="text-[#D4AF37] text-sm font-mono uppercase tracking-widest mb-6">— Booking</div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            오늘 예약하고<br />
            <span className="gold-text">특별한 하루</span>를
          </h2>
          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            네이버 톡톡으로 간단하게 문의하세요. 빠른 답변과 함께 원하는 날짜를 잡아드립니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://talk.naver.com/ct/wu2kkmv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#F0D060] text-black font-black px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-[#D4AF37]/20"
            >
              <MessageCircle className="w-5 h-5" />
              네이버 톡톡 예약
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="tel:010-0000-0000"
              className="inline-flex items-center justify-center gap-2 glass-dark text-white hover:text-[#D4AF37] font-bold px-8 py-4 rounded-xl text-lg transition-all"
            >
              전화 문의
            </a>
          </div>

          <p className="text-slate-500 text-sm mt-8">
            운영시간: 평일 11:00 – 22:00 · 주말 10:00 – 22:00
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
