import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "레코딩카페란 | 레코딩카페",
  description: "10년간 전속 아티스트 50명 이상의 음반을 제작해온 전문 스튜디오를 처음으로 일반에 공개합니다.",
};

export default function AboutPage() {
  return (
    <>
      {/* 히어로 */}
      <section className="relative pt-32 pb-20 bg-[#050508] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#A855F7]/5 via-transparent to-[#D4AF37]/5" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase mb-6">
            About
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
            실제 K-POP 녹음 현장을<br />처음으로 공개합니다
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            10년간 전속 아티스트 50여 명의 음반 작업을 진행해온 전문 스튜디오.
            단순한 체험이 아닌, 진짜 현장입니다.
          </p>
        </div>
      </section>

      {/* 스토리 */}
      <section id="story" className="bg-[#0a0a12] py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-block bg-[#A855F7]/10 text-[#A855F7] text-xs font-bold px-3 py-1 rounded-full mb-5 tracking-widest uppercase">
                Our Story
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
                가수가 되고 싶었던<br />모든 분들을 위해
              </h2>
              <div className="space-y-4 text-slate-400 text-sm leading-loose">
                <p>
                  2015년, 국내 중견 엔터테인먼트 회사가 운영하던 전문 녹음 스튜디오에서 시작됐습니다.
                  수십 명의 전속 아티스트들이 이 공간에서 데뷔 앨범을 녹음하고, 히트곡을 만들어냈습니다.
                </p>
                <p>
                  오디션에 도전했지만 기회를 얻지 못했던 분들, K-POP을 사랑해 한국까지 찾아온 외국인 팬들,
                  그리고 음악으로 특별한 추억을 만들고 싶은 모든 분들께 이 문을 처음으로 열었습니다.
                </p>
                <p>
                  레코딩카페는 지금도 현역 전문 스튜디오로 운영되고 있습니다.
                  체험 프로그램이 끝난 자리에서 실제 음반이 만들어지는, 살아있는 현장입니다.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src="/images/lounge-group.png" alt="레코딩카페 스토리" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#A855F7]/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 수치 */}
      <section className="bg-[#050508] py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { num: "2015",    label: "설립 연도",   sub: "10년 이상 운영" },
              { num: "50명+",   label: "전속 아티스트", sub: "음반 제작 실적" },
              { num: "50,000+", label: "누적 방문객",  sub: "국내외 K-POP 팬" },
              { num: "4개국어", label: "도슨트 해설",  sub: "한·영·중·일" },
            ].map((s, i) => (
              <div key={i} className="bg-[#0f0f18] rounded-2xl p-6 text-center border border-white/5">
                <div className="text-[#D4AF37] font-black text-3xl mb-1">{s.num}</div>
                <div className="text-white font-bold text-sm">{s.label}</div>
                <div className="text-slate-600 text-xs mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 공간 안내 */}
      <section id="spaces" className="bg-[#0a0a12] py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
              Spaces
            </div>
            <h2 className="text-3xl font-black text-white">공간 안내</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                src: "/images/recording-booth.png",
                name: "레코딩 부스",
                eng: "Recording Booth",
                desc: "방음 처리된 전문 녹음 부스. 콘덴서 마이크, 이어폰 모니터링 시스템 완비. 체험 프로그램 주요 공간.",
                tag: "체험 에디션",
                color: "#A855F7",
              },
              {
                src: "/images/control-room.png",
                name: "컨트롤 룸",
                eng: "Control Room",
                desc: "프로 사운드 엔지니어가 실시간 믹싱·마스터링을 진행하는 공간. 프로 에디션 전용.",
                tag: "프로 에디션",
                color: "#D4AF37",
              },
              {
                src: "/images/bora-box.png",
                name: "BORA BOX",
                eng: "Live Broadcast Studio",
                desc: "1인 미디어·라이브 방송 체험 공간. 조명·카메라 장비 완비. 유튜브·틱톡 라이브 가능.",
                tag: "체험 에디션",
                color: "#A855F7",
              },
              {
                src: "/images/mirror-booth.png",
                name: "AI 포토 부스",
                eng: "AI Photo Studio",
                desc: "AI 기술로 앨범 재킷 스타일의 프로필 사진 촬영. K-POP 아이돌 컨셉 연출.",
                tag: "체험 에디션",
                color: "#A855F7",
              },
            ].map((space, i) => (
              <div key={i} className="group bg-[#0f0f18] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all flex gap-0">
                <div className="relative w-44 flex-shrink-0">
                  <Image src={space.src} alt={space.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mb-3 inline-block"
                      style={{ background: `${space.color}20`, color: space.color }}>
                      {space.tag}
                    </span>
                    <h3 className="text-white font-black text-lg">{space.name}</h3>
                    <p className="text-slate-500 text-xs tracking-widest mb-3">{space.eng}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{space.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 찾아오는 길 */}
      <section id="location" className="bg-[#050508] py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
              Location
            </div>
            <h2 className="text-3xl font-black text-white">찾아오는 길</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {[
              { icon: "📍", title: "주소", main: "서울 서초구 강남대로107길 21, 2층", sub: "2F, 21, Gangnam-daero 107-gil, Seocho-gu, Seoul" },
              { icon: "🚇", title: "지하철", main: "3호선 신사역 5번 출구", sub: "도보 4분 · 주차 불가 (인근 유료 주차장)" },
              { icon: "🕐", title: "운영 시간", main: "매일 12:00 – 21:00", sub: "연중무휴 · 사전 예약 권장" },
            ].map((loc, i) => (
              <div key={i} className="bg-[#0f0f18] rounded-2xl p-6 text-center border border-white/5">
                <div className="text-3xl mb-3">{loc.icon}</div>
                <div className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-2">{loc.title}</div>
                <div className="text-white font-bold text-sm mb-1">{loc.main}</div>
                <div className="text-slate-500 text-xs">{loc.sub}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/menu"
              className="inline-block bg-[#D4AF37] hover:bg-[#F0D060] text-black font-black px-10 py-4 rounded-xl text-sm transition-colors">
              🎟 입장권 구매하기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
