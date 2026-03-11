"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Check } from "lucide-react";

const EXHIBITS = [
  {
    num: "01",
    title: "원 테이크의 기적",
    en: "The One-Take Miracle",
    desc: "서태지와 아이들, H.O.T, 젝스키스 — 1990년대 K-POP을 탄생시킨 레전드들이 단 한 번의 녹음으로 완성한 명곡들의 실제 릴테이프입니다. 오리지널 릴테이프 실물 관람 및 해설이 포함됩니다.",
    detail: "오리지널 릴테이프 실물 관람 · 해설 포함 · 일부 구간 재생 시연",
  },
  {
    num: "02",
    title: "스튜디오의 마법사들",
    en: "The Studio Wizards",
    desc: "이수만, 박진영, 방시혁이 세계를 정복하기 훨씬 전, 이 스튜디오에서 수십 번의 시도 끝에 탄생한 히트곡의 비밀을 공개합니다. 프로듀서 작업 노트와 믹싱 보드 시연이 포함됩니다.",
    detail: "프로듀서 작업 노트 · 믹싱 보드 시연 · 비하인드 스토리",
  },
  {
    num: "03",
    title: "릴테이프에서 스트리밍으로",
    en: "From Reel to Streaming",
    desc: "1990년대 두꺼운 릴테이프로 시작해 2020년대 AI 마스터링까지. K-POP이 30년간 걸어온 기술 혁신의 여정을 연대기 전시와 실제 음질 비교 청음으로 확인하십시오.",
    detail: "연대기 전시 · 장비 변천사 · 실제 음질 비교 청음",
  },
  {
    num: "04",
    title: "지금 이 순간, 들려드립니다",
    en: "Listen Now",
    desc: "전시의 마지막은 실제 청음 체험입니다. 디지털로 복원된 레전드들의 보컬 원본을 전문 모니터 스피커로 직접 들어보십시오. 도슨트 해설이 동반됩니다.",
    detail: "전문 모니터 스피커 청음 · 원본 보컬 트랙 공개 · 도슨트 해설 동반",
  },
];

const TOURS = [
  { time: "10:30", lang: "English", available: true },
  { time: "12:00", lang: "中文", available: true },
  { time: "14:00", lang: "English", available: true },
  { time: "15:30", lang: "日本語", available: true },
  { time: "17:00", lang: "English", available: true },
  { time: "18:30", lang: "中文", available: false },
  { time: "19:30", lang: "日本語", available: true },
];

function BookingModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", time: "", language: "영어", headcount: "2" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time) { setError("필수 항목을 모두 입력해주세요."); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email, phone: form.phone,
          booking_date: form.date, booking_time: form.time,
          drinks: `언어: ${form.language}, 인원: ${form.headcount}명`,
          booking_path: "docent", total_price: 35000,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setDone(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "오류가 발생했습니다.");
    } finally { setSubmitting(false); }
  };

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid #D3D3D3",
    background: "#FAFAFA",
    padding: "10px 14px",
    fontSize: "14px",
    color: "#000000",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "var(--font-dm-sans), sans-serif",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "12px",
    color: "#5F5F5F",
    marginBottom: "6px",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.65)", padding: "16px" }}>
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #D3D3D3",
          width: "100%",
          maxWidth: "480px",
          maxHeight: "90vh",
          overflowY: "auto",
          fontFamily: "var(--font-dm-sans), sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 28px", borderBottom: "1px solid #D3D3D3" }}>
          <div>
            <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px" }}>
              Ticket Booking
            </p>
            <h3 style={{ fontSize: "18px", fontWeight: 400, color: "#000000", letterSpacing: "-1px" }}>도슨트 투어 예약</h3>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#5F5F5F" }}>
            <X style={{ width: "20px", height: "20px" }} />
          </button>
        </div>

        {done ? (
          <div style={{ padding: "48px 28px", textAlign: "center" }}>
            <div style={{ width: "48px", height: "48px", background: "#000000", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <Check style={{ width: "24px", height: "24px", color: "#FFFFFF" }} />
            </div>
            <h4 style={{ fontSize: "20px", fontWeight: 400, color: "#000000", marginBottom: "8px", letterSpacing: "-1px" }}>예약이 완료되었습니다</h4>
            <p style={{ fontSize: "14px", color: "#5F5F5F", lineHeight: 1.75, marginBottom: "28px" }}>담당자가 확인 후 연락드리겠습니다.</p>
            <button onClick={onClose} style={{ background: "#000000", color: "#FFFFFF", border: "none", padding: "12px 32px", fontSize: "14px", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif" }}>
              닫기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: "28px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>이름 *</label>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="홍길동" style={fieldStyle} />
                </div>
                <div>
                  <label style={labelStyle}>전화번호 *</label>
                  <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="010-0000-0000" style={fieldStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>이메일</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="example@email.com" style={fieldStyle} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>날짜 *</label>
                  <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} min={new Date().toISOString().split("T")[0]} style={fieldStyle} />
                </div>
                <div>
                  <label style={labelStyle}>시간 *</label>
                  <select value={form.time} onChange={e => setForm({...form, time: e.target.value})} style={fieldStyle}>
                    <option value="">선택</option>
                    {TOURS.filter(t => t.available).map(t => (
                      <option key={t.time} value={t.time}>{t.time}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>해설 언어</label>
                  <select value={form.language} onChange={e => setForm({...form, language: e.target.value})} style={fieldStyle}>
                    <option>영어</option>
                    <option>중국어</option>
                    <option>일본어</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>인원수</label>
                  <select value={form.headcount} onChange={e => setForm({...form, headcount: e.target.value})} style={fieldStyle}>
                    {["1","2","3","4","5","6+"].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
              </div>
              {error && <p style={{ fontSize: "13px", color: "#c00000" }}>{error}</p>}
              <div style={{ paddingTop: "12px", borderTop: "1px solid #D3D3D3" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#5F5F5F", marginBottom: "14px" }}>
                  <span>입장료</span>
                  <span style={{ color: "#000000", fontWeight: 500 }}>₩35,000 / 인</span>
                </div>
                <button type="submit" disabled={submitting}
                  style={{
                    width: "100%",
                    background: "#000000",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "14px",
                    fontSize: "14px",
                    cursor: submitting ? "not-allowed" : "pointer",
                    opacity: submitting ? 0.5 : 1,
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    letterSpacing: "1px",
                  }}>
                  {submitting ? "처리 중..." : "입장권 예약"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function DocentPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#FAFAFA", minHeight: "100vh" }}>
      {modalOpen && <BookingModal onClose={() => setModalOpen(false)} />}

      {/* ── 히어로 ── */}
      <section style={{ position: "relative", minHeight: "70vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/images/control-room.png" alt="도슨트 투어" fill style={{ objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.40) 60%, rgba(0,0,0,0.10) 100%)" }} />
        </div>

        {/* 상단 경로 */}
        <div style={{ position: "absolute", top: "80px", left: 0, right: 0, padding: "0 24px", display: "flex", gap: "8px", alignItems: "center", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>홈</Link>
          <span>/</span>
          <Link href="/experience" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>체험 에디션</Link>
          <span>/</span>
          <span style={{ color: "rgba(255,255,255,0.8)" }}>도슨트 프로그램</span>
        </div>

        <div style={{ position: "relative", width: "100%", maxWidth: "1152px", margin: "0 auto", padding: "0 24px 64px" }}>
          <p
            style={{
              fontSize: "11px",
              color: "#DFCF99",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            도슨트 프로그램
          </p>
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 400,
              color: "#FFFFFF",
              letterSpacing: "-2px",
              lineHeight: 1.1,
              marginBottom: "20px",
              whiteSpace: "pre-line",
            }}
          >
            {"K-POP 30년의 역사를\n직접 만나십시오"}
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.75, maxWidth: "480px", marginBottom: "36px" }}>
            한국 K-POP 30년의 역사를 만들어온 레전드들의 실제 녹음 릴테이프를 전문 도슨트와 함께 관람합니다.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
            <button
              onClick={() => setModalOpen(true)}
              style={{
                background: "#FFFFFF",
                color: "#000000",
                border: "none",
                padding: "14px 32px",
                fontSize: "14px",
                cursor: "pointer",
                fontFamily: "var(--font-dm-sans), sans-serif",
                letterSpacing: "0.5px",
              }}
            >
              입장권 예약
            </button>
            <div style={{ display: "flex", gap: "20px", fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
              <span>소요 50분</span>
              <span>₩35,000/인</span>
              <span>EN · 中文 · 日本語</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 프로그램 개요 ── */}
      <section style={{ background: "#FAFAFA", padding: "96px 0", borderBottom: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1px", background: "#D3D3D3" }}>
            {[
              { label: "원본 릴테이프", value: "30+", desc: "레전드 아티스트" },
              { label: "전시 시간", value: "50분", desc: "도슨트 동반" },
              { label: "해설 언어", value: "3개국어", desc: "EN · 中文 · 日本語" },
              { label: "입장료", value: "₩35,000", desc: "성인 1인 기준" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#FAFAFA", padding: "40px 32px" }}>
                <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>{s.label}</p>
                <p style={{ fontSize: "36px", fontWeight: 400, color: "#000000", letterSpacing: "-1px", marginBottom: "6px" }}>{s.value}</p>
                <p style={{ fontSize: "14px", color: "#5F5F5F" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 전시 하이라이트 ── */}
      <section style={{ background: "#F0EFEB", padding: "96px 0", borderBottom: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
            전시 구성
          </p>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 400, color: "#000000", letterSpacing: "-1px", marginBottom: "48px" }}>
            4개 섹션으로 구성된 전시
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {EXHIBITS.map((ex, i) => (
              <div
                key={i}
                style={{
                  borderTop: "1px solid #D3D3D3",
                  padding: "40px 0",
                  display: "grid",
                  gridTemplateColumns: "80px 1fr 280px",
                  gap: "32px",
                  alignItems: "start",
                }}
              >
                <p style={{ fontSize: "48px", fontWeight: 400, color: "#D3D3D3", letterSpacing: "-2px", lineHeight: 1 }}>{ex.num}</p>
                <div>
                  <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>{ex.en}</p>
                  <h3 style={{ fontSize: "22px", fontWeight: 400, color: "#000000", letterSpacing: "-0.5px", marginBottom: "12px" }}>{ex.title}</h3>
                  <p style={{ fontSize: "15px", color: "#5F5F5F", lineHeight: 1.75 }}>{ex.desc}</p>
                </div>
                <div style={{ border: "1px solid #D3D3D3", background: "#FAFAFA", padding: "20px" }}>
                  <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>포함 내용</p>
                  <p style={{ fontSize: "13px", color: "#5F5F5F", lineHeight: 1.75 }}>{ex.detail}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #D3D3D3" }} />
          </div>
        </div>
      </section>

      {/* ── 투어 스케줄 ── */}
      <section style={{ background: "#FAFAFA", padding: "96px 0", borderBottom: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "64px", alignItems: "start" }}>
            {/* 스케줄 */}
            <div>
              <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
                Daily Schedule
              </p>
              <h2 style={{ fontSize: "clamp(24px, 2.5vw, 36px)", fontWeight: 400, color: "#000000", letterSpacing: "-1px", marginBottom: "8px" }}>
                오늘의 투어 일정
              </h2>
              <p style={{ fontSize: "14px", color: "#5F5F5F", marginBottom: "32px" }}>매일 운영 · 사전 예약 필수</p>
              <div style={{ border: "1px solid #D3D3D3" }}>
                {TOURS.map((tour, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 20px",
                      borderBottom: i < TOURS.length - 1 ? "1px solid #D3D3D3" : "none",
                      opacity: tour.available ? 1 : 0.4,
                      background: "#FAFAFA",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                      <span style={{ fontSize: "16px", fontWeight: 500, color: "#000000", minWidth: "48px" }}>{tour.time}</span>
                      <span style={{ fontSize: "14px", color: "#5F5F5F" }}>{tour.lang}</span>
                    </div>
                    {tour.available ? (
                      <button
                        onClick={() => setModalOpen(true)}
                        style={{
                          fontSize: "11px",
                          color: "#000000",
                          border: "1px solid #D3D3D3",
                          background: "transparent",
                          padding: "6px 14px",
                          cursor: "pointer",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          fontFamily: "var(--font-dm-sans), sans-serif",
                        }}
                      >
                        예약
                      </button>
                    ) : (
                      <span style={{ fontSize: "11px", color: "#D3D3D3", letterSpacing: "1px", textTransform: "uppercase" }}>마감</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 입장 안내 */}
            <div>
              <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
                Admission
              </p>
              <h2 style={{ fontSize: "clamp(24px, 2.5vw, 36px)", fontWeight: 400, color: "#000000", letterSpacing: "-1px", marginBottom: "32px" }}>
                입장 안내
              </h2>
              <div style={{ border: "1px solid #D3D3D3", marginBottom: "24px" }}>
                {[
                  { label: "일반 입장", price: "₩35,000", desc: "성인 1인" },
                  { label: "단체 (10인+)", price: "₩28,000", desc: "10명 이상 그룹" },
                  { label: "녹음 체험 콤보", price: "₩65,000", desc: "도슨트 투어 + 녹음 체험" },
                ].map((tier, i, arr) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px 20px",
                      borderBottom: i < arr.length - 1 ? "1px solid #D3D3D3" : "none",
                      background: "#FAFAFA",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 500, color: "#000000", marginBottom: "2px" }}>{tier.label}</p>
                      <p style={{ fontSize: "12px", color: "#5F5F5F" }}>{tier.desc}</p>
                    </div>
                    <p style={{ fontSize: "18px", fontWeight: 400, color: "#000000", letterSpacing: "-0.5px" }}>{tier.price}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setModalOpen(true)}
                style={{
                  width: "100%",
                  background: "#000000",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "16px",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  letterSpacing: "1px",
                }}
              >
                입장권 예약하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 하단 CTA ── */}
      <section style={{ background: "#F0EFEB", padding: "72px 24px", borderTop: "1px solid #D3D3D3", textAlign: "center" }}>
        <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
          함께하면 더 특별합니다
        </p>
        <h3 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 400, color: "#000000", letterSpacing: "-1px", marginBottom: "32px" }}>
          녹음 체험과 결합하실 수 있습니다
        </h3>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/experience"
            style={{
              display: "inline-block",
              border: "1px solid #D3D3D3",
              background: "#FAFAFA",
              color: "#000000",
              padding: "13px 28px",
              fontSize: "14px",
              textDecoration: "none",
              letterSpacing: "0.5px",
            }}
          >
            녹음 체험 보기
          </Link>
          <Link
            href="/"
            style={{
              display: "inline-block",
              color: "#5F5F5F",
              textDecoration: "none",
              fontSize: "14px",
              padding: "13px 28px",
              letterSpacing: "0.5px",
            }}
          >
            홈으로
          </Link>
        </div>
      </section>
    </div>
  );
}
