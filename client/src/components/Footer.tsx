import { Button } from "@/components/ui/button";
import { Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-black text-white" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <div className="text-2xl font-bold tracking-wide mb-1" style={{ color: '#D4AF37' }}>Recording Café</div>
              <div className="text-xs tracking-widest opacity-60" style={{ color: '#D4AF37' }}>music & coffee production</div>
            </div>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              음악과 커피가 만나는 프리미엄 창작 공간
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-white/10" data-testid="button-social-instagram">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10" data-testid="button-social-youtube">
                <Youtube className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10" data-testid="button-social-tiktok">
                <SiTiktok className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">서비스</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li><a href="#services" className="hover:text-white transition-colors">레코딩 스튜디오</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">프로필 촬영</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">라이브 방송</a></li>
              <li><a href="#booking" className="hover:text-white transition-colors">예약 안내</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">정보</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li><a href="#space" className="hover:text-white transition-colors">공간 소개</a></li>
              <li><a href="#" className="hover:text-white transition-colors">이용 요금</a></li>
              <li><a href="#" className="hover:text-white transition-colors">자주 묻는 질문</a></li>
              <li><a href="#" className="hover:text-white transition-colors">프랜차이즈 문의</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">문의</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <span>서울시 강남구<br />예약 후 안내</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <span>예약 문의: 온라인 접수</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <span>contact@recordingcafe.kr</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© 2024 Recording Café. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
