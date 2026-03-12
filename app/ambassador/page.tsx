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

const PLATFORMS = ["YouTube", "팟캐스트", "Instagram", "TikTok", "Naver Blog", "트위치", "기타"];

export default function AmbassadorPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    channelName: "", channelUrl: "", platform: "YouTube",
    subscribers: "", contentType: "", message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/ambassador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subscribers: Number(form.subscribers) }),
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
          <p style={labelSt}>Brand Ambassador</p>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 400, color: "#000", letterSpacing: "-2px", lineHeight: 1.1, marginBottom: "32px" }}>
            브랜드<br />앰배서더
          </h1>
          <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#5F5F5F", maxWidth: "560px", marginBottom: "40px" }}>
            레코딩카페의 공식 앰배서더로 활동하세요. 단순 제휴를 넘어, 브랜드의 얼굴이 되는 충성 크리에이터를 위한 프로그램입니다.
          </p>
          <a href="#apply"
            style={{ display: "inline-block", background: "#000", color: "#FAFAFA", padding: "16px 40px", fontSize: "15px", fontWeight: 500, textDecoration: "none", letterSpacing: "0.5px" }}>
            앰배서더 신청하기
          </a>
        </div>
      </section>

      {/* 혜택 */}
      <section style={{ background: "#F0EFEB", borderTop: "1px solid #D3D3D3", borderBottom: "1px solid #D3D3D3", padding: "96px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={labelSt}>Ambassador Benefits</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 54px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "64px" }}>
            앰배서더 혜택
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "0", borderTop: "1px solid #D3D3D3" }}>
            {[
              { num: "01", title: "매월 레코딩 무료 이용", desc: "매월 4시간 레코딩 부스 또는 유튜브 스튜디오 무료 이용권을 제공합니다. 언제든 사전 예약 후 사용 가능합니다." },
              { num: "02", title: "음료 & 라운지 무료", desc: "방문할 때마다 음료와 라운지를 무료로 이용하실 수 있습니다. 촬영 세팅, 미팅 공간으로도 활용 가능합니다." },
              { num: "03", title: "공식 앰배서더 인증", desc: "홈페이지 명예의 전당 등재, 협회 공식 SNS 소개, 앰배서더 전용 디지털 뱃지 발급으로 브랜드 신뢰를 높여드립니다." },
            ].map((b, i) => (
              <div key={i} style={{ padding: "48px 40px", borderRight: i < 2 ? "1px solid #D3D3D3" : "none", background: "#FAFAFA" }}>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", color: "#8B8675", marginBottom: "24px" }}>{b.num}</p>
                <h3 style={{ fontSize: "20px", fontWeight: 500, color: "#000", marginBottom: "16px" }}>{b.title}</h3>
                <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#5F5F5F" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 활동 조건 */}
      <section style={{ background: "#FAFAFA", borderBottom: "1px solid #D3D3D3", padding: "96px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "0", borderTop: "1px solid #D3D3D3" }}>
            <div style={{ padding: "64px 0 0", paddingRight: "64px", borderRight: "1px solid #D3D3D3" }}>
              <p style={labelSt}>Qualification</p>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, color: "#000", letterSpacing: "-0.5px", marginBottom: "40px" }}>지원 자격</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {[
                  { title: "구독자 1만 명 이상", desc: "YouTube·팟캐스트·인스타그램 등 채널의 구독자·팔로워 합산 기준" },
                  { title: "정기 콘텐츠 발행", desc: "월 1회 이상 꾸준히 콘텐츠를 발행하고 있는 크리에이터" },
                  { title: "음악·K-POP 관련 채널", desc: "음악, 보컬, K-POP, 라이프스타일 등 레코딩카페와 연관성 있는 분야" },
                  { title: "장기 활동 의향", desc: "1년 이상 지속적으로 앰배서더 활동이 가능한 분" },
                ].map((item, i) => (
                  <div key={i} style={{ borderBottom: "1px solid #D3D3D3", paddingBottom: "24px" }}>
                    <p style={{ fontSize: "15px", fontWeight: 500, color: "#1A1A1A", marginBottom: "6px" }}>{item.title}</p>
                    <p style={{ fontSize: "14px", color: "#8B8675", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: "64px 0 0 64px" }}>
              <p style={labelSt}>Responsibilities</p>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, color: "#000", letterSpacing: "-0.5px", marginBottom: "40px" }}>앰배서더 역할</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {[
                  { title: "콘텐츠 자연 노출", desc: "월 1회 이상 콘텐츠에 레코딩카페를 자연스럽게 노출 (강요성 없이 자유롭게)" },
                  { title: "장소 협찬 명시", desc: "\"장소 협찬: 레코딩카페\" 또는 동일한 의미의 문구 표시" },
                  { title: "공식 SNS 팔로우", desc: "레코딩카페 공식 SNS 팔로우 및 주요 게시물 공유" },
                  { title: "연 1회 행사 참여", desc: "연 1회 레코딩카페 자체 행사·네트워킹 참여 (온라인 대체 가능)" },
                ].map((item, i) => (
                  <div key={i} style={{ borderBottom: "1px solid #D3D3D3", paddingBottom: "24px" }}>
                    <p style={{ fontSize: "15px", fontWeight: 500, color: "#1A1A1A", marginBottom: "6px" }}>{item.title}</p>
                    <p style={{ fontSize: "14px", color: "#8B8675", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 명예의 전당 */}
      <section style={{ background: "#000", padding: "96px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ ...labelSt, color: "#DFCF99" }}>Hall of Fame</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 54px)", fontWeight: 400, color: "#FAFAFA", letterSpacing: "-1px", marginBottom: "64px" }}>
            공식 앰배서더
          </h2>
          {/* 앰배서더 등재 전 placeholder */}
          <div style={{ border: "1px solid rgba(255,255,255,0.12)", padding: "80px 48px", textAlign: "center" }}>
            <p style={{ fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "16px" }}>Coming Soon</p>
            <p style={{ fontSize: "22px", fontWeight: 400, color: "#FAFAFA", letterSpacing: "-0.5px", marginBottom: "12px" }}>
              첫 번째 앰배서더를 모집 중입니다
            </p>
            <p style={{ fontSize: "15px", color: "rgba(250,250,250,0.45)", lineHeight: 1.6 }}>
              아래 신청서를 작성해 주시면 담당자가 검토 후 3~5 영업일 내에 연락드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* 신청 폼 */}
      <section id="apply" style={{ background: "#FAFAFA", borderTop: "1px solid #D3D3D3", padding: "96px 48px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={labelSt}>Apply</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "12px" }}>
            앰배서더 신청
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#5F5F5F", marginBottom: "48px" }}>
            영업일 3~5일 이내에 담당자가 이메일로 연락드립니다.
          </p>

          {submitted ? (
            <div style={{ padding: "64px 48px", border: "1px solid #D3D3D3", background: "#F0EFEB", textAlign: "center" }}>
              <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "16px" }}>Submitted</p>
              <h3 style={{ fontSize: "24px", fontWeight: 400, color: "#000", marginBottom: "12px" }}>신청이 완료되었습니다</h3>
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#5F5F5F", marginBottom: "32px" }}>
                담당자 검토 후 3~5 영업일 내에 이메일로 결과를 안내드립니다.
              </p>
              <Link href="/" style={{ display: "inline-block", background: "#000", color: "#FAFAFA", padding: "14px 36px", fontSize: "15px", fontWeight: 500, textDecoration: "none" }}>
                홈으로 돌아가기
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>이름 <span style={{ color: "#000" }}>*</span></label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="실명" style={inputSt} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>이메일 <span style={{ color: "#000" }}>*</span></label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="example@email.com" style={inputSt} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>연락처</label>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="010-0000-0000" style={inputSt} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>활동 플랫폼 <span style={{ color: "#000" }}>*</span></label>
                  <select required value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} style={inputSt}>
                    {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>구독자 수 <span style={{ color: "#000" }}>*</span></label>
                  <input required type="number" min="0" value={form.subscribers} onChange={e => setForm({ ...form, subscribers: e.target.value })} placeholder="예: 15000" style={inputSt} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>채널명 <span style={{ color: "#000" }}>*</span></label>
                <input required value={form.channelName} onChange={e => setForm({ ...form, channelName: e.target.value })} placeholder="채널 또는 계정 이름" style={inputSt} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>채널 URL <span style={{ color: "#000" }}>*</span></label>
                <input required type="url" value={form.channelUrl} onChange={e => setForm({ ...form, channelUrl: e.target.value })} placeholder="https://youtube.com/@yourchannel" style={inputSt} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>콘텐츠 분야</label>
                <input value={form.contentType} onChange={e => setForm({ ...form, contentType: e.target.value })} placeholder="예: 음악, 보컬 트레이닝, K-POP 리뷰" style={inputSt} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#5F5F5F", marginBottom: "8px" }}>지원 동기 및 활동 계획</label>
                <textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="앰배서더로 활동하고 싶은 이유와 레코딩카페를 어떻게 콘텐츠에 활용하실지 자유롭게 작성해 주세요."
                  style={{ ...inputSt, resize: "none" }} />
              </div>
              {error && <p style={{ color: "#B00", fontSize: "14px" }}>{error}</p>}
              <button type="submit" disabled={submitting}
                style={{ width: "100%", padding: "16px", background: "#000", color: "#FAFAFA", fontSize: "15px", fontWeight: 500, border: "none", cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.5 : 1, fontFamily: "var(--font-dm-sans), sans-serif" }}>
                {submitting ? "제출 중..." : "앰배서더 신청하기"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
