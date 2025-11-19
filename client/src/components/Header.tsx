import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import KR from 'country-flag-icons/react/3x2/KR';
import US from 'country-flag-icons/react/3x2/US';
import CN from 'country-flag-icons/react/3x2/CN';
import JP from 'country-flag-icons/react/3x2/JP';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  const getCurrentLanguage = () => {
    if (location.startsWith('/en')) return 'en';
    if (location.startsWith('/zh')) return 'zh';
    if (location.startsWith('/jp')) return 'jp';
    return 'ko';
  };

  const getNavLabels = () => {
    const lang = getCurrentLanguage();
    if (lang === 'en') {
      return [
        { label: "Home", href: "#home" },
        { label: "Space", href: "#space" },
        { label: "Services", href: "#services" },
        { label: "Creator OS", href: "#creator-os" },
        { label: "Reviews", href: "#reviews" },
        { label: "Booking", href: "#booking" },
        { label: "Franchise", href: "#franchise" },
      ];
    } else if (lang === 'zh') {
      return [
        { label: "首页", href: "#home" },
        { label: "空间", href: "#space" },
        { label: "服务", href: "#services" },
        { label: "Creator OS", href: "#creator-os" },
        { label: "评价", href: "#reviews" },
        { label: "预约", href: "#booking" },
        { label: "加盟", href: "#franchise" },
      ];
    } else if (lang === 'jp') {
      return [
        { label: "ホーム", href: "#home" },
        { label: "スペース", href: "#space" },
        { label: "サービス", href: "#services" },
        { label: "Creator OS", href: "#creator-os" },
        { label: "レビュー", href: "#reviews" },
        { label: "予約", href: "#booking" },
        { label: "フランチャイズ", href: "#franchise" },
      ];
    }
    return [
      { label: "홈", href: "#home" },
      { label: "공간", href: "#space" },
      { label: "서비스", href: "#services" },
      { label: "Creator OS", href: "#creator-os" },
      { label: "후기", href: "#reviews" },
      { label: "예약", href: "#booking" },
      { label: "가맹점", href: "#franchise" },
    ];
  };

  const getBookingLabel = () => {
    const lang = getCurrentLanguage();
    if (lang === 'en') return 'Book Now';
    if (lang === 'zh') return '立即预约';
    if (lang === 'jp') return '予約する';
    return '예약하기';
  };

  const getFlagComponent = () => {
    const lang = getCurrentLanguage();
    if (lang === 'en') return <US className="h-5 w-7" />;
    if (lang === 'zh') return <CN className="h-5 w-7" />;
    if (lang === 'jp') return <JP className="h-5 w-7" />;
    return <KR className="h-5 w-7" />;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = getNavLabels();

  const getHomeLink = () => {
    const lang = getCurrentLanguage();
    if (lang === 'en') return '/en';
    if (lang === 'zh') return '/zh';
    if (lang === 'jp') return '/jp';
    return '/';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b" : "bg-black/40 backdrop-blur-sm"
      }`}
      data-testid="header-main"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href={getHomeLink()} className="flex items-center gap-3" data-testid="link-logo">
            <div className="flex flex-col">
              <div className="text-2xl font-bold tracking-wide" style={{ color: '#D4AF37' }}>레코딩 카페</div>
              <div className="text-xs tracking-widest opacity-80" style={{ color: '#D4AF37' }}>Recording Café</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`${isScrolled ? 'text-foreground' : 'text-white'} hover:opacity-80 transition-colors font-medium text-sm tracking-wide`}
                data-testid={`link-nav-${item.label}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`${isScrolled ? '' : 'text-white hover:bg-white/10'} h-10 px-2`}
                  data-testid="button-language"
                >
                  {getFlagComponent()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLocation('/')} data-testid="menu-lang-ko" className="flex items-center gap-2">
                  <KR className="h-4 w-6" /> 한국어
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation('/en')} data-testid="menu-lang-en" className="flex items-center gap-2">
                  <US className="h-4 w-6" /> English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation('/zh')} data-testid="menu-lang-zh" className="flex items-center gap-2">
                  <CN className="h-4 w-6" /> 中文
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation('/jp')} data-testid="menu-lang-jp" className="flex items-center gap-2">
                  <JP className="h-4 w-6" /> 日本語
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              className="hidden md:inline-flex" 
              style={{ backgroundColor: '#D4AF37', color: '#000' }}
              data-testid="button-booking-cta"
              asChild
            >
              <a href="https://booking.naver.com/booking/12/bizes/1536339" target="_blank" rel="noopener noreferrer">
                {getBookingLabel()}
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden ${isScrolled ? '' : 'text-white hover:bg-white/10'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t bg-background px-4" data-testid="nav-mobile">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-3 font-medium hover:opacity-80 transition-colors"
                style={{ color: '#D4AF37' }}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`link-mobile-${item.label}`}
              >
                {item.label}
              </a>
            ))}
            <Button className="w-full mt-4" style={{ backgroundColor: '#D4AF37', color: '#000' }} data-testid="button-mobile-booking" asChild>
              <a href="https://booking.naver.com/booking/12/bizes/1536339" target="_blank" rel="noopener noreferrer">
                {getBookingLabel()}
              </a>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
