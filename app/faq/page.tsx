"use client";
import { useState } from "react";
import Link from "next/link";

const FAQS = [
  {
    category: "예약",
    items: [
      { q: "예약은 어떻게 하나요?", a: "홈페이지 상단 '입장권 구매' 버튼을 클릭하거나 /menu 페이지에서 예약 유형을 선택하고 날짜·시간을 고른 후 결제하시면 됩니다." },
      { q: "당일 예약도 가능한가요?", a: "당일 예약은 남은 자리가 있는 경우 가능합니다. 다만 인기 시간대(주말 오후)는 조기 마감되므로 최소 3일 전 예약을 권장합니다." },
      { q: "예약 변경·취소는 어떻게 하나요?", a: "방문 3일 전까지는 전액 환불 가능합니다. 2일 전은 50% 환불, 1일 전·당일 취소는 환불이 불가합니다. 네이버 톡톡으로 문의해 주세요." },
      { q: "외국인도 예약할 수 있나요?", a: "네, 영어·중국어·일본어로 예약 및 이용 가능합니다. 도슨트 프로그램은 4개국어 해설사가 동반합니다." },
    ],
  },
  {
    category: "이용",
    items: [
      { q: "주차가 가능한가요?", a: "레코딩카페 전용 주차장이 없습니다. 인근 유료 주차장을 이용하시거나, 대중교통(3호선 신사역 5번 출구 도보 4분)을 이용해 주세요." },
      { q: "녹음 체험 시 노래를 미리 준비해야 하나요?", a: "꼭 그렇지는 않습니다. 기본 제공되는 K-POP 인기곡 중 선택하실 수 있으며, 원하시는 곡의 MR(반주)을 가져오셔도 됩니다." },
      { q: "어린이도 이용 가능한가요?", a: "만 7세 이상부터 이용 가능합니다. 미취학 아동은 보호자 동반 필수이며, 도슨트 투어는 초등학생 이상 권장합니다." },
      { q: "음식·음료 반입이 가능한가요?", a: "외부 음식·음료 반입은 불가합니다. 레코딩카페 내 음료가 제공되며, 멤버십 회원 및 예약 고객에게는 음료가 포함됩니다." },
    ],
  },
  {
    category: "녹음·결과물",
    items: [
      { q: "녹음한 음원은 어떻게 받을 수 있나요?", a: "체험 종료 후 당일 이메일 또는 카카오톡으로 MP3 파일을 전달해 드립니다. WAV 고음질 파일은 Plus 이상 멤버십 또는 별도 옵션 선택 시 제공됩니다." },
      { q: "녹음한 음원을 SNS에 올려도 되나요?", a: "체험 프로그램에서 녹음한 내용은 개인 SNS에 자유롭게 업로드 가능합니다. 다만 기존 저작권이 있는 곡을 상업적으로 이용하는 것은 저작권법에 따라 제한될 수 있습니다." },
      { q: "실제 음원을 발매하고 싶은데 어떻게 하나요?", a: "프로 에디션 또는 K-PASS Plus 이상 멤버십을 통해 정식 음원 발매가 가능합니다. 국내외 150개 플랫폼(멜론, 스포티파이, 유튜브 뮤직 등)에 동시 발매할 수 있습니다." },
    ],
  },
  {
    category: "멤버십",
    items: [
      { q: "K-PASS 멤버십은 언제든지 해지할 수 있나요?", a: "네, 언제든지 해지 가능합니다. 해지 신청 다음 달부터 결제가 중단되며, 이미 결제된 달의 혜택은 정상적으로 이용하실 수 있습니다." },
      { q: "멤버십 녹음 횟수를 이번 달에 다 못 썼는데 이월되나요?", a: "멤버십 녹음 횟수는 매월 초기화되며 이월되지 않습니다. 미사용 횟수는 소멸됩니다." },
      { q: "멤버십 등급을 중간에 변경할 수 있나요?", a: "현재 구독 중인 달에는 등급 변경이 불가하며, 다음 달부터 적용됩니다. 업그레이드/다운그레이드 모두 마이페이지에서 신청 가능합니다." },
    ],
  },
];

