"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Check } from "lucide-react";

// ─── 도슨트 예약 모달 ────────────────────────────────────────────────────────
function DocentBookingModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    language: "영어",
    headcount: "2",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.date || !form.time) {
      setError("모든 필수 항목을 입력해주세요.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          booking_date: form.date,
          booking_time: form.time,
          booking_path: "docent",
          drinks: `언어: ${form.language}, 인원: ${form.headcount}명`,
          mixing_option: "basic",
          video_option: "self",
          wants_album: false,
          wants_pro_album: false,
          wants_lp: false,
          total_price: 35000 * parseInt(form.headcount),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "서버 오류");
      setDone(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "서버 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
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
        {/* 모달 헤더 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 28px",
            borderBottom: "1px solid #D3D3D3",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "11px",
                color: "#8B8675",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              Ticket Booking
            </p>
            <h3 style={{ fontSize: "18px", fontWeight: 400, color: "#000000", letterSpacing: "-1px" }}>
              도슨트 투어 예약
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#5F5F5F" }}
          >
            <X style={{ width: "20px", height: "20px" }} />
          </button>
        </div>

        {done ? (
          <div style={{ padding: "48px 28px", textAlign: "center" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <Check style={{ width: "24px", height: "24px", color: "#FFFFFF" }} />
            </div>
            <h4 style={{ fontSize: "20px", fontWeight: 400, color: "#000000", marginBottom: "8px", letterSpacing: "-1px" }}>
              예약이 완료되었습니다
            </h4>
            <p style={{ fontSize: "14px", color: "#5F5F5F", lineHeight: 1.75, marginBottom: "28px" }}>
              담당자가 확인 후 연락드리겠습니다.
            </p>
            <button
              onClick={onClose}
              style={{
                background: "#000000",
                color: "#FFFFFF",
                border: "none",
                padding: "12px 32px",
                fontSize: "14px",
                cursor: "pointer",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              닫기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: "28px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#5F5F5F", marginBottom: "6px" }}>
                  이름 <span style={{ color: "#000000" }}>*</span>
                </label>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="이름을 입력하세요"
                  style={{
                    width: "100%",
                    border: "1px solid #D3D3D3",
                    background: "#FAFAFA",
                    padding: "10px 14px",
                    fontSize: "14px",
                    color: "#000000",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#5F5F5F", marginBottom: "6px" }}>
                  이메일 <span style={{ color: "#000000" }}>*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="example@email.com"
                  style={{
                    width: "100%",
                    border: "1px solid #D3D3D3",
                    background: "#FAFAFA",
                    padding: "10px 14px",
                    fontSize: "14px",
                    color: "#000000",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#5F5F5F", marginBottom: "6px" }}>
                  전화번호 <span style={{ color: "#000000" }}>*</span>
                </label>
                <input
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="010-0000-0000"
                  style={{
                    width: "100%",
                    border: "1px solid #D3D3D3",
                    background: "#FAFAFA",
                    padding: "10px 14px",
                    fontSize: "14px",
                    color: "#000000",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#5F5F5F", marginBottom: "6px" }}>
                    날짜 <span style={{ color: "#000000" }}>*</span>
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                    min={new Date().toISOString().split("T")[0]}
                    style={{
                      width: "100%",
                      border: "1px solid #D3D3D3",
                      background: "#FAFAFA",
                      padding: "10px 14px",
                      fontSize: "14px",
                      color: "#000000",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#5F5F5F", marginBottom: "6px" }}>
                    시간 <span style={{ color: "#000000" }}>*</span>
                  </label>
                  <select
                    value={form.time}
                    onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                    style={{
                      width: "100%",
                      border: "1px solid #D3D3D3",
                      background: "#FAFAFA",
                      padding: "10px 14px",
                      fontSize: "14px",
                      color: "#000000",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="">선택</option>
                    {["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#5F5F5F", marginBottom: "6px" }}>언어</label>
                  <select
                    value={form.language}
                    onChange={e => setForm(f => ({ ...f, language: e.target.value }))}
                    style={{
                      width: "100%",
                      border: "1px solid #D3D3D3",
                      background: "#FAFAFA",
                      padding: "10px 14px",
                      fontSize: "14px",
                      color: "#000000",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="영어">영어 (English)</option>
                    <option value="중국어">중국어 (中文)</option>
                    <option value="일본어">일본어 (日本語)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#5F5F5F", marginBottom: "6px" }}>인원수</label>
                  <select
                    value={form.headcount}
                    onChange={e => setForm(f => ({ ...f, headcount: e.target.value }))}
                    style={{
                      width: "100%",
                      border: "1px solid #D3D3D3",
                      background: "#FAFAFA",
                      padding: "10px 14px",
                      fontSize: "14px",
                      color: "#000000",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  >
                    {["1","2","3","4","5","6","7","8","9","10"].map(n => (
                      <option key={n} value={n}>{n}명</option>
                    ))}
                  </select>
                </div>
              </div>

              {error && (
                <p style={{ fontSize: "13px", color: "#c00000" }}>{error}</p>
              )}

              <div style={{ paddingTop: "8px", borderTop: "1px solid #D3D3D3" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#5F5F5F", marginBottom: "16px" }}>
                  <span>입장료</span>
                  <span style={{ color: "#000000", fontWeight: 500 }}>₩35,000 / 인</span>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
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
                  }}
                >
                  {submitting ? "처리 중..." : "예약 완료하기"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────
export default function ExperiencePage() {
  const [showDocentModal, setShowDocentModal] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid #D3D3D3",
    background: "#FAFAFA",
    padding: "10px 14px",
    fontSize: "14px",
    color: "#000000",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#FAFAFA", minHeight: "100vh" }}>
      {showDocentModal && <DocentBookingModal onClose={() => setShowDocentModal(false)} />}

      {/* ─── 히어로 ──────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#FAFAFA",
          paddingTop: "120px",
          paddingBottom: "96px",
          borderBottom: "1px solid #D3D3D3",
        }}
      >
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>
          <p
            style={{
              fontSize: "11px",
              color: "#8B8675",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            체험 에디션
          </p>
          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 400,
              color: "#000000",
              letterSpacing: "-2px",
              lineHeight: 1.1,
              marginBottom: "24px",
              whiteSpace: "pre-line",
            }}
          >
            {"K-POP의 현장을\n직접 경험하십시오"}
          </h1>
          <p style={{ fontSize: "16px", color: "#5F5F5F", lineHeight: 1.75, maxWidth: "480px" }}>
            K-POP 레전드 릴테이프 도슨트 투어와 전문 녹음 체험을 통해 한국 음악 산업의 현장을 직접 체험하실 수 있습니다.
          </p>
        </div>
      </section>

      {/* ─── 상품 1: 도슨트 ──────────────────────────────────────────── */}
      <section
        style={{
          background: "#FAFAFA",
          padding: "96px 0",
          borderBottom: "1px solid #D3D3D3",
        }}
      >
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "64px",
              alignItems: "center",
              marginBottom: "64px",
            }}
          >
            {/* 이미지 */}
            <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
              <Image
                src="/images/control-room.png"
                alt="K-POP 레전드 릴테이프 도슨트"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* 텍스트 */}
            <div>
              <p
                style={{
                  fontSize: "11px",
                  color: "#8B8675",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Wing A · 전시
              </p>
              <h2
                style={{
                  fontSize: "clamp(28px, 3vw, 40px)",
                  fontWeight: 400,
                  color: "#000000",
                  letterSpacing: "-1px",
                  lineHeight: 1.2,
                  marginBottom: "16px",
                  whiteSpace: "pre-line",
                }}
              >
                {"K-POP 레전드\n릴테이프 도슨트"}
              </h2>
              <p style={{ fontSize: "16px", color: "#5F5F5F", lineHeight: 1.75, marginBottom: "24px" }}>
                K-POP 30년을 만들어온 레전드들의 실제 녹음 릴테이프를 전문 도슨트와 함께 관람합니다. 녹음실 안에서만 존재하던 이야기를 직접 듣고 체험하실 수 있습니다.
              </p>

              {/* 가격·시간·언어 */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginBottom: "32px",
                }}
              >
                {[
                  { label: "가격", value: "₩35,000" },
                  { label: "소요", value: "50분" },
                  { label: "언어", value: "한·영·중·일" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      border: "1px solid #D3D3D3",
                      padding: "8px 16px",
                      fontSize: "14px",
                      color: "#5F5F5F",
                    }}
                  >
                    {item.label}{" "}
                    <span style={{ color: "#000000", fontWeight: 500 }}>{item.value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowDocentModal(true)}
                style={{
                  background: "#000000",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "14px 32px",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  letterSpacing: "0.5px",
                }}
              >
                도슨트 투어 예약하기
              </button>
            </div>
          </div>

          {/* 전시 하이라이트 2x2 */}
          <div>
            <p
              style={{
                fontSize: "11px",
                color: "#8B8675",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              전시 하이라이트
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1px",
                background: "#D3D3D3",
              }}
            >
              {[
                {
                  num: "01",
                  title: "원 테이크의 기적",
                  desc: "BTS, 서태지, HOT 등 레전드들이 한 번에 녹음한 명곡들의 뒷이야기를 원본 릴테이프와 함께 확인하실 수 있습니다.",
                },
                {
                  num: "02",
                  title: "스튜디오 마법사",
                  desc: "프로듀서와 사운드 엔지니어가 만들어낸 K-POP 특유의 사운드 시그니처. 믹싱 보드 시연과 비하인드 스토리를 공개합니다.",
                },
                {
                  num: "03",
                  title: "릴테이프에서 스트리밍으로",
                  desc: "아날로그에서 디지털로 K-POP이 진화한 30년의 역사. 장비 변천사와 실제 음질 비교 청음 체험이 포함됩니다.",
                },
                {
                  num: "04",
                  title: "지금 들려드립니다",
                  desc: "전문 모니터 스피커로 레전드들의 원본 보컬 트랙을 직접 청음하십시오. 유튜브에서는 들을 수 없는 스튜디오 사운드입니다.",
                },
              ].map((item) => (
                <div
                  key={item.num}
                  style={{
                    background: "#FAFAFA",
                    padding: "32px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "32px",
                      fontWeight: 400,
                      color: "#D3D3D3",
                      lineHeight: 1,
                      marginBottom: "16px",
                      letterSpacing: "-1px",
                    }}
                  >
                    {item.num}
                  </p>
                  <h4
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#000000",
                      marginBottom: "10px",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p style={{ fontSize: "14px", color: "#5F5F5F", lineHeight: 1.75 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 상품 2: 녹음 체험 ───────────────────────────────────────── */}
      <section
        style={{
          background: "#F0EFEB",
          padding: "96px 0",
          borderBottom: "1px solid #D3D3D3",
        }}
      >
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "64px",
              alignItems: "center",
            }}
          >
            {/* 텍스트 */}
            <div>
              <p
                style={{
                  fontSize: "11px",
                  color: "#8B8675",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Wing A · 체험
              </p>
              <h2
                style={{
                  fontSize: "clamp(28px, 3vw, 40px)",
                  fontWeight: 400,
                  color: "#000000",
                  letterSpacing: "-1px",
                  lineHeight: 1.2,
                  marginBottom: "16px",
                }}
              >
                K-POP 녹음 체험
              </h2>
              <p style={{ fontSize: "16px", color: "#5F5F5F", lineHeight: 1.75, marginBottom: "24px" }}>
                전문 레코딩 부스에서 K-POP 가수와 동일한 환경으로 녹음하실 수 있습니다. 기본 믹싱 후 파일이 이메일로 제공됩니다.
              </p>

              {/* 가격·시간 */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "28px" }}>
                {[
                  { label: "가격", value: "₩40,000~" },
                  { label: "소요", value: "60분" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      border: "1px solid #D3D3D3",
                      background: "#FAFAFA",
                      padding: "8px 16px",
                      fontSize: "14px",
                      color: "#5F5F5F",
                    }}
                  >
                    {item.label}{" "}
                    <span style={{ color: "#000000", fontWeight: 500 }}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* 포함 내용 */}
              <div style={{ marginBottom: "24px" }}>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#8B8675",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  포함 내용
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    "유튜브 반주로 원하는 노래 자유 녹음",
                    "기본 믹싱 (베스트 구간 편집 + 에코 효과)",
                    "녹음 파일 이메일 발송 (다음날)",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "#5F5F5F", lineHeight: 1.75 }}>
                      <span style={{ color: "#6B625A", flexShrink: 0, marginTop: "2px" }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 추가 옵션 */}
              <div style={{ marginBottom: "32px" }}>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#8B8675",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  추가 옵션
                </p>
                <div
                  style={{
                    border: "1px solid #D3D3D3",
                    background: "#FAFAFA",
                  }}
                >
                  {[
                    { name: "AI 보정", price: "₩20,000" },
                    { name: "촬영기사", price: "₩20,000" },
                    { name: "AI 숏폼 뮤직비디오", price: "₩100,000" },
                    { name: "앨범 발매", price: "₩200,000" },
                    { name: "LP 레코드 제작", price: "₩300,000" },
                  ].map((opt, i, arr) => (
                    <div
                      key={opt.name}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 16px",
                        fontSize: "14px",
                        borderBottom: i < arr.length - 1 ? "1px solid #D3D3D3" : "none",
                      }}
                    >
                      <span style={{ color: "#5F5F5F" }}>{opt.name}</span>
                      <span style={{ color: "#000000", fontWeight: 500 }}>{opt.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/menu"
                style={{
                  display: "inline-block",
                  background: "#000000",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "14px 32px",
                  fontSize: "14px",
                  textDecoration: "none",
                  letterSpacing: "0.5px",
                }}
              >
                녹음 예약하기
              </Link>
            </div>

            {/* 이미지 */}
            <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
              <Image
                src="/images/recording-booth.png"
                alt="K-POP 녹음 체험 부스"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#FAFAFA",
          padding: "96px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            color: "#8B8675",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          지금 시작하십시오
        </p>
        <h2
          style={{
            fontSize: "clamp(28px, 3vw, 40px)",
            fontWeight: 400,
            color: "#000000",
            letterSpacing: "-1px",
            marginBottom: "16px",
          }}
        >
          K-POP의 현장을 직접 체험하십시오
        </h2>
        <p style={{ fontSize: "16px", color: "#5F5F5F", lineHeight: 1.75, marginBottom: "40px" }}>
          도슨트 투어와 녹음 체험, 두 프로그램 모두 사전 예약이 필요합니다.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => setShowDocentModal(true)}
            style={{
              background: "#000000",
              color: "#FFFFFF",
              border: "none",
              padding: "14px 32px",
              fontSize: "14px",
              cursor: "pointer",
              fontFamily: "var(--font-dm-sans), sans-serif",
              letterSpacing: "0.5px",
            }}
          >
            도슨트 투어 예약
          </button>
          <Link
            href="/menu"
            style={{
              display: "inline-block",
              background: "transparent",
              color: "#000000",
              border: "1px solid #D3D3D3",
              padding: "14px 32px",
              fontSize: "14px",
              textDecoration: "none",
              letterSpacing: "0.5px",
            }}
          >
            녹음 예약
          </Link>
        </div>
      </section>
    </div>
  );
}
