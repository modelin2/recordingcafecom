"use client";
import { useState } from "react";
import Link from "next/link";

const PLANS = [
  {
    key: "basic",
    name: "K-PASS Basic",
    price: "99,000",
    unit: "월",
    color: "#A855F7",
    badge: "",
    features: [
      "매월 녹음 체험 2회 (회당 30분)",
      "음원 파일(MP3) 제공",
      "도슨트 투어 월 1회",
      "음료 1잔 매 방문 제공",
      "멤버 전용 라운지 이용",
      "이용권 대비 30% 절약",
    ],
    notIncluded: ["믹싱·마스터링 서비스", "음원 발매 서비스", "전문 엔지니어 1:1 지원"],
  },
  {
    key: "plus",
    name: "K-PASS Plus",
    price: "199,000",
    unit: "월",
    color: "#D4AF37",
    badge: "인기",
    features: [
      "매월 녹음 체험 4회 (회당 45분)",
      "음원 파일(WAV 고음질) 제공",
      "도슨트 투어 무제한",
      "음료 2잔 매 방문 제공",
      "전문 사운드 엔지니어 믹싱",
      "멤버 전용 라운지 이용",
      "연간 EP(3곡) 발매 가능",
      "이용권 대비 50% 절약",
    ],
    notIncluded: ["마스터링·유통 서비스 (별도)"],
  },
  {
    key: "pro",
    name: "K-PASS Pro",
    price: "399,000",
    unit: "월",
    color: "#fff",
    badge: "최고",
    features: [
      "매월 녹음 체험 8회 (회당 60분)",
      "음원 파일(WAV 스튜디오 마스터)",
      "도슨트 투어 무제한 + 비공개 투어",
      "전문 엔지니어 1:1 녹음 지원",
      "믹싱·마스터링 월 2곡 포함",
      "연간 정규앨범(10곡) 발매 가능",
      "150개 글로벌 플랫폼 음원 유통",
      "KOMCA 저작권 등록 지원",
      "멤버 전용 라운지 VIP 이용",
    ],
    notIncluded: [],
  },
];

const COMPARE = [
  { feature: "월 녹음 횟수", basic: "2회", plus: "4회", pro: "8회" },
  { feature: "1회 녹음 시간", basic: "30분", plus: "45분", pro: "60분" },
  { feature: "음원 파일 품질", basic: "MP3", plus: "WAV", pro: "스튜디오 마스터" },
  { feature: "도슨트 투어", basic: "월 1회", plus: "무제한", pro: "무제한 + VIP" },
  { feature: "사운드 엔지니어", basic: "×", plus: "믹싱 포함", pro: "1:1 전담" },
  { feature: "음원 발매", basic: "×", plus: "EP 연간 1회", pro: "정규앨범 연간 1회" },
  { feature: "글로벌 유통", basic: "×", plus: "△ 별도", pro: "✓ 150개 플랫폼" },
  { feature: "음료 혜택", basic: "1잔", plus: "2잔", pro: "무제한" },
];

