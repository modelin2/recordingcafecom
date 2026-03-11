import Image from "next/image";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import ScrollReveal from "@/components/ScrollReveal";
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
      {/* ─── 히어로 섹션 ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-recording.jpeg"
            alt="레코딩카페 - K-POP 녹음 체험"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/95 via-[#050508]/75 to-[#050508]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/30" />
        </div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-6">
              <span className="text-[#D4AF37] text-xs font-semibold tracking-wider uppercase">
                서울 유일의 K-POP 복합 문화 공간
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
              K-POP의<br />
              <span className="gold-text">심장부</span>로<br />
              오세요
            </h1>

            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg">
              레코딩카페 — 서울의 유일한 K-POP 복합 문화 공간
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/experience"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#DB2777] hover:opacity-90 text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:scale-105 text-base"
              >
                체험 에디션 입장 →
              </Link>
              <Link
                href="/pro"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#92400E] hover:opacity-90 text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:scale-105 text-base"
              >
                프로 에디션 입장 →
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#D4AF37]/60" />
          <span>스크롤</span>
        </div>
      </section>

      {/* ─── 두 존 카드 (키자니아 입구 스타일) ─────────────────────────── */}
      <section className="py-24 bg-[#050508] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal animation="fade-up" duration={700}>
            <div className="text-center mb-16">
              <div className="text-[#D4AF37] text-sm font-mono uppercase tracking-widest mb-3">— Choose Your Experience</div>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
                어떤 <span className="gold-text">여정</span>을 선택하시겠어요?
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto">
                키자니아처럼, 두 개의 특별한 세계가 여러분을 기다립니다
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 체험 에디션 카드 */}
            <ScrollReveal animation="fade-right" duration={700}>
              <div className="relative rounded-3xl overflow-hidden group cursor-pointer"
                style={{ background: "linear-gradient(135deg, #1a0533 0%, #2d0a3e 50%, #1a0a1a 100%)" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/30 to-[#DB2777]/20 opacity-60" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED]/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#DB2777]/20 rounded-full blur-3xl" />
                <div className="relative p-10 flex flex-col min-h-[520px]">
                  <div className="text-6xl mb-6">🎤</div>
                  <div className="inline-flex w-fit items-center gap-2 bg-[#7C3AED]/20 border border-[#7C3AED]/40 rounded-full px-4 py-1.5 mb-4">
                    <span className="text-[#A855F7] text-xs font-semibold tracking-wider uppercase">Experience Edition</span>
                  </div>
                  <h3 className="text-4xl font-black text-white mb-4">체험 에디션</h3>
                  <p className="text-slate-300 text-base leading-relaxed mb-6 flex-1">
                    K-POP 레전드 릴테이프 도슨트 투어 + 전문 녹음 체험
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2">
                      <span className="text-white font-bold text-lg">₩35,000부터</span>
                    </div>
                    <Link
                      href="/experience"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#DB2777] text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all hover:scale-105 text-sm"
                    >
                      입장하기 →
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 프로 에디션 카드 */}
            <ScrollReveal animation="fade-left" duration={700}>
              <div className="relative rounded-3xl overflow-hidden group cursor-pointer"
                style={{ background: "linear-gradient(135deg, #1a1200 0%, #2a1a00 50%, #1a1000 100%)" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#92400E]/20 opacity-60" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/15 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#92400E]/20 rounded-full blur-3xl" />
                <div className="relative p-10 flex flex-col min-h-[520px]">
                  <div className="text-6xl mb-6">🎵</div>
                  <div className="inline-flex w-fit items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full px-4 py-1.5 mb-4">
                    <span className="text-[#D4AF37] text-xs font-semibold tracking-wider uppercase">Pro Edition</span>
                  </div>
                  <h3 className="text-4xl font-black text-white mb-4">프로 에디션</h3>
                  <p className="text-slate-300 text-base leading-relaxed mb-6 flex-1">
                    KOMCA 작곡가 매칭 + K-POP 정식 음반 제작 &amp; 발매
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2">
                      <span className="text-white font-bold text-lg">₩15,000,000부터</span>
                    </div>
                    <Link
                      href="/pro"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#92400E] text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all hover:scale-105 text-sm"
                    >
                      입장하기 →
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── 통계 섹션 ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0a0a0f] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/5 via-transparent to-[#D4AF37]/5" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "10년+", label: "운영" },
              { value: "50,000+", label: "방문객" },
              { value: "100개+", label: "음원 발매" },
              { value: "3개국", label: "프랜차이즈" },
            ].map((stat, i) => (
              <ScrollReveal key={i} animation="zoom-in" delay={i * 100} duration={600}>
                <div className="text-center gold-card rounded-2xl p-6">
                  <div className="text-3xl sm:text-4xl font-black gold-text mb-2">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 갤러리 그리드 ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[#050508] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal animation="fade-up" duration={700}>
            <div className="text-center mb-12">
              <div className="text-[#D4AF37] text-sm font-mono uppercase tracking-widest mb-3">— Our Space</div>
              <h2 className="text-4xl font-black text-white">
                공간 <span className="gold-text">둘러보기</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { src: "/images/recording-booth.png", alt: "녹음 부스" },
              { src: "/images/control-room.png", alt: "컨트롤룸" },
              { src: "/images/bora-box.png", alt: "BORA BOX" },
              { src: "/images/mirror-booth.png", alt: "미러 부스" },
              { src: "/images/lounge-group.png", alt: "라운지 그룹" },
              { src: "/images/couple-cafe.jpg", alt: "커플 BORA BOX" },
            ].map((img, i) => (
              <ScrollReveal key={i} animation="zoom-in" delay={i * 80} duration={600}>
                <div className="relative aspect-square rounded-2xl overflow-hidden group">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {img.alt}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 회사 스토리 ────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0a0a0f] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal animation="fade-up" duration={700}>
            <div className="text-[#D4AF37] text-sm font-mono uppercase tracking-widest mb-4">— Our Story</div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-8">
              레코딩카페의 <span className="gold-text">이야기</span>
            </h2>
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
              10년간 50여명 전속 아티스트의 음반 제작 인프라를 처음으로 일반에 공개합니다.
              K-POP 산업의 심장부에서 쌓아온 노하우와 전문 장비를 누구나 경험할 수 있도록.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200} duration={700}>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="gold-card rounded-2xl p-6">
                <div className="text-3xl mb-3">🎼</div>
                <h3 className="text-white font-bold text-lg mb-2">전문 음악 인프라</h3>
                <p className="text-slate-400 text-sm">메이저 음반사와 동일한 스튜디오 장비와 제작 프로세스를 그대로 제공합니다.</p>
              </div>
              <div className="gold-card rounded-2xl p-6">
                <div className="text-3xl mb-3">🌏</div>
                <h3 className="text-white font-bold text-lg mb-2">글로벌 K-POP 허브</h3>
                <p className="text-slate-400 text-sm">전 세계 50여개국 K-POP 팬들이 방문하는 서울 최고의 음악 체험 공간.</p>
              </div>
              <div className="gold-card rounded-2xl p-6">
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="text-white font-bold text-lg mb-2">검증된 퀄리티</h3>
                <p className="text-slate-400 text-sm">KOMCA 소속 작곡가, 전문 사운드 엔지니어와 함께 최고의 음악을 만드세요.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── 오시는 길 ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#050508] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal animation="fade-right" duration={700}>
              <div>
                <div className="text-[#D4AF37] text-sm font-mono uppercase tracking-widest mb-3">— Location</div>
                <h2 className="text-4xl font-black text-white mb-8">
                  오시는 <span className="gold-text">길</span>
                </h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 text-lg">
                      📍
                    </div>
                    <div>
                      <p className="text-white font-bold mb-1">주소</p>
                      <p className="text-slate-300">서울 서초구 강남대로107길 21, 2층</p>
                      <p className="text-slate-500 text-sm">2F, 21, Gangnam-daero 107-gil, Seocho-gu, Seoul</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 text-lg">
                      🚇
                    </div>
                    <div>
                      <p className="text-white font-bold mb-1">지하철</p>
                      <p className="text-slate-300">신사역 3호선 도보 4분</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 text-lg">
                      🕐
                    </div>
                    <div>
                      <p className="text-white font-bold mb-1">영업시간</p>
                      <p className="text-slate-300">오전 10시 ~ 밤 10시</p>
                      <p className="text-[#D4AF37] text-sm font-semibold">연중무휴</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href="https://talk.naver.com/ct/wu2kkmv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#F0D060] text-black font-bold px-6 py-3 rounded-xl transition-all hover:scale-105"
                  >
                    네이버 상담 예약 →
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" duration={700}>
              <div className="relative rounded-3xl overflow-hidden aspect-square">
                <Image
                  src="/images/entrance.png"
                  alt="레코딩카페 입구"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/40 to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── 매거진 섹션 ────────────────────────────────────────────────── */}
      {latestArticles.length > 0 && (
        <section className="py-24 bg-[#0a0a0f] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <ScrollReveal animation="fade-up" duration={700}>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <div className="text-[#D4AF37] text-sm font-mono uppercase tracking-widest mb-3">— Magazine</div>
                  <h2 className="text-4xl font-black text-white">
                    레코딩카페 <span className="gold-text">매거진</span>
                  </h2>
                  <p className="text-slate-400 mt-2">
                    데이트, 음악, K-pop 체험에 관한 실용적인 정보
                  </p>
                </div>
                <Link
                  href="/magazine"
                  className="inline-flex items-center gap-2 glass-dark text-slate-300 hover:text-[#D4AF37] px-5 py-2.5 rounded-xl text-sm font-medium transition-all self-start sm:self-auto"
                >
                  매거진 더 보기 →
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((article, i) => (
                <ScrollReveal key={article.slug} animation="fade-up" delay={i * 100} duration={650}>
                  <ArticleCard article={article} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
