"use client";
import { useState } from "react";
import Link from "next/link";

const labelSt: React.CSSProperties = {
  fontSize: "11px", fontWeight: 500, letterSpacing: "2px",
  textTransform: "uppercase", color: "#8B8675", marginBottom: "16px",
};
const inputSt: React.CSSProperties = {
  width: "100%", background: "#FAFAFA", border: "1px solid #D3D3D3",
  padding: "12px 16px", fontSize: "15px", color: "#1A1A1A", outline: "none",
  fontFamily: "var(--font-dm-sans), sans-serif",
};

export default function ReferralPage() {
  const [step, setStep] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ code: string; referred_count: number } | null>(null);
  const [form, setForm] = useState({ name: "", email: "" });

  async function handleRequest(e: React.FormEvent) {
    e.preventDefault();
    setStep("loading");
    setError("");
    try {
      const res = await fetch("/api/referral/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "오류가 발생했습니다.");
      setResult(data);
      setStep("done");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
      setStep("idle");
    }
  }

  const referralLink = result ? `${typeof window !== "undefined" ? window.location.origin : "https://recording.cafe"}/booking?ref=${result.code}` : "";

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#FAFAFA", color: "#5F5F5F" }}>

      {/* 히어로 */}
      <section style={{ padding: "120px 48px 96px", background: "#FAFAFA", borderBottom: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={labelSt}>Refer-a-Friend</p>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 400, color: "#000", letterSpacing: "-2px", lineHeight: 1.1, marginBottom: "32px" }}>
            친구 추천<br />프로그램
          </h1>
          <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#5F5F5F", maxWidth: "560px", marginBottom: "40px" }}>
            레코딩카페를 경험한 분들만 아는 특별함을 지인에게 소개하세요. 친구가 예약하면 레코딩 1시간 무료 쿠폰을 드립니다.
          </p>
          <a href="#get-code"
            style={{ display: "inline-block", background: "#000", color: "#FAFAFA", padding: "16px 40px", fontSize: "15px", fontWeight: 500, textDecoration: "none", letterSpacing: "0.5px" }}>
            내 추천 코드 받기
          </a>
        </div>
      </section>

      {/* 작동 방식 */}
      <section style={{ background: "#F0EFEB", borderBottom: "1px solid #D3D3D3", padding: "96px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={labelSt}>How It Works</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 54px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "64px" }}>작동 방식</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "0", borderTop: "1px solid #D3D3D3" }}>
            {[
              { num: "01", title: "코드 발급", desc: "아래 양식에 이름과 이메일을 입력하면 나만의 추천 코드가 즉시 발급됩니다." },
              { num: "02", title: "친구에게 공유", desc: "카카오톡, 문자, SNS로 링크를 공유하세요. 친구는 예약 시 10% 할인 혜택을 받습니다." },
              { num: "03", title: "보상 지급", desc: "추천받은 친구가 실제 예약·방문하면 레코딩 1시간 무료 이용권이 자동 발급됩니다." },
            ].map((step, i) => (
              <div key={i} style={{ padding: "48px 40px", borderRight: i < 2 ? "1px solid #D3D3D3" : "none", background: "#FAFAFA" }}>
                <p style={{ fontSize: "36px", fontWeight: 400, color: "#DFCF99", letterSpacing: "-1px", marginBottom: "24px" }}>{step.num}</p>
                <h3 style={{ fontSize: "18px", fontWeight: 500, color: "#000", marginBottom: "12px" }}>{step.title}</h3>
                <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#5F5F5F" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 보상 상세 */}
      <section style={{ background: "#FAFAFA", borderBottom: "1px solid #D3D3D3", padding: "96px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={labelSt}>Rewards</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 54px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "64px" }}>보상 내역</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "0", border: "1px solid #D3D3D3" }}>
            <div style={{ padding: "56px 48px", borderRight: "1px solid #D3D3D3" }}>
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase" as const, color: "#8B8675", marginBottom: "16px" }}>추천인 (나)</p>
              <p style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "16px" }}>레코딩 1시간</p>
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#5F5F5F", marginBottom: "24px" }}>
                추천받은 친구가 방문 완료하면 <strong style={{ color: "#1A1A1A" }}>레코딩 부스 1시간 무료 이용권</strong>이 이메일로 발송됩니다. 발급 후 90일 내 사용 가능합니다.
              </p>
              <p style={{ fontSize: "13px", color: "#8B8675" }}>· 친구 1명 방문 시 1개 쿠폰 발급<br />· 무제한 추천 가능</p>
            </div>
            <div style={{ padding: "56px 48px" }}>
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase" as const, color: "#8B8675", marginBottom: "16px" }}>피추천인 (친구)</p>
              <p style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "16px" }}>10% 할인</p>
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#5F5F5F", marginBottom: "24px" }}>
                추천 링크로 접속한 친구는 첫 예약 시 <strong style={{ color: "#1A1A1A" }}>10% 할인</strong>을 자동으로 받습니다. 별도 코드 입력 없이 링크만으로 적용됩니다.
              </p>
              <p style={{ fontSize: "13px", color: "#8B8675" }}>· 첫 방문 1회에 한해 적용<br />· 모든 체험 프로그램 적용</p>
            </div>
          </div>
        </div>
      </section>

      {/* 코드 발급 */}
      <section id="get-code" style={{ background: "#F0EFEB", borderBottom: "1px solid #D3D3D3", padding: "96px 48px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <p style={labelSt}>Get Your Code</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "12px" }}>
            내 추천 코드 받기
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#5F5F5F", marginBottom: "48px" }}>
            이름과 이메일만 입력하면 즉시 발급됩니다.
          </p>

          {step === "done" && result ? (
            <div style={{ background: "#FAFAFA", border: "1px solid #D3D3D3", padding: "48px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" as const, color: "#8B8675", marginBottom: "16px" }}>Your Code</p>
              <p style={{ fontSize: "40px", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "24px", fontVariantNumeric: "tabular-nums" }}>
                {result.code}
              </p>
              <div style={{ background: "#F0EFEB", border: "1px solid #D3D3D3", padding: "16px", marginBottom: "24px", wordBreak: "break-all" }}>
                <p style={{ fontSize: "12px", color: "#8B8675", marginBottom: "6px" }}>추천 링크</p>
                <p style={{ fontSize: "14px", color: "#1A1A1A" }}>{referralLink}</p>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => { navigator.clipboard.writeText(referralLink); alert("링크가 복사되었습니다!"); }}
                  style={{ flex: 1, padding: "14px", background: "#000", color: "#FAFAFA", border: "none", fontSize: "14px", fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  링크 복사
                </button>
                <button
                  onClick={() => {
                    const kakaoUrl = `https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(referralLink)}`;
                    window.open(kakaoUrl, "_blank");
                  }}
                  style={{ flex: 1, padding: "14px", background: "#FAE100", color: "#3C1E1E", border: "none", fontSize: "14px", fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  카카오톡 공유
                </button>
              </div>
              <p style={{ fontSize: "13px", color: "#8B8675", marginTop: "20px" }}>
                지금까지 추천한 친구: {result.referred_count}명
              </p>
            </div>
          ) : (
            <form onSubmit={handleRequest} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>이름 <span style={{ color: "#000" }}>*</span></label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="실명" style={inputSt} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>이메일 <span style={{ color: "#000" }}>*</span></label>
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="example@email.com" style={inputSt} />
              </div>
              {error && <p style={{ color: "#B00", fontSize: "14px" }}>{error}</p>}
              <button type="submit" disabled={step === "loading"}
                style={{ width: "100%", padding: "16px", background: "#000", color: "#FAFAFA", fontSize: "15px", fontWeight: 500, border: "none", cursor: step === "loading" ? "not-allowed" : "pointer", opacity: step === "loading" ? 0.5 : 1, fontFamily: "var(--font-dm-sans), sans-serif" }}>
                {step === "loading" ? "발급 중..." : "추천 코드 발급받기"}
              </button>
              <p style={{ fontSize: "13px", color: "#8B8675", lineHeight: 1.6 }}>
                이미 코드를 발급받은 이메일로 다시 요청하면 기존 코드가 반환됩니다.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#FAFAFA", padding: "96px 48px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={labelSt}>FAQ</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "48px" }}>자주 묻는 질문</h2>
          <div style={{ borderTop: "1px solid #D3D3D3" }}>
            {[
              { q: "추천 코드는 몇 번이나 사용할 수 있나요?", a: "무제한 사용 가능합니다. 추천한 친구가 방문할 때마다 쿠폰이 발급됩니다." },
              { q: "친구가 할인을 받으려면 어떻게 해야 하나요?", a: "내 추천 링크로 접속하여 예약하면 자동으로 10% 할인이 적용됩니다. 별도 코드 입력이 필요 없습니다." },
              { q: "쿠폰은 언제 발급되나요?", a: "추천받은 친구가 실제 방문을 완료한 후 영업일 1~2일 내에 이메일로 발송됩니다." },
              { q: "이미 레코딩카페를 방문한 사람도 대상이 되나요?", a: "피추천인(친구) 할인은 첫 방문 고객에게만 적용됩니다. 기존 방문 고객이라면 할인은 적용되지 않지만, 추천인 쿠폰은 정상 발급됩니다." },
            ].map((faq, i) => (
              <div key={i} style={{ padding: "28px 0", borderBottom: "1px solid #D3D3D3" }}>
                <p style={{ fontSize: "16px", fontWeight: 500, color: "#1A1A1A", marginBottom: "10px" }}>Q. {faq.q}</p>
                <p style={{ fontSize: "15px", color: "#5F5F5F", lineHeight: 1.75 }}>A. {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
