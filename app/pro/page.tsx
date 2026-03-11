"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

const SERVICES = [
  { num: "01", title: "KOMCA 전속 작곡가 1:1 매칭", desc: "한국음악저작권협회(KOMCA) 소속 작곡가를 직접 선택하여 1:1로 매칭합니다." },
  { num: "02", title: "레퍼런스 기반 맞춤 편곡·작사", desc: "고객이 제공하는 레퍼런스를 바탕으로 원하는 스타일을 반영한 편곡과 작사를 진행합니다." },
  { num: "03", title: "전문 스튜디오 레코딩", desc: "메이저 음반사와 동일한 환경의 전문 스튜디오에서 레코딩을 진행합니다." },
  { num: "04", title: "믹싱 & 마스터링", desc: "글로벌 스트리밍 플랫폼 기준에 최적화된 사운드로 완성합니다." },
  { num: "05", title: "앨범 커버 아트워크", desc: "전문 디자이너가 스트리밍 플랫폼에 적합한 앨범 커버를 제작합니다." },
  { num: "06", title: "전 세계 음원 발매 (150개 플랫폼)", desc: "Spotify, Apple Music 등 전 세계 150개 이상의 플랫폼에 정식 발매합니다." },
  { num: "07", title: "영구 저작권료 수익 등록", desc: "저작권 유효 기간까지 스트리밍 수익을 수취할 수 있도록 등록을 완료합니다." },
];

const TIMELINE = [
  { period: "1주-2주", title: "작곡가 매칭 & 컨셉 기획", desc: "KOMCA 작곡가 선정, 방향성 협의, 레퍼런스 수집" },
  { period: "3주-5주", title: "편곡 & 작사", desc: "맞춤 편곡 제작, 작사, 고객 피드백 반영" },
  { period: "6주-8주", title: "전문 스튜디오 레코딩", desc: "세션 녹음 진행, 수정 세션 포함" },
  { period: "9주-10주", title: "믹싱 & 마스터링", desc: "전문 엔지니어 믹싱, 글로벌 플랫폼 기준 마스터링" },
  { period: "11주", title: "앨범 아트 & 발매 준비", desc: "앨범 커버 디자인, 저작권 등록, 발매 준비" },
  { period: "12주", title: "전 세계 동시 발매", desc: "150개 이상의 스트리밍 플랫폼 글로벌 동시 발매" },
];

