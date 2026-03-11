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

// ── MOZAIQ 스타일 ──────────────────────────────────────────
// 배경: #FFFEF5 (warm cream)
// 보조 배경: #F5F0E8
// 텍스트: #1a1209 (warm near-black)
// 서브텍스트: #7a6a58
// 보더/디바이더: #e0d5c5
// 강조: #D4AF37 (gold)
// ──────────────────────────────────────────────────────────

export default async function Home() {
  const latestArticles = await getLatestArticles();

  return (
    <div style={{ background: "#FFFEF5", color: "#1a1209" }}>

      {/* ── 공지 바 ── */}
      <div className="text-center py-2.5 px-4 text-xs tracking-[0.2em]"
        style={{ background: "#1a1209", color: "#D4AF37" }}>
        사전 예약 시 음료 1잔 무료 증정 &nbsp;·&nbsp; OPEN 12:00 – 21:00
      </div>

      {/* ══════════════════════════════════════════
          히어로 — 풀스크린 영상
      ══════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: 600 }}>
        {/* 유튜브 배경 영상 */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            className="absolute w-full h-full"
            style={{
              top: "50%", left: "50%",
              width: "177.78vh", height: "56.25vw",
              minWidth: "100%", minHeight: "100%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
            src="https://www.youtube.com/embed/9bZkp7q19f0?autoplay=1&mute=1&loop=1&playlist=9bZkp7q19f0&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
          {/* 오버레이 */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(26,18,9,0.35) 0%, rgba(26,18,9,0.55) 60%, rgba(255,254,245,1) 100%)" }} />
        </div>

        {/* 히어로 텍스트 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-xs tracking-[0.4em] uppercase mb-6 font-medium"
            style={{ color: "#D4AF37", letterSpacing: "0.4em" }}>
            Seoul · Sinsa · Since 2015
          </p>
          <h1 className="font-black leading-none mb-4"
            style={{ color: "#FFFEF5", fontSize: "clamp(3rem, 12vw, 10rem)", letterSpacing: "-0.02em" }}>
            RECORDING<br />
            <span style={{ color: "#D4AF37" }}>CAFÉ</span>
          </h1>
          <p className="max-w-lg text-base sm:text-lg leading-relaxed mb-10 font-light"
            style={{ color: "rgba(255,254,245,0.8)", letterSpacing: "0.03em" }}>
            실제 K-POP 스타들이 녹음한 전문 스튜디오를 직접 체험하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/menu"
              className="px-10 py-4 text-sm font-bold tracking-[0.15em] transition-all"
              style={{ background: "#D4AF37", color: "#1a1209" }}>
              🎟 입장권 구매
            </Link>
            <Link href="/experience"
              className="px-10 py-4 text-sm font-medium tracking-[0.15em] transition-all"
              style={{ border: "1px solid rgba(255,254,245,0.5)", color: "#FFFEF5" }}>
              프로그램 보기
            </Link>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "#D4AF37" }}>Scroll</span>
          <div className="w-px h-10 animate-pulse" style={{ background: "linear-gradient(to bottom, #D4AF37, transparent)" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          방문 정보 바
      ══════════════════════════════════════════ */}
      <section style={{ borderBottom: "1px solid #e0d5c5" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4"
          style={{ borderTop: "1px solid #e0d5c5" }}>
          {[
            { label: "OPEN", value: "12:00 – 21:00", sub: "연중무휴" },
            { label: "LOCATION", value: "신사역 3호선", sub: "5번 출구 도보 4분" },
            { label: "PROGRAM", value: "녹음 · 도슨트", sub: "₩35,000~" },
            { label: "HISTORY", value: "10년+", sub: "전속 아티스트 50명+" },
          ].map((item, i) => (
            <div key={i} className="px-6 py-6 text-center"
              style={{ borderRight: i < 3 ? "1px solid #e0d5c5" : "none" }}>
              <div className="text-[10px] tracking-[0.3em] mb-2 font-bold"
                style={{ color: "#D4AF37" }}>{item.label}</div>
              <div className="font-black text-sm mb-0.5" style={{ color: "#1a1209" }}>{item.value}</div>
              <div className="text-xs" style={{ color: "#7a6a58" }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          프로그램 섹션
      ══════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6" style={{ background: "#FFFEF5" }}>
        <div className="max-w-6xl mx-auto">
          {/* 섹션 헤더 */}
          <div className="flex items-center gap-6 mb-16">
            <div className="text-[10px] tracking-[0.4em] font-bold uppercase" style={{ color: "#D4AF37" }}>
              Programs
            </div>
            <div className="flex-1 h-px" style={{ background: "#e0d5c5" }} />
            <h2 className="text-2xl sm:text-3xl font-black" style={{ letterSpacing: "-0.02em" }}>
              지금 바로 예약할 수 있는 프로그램
            </h2>
          </div>

          {/* 카드 3개 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0"
            style={{ border: "1px solid #e0d5c5" }}>
            {[
              {
                img: "/images/recording-booth.png",
                tag: "Wing A · 전시",
                title: "K-POP 레전드\n릴테이프 도슨트",
                price: "₩35,000",
                desc: "30년 K-POP 역사를 담은 레전드들의 실제 녹음 릴테이프. 4개국어 해설 제공.",
                href1: "/docent", href2: "/menu",
                accent: "#C8853A",
              },
              {
                img: "/images/control-room.png",
                tag: "Wing A · 체험 · 인기",
                title: "K-POP\n녹음 체험",
                price: "₩40,000~",
                desc: "전문 레코딩 부스에서 직접 K-POP 가수처럼 녹음. 음원 파일 즉시 제공.",
                href1: "/experience", href2: "/menu",
                accent: "#D4AF37",
              },
              {
                img: "/images/bora-box.png",
                tag: "Wing B · 프로",
                title: "정식 음반 제작\n프로 에디션",
                price: "₩15,000,000~",
                desc: "KOMCA 작곡가 매칭, 믹싱·마스터링, 150개 글로벌 플랫폼 동시 발매.",
                href1: "/pro", href2: "/pro",
                accent: "#8B6914",
              },
            ].map((card, i) => (
              <div key={i} className="group flex flex-col"
                style={{ borderRight: i < 2 ? "1px solid #e0d5c5" : "none" }}>
                {/* 이미지 */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <Image src={card.img} alt={card.title.replace("\n", " ")} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(26,18,9,0.5), transparent)" }} />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] px-2.5 py-1"
                      style={{ background: card.accent, color: "#fff" }}>
                      {card.tag}
                    </span>
                  </div>
                </div>
                {/* 내용 */}
                <div className="flex flex-col flex-1 p-7"
                  style={{ borderTop: "1px solid #e0d5c5" }}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-black text-lg leading-snug whitespace-pre-line"
                      style={{ color: "#1a1209" }}>{card.title}</h3>
                    <span className="font-black text-base ml-4 flex-shrink-0"
                      style={{ color: card.accent }}>{card.price}</span>
                  </div>
                  <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: "#7a6a58" }}>
                    {card.desc}
                  </p>
                  <div className="flex gap-2">
                    <Link href={card.href1}
                      className="flex-1 text-center py-2.5 text-xs font-bold tracking-[0.1em] transition-all"
                      style={{ border: `1px solid ${card.accent}`, color: card.accent }}>
                      상세보기
                    </Link>
                    <Link href={card.href2}
                      className="flex-1 text-center py-2.5 text-xs font-bold tracking-[0.1em] transition-all"
                      style={{ background: card.accent, color: "#fff" }}>
                      예약하기
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          숫자 통계
      ══════════════════════════════════════════ */}
      <section className="py-16" style={{ background: "#F5F0E8", borderTop: "1px solid #e0d5c5", borderBottom: "1px solid #e0d5c5" }}>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-0">
          {[
            { num: "50,000+", label: "누적 방문객" },
            { num: "10년+",   label: "운영 경력" },
            { num: "50명+",   label: "전속 아티스트" },
            { num: "4개국어", label: "도슨트 해설" },
          ].map((s, i) => (
            <div key={i} className="text-center py-8"
              style={{ borderRight: i < 3 ? "1px solid #e0d5c5" : "none" }}>
              <div className="font-black mb-1"
                style={{ color: "#D4AF37", fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>{s.num}</div>
              <div className="text-xs tracking-[0.2em] uppercase" style={{ color: "#7a6a58" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          공간 갤러리 — 풀폭 이미지 그리드
      ══════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6" style={{ background: "#FFFEF5" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-6 mb-16">
            <div className="text-[10px] tracking-[0.4em] font-bold uppercase" style={{ color: "#D4AF37" }}>Spaces</div>
            <div className="flex-1 h-px" style={{ background: "#e0d5c5" }} />
            <h2 className="text-2xl font-black" style={{ letterSpacing: "-0.02em" }}>공간 안내</h2>
          </div>

          {/* 비대칭 그리드 */}
          <div className="grid grid-cols-3 grid-rows-2 gap-2" style={{ height: "500px" }}>
            <div className="col-span-2 row-span-2 relative overflow-hidden group">
              <Image src="/images/recording-booth.png" alt="레코딩 부스" fill
                className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,18,9,0.7), transparent)" }} />
              <div className="absolute bottom-5 left-5">
                <div className="text-white font-black text-xl">레코딩 부스</div>
                <div className="text-xs tracking-widest mt-0.5" style={{ color: "#D4AF37" }}>Studio Booth</div>
              </div>
            </div>
            {[
              { src: "/images/control-room.png", label: "컨트롤룸", sub: "Control Room" },
              { src: "/images/mirror-booth.png", label: "AI 포토 부스", sub: "AI Photo" },
            ].map((img, i) => (
              <div key={i} className="relative overflow-hidden group col-span-1">
                <Image src={img.src} alt={img.label} fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "rgba(26,18,9,0.4)" }} />
                <div className="absolute bottom-3 left-3">
                  <div className="text-white font-bold text-sm">{img.label}</div>
                  <div className="text-[10px] tracking-widest" style={{ color: "#D4AF37" }}>{img.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          소개 — 텍스트 + 이미지 (모자이크 스타일)
      ══════════════════════════════════════════ */}
      <section className="py-24" style={{ background: "#F5F0E8", borderTop: "1px solid #e0d5c5" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0"
            style={{ border: "1px solid #e0d5c5" }}>
            {/* 이미지 */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <Image src="/images/lounge-group.png" alt="레코딩카페" fill className="object-cover" />
            </div>
            {/* 텍스트 */}
            <div className="flex flex-col justify-center p-10 sm:p-16"
              style={{ borderLeft: "1px solid #e0d5c5" }}>
              <div className="text-[10px] tracking-[0.4em] uppercase font-bold mb-6"
                style={{ color: "#D4AF37" }}>About</div>
              <h2 className="font-black text-3xl sm:text-4xl leading-tight mb-8"
                style={{ color: "#1a1209", letterSpacing: "-0.02em" }}>
                실제 K-POP 스타들이<br />녹음한 바로 그 스튜디오
              </h2>
              <div className="space-y-4 text-sm leading-loose mb-10"
                style={{ color: "#7a6a58" }}>
                <p>10년간 전속 아티스트 50여 명의 음반 작업을 진행해온 전문 스튜디오를 처음으로 일반에 공개합니다.</p>
                <p>기획사 오디션에 도전했던 분들, K-POP을 사랑하는 외국인 팬들, 직접 음원을 발표하고 싶은 분들 모두를 위한 공간입니다.</p>
              </div>
              <div className="h-px mb-10" style={{ background: "#e0d5c5" }} />
              <Link href="/about"
                className="inline-flex items-center gap-3 text-sm font-bold tracking-[0.15em] group"
                style={{ color: "#1a1209" }}>
                <span>MORE ABOUT US</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          오시는 길
      ══════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6" style={{ background: "#FFFEF5", borderTop: "1px solid #e0d5c5" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 mb-10"
            style={{ border: "1px solid #e0d5c5" }}>
            {[
              { icon: "📍", title: "ADDRESS", main: "서울 서초구 강남대로107길 21, 2층", sub: "2F, 21 Gangnam-daero 107-gil, Seocho-gu" },
              { icon: "🚇", title: "SUBWAY", main: "신사역 3호선 5번 출구", sub: "도보 4분 · 주차 불가" },
              { icon: "🕐", title: "HOURS", main: "12:00 – 21:00", sub: "연중무휴 · 사전 예약 권장" },
            ].map((loc, i) => (
              <div key={i} className="p-8 text-center"
                style={{ borderRight: i < 2 ? "1px solid #e0d5c5" : "none" }}>
                <div className="text-2xl mb-3">{loc.icon}</div>
                <div className="text-[10px] tracking-[0.3em] font-bold mb-2" style={{ color: "#D4AF37" }}>{loc.title}</div>
                <div className="font-bold text-sm mb-1" style={{ color: "#1a1209" }}>{loc.main}</div>
                <div className="text-xs" style={{ color: "#7a6a58" }}>{loc.sub}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/menu"
              className="inline-block px-12 py-4 font-black text-sm tracking-[0.15em] transition-all"
              style={{ background: "#1a1209", color: "#D4AF37" }}>
              🎟 입장권 구매하기
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          매거진
      ══════════════════════════════════════════ */}
      {latestArticles.length > 0 && (
        <section className="py-24 px-4 sm:px-6" style={{ background: "#F5F0E8", borderTop: "1px solid #e0d5c5" }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-16">
              <div className="flex items-center gap-6">
                <div className="text-[10px] tracking-[0.4em] font-bold uppercase" style={{ color: "#D4AF37" }}>Magazine</div>
                <div className="h-px w-16" style={{ background: "#e0d5c5" }} />
                <h2 className="text-2xl font-black" style={{ letterSpacing: "-0.02em" }}>레코딩카페 매거진</h2>
              </div>
              <Link href="/magazine"
                className="text-xs font-bold tracking-[0.2em] uppercase hidden sm:block transition-opacity hover:opacity-60"
                style={{ color: "#1a1209" }}>
                전체 보기 →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
