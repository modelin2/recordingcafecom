import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { ArrowUpRight, Mic2, Camera, Radio } from "lucide-react";

const services = [
  {
    id: "recording",
    icon: Mic2,
    tag: "01 · Recording Studio",
    title: "녹음 스튜디오",
    subtitle: "프로 수준의 녹음 경험",
    desc: "방음 처리된 전문 녹음 부스에서 컨덴서 마이크로 커버곡을 녹음하세요. 믹싱·마스터링 후 음원 파일로 제공하며, 희망 시 음원 저작권 등록도 지원합니다.",
    features: ["컨덴서 마이크 & 헤드폰 제공", "믹싱·마스터링 포함", "MP3/WAV 파일 제공", "음원 저작권 등록 가능"],
    image: "/images/recording-booth.png",
    imageAlt: "전문 녹음 부스에서 녹음 중인 모습",
    accentColor: "#D4AF37",
  },
  {
    id: "photo",
    icon: Camera,
    tag: "02 · AI Photo Studio",
    title: "AI 포토 스튜디오",
    subtitle: "특허 거울 촬영 시스템",
    desc: "특허 받은 Mirrorkle 시스템으로 360도 자동 촬영. AI가 최적의 각도와 조명을 잡아 아이돌 화보 같은 사진을 연출합니다. 커플 프로필 사진으로 완벽합니다.",
    features: ["특허 Mirrorkle 시스템", "AI 자동 보정", "즉시 인쇄 가능", "SNS 최적화 파일 제공"],
    image: "/images/mirror-booth.png",
    imageAlt: "AI 거울 촬영 시스템 Mirrorkle Booth",
    accentColor: "#C084FC",
  },
  {
    id: "borabox",
    icon: Radio,
    tag: "03 · BORA BOX",
    title: "보라박스 라이브",
    subtitle: "4개 플랫폼 동시 방송",
    desc: "BORA BOX에서 유튜브·인스타·틱톡·Douyin에 동시 라이브 방송. 전문 조명과 카메라가 설치된 부스에서 버튼 하나로 크리에이터가 됩니다.",
    features: ["4채널 동시 송출", "전문 조명·카메라 내장", "간편한 원클릭 방송", "다국어 지원 (KR/EN/CN)"],
    image: "/images/bora-box.png",
    imageAlt: "보라박스 라이브 스트리밍 부스",
    accentColor: "#34D399",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="text-center mb-16">
            <div className="text-[#D4AF37] text-sm font-mono uppercase tracking-widest mb-4">— Services</div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              3가지 특별한 <span className="gold-text">체험</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              녹음, 촬영, 방송. 엔터테인먼트 산업의 모든 것을 한 공간에서.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-12">
          {services.map((svc, i) => (
            <ScrollReveal key={svc.id} animation="fade-up" delay={i * 80} duration={700}>
              <div
                className={`grid lg:grid-cols-2 gap-8 items-center ${
                  i % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* 이미지 */}
                <div className={`relative ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-[4/3]">
                    <Image
                      src={svc.image}
                      alt={svc.imageAlt}
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  {/* 아이콘 뱃지 */}
                  <div
                    className="absolute -bottom-4 -right-4 w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl"
                    style={{ backgroundColor: svc.accentColor + "22", border: `1px solid ${svc.accentColor}44` }}
                  >
                    <svc.icon className="w-7 h-7" style={{ color: svc.accentColor }} />
                  </div>
                </div>

                {/* 텍스트 */}
                <div className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <div
                    className="text-xs font-mono uppercase tracking-widest mb-3"
                    style={{ color: svc.accentColor }}
                  >
                    {svc.tag}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white mb-2">{svc.title}</h3>
                  <p className="text-slate-400 font-medium mb-4">{svc.subtitle}</p>
                  <p className="text-slate-300 leading-relaxed mb-6">{svc.desc}</p>

                  {/* 기능 목록 */}
                  <ul className="flex flex-col gap-2 mb-8">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: svc.accentColor }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://talk.naver.com/ct/wu2kkmv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-bold text-sm transition-all hover:gap-3"
                    style={{ color: svc.accentColor }}
                  >
                    예약 문의하기
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
