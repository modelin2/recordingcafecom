import Image from "next/image";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getAdminClient } from "@/lib/supabaseAdmin";

export const revalidate = 60;

async function getLatestArticles() {
  const db = getAdminClient();
  if (!db) return [];
  const { data } = await db
    .from("articles")
    .select("slug, title, excerpt, category, category_slug, read_time, created_at, image_url")
    .eq("published", true)
    .eq("site_id", "recordingcafe")
    .order("id", { ascending: false })
    .limit(3);
  return data ?? [];
}

// ── MOZAIQ 실제 디자인 시스템 ─────────────────────────────
// bg:     #fffef5  (warm cream)
// text:   #111     (near-black)
// sub:    #767676  (mid gray)
// border: #e5e5e5  (thin divider)
// accent: #D4AF37  (gold — 레코딩카페 브랜드)
// font:   Pretendard (KR sans) + Noto Serif (display)
// ──────────────────────────────────────────────────────────

export default async function Home() {
  const latestArticles = await getLatestArticles();

  return (
    <div style={{ background: "#fffef5", color: "#111", fontFamily: "Pretendard, 'Noto Sans KR', sans-serif" }}>

      {/* ── 공지 바 ── */}
      <div style={{ background: "#111", color: "#D4AF37", textAlign: "center", padding: "10px 16px", fontSize: 12, letterSpacing: "0.3em", fontWeight: 500 }}>
        사전 예약 시 음료 1잔 무료 &nbsp;·&nbsp; OPEN 12:00 – 21:00 &nbsp;·&nbsp; 신사역 3호선 도보 4분
      </div>

      {/* ══════════════════════════════════════════
          HERO — 풀스크린 영상 (mozaiq hero-section)
      ══════════════════════════════════════════ */}
      <section style={{ position: "relative", width: "100%", height: "100svh", minHeight: 600, overflow: "hidden", background: "#0a0800" }}>
        {/* 유튜브 배경 영상 */}
        <iframe
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: "177.78vh", height: "56.25vw",
            minWidth: "100%", minHeight: "100%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none", border: "none",
          }}
          src="https://www.youtube.com/embed/9bZkp7q19f0?autoplay=1&mute=1&loop=1&playlist=9bZkp7q19f0&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
          allow="autoplay; encrypted-media"
        />
        {/* 하단에서 크림색으로 페이드 */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(10,8,0,0.2) 0%, rgba(10,8,0,0.1) 40%, rgba(255,254,245,1) 100%)",
        }} />

        {/* 히어로 텍스트 — 하단 고정 */}
        <div style={{ position: "absolute", bottom: 60, left: 0, right: 0, textAlign: "center", padding: "0 24px" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.45em", color: "#D4AF37", fontWeight: 600, marginBottom: 16, textTransform: "uppercase" }}>
            Seoul · Sinsa · Since 2015
          </p>
          <h1 style={{
            fontFamily: "'Noto Serif KR', 'Nanum Myeongjo', Georgia, serif",
            fontSize: "clamp(3.5rem, 12vw, 9rem)",
            fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em",
            color: "#fffef5", marginBottom: 20,
          }}>
            RECORDING<br />
            <span style={{ color: "#D4AF37" }}>CAFÉ</span>
          </h1>
          <p style={{ fontSize: "clamp(14px, 1.5vw, 18px)", color: "rgba(255,254,245,0.85)", letterSpacing: "0.02em", marginBottom: 36, fontWeight: 300 }}>
            실제 K-POP 스타들이 녹음한 전문 스튜디오를 직접 체험하세요
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link href="/menu" style={{
              display: "inline-block", padding: "14px 36px",
              background: "#D4AF37", color: "#111",
              fontSize: 13, fontWeight: 700, letterSpacing: "0.15em", textDecoration: "none",
              transition: "all .3s ease",
            }}>
              🎟 입장권 구매
            </Link>
            <Link href="/experience" style={{
              display: "inline-block", padding: "14px 36px",
              border: "1px solid rgba(255,254,245,0.6)", color: "#fffef5",
              fontSize: 13, fontWeight: 500, letterSpacing: "0.15em", textDecoration: "none",
              transition: "all .3s ease",
            }}>
              프로그램 보기
            </Link>
          </div>
        </div>

        {/* 스크롤 가이드 */}
        <div style={{ position: "absolute", bottom: 24, right: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #D4AF37, transparent)", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 9, letterSpacing: "0.3em", color: "#D4AF37", textTransform: "uppercase" }}>Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          방문 정보 — 얇은 보더 그리드 (mozaiq 스타일)
      ══════════════════════════════════════════ */}
      <section style={{ borderBottom: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { label: "OPEN HOURS", value: "12:00 – 21:00", sub: "연중무휴" },
            { label: "LOCATION", value: "신사역 3호선", sub: "5번 출구 도보 4분" },
            { label: "PROGRAM", value: "녹음 · 도슨트", sub: "₩35,000 ~" },
            { label: "HISTORY", value: "10년 이상", sub: "전속 아티스트 50+명" },
          ].map((item, i) => (
            <div key={i} style={{
              padding: "28px 20px", textAlign: "center",
              borderRight: i < 3 ? "1px solid #e5e5e5" : "none",
            }}>
              <div style={{ fontSize: 9, letterSpacing: "0.35em", color: "#D4AF37", fontWeight: 600, marginBottom: 8, textTransform: "uppercase" }}>
                {item.label}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 4 }}>{item.value}</div>
              <div style={{ fontSize: 11, color: "#767676" }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          프로그램 — mozaiq growth-section 스타일
      ══════════════════════════════════════════ */}
      <section style={{ padding: "100px 24px", background: "#fffef5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* 섹션 타이틀 */}
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 64 }}>
            <span style={{ fontSize: 10, letterSpacing: "0.4em", color: "#D4AF37", fontWeight: 600, textTransform: "uppercase", whiteSpace: "nowrap" }}>
              Programs
            </span>
            <div style={{ flex: 1, height: 1, background: "#e5e5e5" }} />
            <h2 style={{
              fontFamily: "'Noto Serif KR', Georgia, serif",
              fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900,
              letterSpacing: "-0.03em", color: "#111", whiteSpace: "nowrap",
            }}>
              지금 바로 예약 가능한 프로그램
            </h2>
          </div>

          {/* 프로그램 카드 — 보더 그리드 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "1px solid #e5e5e5" }}>
            {[
              {
                img: "/images/recording-booth.png",
                badge: "Wing A · 전시",
                title: "K-POP 레전드\n릴테이프 도슨트",
                price: "₩35,000",
                desc: "30년 K-POP 역사를 담은 레전드들의 실제 녹음 릴테이프. 한·영·중·일 전문 해설사 동반.",
                detail: "/docent", book: "/menu", color: "#C8853A",
              },
              {
                img: "/images/control-room.png",
                badge: "Wing A · 체험 🔥인기",
                title: "K-POP\n녹음 체험",
                price: "₩40,000~",
                desc: "전문 레코딩 부스에서 직접 K-POP 가수처럼 녹음. 고음질 음원 파일 즉시 제공.",
                detail: "/experience", book: "/menu", color: "#D4AF37",
              },
              {
                img: "/images/bora-box.png",
                badge: "Wing B · 프로",
                title: "정식 음반 제작\n프로 에디션",
                price: "₩15M~",
                desc: "KOMCA 작곡가 1:1 매칭, 믹싱·마스터링, 150개 글로벌 플랫폼 동시 발매.",
                detail: "/pro", book: "/pro", color: "#8B6914",
              },
            ].map((card, i) => (
              <div key={i} style={{
                display: "flex", flexDirection: "column",
                borderRight: i < 2 ? "1px solid #e5e5e5" : "none",
                transition: "background .3s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f5f0e8")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                {/* 이미지 */}
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                  <Image src={card.img} alt={card.title.replace("\n", " ")} fill
                    style={{ objectFit: "cover", transition: "transform .7s ease" }}
                    className="group-hover:scale-105"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />
                  <span style={{
                    position: "absolute", top: 14, left: 14,
                    background: card.color, color: "#fff",
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.15em",
                    padding: "4px 10px", textTransform: "uppercase",
                  }}>{card.badge}</span>
                </div>

                {/* 내용 */}
                <div style={{ padding: "28px 24px 24px", flex: 1, display: "flex", flexDirection: "column", borderTop: "1px solid #e5e5e5" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <h3 style={{
                      fontFamily: "'Noto Serif KR', Georgia, serif",
                      fontSize: 18, fontWeight: 700, lineHeight: 1.3,
                      letterSpacing: "-0.02em", color: "#111", whiteSpace: "pre-line",
                    }}>{card.title}</h3>
                    <span style={{ fontSize: 16, fontWeight: 800, color: card.color, marginLeft: 12, flexShrink: 0 }}>{card.price}</span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: "#767676", flex: 1, marginBottom: 20 }}>{card.desc}</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Link href={card.detail} style={{
                      flex: 1, textAlign: "center", padding: "10px 0",
                      border: `1px solid ${card.color}`, color: card.color,
                      fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textDecoration: "none",
                      transition: "all .3s",
                    }}>상세보기</Link>
                    <Link href={card.book} style={{
                      flex: 1, textAlign: "center", padding: "10px 0",
                      background: card.color, color: "#fff",
                      fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textDecoration: "none",
                      transition: "all .3s",
                    }}>예약하기</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          숫자 — 크림 배경 수평 그리드
      ══════════════════════════════════════════ */}
      <section style={{ background: "#f5f0e8", borderTop: "1px solid #e5e5e5", borderBottom: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { num: "50,000+", label: "누적 방문객", sub: "국내외 K-POP 팬" },
            { num: "10년+",   label: "운영 경력",   sub: "전문 엔터테인먼트" },
            { num: "50명+",   label: "전속 아티스트", sub: "음반 제작 실적" },
            { num: "4개국어", label: "도슨트 해설",  sub: "한·영·중·일" },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "48px 20px", textAlign: "center",
              borderRight: i < 3 ? "1px solid #e5e5e5" : "none",
            }}>
              <div style={{
                fontFamily: "'Noto Serif KR', Georgia, serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900,
                color: "#D4AF37", letterSpacing: "-0.03em", marginBottom: 8,
              }}>{s.num}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: "#767676" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          공간 갤러리 — 비대칭 모자이크 그리드
      ══════════════════════════════════════════ */}
      <section style={{ padding: "100px 24px", background: "#fffef5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 48 }}>
            <span style={{ fontSize: 10, letterSpacing: "0.4em", color: "#D4AF37", fontWeight: 600, textTransform: "uppercase", whiteSpace: "nowrap" }}>Spaces</span>
            <div style={{ flex: 1, height: 1, background: "#e5e5e5" }} />
            <h2 style={{ fontFamily: "'Noto Serif KR', Georgia, serif", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>공간 안내</h2>
          </div>

          {/* 모자이크 레이아웃 */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "240px 240px", gap: 2 }}>
            {/* 큰 이미지 */}
            <div style={{ gridRow: "1 / 3", position: "relative", overflow: "hidden" }} className="group">
              <Image src="/images/recording-booth.png" alt="레코딩 부스" fill
                style={{ objectFit: "cover", transition: "transform .7s ease" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
              <div style={{ position: "absolute", bottom: 20, left: 20 }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>레코딩 부스</div>
                <div style={{ color: "#D4AF37", fontSize: 11, letterSpacing: "0.2em", marginTop: 2 }}>STUDIO BOOTH · 녹음 체험</div>
              </div>
            </div>
            {/* 우측 상단 */}
            <div style={{ gridColumn: "2", position: "relative", overflow: "hidden" }}>
              <Image src="/images/control-room.png" alt="컨트롤룸" fill style={{ objectFit: "cover", transition: "transform .7s ease" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
              <div style={{ position: "absolute", bottom: 12, left: 12 }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>컨트롤룸</div>
                <div style={{ color: "#D4AF37", fontSize: 10, letterSpacing: "0.15em" }}>CONTROL ROOM</div>
              </div>
            </div>
            {/* 우측 상단2 */}
            <div style={{ gridColumn: "3", position: "relative", overflow: "hidden" }}>
              <Image src="/images/bora-box.png" alt="BORA BOX" fill style={{ objectFit: "cover", transition: "transform .7s ease" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
              <div style={{ position: "absolute", bottom: 12, left: 12 }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>BORA BOX</div>
                <div style={{ color: "#D4AF37", fontSize: 10, letterSpacing: "0.15em" }}>LIVE BROADCAST</div>
              </div>
            </div>
            {/* 우측 하단 */}
            <div style={{ gridColumn: "2", position: "relative", overflow: "hidden" }}>
              <Image src="/images/mirror-booth.png" alt="AI 포토 부스" fill style={{ objectFit: "cover", transition: "transform .7s ease" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
              <div style={{ position: "absolute", bottom: 12, left: 12 }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>AI 포토 부스</div>
                <div style={{ color: "#D4AF37", fontSize: 10, letterSpacing: "0.15em" }}>AI PHOTO</div>
              </div>
            </div>
            {/* 라벨 카드 */}
            <div style={{ gridColumn: "3", background: "#111", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 16 }}>
              <div style={{ fontFamily: "'Noto Serif KR', Georgia, serif", fontSize: 22, fontWeight: 900, color: "#D4AF37", textAlign: "center", letterSpacing: "-0.02em" }}>
                4개의<br />공간
              </div>
              <Link href="/experience" style={{
                fontSize: 11, fontWeight: 600, letterSpacing: "0.2em",
                color: "#fff", textDecoration: "none",
                borderBottom: "1px solid #D4AF37", paddingBottom: 2,
              }}>VIEW ALL →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          소개 — about-section (mozaiq 스타일)
      ══════════════════════════════════════════ */}
      <section style={{ background: "#f5f0e8", borderTop: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid #e5e5e5", margin: "0 24px" }}>
            {/* 이미지 */}
            <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
              <Image src="/images/lounge-group.png" alt="레코딩카페 소개" fill style={{ objectFit: "cover" }} />
            </div>
            {/* 텍스트 */}
            <div style={{ padding: "64px 56px", borderLeft: "1px solid #e5e5e5", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.4em", color: "#D4AF37", fontWeight: 600, marginBottom: 24, textTransform: "uppercase" }}>
                About Us
              </div>
              <h2 style={{
                fontFamily: "'Noto Serif KR', Georgia, serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900,
                lineHeight: 1.25, letterSpacing: "-0.03em",
                color: "#111", marginBottom: 28,
              }}>
                실제 K-POP 스타들이<br />녹음한 바로 그 스튜디오
              </h2>
              <div style={{ height: 1, background: "#e5e5e5", marginBottom: 28 }} />
              <div style={{ fontSize: 14, lineHeight: 1.8, color: "#767676", marginBottom: 40 }}>
                <p style={{ marginBottom: 14 }}>
                  10년간 전속 아티스트 50여 명의 음반 작업을 진행해온 전문 스튜디오를 처음으로 일반에 공개합니다.
                </p>
                <p>
                  기획사 오디션에 도전했던 분들, K-POP을 사랑하는 외국인 팬들, 직접 음원을 발표하고 싶은 분들 모두를 위한 공간입니다.
                </p>
              </div>
              <Link href="/about" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontSize: 13, fontWeight: 700, letterSpacing: "0.15em",
                color: "#111", textDecoration: "none", textTransform: "uppercase",
              }}>
                <span>More About Us</span>
                <span style={{ color: "#D4AF37" }}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          오시는 길
      ══════════════════════════════════════════ */}
      <section style={{ padding: "80px 24px", background: "#fffef5", borderTop: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* 타이틀 */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.4em", color: "#D4AF37", fontWeight: 600, marginBottom: 12, textTransform: "uppercase" }}>Location</div>
            <h2 style={{ fontFamily: "'Noto Serif KR', Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900, letterSpacing: "-0.03em" }}>오시는 길</h2>
          </div>
          {/* 3단 그리드 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "1px solid #e5e5e5", marginBottom: 40 }}>
            {[
              { icon: "📍", title: "ADDRESS", main: "서울 서초구 강남대로107길 21, 2층", sub: "2F, 21 Gangnam-daero 107-gil, Seocho-gu" },
              { icon: "🚇", title: "SUBWAY", main: "신사역 3호선 5번 출구", sub: "도보 4분 · 주차 불가 (인근 유료주차장)" },
              { icon: "🕐", title: "HOURS", main: "12:00 – 21:00", sub: "연중무휴 · 사전 예약 권장" },
            ].map((loc, i) => (
              <div key={i} style={{
                padding: "36px 24px", textAlign: "center",
                borderRight: i < 2 ? "1px solid #e5e5e5" : "none",
              }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>{loc.icon}</div>
                <div style={{ fontSize: 9, letterSpacing: "0.35em", color: "#D4AF37", fontWeight: 600, marginBottom: 10, textTransform: "uppercase" }}>{loc.title}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 6 }}>{loc.main}</div>
                <div style={{ fontSize: 11, color: "#767676", lineHeight: 1.6 }}>{loc.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <Link href="/menu" style={{
              display: "inline-block", padding: "16px 56px",
              background: "#111", color: "#D4AF37",
              fontSize: 13, fontWeight: 700, letterSpacing: "0.2em",
              textDecoration: "none", transition: "all .3s",
            }}>
              🎟 입장권 구매하기
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          매거진
      ══════════════════════════════════════════ */}
      {latestArticles.length > 0 && (
        <section style={{ padding: "80px 24px", background: "#f5f0e8", borderTop: "1px solid #e5e5e5" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 48 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span style={{ fontSize: 10, letterSpacing: "0.4em", color: "#D4AF37", fontWeight: 600, textTransform: "uppercase" }}>Magazine</span>
                <div style={{ width: 40, height: 1, background: "#e5e5e5" }} />
                <h2 style={{ fontFamily: "'Noto Serif KR', Georgia, serif", fontSize: "1.4rem", fontWeight: 900, letterSpacing: "-0.02em" }}>레코딩카페 매거진</h2>
              </div>
              <Link href="/magazine" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", color: "#111", textDecoration: "none", textTransform: "uppercase" }}>
                전체 보기 →
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {latestArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
