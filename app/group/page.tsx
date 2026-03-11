"use client";
import { useState } from "react";
import Link from "next/link";

const PACKAGES = [
  {
    icon: "🏫",
    name: "학교·교육 단체",
    min: "10인",
    price: "₩28,000",
    unit: "1인",
    color: "#A855F7",
    features: [
      "K-POP 녹음 체험 1회 (30분)",
      "릴테이프 도슨트 투어 포함",
      "교육용 K-POP 산업 자료 제공",
      "단체 기념 사진 촬영",
      "음원 파일 개인 제공",
      "학교 공문 요청 처리 가능",
    ],
    target: "초·중·고등학교 / 대학교 동아리 / 음악 교육 기관",
    badge: "교육 할인",
  },
  {
    icon: "🌏",
    name: "해외 단체 투어",
    min: "8인",
    price: "₩38,000",
    unit: "1인",
    color: "#D4AF37",
    features: [
      "K-POP 녹음 체험 1회 (45분)",
      "4개국어 도슨트 투어 (한·영·중·일)",
      "K-POP 역사 전시관 관람",
      "AI 포토 부스 체험",
      "음원 파일 + 앨범 재킷 사진",
      "기념 굿즈 증정",
    ],
    target: "해외 여행객 그룹 / K-POP 팬 투어 / 여행사 단체",
    badge: "외국인 패키지",
  },
  {
    icon: "🏢",
    name: "기업·임직원 연수",
    min: "15인",
    price: "₩35,000",
    unit: "1인",
    color: "#22c55e",
    features: [
      "프로그램 맞춤 기획 (협의)",
      "팀빌딩용 단체 녹음 세션",
      "전담 스태프 배치",
      "행사 전용 공간 대관",
      "케이터링 패키지 옵션",
      "법인 세금계산서 발행",
    ],
    target: "기업 팀빌딩 / 워크숍 / VIP 행사 / 가족 행사",
    badge: "법인 가능",
  },
  {
    icon: "🎤",
    name: "K-POP 꿈나무 캠프",
    min: "6인",
    price: "₩45,000",
    unit: "1인",
    color: "#f97316",
    features: [
      "전문 보컬 트레이너 1회 레슨",
      "실제 K-POP 스타 녹음 방식 체험",
      "퍼포먼스 영상 촬영·제공",
      "KOMCA 등록 작곡가 멘토링",
      "개인 녹음 파일(WAV)",
      "수료증 발급",
    ],
    target: "보컬 지망생 / 청소년 음악 캠프 / K-POP 연습생 준비",
    badge: "프리미엄",
  },
];

