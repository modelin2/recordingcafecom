"use client";
import { useState } from "react";
import Link from "next/link";

const PARTNERS = [
  {
    name: "리버사이드 호텔",
    eng: "Riverside Hotel",
    location: "서울 강남구",
    type: "호텔",
    desc: "객실 전용 QR코드를 통한 예약 연결. 투숙객 전용 10% 할인 혜택 제공.",
    since: "2023",
    badge: "파트너",
  },
  {
    name: "라까사 호텔",
    eng: "La Casa Hotel",
    location: "서울 강남구",
    type: "호텔",
    desc: "로비·객실 광고 배너 및 전용 예약 페이지 운영. 외국인 투숙객 K-POP 체험 연결.",
    since: "2024",
    badge: "파트너",
  },
];

const BENEFITS = [
  { num: "01", title: "수수료 20% 지급", desc: "방문객 1인당 입장 수수료의 20%를 파트너에게 지급합니다." },
  { num: "02", title: "전용 예약 페이지", desc: "파트너 전용 QR코드와 예약 링크를 제공합니다." },
  { num: "03", title: "공동 마케팅", desc: "레코딩카페의 홍보 채널을 통한 파트너 홍보를 지원합니다." },
  { num: "04", title: "우선 예약권", desc: "성수기 우선 예약 및 단체 예약 보장이 제공됩니다." },
  { num: "05", title: "맞춤형 패키지", desc: "파트너 고객을 위한 전용 체험 패키지를 구성합니다." },
  { num: "06", title: "전담 매니저 배정", desc: "파트너별 전담 매니저가 운영을 지원합니다." },
];

const STEPS = [
  { num: "01", title: "문의 접수", desc: "신청 양식 작성 후 제출" },
  { num: "02", title: "상담 진행", desc: "영업일 2일 이내 연락" },
  { num: "03", title: "계약 체결", desc: "제휴 조건 조율 및 계약 서명" },
  { num: "04", title: "파트너 온보딩", desc: "QR코드 및 예약 페이지 발급" },
  { num: "05", title: "운영 시작", desc: "배너 배치 후 수수료 정산 시작" },
];

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: "#8B8675",
  marginBottom: "16px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#FAFAFA",
  border: "1px solid #D3D3D3",
  padding: "12px 16px",
  fontSize: "15px",
  color: "#1A1A1A",
  outline: "none",
  fontFamily: "var(--font-dm-sans), sans-serif",
};