const NOTICES = [
  { date: "2025.12.01", title: "연말 특별 이벤트: 12월 예약 시 기념 굿즈 증정", badge: "이벤트" },
  { date: "2025.11.15", title: "도슨트 프로그램 일본어 해설 추가 안내", badge: "공지" },
  { date: "2025.11.01", title: "K-PASS 멤버십 서비스 출시 안내", badge: "신규" },
  { date: "2025.10.20", title: "주말 운영 시간 변경 안내 (10:00~22:00)", badge: "운영" },
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("예약");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [tab, setTab] = useState<"faq" | "notice">("faq");

  const currentFaqs = FAQS.find(f => f.category === activeCategory)?.items ?? [];

  return (
    <>
      {/* 히어로 */}
      <section className="relative pt-32 pb-16 bg-[#050508]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase mb-6">
            Help Center
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">고객센터</h1>
          <p className="text-slate-400 mb-8">궁금한 점이 있으신가요? 자주 묻는 질문을 확인해 보세요.</p>
          <a href="https://talk.naver.com/ct/wu2kkmv" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#03C75A] hover:bg-[#02a84b] text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">
            💬 네이버 톡톡 실시간 문의
          </a>
        </div>
      </section>

      {/* 탭 */}
      <section className="bg-[#050508] border-b border-white/5 sticky top-16 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex gap-6">
            {[
              { key: "faq", label: "자주 묻는 질문" },
              { key: "notice", label: "공지사항" },
            ].map(t => (
              <button key={t.key} onClick={() => setTab(t.key as "faq" | "notice")}
                className={`py-4 text-sm font-bold border-b-2 transition-colors ${
                  tab === t.key ? "border-[#D4AF37] text-white" : "border-transparent text-slate-500 hover:text-slate-300"
                }`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {tab === "faq" && (
        <section className="bg-[#050508] py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex gap-8 flex-col md:flex-row">
              {/* 카테고리 사이드바 */}
              <div className="md:w-44 flex-shrink-0">
                <div className="flex md:flex-col gap-2 flex-wrap">
                  {FAQS.map(f => (
                    <button key={f.category}
                      onClick={() => { setActiveCategory(f.category); setOpenIndex(null); }}
                      className={`text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        activeCategory === f.category
                          ? "bg-[#D4AF37] text-black"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}>
                      {f.category}
                    </button>
                  ))}
                </div>
              </div>

              {/* 아코디언 */}
              <div className="flex-1 space-y-2">
                {currentFaqs.map((item, i) => (
                  <div key={i} className="bg-[#0f0f18] rounded-xl border border-white/5 overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left">
                      <span className="text-white font-bold text-sm pr-4">{item.q}</span>
                      <span className={`text-[#D4AF37] text-lg flex-shrink-0 transition-transform ${openIndex === i ? "rotate-45" : ""}`}>+</span>
                    </button>
                    {openIndex === i && (
                      <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {tab === "notice" && (
        <section id="notice" className="bg-[#050508] py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-3">
            {NOTICES.map((n, i) => (
              <div key={i} className="bg-[#0f0f18] rounded-xl border border-white/5 px-6 py-4 flex items-center gap-4 hover:border-white/10 transition-colors cursor-pointer">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0 ${
                  n.badge === "이벤트" ? "bg-[#D4AF37]/20 text-[#D4AF37]" :
                  n.badge === "신규"   ? "bg-[#A855F7]/20 text-[#A855F7]" :
                  n.badge === "운영"   ? "bg-blue-500/20 text-blue-400" :
                  "bg-white/10 text-slate-400"
                }`}>{n.badge}</span>
                <span className="text-white text-sm font-medium flex-1">{n.title}</span>
                <span className="text-slate-600 text-xs flex-shrink-0">{n.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 추가 문의 */}
      <section className="bg-[#0a0a12] py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "💬", title: "네이버 톡톡", desc: "실시간 채팅 문의", sub: "평일 10-18시 빠른 응답", href: "https://talk.naver.com/ct/wu2kkmv", label: "문의하기", color: "#03C75A" },
              { icon: "📞", title: "전화 문의", desc: "운영 중 통화 가능", sub: "매일 10:00-22:00", href: "tel:02-0000-0000", label: "전화하기", color: "#D4AF37" },
              { icon: "📍", title: "방문 문의", desc: "신사역 5번 출구", sub: "서초구 강남대로107길 21, 2층", href: "/about#location", label: "찾아오는 길", color: "#A855F7" },
            ].map((c, i) => (
              <div key={i} className="bg-[#0f0f18] rounded-2xl p-6 border border-white/5 text-center">
                <div className="text-3xl mb-3">{c.icon}</div>
                <div className="text-white font-black mb-1">{c.title}</div>
                <div className="text-slate-400 text-sm mb-1">{c.desc}</div>
                <div className="text-slate-600 text-xs mb-4">{c.sub}</div>
                <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined}
                  className="block text-center font-bold py-2.5 rounded-xl text-sm transition-colors border"
                  style={{ borderColor: `${c.color}50`, color: c.color }}>
                  {c.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
