"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

const SERVICES = [
  { emoji: "🎼", title: "KOMCA 전속 작곡가 1:1 매칭", desc: "한국음악저작권협회(KOMCA) 소속 최고의 전문 작곡가를 직접 선택하여 1:1로 매칭해드립니다. 당신이 원하는 스타일과 장르에 맞는 최적의 파트너를 연결합니다." },
  { emoji: "🎹", title: "레퍼런스 기반 완전 맞춤 편곡·작사", desc: "고객이 제공하는 레퍼런스 곡을 바탕으로 원하는 스타일과 분위기를 완벽하게 반영한 편곡과 작사를 제공합니다. 최대 2회 수정 가능." },
  { emoji: "🎙️", title: "전문 스튜디오 레코딩 (최대 5회 수정)", desc: "메이저 음반사와 동일한 환경의 전문 스튜디오에서 레코딩을 진행합니다. 최대 5회 수정 세션을 통해 완벽한 결과물을 만들어냅니다." },
  { emoji: "🎚️", title: "전문 믹싱 & 마스터링", desc: "K-POP 메이저 음반사에서 작업한 경력의 전문 엔지니어가 직접 믹싱과 마스터링을 담당합니다. 글로벌 스트리밍 플랫폼 기준에 최적화된 사운드로 완성합니다." },
  { emoji: "🖼️", title: "앨범 커버 아트워크 디자인", desc: "K-POP 스타일의 세련된 앨범 커버를 전문 디자이너가 제작합니다. 스트리밍 플랫폼에서 돋보이는 비주얼 아이덴티티를 만들어드립니다." },
  { emoji: "🌍", title: "전 세계 음원 스트리밍 정식 발매", desc: "Spotify, Apple Music, YouTube Music, MelOn, Genie 등 전 세계 150개 이상의 음원 스트리밍 플랫폼에 정식 발매합니다. 미국 저작권 관리 단체와의 파트너십을 통해 글로벌 유통을 지원합니다." },
  { emoji: "💰", title: "영구 저작권료 수익 등록", desc: "발매된 음원에서 발생하는 스트리밍 수익을 고객이 평생 받을 수 있도록 저작권 등록을 완료합니다. 저작권 유효 기간인 사후 70년까지 수익이 보장됩니다." },
];

const TIMELINE = [
  { week: "1-2주차", title: "작곡가 매칭 & 컨셉 기획", desc: "KOMCA 작곡가 선정, 방향성 협의, 레퍼런스 수집" },
  { week: "3-5주차", title: "편곡 & 작사", desc: "맞춤 편곡 제작, 작사, 고객 피드백 반영 (최대 2회 수정)" },
  { week: "6-8주차", title: "전문 스튜디오 레코딩", desc: "세션 녹음 진행, 최대 5회 수정 세션" },
  { week: "9-10주차", title: "믹싱 & 마스터링", desc: "전문 엔지니어 믹싱, 글로벌 플랫폼 기준 마스터링" },
  { week: "11주차", title: "앨범 아트 & 메타데이터", desc: "앨범 커버 디자인, 발매 준비, 저작권 등록" },
  { week: "12주차", title: "전 세계 동시 발매 🎉", desc: "150개+ 스트리밍 플랫폼 글로벌 동시 발매" },
];

const TIERS = [
  {
    name: "스탠다드",
    nameEn: "Standard",
    price: "₩15,000,000~",
    desc: "싱글 1곡",
    features: ["KOMCA 작곡가 1:1 매칭", "맞춤 편곡·작사", "전문 레코딩 (3회 수정)", "믹싱 & 마스터링", "앨범 커버 디자인", "전 세계 발매", "저작권료 등록"],
    highlight: false,
  },
  {
    name: "프리미엄",
    nameEn: "Premium",
    price: "₩25,000,000~",
    desc: "EP 3곡",
    features: ["스탠다드 전체 포함", "레코딩 5회 수정", "편곡 수정 2회", "뮤직비디오 제작 (1분)", "홍보용 숏폼 콘텐츠 3개", "SNS 마케팅 플랜", "프로모션 지원"],
    highlight: true,
  },
  {
    name: "엔터프라이즈",
    nameEn: "Enterprise",
    price: "별도 협의",
    desc: "정규 앨범",
    features: ["프리미엄 전체 포함", "정규 앨범 (7곡+)", "전속 작곡팀 배정", "글로벌 프로모션", "음반사 피칭 지원", "매니지먼트 연계", "1년 사후 관리"],
    highlight: false,
  },
];

