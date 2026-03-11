"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Check, ChevronDown, ChevronUp } from "lucide-react";

const EXHIBITS = [
  {
    num: "01",
    title: "원 테이크의 기적",
    en: "The One-Take Miracle",
    desc: "서태지와 아이들, H.O.T, 젝스키스 — 1990년대 K-POP을 탄생시킨 레전드들이 단 한 번의 녹음으로 완성한 명곡들의 실제 릴테이프. 그 순간의 긴장과 완벽함이 테이프 위에 새겨져 있습니다.",
    detail: "오리지널 릴테이프 실물 관람 · 해설 포함 · 일부 구간 재생 시연",
    color: "from-[#1a0533] to-[#0a0a0f]",
    accent: "#A855F7",
  },
  {
    num: "02",
    title: "스튜디오의 마법사들",
    en: "The Studio Wizards",
    desc: "이수만, 박진영, 방시혁이 세계를 정복하기 훨씬 전, 이 스튜디오에서 수십 번의 시도 끝에 탄생한 히트곡의 비밀. 프로듀서와 사운드 엔지니어가 만들어낸 K-POP 특유의 사운드 시그니처.",
    detail: "프로듀서 작업 노트 · 믹싱 보드 시연 · 비하인드 스토리",
    color: "from-[#0a1a00] to-[#0a0a0f]",
    accent: "#22C55E",
  },
  {
    num: "03",
    title: "릴테이프에서 스트리밍으로",
    en: "From Reel to Streaming",
    desc: "1990년대 두꺼운 릴테이프로 시작해 2020년대 AI 마스터링까지. K-POP이 30년간 걸어온 기술 혁신의 여정. 아날로그의 따뜻함이 디지털의 완벽함을 만난 그 교차점.",
    detail: "연대기 전시 · 장비 변천사 · 실제 음질 비교 청음",
    color: "from-[#001a1a] to-[#0a0a0f]",
    accent: "#06B6D4",
  },
  {
    num: "04",
    title: "지금 이 순간, 들려드립니다",
    en: "Listen Now",
    desc: "전시의 마지막은 실제 청음 체험. 디지털로 복원된 레전드들의 보컬 원본을 전문 모니터 스피커로 직접 들어보세요. 유튜브에서는 결코 들을 수 없는 진짜 스튜디오 사운드.",
    detail: "전문 모니터 스피커 청음 · 원본 보컬 트랙 공개 · 도슨트 해설 동반",
    color: "from-[#1a1000] to-[#0a0a0f]",
    accent: "#D4AF37",
  },
];

const TOURS = [
  { time: "10:30", lang: "🇺🇸 English", available: true },
  { time: "12:00", lang: "🇨🇳 中文",    available: true },
  { time: "14:00", lang: "🇺🇸 English", available: true },
  { time: "15:30", lang: "🇯🇵 日本語",  available: true },
  { time: "17:00", lang: "🇺🇸 English", available: true },
  { time: "18:30", lang: "🇨🇳 中文",    available: false },
  { time: "19:30", lang: "🇯🇵 日本語",  available: true },
];

function BookingModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", time: "", language: "영어", headcount: "2" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time) { setError("필수 항목을 모두 입력해주세요."); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email, phone: form.phone,
          booking_date: form.date, booking_time: form.time,
          drinks: `언어: ${form.language}, 인원: ${form.headcount}명`,
          booking_path: "docent", total_price: 35000,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setDone(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "오류가 발생했습니다.");
    } finally { setSubmitting(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050508]/90 backdrop-blur-sm p-4">
      <div className="bg-[#0f0f18] border border-white/10 rounded-2xl w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A855F7] to-[#DB2777]" />
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-[#A855F7] text-[10px] tracking-[0.2em] uppercase mb-1">Ticket Booking</div>
              <h3 className="text-white font-black text-lg">도슨트 투어 예약</h3>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
          </div>

          {done ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎟️</div>
              <h4 className="text-white font-bold text-lg mb-2">예약 완료!</h4>
              <p className="text-slate-400 text-sm">담당자가 확인 후 연락드립니다.</p>
              <button onClick={onClose} className="mt-6 border border-[#A855F7] text-[#A855F7] px-6 py-2 text-sm font-bold hover:bg-[#A855F7] hover:text-white transition-all">닫기</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-500 text-xs mb-1 block">이름 *</label>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="홍길동"
                    className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#A855F7]/50" />
                </div>
                <div>
                  <label className="text-slate-500 text-xs mb-1 block">전화번호 *</label>
                  <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="010-0000-0000"
                    className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#A855F7]/50" />
                </div>
              </div>
              <div>
                <label className="text-slate-500 text-xs mb-1 block">이메일</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="example@email.com"
                  className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#A855F7]/50" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-500 text-xs mb-1 block">날짜 *</label>
                  <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#A855F7]/50" />
                </div>
                <div>
                  <label className="text-slate-500 text-xs mb-1 block">시간 *</label>
                  <select value={form.time} onChange={e => setForm({...form, time: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#A855F7]/50">
                    <option value="">선택</option>
                    {TOURS.filter(t => t.available).map(t => (
                      <option key={t.time} value={t.time}>{t.time}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-500 text-xs mb-1 block">해설 언어</label>
                  <select value={form.language} onChange={e => setForm({...form, language: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#A855F7]/50">
                    <option>영어</option>
                    <option>중국어</option>
                    <option>일본어</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-500 text-xs mb-1 block">인원수</label>
                  <select value={form.headcount} onChange={e => setForm({...form, headcount: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#A855F7]/50">
                    {["1","2","3","4","5","6+"].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
              </div>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <div className="pt-2 border-t border-white/5">
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-slate-400">입장료</span>
                  <span className="text-[#D4AF37] font-bold">₩35,000 / 인</span>
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full bg-gradient-to-r from-[#A855F7] to-[#DB2777] text-white font-black py-3.5 tracking-widest uppercase text-sm disabled:opacity-40 hover:opacity-90 transition-opacity">
                  {submitting ? "처리 중..." : "🎟️ 입장권 예약"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DocentPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const FAQS = [
    { q: "투어는 몇 명까지 참가할 수 있나요?", a: "1회 투어당 최대 8명까지 참가 가능합니다. 단체(10명 이상)는 별도 문의해주세요." },
    { q: "사진 촬영이 가능한가요?", a: "일부 전시물은 사진 촬영이 제한됩니다. 도슨트 안내에 따라 지정된 구역에서 촬영 가능합니다." },
    { q: "아이들도 참가할 수 있나요?", a: "만 10세 이상부터 참가 가능합니다. 보호자 동반을 권장합니다." },
    { q: "투어 소요 시간은 얼마나 되나요?", a: "전시 관람 50분 + 도슨트 해설 포함 약 60분이 소요됩니다." },
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {modalOpen && <BookingModal onClose={() => setModalOpen(false)} />}

      {/* 헤더 네비 */}
      <div className="pt-16" />

      {/* ── 히어로 ── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/control-room.png" alt="도슨트 투어" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/70 to-[#050508]/20" />
        </div>
        {/* 상단 경로 */}
        <div className="absolute top-6 left-0 right-0 px-6 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#D4AF37] transition-colors">홈</Link>
          <span>/</span>
          <Link href="/experience" className="hover:text-[#D4AF37] transition-colors">체험 에디션</Link>
          <span>/</span>
          <span className="text-slate-300">도슨트 프로그램</span>
        </div>
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <div className="inline-block border border-[#A855F7]/50 text-[#A855F7] text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1.5 mb-6">
            Wing A · Special Exhibition
          </div>
          <h1 className="text-5xl sm:text-7xl font-black leading-none mb-4">
            K-POP 레전드<br />
            <span className="text-[#A855F7]">릴테이프</span><br />
            도슨트 투어
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mt-4 mb-8 leading-relaxed">
            한국 K-POP 30년의 역사를 만들어온 레전드들의<br />
            실제 녹음 릴테이프를 전문 도슨트와 함께 관람합니다.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => setModalOpen(true)}
              className="border border-[#A855F7] bg-[#A855F7]/10 hover:bg-[#A855F7] text-white font-black px-8 py-4 tracking-widest uppercase text-sm transition-all">
              🎟️ 입장권 예약
            </button>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span>🕐 50분 소요</span>
              <span>💰 ₩35,000/인</span>
              <span>🌐 EN · 中文 · 日本語</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 전시 소개 ── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">Exhibition Overview</div>
              <h2 className="text-3xl font-black text-white mb-6 leading-tight">이 전시에 대하여</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                녹음실 안에서만 존재하던 K-POP의 비밀이 처음으로 공개됩니다.
                레전드들이 실제로 사용했던 릴테이프 원본을 직접 보고, 듣고, 그 뒷이야기를 전문 도슨트에게 들을 수 있는 유일한 기회입니다.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-3 gap-6">
              {[
                { icon: "🎞️", label: "원본 릴테이프", value: "30+", desc: "레전드 아티스트" },
                { icon: "🕐", label: "전시 시간", value: "50분", desc: "도슨트 동반" },
                { icon: "🌐", label: "해설 언어", value: "3개국어", desc: "EN · 中文 · 日本語" },
              ].map((s, i) => (
                <div key={i} className="border border-white/10 p-6">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <div className="text-slate-500 text-[10px] tracking-widest uppercase mb-1">{s.label}</div>
                  <div className="text-white font-black text-2xl mb-1">{s.value}</div>
                  <div className="text-slate-500 text-xs">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 전시 섹션 목록 */}
          <div className="space-y-px bg-white/5">
            {EXHIBITS.map((ex, i) => (
              <div key={i} className={`bg-[#050508] hover:bg-[#0a0a0f] transition-colors p-8 group`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-1">
                    <span className="text-4xl font-black" style={{ color: ex.accent, opacity: 0.4 }}>{ex.num}</span>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="text-[10px] tracking-[0.2em] uppercase mb-2 font-bold" style={{ color: ex.accent }}>{ex.en}</div>
                    <h3 className="text-white font-black text-2xl mb-3">{ex.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{ex.desc}</p>
                  </div>
                  <div className="lg:col-span-4">
                    <div className="border border-white/10 p-4 text-xs text-slate-500 leading-relaxed">
                      <div className="text-[10px] tracking-widest uppercase mb-2 font-bold" style={{ color: ex.accent }}>포함 내용</div>
                      {ex.detail}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 투어 스케줄 ── */}
      <section className="py-24 bg-[#0a0a0f] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">Daily Schedule</div>
              <h2 className="text-3xl font-black text-white mb-2">오늘의 투어 일정</h2>
              <p className="text-slate-500 text-sm mb-8">매일 운영 · 사전 예약 필수 (당일 취소 불가)</p>
              <div className="space-y-2">
                {TOURS.map((tour, i) => (
                  <div key={i} className={`flex items-center justify-between px-5 py-4 border transition-all ${
                    tour.available ? "border-white/10 hover:border-[#A855F7]/30" : "border-white/5 opacity-40"
                  }`}>
                    <div className="flex items-center gap-5">
                      <span className="text-white font-black text-lg w-12">{tour.time}</span>
                      <span className="text-sm text-slate-400">{tour.lang}</span>
                    </div>
                    {tour.available ? (
                      <button onClick={() => setModalOpen(true)}
                        className="text-[10px] text-[#A855F7] border border-[#A855F7]/40 px-3 py-1.5 tracking-widest uppercase hover:bg-[#A855F7] hover:text-white transition-all font-bold">
                        예약
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-600 tracking-widest uppercase">마감</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">Admission</div>
              <h2 className="text-3xl font-black text-white mb-8">입장 안내</h2>
              <div className="space-y-4 mb-10">
                {[
                  { label: "일반 입장", price: "₩35,000", desc: "성인 1인" },
                  { label: "단체 (10인+)", price: "₩28,000", desc: "10명 이상 그룹" },
                  { label: "녹음 체험 콤보", price: "₩65,000", desc: "도슨트 투어 + 녹음 체험" },
                ].map((tier, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-4 border border-white/10">
                    <div>
                      <div className="text-white font-bold text-sm">{tier.label}</div>
                      <div className="text-slate-500 text-xs">{tier.desc}</div>
                    </div>
                    <div className="text-[#D4AF37] font-black text-lg">{tier.price}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setModalOpen(true)}
                className="w-full border border-[#A855F7] bg-[#A855F7]/10 hover:bg-[#A855F7] text-white font-black py-4 tracking-widest uppercase text-sm transition-all">
                🎟️ 입장권 예약하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-4 font-bold text-center">FAQ</div>
          <h2 className="text-3xl font-black text-white mb-10 text-center">관람 안내</h2>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-white/10">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left">
                  <span className="text-white text-sm font-medium">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-[#A855F7]" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 하단 CTA ── */}
      <section className="py-16 bg-[#0a0a0f] border-t border-white/5 text-center px-4">
        <p className="text-slate-500 text-xs tracking-widest uppercase mb-4">Also Available</p>
        <h3 className="text-white font-black text-2xl mb-6">녹음 체험과 함께하면 더 특별합니다</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/experience"
            className="border border-[#A855F7] text-[#A855F7] hover:bg-[#A855F7] hover:text-white px-8 py-3 font-bold tracking-widest uppercase text-sm transition-all">
            녹음 체험 보기 →
          </Link>
          <Link href="/"
            className="text-slate-500 hover:text-white text-sm tracking-widest uppercase transition-colors">
            ← 홈으로
          </Link>
        </div>
      </section>
    </div>
  );
}
