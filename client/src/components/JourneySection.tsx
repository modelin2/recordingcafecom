import { Card } from "@/components/ui/card";
import { Mic2, Headphones, Globe } from "lucide-react";

const steps = [
  {
    step: "STEP 01",
    icon: Mic2,
    title: "노래방 연습",
    description: "노래방에서 연습한 그 노래. 이제 필요한 건 실전입니다."
  },
  {
    step: "STEP 02",
    icon: Headphones,
    title: "전문적인 녹음",
    description: "레코딩 카페의 전문가급 장비와 엔지니어의 보정으로 고품질 마스터 음원이 완성됩니다."
  },
  {
    step: "STEP 03",
    icon: Globe,
    title: "전 세계 데뷔",
    description: "글로벌 플랫폼에 정식 발매되어 아티스트로 데뷔합니다."
  }
];

const platforms = [
  "Spotify", "Apple Music", "YouTube Music", "TikTok", 
  "Amazon Music", "Deezer", "SoundCloud"
];

export default function JourneySection() {
  return (
    <section className="py-20 md:py-32 bg-black text-white" data-testid="section-journey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium mb-4 tracking-widest" style={{ color: '#D4AF37' }}>
            HERE & NOW
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            노래방에서 연습한 그 노래,
            <br />
            <span style={{ color: '#D4AF37' }}>음반으로 발매하세요</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            취미로 부르던 노래가 전 세계인의 플레이리스트가 되는 과정, 생각보다 간단합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={index} 
                className="bg-white/5 border-white/10 p-8 text-center relative overflow-hidden"
                data-testid={`card-step-${index}`}
              >
                <div className="absolute top-4 left-4 text-xs font-medium tracking-widest" style={{ color: '#D4AF37' }}>
                  {item.step}
                </div>
                
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                  <Icon className="h-8 w-8" style={{ color: '#D4AF37' }} />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-white/20" />
                )}
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-sm text-white/50 mb-4">전 세계 주요 플랫폼 동시 발매</p>
          <div className="flex flex-wrap justify-center gap-4">
            {platforms.map((platform, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-white/5 rounded-full text-sm text-white/70 border border-white/10"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