export default function MembershipPage() {
  const [selected, setSelected] = useState("plus");
  const [tab, setTab] = useState<"plans" | "compare">("plans");

  return (
    <>
      {/* 히어로 */}
      <section className="relative pt-32 pb-20 bg-[#050508] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#A855F7]/8 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="inline-block bg-[#A855F7]/10 text-[#A855F7] text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase mb-6">
            K-PASS Membership
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
            매달 나만의 노래를<br />만들고 발매하세요
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            단회 체험을 넘어, 진짜 아티스트처럼. K-PASS 멤버십으로<br />
            매달 녹음하고, 매년 앨범을 발매할 수 있습니다.
          </p>
        </div>
      </section>

      {/* 탭 전환 */}
      <section className="bg-[#050508] py-4 sticky top-16 z-30 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 bg-[#0f0f18] p-1 rounded-xl w-fit mx-auto">
            {[
              { key: "plans", label: "요금제 보기" },
              { key: "compare", label: "상세 비교" },
            ].map(t => (
              <button key={t.key} onClick={() => setTab(t.key as "plans" | "compare")}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  tab === t.key ? "bg-[#D4AF37] text-black" : "text-slate-400 hover:text-white"
                }`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 요금제 카드 */}
      {tab === "plans" && (
        <section id="pricing" className="bg-[#050508] py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PLANS.map((plan) => (
                <div key={plan.key}
                  onClick={() => setSelected(plan.key)}
                  className={`relative rounded-2xl p-8 border cursor-pointer transition-all ${
                    selected === plan.key
                      ? "border-[#D4AF37] bg-[#D4AF37]/5 shadow-lg shadow-[#D4AF37]/10"
                      : "border-white/5 bg-[#0f0f18] hover:border-white/10"
                  }`}>
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-[#D4AF37] text-black text-[10px] font-black px-3 py-1 rounded-full">
                        {plan.badge}
                      </span>
                    </div>
                  )}
                  <div className="mb-6">
                    <div className="text-sm font-bold mb-1" style={{ color: plan.color }}>{plan.name}</div>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-white font-black text-4xl">₩{plan.price}</span>
                      <span className="text-slate-500 text-sm">/{plan.unit}</span>
                    </div>
                  </div>
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-[#D4AF37] flex-shrink-0 mt-0.5">✓</span>
                        {f}
                      </li>
                    ))}
                    {plan.notIncluded.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="flex-shrink-0 mt-0.5">×</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/mypage"
                    className={`block w-full text-center font-black py-3 rounded-xl text-sm transition-colors ${
                      selected === plan.key
                        ? "bg-[#D4AF37] hover:bg-[#F0D060] text-black"
                        : "bg-white/5 hover:bg-white/10 text-white"
                    }`}>
                    {selected === plan.key ? "이 요금제로 시작하기" : "선택하기"}
                  </Link>
                </div>
              ))}
            </div>
            <p className="text-center text-slate-600 text-xs mt-6">
              * 모든 멤버십은 매월 자동 결제됩니다. 언제든지 해지 가능.
            </p>
          </div>
        </section>
      )}

      {/* 상세 비교 테이블 */}
      {tab === "compare" && (
        <section className="bg-[#050508] py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-slate-500 text-xs font-bold tracking-widest uppercase pb-4 w-1/3">혜택</th>
                  {PLANS.map(p => (
                    <th key={p.key} className="text-center pb-4 w-2/9">
                      <div className="text-white font-black text-sm">{p.name}</div>
                      <div className="text-slate-500 text-xs">₩{p.price}/월</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={i} className={`border-t ${i % 2 === 0 ? "border-white/5 bg-[#0a0a12]" : "border-white/5"}`}>
                    <td className="py-4 text-sm text-slate-400 font-medium">{row.feature}</td>
                    {[row.basic, row.plus, row.pro].map((val, j) => (
                      <td key={j} className="py-4 text-center text-sm">
                        <span className={val === "×" ? "text-slate-600" : val === "✓ 150개 플랫폼" ? "text-[#D4AF37] font-bold" : "text-white font-medium"}>
                          {val}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-8 text-center">
              <Link href="/mypage"
                className="inline-block bg-[#D4AF37] hover:bg-[#F0D060] text-black font-black px-10 py-4 rounded-xl text-sm transition-colors">
                멤버십 시작하기 →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 멤버십 혜택 요약 */}
      <section id="benefits" className="bg-[#0a0a12] py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-white">모든 멤버에게 제공되는 공통 혜택</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: "🎵", title: "음원 파일 제공",   desc: "녹음 후 음원 파일 즉시 발급" },
              { icon: "☕", title: "음료 제공",         desc: "방문 시 음료 무료 제공" },
              { icon: "🌏", title: "4개국어 안내",      desc: "한·영·중·일 스태프 응대" },
              { icon: "📅", title: "우선 예약권",       desc: "비회원 대비 1주일 빠른 예약" },
            ].map((b, i) => (
              <div key={i} className="bg-[#0f0f18] rounded-2xl p-5 border border-white/5 text-center">
                <div className="text-3xl mb-3">{b.icon}</div>
                <div className="text-white font-bold text-sm mb-1">{b.title}</div>
                <div className="text-slate-500 text-xs">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