export default function PartnershipPage() {
  const [form, setForm] = useState({
    company: "", name: "", phone: "", email: "", type: "", message: "",
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

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#FAFAFA", color: "#5F5F5F", minHeight: "100vh" }}>

      {/* 히어로 */}
      <section style={{ padding: "96px 48px", background: "#FAFAFA", borderBottom: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={labelStyle}>파트너십</p>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 400, color: "#000000", letterSpacing: "-2px", lineHeight: 1.1, marginBottom: "32px", whiteSpace: "pre-line" }}>
            {"함께 만드는\n특별한 경험"}
          </h1>
          <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#5F5F5F", maxWidth: "560px", marginBottom: "40px" }}>
            레코딩카페는 호텔, 여행사, 교육기관과의 파트너십을 통해 방문객에게 더 깊은 경험을 제공합니다.
          </p>
          <a
            href="#apply"
            style={{ display: "inline-block", background: "#000000", color: "#FAFAFA", padding: "16px 40px", fontSize: "15px", fontWeight: 500, textDecoration: "none", letterSpacing: "0.5px" }}
          >
            파트너 신청하기
          </a>
        </div>
      </section>

      {/* 현재 파트너 */}
      <section style={{ padding: "96px 48px", background: "#F0EFEB", borderTop: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={labelStyle}>현재 파트너</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#000000", letterSpacing: "-1px", marginBottom: "48px" }}>
            현재 파트너
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "0" }}>
            {PARTNERS.map((p, i) => (
              <div key={i} style={{ border: "1px solid #D3D3D3", padding: "40px 32px", background: "#FAFAFA", marginRight: i === 0 ? "-1px" : "0" }}>
                <div style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase" as const, color: "#8B8675", marginBottom: "12px" }}>
                  {p.badge} · {p.type}
                </div>
                <h3 style={{ fontSize: "22px", fontWeight: 400, color: "#000000", marginBottom: "4px" }}>{p.name}</h3>
                <p style={{ fontSize: "13px", color: "#8B8675", marginBottom: "16px" }}>{p.eng} · {p.location}</p>
                <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#5F5F5F", marginBottom: "24px" }}>{p.desc}</p>
                <div style={{ borderTop: "1px solid #D3D3D3", paddingTop: "20px" }}>
                  <div style={{ fontSize: "13px", color: "#8B8675" }}>파트너십 시작 · <span style={{ color: "#000000", fontWeight: 500 }}>{p.since}년</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 제휴 혜택 */}
      <section style={{ padding: "96px 48px", background: "#FAFAFA", borderTop: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={labelStyle}>제휴 혜택</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#000000", letterSpacing: "-1px", marginBottom: "48px" }}>
            파트너 혜택
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "0" }}>
            {BENEFITS.map((b, i) => (
              <div key={i} style={{ border: "1px solid #D3D3D3", padding: "32px", background: "#FAFAFA", marginRight: i % 2 === 0 ? "-1px" : "0", marginBottom: "-1px" }}>
                <div style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", color: "#8B8675", marginBottom: "12px" }}>{b.num}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 500, color: "#000000", marginBottom: "10px" }}>{b.title}</h3>
                <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#5F5F5F" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 진행 절차 */}
      <section style={{ padding: "96px 48px", background: "#F0EFEB", borderTop: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={labelStyle}>진행 절차</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#000000", letterSpacing: "-1px", marginBottom: "48px" }}>
            파트너십 진행 절차
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0" }}>
            {STEPS.map((step, i) => (
              <div key={i} style={{ border: "1px solid #D3D3D3", padding: "32px 24px", background: "#FAFAFA", marginRight: i < STEPS.length - 1 ? "-1px" : "0", textAlign: "center" }}>
                <div style={{ fontSize: "22px", fontWeight: 400, color: "#000000", letterSpacing: "-1px", marginBottom: "16px" }}>{step.num}</div>
                <h3 style={{ fontSize: "15px", fontWeight: 500, color: "#000000", marginBottom: "8px" }}>{step.title}</h3>
                <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#8B8675" }}>{step.desc}</p>
                {i < STEPS.length - 1 && (
                  <div style={{ fontSize: "18px", color: "#D3D3D3", marginTop: "16px" }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 파트너 신청 폼 */}
      <section id="apply" style={{ padding: "96px 48px", background: "#FAFAFA", borderTop: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={labelStyle}>파트너 신청</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#000000", letterSpacing: "-1px", marginBottom: "12px" }}>
            파트너 신청
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#5F5F5F", marginBottom: "48px" }}>
            영업일 2일 이내에 담당자가 연락드립니다.
          </p>

          {submitted ? (
            <div style={{ padding: "48px", border: "1px solid #D3D3D3", background: "#F0EFEB", textAlign: "center" }}>
              <h3 style={{ fontSize: "20px", fontWeight: 400, color: "#000000", marginBottom: "12px" }}>신청이 완료되었습니다</h3>
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#5F5F5F" }}>영업일 2일 이내에 담당자가 연락드리겠습니다.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>업체·호텔명 <span style={{ color: "#000" }}>*</span></label>
                  <input
                    required
                    value={form.company}
                    onChange={e => setForm({...form, company: e.target.value})}
                    placeholder="예: 강남 리버사이드 호텔"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>업체 유형 <span style={{ color: "#000" }}>*</span></label>
                  <select
                    required
                    value={form.type}
                    onChange={e => setForm({...form, type: e.target.value})}
                    style={inputStyle}
                  >
                    <option value="">선택하세요</option>
                    <option value="hotel">호텔·숙박업소</option>
                    <option value="travel">여행사·관광지</option>
                    <option value="cafe">카페·레스토랑</option>
                    <option value="corp">기업·단체</option>
                    <option value="other">기타</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>담당자 이름 <span style={{ color: "#000" }}>*</span></label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    placeholder="홍길동"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>연락처 <span style={{ color: "#000" }}>*</span></label>
                  <input
                    required
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                    placeholder="010-0000-0000"
                    style={inputStyle}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>이메일 <span style={{ color: "#000" }}>*</span></label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  placeholder="partner@example.com"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>문의 내용</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  placeholder="업체 규모, 외국인 고객 비중, 희망 제휴 방식 등을 자유롭게 작성해 주십시오."
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{ width: "100%", padding: "16px", background: "#000000", color: "#FAFAFA", fontSize: "15px", fontWeight: 500, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.5 : 1, fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {loading ? "제출 중..." : "파트너 신청하기"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
