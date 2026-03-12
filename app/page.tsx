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

// Archdeco 디자인 시스템
// bg: #FAFAFA / alt-bg: #F0EFEB / text: #5F5F5F / heading: #000000
// accent: #8B8675 / gold: #DFCF99 / brown: #6B625A / border: #D3D3D3
// font: DM Sans, weight 400(heading) / 500(medium) / body 17px / h1 68px -2px

export default async function Home() {
  const latestArticles = await getLatestArticles();

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#FAFAFA", color: "#5F5F5F" }}>

      {/* ══ 히어로 ══ */}
      <section style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden", background: "#000" }}>
        <Image
          src="/images/hero-recording.jpeg"
          alt="Recording Café"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center", opacity: 0.55 }}
        />
        {/* 하단 그라디언트 */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }} />

        {/* 콘텐츠 */}
        <div className="px-6 sm:px-12 pb-16" style={{ position: "relative", maxWidth: "1280px", width: "100%" }}>
          <p style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#DFCF99", marginBottom: "24px" }}>
            Seoul · Sinsa · Since 2015
          </p>
          <h1 style={{ fontSize: "clamp(44px, 8vw, 96px)", fontWeight: 400, color: "#FAFAFA", letterSpacing: "-2px", lineHeight: 1.05, marginBottom: "32px" }}>
            Recording<br />Café
          </h1>
          <p style={{ fontSize: "17px", fontWeight: 400, color: "rgba(250,250,250,0.65)", lineHeight: 1.65, maxWidth: "480px", marginBottom: "48px" }}>
            실제 K-POP 스타들이 녹음한 전문 스튜디오에서 나도 직접 노래를 녹음해 보세요
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            <Link href="/menu" style={{ display: "inline-block", background: "#FAFAFA", color: "#000", fontSize: "15px", fontWeight: 500, padding: "14px 36px", textDecoration: "none", letterSpacing: "0.3px" }}>
              입장권 구매
            </Link>
            <Link href="/experience" style={{ display: "inline-block", background: "transparent", border: "1px solid rgba(250,250,250,0.35)", color: "#FAFAFA", fontSize: "15px", fontWeight: 400, padding: "14px 36px", textDecoration: "none", letterSpacing: "0.3px" }}>
              프로그램 보기
            </Link>
          </div>
        </div>

        {/* 우하단 정보 */}
        <div style={{ position: "absolute", bottom: "64px", right: "48px", textAlign: "right" }}>
          <p style={{ fontSize: "12px", letterSpacing: "1px", color: "rgba(250,250,250,0.4)", marginBottom: "4px" }}>매일 12:00 – 21:00</p>
          <p style={{ fontSize: "12px", letterSpacing: "1px", color: "rgba(250,250,250,0.4)" }}>신사역 3호선 5번 출구 도보 4분</p>
        </div>
      </section>

      {/* ══ 방문 정보 바 ══ */}
      <section style={{ background: "#F0EFEB", borderBottom: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="grid grid-cols-2 sm:grid-cols-4" style={{ borderTop: "none" }}>
            {[
              { label: "운영 시간", value: "매일 12:00 – 21:00" },
              { label: "위치",     value: "신사역 5번 출구 도보 4분" },
              { label: "프로그램", value: "녹음 · 도슨트 · 단체관람" },
              { label: "경력",     value: "10년 · 전속 아티스트 50+" },
            ].map((item, i) => (
              <div key={i} className="p-4 sm:p-7" style={{ borderRight: "1px solid #D3D3D3" }}>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "8px" }}>{item.label}</p>
                <p style={{ fontSize: "15px", fontWeight: 400, color: "#1A1A1A" }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 체험 프로그램 ══ */}
      <section style={{ background: "#FAFAFA", paddingTop: "96px" }}>
        <div className="px-6 sm:px-12" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" style={{ marginBottom: "56px" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "16px" }}>Experience Programs</p>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 54px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", lineHeight: 1.15 }}>
                지금 바로 예약할 수<br />있는 프로그램
              </h2>
            </div>
            <Link href="/experience" style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "1px", color: "#8B8675", textDecoration: "none", textTransform: "uppercase" }}>전체 보기 →</Link>
          </div>
        </div>

        {/* 풀폭 3패널 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {[
            {
              src: "/images/recording-booth.png",
              label: "Wing A · 전시",
              title: "K-POP 레전드\n릴테이프 도슨트",
              desc: "30년 K-POP 역사를 담은 레전드들의 실제 녹음 릴테이프. 한·영·중·일 해설 제공.",
              price: "₩35,000",
              href: "/docent",
              bg: "#F0EFEB",
            },
            {
              src: "/images/control-room.png",
              label: "Wing A · 체험",
              title: "K-POP\n녹음 체험",
              desc: "전문 레코딩 부스에서 K-POP 가수처럼 녹음. 음원 파일 제공, LP 제작 옵션 가능.",
              price: "₩40,000~",
              href: "/experience",
              bg: "#FAFAFA",
            },
            {
              src: "/images/bora-box.png",
              label: "Wing B · 프로",
              title: "정식 음반 제작\n프로 에디션",
              desc: "KOMCA 작곡가 1:1 매칭, 전문 믹싱·마스터링, 국내외 150개 플랫폼 동시 발매.",
              price: "₩15,000,000~",
              href: "/pro",
              bg: "#F0EFEB",
            },
          ].map((item, i) => (
            <div key={i} style={{ background: item.bg, borderRight: "1px solid #D3D3D3" }}>
              {/* 이미지 */}
              <div style={{ position: "relative", height: "clamp(220px, 28vw, 400px)", overflow: "hidden" }}>
                <Image src={item.src} alt={item.title} fill style={{ objectFit: "cover" }} />
              </div>
              {/* 텍스트 */}
              <div style={{ padding: "36px" }}>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "16px" }}>{item.label}</p>
                <h3 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 400, color: "#000", letterSpacing: "-0.5px", lineHeight: 1.25, marginBottom: "16px", whiteSpace: "pre-line" }}>{item.title}</h3>
                <p style={{ fontSize: "15px", color: "#5F5F5F", lineHeight: 1.65, marginBottom: "28px" }}>{item.desc}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #D3D3D3", paddingTop: "24px" }}>
                  <span style={{ fontSize: "17px", fontWeight: 500, color: "#1A1A1A" }}>{item.price}</span>
                  <Link href={item.href} style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "1px", color: "#6B625A", textDecoration: "none", textTransform: "uppercase" }}>예약 →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 숫자 ══ */}
      <section className="py-16 sm:py-20 px-4 sm:px-12" style={{ background: "#000" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: "0" }}>
            {[
              { num: "50,000+", label: "누적 방문객" },
              { num: "10년+",   label: "운영 경력" },
              { num: "50명+",   label: "전속 아티스트" },
              { num: "4개국어", label: "도슨트 해설" },
            ].map((stat, i) => (
              <div key={i} className="p-5 sm:p-10" style={{ borderRight: i < 3 ? "1px solid rgba(250,250,250,0.08)" : "none" }}>
                <p style={{ fontSize: "clamp(22px, 4vw, 48px)", fontWeight: 400, color: "#DFCF99", letterSpacing: "-1px", marginBottom: "8px" }}>{stat.num}</p>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(250,250,250,0.35)" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 공간 갤러리 ══ */}
      <section style={{ background: "#F0EFEB", paddingTop: "96px" }}>
        <div className="px-6 sm:px-12 pb-14" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "16px" }}>Our Spaces</p>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 54px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", lineHeight: 1.15 }}>공간 안내</h2>
            </div>
            <Link href="/about#spaces" style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "1px", color: "#8B8675", textDecoration: "none", textTransform: "uppercase" }}>자세히 →</Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4">
          {[
            { src: "/images/recording-booth.png", label: "레코딩 부스",  sub: "Recording Booth" },
            { src: "/images/control-room.png",    label: "컨트롤 룸",   sub: "Control Room" },
            { src: "/images/bora-box.png",        label: "BORA BOX",   sub: "Live Broadcast" },
            { src: "/images/mirror-booth.png",    label: "AI 포토 부스", sub: "AI Photo Studio" },
          ].map((img, i) => (
            <div key={i} style={{ position: "relative", overflow: "hidden", aspectRatio: "3/4", borderRight: "1px solid #D3D3D3" }}>
              <Image src={img.src} alt={img.label} fill style={{ objectFit: "cover", transition: "transform 0.6s ease" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, padding: "24px" }}>
                <p style={{ fontSize: "15px", fontWeight: 500, color: "#FAFAFA", marginBottom: "4px" }}>{img.label}</p>
                <p style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(250,250,250,0.5)" }}>{img.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 스튜디오 소개 ══ */}
      <section style={{ background: "#FAFAFA", borderTop: "1px solid #D3D3D3" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* 이미지 */}
          <div style={{ position: "relative", minHeight: "480px" }}>
            <Image src="/images/lounge-group.png" alt="레코딩카페 소개" fill style={{ objectFit: "cover" }} />
          </div>
          {/* 텍스트 */}
          <div className="px-6 sm:px-16 py-12 sm:py-20" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "24px" }}>About</p>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "32px" }}>
              실제 K-POP 스타들이<br />녹음한 바로 그 스튜디오
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "48px" }}>
              <p style={{ fontSize: "16px", fontWeight: 400, color: "#5F5F5F", lineHeight: 1.75 }}>
                10년간 전속 아티스트 50여 명의 음반 작업을 진행해온 전문 녹음 스튜디오를 처음으로 일반에 공개합니다.
              </p>
              <p style={{ fontSize: "16px", fontWeight: 400, color: "#5F5F5F", lineHeight: 1.75 }}>
                기획사 오디션에 도전했던 분들, K-POP을 사랑하는 외국인 팬들, 직접 음원을 발표하고 싶은 분들 모두를 위한 공간입니다.
              </p>
            </div>
            <div style={{ borderTop: "1px solid #D3D3D3", paddingTop: "36px" }}>
              <Link href="/experience" style={{ display: "inline-block", background: "#000", color: "#FAFAFA", fontSize: "15px", fontWeight: 400, padding: "14px 36px", textDecoration: "none", letterSpacing: "0.3px" }}>
                프로그램 알아보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 오시는 길 ══ */}
      <section className="py-16 sm:py-24 px-6 sm:px-12" style={{ background: "#F0EFEB", borderTop: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "16px" }}>Location</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" style={{ marginBottom: "48px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 54px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", lineHeight: 1.15 }}>오시는 길</h2>
            <Link href="/menu" style={{ display: "inline-block", background: "#000", color: "#FAFAFA", fontSize: "15px", fontWeight: 400, padding: "14px 36px", textDecoration: "none", letterSpacing: "0.3px", flexShrink: 0 }}>
              입장권 구매하기
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ borderTop: "1px solid #D3D3D3" }}>
            {[
              { label: "주소",     main: "서울 서초구 강남대로107길 21, 2층", sub: "2F, 21, Gangnam-daero 107-gil, Seocho-gu" },
              { label: "대중교통", main: "신사역 3호선 5번 출구",             sub: "도보 4분 · 주차 불가 (인근 유료 주차장)" },
              { label: "운영 시간", main: "매일 12:00 – 21:00",              sub: "연중무휴 · 사전 예약 권장" },
            ].map((loc, i) => (
              <div key={i} className="py-8 sm:py-10" style={{ paddingRight: i < 2 ? "32px" : 0, borderRight: i < 2 ? "1px solid #D3D3D3" : "none", paddingLeft: i > 0 ? "32px" : "0", borderBottom: i < 2 ? "1px solid #D3D3D3" : "none" }}>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "16px" }}>{loc.label}</p>
                <p style={{ fontSize: "17px", fontWeight: 400, color: "#1A1A1A", marginBottom: "8px" }}>{loc.main}</p>
                <p style={{ fontSize: "14px", color: "#8B8675" }}>{loc.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 매거진 ══ */}
      {latestArticles.length > 0 && (
        <section className="py-16 sm:py-24 px-6 sm:px-12" style={{ background: "#FAFAFA", borderTop: "1px solid #D3D3D3" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" style={{ marginBottom: "56px" }}>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "16px" }}>Magazine</p>
                <h2 style={{ fontSize: "clamp(28px, 4vw, 54px)", fontWeight: 400, color: "#000", letterSpacing: "-1px", lineHeight: 1.15 }}>레코딩카페 매거진</h2>
              </div>
              <Link href="/magazine" style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "1px", color: "#8B8675", textDecoration: "none", textTransform: "uppercase" }}>전체 보기 →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "0", borderTop: "1px solid #D3D3D3" }}>
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
