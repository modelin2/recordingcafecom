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
      {/* ── 공지 바 ── */}
      <div className="text-center py-2 px-4 text-xs tracking-widest"
        style={{ background: "#1e1e1e", color: "#666666", borderBottom: "1px solid #222222" }}>
        사전 예약 시 음료 1잔 무료 증정 · 매일 12:00 – 21:00 운영
      </div>

      {/* ══ 히어로 ══ */}
      <section className="relative flex flex-col justify-end overflow-hidden"
        style={{ height: "100svh", minHeight: "600px", background: "#111111" }}>
        {/* 배경 이미지 — 흑백 필터 + 어두운 오버레이 */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-recording.jpeg"
            alt="Recording Café"
            fill
            priority
            className="object-cover object-center"
            style={{ filter: "grayscale(60%) brightness(0.35)" }}
          />
        </div>

        {/* 콘텐츠 — 좌하단 배치 */}
        <div className="relative px-8 sm:px-16 pb-16 sm:pb-20 max-w-5xl">
          <p className="text-xs tracking-widest mb-6" style={{ color: "#555555" }}>
            Seoul · Sinsa · Since 2015
          </p>
          <h1 className="font-black leading-none mb-6" style={{ color: "#ffffff", fontSize: "clamp(52px, 9vw, 110px)", letterSpacing: "-0.03em" }}>
            RECORDING<br />
            <span style={{ color: "#cccccc" }}>CAFÉ</span>
          </h1>
          <p className="mb-10 font-light" style={{ color: "#777777", fontSize: "clamp(13px, 1.5vw, 16px)", maxWidth: "420px", lineHeight: 1.8 }}>
            실제 K-POP 스타들이 녹음한 전문 스튜디오에서<br />나도 직접 노래를 녹음해 보세요
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/menu"
              className="text-sm font-bold px-8 py-3.5 tracking-wide transition-opacity hover:opacity-75"
              style={{ background: "#ffffff", color: "#111111" }}>
              입장권 구매
            </Link>
            <Link href="/experience"
              className="text-sm font-medium px-8 py-3.5 tracking-wide transition-opacity hover:opacity-75"
              style={{ background: "transparent", border: "1px solid #333333", color: "#888888" }}>
              프로그램 보기
            </Link>
          </div>
        </div>

        {/* 우하단 운영정보 */}
        <div className="absolute bottom-8 right-8 sm:right-16 text-right hidden sm:block">
          <p className="text-xs" style={{ color: "#444444" }}>매일 12:00 – 21:00</p>
          <p className="text-xs" style={{ color: "#444444" }}>신사역 3호선 5번 출구 도보 4분</p>
        </div>
      </section>

      {/* ══ 방문 정보 바 ══ */}
      <section style={{ background: "#161616", borderBottom: "1px solid #222222" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0"
            style={{ borderColor: "#222222" }}>
            {[
              { label: "운영 시간", value: "매일 12:00 – 21:00" },
              { label: "위치",     value: "신사역 5번 출구 도보 4분" },
              { label: "프로그램", value: "녹음 · 도슨트 · 단체관람" },
              { label: "운영 경력", value: "10년 · 전속 아티스트 50+" },
            ].map((item, i) => (
              <div key={i} className="px-6 py-5">
                <div className="text-xs mb-1.5 tracking-widest uppercase" style={{ color: "#444444" }}>{item.label}</div>
                <div className="text-sm font-medium" style={{ color: "#cccccc" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 프로그램 — 대형 패널 ══ */}
      <section style={{ background: "#111111" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-20 pb-4">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-black tracking-tight" style={{ color: "#ffffff", fontSize: "clamp(18px, 3vw, 24px)" }}>
              체험 프로그램
            </h2>
            <Link href="/experience" className="text-xs tracking-widest transition-opacity hover:opacity-60"
              style={{ color: "#444444" }}>전체 보기</Link>
          </div>
        </div>

        {/* 대형 패널 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              src: "/images/recording-booth.png",
              category: "Wing A · 전시",
              title: "K-POP 레전드\n릴테이프 도슨트",
              price: "₩35,000",
              href: "/docent",
            },
            {
              src: "/images/control-room.png",
              category: "Wing A · 체험",
              title: "K-POP\n녹음 체험",
              price: "₩40,000~",
              href: "/experience",
            },
            {
              src: "/images/bora-box.png",
              category: "Wing B · 프로",
              title: "정식 음반 제작\n프로 에디션",
              price: "₩15,000,000~",
              href: "/pro",
            },
          ].map((item, i) => (
            <Link key={i} href={item.href} className="relative group block overflow-hidden"
              style={{ height: "clamp(300px, 40vw, 520px)" }}>
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: "grayscale(50%) brightness(0.4)" }}
              />
              {/* 하단 텍스트 오버레이 */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)" }} />
              {/* 구분선 (우측) */}
              {i < 2 && <div className="absolute top-0 right-0 w-px h-full hidden sm:block" style={{ background: "#222222" }} />}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="text-xs tracking-widest mb-3" style={{ color: "#555555" }}>{item.category}</p>
                <h3 className="font-black mb-2 leading-tight whitespace-pre-line"
                  style={{ color: "#ffffff", fontSize: "clamp(18px, 2.5vw, 24px)" }}>
                  {item.title}
                </h3>
                <p className="text-sm font-medium" style={{ color: "#888888" }}>{item.price}</p>
                <div className="mt-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs tracking-widest" style={{ color: "#aaaaaa" }}>자세히 보기</span>
                  <span style={{ color: "#aaaaaa" }}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ 숫자 — 수평 레이아웃 ══ */}
      <section style={{ background: "#161616", borderTop: "1px solid #1e1e1e", borderBottom: "1px solid #1e1e1e" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0"
            style={{ borderColor: "#222222" }}>
            {[
              { num: "50,000+", label: "누적 방문객" },
              { num: "10년+",   label: "운영 경력" },
              { num: "50명+",   label: "전속 아티스트" },
              { num: "4개국어", label: "도슨트 해설" },
            ].map((stat, i) => (
              <div key={i} className="px-8 py-10">
                <div className="font-black mb-1" style={{ color: "#ffffff", fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.02em" }}>{stat.num}</div>
                <div className="text-xs tracking-widest" style={{ color: "#555555" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 공간 — 2×2 대형 패널 ══ */}
      <section style={{ background: "#111111" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-20 pb-4">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-black tracking-tight" style={{ color: "#ffffff", fontSize: "clamp(18px, 3vw, 24px)" }}>
              공간 안내
            </h2>
            <Link href="/about#spaces" className="text-xs tracking-widest transition-opacity hover:opacity-60"
              style={{ color: "#444444" }}>전체 보기</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {[
            { src: "/images/recording-booth.png", label: "레코딩 부스",  sub: "Recording Booth" },
            { src: "/images/control-room.png",    label: "컨트롤 룸",   sub: "Control Room" },
            { src: "/images/bora-box.png",        label: "BORA BOX",   sub: "Live Broadcast" },
            { src: "/images/mirror-booth.png",    label: "AI 포토 부스", sub: "AI Photo Studio" },
          ].map((img, i) => (
            <div key={i} className="relative overflow-hidden group" style={{ height: "clamp(200px, 25vw, 360px)" }}>
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: "grayscale(60%) brightness(0.45)" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)" }} />
              {i > 0 && <div className="absolute top-0 left-0 w-px h-full" style={{ background: "#1e1e1e" }} />}
              <div className="absolute bottom-0 left-0 p-5">
                <div className="font-bold text-sm" style={{ color: "#ffffff" }}>{img.label}</div>
                <div className="text-xs tracking-widest mt-0.5" style={{ color: "#555555" }}>{img.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 스튜디오 소개 ══ */}
      <section style={{ background: "#161616", borderTop: "1px solid #1e1e1e" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: "480px" }}>
          {/* 이미지 */}
          <div className="relative order-2 lg:order-1" style={{ minHeight: "320px" }}>
            <Image
              src="/images/lounge-group.png"
              alt="레코딩카페 소개"
              fill
              className="object-cover"
              style={{ filter: "grayscale(55%) brightness(0.4)" }}
            />
          </div>
          {/* 텍스트 */}
          <div className="order-1 lg:order-2 flex flex-col justify-center px-8 sm:px-14 py-16">
            <p className="text-xs tracking-widest mb-6 uppercase" style={{ color: "#444444" }}>About</p>
            <h2 className="font-black leading-tight mb-8"
              style={{ color: "#ffffff", fontSize: "clamp(22px, 3vw, 32px)", letterSpacing: "-0.02em" }}>
              실제 K-POP 스타들이<br />녹음한 바로 그 스튜디오
            </h2>
            <div className="space-y-4 font-light text-sm leading-loose" style={{ color: "#666666" }}>
              <p>10년간 전속 아티스트 50여 명의 음반 작업을 진행해온 전문 녹음 스튜디오를 처음으로 일반에 공개합니다. 단순한 체험 공간이 아닌, 실제로 음반이 만들어지던 그 현장입니다.</p>
              <p>기획사 오디션에 도전했던 분들, K-POP을 사랑하는 외국인 팬들, 직접 음원을 발표하고 싶은 분들 모두를 위한 공간입니다.</p>
            </div>
            <div className="mt-10">
              <Link href="/experience"
                className="inline-block text-sm font-bold px-8 py-3.5 tracking-wide transition-opacity hover:opacity-75"
                style={{ background: "#ffffff", color: "#111111" }}>
                프로그램 알아보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 오시는 길 ══ */}
      <section className="py-20" style={{ background: "#111111", borderTop: "1px solid #1e1e1e" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <h2 className="font-black mb-12 tracking-tight" style={{ color: "#ffffff", fontSize: "clamp(18px, 3vw, 24px)" }}>
            오시는 길
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: "#1e1e1e" }}>
            {[
              { label: "주소",     main: "서울 서초구 강남대로107길 21, 2층", sub: "2F, 21, Gangnam-daero 107-gil, Seocho-gu" },
              { label: "대중교통", main: "신사역 3호선 5번 출구",             sub: "도보 4분 · 주차 불가" },
              { label: "운영 시간", main: "매일 12:00 – 21:00",              sub: "연중무휴 · 사전 예약 권장" },
            ].map((loc, i) => (
              <div key={i} className="px-8 py-10" style={{ background: "#111111" }}>
                <div className="text-xs tracking-widest uppercase mb-4" style={{ color: "#444444" }}>{loc.label}</div>
                <div className="font-bold text-sm mb-2" style={{ color: "#cccccc" }}>{loc.main}</div>
                <div className="text-xs font-light" style={{ color: "#555555" }}>{loc.sub}</div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/menu"
              className="inline-block text-sm font-bold px-10 py-4 tracking-wide transition-opacity hover:opacity-75"
              style={{ background: "#ffffff", color: "#111111" }}>
              🎟 입장권 구매하기
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 매거진 ══ */}
      {latestArticles.length > 0 && (
        <section className="py-20" style={{ background: "#161616", borderTop: "1px solid #1e1e1e" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="font-black tracking-tight" style={{ color: "#ffffff", fontSize: "clamp(18px, 3vw, 24px)" }}>
                매거진
              </h2>
              <Link href="/magazine" className="text-xs tracking-widest transition-opacity hover:opacity-60"
                style={{ color: "#444444" }}>전체 보기</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
