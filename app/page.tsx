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
      <div className="bg-[#D4AF37] text-black text-xs font-bold text-center py-2 px-4 tracking-wide">
        🎤 사전 예약 시 음료 1잔 무료 증정 · 매일 10:00 – 22:00 운영 중
      </div>

      {/* ══════════════════════════════════════════
          히어로 — 테마파크 입구 스타일
      ══════════════════════════════════════════ */}
      <section className="relative h-[80vh] min-h-[560px] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-recording.jpeg"
            alt="K Recording Café"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/70 via-[#050508]/40 to-[#050508]/90" />
        </div>

        {/* 중앙 콘텐츠 */}
        <div className="relative text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37] text-black text-[11px] font-black px-4 py-1.5 rounded-full tracking-widest mb-6 uppercase">
            ✦ Seoul · Sinsa · Since 2015
          </div>

          <h1 className="font-black text-white leading-tight mb-4">
            <span className="block text-5xl sm:text-7xl lg:text-8xl tracking-tight">
              K·RECORDING
            </span>
            <span className="block text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#D4AF37]">
              CAFÉ
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-xl mt-4 mb-8 leading-relaxed max-w-2xl mx-auto">
            실제 K-POP 스타들이 녹음한 전문 스튜디오에서<br className="hidden sm:block" />
            나도 직접 노래를 녹음해 보세요
          </p>

          {/* 메인 CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/menu"
              className="bg-[#D4AF37] hover:bg-[#F0D060] text-black font-black px-8 py-4 rounded-xl text-sm tracking-wide transition-colors shadow-lg shadow-[#D4AF37]/20 w-52 text-center">
              🎟 입장권 구매
            </Link>
            <Link href="/experience"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-xl text-sm tracking-wide transition-colors w-52 text-center backdrop-blur-sm">
              프로그램 둘러보기
            </Link>
          </div>
        </div>

        {/* 스크롤 가이드 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          방문 정보 바
      ══════════════════════════════════════════ */}
      <section className="bg-[#0f0f18] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/5">
            {[
              { icon: "🕐", label: "운영 시간", value: "매일 10:00–22:00", sub: "연중무휴" },
              { icon: "📍", label: "위치", value: "신사역 3호선", sub: "5번 출구 도보 4분" },
              { icon: "🎤", label: "체험 프로그램", value: "녹음·도슨트", sub: "₩35,000~" },
              { icon: "🏆", label: "운영 경력", value: "10년 이상", sub: "전속 아티스트 50+명" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-5">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="text-slate-500 text-[10px] uppercase tracking-widest mb-0.5">{item.label}</div>
                  <div className="text-white font-bold text-sm">{item.value}</div>
                  <div className="text-slate-500 text-xs">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          체험 프로그램 섹션 (키자니아 카드 그리드)
      ══════════════════════════════════════════ */}
      <section className="bg-[#050508] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#A855F7]/20 text-[#A855F7] text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase mb-4">
              Experience Programs
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              지금 바로 예약할 수 있는 프로그램
            </h2>
            <p className="text-slate-500 mt-3 text-sm">선택하신 프로그램을 클릭하면 상세 정보와 예약 페이지로 이동합니다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 도슨트 투어 */}
            <div className="group bg-[#0f0f18] rounded-2xl overflow-hidden border border-white/5 hover:border-[#A855F7]/40 transition-all hover:shadow-lg hover:shadow-[#A855F7]/10">
              <div className="relative h-52 overflow-hidden">
                <Image src="/images/recording-booth.png" alt="도슨트 투어" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f18] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#A855F7] text-white text-[10px] font-black px-3 py-1 rounded-full tracking-wider uppercase">
                    Wing A · 전시
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-black text-lg leading-snug">
                      K-POP 레전드<br />릴테이프 도슨트
                    </h3>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <div className="text-[#D4AF37] font-black text-lg">₩35,000</div>
                    <div className="text-slate-600 text-xs">1인 기준</div>
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  30년 K-POP 역사를 담은 레전드들의 실제 녹음 릴테이프. 한국어·영어·중국어·일본어 해설 제공.
                </p>
                <div className="flex gap-2">
                  <Link href="/docent"
                    className="flex-1 text-center text-[#A855F7] border border-[#A855F7]/40 hover:bg-[#A855F7] hover:text-white py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all">
                    상세보기
                  </Link>
                  <Link href="/menu"
                    className="flex-1 text-center bg-[#A855F7] hover:bg-[#9333ea] text-white py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all">
                    🎟 예약하기
                  </Link>
                </div>
              </div>
            </div>

            {/* 녹음 체험 */}
            <div className="group bg-[#0f0f18] rounded-2xl overflow-hidden border border-white/5 hover:border-[#D4AF37]/40 transition-all hover:shadow-lg hover:shadow-[#D4AF37]/10">
              <div className="relative h-52 overflow-hidden">
                <Image src="/images/control-room.png" alt="녹음 체험" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f18] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#D4AF37] text-black text-[10px] font-black px-3 py-1 rounded-full tracking-wider uppercase">
                    Wing A · 체험
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-[#ef4444] text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                    인기
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-black text-lg leading-snug">
                      K-POP<br />녹음 체험
                    </h3>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <div className="text-[#D4AF37] font-black text-lg">₩40,000~</div>
                    <div className="text-slate-600 text-xs">1인 기준</div>
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  전문 레코딩 부스에서 내가 직접 K-POP 가수처럼 녹음. 음원 파일 제공, LP 제작 옵션 선택 가능.
                </p>
                <div className="flex gap-2">
                  <Link href="/experience"
                    className="flex-1 text-center text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-black py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all">
                    상세보기
                  </Link>
                  <Link href="/menu"
                    className="flex-1 text-center bg-[#D4AF37] hover:bg-[#F0D060] text-black py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all">
                    🎟 예약하기
                  </Link>
                </div>
              </div>
            </div>

            {/* 프로 에디션 */}
            <div className="group bg-[#0f0f18] rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all hover:shadow-lg">
              <div className="relative h-52 overflow-hidden">
                <Image src="/images/bora-box.png" alt="프로 에디션" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f18] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/15 backdrop-blur text-white text-[10px] font-black px-3 py-1 rounded-full tracking-wider uppercase border border-white/20">
                    Wing B · 프로
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-black text-lg leading-snug">
                      정식 음반 제작<br />프로 에디션
                    </h3>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <div className="text-slate-300 font-black text-base">₩15M~</div>
                    <div className="text-slate-600 text-xs">프로젝트 기준</div>
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  KOMCA 작곡가 1:1 매칭, 전문 믹싱·마스터링, 국내외 150개 플랫폼 동시 발매.
                </p>
                <div className="flex gap-2">
                  <Link href="/pro"
                    className="flex-1 text-center text-slate-400 border border-white/10 hover:bg-white/5 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all">
                    상세보기
                  </Link>
                  <Link href="/pro"
                    className="flex-1 text-center bg-white/10 hover:bg-white/15 text-white border border-white/20 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all">
                    문의하기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          이용 후기 / 숫자로 보는 레코딩카페
      ══════════════════════════════════════════ */}
      <section className="bg-[#0a0a12] py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { num: "50,000+", label: "누적 방문객", sub: "국내외 K-POP 팬" },
              { num: "10년+",   label: "운영 경력",   sub: "전문 엔터테인먼트" },
              { num: "50명+",   label: "전속 아티스트", sub: "음반 제작 실적" },
              { num: "4개국어", label: "도슨트 언어",  sub: "한·영·중·일" },
            ].map((stat, i) => (
              <div key={i} className="bg-[#0f0f18] rounded-2xl p-6 border border-white/5">
                <div className="text-[#D4AF37] font-black text-3xl mb-1">{stat.num}</div>
                <div className="text-white font-bold text-sm mb-1">{stat.label}</div>
                <div className="text-slate-600 text-xs">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          공간 갤러리
      ══════════════════════════════════════════ */}
      <section className="bg-[#050508] py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-widest uppercase">
                Our Spaces
              </div>
              <h2 className="text-3xl font-black text-white">공간 안내</h2>
            </div>
            <Link href="/experience" className="text-slate-500 hover:text-[#D4AF37] text-xs tracking-widest uppercase transition-colors hidden sm:block">
              자세히 보기 →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { src: "/images/recording-booth.png", label: "레코딩 부스",  sub: "Studio Booth",    tag: "녹음 체험" },
              { src: "/images/control-room.png",    label: "컨트롤룸",    sub: "Control Room",   tag: "프로 전용" },
              { src: "/images/bora-box.png",        label: "BORA BOX",   sub: "Live Broadcast", tag: "라이브 방송" },
              { src: "/images/mirror-booth.png",    label: "AI 포토 부스", sub: "AI Photo Studio", tag: "포토 체험" },
            ].map((img, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden group aspect-square">
                <Image src={img.src} alt={img.label} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className="bg-[#D4AF37] text-black text-[10px] font-black px-2 py-0.5 rounded-full">{img.tag}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-white font-bold text-sm">{img.label}</div>
                  <div className="text-slate-400 text-xs tracking-widest">{img.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          스튜디오 소개
      ══════════════════════════════════════════ */}
      <section className="bg-[#0a0a12] py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src="/images/lounge-group.png" alt="레코딩카페 소개" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#A855F7]/20 to-transparent" />
            </div>
            <div>
              <div className="inline-block bg-[#A855F7]/20 text-[#A855F7] text-xs font-bold px-3 py-1 rounded-full mb-5 tracking-widest uppercase">
                About
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
                실제 K-POP 스타들이<br />
                녹음한 바로 그 스튜디오
              </h2>
              <div className="space-y-4 text-slate-400 text-sm leading-loose">
                <p>
                  10년간 전속 아티스트 50여 명의 음반 작업을 진행해온 전문 녹음 스튜디오를
                  처음으로 일반에 공개합니다. 단순한 체험 공간이 아니라, 실제로 음반이 만들어지던
                  그 현장입니다.
                </p>
                <p>
                  기획사 오디션에 도전했던 분들, K-POP을 사랑하는 외국인 팬들, 직접 음원을
                  발표하고 싶은 분들 모두를 위한 공간입니다.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/experience"
                  className="inline-flex items-center gap-2 bg-[#A855F7] hover:bg-[#9333ea] text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">
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
      <section className="bg-[#050508] py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-white">오시는 길</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#0f0f18] rounded-2xl p-6 border border-white/5 text-center">
              <div className="text-3xl mb-3">📍</div>
              <div className="text-[#D4AF37] font-bold text-sm mb-1">주소</div>
              <div className="text-white text-sm font-bold">서울 서초구 강남대로107길 21, 2층</div>
              <div className="text-slate-500 text-xs mt-1">2F, 21, Gangnam-daero 107-gil, Seocho-gu</div>
            </div>
            <div className="bg-[#0f0f18] rounded-2xl p-6 border border-white/5 text-center">
              <div className="text-3xl mb-3">🚇</div>
              <div className="text-[#D4AF37] font-bold text-sm mb-1">대중교통</div>
              <div className="text-white text-sm font-bold">신사역 3호선 5번 출구</div>
              <div className="text-slate-500 text-xs mt-1">도보 4분 · 주차 불가 (인근 유료 주차장)</div>
            </div>
            <div className="bg-[#0f0f18] rounded-2xl p-6 border border-white/5 text-center">
              <div className="text-3xl mb-3">🕐</div>
              <div className="text-[#D4AF37] font-bold text-sm mb-1">운영 시간</div>
              <div className="text-white text-sm font-bold">오전 10:00 – 밤 22:00</div>
              <div className="text-slate-500 text-xs mt-1">연중무휴 · 사전 예약 권장</div>
            </div>
          </div>
          <div className="text-center">
            <Link href="/menu"
              className="inline-block bg-[#D4AF37] hover:bg-[#F0D060] text-black font-black px-10 py-4 rounded-xl text-sm tracking-wide transition-colors shadow-lg shadow-[#D4AF37]/20">
              🎟 입장권 구매하기
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          매거진
      ══════════════════════════════════════════ */}
      {latestArticles.length > 0 && (
        <section className="bg-[#0a0a12] py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-widest uppercase">
                  Magazine
                </div>
                <h2 className="text-3xl font-black text-white">레코딩카페 매거진</h2>
              </div>
              <Link href="/magazine" className="text-slate-500 hover:text-[#D4AF37] text-xs tracking-widest uppercase transition-colors hidden sm:block">
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
    </>
  );
}
