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

const PLATFORMS = ["Instagram", "YouTube", "TikTok", "Naver Blog", "Thread", "기타"];
const HASHTAGS = ["#레코딩카페", "#RecordingCafe", "#녹음실추천", "#kpop녹음", "#서울녹음실", "#강남녹음", "#신사역녹음"];

export default function UGCPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", platform: "Instagram",
    postUrl: "", message: "",
  });
  const [copiedTag, setCopiedTag] = useState("");

  function copyTag(tag: string) {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(""), 2000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/ugc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          hashtags: HASHTAGS.join(" "),
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

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#FAFAFA", color: "#5F5F5F" }}>

      {/* 히어로 */}
      <section style={{ padding: "120px 48px 96px", background: "#FAFAFA", borderBottom: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={labelSt}>UGC Review Rewards</p>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 400, color: "#000", letterSpacing: "-2px", lineHeight: 1.1, marginBottom: "32px" }}>
            리뷰 보상<br />프로그램
          </h1>
          <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#5F5F5F", maxWidth: "560px", marginBottom: "40px" }}>
            레코딩카페에서의 특별한 경험을 SNS에 공유하세요. 해시태그 인증 게시물에 즉시 포인트를 지급합니다.
          </p>
          <a href="#submit"
            style={{ display: "inline-block", background: "#000", color: "#FAFAFA", padding: "16px 40px", fontSize: "15px", fontWeight: 500, textDecoration: "none", letterSpacing: "0.5px" }}>
            인증 제출하기
          </a>
        </div>
      </section>

      {/* 포인트 적립 안내 */}
      <section style={{ background: "#000", padding: "80px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ ...labelSt, color: "#DFCF99" }}>Points System</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#FAFAFA", letterSpacing: "-1px", marginBottom: "56px" }}>포인트 적립</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: "0" }}>
            {[
              { type: "Instagram 스토리", points: "1,000P", cond: "레코딩카페 태그 + 해시태그" },
              { type: "Instagram 피드", points: "3,000P", cond: "해시태그 2개 이상 + 공개 계정" },
              { type: "YouTube 쇼츠", points: "5,000P", cond: "1분 이상 · 레코딩카페 언급" },
              { type: "YouTube 일반 영상", points: "10,000P", cond: "3분 이상 · 자막 또는 음성 언급" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "40px 32px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase" as const, color: "#8B8675", marginBottom: "16px" }}>{item.type}</p>
                <p style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, color: "#DFCF99", letterSpacing: "-1px", marginBottom: "8px" }}>{item.points}</p>
                <p style={{ fontSize: "13px", color: "rgba(250,250,250,0.45)", lineHeight: 1.6 }}>{item.cond}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 이달의 베스트 */}
      <section style={{ background: "#F0EFEB", borderBottom: "1px solid #D3D3D3", padding: "96px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={labelSt}>Monthly Best Content</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 54px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "24px" }}>
            이달의 베스트
          </h2>
          <p style={{ fontSize: "16px", color: "#5F5F5F", marginBottom: "48px" }}>
            매월 선정된 베스트 콘텐츠 제작자에게 <strong style={{ color: "#1A1A1A" }}>무료 체험 이용권</strong>을 드립니다.
          </p>
          {/* placeholder */}
          <div style={{ border: "1px solid #D3D3D3", padding: "80px 48px", textAlign: "center", background: "#FAFAFA" }}>
            <p style={{ fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase" as const, color: "#8B8675", marginBottom: "16px" }}>March 2026</p>
            <p style={{ fontSize: "20px", fontWeight: 400, color: "#000", marginBottom: "12px" }}>이달의 베스트 콘텐츠를 모집 중입니다</p>
            <p style={{ fontSize: "14px", color: "#8B8675" }}>인스타그램·유튜브에 레코딩카페 해시태그를 달고 게시물을 업로드하세요.</p>
          </div>
        </div>
      </section>

      {/* 해시태그 가이드 */}
      <section style={{ background: "#FAFAFA", borderBottom: "1px solid #D3D3D3", padding: "96px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={labelSt}>Hashtag Guide</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 54px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "24px" }}>
            사용 해시태그
          </h2>
          <p style={{ fontSize: "16px", color: "#5F5F5F", marginBottom: "40px" }}>
            아래 해시태그를 게시물에 포함해야 인증이 인정됩니다. 클릭하면 클립보드에 복사됩니다.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {HASHTAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => copyTag(tag)}
                style={{
                  padding: "10px 20px", background: copiedTag === tag ? "#000" : "#F0EFEB",
                  color: copiedTag === tag ? "#FAFAFA" : "#1A1A1A",
                  border: "1px solid #D3D3D3", fontSize: "14px", fontWeight: 500, cursor: "pointer",
                  fontFamily: "var(--font-dm-sans), sans-serif", transition: "all 0.2s",
                }}>
                {copiedTag === tag ? "복사됨 ✓" : tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 인증 제출 폼 */}
      <section id="submit" style={{ background: "#F0EFEB", borderBottom: "1px solid #D3D3D3", padding: "96px 48px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={labelSt}>Submit</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "12px" }}>
            게시물 인증 제출
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#5F5F5F", marginBottom: "48px" }}>
            게시물 URL을 제출하면 담당자가 확인 후 1~2 영업일 내에 포인트를 지급합니다.
          </p>

          {submitted ? (
            <div style={{ padding: "64px 48px", border: "1px solid #D3D3D3", background: "#FAFAFA", textAlign: "center" }}>
              <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" as const, color: "#8B8675", marginBottom: "16px" }}>Submitted</p>
              <h3 style={{ fontSize: "24px", fontWeight: 400, color: "#000", marginBottom: "12px" }}>인증이 제출되었습니다</h3>
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#5F5F5F", marginBottom: "32px" }}>
                담당자 확인 후 1~2 영업일 내에 포인트가 지급됩니다.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{ background: "#000", color: "#FAFAFA", padding: "14px 36px", fontSize: "14px", fontWeight: 500, border: "none", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                추가 인증 제출하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>이름 <span style={{ color: "#000" }}>*</span></label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="실명 또는 닉네임" style={inputSt} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>이메일 <span style={{ color: "#000" }}>*</span></label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="포인트 발송 이메일" style={inputSt} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>게시 플랫폼 <span style={{ color: "#000" }}>*</span></label>
                <select required value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} style={inputSt}>
                  {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>게시물 URL <span style={{ color: "#000" }}>*</span></label>
                <input required type="url" value={form.postUrl} onChange={e => setForm({ ...form, postUrl: e.target.value })} placeholder="https://www.instagram.com/p/..." style={inputSt} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>추가 메시지</label>
                <textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="촬영한 공간, 이용 프로그램 등 추가 정보를 자유롭게 작성해 주세요."
                  style={{ ...inputSt, resize: "none" }} />
              </div>
              {error && <p style={{ color: "#B00", fontSize: "14px" }}>{error}</p>}
              <button type="submit" disabled={submitting}
                style={{ width: "100%", padding: "16px", background: "#000", color: "#FAFAFA", fontSize: "15px", fontWeight: 500, border: "none", cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.5 : 1, fontFamily: "var(--font-dm-sans), sans-serif" }}>
                {submitting ? "제출 중..." : "인증 제출하기"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#FAFAFA", padding: "96px 48px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p style={labelSt}>Join The Community</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "24px" }}>
            레코딩카페를 경험하셨나요?
          </h2>
          <p style={{ fontSize: "16px", color: "#5F5F5F", lineHeight: 1.75, marginBottom: "40px" }}>
            아직 방문하지 않으셨다면 지금 체험 프로그램을 예약하고, K-POP 스타들이 녹음한 그 스튜디오에서 특별한 경험을 만들어 보세요.
          </p>
          <Link href="/experience"
            style={{ display: "inline-block", background: "#000", color: "#FAFAFA", padding: "16px 40px", fontSize: "15px", fontWeight: 500, textDecoration: "none", letterSpacing: "0.5px" }}>
            체험 프로그램 예약하기
          </Link>
        </div>
      </section>

    </div>
  );
}
