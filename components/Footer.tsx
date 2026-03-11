import Link from "next/link";
import { MapPin, Clock, Phone } from "lucide-react";

const FOOTER_NAV = [
  {
    title: "레코딩카페",
    links: [
      { href: "/about", label: "레코딩카페란" },
      { href: "/about#story", label: "우리의 이야기" },
      { href: "/about#spaces", label: "공간 안내" },
      { href: "/about#location", label: "찾아오는 길" },
    ],
  },
  {
    title: "체험 에디션",
    links: [
      { href: "/experience", label: "체험 둘러보기" },
      { href: "/experience", label: "녹음 체험" },
      { href: "/docent", label: "도슨트 프로그램" },
      { href: "/group", label: "단체 관람" },
    ],
  },
  {
    title: "프로 에디션",
    links: [
      { href: "/pro", label: "프로 에디션이란" },
      { href: "/pro#services", label: "서비스 안내" },
      { href: "/pro#process", label: "제작 프로세스" },
      { href: "/pro#contact", label: "문의하기" },
    ],
  },
  {
    title: "멤버십",
    links: [
      { href: "/membership", label: "K-PASS 멤버십" },
      { href: "/membership#benefits", label: "멤버 혜택" },
      { href: "/membership#pricing", label: "요금제" },
      { href: "/membership#apply", label: "멤버십 신청" },
    ],
  },
  {
    title: "파트너십",
    links: [
      { href: "/partnership", label: "파트너 소개" },
      { href: "/partnership#benefits", label: "제휴 혜택" },
      { href: "/partnership#apply", label: "파트너 신청" },
      { href: "/partnership#qr", label: "전용 예약 페이지" },
    ],
  },
  {
    title: "고객센터",
    links: [
      { href: "/faq", label: "자주 묻는 질문" },
      { href: "/faq#notice", label: "공지사항" },
      { href: "/magazine", label: "매거진" },
      { href: "https://talk.naver.com/ct/wu2kkmv", label: "1:1 문의" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#030305] border-t border-white/5">
      {/* 메인 사이트맵 영역 */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-8">
          {/* 브랜드 */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center">
                <span className="text-black font-black text-xs">K</span>
              </div>
              <span className="text-white font-black text-sm">RECORDING<br /><span className="text-[#D4AF37]">CAFÉ</span></span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed mb-4">
              실제 K-POP 스타들이 녹음한 전문 스튜디오를 직접 체험할 수 있는 공간.
            </p>
            <div className="space-y-2 text-xs text-slate-500">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3 h-3 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>서초구 강남대로107길 21, 2층<br />신사역 3호선 도보 4분</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
                <span>매일 12:00 – 21:00 · 연중무휴</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-[#D4AF37] flex-shrink-0" />
                <a href="https://talk.naver.com/ct/wu2kkmv" className="hover:text-[#D4AF37] transition-colors">
                  네이버 톡톡 문의
                </a>
              </div>
            </div>
          </div>

          {/* 네비게이션 그리드 */}
          {FOOTER_NAV.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-black text-xs mb-3 tracking-wide">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-500 hover:text-[#D4AF37] text-xs transition-colors leading-relaxed"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 바 */}
      <div className="border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-700 text-xs">
            © 2025 레코딩카페. All rights reserved. · 특허 보유 기술 무단 복제 금지
          </p>
          <div className="flex gap-4 text-slate-700 text-xs">
            <a href="#" className="hover:text-slate-400 transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-slate-400 transition-colors">이용약관</a>
            <Link href="/magazine" className="hover:text-slate-400 transition-colors">매거진</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
