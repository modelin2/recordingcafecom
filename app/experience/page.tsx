"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";

// ─── 도슨트 예약 모달 ────────────────────────────────────────────────────────
function DocentBookingModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    language: "영어",
    headcount: "2",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.date || !form.time) {
      setError("모든 필수 항목을 입력해주세요.");
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
          booking_date: form.date,
          booking_time: form.time,
          booking_path: "docent",
          drinks: `언어: ${form.language}, 인원: ${form.headcount}명`,
          mixing_option: "basic",
          video_option: "self",
          wants_album: false,
          wants_pro_album: false,
          wants_lp: false,
          total_price: 35000 * parseInt(form.headcount),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "서버 오류");
      setDone(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "서버 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0f0f18] border border-white/10 rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-black text-white">도슨트 투어 예약</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {done ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-[#7C3AED]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-[#A855F7]" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">예약 완료!</h3>
            <p className="text-slate-400 mb-6">도슨트 투어 예약이 완료되었습니다. 즐거운 체험 되세요!</p>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-[#7C3AED] to-[#DB2777] text-white font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              닫기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="text-slate-400 text-sm mb-1 block">이름 <span className="text-red-400">*</span></label>
              <input
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="이름을 입력하세요"
                className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#7C3AED]/50"
              />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-1 block">이메일 <span className="text-red-400">*</span></label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="example@email.com"
                className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#7C3AED]/50"
              />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-1 block">전화번호 <span className="text-red-400">*</span></label>
              <input
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="010-0000-0000"
                className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#7C3AED]/50"
              />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-1 block">날짜 <span className="text-red-400">*</span></label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                min={new Date().toISOString().split("T")[0]}
                className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#7C3AED]/50 [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-1 block">시간 <span className="text-red-400">*</span></label>
              <select
                value={form.time}
                onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#7C3AED]/50"
              >
                <option value="">시간 선택</option>
                {["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-1 block">언어</label>
              <select
                value={form.language}
                onChange={e => setForm(f => ({ ...f, language: e.target.value }))}
                className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#7C3AED]/50"
              >
                <option value="영어">영어 (English)</option>
                <option value="중국어">중국어 (中文)</option>
                <option value="일본어">일본어 (日本語)</option>
              </select>
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-1 block">인원수</label>
              <select
                value={form.headcount}
                onChange={e => setForm(f => ({ ...f, headcount: e.target.value }))}
                className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#7C3AED]/50"
              >
                {["1","2","3","4","5","6","7","8","9","10"].map(n => (
                  <option key={n} value={n}>{n}명</option>
                ))}
              </select>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-gradient-to-r from-[#7C3AED] to-[#DB2777] text-white font-black text-base rounded-xl disabled:opacity-50 hover:opacity-90 transition-opacity"
            >
              {submitting ? "처리 중..." : "예약 완료하기"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────
export default function ExperiencePage() {
  const [showDocentModal, setShowDocentModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {showDocentModal && <DocentBookingModal onClose={() => setShowDocentModal(false)} />}

      {/* ─── 히어로 ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0533] via-[#2d0a3e] to-[#050508]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 to-[#DB2777]/10" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[#DB2777]/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16 w-full">
          <div className="inline-flex items-center gap-2 bg-[#7C3AED]/20 border border-[#7C3AED]/40 rounded-full px-4 py-1.5 mb-6">
            <span className="text-[#A855F7] text-xs font-semibold tracking-wider uppercase">
              Experience Edition
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
            체험 <span style={{
              background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>에디션</span>
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed max-w-xl">
            K-POP 레전드 릴테이프 도슨트 투어 + 전문 녹음 체험으로 K-POP의 세계를 온몸으로 느껴보세요
          </p>
        </div>
      </section>

      {/* ─── 상품 1: K-POP 레전드 릴테이프 도슨트 투어 ─────────────────── */}
      <section className="py-24 bg-[#050508]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative rounded-3xl overflow-hidden aspect-video lg:aspect-square">
              <Image
                src="/images/control-room.png"
                alt="K-POP 레전드 릴테이프 도슨트 투어"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/50 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-[#7C3AED] to-[#DB2777] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  PRODUCT 01
                </span>
              </div>
            </div>

            <div>
              <div className="text-[#A855F7] text-sm font-mono uppercase tracking-widest mb-3">— Docent Tour</div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                K-POP 레전드<br />릴테이프 도슨트 투어
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                한국 K-POP 30년을 만들어온 레전드들의 실제 녹음 릴테이프를 직접 보고 듣는 특별한 경험
              </p>

              {/* 메타 정보 */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm">
                  <span className="text-slate-400">가격 </span>
                  <span className="text-white font-bold">₩35,000</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm">
                  <span className="text-slate-400">소요 </span>
                  <span className="text-white font-bold">50분</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm">
                  <span className="text-slate-400">언어 </span>
                  <span className="text-white font-bold">영어 · 중국어 · 일본어</span>
                </div>
              </div>

              <button
                onClick={() => setShowDocentModal(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#DB2777] text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all hover:scale-105 text-base"
              >
                도슨트 투어 예약하기 →
              </button>
            </div>
          </div>

          {/* 전시 하이라이트 */}
          <div>
            <h3 className="text-2xl font-black text-white mb-8 text-center">전시 하이라이트</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: "🎞️",
                  title: '"원 테이크의 기적"',
                  desc: "BTS, 서태지, HOT 등 레전드들이 한 번에 녹음한 명곡들의 뒷이야기",
                },
                {
                  icon: "🎚️",
                  title: '"스튜디오 마법사"',
                  desc: "프로듀서와 사운드 엔지니어가 만든 K-POP의 특별한 사운드 비밀",
                },
                {
                  icon: "📼",
                  title: '"릴테이프에서 스트리밍으로"',
                  desc: "아날로그에서 디지털로 K-POP이 진화한 30년의 역사",
                },
                {
                  icon: "🎙️",
                  title: '"지금 들려드립니다"',
                  desc: "실제 릴테이프 재생 시연으로 아날로그 사운드 직접 체험",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 border transition-all hover:border-[#7C3AED]/40 hover:-translate-y-1"
                  style={{
                    background: "rgba(124, 58, 237, 0.05)",
                    borderColor: "rgba(124, 58, 237, 0.2)",
                  }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h4 className="text-white font-bold text-sm mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 상품 2: K-POP 녹음 체험 ─────────────────────────────────── */}
      <section className="py-24 bg-[#0a0a0f] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED]/20 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[#EC4899] text-sm font-mono uppercase tracking-widest mb-3">— Recording Experience</div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                K-POP 녹음 체험
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                전문 레코딩 부스에서 K-POP 가수처럼 녹음하세요
              </p>

              {/* 메타 정보 */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm">
                  <span className="text-slate-400">가격 </span>
                  <span className="text-white font-bold">₩40,000부터</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm">
                  <span className="text-slate-400">소요 </span>
                  <span className="text-white font-bold">60분</span>
                </div>
              </div>

              {/* 포함 내용 */}
              <div className="mb-6">
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-3">포함 내용</p>
                <div className="space-y-3">
                  {[
                    "유튜브 반주로 원하는 노래 자유 녹음",
                    "기본 믹싱 (베스트 구간 편집 + 에코 효과)",
                    "녹음 파일 이메일 발송 (다음날)",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-[#A855F7] flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 추가 옵션 */}
              <div className="mb-8">
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-3">추가 옵션</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { name: "AI 보정", price: "₩20,000" },
                    { name: "촬영기사", price: "₩20,000" },
                    { name: "AI 숏폼 뮤직비디오", price: "₩100,000" },
                    { name: "앨범 발매", price: "₩200,000" },
                    { name: "LP 레코드 제작", price: "₩300,000" },
                  ].map((opt, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm">
                      <span className="text-slate-300">{opt.name}</span>
                      <span className="text-[#A855F7] font-bold">{opt.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/menu"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#DB2777] text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all hover:scale-105 text-base"
              >
                녹음 예약하기 →
              </Link>
            </div>

            <div className="relative rounded-3xl overflow-hidden aspect-video lg:aspect-square">
              <Image
                src="/images/recording-booth.png"
                alt="K-POP 녹음 체험 부스"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/50 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-[#7C3AED] to-[#DB2777] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  PRODUCT 02
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#050508] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/10 to-[#DB2777]/10" />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            K-POP의 세계를 직접 경험해보세요. 특별한 추억이 기다립니다.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setShowDocentModal(true)}
              className="bg-gradient-to-r from-[#7C3AED] to-[#DB2777] text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all hover:scale-105"
            >
              도슨트 투어 예약 →
            </button>
            <Link
              href="/menu"
              className="glass-dark text-white font-bold px-8 py-4 rounded-xl hover:text-[#A855F7] transition-colors"
            >
              녹음 예약 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
