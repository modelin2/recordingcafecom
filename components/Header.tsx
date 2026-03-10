"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#services", label: "서비스" },
  { href: "/#howto", label: "이용방법" },
  { href: "/#gallery", label: "공간" },
  { href: "/magazine", label: "매거진" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#050508]/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Recording Café"
            width={120}
            height={40}
            className="h-9 w-auto"
          />
        </Link>

        {/* 데스크톱 nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-400 hover:text-[#D4AF37] text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://talk.naver.com/ct/wu2kkmv"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#D4AF37] hover:bg-[#F0D060] text-black px-4 py-2 rounded-lg text-sm font-bold transition-colors"
          >
            예약 문의
          </a>
        </div>

        {/* 모바일 햄버거 */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0f]/98 border-t border-white/5 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-slate-300 hover:text-[#D4AF37] text-base font-medium py-1 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://talk.naver.com/ct/wu2kkmv"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#D4AF37] text-black text-center py-3 rounded-lg font-bold text-sm mt-2"
          >
            예약 문의하기
          </a>
        </div>
      )}
    </header>
  );
}
