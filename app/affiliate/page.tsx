"use client";
import { useState } from "react";

const labelSt: React.CSSProperties = {
  fontSize: "11px", fontWeight: 500, letterSpacing: "2px",
  textTransform: "uppercase", color: "#8B8675", marginBottom: "16px",
};
const inputSt: React.CSSProperties = {
  width: "100%", background: "#FAFAFA", border: "1px solid #D3D3D3",
  padding: "12px 16px", fontSize: "15px", color: "#1A1A1A", outline: "none",
  fontFamily: "var(--font-dm-sans), sans-serif",
};

const PLATFORM_TYPES = [
  { value: "blog", label: "블로그 (네이버·티스토리 등)" },
  { value: "youtube", label: "YouTube 채널" },
  { value: "community", label: "온라인 커뮤니티·카페" },
  { value: "sns", label: "SNS (인스타·트위터 등)" },
  { value: "hotel", label: "호텔·숙박업소" },
  { value: "travel", label: "여행사·관광" },
  { value: "offline", label: "오프라인 매장·공간" },
  { value: "other", label: "기타" },
];

export default function AffiliatePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    businessName: "", contactName: "", email: "", phone: "",
    websiteUrl: "", platformType: "", audienceSize: "", description: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/affiliate/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "오류가 발생했습니다.");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#FAFAFA", color: "#5F5F5F" }}>

      {/* 히어로 */}
      <section style={{ padding: "120px 48px 96px", background: "#FAFAFA", borderBottom: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={labelSt}>Affiliate Marketing Program</p>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 400, color: "#000", letterSpacing: "-2px", lineHeight: 1.1, marginBottom: "32px" }}>
            제휴 마케팅<br />프로그램
          </h1>
          <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#5F5F5F", maxWidth: "580px", marginBottom: "48px" }}>
            레코딩카페 제휴 파트너가 되어 수익을 창출하세요. 신청 즉시 전용 예약 페이지와 트래킹 링크가 자동으로 발급됩니다. 링크를 통해 발생한 모든 예약에 대해 <strong style={{ color: "#1A1A1A" }}>20% 수수료</strong>를 지급합니다.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            <a href="#apply"
              style={{ display: "inline-block", background: "#000", color: "#FAFAFA", padding: "16px 40px", fontSize: "15px", fontWeight: 500, textDecoration: "none", letterSpacing: "0.5px" }}>
              제휴 신청하기
            </a>
            <a href="#how"
              style={{ display: "inline-block", background: "transparent", border: "1px solid #D3D3D3", color: "#5F5F5F", padding: "16px 40px", fontSize: "15px", fontWeight: 400, textDecoration: "none" }}>
              작동 방식 보기
            </a>
          </div>
        </div>
      </section>

      {/* 핵심 수치 */}
      <section style={{ background: "#000", padding: "72px 48px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: "0" }}>
            {[
              { num: "20%", label: "수수료율", desc: "예약 금액 기준" },
              { num: "즉시", label: "링크 발급", desc: "승인 후 자동 생성" },
              { num: "실시간", label: "통계 조회", desc: "전용 대시보드 제공" },
              { num: "월별", label: "수수료 정산", desc: "이체 또는 크레딧" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "40px 36px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                <p style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#DFCF99", letterSpacing: "-1px", marginBottom: "8px" }}>{item.num}</p>
                <p style={{ fontSize: "14px", fontWeight: 500, color: "#FAFAFA", marginBottom: "4px" }}>{item.label}</p>
                <p style={{ fontSize: "12px", color: "rgba(250,250,250,0.35)", letterSpacing: "0.5px" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 작동 방식 */}
      <section id="how" style={{ background: "#F0EFEB", borderBottom: "1px solid #D3D3D3", padding: "96px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={labelSt}>How It Works</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 54px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "64px" }}>작동 방식</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0", borderTop: "1px solid #D3D3D3" }}>
            {[
              {
                step: "01",
                title: "온라인 신청",
                desc: "아래 양식을 작성하여 제출합니다. 채널 종류, 규모, 운영 방식을 입력해 주세요.",
                sub: "승인까지 영업일 2일 소요",
              },
              {
                step: "02",
                title: "승인 & 코드 발급",
                desc: "담당자 검토 후 승인이 완료되면 이메일로 제휴 코드와 전용 링크가 즉시 발급됩니다.",
                sub: "개인화된 예약 페이지 URL 포함",
              },
              {
                step: "03",
                title: "마케팅 도구 활용",
                desc: "발급받은 링크를 블로그·SNS·유튜브에 삽입하거나, 위젯 코드를 홈페이지에 임베드하세요.",
                sub: "트래킹 링크 + 예약 위젯 + QR코드 제공",
              },
              {
                step: "04",
                title: "수수료 적립 & 정산",
                desc: "링크를 통해 예약이 발생하면 실시간으로 적립됩니다. 매월 말일 기준으로 수수료를 정산합니다.",
                sub: "예약 금액의 20% · 계좌이체 또는 크레딧",
              },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "48px", padding: "48px 0", borderBottom: "1px solid #D3D3D3", alignItems: "flex-start" }}>
                <p style={{ fontSize: "48px", fontWeight: 400, color: "#D3D3D3", letterSpacing: "-2px", minWidth: "80px", lineHeight: 1 }}>{item.step}</p>
                <div>
                  <h3 style={{ fontSize: "20px", fontWeight: 500, color: "#000", marginBottom: "12px" }}>{item.title}</h3>
                  <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#5F5F5F", marginBottom: "12px" }}>{item.desc}</p>
                  <p style={{ fontSize: "13px", color: "#8B8675" }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 마케팅 도구 */}
      <section style={{ background: "#FAFAFA", borderBottom: "1px solid #D3D3D3", padding: "96px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={labelSt}>Marketing Tools</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 54px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "16px" }}>
            제공되는 마케팅 도구
          </h2>
          <p style={{ fontSize: "16px", color: "#5F5F5F", marginBottom: "64px" }}>
            승인 후 즉시 사용 가능한 3가지 마케팅 도구가 제공됩니다.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "0", borderTop: "1px solid #D3D3D3" }}>
            {[
              {
                icon: "🔗",
                title: "트래킹 링크",
                desc: "예: recording.cafe/affiliate/your-code\n\n블로그 포스팅, SNS 프로필, 유튜브 설명란 등 어디서든 삽입할 수 있는 고유 링크입니다. 클릭수와 예약 수가 실시간으로 집계됩니다.",
              },
              {
                icon: "📱",
                title: "예약 위젯",
                desc: "iframe 코드 한 줄로 파트너 홈페이지에 레코딩카페 예약 폼을 바로 삽입할 수 있습니다. 고객이 페이지를 이탈하지 않고 예약을 완료하고, 수수료는 자동 집계됩니다.",
              },
              {
                icon: "◼",
                title: "QR 코드",
                desc: "오프라인 현장(호텔 객실 안내문, 팜플렛, 포스터 등)에 부착할 수 있는 전용 QR코드입니다. 스캔하면 파트너 전용 예약 페이지로 즉시 이동합니다.",
              },
            ].map((tool, i) => (
              <div key={i} style={{ padding: "48px 40px", borderRight: i < 2 ? "1px solid #D3D3D3" : "none" }}>
                <p style={{ fontSize: "32px", marginBottom: "24px" }}>{tool.icon}</p>
                <h3 style={{ fontSize: "18px", fontWeight: 500, color: "#000", marginBottom: "16px" }}>{tool.title}</h3>
                <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#5F5F5F", whiteSpace: "pre-line" }}>{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 수수료 구조 */}
      <section style={{ background: "#F0EFEB", borderBottom: "1px solid #D3D3D3", padding: "96px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={labelSt}>Commission Structure</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 54px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "64px" }}>수수료 구조</h2>
          <div style={{ border: "1px solid #D3D3D3", background: "#FAFAFA" }}>
            {/* 헤더 */}
            <div className="grid grid-cols-4" style={{ borderBottom: "1px solid #D3D3D3", background: "#F0EFEB" }}>
              {["서비스", "기본 가격", "수수료 (20%)", "예약 1건당 수익"].map((h, i) => (
                <div key={i} style={{ padding: "16px 24px", fontSize: "11px", fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase" as const, color: "#8B8675", borderRight: i < 3 ? "1px solid #D3D3D3" : "none" }}>{h}</div>
              ))}
            </div>
            {/* 행 */}
            {[
              { service: "녹음 체험", price: "₩40,000~", rate: "20%", earn: "₩8,000~" },
              { service: "도슨트 프로그램", price: "₩35,000", rate: "20%", earn: "₩7,000" },
              { service: "단체 관람 (10인)", price: "₩280,000~", rate: "20%", earn: "₩56,000~" },
              { service: "K-PASS 멤버십 (월)", price: "₩150,000~", rate: "20%", earn: "₩30,000~" },
              { service: "프로 에디션", price: "₩1,500,000~", rate: "20%", earn: "₩300,000~" },
            ].map((row, i, arr) => (
              <div key={i} className="grid grid-cols-4" style={{ borderBottom: i < arr.length - 1 ? "1px solid #D3D3D3" : "none" }}>
                <div style={{ padding: "20px 24px", fontSize: "15px", color: "#1A1A1A", borderRight: "1px solid #D3D3D3" }}>{row.service}</div>
                <div style={{ padding: "20px 24px", fontSize: "15px", color: "#5F5F5F", borderRight: "1px solid #D3D3D3" }}>{row.price}</div>
                <div style={{ padding: "20px 24px", fontSize: "15px", color: "#5F5F5F", borderRight: "1px solid #D3D3D3" }}>{row.rate}</div>
                <div style={{ padding: "20px 24px", fontSize: "15px", fontWeight: 500, color: "#000" }}>{row.earn}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "13px", color: "#8B8675", marginTop: "16px" }}>
            * 수수료는 실제 방문 완료 후 매월 말일 기준으로 정산됩니다. 취소·환불 건은 제외됩니다.
          </p>
        </div>
      </section>

      {/* 신청 폼 */}
      <section id="apply" style={{ background: "#FAFAFA", borderBottom: "1px solid #D3D3D3", padding: "96px 48px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={labelSt}>Apply Now</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "12px" }}>
            제휴 마케팅 신청
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#5F5F5F", marginBottom: "48px" }}>
            영업일 2일 이내에 담당자가 이메일로 승인 여부와 함께 마케팅 도구 일체를 발송합니다.
          </p>

          {submitted ? (
            <div style={{ padding: "64px 48px", border: "1px solid #D3D3D3", background: "#F0EFEB", textAlign: "center" }}>
              <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" as const, color: "#8B8675", marginBottom: "16px" }}>Application Received</p>
              <h3 style={{ fontSize: "24px", fontWeight: 400, color: "#000", marginBottom: "12px" }}>신청이 완료되었습니다</h3>
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#5F5F5F" }}>
                영업일 2일 이내에 이메일로 승인 여부와 전용 링크·위젯 코드를 발송드립니다.<br />스팸함도 확인해 주세요.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>업체·채널명 <span style={{ color: "#000" }}>*</span></label>
                  <input required value={form.businessName} onChange={e => setForm({ ...form, businessName: e.target.value })} placeholder="예: 강남 리버사이드 호텔" style={inputSt} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>담당자 이름 <span style={{ color: "#000" }}>*</span></label>
                  <input required value={form.contactName} onChange={e => setForm({ ...form, contactName: e.target.value })} placeholder="홍길동" style={inputSt} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>이메일 <span style={{ color: "#000" }}>*</span></label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="partner@example.com" style={inputSt} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>연락처 <span style={{ color: "#000" }}>*</span></label>
                  <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="010-0000-0000" style={inputSt} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>채널·플랫폼 유형 <span style={{ color: "#000" }}>*</span></label>
                <select required value={form.platformType} onChange={e => setForm({ ...form, platformType: e.target.value })} style={inputSt}>
                  <option value="">선택하세요</option>
                  {PLATFORM_TYPES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>홈페이지·채널 URL</label>
                <input type="url" value={form.websiteUrl} onChange={e => setForm({ ...form, websiteUrl: e.target.value })} placeholder="https://yourblog.com" style={inputSt} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>월 방문자 / 구독자 규모</label>
                <input value={form.audienceSize} onChange={e => setForm({ ...form, audienceSize: e.target.value })} placeholder="예: 월 방문자 5만명, 구독자 3만명" style={inputSt} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>제휴 방식 및 활용 계획</label>
                <textarea rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="레코딩카페 링크를 어떻게 활용하실 계획인지 자유롭게 작성해 주세요. (블로그 포스팅, 유튜브 영상 설명란, 호텔 객실 안내문 등)"
                  style={{ ...inputSt, resize: "none" }} />
              </div>
              {error && <p style={{ color: "#B00", fontSize: "14px" }}>{error}</p>}
              <button type="submit" disabled={loading}
                style={{ width: "100%", padding: "16px", background: "#000", color: "#FAFAFA", fontSize: "15px", fontWeight: 500, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.5 : 1, fontFamily: "var(--font-dm-sans), sans-serif" }}>
                {loading ? "제출 중..." : "제휴 신청하기"}
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
