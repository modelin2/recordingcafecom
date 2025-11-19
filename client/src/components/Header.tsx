import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b" : "bg-black/50 backdrop-blur-sm"
      }`}
      data-testid="header-main"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center" data-testid="link-logo">
            <div className="text-xl font-bold tracking-wide" style={{ color: '#D4AF37' }}>레코딩 카페</div>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`${isScrolled ? 'text-foreground' : 'text-white'} hover:opacity-70 transition-opacity text-sm`}
                data-testid={`link-nav-${item.label}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button 
              size="sm"
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
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t bg-background" data-testid="nav-mobile">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 text-sm hover:opacity-70 transition-opacity"
                style={{ color: '#D4AF37' }}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`link-mobile-${item.label}`}
              >
                {item.label}
              </a>
            ))}
            <Button size="sm" className="w-full mt-4" style={{ backgroundColor: '#D4AF37', color: '#000' }} data-testid="button-mobile-booking" asChild>
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
