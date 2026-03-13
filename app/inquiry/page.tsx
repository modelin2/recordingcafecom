"use client";
import { useState } from "react";
import Link from "next/link";

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #D3D3D3",
  background: "#FAFAFA",
  padding: "12px 16px",
  fontSize: "15px",
  color: "#000",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "var(--font-dm-sans), sans-serif",
};

export default function InquiryPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "예약문의", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setError("이름, 이메일, 문의 내용은 필수입니다."); return; }
    setSubmitting(true); setError("");
    try {
      const res = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
      setDone(true);
    } catch (e: unknown) { setError(e instanceof Error ? e.message : "서버 오류"); }
    finally { setSubmitting(false); }
  };

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#FAFAFA", minHeight: "100vh" }}>
      {/* 헤더 섹션 */}
      <section style={{ background: "#F0EFEB", borderBottom: "1px solid #D3D3D3", padding: "120px 48px 64px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "16px" }}>1:1 Inquiry</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 400, color: "#000", letterSpacing: "-2px", lineHeight: 1.1 }}>1:1 문의</h1>
          <p style={{ fontSize: "16px", color: "#5F5F5F", lineHeight: 1.75, marginTop: "24px" }}>
            궁금한 점이나 불편사항을 남겨주시면 빠르게 답변드리겠습니다. 평일 기준 24시간 이내 답변 드립니다.
          </p>
        </div>
      </section>

      {/* 폼 섹션 */}
      <section style={{ padding: "72px 48px 120px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          {done ? (
            <div style={{ textAlign: "center", padding: "80px 40px", border: "1px solid #D3D3D3" }}>
              <div style={{ width: "48px", height: "48px", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <span style={{ color: "#FAFAFA", fontSize: "20px" }}>✓</span>
              </div>
              <h2 style={{ fontSize: "22px", fontWeight: 400, color: "#000", letterSpacing: "-0.5px", marginBottom: "12px" }}>문의가 접수되었습니다</h2>
              <p style={{ fontSize: "15px", color: "#5F5F5F", lineHeight: 1.75, marginBottom: "32px" }}>24시간 이내에 이메일로 답변드리겠습니다.</p>
              <Link href="/" style={{ display: "inline-block", background: "#000", color: "#FAFAFA", padding: "12px 32px", fontSize: "14px", textDecoration: "none" }}>홈으로</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#5F5F5F", marginBottom: "8px" }}>이름 <span style={{ color: "#000" }}>*</span></label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="이름" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#5F5F5F", marginBottom: "8px" }}>연락처</label>
                  <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="010-0000-0000" style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#5F5F5F", marginBottom: "8px" }}>이메일 <span style={{ color: "#000" }}>*</span></label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="example@email.com" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#5F5F5F", marginBottom: "8px" }}>문의 유형</label>
                <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} style={inputStyle}>
                  {["예약문의", "프로그램문의", "환불·취소", "기타"].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#5F5F5F", marginBottom: "8px" }}>문의 내용 <span style={{ color: "#000" }}>*</span></label>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="문의하실 내용을 입력해 주세요." rows={6} style={{ ...inputStyle, resize: "none" }} />
              </div>
              {error && <p style={{ fontSize: "13px", color: "#c00" }}>{error}</p>}
              <button type="submit" disabled={submitting} style={{ width: "100%", background: "#000", color: "#FAFAFA", border: "none", padding: "16px", fontSize: "15px", cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.5 : 1, fontFamily: "var(--font-dm-sans), sans-serif" }}>
                {submitting ? "전송 중..." : "문의 보내기"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
