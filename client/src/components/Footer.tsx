import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Youtube, Music2 } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  return (
    <footer id="contact" className="bg-muted/30 border-t" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-2xl font-bold text-primary mb-4">레코딩 카페</div>
            <p className="text-sm text-muted-foreground mb-4">
              엔터테인먼트 산업의 미래를 만드는 일반인 엔터테이너를 위한 창업공간
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" data-testid="button-social-instagram">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-social-youtube">
                <Youtube className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-social-tiktok">
                <SiTiktok className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-social-music">
                <Music2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">서비스</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-primary transition-colors">레코딩 스튜디오</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">할리우드 프로필</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">라이브 방송</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">저작권 등록</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">프랜차이즈</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#franchise" className="hover:text-primary transition-colors">가맹 문의</a></li>
              <li><a href="#story" className="hover:text-primary transition-colors">브랜드 스토리</a></li>
              <li><a href="#franchise" className="hover:text-primary transition-colors">비즈니스 모델</a></li>
              <li><a href="#franchise" className="hover:text-primary transition-colors">성공 사례</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">뉴스레터</h3>
            <p className="text-sm text-muted-foreground mb-4">
              프랜차이즈 소식을 가장 먼저 받아보세요
            </p>
            <div className="flex gap-2">
              <Input placeholder="이메일 주소" type="email" data-testid="input-newsletter" />
              <Button data-testid="button-subscribe">구독</Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 레코딩 카페. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-primary transition-colors">이용약관</a>
            <a href="#" className="hover:text-primary transition-colors">문의하기</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
