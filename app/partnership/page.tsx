"use client";
import { useState } from "react";
import Link from "next/link";

const PARTNERS = [
  {
    name: "리버사이드 호텔",
    eng: "Riverside Hotel",
    location: "서울 강남구",
    type: "호텔",
    desc: "객실 전용 QR코드를 통한 예약 연결. 투숙객 전용 10% 할인 혜택 제공.",
    since: "2023",
    badge: "파트너",
  },
  {
    name: "라까사 호텔",
    eng: "La Casa Hotel",
    location: "서울 강남구",
    type: "호텔",
    desc: "로비·객실 광고 배너 및 전용 예약 페이지 운영. 외국인 투숙객 K-POP 체험 연결.",
    since: "2024",
    badge: "파트너",
  },
];

const BENEFITS = [
  {
    icon: "💰",
    title: "수수료 20% 지급",
    desc: "파트너사 전용 예약 페이지를 통해 발생한 모든 예약 매출의 20%를 월 정산으로 지급합니다.",
  },
  {
    icon: "📱",
    title: "전용 QR 예약 페이지",
    desc: "파트너사 전용 브랜드가 적용된 예약 페이지 및 QR코드를 무상 제공. 즉시 배포 가능.",
  },
  {
    icon: "🎯",
    title: "외국인 고객 유치",
    desc: "K-POP 관심 외국인 고객을 위한 4개국어(한·영·중·일) 예약 페이지 제공.",
  },
  {
    icon: "📊",
    title: "실시간 정산 리포트",
    desc: "파트너 전용 대시보드에서 예약 현황과 정산 내역을 실시간 확인 가능.",
  },
  {
    icon: "🤝",
    title: "브랜드 노출",
    desc: "레코딩카페 공식 홈페이지 파트너 섹션에 파트너사 로고 및 소개 게재.",
  },
  {
    icon: "🎁",
    title: "투숙객 특별 혜택",
    desc: "파트너 호텔·업체 고객에게 음료 무료 제공 등 추가 혜택 패키지 구성 가능.",
  },
];

const STEPS = [
  { num: "01", title: "파트너 신청", desc: "아래 신청 양식 작성 후 제출" },
  { num: "02", title: "담당자 검토", desc: "영업일 2일 이내 연락" },
  { num: "03", title: "협약 체결", desc: "제휴 조건 조율 및 계약 서명" },
  { num: "04", title: "전용 페이지 생성", desc: "QR코드 및 예약 페이지 즉시 발급" },
  { num: "05", title: "운영 시작", desc: "배너·홍보물 배치 후 수수료 정산 시작" },
];

export default function PartnershipPage() {
  const [form, setForm] = useState({
    company: "", name: "", phone: "", email: "", type: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <>
      {/* 히어로 */}
      <section className="relative pt-32 pb-20 bg-[#050508] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-[#A855F7]/5" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase mb-6">
            Partnership
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
            함께 성장하는<br />파트너십 프로그램
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            호텔, 여행사, 관광지, 기업 등 다양한 파트너와 함께합니다.
            전용 예약 페이지로 발생한 매출의 <span className="text-[#D4AF37] font-bold">20%</span>를 수수료로 지급합니다.
          </p>
          <a href="#apply"
            className="inline-block bg-[#D4AF37] hover:bg-[#F0D060] text-black font-black px-8 py-4 rounded-xl text-sm transition-colors">
            파트너 신청하기 →
          </a>
        </div>
      </section>

      {/* 현재 파트너 */}
      <section className="bg-[#0a0a12] py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-block bg-[#A855F7]/10 text-[#A855F7] text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
              Current Partners
            </div>
            <h2 className="text-3xl font-black text-white">현재 파트너</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PARTNERS.map((p, i) => (
              <div key={i} className="bg-[#0f0f18] rounded-2xl p-8 border border-white/5 hover:border-[#D4AF37]/30 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-black px-2.5 py-0.5 rounded-full mb-2">
                      {p.badge} · {p.type}
                    </div>
                    <h3 className="text-white font-black text-xl">{p.name}</h3>
                    <p className="text-slate-500 text-xs mt-0.5">{p.eng} · {p.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-600 text-xs">파트너십 시작</div>
                    <div className="text-white font-bold">{p.since}년</div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                <div className="mt-5 pt-5 border-t border-white/5">
                  <div className="flex items-center gap-2 text-sm text-[#D4AF37]">
                    <span className="text-lg">📱</span>
                    <span className="font-medium">전용 예약 페이지 운영 중</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 제휴 혜택 */}
      <section id="benefits" className="bg-[#050508] py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
              Benefits
            </div>
            <h2 className="text-3xl font-black text-white mb-3">파트너 혜택</h2>
            <p className="text-slate-500 text-sm">파트너사에 제공되는 모든 혜택입니다</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <div key={i} className="bg-[#0f0f18] rounded-2xl p-6 border border-white/5">
                <div className="text-3xl mb-4">{b.icon}</div>
                <h3 className="text-white font-black text-base mb-2">{b.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 진행 프로세스 */}
      <section id="qr" className="bg-[#0a0a12] py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#A855F7]/10 text-[#A855F7] text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
              How It Works
            </div>
            <h2 className="text-3xl font-black text-white mb-3">파트너십 진행 방식</h2>
            <p className="text-slate-500 text-sm">신청 후 평균 5일 이내 운영을 시작할 수 있습니다</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {STEPS.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#D4AF37] font-black text-sm">{step.num}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute translate-x-[calc(100%+1rem)] translate-y-[-2.5rem]" />
                )}
                <h3 className="text-white font-bold text-sm mb-1">{step.title}</h3>
                <p className="text-slate-500 text-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 파트너 신청 폼 */}
      <section id="apply" className="bg-[#050508] py-20 border-t border-white/5">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
              Apply
            </div>
            <h2 className="text-3xl font-black text-white mb-3">파트너 신청</h2>
            <p className="text-slate-500 text-sm">영업일 2일 이내 담당자가 연락드립니다</p>
          </div>

          {submitted ? (
            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-white font-black text-xl mb-2">신청이 완료되었습니다</h3>
              <p className="text-slate-400 text-sm">영업일 2일 이내에 담당자가 연락드리겠습니다.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs font-bold mb-2 tracking-wide">업체·호텔명 *</label>
                  <input
                    required
                    value={form.company}
                    onChange={e => setForm({...form, company: e.target.value})}
                    className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                    placeholder="예: 강남 리버사이드 호텔"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-bold mb-2 tracking-wide">업체 유형 *</label>
                  <select
                    required
                    value={form.type}
                    onChange={e => setForm({...form, type: e.target.value})}
                    className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                  >
                    <option value="">선택하세요</option>
                    <option value="hotel">호텔·숙박업소</option>
                    <option value="travel">여행사·관광지</option>
                    <option value="cafe">카페·레스토랑</option>
                    <option value="corp">기업·단체</option>
                    <option value="other">기타</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs font-bold mb-2 tracking-wide">담당자 이름 *</label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-bold mb-2 tracking-wide">연락처 *</label>
                  <input
                    required
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                    className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-bold mb-2 tracking-wide">이메일 *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                  placeholder="partner@example.com"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-bold mb-2 tracking-wide">문의 내용</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none"
                  placeholder="업체 규모, 외국인 고객 비중, 희망 제휴 방식 등 자유롭게 적어주세요"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D4AF37] hover:bg-[#F0D060] disabled:opacity-50 text-black font-black py-4 rounded-xl text-sm transition-colors"
              >
                {loading ? "제출 중..." : "파트너 신청하기"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
