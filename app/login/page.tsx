"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getClient } from "@/lib/supabase";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    getClient()?.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/mypage");
    });
  }, [router]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    const supabase = getClient();
    if (!supabase) {
      setError("서비스 준비 중입니다. 잠시 후 다시 시도해 주세요.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#D4AF37] flex items-center justify-center">
              <span className="text-black font-black text-2xl">K</span>
            </div>
            <span className="text-white font-black text-lg tracking-tight">
              RECORDING <span className="text-[#D4AF37]">CAFÉ</span>
            </span>
          </Link>
          <p className="text-slate-500 text-sm mt-3">마이페이지에 로그인하세요</p>
        </div>

        {/* 로그인 카드 */}
        <div className="bg-[#0f0f18] rounded-2xl border border-white/5 p-8">
          <h2 className="text-white font-black text-xl text-center mb-6">로그인 / 회원가입</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-xs text-center mb-5">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 disabled:opacity-60 text-gray-800 font-bold py-3.5 rounded-xl text-sm transition-colors"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            {loading ? "로그인 중..." : "Google로 계속하기"}
          </button>

          <p className="text-slate-600 text-xs text-center mt-5 leading-relaxed">
            로그인 시{" "}
            <a href="#" className="text-slate-500 hover:text-[#D4AF37] transition-colors">이용약관</a>
            {" "}및{" "}
            <a href="#" className="text-slate-500 hover:text-[#D4AF37] transition-colors">개인정보처리방침</a>에 동의하는 것으로 간주됩니다.
          </p>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
