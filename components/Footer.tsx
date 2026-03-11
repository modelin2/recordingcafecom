import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#030305] border-t border-white/5 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* 브랜드 */}
          <div className="lg:col-span-2">
            <Image
              src="/images/logo.png"
              alt="Recording Café"
              width={140}
              height={46}
              className="h-10 w-auto mb-4"
            />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              실제 K-POP 스타들이 녹음한 전문 스튜디오를 직접 체험할 수 있는 공간.
              녹음 체험, 릴테이프 도슨트, 라이브 방송까지 — 신사역 바로 앞.
            </p>
            <div className="flex gap-3 mt-5">
              {["인스타그램", "유튜브", "틱톡"].map((sns) => (
                <a
                  key={sns}
                  href="#"
                  className="w-9 h-9 glass-dark rounded-lg flex items-center justify-center text-slate-400 hover:text-[#D4AF37] text-xs transition-colors"
                >
                  {sns[0]}
                </a>
              ))}
            </div>
          </div>

          {/* 서비스 */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">서비스</h4>
            <ul className="flex flex-col gap-2.5 text-slate-400 text-sm">
              {["녹음 스튜디오", "AI 포토 스튜디오", "보라박스 라이브", "프랜차이즈 문의"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#D4AF37] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">오시는 길</h4>
            <ul className="flex flex-col gap-3 text-slate-400 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>서울 서초구 강남대로107길 21, 2층<br />신사역 3호선 도보 4분</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>매일 10:00 – 22:00 · 연중무휴</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href="https://talk.naver.com/ct/wu2kkmv" className="hover:text-[#D4AF37] transition-colors">
                  네이버 톡톡 문의
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © 2025 Recording Café. All rights reserved. · 특허 보유 기술 무단 복제 금지
          </p>
          <div className="flex gap-4 text-slate-600 text-xs">
            <Link href="/magazine" className="hover:text-slate-400 transition-colors">매거진</Link>
            <a href="#" className="hover:text-slate-400 transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-slate-400 transition-colors">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
