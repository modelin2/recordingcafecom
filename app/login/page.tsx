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
    <div style={{
      minHeight: "100vh",
      background: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 16px",
      fontFamily: "var(--font-dm-sans), sans-serif",
    }}>
      <div style={{ width: "100%", maxWidth: 360 }}>
        {/* 로고 */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Link href="/" style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
          }}>
            <div style={{
              width: 32,
              height: 32,
              background: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <span style={{ color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>RC</span>
            </div>
            <span style={{
              color: "#000",
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}>
              Recording Café
            </span>
          </Link>
        </div>

        {/* 로그인 카드 */}
        <div style={{
          background: "#FAFAFA",
          border: "1px solid #D3D3D3",
          padding: 40,
        }}>
          <h2 style={{
            color: "#000",
            fontWeight: 400,
            fontSize: 20,
            letterSpacing: "-1px",
            textAlign: "center",
            marginBottom: 8,
            marginTop: 0,
          }}>
            로그인 / 회원가입
          </h2>
          <p style={{
            color: "#5F5F5F",
            fontSize: 14,
            fontWeight: 400,
            textAlign: "center",
            marginBottom: 28,
            marginTop: 0,
          }}>
            마이페이지를 이용하려면 로그인하십시오.
          </p>

          {error && (
            <div style={{
              color: "#dc2626",
              fontSize: 12,
              textAlign: "center",
              marginBottom: 20,
              padding: "10px 0",
            }}>
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              background: "#fff",
              border: "1px solid #D3D3D3",
              borderRadius: 0,
              padding: "13px 0",
              color: "#000",
              fontSize: 13,
              fontWeight: 400,
              fontFamily: "var(--font-dm-sans), sans-serif",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? (
              <span style={{ color: "#5F5F5F", fontSize: 13 }}>로그인 중...</span>
            ) : (
              <>
                <svg style={{ width: 18, height: 18, flexShrink: 0 }} viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google로 계속하기
              </>
            )}
          </button>

          <p style={{
            color: "#5F5F5F",
            fontSize: 11,
            textAlign: "center",
            marginTop: 20,
            marginBottom: 0,
            lineHeight: 1.7,
          }}>
            로그인 시{" "}
            <a href="#" style={{ color: "#8B8675", textDecoration: "none" }}>이용약관</a>
            {" "}및{" "}
            <a href="#" style={{ color: "#8B8675", textDecoration: "none" }}>개인정보처리방침</a>에 동의하는 것으로 간주됩니다.
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/" style={{ color: "#5F5F5F", fontSize: 12, textDecoration: "none" }}>
            ← 홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
