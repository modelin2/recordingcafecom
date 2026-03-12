"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const NAV = [
  {
    label: "레코딩카페",
    key: "about",
    items: [
      { href: "/about",          title: "레코딩카페란",  desc: "10년 역사의 전문 스튜디오" },
      { href: "/about#story",    title: "우리의 이야기", desc: "K-POP 제작의 현장" },
      { href: "/about#spaces",   title: "공간 안내",     desc: "스튜디오·부스·라운지" },
      { href: "/about#location", title: "찾아오는 길",   desc: "신사역 3호선 도보 4분" },
    ],
  },
  {
    label: "공연",
    key: "performances",
    items: [
      { href: "/performances",           title: "공연 목록",     desc: "전체 공연·콘서트·렉처콘서트" },
      { href: "/performances?cat=공연",   title: "공연",          desc: "레코딩카페 스튜디오 공연" },
      { href: "/performances?cat=콘서트", title: "콘서트",        desc: "소규모 라이브 콘서트" },
      { href: "/performances?cat=렉처",   title: "렉처콘서트",    desc: "강의형 음악 이벤트" },
    ],
  },
  {
    label: "교육",
    key: "education",
    items: [
      { href: "/education",             title: "교육 프로그램",   desc: "전체 과정 둘러보기" },
      { href: "/education?cat=교육",    title: "정규 교육",       desc: "음악·녹음·프로듀싱 강좌" },
      { href: "/education?cat=워크샵",  title: "워크샵",          desc: "단기 집중 실습 과정" },
      { href: "/education?cat=마스터",  title: "마스터클래스",    desc: "현업 아티스트 특강" },
    ],
  },
  {
    label: "체험",
    key: "experience",
    items: [
      { href: "/experience",  title: "체험 둘러보기",   desc: "모든 프로그램 한눈에" },
      { href: "/experience",  title: "녹음 체험",       desc: "₩40,000~ · 음원 파일 제공" },
      { href: "/docent",      title: "도슨트 프로그램", desc: "₩35,000 · 4개국어 해설" },
      { href: "/group",       title: "단체 관람",       desc: "10인 이상 · 특별 혜택" },
    ],
  },
  {
    label: "프로 에디션",
    key: "pro",
    items: [
      { href: "/pro",          title: "프로 에디션이란", desc: "정식 음반 제작 서비스" },
      { href: "/pro#services", title: "서비스 안내",    desc: "작곡·녹음·믹싱·마스터링" },
      { href: "/pro#process",  title: "제작 프로세스",  desc: "12주 완성 로드맵" },
      { href: "/pro#contact",  title: "문의하기",       desc: "전담 매니저 1:1 상담" },
    ],
  },
  {
    label: "파트너 프로그램",
    key: "partnership",
    items: [
      { href: "/affiliate",   title: "제휴 마케팅",     desc: "링크·위젯으로 20% 수수료 수익" },
      { href: "/ambassador",  title: "브랜드 앰배서더", desc: "공식 앰배서더 모집 · 무료 이용권" },
      { href: "/referral",    title: "친구 추천",        desc: "추천인 레코딩 1시간 무료 쿠폰" },
      { href: "/ugc",         title: "UGC 리뷰 보상",   desc: "SNS 인증 포인트 · 베스트 콘텐츠" },
    ],
  },
  {
    label: "소식",
    key: "news",
    items: [
      { href: "/notices",  title: "공지사항", desc: "운영 안내 및 공지" },
      { href: "/magazine", title: "매거진",   desc: "K-POP 스토리·인터뷰" },
      { href: "/press",    title: "언론보도", desc: "레코딩카페 미디어 보도" },
    ],
  },
  {
    label: "고객센터",
    key: "support",
    items: [
      { href: "/faq",                              title: "자주 묻는 질문", desc: "예약·이용·환불 안내" },
      { href: "https://talk.naver.com/ct/wu2kkmv", title: "1:1 문의",       desc: "네이버 톡톡 실시간 상담" },
      { href: "/affiliate",                        title: "제휴 문의",       desc: "파트너십·제휴 마케팅 신청" },
    ],
  },
];

