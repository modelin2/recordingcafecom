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
      <div className="text-center text-xs font-black py-2.5 px-4 tracking-widest"
        style={{ background: "#ffffff", color: "#111111" }}>
        🎤 사전 예약 시 음료 1잔 무료 증정 · 매일 12:00 – 21:00 운영 중
      </div>

      {/* ══ 히어로 ══ */}
      <section className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "80vh", background: "#111111" }}>
        <div className="absolute inset-0">
          <Image
            src="/images/hero-recording.jpeg"
            alt="Recording Café"
            fill
            priority
            className="object-cover object-center"
            style={{ opacity: 0.35 }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #111111bb 0%, #11111155 40%, #111111dd 100%)" }} />
        </div>

        <div className="relative text-center px-6 w-full max-w-3xl mx-auto">
          <div className="inline-block text-xs font-black tracking-widest px-4 py-1.5 rounded-full mb-8"
            style={{ background: "#2e2e2e", color: "#aaaaaa", border: "1px solid #3a3a3a" }}>
            Seoul · Sinsa · Since 2015
          </div>

          <h1 className="font-black leading-none mb-6" style={{ color: "#ffffff" }}>
            <span className="block" style={{ fontSize: "clamp(48px, 11vw, 100px)", letterSpacing: "-0.03em" }}>RECORDING</span>
            <span className="block" style={{ fontSize: "clamp(48px, 11vw, 100px)", letterSpacing: "-0.03em", color: "#d0d0d0" }}>CAFÉ</span>
          </h1>

          <p className="mb-10 leading-relaxed" style={{ color: "#888888", fontSize: "clamp(14px, 2vw, 18px)", maxWidth: "480px", margin: "0 auto 40px" }}>
            실제 K-POP 스타들이 녹음한 전문 스튜디오에서<br className="hidden sm:block" />
            나도 직접 노래를 녹음해 보세요
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/menu"
              className="font-black text-sm px-8 py-4 rounded-xl transition-opacity hover:opacity-80"
              style={{ background: "#ffffff", color: "#111111", letterSpacing: "0.04em" }}>
              🎟 입장권 구매
            </Link>
            <Link href="/experience"
              className="font-bold text-sm px-8 py-4 rounded-xl transition-opacity hover:opacity-70"
              style={{ background: "transparent", border: "1px solid #3a3a3a", color: "#aaaaaa", letterSpacing: "0.04em" }}>
              프로그램 둘러보기
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 방문 정보 바 ══ */}
      <section style={{ background: "#1a1a1a", borderTop: "1px solid #2a2a2a", borderBottom: "1px solid #2a2a2a" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              { icon: "🕐", label: "운영 시간", value: "매일 12:00–21:00", sub: "연중무휴" },
              { icon: "📍", label: "위치",     value: "신사역 3호선",       sub: "5번 출구 도보 4분" },
              { icon: "🎤", label: "프로그램", value: "녹음·도슨트",        sub: "₩35,000~" },
              { icon: "🏆", label: "운영 경력", value: "10년 이상",          sub: "전속 아티스트 50+명" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-5"
                style={{ borderRight: i % 2 === 0 && i < 3 ? "1px solid #2a2a2a" : i < 3 && i % 2 !== 0 ? "none" : "none" }}>
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "#555555" }}>{item.label}</div>
                  <div className="font-bold text-sm" style={{ color: "#ffffff" }}>{item.value}</div>
                  <div className="text-xs" style={{ color: "#555555" }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 체험 프로그램 ══ */}
      <section className="py-20" style={{ background: "#141414" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-block text-xs font-black tracking-widest px-3 py-1 rounded-full mb-4"
              style={{ background: "#222222", color: "#888888", border: "1px solid #2e2e2e" }}>
              Experience Programs
            </div>
            <h2 className="font-black" style={{ color: "#ffffff", fontSize: "clamp(22px, 4vw, 34px)", letterSpacing: "-0.02em" }}>
              지금 바로 예약할 수 있는 프로그램
            </h2>
            <p className="mt-3 text-sm" style={{ color: "#555555" }}>선택하신 프로그램을 클릭하면 상세 정보와 예약 페이지로 이동합니다</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 도슨트 투어 */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "#1e1e1e", border: "1px solid #2a2a2a" }}>
              <div className="relative overflow-hidden" style={{ height: "200px" }}>
                <Image src="/images/recording-booth.png" alt="도슨트 투어" fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #1e1e1e 0%, transparent 55%)" }} />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-black px-3 py-1 rounded-full" style={{ background: "#2e2e2e", color: "#aaaaaa", border: "1px solid #3a3a3a" }}>Wing A · 전시</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-black text-base leading-snug" style={{ color: "#ffffff" }}>K-POP 레전드<br />릴테이프 도슨트</h3>
                  <div className="text-right flex-shrink-0 ml-3">
                    <div className="font-black text-base" style={{ color: "#ffffff" }}>₩35,000</div>
                    <div className="text-xs" style={{ color: "#555555" }}>1인 기준</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#777777" }}>30년 K-POP 역사를 담은 레전드들의 실제 녹음 릴테이프. 한·영·중·일 해설 제공.</p>
                <div className="flex gap-2">
                  <Link href="/docent" className="flex-1 text-center text-xs font-bold py-2.5 rounded-lg transition-opacity hover:opacity-70"
                    style={{ border: "1px solid #3a3a3a", color: "#888888" }}>상세보기</Link>
                  <Link href="/menu" className="flex-1 text-center text-xs font-bold py-2.5 rounded-lg transition-opacity hover:opacity-80"
                    style={{ background: "#ffffff", color: "#111111" }}>🎟 예약하기</Link>
                </div>
              </div>
            </div>

            {/* 녹음 체험 */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "#1e1e1e", border: "1px solid #2a2a2a" }}>
              <div className="relative overflow-hidden" style={{ height: "200px" }}>
                <Image src="/images/control-room.png" alt="녹음 체험" fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #1e1e1e 0%, transparent 55%)" }} />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-black px-3 py-1 rounded-full" style={{ background: "#ffffff", color: "#111111" }}>Wing A · 체험</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-black px-2.5 py-1 rounded-full" style={{ background: "#333333", color: "#ffffff", border: "1px solid #444444" }}>인기</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-black text-base leading-snug" style={{ color: "#ffffff" }}>K-POP<br />녹음 체험</h3>
                  <div className="text-right flex-shrink-0 ml-3">
                    <div className="font-black text-base" style={{ color: "#ffffff" }}>₩40,000~</div>
                    <div className="text-xs" style={{ color: "#555555" }}>1인 기준</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#777777" }}>전문 레코딩 부스에서 내가 직접 K-POP 가수처럼 녹음. 음원 파일 제공, LP 제작 옵션 가능.</p>
                <div className="flex gap-2">
                  <Link href="/experience" className="flex-1 text-center text-xs font-bold py-2.5 rounded-lg transition-opacity hover:opacity-70"
                    style={{ border: "1px solid #3a3a3a", color: "#888888" }}>상세보기</Link>
                  <Link href="/menu" className="flex-1 text-center text-xs font-bold py-2.5 rounded-lg transition-opacity hover:opacity-80"
                    style={{ background: "#ffffff", color: "#111111" }}>🎟 예약하기</Link>
                </div>
              </div>
            </div>

            {/* 프로 에디션 */}
            <div className="rounded-2xl overflow-hidden sm:col-span-2 lg:col-span-1" style={{ background: "#1e1e1e", border: "1px solid #2a2a2a" }}>
              <div className="relative overflow-hidden" style={{ height: "200px" }}>
                <Image src="/images/bora-box.png" alt="프로 에디션" fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #1e1e1e 0%, transparent 55%)" }} />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-black px-3 py-1 rounded-full" style={{ background: "#2e2e2e", color: "#aaaaaa", border: "1px solid #3a3a3a" }}>Wing B · 프로</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-black text-base leading-snug" style={{ color: "#ffffff" }}>정식 음반 제작<br />프로 에디션</h3>
                  <div className="text-right flex-shrink-0 ml-3">
                    <div className="font-black text-base" style={{ color: "#cccccc" }}>₩15M~</div>
                    <div className="text-xs" style={{ color: "#555555" }}>프로젝트 기준</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#777777" }}>KOMCA 작곡가 1:1 매칭, 전문 믹싱·마스터링, 국내외 150개 플랫폼 동시 발매.</p>
                <div className="flex gap-2">
                  <Link href="/pro" className="flex-1 text-center text-xs font-bold py-2.5 rounded-lg transition-opacity hover:opacity-70"
                    style={{ border: "1px solid #3a3a3a", color: "#888888" }}>상세보기</Link>
                  <Link href="/pro" className="flex-1 text-center text-xs font-bold py-2.5 rounded-lg transition-opacity hover:opacity-70"
                    style={{ border: "1px solid #3a3a3a", color: "#888888" }}>문의하기</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 숫자 ══ */}
      <section className="py-16" style={{ background: "#111111", borderTop: "1px solid #222222" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { num: "50,000+", label: "누적 방문객",  sub: "국내외 K-POP 팬" },
              { num: "10년+",   label: "운영 경력",    sub: "전문 엔터테인먼트" },
              { num: "50명+",   label: "전속 아티스트", sub: "음반 제작 실적" },
              { num: "4개국어", label: "도슨트 언어",   sub: "한·영·중·일" },
            ].map((stat, i) => (
              <div key={i} className="rounded-2xl py-7 px-4" style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}>
                <div className="font-black mb-1" style={{ color: "#ffffff", fontSize: "clamp(20px, 4vw, 28px)" }}>{stat.num}</div>
                <div className="font-bold text-sm mb-1" style={{ color: "#cccccc" }}>{stat.label}</div>
                <div className="text-xs" style={{ color: "#555555" }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 공간 갤러리 ══ */}
      <section className="py-20" style={{ background: "#141414", borderTop: "1px solid #222222" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-block text-xs font-black tracking-widest px-3 py-1 rounded-full mb-3"
                style={{ background: "#222222", color: "#888888", border: "1px solid #2e2e2e" }}>Our Spaces</div>
              <h2 className="font-black" style={{ color: "#ffffff", fontSize: "clamp(20px, 3vw, 28px)", letterSpacing: "-0.02em" }}>공간 안내</h2>
            </div>
            <Link href="/experience" className="text-xs tracking-widest uppercase transition-opacity hover:opacity-60 hidden sm:block"
              style={{ color: "#555555" }}>자세히 보기 →</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { src: "/images/recording-booth.png", label: "레코딩 부스",  sub: "Studio Booth",    tag: "녹음 체험" },
              { src: "/images/control-room.png",    label: "컨트롤룸",    sub: "Control Room",   tag: "프로 전용" },
              { src: "/images/bora-box.png",        label: "BORA BOX",   sub: "Live Broadcast", tag: "라이브 방송" },
              { src: "/images/mirror-booth.png",    label: "AI 포토 부스", sub: "AI Photo Studio", tag: "포토 체험" },
            ].map((img, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
                <Image src={img.src} alt={img.label} fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full"
                    style={{ background: "#ffffff", color: "#111111" }}>{img.tag}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="font-bold text-sm" style={{ color: "#ffffff" }}>{img.label}</div>
                  <div className="text-xs tracking-widest" style={{ color: "#777777" }}>{img.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 스튜디오 소개 ══ */}
      <section className="py-20" style={{ background: "#111111", borderTop: "1px solid #222222" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <Image src="/images/lounge-group.png" alt="레코딩카페 소개" fill className="object-cover" />
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.2)" }} />
            </div>
            <div>
              <div className="inline-block text-xs font-black tracking-widest px-3 py-1 rounded-full mb-5"
                style={{ background: "#222222", color: "#888888", border: "1px solid #2e2e2e" }}>About</div>
              <h2 className="font-black leading-tight mb-6" style={{ color: "#ffffff", fontSize: "clamp(22px, 3.5vw, 32px)", letterSpacing: "-0.02em" }}>
                실제 K-POP 스타들이<br />녹음한 바로 그 스튜디오
              </h2>
              <div className="space-y-4 text-sm leading-loose" style={{ color: "#777777" }}>
                <p>10년간 전속 아티스트 50여 명의 음반 작업을 진행해온 전문 녹음 스튜디오를 처음으로 일반에 공개합니다. 단순한 체험 공간이 아니라, 실제로 음반이 만들어지던 그 현장입니다.</p>
                <p>기획사 오디션에 도전했던 분들, K-POP을 사랑하는 외국인 팬들, 직접 음원을 발표하고 싶은 분들 모두를 위한 공간입니다.</p>
              </div>
              <div className="mt-8">
                <Link href="/experience"
                  className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-xl transition-opacity hover:opacity-80"
                  style={{ background: "#ffffff", color: "#111111" }}>
                  프로그램 알아보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 오시는 길 ══ */}
      <section className="py-16" style={{ background: "#141414", borderTop: "1px solid #222222" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-black" style={{ color: "#ffffff", fontSize: "clamp(20px, 3vw, 26px)" }}>오시는 길</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: "📍", label: "주소",     main: "서울 서초구 강남대로107길 21, 2층", sub: "2F, 21, Gangnam-daero 107-gil, Seocho-gu" },
              { icon: "🚇", label: "대중교통", main: "신사역 3호선 5번 출구",             sub: "도보 4분 · 주차 불가 (인근 유료 주차장)" },
              { icon: "🕐", label: "운영 시간", main: "낮 12:00 – 밤 21:00",            sub: "연중무휴 · 사전 예약 권장" },
            ].map((loc, i) => (
              <div key={i} className="rounded-2xl p-6 text-center" style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}>
                <div className="text-2xl mb-3">{loc.icon}</div>
                <div className="font-black text-xs uppercase tracking-widest mb-2" style={{ color: "#888888" }}>{loc.label}</div>
                <div className="font-bold text-sm mb-1" style={{ color: "#ffffff" }}>{loc.main}</div>
                <div className="text-xs" style={{ color: "#555555" }}>{loc.sub}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/menu"
              className="inline-block font-black text-sm px-12 py-4 rounded-xl transition-opacity hover:opacity-80"
              style={{ background: "#ffffff", color: "#111111", letterSpacing: "0.04em" }}>
              🎟 입장권 구매하기
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 매거진 ══ */}
      {latestArticles.length > 0 && (
        <section className="py-20" style={{ background: "#111111", borderTop: "1px solid #222222" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="inline-block text-xs font-black tracking-widest px-3 py-1 rounded-full mb-3"
                  style={{ background: "#222222", color: "#888888", border: "1px solid #2e2e2e" }}>Magazine</div>
                <h2 className="font-black" style={{ color: "#ffffff", fontSize: "clamp(20px, 3vw, 28px)", letterSpacing: "-0.02em" }}>레코딩카페 매거진</h2>
              </div>
              <Link href="/magazine" className="text-xs tracking-widest uppercase transition-opacity hover:opacity-60 hidden sm:block"
                style={{ color: "#555555" }}>전체 보기 →</Link>
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
