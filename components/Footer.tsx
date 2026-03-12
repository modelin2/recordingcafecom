"use client";
import Link from "next/link";

const FOOTER_NAV = [
  {
    title: "레코딩카페",
    links: [
      { href: "/about",          label: "레코딩카페란" },
      { href: "/about#story",    label: "우리의 이야기" },
      { href: "/about#spaces",   label: "공간 안내" },
      { href: "/about#location", label: "찾아오는 길" },
    ],
  },
  {
    title: "프로그램",
    links: [
      { href: "/performances", label: "공연" },
      { href: "/education",    label: "교육" },
      { href: "/experience",   label: "체험" },
      { href: "/pro",          label: "프로 에디션" },
    ],
  },
  {
    title: "파트너 프로그램",
    links: [
      { href: "/affiliate",  label: "제휴 마케팅" },
      { href: "/ambassador", label: "브랜드 앰배서더" },
      { href: "/referral",   label: "친구 추천" },
      { href: "/ugc",        label: "UGC 리뷰 보상" },
    ],
  },
  {
    title: "소식",
    links: [
      { href: "/notices",  label: "공지사항" },
      { href: "/magazine", label: "매거진" },
      { href: "/press",    label: "언론보도" },
    ],
  },
  {
    title: "고객센터",
    links: [
      { href: "/faq",                               label: "자주 묻는 질문" },
      { href: "https://talk.naver.com/ct/wu2kkmv", label: "1:1 문의" },
      { href: "/affiliate",                         label: "제휴 문의" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#F0EFEB", borderTop: "1px solid #D3D3D3" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 48px 64px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-7" style={{ gap: "0", borderBottom: "1px solid #D3D3D3", paddingBottom: "64px" }}>

          {/* 브랜드 */}
          <div className="lg:col-span-2" style={{ paddingRight: "48px", borderRight: "1px solid #D3D3D3", marginBottom: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <div style={{ width: "32px", height: "32px", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#FAFAFA", fontSize: "11px", fontWeight: 700, letterSpacing: "0.5px" }}>RC</span>
              </div>
              <span style={{ fontSize: "13px", fontWeight: 500, color: "#000", letterSpacing: "1.5px", textTransform: "uppercase" }}>Recording Café</span>
            </div>
            <p style={{ fontSize: "14px", color: "#5F5F5F", lineHeight: 1.75, marginBottom: "28px" }}>
              실제 K-POP 스타들이 녹음한 전문 스튜디오를 직접 체험할 수 있는 공간.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <p style={{ fontSize: "13px", color: "#8B8675" }}>서초구 강남대로107길 21, 2층</p>
              <p style={{ fontSize: "13px", color: "#8B8675" }}>매일 12:00 – 21:00 · 연중무휴</p>
              <a href="https://talk.naver.com/ct/wu2kkmv"
                style={{ fontSize: "13px", color: "#6B625A", textDecoration: "none" }}>
                네이버 톡톡 문의 →
              </a>
            </div>
          </div>

          {/* 사이트맵 */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" style={{ gap: "0" }}>
              {FOOTER_NAV.map((section, i) => (
                <div key={section.title} style={{ padding: "0 0 0 36px", borderRight: i < 4 ? "1px solid #D3D3D3" : "none", marginBottom: "32px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "20px" }}>
                    {section.title}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href}
                          style={{ fontSize: "14px", color: "#5F5F5F", textDecoration: "none", lineHeight: 1.5, transition: "color 0.2s" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "#5F5F5F")}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ paddingTop: "32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <p style={{ fontSize: "12px", color: "#8B8675", letterSpacing: "0.3px" }}>
            © 2025 레코딩카페. All rights reserved. · 특허 보유 기술 무단 복제 금지
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {[
              { href: "#",         label: "개인정보처리방침" },
              { href: "#",         label: "이용약관" },
              { href: "/magazine", label: "매거진" },
            ].map((item) => (
              <a key={item.label} href={item.href}
                style={{ fontSize: "12px", color: "#8B8675", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8B8675")}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
