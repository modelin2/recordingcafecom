"use client";
import { useState } from "react";
import Link from "next/link";

const PACKAGES = [
  {
    num: "01",
    name: "학교·교육 단체",
    min: "10인~",
    price: "₩28,000",
    unit: "학생 1인",
    badge: "교육 할인",
    features: [
      "K-POP 녹음 체험 1회 (30분)",
      "릴테이프 도슨트 투어 포함",
      "교육용 K-POP 산업 자료 제공",
      "단체 기념 사진 촬영",
      "음원 파일 개인 제공",
      "학교 공문 요청 처리 가능",
    ],
    target: "초·중·고등학교 / 대학교 동아리 / 음악 교육 기관",
  },
  {
    num: "02",
    name: "해외 단체 투어",
    min: "8인~",
    price: "₩38,000",
    unit: "1인",
    badge: "외국인 패키지",
    features: [
      "K-POP 녹음 체험 1회 (45분)",
      "4개국어 도슨트 투어 (한·영·중·일)",
      "K-POP 역사 전시관 관람",
      "AI 포토 부스 체험",
      "음원 파일 + 앨범 재킷 사진",
      "기념 굿즈 증정",
    ],
    target: "해외 여행객 그룹 / K-POP 팬 투어 / 여행사 단체",
  },
  {
    num: "03",
    name: "기업 연수",
    min: "15인~",
    price: "₩35,000",
    unit: "1인",
    badge: "법인 가능",
    features: [
      "프로그램 맞춤 기획 (협의)",
      "팀빌딩용 단체 녹음 세션",
      "전담 스태프 배치",
      "행사 전용 공간 대관",
      "케이터링 패키지 옵션",
      "법인 세금계산서 발행",
    ],
    target: "기업 팀빌딩 / 워크숍 / VIP 행사 / 가족 행사",
  },
  {
    num: "04",
    name: "K-POP 꿈나무 캠프",
    min: "6인~",
    price: "₩45,000",
    unit: "1인",
    badge: "프리미엄",
    features: [
      "전문 보컬 트레이너 1회 레슨",
      "실제 K-POP 스타 녹음 방식 체험",
      "퍼포먼스 영상 촬영·제공",
      "KOMCA 등록 작곡가 멘토링",
      "개인 녹음 파일(WAV)",
      "수료증 발급",
    ],
    target: "보컬 지망생 / 청소년 음악 캠프 / K-POP 연습생 준비",
  },
];

const STEPS = [
  { num: "01", title: "신청서 제출", desc: "단체 예약 신청서를 작성하여 제출하십시오." },
  { num: "02", title: "담당자 확인", desc: "영업일 2일 이내 담당자가 연락드립니다." },
  { num: "03", title: "일정 조율", desc: "방문 일정 및 프로그램 세부 사항을 확정합니다." },
  { num: "04", title: "단체 입장", desc: "확정된 일정에 맞춰 단체로 방문하십시오." },
];

