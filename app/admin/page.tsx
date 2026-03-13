"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const ADMIN_PASSWORD = "0060alsdk!";
const COOKIE_NAME = "rc_admin_auth";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// ─── 로그인 화면 ────────────────────────────────────────────────────────────
function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      setCookie(COOKIE_NAME, "1", 7);
      onSuccess();
    } else {
      setError("비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FAFAFA",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-dm-sans), sans-serif",
    }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "0 24px" }}>
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", background: "#000", marginBottom: "20px" }}>
            <span style={{ color: "#FAFAFA", fontSize: "12px", fontWeight: 700 }}>RC</span>
          </div>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "8px" }}>Admin</p>
          <h1 style={{ fontSize: "24px", fontWeight: 400, color: "#000", letterSpacing: "-0.5px" }}>관리자 로그인</h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", color: "#5F5F5F", marginBottom: "8px" }}>비밀번호</label>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              autoFocus
              style={{
                width: "100%",
                border: "1px solid #D3D3D3",
                background: "#FAFAFA",
                padding: "12px 16px",
                fontSize: "15px",
                color: "#000",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            />
          </div>
          {error && <p style={{ fontSize: "13px", color: "#c00" }}>{error}</p>}
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#000",
              color: "#FAFAFA",
              border: "none",
              padding: "14px",
              fontSize: "15px",
              cursor: "pointer",
              fontFamily: "var(--font-dm-sans), sans-serif",
              letterSpacing: "0.5px",
            }}
          >
            로그인
          </button>
        </form>
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <Link href="/" style={{ fontSize: "13px", color: "#8B8675", textDecoration: "none" }}>← 홈으로</Link>
        </div>
      </div>
    </div>
  );
}

// ─── 어드민 대시보드 ────────────────────────────────────────────────────────
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [bookings, setBookings] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"bookings" | "notices">("bookings");

  useEffect(() => {
    fetch("/api/bookings")
      .then(r => r.json())
      .then(data => setBookings(Array.isArray(data) ? data : []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "#8B8675",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", fontFamily: "var(--font-dm-sans), sans-serif" }}>
      {/* 헤더 */}
      <div style={{ background: "#000", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#FAFAFA", fontSize: "12px", fontWeight: 700, letterSpacing: "1px" }}>RC ADMIN</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link href="/" style={{ fontSize: "13px", color: "rgba(250,250,250,0.6)", textDecoration: "none" }}>홈 →</Link>
          <button
            onClick={onLogout}
            style={{ background: "none", border: "1px solid rgba(250,250,250,0.2)", color: "rgba(250,250,250,0.6)", padding: "6px 16px", fontSize: "12px", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            로그아웃
          </button>
        </div>
      </div>

      {/* 탭 */}
      <div style={{ borderBottom: "1px solid #D3D3D3", padding: "0 48px", display: "flex", gap: "0" }}>
        {[
          { key: "bookings", label: "예약 관리" },
          { key: "notices", label: "공지사항" },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as "bookings" | "notices")}
            style={{
              padding: "16px 24px",
              fontSize: "13px",
              fontWeight: activeTab === tab.key ? 500 : 400,
              color: activeTab === tab.key ? "#000" : "#8B8675",
              borderBottom: activeTab === tab.key ? "2px solid #000" : "2px solid transparent",
              background: "none",
              border: "none",
              borderBottom: activeTab === tab.key ? "2px solid #000" : "2px solid transparent",
              cursor: "pointer",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 콘텐츠 */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px" }}>
        {activeTab === "bookings" && (
          <>
            <div style={{ marginBottom: "32px" }}>
              <p style={labelStyle}>예약 목록</p>
              <h1 style={{ fontSize: "32px", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginTop: "8px" }}>
                {loading ? "불러오는 중..." : `총 ${bookings.length}건`}
              </h1>
            </div>

            {loading ? (
              <div style={{ textAlign: "center", padding: "80px", color: "#8B8675" }}>불러오는 중...</div>
            ) : bookings.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px", border: "1px solid #D3D3D3" }}>
                <p style={labelStyle}>예약 없음</p>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #D3D3D3" }}>
                      {["ID", "이름", "이메일", "연락처", "예약일", "시간", "경로", "금액", "접수일"].map(h => (
                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase", color: "#8B8675" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #D3D3D3" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#F0EFEB")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                      >
                        <td style={{ padding: "14px 16px", color: "#8B8675" }}>{String(b.id ?? "")}</td>
                        <td style={{ padding: "14px 16px", color: "#000", fontWeight: 500 }}>{String(b.name ?? "")}</td>
                        <td style={{ padding: "14px 16px", color: "#5F5F5F" }}>{String(b.email ?? "")}</td>
                        <td style={{ padding: "14px 16px", color: "#5F5F5F" }}>{String(b.phone ?? "")}</td>
                        <td style={{ padding: "14px 16px", color: "#5F5F5F" }}>{String(b.booking_date ?? "")}</td>
                        <td style={{ padding: "14px 16px", color: "#5F5F5F" }}>{String(b.booking_time ?? "")}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase", padding: "3px 8px", background: "#F0EFEB", color: "#6B625A" }}>
                            {String(b.booking_path ?? "")}
                          </span>
                        </td>
                        <td style={{ padding: "14px 16px", color: "#000", fontWeight: 500 }}>
                          {b.total_price ? `₩${Number(b.total_price).toLocaleString()}` : "-"}
                        </td>
                        <td style={{ padding: "14px 16px", color: "#8B8675", fontSize: "12px" }}>
                          {b.created_at ? new Date(String(b.created_at)).toLocaleDateString("ko-KR") : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {activeTab === "notices" && (
          <div style={{ textAlign: "center", padding: "80px", border: "1px solid #D3D3D3" }}>
            <p style={labelStyle}>공지사항 관리</p>
            <p style={{ fontSize: "16px", color: "#5F5F5F", marginTop: "16px" }}>
              공지사항 관리 기능은 준비 중입니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── 메인 ────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(getCookie(COOKIE_NAME) === "1");
  }, []);

  const handleLogout = () => {
    deleteCookie(COOKIE_NAME);
    setAuthed(false);
  };

  if (authed === null) return null; // hydration

  if (!authed) return <LoginForm onSuccess={() => setAuthed(true)} />;

  return <AdminDashboard onLogout={handleLogout} />;
}
