"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, User, Ticket } from "lucide-react";

const NAV = [
  {
    label: "레코딩카페",
    key: "about",
    items: [
      { href: "/about",           icon: "🎵", title: "레코딩카페란",  desc: "10년 역사의 전문 스튜디오" },
      { href: "/about#story",     icon: "📖", title: "우리의 이야기", desc: "K-POP 제작의 현장" },
      { href: "/about#spaces",    icon: "🏠", title: "공간 안내",     desc: "스튜디오·부스·라운지" },
      { href: "/about#location",  icon: "📍", title: "찾아오는 길",   desc: "신사역 3호선 도보 4분" },
    ],
  },
  {
    label: "체험 에디션",
    key: "experience",
    items: [
      { href: "/experience",      icon: "🎤", title: "체험 둘러보기", desc: "모든 프로그램 한눈에" },
      { href: "/experience",      icon: "🎙️", title: "녹음 체험",     desc: "₩40,000~ · 음원 파일 제공" },
      { href: "/docent",          icon: "🎞️", title: "도슨트 프로그램", desc: "₩35,000 · 4개국어 해설" },
      { href: "/group",           icon: "👥", title: "단체 관람",     desc: "10인 이상 · 특별 혜택" },
    ],
  },
  {
    label: "프로 에디션",
    key: "pro",
    items: [
      { href: "/pro",             icon: "🏆", title: "프로 에디션이란", desc: "정식 음반 제작 서비스" },
      { href: "/pro#services",    icon: "🎼", title: "서비스 안내",    desc: "작곡·녹음·믹싱·마스터링" },
      { href: "/pro#process",     icon: "📋", title: "제작 프로세스",  desc: "12주 완성 로드맵" },
      { href: "/pro#contact",     icon: "📞", title: "문의하기",      desc: "전담 매니저 1:1 상담" },
    ],
  },
  {
    label: "멤버십",
    key: "membership",
    items: [
      { href: "/membership",          icon: "⭐", title: "K-PASS 멤버십",  desc: "월정액 무제한 녹음" },
      { href: "/membership#benefits", icon: "🎁", title: "멤버 혜택",      desc: "멤버 전용 특권 안내" },
      { href: "/membership#pricing",  icon: "💳", title: "요금제",         desc: "Basic · Plus · Pro" },
      { href: "/membership#apply",    icon: "✅", title: "멤버십 신청",    desc: "지금 바로 시작하기" },
    ],
  },
  {
    label: "파트너십",
    key: "partnership",
    items: [
      { href: "/partnership",          icon: "🤝", title: "파트너 소개",    desc: "현재 제휴 파트너 호텔·업체" },
      { href: "/partnership#benefits", icon: "💰", title: "제휴 혜택",      desc: "수수료 20% 지급 프로그램" },
      { href: "/partnership#apply",    icon: "📝", title: "파트너 신청",    desc: "제휴 문의 및 신청" },
      { href: "/partnership#qr",       icon: "📱", title: "전용 예약 페이지", desc: "파트너 전용 QR 예약 링크" },
    ],
  },
  {
    label: "고객센터",
    key: "support",
    items: [
      { href: "/faq",              icon: "❓", title: "자주 묻는 질문", desc: "예약·이용·환불 안내" },
      { href: "/faq#notice",       icon: "📢", title: "공지사항",       desc: "운영 안내 및 이벤트" },
      { href: "/magazine",         icon: "📰", title: "매거진",         desc: "K-POP 스토리·인터뷰" },
      { href: "https://talk.naver.com/ct/wu2kkmv", icon: "💬", title: "1:1 문의", desc: "네이버 톡톡 실시간 상담" },
    ],
  },
];

