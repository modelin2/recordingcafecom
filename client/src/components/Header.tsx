import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";
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
    return 'ko';
  };

  const getFlag = () => {
    const lang = getCurrentLanguage();
    if (lang === 'en') return '🇺🇸';
    if (lang === 'zh') return '🇨🇳';
    return '🇰🇷';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "홈", href: "#home" },
    { label: "공간", href: "#space" },
    { label: "서비스", href: "#services" },
    { label: "Creator OS", href: "#creator-os" },
    { label: "후기", href: "#reviews" },
    { label: "예약", href: "#booking" },
    { label: "가맹점", href: "#franchise" },
  ];

  const getHomeLink = () => {
    const lang = getCurrentLanguage();
    if (lang === 'en') return '/en';
    if (lang === 'zh') return '/zh';
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
                  className={`${isScrolled ? '' : 'text-white hover:bg-white/10'} text-2xl h-10 px-2`}
                  data-testid="button-language"
                >
                  {getFlag()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLocation('/')} data-testid="menu-lang-ko">
                  🇰🇷 한국어
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation('/en')} data-testid="menu-lang-en">
                  🇺🇸 English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation('/zh')} data-testid="menu-lang-zh">
                  🇨🇳 中文
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
                예약하기
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
                예약하기
              </a>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