export default function GroupPage() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", org: "", count: "", date: "", package: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid #D3D3D3",
    background: "#FAFAFA",
    padding: "11px 14px",
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
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#FAFAFA", minHeight: "100vh" }}>

      {/* ── 히어로 ── */}
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
            단체 관람
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
            {"단체를 위한\n특별한 프로그램"}
          </h1>
          <p style={{ fontSize: "16px", color: "#5F5F5F", lineHeight: 1.75, maxWidth: "520px" }}>
            학교 현장학습부터 해외 K-POP 투어까지. 단체 규모와 목적에 맞게 프로그램을 선택하실 수 있습니다. 맞춤 구성도 가능합니다.
          </p>
        </div>
      </section>

      {/* ── 패키지 그리드 ── */}
      <section style={{ background: "#F0EFEB", padding: "96px 0", borderBottom: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
            단체 패키지
          </p>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 400, color: "#000000", letterSpacing: "-1px", marginBottom: "48px" }}>
            4가지 프로그램
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1px",
              background: "#D3D3D3",
            }}
          >
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.num}
                style={{
                  background: "#FAFAFA",
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p style={{ fontSize: "36px", fontWeight: 400, color: "#D3D3D3", letterSpacing: "-1px", lineHeight: 1, marginBottom: "20px" }}>
                  {pkg.num}
                </p>
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: 500, color: "#000000", letterSpacing: "-0.5px" }}>{pkg.name}</h3>
                    <span style={{ fontSize: "10px", color: "#6B625A", border: "1px solid #D3D3D3", padding: "2px 8px", letterSpacing: "1px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                      {pkg.badge}
                    </span>
                  </div>
                  <p style={{ fontSize: "12px", color: "#8B8675" }}>{pkg.target}</p>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <span style={{ fontSize: "28px", fontWeight: 400, color: "#000000", letterSpacing: "-1px" }}>{pkg.price}</span>
                  <span style={{ fontSize: "13px", color: "#5F5F5F", marginLeft: "6px" }}>/ {pkg.unit} · {pkg.min}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                  {pkg.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#5F5F5F", lineHeight: 1.6 }}>
                      <span style={{ color: "#6B625A", flexShrink: 0, marginTop: "1px" }}>•</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#apply"
                  style={{
                    display: "block",
                    textAlign: "center",
                    border: "1px solid #D3D3D3",
                    color: "#000000",
                    padding: "11px 20px",
                    fontSize: "13px",
                    textDecoration: "none",
                    letterSpacing: "0.5px",
                  }}
                >
                  이 패키지로 문의하기
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 프로세스 스텝 ── */}
      <section style={{ background: "#FAFAFA", padding: "96px 0", borderBottom: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
            예약 절차
          </p>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 400, color: "#000000", letterSpacing: "-1px", marginBottom: "48px" }}>
            4단계로 간단하게
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1px",
              background: "#D3D3D3",
            }}
          >
            {STEPS.map((step) => (
              <div key={step.num} style={{ background: "#FAFAFA", padding: "36px 28px" }}>
                <p style={{ fontSize: "36px", fontWeight: 400, color: "#DFCF99", letterSpacing: "-1px", lineHeight: 1, marginBottom: "16px" }}>
                  {step.num}
                </p>
                <h4 style={{ fontSize: "16px", fontWeight: 500, color: "#000000", marginBottom: "8px" }}>{step.title}</h4>
                <p style={{ fontSize: "14px", color: "#5F5F5F", lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* 유의사항 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginTop: "48px" }}>
            {[
              {
                title: "주의 사항",
                items: ["최소 7일 전 예약 필수", "취소: 3일 전까지 전액 환불", "당일 취소 시 환불 불가", "인원 변경은 3일 전 연락"],
              },
              {
                title: "추가 혜택",
                items: ["30인 이상 기념 굿즈 증정", "학교단체 세금계산서 발행", "여행사 파트너십 수수료 별도", "맞춤 프로그램 기획 가능"],
              },
            ].map((section) => (
              <div key={section.title} style={{ border: "1px solid #D3D3D3", background: "#F0EFEB", padding: "24px 28px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: 500, color: "#000000", marginBottom: "14px" }}>{section.title}</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                  {section.items.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#5F5F5F", lineHeight: 1.6 }}>
                      <span style={{ color: "#6B625A", flexShrink: 0 }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 단체 예약 신청 폼 ── */}
      <section id="apply" style={{ background: "#F0EFEB", padding: "96px 0", borderBottom: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>
            단체 예약 신청
          </p>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 400, color: "#000000", letterSpacing: "-1px", marginBottom: "8px" }}>
            예약 신청서
          </h2>
          <p style={{ fontSize: "16px", color: "#5F5F5F", lineHeight: 1.75, marginBottom: "48px" }}>
            영업일 2일 이내 담당자가 연락드립니다.
          </p>

          {submitted ? (
            <div
              style={{
                border: "1px solid #D3D3D3",
                background: "#FAFAFA",
                padding: "64px 40px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  fontSize: "20px",
                  color: "#FFFFFF",
                }}
              >
                ✓
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: 400, color: "#000000", letterSpacing: "-0.5px", marginBottom: "10px" }}>
                신청이 완료되었습니다
              </h3>
              <p style={{ fontSize: "15px", color: "#5F5F5F", lineHeight: 1.75 }}>
                영업일 2일 이내에 담당자가 연락드리겠습니다.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>기관·단체명 *</label>
                  <input
                    required
                    value={form.org}
                    onChange={e => setForm({...form, org: e.target.value})}
                    style={fieldStyle}
                    placeholder="예: OO중학교 / OO여행사"
                  />
                </div>
                <div>
                  <label style={labelStyle}>희망 패키지 *</label>
                  <select
                    required
                    value={form.package}
                    onChange={e => setForm({...form, package: e.target.value})}
                    style={fieldStyle}
                  >
                    <option value="">선택하세요</option>
                    <option value="school">학교·교육 단체</option>
                    <option value="overseas">해외 단체 투어</option>
                    <option value="corp">기업 연수</option>
                    <option value="camp">K-POP 꿈나무 캠프</option>
                    <option value="custom">맞춤 프로그램 (협의)</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>담당자 이름 *</label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    style={fieldStyle}
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label style={labelStyle}>연락처 *</label>
                  <input
                    required
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                    style={fieldStyle}
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>이메일 *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    style={fieldStyle}
                    placeholder="contact@example.com"
                  />
                </div>
                <div>
                  <label style={labelStyle}>인원 수 *</label>
                  <input
                    required
                    type="number"
                    min="6"
                    value={form.count}
                    onChange={e => setForm({...form, count: e.target.value})}
                    style={fieldStyle}
                    placeholder="예: 25"
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>희망 방문 날짜</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm({...form, date: e.target.value})}
                  style={fieldStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>요청 사항</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  style={{ ...fieldStyle, resize: "none" }}
                  placeholder="특별한 요청 사항이 있으면 자유롭게 적어주세요."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: "#000000",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "16px",
                  fontSize: "14px",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.5 : 1,
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  letterSpacing: "1px",
                }}
              >
                {loading ? "제출 중..." : "단체 예약 신청하기"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── 하단 링크 ── */}
      <section style={{ background: "#FAFAFA", padding: "48px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/experience" style={{ fontSize: "14px", color: "#5F5F5F", textDecoration: "none", letterSpacing: "0.5px" }}>
            체험 에디션 보기
          </Link>
          <span style={{ color: "#D3D3D3" }}>|</span>
          <Link href="/" style={{ fontSize: "14px", color: "#5F5F5F", textDecoration: "none", letterSpacing: "0.5px" }}>
            홈으로
          </Link>
        </div>
      </section>
    </div>
  );
}
