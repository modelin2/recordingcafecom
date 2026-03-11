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
      {/* ════════════════════════════════════════════════════════════
          ENTRANCE — 테마파크/미술관 입구
      ════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-recording.jpeg"
            alt="K Recording Café"
            fill
            priority
            className="object-cover object-center scale-105"
          />
          {/* 미술관/극장 느낌의 무거운 오버레이 */}
          <div className="absolute inset-0 bg-[#050508]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/60" />
        </div>

        {/* 극적인 빛 효과 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        {/* 본문 */}
        <div className="relative text-center px-4 max-w-5xl mx-auto">
          {/* 상단 라벨 */}
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-[#D4AF37]/60" />
            <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase">Seoul, Korea · Since 2015</span>
            <div className="h-px w-12 bg-[#D4AF37]/60" />
          </div>

          {/* 관명 / 로고 느낌의 타이틀 */}
          <h1 className="font-black leading-none mb-2">
            <span className="block text-[13vw] sm:text-[10rem] text-white tracking-tight" style={{ fontFamily: "var(--font-noto-sans-kr)" }}>
              K·REC
            </span>
            <span className="block text-[5vw] sm:text-5xl text-[#D4AF37] tracking-[0.2em] uppercase font-bold mt-1">
              Recording Café
            </span>
          </h1>

          {/* 부제 */}
          <p className="text-slate-400 text-base sm:text-lg mt-6 mb-10 tracking-wide max-w-xl mx-auto leading-relaxed">
            K-POP 30년의 역사가 살아 숨쉬는 공간<br />
            레전드들이 녹음했던 그 스튜디오로 당신을 초대합니다
          </p>

          {/* 입장 버튼 — 미술관 티켓 느낌 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/experience"
              className="group relative overflow-hidden border border-[#7C3AED]/60 bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 text-white font-bold px-8 py-4 rounded-none tracking-widest text-sm uppercase transition-all w-64">
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span className="text-[#A855F7]">▶</span> 체험 에디션 입장
              </span>
            </Link>
            <Link href="/pro"
              className="group relative overflow-hidden border border-[#D4AF37]/60 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-white font-bold px-8 py-4 rounded-none tracking-widest text-sm uppercase transition-all w-64">
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span className="text-[#D4AF37]">▶</span> 프로 에디션 입장
              </span>
            </Link>
          </div>
        </div>

        {/* 스크롤 안내 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#D4AF37]/60 animate-pulse" />
          <span className="text-[#D4AF37]/60 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          EXHIBITION WINGS — 두 전시관 입구 (키자니아 존)
      ════════════════════════════════════════════════════════════ */}
      <section className="bg-[#050508] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">

            {/* 체험관 Wing */}
            <div className="relative overflow-hidden group min-h-[560px] flex flex-col justify-end cursor-pointer">
              <Image
                src="/images/recording-booth.png"
                alt="체험 에디션"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0533]/95 via-[#1a0533]/50 to-transparent" />
              {/* 상단 라벨 */}
              <div className="absolute top-6 left-6">
                <div className="inline-block border border-[#A855F7]/60 text-[#A855F7] text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1.5">
                  Wing A
                </div>
              </div>
              {/* 하단 정보 */}
              <div className="relative p-8">
                <p className="text-[#A855F7] text-xs tracking-[0.2em] uppercase mb-3">Experience Edition</p>
                <h2 className="text-4xl font-black text-white mb-4 leading-tight">
                  체험<br />에디션
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-xs">
                  K-POP 레전드의 릴테이프 도슨트 투어부터<br />
                  전문 레코딩 부스 직접 체험까지
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 text-xs">입장권</span>
                    <div className="text-white font-black text-xl">₩35,000 ~</div>
                  </div>
                  <Link href="/experience"
                    className="border border-[#A855F7] text-[#A855F7] hover:bg-[#A855F7] hover:text-white px-6 py-2.5 text-sm font-bold tracking-widest uppercase transition-all">
                    입장 →
                  </Link>
                </div>
              </div>
            </div>

            {/* 프로관 Wing */}
            <div className="relative overflow-hidden group min-h-[560px] flex flex-col justify-end cursor-pointer">
              <Image
                src="/images/control-room.png"
                alt="프로 에디션"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1200]/95 via-[#1a1200]/50 to-transparent" />
              {/* 상단 라벨 */}
              <div className="absolute top-6 left-6">
                <div className="inline-block border border-[#D4AF37]/60 text-[#D4AF37] text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1.5">
                  Wing B
                </div>
              </div>
              {/* 하단 정보 */}
              <div className="relative p-8">
                <p className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-3">Professional Edition</p>
                <h2 className="text-4xl font-black text-white mb-4 leading-tight">
                  프로<br />에디션
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-xs">
                  KOMCA 작곡가 1:1 매칭부터<br />
                  전 세계 음원 발매까지. ₩15,000,000~
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 text-xs">시작 가격</span>
                    <div className="text-white font-black text-xl">₩15,000,000 ~</div>
                  </div>
                  <Link href="/pro"
                    className="border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-6 py-2.5 text-sm font-bold tracking-widest uppercase transition-all">
                    입장 →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          VISITOR INFORMATION — 관람 안내
      ════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0f] py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
            {[
              { label: "관람 시간", value: "10:00 – 22:00", sub: "연중무휴" },
              { label: "위치", value: "신사역 3호선", sub: "도보 4분" },
              { label: "운영", value: "10년+", sub: "전문 엔터테인먼트" },
              { label: "방문객", value: "50,000+", sub: "글로벌 K-POP 팬" },
            ].map((info, i) => (
              <div key={i} className="px-6 lg:px-10 py-6 first:pl-0 last:pr-0">
                <div className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">{info.label}</div>
                <div className="text-white font-black text-xl mb-1">{info.value}</div>
                <div className="text-slate-500 text-xs">{info.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CURRENT EXHIBITIONS — 현재 전시/프로그램
      ════════════════════════════════════════════════════════════ */}
      <section className="bg-[#050508] py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-3">Current Programs</div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">현재 운영 중인 프로그램</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {/* 도슨트 */}
            <div className="bg-[#050508] p-8 hover:bg-[#0a0a0f] transition-colors group">
              <div className="text-[#A855F7] text-[10px] tracking-[0.2em] uppercase mb-4 font-bold">Exhibition · Wing A</div>
              <div className="w-12 h-px bg-[#A855F7]/40 mb-6" />
              <h3 className="text-white font-black text-xl mb-3 leading-snug">
                K-POP 레전드<br />릴테이프 도슨트 투어
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                30년 K-POP을 만든 레전드들의 실제 녹음 릴테이프. 영어·중국어·일본어 전문 해설사 동반.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-[#D4AF37] font-bold">₩35,000</div>
                <Link href="/docent" className="text-[#A855F7] text-xs tracking-widest uppercase hover:underline group-hover:translate-x-1 transition-transform inline-block">
                  상세보기 →
                </Link>
              </div>
            </div>

            {/* 녹음 체험 */}
            <div className="bg-[#050508] p-8 hover:bg-[#0a0a0f] transition-colors group">
              <div className="text-[#A855F7] text-[10px] tracking-[0.2em] uppercase mb-4 font-bold">Experience · Wing A</div>
              <div className="w-12 h-px bg-[#A855F7]/40 mb-6" />
              <h3 className="text-white font-black text-xl mb-3 leading-snug">
                K-POP<br />녹음 체험
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                전문 레코딩 부스에서 내가 직접 K-POP 가수처럼. 음원 발매, LP 제작 옵션 포함 가능.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-[#D4AF37] font-bold">₩40,000~</div>
                <Link href="/experience" className="text-[#A855F7] text-xs tracking-widest uppercase hover:underline group-hover:translate-x-1 transition-transform inline-block">
                  상세보기 →
                </Link>
              </div>
            </div>

            {/* 프로 */}
            <div className="bg-[#050508] p-8 hover:bg-[#0a0a0f] transition-colors group">
              <div className="text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase mb-4 font-bold">Professional · Wing B</div>
              <div className="w-12 h-px bg-[#D4AF37]/40 mb-6" />
              <h3 className="text-white font-black text-xl mb-3 leading-snug">
                KOMCA 작곡가 매칭<br />정식 음반 발매
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                K-POP 메이저 음반사와 동일한 프로세스. 전 세계 150개 플랫폼 동시 발매.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-[#D4AF37] font-bold">₩15,000,000~</div>
                <Link href="/pro" className="text-[#D4AF37] text-xs tracking-widest uppercase hover:underline group-hover:translate-x-1 transition-transform inline-block">
                  상세보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          GALLERY — 공간 갤러리 (미술관 전시실 느낌)
      ════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0f] py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <div className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-3">Spaces</div>
            <h2 className="text-3xl font-black text-white">공간 안내</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {[
              { src: "/images/recording-booth.png", label: "레코딩 부스", sub: "Studio Booth" },
              { src: "/images/control-room.png",    label: "컨트롤룸",    sub: "Control Room" },
              { src: "/images/bora-box.png",        label: "BORA BOX",   sub: "Live Broadcast" },
              { src: "/images/mirror-booth.png",    label: "미러 부스",   sub: "Photo Studio" },
            ].map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden group">
                <Image src={img.src} alt={img.label} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-[#050508]/60 group-hover:bg-[#050508]/30 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-white font-bold text-sm">{img.label}</div>
                  <div className="text-slate-400 text-xs tracking-widest uppercase">{img.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          ABOUT — 공간 소개 (미술관 큐레이터 노트 느낌)
      ════════════════════════════════════════════════════════════ */}
      <section className="bg-[#050508] py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-6">Curator's Note</div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-8 leading-tight">
                연예기획사의<br />심장부를<br />처음으로 공개합니다
              </h2>
              <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
                <p>
                  10년간 50여명 전속 아티스트의 음반 제작을 위해 운영해온 전문 스튜디오를 처음으로 일반에 공개합니다.
                  이 공간은 단순한 체험이 아닌, 실제 K-POP 제작 인프라 그 자체입니다.
                </p>
                <p>
                  기획사에 들어가지 못해 꿈을 접어야 했던 수많은 이들에게, 그리고 K-POP의 세계가 궁금한 전 세계 팬들에게
                  이 문을 엽니다.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm">
                <div className="h-px flex-1 bg-white/10 max-w-[60px]" />
                <span className="text-slate-500 italic">K Recording Café, Seoul</span>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-none overflow-hidden">
              <Image src="/images/lounge-group.png" alt="공간 소개" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          LOCATION — 오시는 길
      ════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0f] py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5">
            <div className="bg-[#0a0a0f] p-8">
              <div className="text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase mb-3 font-bold">📍 주소</div>
              <div className="text-white font-bold mb-1">서울 서초구 강남대로107길 21, 2층</div>
              <div className="text-slate-500 text-xs">2F, 21, Gangnam-daero 107-gil, Seocho-gu, Seoul</div>
            </div>
            <div className="bg-[#0a0a0f] p-8">
              <div className="text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase mb-3 font-bold">🚇 교통</div>
              <div className="text-white font-bold mb-1">신사역 3호선 5번 출구</div>
              <div className="text-slate-500 text-xs">도보 4분 · 주차 불가 (인근 유료 주차장 이용)</div>
            </div>
            <div className="bg-[#0a0a0f] p-8">
              <div className="text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase mb-3 font-bold">🕐 관람 시간</div>
              <div className="text-white font-bold mb-1">오전 10:00 – 밤 22:00</div>
              <div className="text-slate-500 text-xs">연중무휴 · 사전 예약 필수</div>
            </div>
          </div>
          <div className="mt-4 text-center py-6">
            <Link href="/menu"
              className="inline-block border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-10 py-3.5 font-black tracking-widest uppercase text-sm transition-all">
              입장권 구매 →
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          MAGAZINE — 매거진
      ════════════════════════════════════════════════════════════ */}
      {latestArticles.length > 0 && (
        <section className="bg-[#050508] py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-3">Magazine</div>
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