const TIERS = [
  {
    name: "스탠다드",
    price: "₩15,000,000~",
    desc: "싱글 1곡",
    features: ["KOMCA 작곡가 1:1 매칭", "맞춤 편곡·작사", "전문 레코딩 (3회 수정)", "믹싱 & 마스터링", "앨범 커버 디자인", "전 세계 발매", "저작권료 등록"],
    highlight: false,
  },
  {
    name: "프리미엄",
    price: "₩25,000,000~",
    desc: "EP 3곡",
    features: ["스탠다드 전체 포함", "레코딩 5회 수정", "편곡 수정 2회", "뮤직비디오 제작 (1분)", "홍보용 숏폼 콘텐츠 3개", "SNS 마케팅 플랜", "프로모션 지원"],
    highlight: true,
  },
  {
    name: "엔터프라이즈",
    price: "별도 협의",
    desc: "정규 앨범",
    features: ["프리미엄 전체 포함", "정규 앨범 (7곡+)", "전속 작곡팀 배정", "글로벌 프로모션", "음반사 피칭 지원", "매니지먼트 연계", "1년 사후 관리"],
    highlight: false,
  },
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

export default function ProPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", budget: "standard", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setError("이름, 이메일, 전화번호는 필수입니다.");
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
          booking_path: "pro",
          platform: form.budget,
          drinks: form.message,
          total_price: 0,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDone(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "서버 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const FAQS = [
    { q: "KOMCA 작곡가는 어떻게 선택하나요?", a: "저희가 제공하는 작곡가 포트폴리오에서 원하는 스타일의 작곡가를 직접 선택하실 수 있습니다. 상담을 통해 최적의 매칭을 도와드립니다." },
    { q: "음원 수익은 어떻게 정산되나요?", a: "발매된 음원에서 발생하는 스트리밍 수익의 100%가 고객 명의로 등록됩니다. 분기별로 각 플랫폼에서 직접 정산받으실 수 있습니다." },
    { q: "저작권은 누구에게 귀속되나요?", a: "음원 제작 후 모든 저작인접권(실연권, 음반제작자권)은 고객에게 귀속됩니다. 작사·작곡 저작권은 별도 계약으로 고객 명의 이전이 가능합니다." },
    { q: "해외에서도 수익을 받을 수 있나요?", a: "미국 저작권 관리 단체와의 파트너십을 통해 전 세계 150개 이상의 국가에서 발생하는 수익을 수취할 수 있도록 지원합니다." },
  ];

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#FAFAFA", color: "#5F5F5F", minHeight: "100vh" }}>

      {/* 네비게이션 */}
      <div style={{ borderBottom: "1px solid #D3D3D3", background: "#FAFAFA", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 48px", display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/" style={{ color: "#5F5F5F", fontSize: "14px", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
            ← 홈으로
          </Link>
          <span style={{ color: "#D3D3D3" }}>/</span>
          <span style={{ ...labelStyle, marginBottom: 0 }}>프로 에디션</span>
        </div>
      </div>

      {/* 히어로 */}
      <section style={{ padding: "96px 48px", background: "#FAFAFA", borderBottom: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={labelStyle}>프로 에디션</p>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 400, color: "#000000", letterSpacing: "-2px", lineHeight: 1.1, marginBottom: "32px", whiteSpace: "pre-line" }}>
            {"당신의 음악을\n세상에 발표하십시오"}
          </h1>
          <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#5F5F5F", maxWidth: "560px", marginBottom: "8px" }}>
            KOMCA 소속 작곡가와 1:1로 협업하여 음반을 제작합니다.
          </p>
          <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#5F5F5F", maxWidth: "560px", marginBottom: "40px" }}>
            K-POP 메이저 음반사와 동일한 프로세스로 진행됩니다.
          </p>
          <a
            href="#inquiry"
            style={{ display: "inline-block", background: "#000000", color: "#FAFAFA", padding: "16px 40px", fontSize: "15px", fontWeight: 500, textDecoration: "none", letterSpacing: "0.5px" }}
          >
            문의하기
          </a>
        </div>
      </section>

      {/* 포함 서비스 */}
      <section style={{ padding: "96px 48px", background: "#F0EFEB", borderTop: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={labelStyle}>포함 서비스</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#000000", letterSpacing: "-1px", marginBottom: "48px" }}>
            모든 것이 포함됩니다
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "0" }}>
            {SERVICES.map((s, i) => (
              <div key={i} style={{ border: "1px solid #D3D3D3", padding: "32px", background: "#FAFAFA", marginRight: i % 2 === 0 ? "-1px" : "0", marginBottom: "-1px" }}>
                <div style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", color: "#8B8675", marginBottom: "12px" }}>{s.num}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 500, color: "#000000", marginBottom: "10px", lineHeight: 1.4 }}>{s.title}</h3>
                <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#5F5F5F" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 타임라인 */}
      <section style={{ padding: "96px 48px", background: "#FAFAFA", borderTop: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={labelStyle}>제작 프로세스</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#000000", letterSpacing: "-1px", marginBottom: "48px" }}>
            12주 제작 프로세스
          </h2>
          <div style={{ borderLeft: "1px solid #D3D3D3", paddingLeft: "40px" }}>
            {TIMELINE.map((t, i) => (
              <div key={i} style={{ position: "relative", paddingBottom: i < TIMELINE.length - 1 ? "40px" : "0" }}>
                <div style={{ position: "absolute", left: "-44px", top: "4px", width: "8px", height: "8px", background: "#000000", borderRadius: "50%" }} />
                <div style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "6px" }}>{t.period}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 500, color: "#000000", marginBottom: "6px" }}>{t.title}</h3>
                <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#5F5F5F" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 패키지 */}
      <section style={{ padding: "96px 48px", background: "#F0EFEB", borderTop: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={labelStyle}>패키지</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#000000", letterSpacing: "-1px", marginBottom: "48px" }}>
            패키지 선택
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "0" }}>
            {TIERS.map((tier, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #D3D3D3",
                  padding: "40px 32px",
                  background: tier.highlight ? "#000000" : "#FAFAFA",
                  color: tier.highlight ? "#FAFAFA" : "#5F5F5F",
                  marginRight: i < TIERS.length - 1 ? "-1px" : "0",
                  borderTop: "4px solid " + (tier.highlight ? "#000000" : "#D3D3D3"),
                }}
              >
                {tier.highlight && (
                  <div style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "16px" }}>추천</div>
                )}
                <h3 style={{ fontSize: "22px", fontWeight: 400, color: tier.highlight ? "#FAFAFA" : "#000000", marginBottom: "8px" }}>{tier.name}</h3>
                <div style={{ fontSize: "32px", fontWeight: 400, color: tier.highlight ? "#FAFAFA" : "#000000", letterSpacing: "-1px", marginBottom: "4px" }}>{tier.price}</div>
                <div style={{ fontSize: "14px", color: tier.highlight ? "#A0A0A0" : "#8B8675", marginBottom: "32px" }}>{tier.desc}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0" }}>
                  {tier.features.map((f, j) => (
                    <li key={j} style={{ fontSize: "15px", lineHeight: 1.75, color: tier.highlight ? "#D3D3D3" : "#5F5F5F", paddingBottom: "8px", borderBottom: "1px solid " + (tier.highlight ? "rgba(255,255,255,0.1)" : "#F0EFEB"), marginBottom: "8px" }}>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#inquiry"
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "14px 24px",
                    fontSize: "15px",
                    fontWeight: 500,
                    textDecoration: "none",
                    background: tier.highlight ? "#FAFAFA" : "transparent",
                    color: tier.highlight ? "#000000" : "#5F5F5F",
                    border: tier.highlight ? "none" : "1px solid #D3D3D3",
                  }}
                >
                  {tier.name === "엔터프라이즈" ? "별도 협의 문의" : "문의하기"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "96px 48px", background: "#FAFAFA", borderTop: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={labelStyle}>자주 묻는 질문</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#000000", letterSpacing: "-1px", marginBottom: "48px" }}>
            자주 묻는 질문
          </h2>
          <div>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderBottom: "1px solid #D3D3D3" }}>
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                >
                  <span style={{ fontSize: "16px", fontWeight: 500, color: "#000000" }}>{faq.q}</span>
                  {faqOpen === i
                    ? <ChevronUp style={{ width: "18px", height: "18px", color: "#5F5F5F", flexShrink: 0 }} />
                    : <ChevronDown style={{ width: "18px", height: "18px", color: "#8B8675", flexShrink: 0 }} />
                  }
                </button>
                {faqOpen === i && (
                  <div style={{ paddingBottom: "24px" }}>
                    <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#5F5F5F" }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 문의 폼 */}
      <section id="inquiry" style={{ padding: "96px 48px", background: "#F0EFEB", borderTop: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={labelStyle}>문의</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#000000", letterSpacing: "-1px", marginBottom: "12px" }}>
            문의하세요
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#5F5F5F", marginBottom: "48px" }}>
            24시간 이내에 전문 상담사가 연락드립니다.
          </p>

          {/* 빠른 연락 */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "40px", flexWrap: "wrap" }}>
            <a
              href="https://talk.naver.com/ct/wu2kkmv"
              target="_blank"
              rel="noopener noreferrer"
              style={{ flex: 1, minWidth: "180px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "#000000", color: "#FAFAFA", padding: "14px 24px", fontSize: "15px", fontWeight: 500, textDecoration: "none" }}
            >
              네이버 톡톡
            </a>
            <a
              href="https://wa.me/821087395291"
              target="_blank"
              rel="noopener noreferrer"
              style={{ flex: 1, minWidth: "180px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "transparent", color: "#5F5F5F", padding: "14px 24px", fontSize: "15px", fontWeight: 500, textDecoration: "none", border: "1px solid #D3D3D3" }}
            >
              WhatsApp
            </a>
          </div>

          <div style={{ textAlign: "center", fontSize: "14px", color: "#8B8675", marginBottom: "32px", borderBottom: "1px solid #D3D3D3", paddingBottom: "32px" }}>
            또는 아래 양식으로 문의하십시오
          </div>

          {done ? (
            <div style={{ padding: "48px", border: "1px solid #D3D3D3", background: "#FAFAFA", textAlign: "center" }}>
              <h3 style={{ fontSize: "20px", fontWeight: 400, color: "#000000", marginBottom: "12px" }}>문의가 접수되었습니다</h3>
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#5F5F5F" }}>24시간 이내에 전문 상담사가 연락드립니다.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>이름 <span style={{ color: "#000" }}>*</span></label>
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="홍길동"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>전화번호 <span style={{ color: "#000" }}>*</span></label>
                  <input
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="010-0000-0000"
                    style={inputStyle}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>이메일 <span style={{ color: "#000" }}>*</span></label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="example@email.com"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>관심 패키지</label>
                <select
                  value={form.budget}
                  onChange={e => setForm({ ...form, budget: e.target.value })}
                  style={inputStyle}
                >
                  <option value="standard">스탠다드 (₩15,000,000~, 싱글 1곡)</option>
                  <option value="premium">프리미엄 (₩25,000,000~, EP 3곡)</option>
                  <option value="enterprise">엔터프라이즈 (정규 앨범, 별도 협의)</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>문의 내용</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="원하시는 음악 스타일, 참고 곡, 또는 기타 문의사항을 작성해 주십시오."
                  rows={4}
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>
              {error && <p style={{ fontSize: "14px", color: "#c00" }}>{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                style={{ width: "100%", padding: "16px", background: "#000000", color: "#FAFAFA", fontSize: "15px", fontWeight: 500, border: "none", cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.5 : 1, fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {submitting ? "전송 중..." : "문의 보내기"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 하단 네비 */}
      <div style={{ padding: "32px 48px", borderTop: "1px solid #D3D3D3", textAlign: "center" }}>
        <Link href="/experience" style={{ fontSize: "14px", color: "#5F5F5F", textDecoration: "none" }}>
          ← 체험 에디션 보러가기
        </Link>
      </div>
    </div>
  );
}
