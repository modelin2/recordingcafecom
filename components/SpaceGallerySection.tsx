import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const galleryImages = [
  {
    src: "/images/studio-dark.png",
    alt: "전문 녹음 스튜디오 내부 - 믹싱 보드와 마이크",
    label: "레코딩 스튜디오",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/images/control-room.png",
    alt: "컨트롤룸 - 전문 믹싱 장비",
    label: "컨트롤룸",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/booth-solo.png",
    alt: "녹음 부스 - 방음 처리된 전문 부스",
    label: "녹음 부스",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/lounge-group.png",
    alt: "레코딩카페 라운지 - 그룹 이용",
    label: "카페 라운지",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/lounge-cafe.png",
    alt: "레코딩카페 라운지 - 다국적 방문객",
    label: "라운지 공간",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/entrance.png",
    alt: "레코딩카페 건물 입구",
    label: "건물 입구",
    span: "col-span-2 row-span-1",
  },
];

export default function SpaceGallerySection() {
  return (
    <section id="gallery" className="py-24 bg-[#050508] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="text-center mb-14">
            <div className="text-[#D4AF37] text-sm font-mono uppercase tracking-widest mb-4">— Space</div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              공간을 <span className="gold-text">직접</span> 보세요
            </h2>
            <p className="text-slate-400 text-lg max-w-md mx-auto">
              10년+ 엔터테인먼트 경력이 담긴 공간. 프로 아티스트와 동일한 환경.
            </p>
          </div>
        </ScrollReveal>

        {/* 그리드 갤러리 */}
        <ScrollReveal animation="zoom-in" duration={800}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
            {galleryImages.map((img, i) => (
              <div
                key={img.src}
                className={`relative rounded-2xl overflow-hidden group ${img.span}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* 호버 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-semibold bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    {img.label}
                  </span>
                </div>
                {/* 골드 테두리 효과 */}
                <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/30 rounded-2xl transition-all duration-300" />
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* 하단 문구 */}
        <ScrollReveal animation="fade-up" delay={200} duration={700}>
          <div className="text-center mt-10">
            <p className="text-slate-500 text-sm">
              직접 방문하거나 네이버 예약으로 간편하게
            </p>
            <a
              href="https://talk.naver.com/ct/wu2kkmv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-[#D4AF37] hover:text-[#F0D060] font-bold text-sm underline underline-offset-4 transition-colors"
            >
              예약 문의 →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
