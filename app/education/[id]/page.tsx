"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";

type Education = {
  id: number;
  title: string;
  subtitle: string | null;
  category: string;
  description: string | null;
  image_url: string | null;
  instructor: string | null;
  instructor_bio: string | null;
  start_date: string;
  end_date: string;
  schedule: string | null;
  total_sessions: number | null;
  venue: string | null;
  price: string | null;
  max_participants: number | null;
  current_participants: number;
  status: string;
};

const inputSt: React.CSSProperties = {
  width: "100%", background: "#FAFAFA", border: "1px solid #D3D3D3",
  padding: "12px 16px", fontSize: "15px", color: "#1A1A1A", outline: "none",
  fontFamily: "var(--font-dm-sans), sans-serif",
};

export default function EducationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [item, setItem] = useState<Education | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", headcount: "1", message: "" });

  useEffect(() => {
    fetch(`/api/education/${id}`)
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
          programType: "education", programId: Number(id),
          programTitle: item?.title ?? "",
          ...form, headcount: Number(form.headcount),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "오류가 발생했습니다.");
      setSubmitted(true);
      setShowForm(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}><p style={{ color: "#8B8675", fontFamily: "var(--font-dm-sans)" }}>Loading...</p></div>;
  if (notFound) return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-dm-sans)", padding: "48px" }}>
      <p style={{ color: "#8B8675", marginBottom: "16px" }}>교육 프로그램을 찾을 수 없습니다.</p>
      <Link href="/education" style={{ color: "#000", fontSize: "14px" }}>← 교육 목록으로</Link>
    </div>
  );

  const isOpen = item?.status === "open";
  const remaining = item?.max_participants ? item.max_participants - item.current_participants : null;

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#FAFAFA", color: "#5F5F5F" }}>

      {/* 상단 바 */}
      <div style={{ background: "#F0EFEB", borderBottom: "1px solid #D3D3D3", padding: "20px 48px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/education" style={{ fontSize: "13px", color: "#8B8675", textDecoration: "none", letterSpacing: "0.5px" }}>← 교육 목록</Link>
          <span style={{ color: "#D3D3D3" }}>/</span>
          <span style={{ fontSize: "13px", color: "#1A1A1A" }}>{item?.title}</span>
        </div>
      </div>

      {/* 본문 */}
      <section style={{ padding: "64px 48px 120px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: "0" }}>

            {/* 왼쪽 */}
            <div className="lg:col-span-2" style={{ paddingRight: "64px", borderRight: "1px solid #D3D3D3" }}>
              {/* 헤더 */}
              <div style={{ marginBottom: "48px" }}>
                <span style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", padding: "4px 12px", background: "#F0EFEB", color: "#8B8675", border: "1px solid #D3D3D3", marginBottom: "20px" }}>
                  {item?.category}
                </span>
                <h1 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 400, color: "#000", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: "12px" }}>{item?.title}</h1>
                {item?.subtitle && <p style={{ fontSize: "18px", color: "#8B8675" }}>{item.subtitle}</p>}
              </div>

              {/* 썸네일 */}
              {item?.image_url && (
                <div style={{ marginBottom: "48px", overflow: "hidden" }}>
                  <img src={item.image_url} alt={item.title} style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }} />
                </div>
              )}

              {/* 강사 */}
              {item?.instructor && (
                <div style={{ marginBottom: "48px", padding: "32px", background: "#F0EFEB", border: "1px solid #D3D3D3" }}>
                  <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "12px" }}>Instructor</p>
                  <p style={{ fontSize: "18px", fontWeight: 500, color: "#000", marginBottom: "12px" }}>{item.instructor}</p>
                  {item.instructor_bio && <p style={{ fontSize: "15px", color: "#5F5F5F", lineHeight: 1.75 }}>{item.instructor_bio}</p>}
                </div>
              )}

              {/* 설명 */}
              <div>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "24px" }}>About</p>
                <div style={{ fontSize: "16px", lineHeight: 1.8, color: "#5F5F5F", whiteSpace: "pre-wrap" }}>
                  {item?.description ?? "상세 내용이 준비 중입니다."}
                </div>
              </div>
            </div>

            {/* 오른쪽 신청 패널 */}
            <div style={{ paddingLeft: "48px" }}>
              <div style={{ position: "sticky", top: "96px" }}>
                {/* 요약 정보 */}
                <div style={{ border: "1px solid #D3D3D3", marginBottom: "24px" }}>
                  <div style={{ background: "#000", padding: "24px" }}>
                    {item?.price && <p style={{ fontSize: "28px", fontWeight: 400, color: "#DFCF99", letterSpacing: "-1px", marginBottom: "4px" }}>{item.price}</p>}
                    <p style={{ fontSize: "13px", color: "rgba(250,250,250,0.4)" }}>{item?.total_sessions}회 과정</p>
                  </div>
                  <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                    {[
                      { label: "기간",  value: `${item?.start_date} – ${item?.end_date}` },
                      { label: "일정",  value: item?.schedule ?? "-" },
                      { label: "장소",  value: item?.venue ?? "레코딩카페" },
                      { label: "정원",  value: item?.max_participants ? `${item.max_participants}명` : "제한 없음" },
                      remaining !== null ? { label: "잔여", value: `${remaining}명` } : null,
                    ].filter(Boolean).map((row) => (
                      <div key={row!.label} style={{ display: "flex", justifyContent: "space-between", gap: "16px", borderBottom: "1px solid #F0EFEB", paddingBottom: "12px" }}>
                        <p style={{ fontSize: "12px", color: "#8B8675", fontWeight: 500, textTransform: "uppercase", letterSpacing: "1px" }}>{row!.label}</p>
                        <p style={{ fontSize: "14px", color: "#1A1A1A", textAlign: "right" }}>{row!.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {submitted ? (
                  <div style={{ padding: "24px", background: "#F0EFEB", border: "1px solid #D3D3D3", textAlign: "center" }}>
                    <p style={{ fontSize: "14px", color: "#22C55E", fontWeight: 500, marginBottom: "8px" }}>✓ 신청 완료</p>
                    <p style={{ fontSize: "13px", color: "#8B8675" }}>담당자가 연락드립니다.</p>
                  </div>
                ) : isOpen ? (
                  <>
                    <button onClick={() => setShowForm(!showForm)}
                      style={{ width: "100%", padding: "16px", background: "#000", color: "#FAFAFA", fontSize: "15px", fontWeight: 500, border: "none", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif", marginBottom: "0" }}>
                      {showForm ? "신청 접기" : "수강 신청하기 →"}
                    </button>
                    {showForm && (
                      <form onSubmit={handleApply} style={{ border: "1px solid #D3D3D3", borderTop: "none", padding: "24px", display: "flex", flexDirection: "column", gap: "14px", background: "#FAFAFA" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", color: "#8B8675", marginBottom: "6px" }}>이름 *</label>
                          <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="실명" style={inputSt} />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", color: "#8B8675", marginBottom: "6px" }}>연락처 *</label>
                          <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="010-0000-0000" style={inputSt} />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", color: "#8B8675", marginBottom: "6px" }}>이메일</label>
                          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="example@email.com" style={inputSt} />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", color: "#8B8675", marginBottom: "6px" }}>신청 인원</label>
                          <input type="number" min="1" value={form.headcount} onChange={e => setForm({ ...form, headcount: e.target.value })} style={inputSt} />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", color: "#8B8675", marginBottom: "6px" }}>문의 사항</label>
                          <textarea rows={2} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputSt, resize: "none" }} />
                        </div>
                        {error && <p style={{ color: "#B00", fontSize: "13px" }}>{error}</p>}
                        <button type="submit" disabled={submitting}
                          style={{ padding: "14px", background: "#000", color: "#FAFAFA", fontSize: "14px", fontWeight: 500, border: "none", cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.5 : 1, fontFamily: "var(--font-dm-sans), sans-serif" }}>
                          {submitting ? "제출 중..." : "신청 완료하기"}
                        </button>
                      </form>
                    )}
                  </>
                ) : (
                  <div style={{ padding: "16px", background: "#F0EFEB", border: "1px solid #D3D3D3", textAlign: "center" }}>
                    <p style={{ fontSize: "14px", color: "#8B8675" }}>수강 신청이 마감되었습니다</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
