"use client";
import { useState, useEffect, use } from "react";

const labelSt: React.CSSProperties = {
  fontSize: "11px", fontWeight: 500, letterSpacing: "2px",
  textTransform: "uppercase", color: "#8B8675", marginBottom: "16px",
};
const inputSt: React.CSSProperties = {
  width: "100%", background: "#FAFAFA", border: "1px solid #D3D3D3",
  padding: "12px 16px", fontSize: "15px", color: "#1A1A1A", outline: "none",
  fontFamily: "var(--font-dm-sans), sans-serif",
};

type Affiliate = {
  id: number;
  business_name: string;
  affiliate_code: string;
  commission_rate: number;
};

const SERVICES = [
  { id: "experience", name: "녹음 체험", price: "₩40,000~", desc: "K-POP 전문 레코딩 부스에서 녹음. 음원 파일 제공." },
  { id: "docent", name: "도슨트 프로그램", price: "₩35,000", desc: "30년 K-POP 릴테이프 도슨트. 4개국어 해설 제공." },
  { id: "group", name: "단체 관람", price: "₩28,000~/인", desc: "10인 이상 단체 예약. 전용 진행 및 특별 구성." },
  { id: "membership", name: "K-PASS 멤버십", price: "₩150,000~/월", desc: "월정액 무제한 녹음. 멤버 전용 혜택." },
  { id: "pro", name: "프로 에디션", price: "₩1,500,000~", desc: "정식 음반 제작·믹싱·마스터링·글로벌 발매." },
];