export default function ProPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", budget: "standard", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setError("이름, 이메일, 전화번호는 필수입니다.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          booking_path: "pro",
          platform: form.budget,
          drinks: form.message,
          total_price: 0,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDone(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "서버 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const FAQS = [
    { q: "KOMCA 작곡가는 어떻게 선택하나요?", a: "저희가 제공하는 작곡가 포트폴리오에서 원하는 스타일의 작곡가를 직접 선택하실 수 있습니다. 상담을 통해 최적의 매칭을 도와드립니다." },
    { q: "음원 수익은 어떻게 정산되나요?", a: "발매된 음원에서 발생하는 스트리밍 수익의 100%가 고객 명의로 등록됩니다. 분기별로 각 플랫폼에서 직접 정산받으실 수 있습니다." },
    { q: "저작권은 누구에게 귀속되나요?", a: "음원 제작 후 모든 저작인접권(실연권, 음반제작자권)은 고객에게 귀속됩니다. 작사·작곡 저작권은 별도 계약으로 고객 명의 이전이 가능합니다." },
    { q: "해외에서도 수익을 받을 수 있나요?", a: "미국 저작권 관리 단체와의 파트너십을 통해 전 세계 150개+ 국가에서 발생하는 수익을 수취할 수 있도록 지원합니다." },
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* 네비게이션 */}
      <div className="sticky top-0 z-40 bg-[#050508]/95 backdrop-blur border-b border-[#D4AF37]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-[#D4AF37] transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> 홈으로
          </Link>
          <span className="text-slate-700">/</span>
          <span className="text-[#D4AF37] text-sm font-bold">프로 에디션</span>
        </div>
      </div>

      {/* 히어로 */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1200] via-[#050508] to-[#050508]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#92400E]/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-5 py-2 mb-6">
            <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">🎵 Pro Edition</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            당신의 음악을<br />
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#F0D060] bg-clip-text text-transparent">K-POP 아티스트</span>와<br />
            동일한 방식으로
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-4">
            세상에 내보내세요
          </p>
          <p className="text-slate-400 text-base max-w-2xl mx-auto mb-10">
            한국음악저작권협회(KOMCA) 소속 최고의 작곡가를 직접 선택하고,<br className="hidden sm:block" />
            K-POP 메이저 음반사와 동일한 프로세스로 음반을 제작·발매합니다.
          </p>
          <a
            href="#inquiry"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#F0D060] text-black font-black px-8 py-4 rounded-xl hover:opacity-90 transition-all hover:scale-105 text-base"
          >
            지금 문의하기 →
          </a>
        </div>
      </section>

      {/* 포함 서비스 */}
      <section className="py-24 px-4 bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[#D4AF37] text-sm font-mono uppercase tracking-widest mb-3">— What&apos;s Included</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">모든 것이 포함됩니다</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-[#0f0f18] border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 rounded-2xl p-6 transition-all">
                <div className="text-4xl mb-4">{s.emoji}</div>
                <h3 className="text-white font-bold text-base mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12주 타임라인 */}
      <section className="py-24 px-4 bg-[#050508]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[#D4AF37] text-sm font-mono uppercase tracking-widest mb-3">— Production Timeline</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">12주 제작 프로세스</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4AF37]/60 via-[#D4AF37]/30 to-transparent" />
            <div className="space-y-8">
              {TIMELINE.map((t, i) => (
                <div key={i} className="flex gap-6 relative">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#92400E] flex items-center justify-center text-black font-black text-sm">
                      {i + 1}
                    </div>
                  </div>
                  <div className="pb-4">
                    <div className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-1">{t.week}</div>
                    <h3 className="text-white font-bold text-lg mb-1">{t.title}</h3>
                    <p className="text-slate-400 text-sm">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 가격 티어 */}
      <section className="py-24 px-4 bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[#D4AF37] text-sm font-mono uppercase tracking-widest mb-3">— Pricing</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">패키지 선택</h2>
            <p className="text-slate-400 mt-3">모든 패키지는 전 세계 발매 및 영구 저작권료가 포함됩니다</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {TIERS.map((tier, i) => (
              <div key={i} className={`relative rounded-3xl p-8 border transition-all ${
                tier.highlight
                  ? "border-[#D4AF37] bg-gradient-to-b from-[#D4AF37]/10 to-[#0f0f18]"
                  : "border-white/10 bg-[#0f0f18]"
              }`}>
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black text-xs font-black px-4 py-1.5 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="text-slate-400 text-sm mb-1">{tier.nameEn}</div>
                <h3 className="text-white font-black text-2xl mb-1">{tier.name}</h3>
                <div className="text-[#D4AF37] font-black text-3xl mb-1">{tier.price}</div>
                <div className="text-slate-500 text-sm mb-6">{tier.desc}</div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#inquiry"
                  className={`block w-full text-center py-3 rounded-xl font-bold transition-all ${
                    tier.highlight
                      ? "bg-[#D4AF37] text-black hover:bg-[#F0D060]"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {tier.name === "엔터프라이즈" ? "별도 협의 문의" : "문의하기"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-[#050508]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[#D4AF37] text-sm font-mono uppercase tracking-widest mb-3">— FAQ</div>
            <h2 className="text-3xl font-black text-white">자주 묻는 질문</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-[#0f0f18] border border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-white font-medium text-sm sm:text-base">{faq.q}</span>
                  {faqOpen === i ? <ChevronUp className="w-5 h-5 text-[#D4AF37] flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />}
                </button>
                {faqOpen === i && (
                  <div className="px-6 pb-5">
                    <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 문의 폼 */}
      <section id="inquiry" className="py-24 px-4 bg-[#0a0a0f]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[#D4AF37] text-sm font-mono uppercase tracking-widest mb-3">— Get Started</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">지금 문의하세요</h2>
            <p className="text-slate-400">24시간 이내에 전문 상담사가 연락드립니다</p>
          </div>

          {/* 빠른 연락 */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a
              href="https://talk.naver.com/ct/wu2kkmv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-3 bg-[#03C75A] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all"
            >
              <span className="text-xl">💬</span> 네이버 상담 문의
            </a>
            <a
              href="https://wa.me/821087395291"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all"
            >
              <span className="text-xl">📱</span> WhatsApp 문의
            </a>
          </div>

          <div className="text-center text-slate-500 text-sm mb-8">— 또는 아래 양식으로 문의하세요 —</div>

          {done ? (
            <div className="text-center py-12 bg-[#0f0f18] rounded-2xl border border-[#D4AF37]/20">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-white font-bold text-xl mb-2">문의가 접수되었습니다!</h3>
              <p className="text-slate-400">24시간 이내에 전문 상담사가 연락드립니다.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">이름 <span className="text-red-400">*</span></label>
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="홍길동"
                    className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#D4AF37]/50"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-sm mb-1 block">전화번호 <span className="text-red-400">*</span></label>
                  <input
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="010-0000-0000"
                    className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#D4AF37]/50"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">이메일 <span className="text-red-400">*</span></label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="example@email.com"
                  className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">관심 패키지</label>
                <select
                  value={form.budget}
                  onChange={e => setForm({ ...form, budget: e.target.value })}
                  className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
                >
                  <option value="standard">스탠다드 (₩15,000,000~, 싱글 1곡)</option>
                  <option value="premium">프리미엄 (₩25,000,000~, EP 3곡)</option>
                  <option value="enterprise">엔터프라이즈 (정규 앨범, 별도 협의)</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">문의 내용</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="원하시는 음악 스타일, 참고 곡, 또는 기타 문의사항을 자유롭게 작성해주세요."
                  rows={4}
                  className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#D4AF37]/50 resize-none"
                />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#F0D060] text-black font-black text-lg rounded-xl hover:opacity-90 transition-all disabled:opacity-40"
              >
                {submitting ? "전송 중..." : "문의 보내기 →"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 하단 네비 */}
      <div className="py-8 px-4 border-t border-white/5 text-center">
        <Link href="/experience" className="text-[#A855F7] hover:text-[#DB2777] text-sm font-medium transition-colors">
          ← 체험 에디션 보러가기
        </Link>
      </div>
    </div>
  );
}