export default function GroupPage() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", org: "", count: "", date: "", package: "", message: "",
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#A855F7]/5 via-transparent to-[#D4AF37]/5" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="inline-block bg-[#A855F7]/10 text-[#A855F7] text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase mb-6">
            Group Visit
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
            단체 관람 &<br />단체 체험 프로그램
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            학교 현장학습부터 해외 K-POP 투어까지. 10인 이상 단체는 특별 할인과 맞춤 프로그램을 제공합니다.
          </p>
          <a href="#apply"
            className="inline-block bg-[#A855F7] hover:bg-[#9333ea] text-white font-black px-8 py-4 rounded-xl text-sm transition-colors">
            단체 예약 문의하기 →
          </a>
        </div>
      </section>

      {/* 단체 패키지 */}
      <section className="bg-[#0a0a12] py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
              Packages
            </div>
            <h2 className="text-3xl font-black text-white mb-3">단체 패키지</h2>
            <p className="text-slate-500 text-sm">단체 규모와 목적에 맞게 선택하세요. 맞춤 구성도 가능합니다.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PACKAGES.map((pkg, i) => (
              <div key={i} className="bg-[#0f0f18] rounded-2xl p-7 border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{pkg.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-black text-lg">{pkg.name}</h3>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                          style={{ background: `${pkg.color}20`, color: pkg.color }}>
                          {pkg.badge}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs">{pkg.target}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <div className="text-white font-black text-2xl" style={{ color: pkg.color }}>{pkg.price}</div>
                    <div className="text-slate-500 text-xs">/{pkg.unit} · {pkg.min}~</div>
                  </div>
                </div>
                <ul className="space-y-2 mb-5">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="flex-shrink-0 mt-0.5" style={{ color: pkg.color }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#apply"
                  className="block w-full text-center border font-bold py-2.5 rounded-xl text-sm transition-all hover:opacity-80"
                  style={{ borderColor: `${pkg.color}50`, color: pkg.color }}>
                  이 패키지로 문의하기
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 안내 */}
      <section className="bg-[#050508] py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: "📋", title: "예약 절차", items: ["단체 예약 신청서 작성", "담당자 확인 후 연락 (2일 이내)", "일정 조율 및 확정", "방문 당일 단체 입장"] },
              { icon: "⚠️", title: "주의 사항", items: ["최소 7일 전 예약 필수", "취소: 3일 전까지 전액 환불", "당일 취소 시 환불 불가", "인원 변경은 3일 전 연락"] },
              { icon: "🎁", title: "추가 혜택", items: ["30인 이상 기념 굿즈 증정", "학교단체 세금계산서 발행", "여행사 파트너십 수수료 별도", "맞춤 프로그램 기획 가능"] },
            ].map((section, i) => (
              <div key={i} className="bg-[#0f0f18] rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{section.icon}</span>
                  <h3 className="text-white font-black">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="text-slate-400 text-sm flex items-start gap-2">
                      <span className="text-[#D4AF37] flex-shrink-0">·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 단체 예약 신청 폼 */}
      <section id="apply" className="bg-[#0a0a12] py-20 border-t border-white/5">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-block bg-[#A855F7]/10 text-[#A855F7] text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
              Apply
            </div>
            <h2 className="text-3xl font-black text-white mb-3">단체 예약 신청</h2>
            <p className="text-slate-500 text-sm">영업일 2일 이내 담당자가 연락드립니다</p>
          </div>

          {submitted ? (
            <div className="bg-[#A855F7]/10 border border-[#A855F7]/30 rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-white font-black text-xl mb-2">신청이 완료되었습니다</h3>
              <p className="text-slate-400 text-sm">영업일 2일 이내에 담당자가 연락드리겠습니다.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs font-bold mb-2 tracking-wide">기관·단체명 *</label>
                  <input required value={form.org} onChange={e => setForm({...form, org: e.target.value})}
                    className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#A855F7]/50"
                    placeholder="예: OO중학교 / OO여행사" />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-bold mb-2 tracking-wide">희망 패키지 *</label>
                  <select required value={form.package} onChange={e => setForm({...form, package: e.target.value})}
                    className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#A855F7]/50">
                    <option value="">선택하세요</option>
                    <option value="school">학교·교육 단체</option>
                    <option value="overseas">해외 단체 투어</option>
                    <option value="corp">기업·임직원 연수</option>
                    <option value="camp">K-POP 꿈나무 캠프</option>
                    <option value="custom">맞춤 프로그램 (협의)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs font-bold mb-2 tracking-wide">담당자 이름 *</label>
                  <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#A855F7]/50"
                    placeholder="홍길동" />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-bold mb-2 tracking-wide">연락처 *</label>
                  <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                    className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#A855F7]/50"
                    placeholder="010-0000-0000" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs font-bold mb-2 tracking-wide">이메일 *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#A855F7]/50"
                    placeholder="contact@example.com" />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-bold mb-2 tracking-wide">인원 수 *</label>
                  <input required type="number" min="6" value={form.count} onChange={e => setForm({...form, count: e.target.value})}
                    className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#A855F7]/50"
                    placeholder="예: 25" />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-bold mb-2 tracking-wide">희망 방문 날짜</label>
                <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})}
                  className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#A855F7]/50" />
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-bold mb-2 tracking-wide">요청 사항</label>
                <textarea rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#A855F7]/50 resize-none"
                  placeholder="특별한 요청 사항이 있으면 자유롭게 적어주세요" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-[#A855F7] hover:bg-[#9333ea] disabled:opacity-50 text-white font-black py-4 rounded-xl text-sm transition-colors">
                {loading ? "제출 중..." : "단체 예약 신청하기"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