export default function AffiliateBookingPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [form, setForm] = useState({
    customerName: "", customerPhone: "", customerEmail: "",
    desiredDate: "", desiredTime: "", headcount: "1", message: "",
  });

  useEffect(() => {
    fetch(`/api/affiliate/${code}`)
      .then(r => r.json())
      .then(data => {
        if (data.error || !data.affiliate) { setNotFound(true); }
        else { setAffiliate(data.affiliate); }
        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [code]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedService) { setError("프로그램을 선택해주세요."); return; }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`/api/affiliate/${code}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          serviceType: selectedService,
          headcount: Number(form.headcount),
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

  if (loading) {
    return (
      <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: "15px", color: "#8B8675" }}>로딩 중...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px" }}>
        <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" as const, color: "#8B8675", marginBottom: "16px" }}>Not Found</p>
        <h1 style={{ fontSize: "32px", fontWeight: 400, color: "#000", marginBottom: "16px" }}>유효하지 않은 파트너 코드입니다</h1>
        <p style={{ fontSize: "15px", color: "#5F5F5F", marginBottom: "32px" }}>링크를 다시 확인해주세요.</p>
        <a href="/" style={{ background: "#000", color: "#FAFAFA", padding: "14px 36px", fontSize: "15px", fontWeight: 500, textDecoration: "none" }}>홈으로</a>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#FAFAFA", color: "#5F5F5F" }}>

      {/* 파트너 배너 */}
      <div style={{ background: "#000", padding: "16px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <p style={{ fontSize: "13px", color: "rgba(250,250,250,0.55)", letterSpacing: "0.3px" }}>
            <span style={{ color: "#DFCF99", fontWeight: 500 }}>{affiliate?.business_name}</span>에서 소개하는 레코딩카페
          </p>
          <p style={{ fontSize: "12px", color: "rgba(250,250,250,0.35)", letterSpacing: "1px", textTransform: "uppercase" as const }}>Official Partner Page</p>
        </div>
      </div>

      {/* 히어로 */}
      <section style={{ padding: "80px 48px 64px", background: "#FAFAFA", borderBottom: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={labelSt}>Recording Café · Exclusive Booking</p>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 400, color: "#000", letterSpacing: "-2px", lineHeight: 1.1, marginBottom: "24px" }}>
            레코딩카페<br />예약
          </h1>
          <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#5F5F5F", maxWidth: "520px" }}>
            실제 K-POP 스타들이 녹음한 전문 스튜디오에서 나만의 녹음 경험을 만들어 보세요.
            아래에서 원하시는 프로그램을 선택하고 예약해주세요.
          </p>
        </div>
      </section>

      {/* 프로그램 선택 */}
      <section style={{ background: "#F0EFEB", borderBottom: "1px solid #D3D3D3", padding: "64px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={labelSt}>Programs</p>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "40px" }}>
            프로그램 선택
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "0", borderTop: "1px solid #D3D3D3", borderLeft: "1px solid #D3D3D3" }}>
            {SERVICES.map((svc) => (
              <button
                key={svc.id}
                onClick={() => setSelectedService(svc.id)}
                style={{
                  textAlign: "left", padding: "32px", background: selectedService === svc.id ? "#000" : "#FAFAFA",
                  border: "none", borderRight: "1px solid #D3D3D3", borderBottom: "1px solid #D3D3D3",
                  cursor: "pointer", transition: "all 0.2s", fontFamily: "var(--font-dm-sans), sans-serif",
                }}>
                <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" as const, color: selectedService === svc.id ? "#DFCF99" : "#8B8675", marginBottom: "12px" }}>
                  {selectedService === svc.id ? "✓ 선택됨" : "선택하기"}
                </p>
                <h3 style={{ fontSize: "17px", fontWeight: 500, color: selectedService === svc.id ? "#FAFAFA" : "#000", marginBottom: "8px" }}>{svc.name}</h3>
                <p style={{ fontSize: "14px", lineHeight: 1.6, color: selectedService === svc.id ? "rgba(250,250,250,0.6)" : "#5F5F5F", marginBottom: "16px" }}>{svc.desc}</p>
                <p style={{ fontSize: "16px", fontWeight: 500, color: selectedService === svc.id ? "#DFCF99" : "#1A1A1A" }}>{svc.price}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 예약 폼 */}
      <section style={{ background: "#FAFAFA", padding: "80px 48px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={labelSt}>Booking Form</p>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "12px" }}>
            예약 정보 입력
          </h2>
          <p style={{ fontSize: "15px", color: "#5F5F5F", marginBottom: "40px" }}>
            예약 접수 후 담당자가 확정 연락을 드립니다.
          </p>

          {submitted ? (
            <div style={{ padding: "64px 48px", border: "1px solid #D3D3D3", background: "#F0EFEB", textAlign: "center" }}>
              <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" as const, color: "#8B8675", marginBottom: "16px" }}>Booking Received</p>
              <h3 style={{ fontSize: "24px", fontWeight: 400, color: "#000", marginBottom: "12px" }}>예약이 접수되었습니다</h3>
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#5F5F5F" }}>
                담당자가 확인 후 입력하신 연락처로 1~2 영업일 내에 예약 확정 안내를 드립니다.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {selectedService && (
                <div style={{ padding: "16px 20px", background: "#000", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontSize: "14px", color: "#FAFAFA" }}>선택 프로그램</p>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "#DFCF99" }}>
                    {SERVICES.find(s => s.id === selectedService)?.name}
                  </p>
                </div>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>이름 <span style={{ color: "#000" }}>*</span></label>
                  <input required value={form.customerName} onChange={e => setForm({ ...form, customerName: e.target.value })} placeholder="실명" style={inputSt} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>연락처 <span style={{ color: "#000" }}>*</span></label>
                  <input required value={form.customerPhone} onChange={e => setForm({ ...form, customerPhone: e.target.value })} placeholder="010-0000-0000" style={inputSt} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>이메일</label>
                <input type="email" value={form.customerEmail} onChange={e => setForm({ ...form, customerEmail: e.target.value })} placeholder="example@email.com" style={inputSt} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>희망 날짜 <span style={{ color: "#000" }}>*</span></label>
                  <input required type="date" value={form.desiredDate} onChange={e => setForm({ ...form, desiredDate: e.target.value })} style={inputSt} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>희망 시간</label>
                  <select value={form.desiredTime} onChange={e => setForm({ ...form, desiredTime: e.target.value })} style={inputSt}>
                    <option value="">선택 없음</option>
                    {["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>인원 수 <span style={{ color: "#000" }}>*</span></label>
                <input required type="number" min="1" value={form.headcount} onChange={e => setForm({ ...form, headcount: e.target.value })} placeholder="1" style={inputSt} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>추가 요청 사항</label>
                <textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="특별한 요청 사항이 있으시면 자유롭게 작성해 주세요."
                  style={{ ...inputSt, resize: "none" }} />
              </div>
              {error && <p style={{ color: "#B00", fontSize: "14px" }}>{error}</p>}
              <button type="submit" disabled={submitting}
                style={{ width: "100%", padding: "16px", background: "#000", color: "#FAFAFA", fontSize: "15px", fontWeight: 500, border: "none", cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.5 : 1, fontFamily: "var(--font-dm-sans), sans-serif" }}>
                {submitting ? "예약 접수 중..." : "예약 신청하기"}
              </button>
              <p style={{ fontSize: "12px", color: "#8B8675", lineHeight: 1.6 }}>
                * 본 예약은 {affiliate?.business_name} 파트너를 통한 예약입니다. 예약 접수 후 레코딩카페 담당자가 직접 연락드립니다.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* 위치 정보 */}
      <section style={{ background: "#F0EFEB", borderTop: "1px solid #D3D3D3", padding: "64px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "0", borderTop: "1px solid #D3D3D3" }}>
            {[
              { label: "주소", main: "서울 서초구 강남대로107길 21, 2층", sub: "신사역 3호선 5번 출구 도보 4분" },
              { label: "운영 시간", main: "매일 12:00 – 21:00", sub: "연중무휴 · 사전 예약 권장" },
              { label: "문의", main: "네이버 톡톡", sub: "talk.naver.com/ct/wu2kkmv" },
            ].map((loc, i) => (
              <div key={i} style={{ padding: "40px 0 0", paddingRight: "48px", borderRight: i < 2 ? "1px solid #D3D3D3" : "none", paddingLeft: i > 0 ? "48px" : "0" }}>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase" as const, color: "#8B8675", marginBottom: "12px" }}>{loc.label}</p>
                <p style={{ fontSize: "16px", color: "#1A1A1A", marginBottom: "6px" }}>{loc.main}</p>
                <p style={{ fontSize: "13px", color: "#8B8675" }}>{loc.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
