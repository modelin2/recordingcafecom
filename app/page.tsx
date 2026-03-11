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
    <>
      {/* ── 상단 공지 바 ── */}
      <div style={{ background: "#D4AF37", color: "#111", fontSize: "11px", fontWeight: 800, textAlign: "center", padding: "9px 16px", letterSpacing: "0.08em" }}>
        🎤 사전 예약 시 음료 1잔 무료 증정 · 매일 12:00 – 21:00 운영 중
      </div>

      {/* ══════════════════════════════════════════
          히어로
      ══════════════════════════════════════════ */}
      <section style={{ position: "relative", height: "80vh", minHeight: "560px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#111111" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src="/images/hero-recording.jpeg"
            alt="K Recording Café"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center", opacity: 0.45 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #111111cc 0%, #11111166 40%, #111111ee 100%)" }} />
        </div>

        <div style={{ position: "relative", textAlign: "center", padding: "0 16px", maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#D4AF37", color: "#111", fontSize: "11px", fontWeight: 900, padding: "6px 16px", borderRadius: "999px", letterSpacing: "0.12em", marginBottom: "28px" }}>
            ✦ Seoul · Sinsa · Since 2015
          </div>

          <h1 style={{ fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: "20px" }}>
            <span style={{ display: "block", fontSize: "clamp(52px, 10vw, 96px)", letterSpacing: "-0.02em" }}>RECORDING</span>
            <span style={{ display: "block", fontSize: "clamp(52px, 10vw, 96px)", letterSpacing: "-0.02em", color: "#D4AF37" }}>CAFÉ</span>
          </h1>

          <p style={{ color: "#bbbbbb", fontSize: "clamp(15px, 2vw, 20px)", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 36px" }}>
            실제 K-POP 스타들이 녹음한 전문 스튜디오에서<br />
            나도 직접 노래를 녹음해 보세요
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "12px" }}>
            <Link href="/menu" style={{ background: "#D4AF37", color: "#111", fontWeight: 900, padding: "16px 36px", borderRadius: "12px", fontSize: "14px", letterSpacing: "0.06em", textDecoration: "none", display: "inline-block" }}>
              🎟 입장권 구매
            </Link>
            <Link href="/experience" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff", fontWeight: 700, padding: "16px 36px", borderRadius: "12px", fontSize: "14px", letterSpacing: "0.06em", textDecoration: "none", display: "inline-block" }}>
              프로그램 둘러보기
            </Link>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)" }}>
          <div style={{ width: "24px", height: "40px", border: "2px solid rgba(255,255,255,0.25)", borderRadius: "999px", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "6px" }}>
            <div style={{ width: "4px", height: "8px", background: "rgba(255,255,255,0.5)", borderRadius: "999px" }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          방문 정보 바
      ══════════════════════════════════════════ */}
      <section style={{ background: "#1e1e1e", borderTop: "1px solid #2a2a2a", borderBottom: "1px solid #2a2a2a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {[
              { icon: "🕐", label: "운영 시간", value: "매일 12:00–21:00", sub: "연중무휴" },
              { icon: "📍", label: "위치", value: "신사역 3호선", sub: "5번 출구 도보 4분" },
              { icon: "🎤", label: "체험 프로그램", value: "녹음·도슨트", sub: "₩35,000~" },
              { icon: "🏆", label: "운영 경력", value: "10년 이상", sub: "전속 아티스트 50+명" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "20px 24px", borderRight: i < 3 ? "1px solid #2a2a2a" : "none" }}>
                <span style={{ fontSize: "22px", flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ color: "#666666", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "2px" }}>{item.label}</div>
                  <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "13px" }}>{item.value}</div>
                  <div style={{ color: "#666666", fontSize: "11px" }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          체험 프로그램
      ══════════════════════════════════════════ */}
      <section style={{ background: "#141414", padding: "80px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ display: "inline-block", background: "rgba(168,85,247,0.15)", color: "#A855F7", fontSize: "11px", fontWeight: 800, padding: "6px 16px", borderRadius: "999px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>
              Experience Programs
            </div>
            <h2 style={{ color: "#ffffff", fontWeight: 900, fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "-0.02em" }}>
              지금 바로 예약할 수 있는 프로그램
            </h2>
            <p style={{ color: "#666666", marginTop: "12px", fontSize: "13px" }}>선택하신 프로그램을 클릭하면 상세 정보와 예약 페이지로 이동합니다</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {/* 도슨트 투어 */}
            <div style={{ background: "#1e1e1e", borderRadius: "16px", overflow: "hidden", border: "1px solid #2a2a2a" }}>
              <div style={{ position: "relative", height: "208px", overflow: "hidden" }}>
                <Image src="/images/recording-booth.png" alt="도슨트 투어" fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #1e1e1e 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", top: "16px", left: "16px" }}>
                  <span style={{ background: "#A855F7", color: "#fff", fontSize: "10px", fontWeight: 900, padding: "4px 12px", borderRadius: "999px", letterSpacing: "0.1em" }}>Wing A · 전시</span>
                </div>
              </div>
              <div style={{ padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
                  <h3 style={{ color: "#ffffff", fontWeight: 900, fontSize: "17px", lineHeight: 1.3 }}>K-POP 레전드<br />릴테이프 도슨트</h3>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "12px" }}>
                    <div style={{ color: "#D4AF37", fontWeight: 900, fontSize: "17px" }}>₩35,000</div>
                    <div style={{ color: "#555", fontSize: "11px" }}>1인 기준</div>
                  </div>
                </div>
                <p style={{ color: "#888888", fontSize: "13px", lineHeight: 1.7, marginBottom: "20px" }}>30년 K-POP 역사를 담은 레전드들의 실제 녹음 릴테이프. 한국어·영어·중국어·일본어 해설 제공.</p>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link href="/docent" style={{ flex: 1, textAlign: "center", color: "#A855F7", border: "1px solid rgba(168,85,247,0.4)", padding: "10px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, textDecoration: "none" }}>상세보기</Link>
                  <Link href="/menu" style={{ flex: 1, textAlign: "center", background: "#A855F7", color: "#fff", padding: "10px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, textDecoration: "none" }}>🎟 예약하기</Link>
                </div>
              </div>
            </div>

            {/* 녹음 체험 */}
            <div style={{ background: "#1e1e1e", borderRadius: "16px", overflow: "hidden", border: "1px solid #2a2a2a" }}>
              <div style={{ position: "relative", height: "208px", overflow: "hidden" }}>
                <Image src="/images/control-room.png" alt="녹음 체험" fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #1e1e1e 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", top: "16px", left: "16px" }}>
                  <span style={{ background: "#D4AF37", color: "#111", fontSize: "10px", fontWeight: 900, padding: "4px 12px", borderRadius: "999px", letterSpacing: "0.1em" }}>Wing A · 체험</span>
                </div>
                <div style={{ position: "absolute", top: "16px", right: "16px" }}>
                  <span style={{ background: "#e03e3e", color: "#fff", fontSize: "10px", fontWeight: 900, padding: "4px 10px", borderRadius: "999px" }}>인기</span>
                </div>
              </div>
              <div style={{ padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
                  <h3 style={{ color: "#ffffff", fontWeight: 900, fontSize: "17px", lineHeight: 1.3 }}>K-POP<br />녹음 체험</h3>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "12px" }}>
                    <div style={{ color: "#D4AF37", fontWeight: 900, fontSize: "17px" }}>₩40,000~</div>
                    <div style={{ color: "#555", fontSize: "11px" }}>1인 기준</div>
                  </div>
                </div>
                <p style={{ color: "#888888", fontSize: "13px", lineHeight: 1.7, marginBottom: "20px" }}>전문 레코딩 부스에서 내가 직접 K-POP 가수처럼 녹음. 음원 파일 제공, LP 제작 옵션 선택 가능.</p>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link href="/experience" style={{ flex: 1, textAlign: "center", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.4)", padding: "10px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, textDecoration: "none" }}>상세보기</Link>
                  <Link href="/menu" style={{ flex: 1, textAlign: "center", background: "#D4AF37", color: "#111", padding: "10px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, textDecoration: "none" }}>🎟 예약하기</Link>
                </div>
              </div>
            </div>

            {/* 프로 에디션 */}
            <div style={{ background: "#1e1e1e", borderRadius: "16px", overflow: "hidden", border: "1px solid #2a2a2a" }}>
              <div style={{ position: "relative", height: "208px", overflow: "hidden" }}>
                <Image src="/images/bora-box.png" alt="프로 에디션" fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #1e1e1e 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", top: "16px", left: "16px" }}>
                  <span style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: "10px", fontWeight: 900, padding: "4px 12px", borderRadius: "999px", letterSpacing: "0.1em" }}>Wing B · 프로</span>
                </div>
              </div>
              <div style={{ padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
                  <h3 style={{ color: "#ffffff", fontWeight: 900, fontSize: "17px", lineHeight: 1.3 }}>정식 음반 제작<br />프로 에디션</h3>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "12px" }}>
                    <div style={{ color: "#cccccc", fontWeight: 900, fontSize: "16px" }}>₩15M~</div>
                    <div style={{ color: "#555", fontSize: "11px" }}>프로젝트 기준</div>
                  </div>
                </div>
                <p style={{ color: "#888888", fontSize: "13px", lineHeight: 1.7, marginBottom: "20px" }}>KOMCA 작곡가 1:1 매칭, 전문 믹싱·마스터링, 국내외 150개 플랫폼 동시 발매.</p>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link href="/pro" style={{ flex: 1, textAlign: "center", color: "#aaaaaa", border: "1px solid #333", padding: "10px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, textDecoration: "none" }}>상세보기</Link>
                  <Link href="/pro" style={{ flex: 1, textAlign: "center", background: "#2a2a2a", color: "#fff", border: "1px solid #3a3a3a", padding: "10px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, textDecoration: "none" }}>문의하기</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          숫자로 보는 레코딩카페
      ══════════════════════════════════════════ */}
      <section style={{ background: "#111111", padding: "64px 0", borderTop: "1px solid #222222" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", textAlign: "center" }}>
            {[
              { num: "50,000+", label: "누적 방문객", sub: "국내외 K-POP 팬" },
              { num: "10년+",   label: "운영 경력",   sub: "전문 엔터테인먼트" },
              { num: "50명+",   label: "전속 아티스트", sub: "음반 제작 실적" },
              { num: "4개국어", label: "도슨트 언어",  sub: "한·영·중·일" },
            ].map((stat, i) => (
              <div key={i} style={{ background: "#1e1e1e", borderRadius: "16px", padding: "28px 16px", border: "1px solid #2a2a2a" }}>
                <div style={{ color: "#D4AF37", fontWeight: 900, fontSize: "28px", marginBottom: "4px" }}>{stat.num}</div>
                <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "13px", marginBottom: "4px" }}>{stat.label}</div>
                <div style={{ color: "#555555", fontSize: "11px" }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          공간 갤러리
      ══════════════════════════════════════════ */}
      <section style={{ background: "#141414", padding: "80px 0", borderTop: "1px solid #222222" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px" }}>
            <div>
              <div style={{ display: "inline-block", background: "rgba(212,175,55,0.12)", color: "#D4AF37", fontSize: "11px", fontWeight: 800, padding: "5px 14px", borderRadius: "999px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>Our Spaces</div>
              <h2 style={{ color: "#ffffff", fontWeight: 900, fontSize: "clamp(22px, 3vw, 30px)", letterSpacing: "-0.02em" }}>공간 안내</h2>
            </div>
            <Link href="/experience" style={{ color: "#555555", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>자세히 보기 →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
            {[
              { src: "/images/recording-booth.png", label: "레코딩 부스",  sub: "Studio Booth",    tag: "녹음 체험" },
              { src: "/images/control-room.png",    label: "컨트롤룸",    sub: "Control Room",   tag: "프로 전용" },
              { src: "/images/bora-box.png",        label: "BORA BOX",   sub: "Live Broadcast", tag: "라이브 방송" },
              { src: "/images/mirror-booth.png",    label: "AI 포토 부스", sub: "AI Photo Studio", tag: "포토 체험" },
            ].map((img, i) => (
              <div key={i} style={{ position: "relative", borderRadius: "12px", overflow: "hidden", aspectRatio: "1/1" }}>
                <Image src={img.src} alt={img.label} fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />
                <div style={{ position: "absolute", top: "12px", right: "12px" }}>
                  <span style={{ background: "#D4AF37", color: "#111", fontSize: "10px", fontWeight: 900, padding: "3px 8px", borderRadius: "999px" }}>{img.tag}</span>
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px" }}>
                  <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "13px" }}>{img.label}</div>
                  <div style={{ color: "#888888", fontSize: "11px", letterSpacing: "0.1em" }}>{img.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          스튜디오 소개
      ══════════════════════════════════════════ */}
      <section style={{ background: "#111111", padding: "80px 0", borderTop: "1px solid #222222" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
            <div style={{ position: "relative", aspectRatio: "4/3", borderRadius: "16px", overflow: "hidden" }}>
              <Image src="/images/lounge-group.png" alt="레코딩카페 소개" fill style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(168,85,247,0.15) 0%, transparent 60%)" }} />
            </div>
            <div>
              <div style={{ display: "inline-block", background: "rgba(168,85,247,0.12)", color: "#A855F7", fontSize: "11px", fontWeight: 800, padding: "5px 14px", borderRadius: "999px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "20px" }}>About</div>
              <h2 style={{ color: "#ffffff", fontWeight: 900, fontSize: "clamp(24px, 3.5vw, 34px)", letterSpacing: "-0.02em", lineHeight: 1.25, marginBottom: "24px" }}>
                실제 K-POP 스타들이<br />녹음한 바로 그 스튜디오
              </h2>
              <div style={{ color: "#888888", fontSize: "14px", lineHeight: 1.85, display: "flex", flexDirection: "column", gap: "16px" }}>
                <p>10년간 전속 아티스트 50여 명의 음반 작업을 진행해온 전문 녹음 스튜디오를 처음으로 일반에 공개합니다. 단순한 체험 공간이 아니라, 실제로 음반이 만들어지던 그 현장입니다.</p>
                <p>기획사 오디션에 도전했던 분들, K-POP을 사랑하는 외국인 팬들, 직접 음원을 발표하고 싶은 분들 모두를 위한 공간입니다.</p>
              </div>
              <div style={{ marginTop: "32px" }}>
                <Link href="/experience" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#A855F7", color: "#fff", fontWeight: 700, padding: "14px 28px", borderRadius: "12px", fontSize: "14px", textDecoration: "none" }}>
                  프로그램 알아보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          오시는 길
      ══════════════════════════════════════════ */}
      <section style={{ background: "#141414", padding: "64px 0", borderTop: "1px solid #222222" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ color: "#ffffff", fontWeight: 900, fontSize: "clamp(20px, 3vw, 28px)" }}>오시는 길</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
            {[
              { icon: "📍", label: "주소", main: "서울 서초구 강남대로107길 21, 2층", sub: "2F, 21, Gangnam-daero 107-gil, Seocho-gu" },
              { icon: "🚇", label: "대중교통", main: "신사역 3호선 5번 출구", sub: "도보 4분 · 주차 불가 (인근 유료 주차장)" },
              { icon: "🕐", label: "운영 시간", main: "낮 12:00 – 밤 21:00", sub: "연중무휴 · 사전 예약 권장" },
            ].map((loc, i) => (
              <div key={i} style={{ background: "#1e1e1e", borderRadius: "16px", padding: "28px 24px", border: "1px solid #2a2a2a", textAlign: "center" }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{loc.icon}</div>
                <div style={{ color: "#D4AF37", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>{loc.label}</div>
                <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "13px", marginBottom: "4px" }}>{loc.main}</div>
                <div style={{ color: "#555555", fontSize: "11px" }}>{loc.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <Link href="/menu" style={{ display: "inline-block", background: "#D4AF37", color: "#111", fontWeight: 900, padding: "16px 48px", borderRadius: "12px", fontSize: "14px", letterSpacing: "0.06em", textDecoration: "none" }}>
              🎟 입장권 구매하기
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          매거진
      ══════════════════════════════════════════ */}
      {latestArticles.length > 0 && (
        <section style={{ background: "#111111", padding: "80px 0", borderTop: "1px solid #222222" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px" }}>
              <div>
                <div style={{ display: "inline-block", background: "rgba(212,175,55,0.12)", color: "#D4AF37", fontSize: "11px", fontWeight: 800, padding: "5px 14px", borderRadius: "999px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>Magazine</div>
                <h2 style={{ color: "#ffffff", fontWeight: 900, fontSize: "clamp(22px, 3vw, 30px)", letterSpacing: "-0.02em" }}>레코딩카페 매거진</h2>
              </div>
              <Link href="/magazine" style={{ color: "#555555", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}>전체 보기 →</Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {latestArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
