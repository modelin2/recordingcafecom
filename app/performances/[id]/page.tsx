"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";

type Performance = {
  id: number;
  title: string;
  subtitle: string | null;
  category: string;
  description: string | null;
  image_url: string | null;
  start_date: string;
  end_date: string;
  venue: string | null;
  price: string | null;
  max_participants: number | null;
  current_participants: number;
  status: string;
};

const inputSt: React.CSSProperties = {
  width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
  padding: "12px 16px", fontSize: "15px", color: "#FAFAFA", outline: "none",
  fontFamily: "var(--font-dm-sans), sans-serif",
};

export default function PerformanceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [item, setItem] = useState<Performance | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", headcount: "1", message: "" });

  useEffect(() => {
    fetch(`/api/performances/${id}`)
      .then(r => r.json())
      .then(data => {
        if (data.error || !data.item) setNotFound(true);
        else setItem(data.item);
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [id]);

  async function handleApply(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/program-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programType: "performance", programId: Number(id),
          programTitle: item?.title ?? "",
          ...form, headcount: Number(form.headcount),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "오류가 발생했습니다.");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0A0A0A" }}><p style={{ color: "#8B8675", fontFamily: "var(--font-dm-sans)" }}>Loading...</p></div>;
  if (notFound) return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#0A0A0A", fontFamily: "var(--font-dm-sans)", padding: "48px" }}>
      <p style={{ color: "#8B8675", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>Not Found</p>
      <p style={{ color: "#FAFAFA", fontSize: "24px", fontWeight: 400, marginBottom: "32px" }}>공연을 찾을 수 없습니다</p>
      <Link href="/performances" style={{ color: "#DFCF99", textDecoration: "none", fontSize: "14px" }}>← 공연 목록으로</Link>
    </div>
  );

  const isOpen = item?.status === "open";

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#0A0A0A", color: "#FAFAFA", minHeight: "100vh" }}>

      {/* 히어로 */}
      <section style={{ position: "relative", minHeight: "70vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        {item?.image_url ? (
          <img src={item.image_url} alt={item.title}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: "#1A1A1A" }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.3) 60%, transparent 100%)" }} />
        <div style={{ position: "relative", padding: "0 48px 64px", maxWidth: "1280px", width: "100%" }}>
          <Link href="/performances" style={{ display: "inline-block", fontSize: "12px", letterSpacing: "1px", color: "#8B8675", textDecoration: "none", marginBottom: "24px", textTransform: "uppercase" }}>← 공연 목록</Link>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#DFCF99", marginBottom: "16px" }}>{item?.category}</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 72px)", fontWeight: 400, color: "#FAFAFA", letterSpacing: "-2px", lineHeight: 1.05, marginBottom: "16px" }}>{item?.title}</h1>
          {item?.subtitle && <p style={{ fontSize: "18px", color: "rgba(250,250,250,0.6)", marginBottom: "24px" }}>{item.subtitle}</p>}
          <p style={{ fontSize: "14px", color: "rgba(250,250,250,0.45)", letterSpacing: "0.5px" }}>
            {item?.start_date} – {item?.end_date} &nbsp;·&nbsp; {item?.venue}
          </p>
        </div>
      </section>

      {/* 상세 + 신청 */}
      <section style={{ padding: "64px 48px 120px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: "0" }}>

            {/* 본문 */}
            <div className="lg:col-span-2" style={{ paddingRight: "64px", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "24px" }}>About</p>
              <div style={{ fontSize: "16px", lineHeight: 1.8, color: "rgba(250,250,250,0.7)", whiteSpace: "pre-wrap" }}>
                {item?.description ?? "상세 내용이 준비 중입니다."}
              </div>

              {/* 공연 정보 */}
              <div style={{ marginTop: "64px", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "40px" }}>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "32px" }}>Info</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {[
                    { label: "기간", value: `${item?.start_date} – ${item?.end_date}` },
                    { label: "장소", value: item?.venue ?? "-" },
                    { label: "가격", value: item?.price ?? "별도 문의" },
                    { label: "정원", value: item?.max_participants ? `${item.max_participants}명` : "제한 없음" },
                    { label: "접수", value: isOpen ? "접수 중" : "접수 마감" },
                  ].map((row) => (
                    <div key={row.label} style={{ display: "flex", gap: "32px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "20px" }}>
                      <p style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "#8B8675", minWidth: "60px" }}>{row.label}</p>
                      <p style={{ fontSize: "15px", color: "#FAFAFA" }}>{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 신청 패널 */}
            <div style={{ paddingLeft: "64px" }}>
              <div style={{ position: "sticky", top: "96px" }}>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "24px" }}>신청</p>
                {item?.price && <p style={{ fontSize: "32px", fontWeight: 400, color: "#DFCF99", letterSpacing: "-1px", marginBottom: "24px" }}>{item.price}</p>}
                {isOpen ? (
                  <button onClick={() => setShowModal(true)}
                    style={{ width: "100%", padding: "18px", background: "#FAFAFA", color: "#000", fontSize: "15px", fontWeight: 500, border: "none", cursor: "pointer", letterSpacing: "0.5px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    신청하기 →
                  </button>
                ) : (
                  <div style={{ padding: "18px", background: "rgba(255,255,255,0.06)", textAlign: "center" }}>
                    <p style={{ fontSize: "14px", color: "#8B8675" }}>접수가 마감되었습니다</p>
                  </div>
                )}
                <p style={{ fontSize: "13px", color: "rgba(250,250,250,0.3)", marginTop: "16px", lineHeight: 1.6 }}>
                  신청 후 담당자가 1~2 영업일 내에 연락드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 신청 모달 */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
          <div onClick={() => setShowModal(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)" }} />
          <div style={{ position: "relative", width: "100%", maxWidth: "480px", height: "100vh", background: "#111", overflowY: "auto", padding: "48px 40px" }}>
            <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: "24px", right: "24px", background: "none", border: "none", color: "#8B8675", fontSize: "20px", cursor: "pointer" }}>✕</button>
            {submitted ? (
              <div style={{ paddingTop: "40px" }}>
                <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#DFCF99", marginBottom: "24px" }}>Submitted</p>
                <h3 style={{ fontSize: "24px", fontWeight: 400, color: "#FAFAFA", marginBottom: "16px" }}>신청이 완료되었습니다</h3>
                <p style={{ fontSize: "15px", color: "rgba(250,250,250,0.5)", lineHeight: 1.75 }}>담당자가 1~2 영업일 내에 연락드립니다.</p>
              </div>
            ) : (
              <>
                <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "16px" }}>Apply</p>
                <h3 style={{ fontSize: "20px", fontWeight: 400, color: "#FAFAFA", marginBottom: "8px", lineHeight: 1.3 }}>{item?.title}</h3>
                <p style={{ fontSize: "13px", color: "#8B8675", marginBottom: "36px" }}>{item?.start_date} – {item?.end_date}</p>
                <form onSubmit={handleApply} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "rgba(250,250,250,0.5)", marginBottom: "8px" }}>이름 *</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="실명" style={inputSt} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "rgba(250,250,250,0.5)", marginBottom: "8px" }}>연락처 *</label>
                    <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="010-0000-0000" style={inputSt} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "rgba(250,250,250,0.5)", marginBottom: "8px" }}>이메일</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="example@email.com" style={inputSt} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "rgba(250,250,250,0.5)", marginBottom: "8px" }}>신청 인원 *</label>
                    <input required type="number" min="1" value={form.headcount} onChange={e => setForm({ ...form, headcount: e.target.value })} style={inputSt} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "rgba(250,250,250,0.5)", marginBottom: "8px" }}>문의 사항</label>
                    <textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputSt, resize: "none" }} />
                  </div>
                  {error && <p style={{ color: "#F88", fontSize: "13px" }}>{error}</p>}
                  <button type="submit" disabled={submitting}
                    style={{ padding: "16px", background: "#FAFAFA", color: "#000", fontSize: "15px", fontWeight: 500, border: "none", cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.5 : 1, fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    {submitting ? "제출 중..." : "신청 완료하기"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
