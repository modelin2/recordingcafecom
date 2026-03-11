"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expOpen, setExpOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#050508]/97 backdrop-blur-md border-b border-white/5" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-white font-black text-lg tracking-tight">
            K<span className="text-[#D4AF37]">·</span>RECORDING CAFÉ
          </span>
        </Link>

        {/* 데스크톱 nav */}
        <nav className="hidden md:flex items-center gap-8">
          {/* 체험 에디션 드롭다운 */}
          <div
            className="relative group"
            onMouseEnter={() => setExpOpen(true)}
            onMouseLeave={() => setExpOpen(false)}
          >
            <button className="flex items-center gap-1 text-slate-300 hover:text-white text-sm font-medium transition-colors py-2">
              체험 에디션 <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {expOpen && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-[#0f0f18] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <Link href="/experience"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5">
                  <span className="text-lg">🎤</span>
                  <div>
                    <div className="font-medium">녹음 체험</div>
                    <div className="text-xs text-slate-500">₩40,000~</div>
                  </div>
                </Link>
                <Link href="/docent"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                  <span className="text-lg">🎞️</span>
                  <div>
                    <div className="font-medium">도슨트 프로그램</div>
                    <div className="text-xs text-slate-500">₩35,000</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link href="/pro" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
            프로 에디션
          </Link>
          <Link href="/magazine" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
            매거진
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/menu"
            className="bg-[#D4AF37] hover:bg-[#F0D060] text-black px-5 py-2 rounded-lg text-sm font-black transition-colors tracking-wide">
            입장권 구매
          </Link>
        </div>

        {/* 모바일 햄버거 */}
        <button className="md:hidden text-white p-1" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0f]/98 border-t border-white/5 px-4 py-5 flex flex-col gap-1">
          <p className="text-slate-600 text-xs uppercase tracking-widest mb-2 px-2">체험 에디션</p>
          <Link href="/experience" onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 px-2 py-3 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
            <span>🎤</span> 녹음 체험
          </Link>
          <Link href="/docent" onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 px-2 py-3 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
            <span>🎞️</span> 도슨트 프로그램
          </Link>
          <div className="h-px bg-white/5 my-2" />
          <Link href="/pro" onClick={() => setMenuOpen(false)}
            className="px-2 py-3 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
            프로 에디션
          </Link>
          <Link href="/magazine" onClick={() => setMenuOpen(false)}
            className="px-2 py-3 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
            매거진
          </Link>
          <Link href="/menu" onClick={() => setMenuOpen(false)}
            className="mt-3 bg-[#D4AF37] text-black text-center py-3.5 rounded-xl font-black text-sm">
            입장권 구매
          </Link>
        </div>
      )}
    </header>
  );
}