export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (key: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveKey(key);
  };
  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => setActiveKey(null), 120);
  };

  return (
    <>
      <header className={`fixed top-6 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "top-0" : "top-6"
      }`}>
        {/* 메인 헤더 바 */}
        <div className={`mx-4 sm:mx-8 lg:mx-16 rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-[#050508]/97 backdrop-blur-xl border border-white/10 shadow-2xl rounded-none mx-0"
            : "bg-[#050508]/80 backdrop-blur-md border border-white/10"
        }`}>
          <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between gap-4">

            {/* 로고 */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center">
                <span className="text-black font-black text-xs">RC</span>
              </div>
              <span className="text-white font-black text-base tracking-tight hidden sm:block">
                RECORDING <span className="text-[#D4AF37]">CAFÉ</span>
              </span>
            </Link>

            {/* 데스크톱 nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV.map((nav) => (
                <div
                  key={nav.key}
                  onMouseEnter={() => handleMouseEnter(nav.key)}
                  onMouseLeave={handleMouseLeave}
                  className="relative"
                >
                  <button className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeKey === nav.key
                      ? "text-white bg-white/8"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}>
                    {nav.label}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeKey === nav.key ? "rotate-180" : ""}`} />
                  </button>
                </div>
              ))}
            </nav>

            {/* 우측 CTA */}
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/mypage"
                className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm px-3 py-2 rounded-xl hover:bg-white/5 transition-colors">
                <User className="w-4 h-4" />
                마이페이지
              </Link>
              <Link href="/menu"
                className="flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#F0D060] text-black font-black px-5 py-2 rounded-xl text-sm transition-colors">
                <Ticket className="w-4 h-4" />
                입장권 구매
              </Link>
            </div>

            {/* 모바일 햄버거 */}
            <button className="lg:hidden text-white p-1" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 메가 드롭다운 */}
        {activeKey && (
          <div
            onMouseEnter={() => handleMouseEnter(activeKey)}
            onMouseLeave={handleMouseLeave}
            className={`hidden lg:block absolute left-0 right-0 ${scrolled ? "top-full" : "top-full mt-1"}`}
          >
            <div className="mx-4 sm:mx-8 lg:mx-16 mt-1">
              <div className={`bg-[#0a0a14]/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden ${
                scrolled ? "mx-0 rounded-t-none" : ""
              }`}>
                <div className="max-w-[1400px] mx-auto px-8 py-6">
                  {NAV.filter(n => n.key === activeKey).map((nav) => (
                    <div key={nav.key}>
                      <div className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                        {nav.label}
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {nav.items.map((item) => (
                          <Link key={item.href + item.title} href={item.href}
                            onClick={() => setActiveKey(null)}
                            className="flex items-start gap-3 p-4 rounded-xl hover:bg-white/5 transition-colors group">
                            <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                            <div>
                              <div className="text-white font-bold text-sm group-hover:text-[#D4AF37] transition-colors">
                                {item.title}
                              </div>
                              <div className="text-slate-500 text-xs mt-0.5 leading-relaxed">{item.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 모바일 메뉴 전체화면 */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#050508]/99 backdrop-blur-xl overflow-y-auto">
          <div className="flex items-center justify-between px-6 h-16 border-b border-white/5">
            <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#D4AF37] flex items-center justify-center">
                <span className="text-black font-black text-xs">RC</span>
              </div>
              <span className="text-white font-black text-sm">RECORDING CAFÉ</span>
            </Link>
            <button onClick={() => setMenuOpen(false)} className="text-white p-1">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-4 py-6 space-y-1">
            {NAV.map((nav) => (
              <div key={nav.key}>
                <button
                  onClick={() => setMobileOpen(mobileOpen === nav.key ? null : nav.key)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-white font-bold rounded-xl hover:bg-white/5 transition-colors"
                >
                  <span>{nav.label}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileOpen === nav.key ? "rotate-180" : ""}`} />
                </button>
                {mobileOpen === nav.key && (
                  <div className="ml-4 mt-1 space-y-1 mb-2">
                    {nav.items.map((item) => (
                      <Link key={item.href + item.title} href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white rounded-xl hover:bg-white/5 transition-colors">
                        <span className="text-lg">{item.icon}</span>
                        <div>
                          <div className="text-sm font-medium">{item.title}</div>
                          <div className="text-xs text-slate-500">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-white/5 mt-4 space-y-2">
              <Link href="/mypage" onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 w-full px-4 py-3 text-slate-300 hover:text-white rounded-xl hover:bg-white/5 transition-colors font-medium">
                <User className="w-4 h-4" /> 마이페이지
              </Link>
              <Link href="/menu" onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-[#D4AF37] text-black font-black py-4 rounded-xl text-sm">
                <Ticket className="w-4 h-4" /> 입장권 구매
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
