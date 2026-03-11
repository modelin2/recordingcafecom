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

export default async function Home() {
  const latestArticles = await getLatestArticles();

  return (
    <div style={{ background: "#fffef5", color: "#111", fontFamily: "Pretendard, 'Noto Sans KR', sans-serif", overflowX: "hidden" }}>

      {/* ── 공지 바 ── */}
      <div style={{ background: "#111", color: "#D4AF37", textAlign: "center", padding: "10px 16px", fontSize: 11, letterSpacing: "0.35em", fontWeight: 500 }}>
        사전 예약 시 음료 1잔 무료 &nbsp;·&nbsp; OPEN 12:00 – 21:00 &nbsp;·&nbsp; 신사역 3호선 도보 4분
      </div>

      {/* ══════════════════════════════════════════
          HERO — 좌우 대담 분할
          텍스트가 이미지를 침범하며 겹침
      ══════════════════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "100svh", display: "grid", gridTemplateColumns: "1fr 1fr", background: "#fffef5" }}>

        {/* 왼쪽: 텍스트 블록 */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 0 80px 60px" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.5em", color: "#D4AF37", fontWeight: 600, marginBottom: 32, textTransform: "uppercase" }}>
            Seoul · Sinsa · Since 2015
          </div>
          <h1 style={{
            fontFamily: "'Noto Serif KR', Georgia, serif",
            fontSize: "clamp(4rem, 8vw, 8rem)",
            fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.04em",
            color: "#111", margin: 0,
          }}>
            RE<br />
            COR<br />
            DING<br />
            <span style={{ color: "#D4AF37", WebkitTextStroke: "2px #D4AF37", WebkitTextFillColor: "transparent" }}>CAFÉ</span>
          </h1>
          <div style={{ display: "flex", gap: 12, marginTop: 48 }}>
            <Link href="/menu" style={{
              padding: "16px 40px", background: "#111", color: "#D4AF37",
              fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textDecoration: "none",
            }}>🎟 입장권 구매</Link>
            <Link href="/experience" style={{
              padding: "16px 32px", border: "1px solid #111", color: "#111",
              fontSize: 12, fontWeight: 500, letterSpacing: "0.15em", textDecoration: "none",
            }}>프로그램 보기</Link>
          </div>
        </div>

        {/* 오른쪽: 풀 이미지 */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image src="/images/hero-recording.jpeg" alt="레코딩카페" fill style={{ objectFit: "cover", objectPosition: "center" }} priority />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #fffef5 0%, transparent 30%)" }} />
        </div>

        {/* 떠있는 정보 카드 — 두 컬럼 경계를 침범 */}
        <div style={{
          position: "absolute", bottom: 80, right: "10%",
          background: "rgba(255,254,245,0.92)", backdropFilter: "blur(12px)",
          border: "1px solid #e5e5e5", padding: "24px 32px",
          zIndex: 10, display: "flex", gap: 40,
        }}>
          {[
            { label: "OPEN", value: "12:00–21:00" },
            { label: "LOCATION", value: "신사역 도보 4분" },
            { label: "FROM", value: "₩35,000" },
          ].map((info, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 9, letterSpacing: "0.3em", color: "#D4AF37", fontWeight: 600, marginBottom: 6 }}>{info.label}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{info.value}</div>
            </div>
          ))}
        </div>

        {/* 스크롤 인디케이터 */}
        <div style={{ position: "absolute", left: 60, bottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 1, background: "#D4AF37" }} />
          <span style={{ fontSize: 9, letterSpacing: "0.35em", color: "#767676", textTransform: "uppercase" }}>Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MARQUEE — 흐르는 텍스트 띠
      ══════════════════════════════════════════ */}
      <div style={{ background: "#111", padding: "18px 0", overflow: "hidden", borderTop: "1px solid #222", borderBottom: "1px solid #222" }}>
        <div style={{
          display: "flex", gap: 0,
          animation: "marquee 20s linear infinite",
          whiteSpace: "nowrap",
        }}>
          {[...Array(3)].map((_, repeat) => (
            <span key={repeat} style={{ display: "inline-flex", gap: 0 }}>
              {["RECORDING", "DOCENT", "K-POP LEGEND", "STUDIO EXPERIENCE", "MEMBERSHIP", "REEL TAPE", "LIVE BROADCAST", "AI PHOTO"].map((word, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 24, padding: "0 24px" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.25em", color: "#fffef5" }}>{word}</span>
                  <span style={{ color: "#D4AF37", fontSize: 16 }}>✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-33.33%) } }
        `}</style>
      </div>

      {/* ══════════════════════════════════════════
          PROGRAMS — 에디토리얼 비대칭 레이아웃
          첫 번째: 와이드 피처, 나머지 2개: 하단 절반
      ══════════════════════════════════════════ */}
      <section style={{ background: "#fffef5", paddingTop: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>

          {/* 섹션 라벨 */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 64 }}>
            <span style={{ fontFamily: "'Noto Serif KR', Georgia, serif", fontSize: "clamp(4rem, 8vw, 7rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.05em", color: "#f0e8d8" }}>01</span>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.4em", color: "#D4AF37", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Programs</div>
              <h2 style={{ fontFamily: "'Noto Serif KR', Georgia, serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 900, letterSpacing: "-0.03em" }}>
                지금 바로 예약 가능한 프로그램
              </h2>
            </div>
          </div>

          {/* 첫 번째 프로그램 — 와이드 피처 (좌우 분할) */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", border: "1px solid #e5e5e5", marginBottom: 2 }}>
            <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
              <Image src="/images/recording-booth.png" alt="도슨트 투어" fill style={{ objectFit: "cover", transition: "transform .7s ease" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, #fffef5 100%)" }} />
              <div style={{ position: "absolute", top: 20, left: 20 }}>
                <span style={{ background: "#C8853A", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", padding: "5px 12px" }}>Wing A · 전시</span>
              </div>
            </div>
            <div style={{ padding: "48px 48px", display: "flex", flexDirection: "column", justifyContent: "center", borderLeft: "1px solid #e5e5e5" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.4em", color: "#C8853A", fontWeight: 600, marginBottom: 16, textTransform: "uppercase" }}>— Program 01</div>
              <h3 style={{ fontFamily: "'Noto Serif KR', Georgia, serif", fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 20 }}>
                K-POP 레전드<br />릴테이프 도슨트
              </h3>
              <div style={{ height: 1, background: "#e5e5e5", marginBottom: 20 }} />
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "#767676", marginBottom: 32 }}>
                30년 K-POP 역사를 담은 레전드들의 실제 녹음 릴테이프. 한국어·영어·중국어·일본어 전문 해설사 동반.
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Noto Serif KR', Georgia, serif", fontSize: "2rem", fontWeight: 900, color: "#C8853A" }}>₩35,000</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <Link href="/docent" style={{ padding: "12px 20px", border: "1px solid #C8853A", color: "#C8853A", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textDecoration: "none" }}>상세보기</Link>
                  <Link href="/menu" style={{ padding: "12px 20px", background: "#C8853A", color: "#fff", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textDecoration: "none" }}>예약하기</Link>
                </div>
              </div>
            </div>
          </div>

          {/* 두 번째·세 번째 — 하단 절반 나란히 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px solid #e5e5e5", borderTop: "none", marginBottom: 100 }}>
            {[
              {
                img: "/images/control-room.png", badge: "Wing A · 체험", program: "02",
                title: "K-POP 녹음 체험", price: "₩40,000~", color: "#D4AF37",
                desc: "전문 레코딩 부스에서 직접 K-POP 가수처럼 녹음. 고음질 음원 파일 즉시 제공.",
                detail: "/experience", book: "/menu",
              },
              {
                img: "/images/bora-box.png", badge: "Wing B · 프로", program: "03",
                title: "정식 음반 제작 프로 에디션", price: "₩15M~", color: "#8B6914",
                desc: "KOMCA 작곡가 1:1 매칭, 믹싱·마스터링, 150개 글로벌 플랫폼 동시 발매.",
                detail: "/pro", book: "/pro",
              },
            ].map((card, i) => (
              <div key={i} style={{ display: "flex", borderRight: i === 0 ? "1px solid #e5e5e5" : "none" }}>
                <div style={{ position: "relative", width: "45%", flexShrink: 0, overflow: "hidden" }}>
                  <Image src={card.img} alt={card.title} fill style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" }} />
                  <span style={{ position: "absolute", top: 14, left: 14, background: card.color, color: i === 1 ? "#111" : "#fff", fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", padding: "4px 8px" }}>{card.badge}</span>
                </div>
                <div style={{ flex: 1, padding: "28px 24px", borderLeft: "1px solid #e5e5e5", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: "0.35em", color: card.color, fontWeight: 600, marginBottom: 10, textTransform: "uppercase" }}>— Program {card.program}</div>
                    <h3 style={{ fontFamily: "'Noto Serif KR', Georgia, serif", fontSize: "1.1rem", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.3, marginBottom: 10 }}>{card.title}</h3>
                    <p style={{ fontSize: 12, lineHeight: 1.7, color: "#767676" }}>{card.desc}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
                    <span style={{ fontSize: "1.3rem", fontWeight: 900, color: card.color, fontFamily: "'Noto Serif KR', Georgia, serif" }}>{card.price}</span>
                    <Link href={card.book} style={{ padding: "8px 16px", background: card.color, color: i === 1 ? "#111" : "#fff", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textDecoration: "none" }}>예약하기</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS — 거대한 숫자가 페이지를 가득 채움
      ══════════════════════════════════════════ */}
      <section style={{ background: "#111", padding: "80px 40px", overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {[
            { num: "50K+", label: "누적 방문객", sub: "국내외 K-POP 팬" },
            { num: "10Y+", label: "운영 경력",   sub: "전문 엔터테인먼트" },
            { num: "50+",  label: "전속 아티스트", sub: "음반 제작 실적" },
            { num: "×4",   label: "도슨트 언어",  sub: "한·영·중·일" },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "40px 32px", textAlign: "center",
              borderRight: i < 3 ? "1px solid #222" : "none",
            }}>
              <div style={{
                fontFamily: "'Noto Serif KR', Georgia, serif",
                fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 900,
                color: "#D4AF37", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 16,
              }}>{s.num}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#fffef5", marginBottom: 6, letterSpacing: "0.05em" }}>{s.label}</div>
              <div style={{ fontSize: 11, color: "#555", letterSpacing: "0.05em" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GALLERY — 풀폭 가로 스트립 (5:1 비율)
          이미지들이 edge-to-edge로 펼쳐짐
      ══════════════════════════════════════════ */}
      <section style={{ background: "#fffef5", paddingTop: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto 0", padding: "0 40px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 48 }}>
            <span style={{ fontFamily: "'Noto Serif KR', Georgia, serif", fontSize: "clamp(4rem, 8vw, 7rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.05em", color: "#f0e8d8" }}>02</span>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.4em", color: "#D4AF37", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Spaces</div>
              <h2 style={{ fontFamily: "'Noto Serif KR', Georgia, serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 900, letterSpacing: "-0.03em" }}>공간 안내</h2>
            </div>
          </div>
        </div>

        {/* edge-to-edge 가로 스트립 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", height: 420, gap: 2, marginBottom: 0 }}>
          {[
            { src: "/images/recording-booth.png", label: "레코딩 부스",  sub: "Studio Booth",   tag: "녹음 체험" },
            { src: "/images/control-room.png",    label: "컨트롤룸",    sub: "Control Room",  tag: "프로 전용" },
            { src: "/images/bora-box.png",        label: "BORA BOX",   sub: "Live Broadcast",tag: "라이브" },
            { src: "/images/mirror-booth.png",    label: "AI 포토 부스", sub: "AI Photo",      tag: "포토 체험" },
          ].map((img, i) => (
            <div key={i} style={{ position: "relative", overflow: "hidden" }}
              className="group"
            >
              <Image src={img.src} alt={img.label} fill
                style={{ objectFit: "cover", transition: "transform .8s ease" }}
                className="group-hover:scale-110"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)", transition: "opacity .4s" }} />
              {/* 호버 시 보이는 태그 */}
              <div style={{ position: "absolute", top: 16, right: 16 }}>
                <span style={{ background: "#D4AF37", color: "#111", fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", padding: "4px 8px" }}>{img.tag}</span>
              </div>
              {/* 하단 라벨 */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 20px" }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: "-0.01em", marginBottom: 4 }}>{img.label}</div>
                <div style={{ color: "#D4AF37", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase" }}>{img.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT — 검정 배경 반전 (대담한 콘트라스트)
          거대한 인용구 스타일
      ══════════════════════════════════════════ */}
      <section style={{ background: "#0c0800", position: "relative", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {/* 왼쪽: 이미지 */}
          <div style={{ position: "relative", minHeight: 560, overflow: "hidden" }}>
            <Image src="/images/lounge-group.png" alt="레코딩카페" fill style={{ objectFit: "cover", filter: "brightness(0.7) sepia(0.3)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, #0c0800 100%)" }} />
          </div>

          {/* 오른쪽: 텍스트 */}
          <div style={{ padding: "80px 80px 80px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 40 }}>
              <span style={{ fontFamily: "'Noto Serif KR', Georgia, serif", fontSize: "clamp(4rem, 8vw, 7rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.05em", color: "#1e1606" }}>03</span>
              <div style={{ fontSize: 10, letterSpacing: "0.4em", color: "#D4AF37", fontWeight: 600, textTransform: "uppercase" }}>About</div>
            </div>

            {/* 큰 인용구 스타일 */}
            <blockquote style={{
              fontFamily: "'Noto Serif KR', Georgia, serif",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900,
              lineHeight: 1.25, letterSpacing: "-0.03em",
              color: "#fffef5", marginBottom: 32, borderLeft: "3px solid #D4AF37", paddingLeft: 24,
            }}>
              "실제 K-POP 스타들이<br />녹음한 바로 그 스튜디오"
            </blockquote>

            <div style={{ height: 1, background: "#222", marginBottom: 28 }} />
            <div style={{ fontSize: 14, lineHeight: 1.9, color: "#767676", marginBottom: 40 }}>
              <p style={{ marginBottom: 14 }}>10년간 전속 아티스트 50여 명의 음반 작업을 진행해온 전문 스튜디오를 처음으로 일반에 공개합니다.</p>
              <p>기획사 오디션에 도전했던 분들, K-POP을 사랑하는 외국인 팬들, 직접 음원을 발표하고 싶은 분들 모두를 위한 공간입니다.</p>
            </div>
            <Link href="/about" style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              fontSize: 12, fontWeight: 700, letterSpacing: "0.2em",
              color: "#D4AF37", textDecoration: "none", textTransform: "uppercase",
            }}>
              More About Us <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LOCATION — 심플 센터 정렬
      ══════════════════════════════════════════ */}
      <section style={{ background: "#fffef5", padding: "100px 40px", borderTop: "1px solid #e5e5e5" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 9, letterSpacing: "0.5em", color: "#D4AF37", fontWeight: 600, marginBottom: 16, textTransform: "uppercase" }}>Location</div>
            <h2 style={{ fontFamily: "'Noto Serif KR', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>
              오시는 길
            </h2>
          </div>

          {/* 보더 그리드 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "1px solid #e5e5e5", marginBottom: 48 }}>
            {[
              { icon: "📍", title: "ADDRESS", main: "서울 서초구 강남대로107길 21, 2층", sub: "2F, 21 Gangnam-daero 107-gil" },
              { icon: "🚇", title: "SUBWAY",  main: "신사역 3호선 5번 출구",            sub: "도보 4분 · 주차 불가" },
              { icon: "🕐", title: "HOURS",   main: "12:00 – 21:00",                  sub: "연중무휴 · 사전 예약 권장" },
            ].map((loc, i) => (
              <div key={i} style={{
                padding: "40px 28px", textAlign: "center",
                borderRight: i < 2 ? "1px solid #e5e5e5" : "none",
              }}>
                <div style={{ fontSize: 26, marginBottom: 14 }}>{loc.icon}</div>
                <div style={{ fontSize: 9, letterSpacing: "0.35em", color: "#D4AF37", fontWeight: 600, marginBottom: 10, textTransform: "uppercase" }}>{loc.title}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 6 }}>{loc.main}</div>
                <div style={{ fontSize: 11, color: "#767676", lineHeight: 1.6 }}>{loc.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <Link href="/menu" style={{
              display: "inline-block", padding: "18px 64px",
              background: "#111", color: "#D4AF37",
              fontSize: 13, fontWeight: 700, letterSpacing: "0.25em", textDecoration: "none",
            }}>🎟 입장권 구매하기</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAGAZINE
      ══════════════════════════════════════════ */}
      {latestArticles.length > 0 && (
        <section style={{ background: "#f5f0e8", padding: "100px 40px", borderTop: "1px solid #e5e5e5" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 56 }}>
              <span style={{ fontFamily: "'Noto Serif KR', Georgia, serif", fontSize: "clamp(4rem, 8vw, 7rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.05em", color: "#e0d5c5" }}>04</span>
              <div>
                <div style={{ fontSize: 10, letterSpacing: "0.4em", color: "#D4AF37", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Magazine</div>
                <h2 style={{ fontFamily: "'Noto Serif KR', Georgia, serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 900, letterSpacing: "-0.03em" }}>레코딩카페 매거진</h2>
              </div>
              <div style={{ flex: 1, height: 1, background: "#e5e5e5", alignSelf: "center", marginLeft: 20 }} />
              <Link href="/magazine" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", color: "#111", textDecoration: "none", textTransform: "uppercase", whiteSpace: "nowrap" }}>
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