export default function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeKey, setActiveKey]   = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onEnter = (key: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveKey(key);
  };
  const onLeave = () => {
    leaveTimer.current = setTimeout(() => setActiveKey(null), 150);
  };

  return (
    <>
      {/* ── 데스크톱 헤더 ── */}
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          fontFamily: "var(--font-dm-sans), sans-serif",
          background: scrolled ? "#FAFAFA" : "rgba(250,250,250,0.92)",
          borderBottom: "1px solid #D3D3D3",
          backdropFilter: "blur(12px)",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>

          {/* 로고 */}
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0, display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#FAFAFA", fontSize: "11px", fontWeight: 700, letterSpacing: "0.5px" }}>RC</span>
            </div>
            <span className="hidden sm:block" style={{ fontSize: "13px", fontWeight: 500, color: "#000", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              Recording Café
            </span>
          </Link>

          {/* 데스크톱 nav */}
          <nav className="hidden xl:flex" style={{ alignItems: "center", gap: "0" }}>
            {NAV.map((nav) => (
              <div key={nav.key} onMouseEnter={() => onEnter(nav.key)} onMouseLeave={onLeave} style={{ position: "relative" }}>
                <button style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  padding: "8px 12px",
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: "13px", fontWeight: activeKey === nav.key ? 500 : 400,
                  color: activeKey === nav.key ? "#000" : "#5F5F5F",
                  letterSpacing: "0.3px", transition: "color 0.2s",
                }}>
                  {nav.label}
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transition: "transform 0.2s", transform: activeKey === nav.key ? "rotate(180deg)" : "none" }}>
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            ))}
          </nav>

          {/* 우측 CTA */}
          <div className="hidden xl:flex" style={{ alignItems: "center", gap: "8px" }}>
            <Link href="/mypage" style={{ fontSize: "13px", fontWeight: 400, color: "#5F5F5F", textDecoration: "none", padding: "8px 16px", letterSpacing: "0.3px" }}>
              마이페이지
            </Link>
            <Link href="/menu" style={{ display: "inline-block", background: "#000", color: "#FAFAFA", fontSize: "13px", fontWeight: 500, padding: "10px 24px", textDecoration: "none", letterSpacing: "0.5px" }}>
              입장권 구매
            </Link>
          </div>

          {/* 모바일 햄버거 */}
          <button className="xl:hidden" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", color: "#000" }}>
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            )}
          </button>
        </div>

        {/* 드롭다운 메가메뉴 */}
        {activeKey && (
          <div onMouseEnter={() => onEnter(activeKey)} onMouseLeave={onLeave}
            style={{ position: "absolute", left: 0, right: 0, top: "100%", background: "#FAFAFA", borderBottom: "1px solid #D3D3D3", borderTop: "1px solid #D3D3D3" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 48px" }}>
              {NAV.filter(n => n.key === activeKey).map((nav) => (
                <div key={nav.key}>
                  <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "24px" }}>
                    {nav.label}
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: `repeat(${nav.items.length}, 1fr)`, gap: "0", borderTop: "1px solid #D3D3D3" }}>
                    {nav.items.map((item, i) => (
                      <Link key={item.href + item.title} href={item.href} onClick={() => setActiveKey(null)}
                        style={{ display: "block", padding: "28px 32px 28px 0", paddingLeft: i > 0 ? "32px" : "0", borderRight: i < nav.items.length - 1 ? "1px solid #D3D3D3" : "none", textDecoration: "none" }}>
                        <p style={{ fontSize: "15px", fontWeight: 500, color: "#000", marginBottom: "6px", letterSpacing: "-0.2px" }}>{item.title}</p>
                        <p style={{ fontSize: "13px", color: "#8B8675", lineHeight: 1.5 }}>{item.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ── 모바일 전체화면 메뉴 ── */}
      {menuOpen && (
        <div className="xl:hidden"
          style={{ position: "fixed", inset: 0, zIndex: 40, background: "#FAFAFA", fontFamily: "var(--font-dm-sans), sans-serif", overflowY: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: "64px", borderBottom: "1px solid #D3D3D3" }}>
            <Link href="/" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "28px", height: "28px", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#FAFAFA", fontSize: "10px", fontWeight: 700 }}>RC</span>
              </div>
              <span style={{ fontSize: "13px", fontWeight: 500, color: "#000", letterSpacing: "1px", textTransform: "uppercase" }}>Recording Café</span>
            </Link>
            <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#000" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
          </div>
          <div style={{ padding: "16px 0" }}>
            {NAV.map((nav) => (
              <div key={nav.key} style={{ borderBottom: "1px solid #D3D3D3" }}>
                <button onClick={() => setMobileOpen(mobileOpen === nav.key ? null : nav.key)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", fontSize: "15px", fontWeight: 400, color: "#000", textAlign: "left" }}>
                  {nav.label}
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transition: "transform 0.2s", transform: mobileOpen === nav.key ? "rotate(180deg)" : "none", color: "#8B8675" }}>
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {mobileOpen === nav.key && (
                  <div style={{ background: "#F0EFEB", borderTop: "1px solid #D3D3D3" }}>
                    {nav.items.map((item) => (
                      <Link key={item.href + item.title} href={item.href} onClick={() => setMenuOpen(false)}
                        style={{ display: "block", padding: "16px 32px", textDecoration: "none", borderBottom: "1px solid #D3D3D3" }}>
                        <p style={{ fontSize: "14px", fontWeight: 500, color: "#1A1A1A", marginBottom: "2px" }}>{item.title}</p>
                        <p style={{ fontSize: "12px", color: "#8B8675" }}>{item.desc}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div style={{ padding: "24px" }}>
              <Link href="/mypage" onClick={() => setMenuOpen(false)}
                style={{ display: "block", padding: "14px 0", fontSize: "15px", color: "#5F5F5F", textDecoration: "none", borderBottom: "1px solid #D3D3D3", marginBottom: "12px" }}>
                마이페이지
              </Link>
              <Link href="/menu" onClick={() => setMenuOpen(false)}
                style={{ display: "block", textAlign: "center", background: "#000", color: "#FAFAFA", fontSize: "15px", fontWeight: 500, padding: "16px", textDecoration: "none", letterSpacing: "0.5px" }}>
                입장권 구매
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
