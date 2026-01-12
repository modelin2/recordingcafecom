import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Mic2, Sparkles, Globe, Music, Star, Clock, MapPin } from "lucide-react";
import heroImage from "@assets/RECORDINGCAFE_1768187595497.jpeg";
import { useState } from "react";

type Language = 'ko' | 'ja' | 'zh' | 'en';

const translations = {
  ko: {
    langName: "한국어",
    badge: "리버사이드 호텔에서 도보 30초",
    heroTitle1: "K-POP 아이돌과 같은",
    heroTitle2: "레코딩 스튜디오",
    heroTitle3: "에서 주인공이 되세요",
    heroDesc: "노래를 못 해도 괜찮습니다. 최첨단 AI가 프로 가수처럼 만들어 드립니다.",
    reserveBtn: "지금 예약하기",
    videoTitle: "실제",
    videoTitleHighlight: "레코딩 체험",
    videoDesc: "고객님의 레코딩 현장을 확인하세요",
    pillar1Title: "꿈같은 체험",
    pillar1Desc: "리버사이드 호텔 앞 30초, K-POP 아이돌과 똑같은 녹음실에서 주인공이 되어보세요.",
    pillar2Title: "AI가 완벽하게 보정",
    pillar2Desc: "노래를 못 해도 괜찮습니다. 최첨단 AI가 프로 가수처럼 만들어 드립니다.",
    pillar3Title: "평생의 자산",
    pillar3Desc: "그냥 체험으로 끝나지 않습니다. 전 세계에 음원이 발매되고 저작권료가 들어오는 평생의 자산을 만드세요.",
    featuresTitle: "Recording Café의",
    featuresTitleHighlight: "특징",
    feature1Title: "프로 사양 스튜디오",
    feature1Desc: "K-POP 아티스트도 사용하는 본격적인 레코딩 장비",
    feature2Title: "30분부터 체험 가능",
    feature2Desc: "여행 중에도 가볍게 본격 레코딩 체험",
    feature3Title: "AI 음성 보정 기술",
    feature3Desc: "노래에 자신이 없어도 프로급 완성도 보장",
    feature4Title: "전 세계 배포 & 저작권",
    feature4Desc: "Spotify, Apple Music 등 전 세계에 음원 배포",
    ctaTitle: "오늘,",
    ctaTitleHighlight: "스타가 되세요",
    ctaDesc: "리버사이드 호텔에서 도보 30초\n숙박 중에 꼭 들러주세요",
    ctaBtn: "예약하기"
  },
  ja: {
    langName: "日本語",
    badge: "リバーサイドホテルから徒歩30秒",
    heroTitle1: "K-POPアイドルと同じ",
    heroTitle2: "レコーディングスタジオ",
    heroTitle3: "で主人公になる",
    heroDesc: "歌が苦手でも大丈夫。最先端AIがプロ歌手のように仕上げます。",
    reserveBtn: "今すぐ予約する",
    videoTitle: "実際の",
    videoTitleHighlight: "レコーディング体験",
    videoDesc: "お客様のレコーディング風景をご覧ください",
    pillar1Title: "夢のような体験",
    pillar1Desc: "リバーサイドホテルから徒歩30秒。K-POPアイドルと同じレコーディングスタジオで主人公になってみませんか？",
    pillar2Title: "AIが完璧に補正",
    pillar2Desc: "歌が苦手でも大丈夫です。最先端のAI技術がプロの歌手のように仕上げます。",
    pillar3Title: "一生の資産に",
    pillar3Desc: "ただの体験で終わりません。全世界で音源が配信され、著作権収入が入る一生の資産を作りましょう。",
    featuresTitle: "Recording Caféの",
    featuresTitleHighlight: "特徴",
    feature1Title: "プロ仕様のスタジオ",
    feature1Desc: "K-POPアーティストも使用する本格的なレコーディング機材",
    feature2Title: "30分から体験可能",
    feature2Desc: "旅行の合間にも気軽に本格レコーディング体験",
    feature3Title: "AI音声補正技術",
    feature3Desc: "歌に自信がなくてもプロ級の仕上がりを保証",
    feature4Title: "世界配信&著作権",
    feature4Desc: "Spotify、Apple Musicなど全世界で音源配信",
    ctaTitle: "今日、",
    ctaTitleHighlight: "スターになる",
    ctaDesc: "リバーサイドホテルから徒歩30秒\nご滞在中にぜひお立ち寄りください",
    ctaBtn: "予約する"
  },
  zh: {
    langName: "中文",
    badge: "距离河畔酒店步行30秒",
    heroTitle1: "在与K-POP偶像相同的",
    heroTitle2: "录音室",
    heroTitle3: "里成为主角",
    heroDesc: "即使不擅长唱歌也没关系。尖端AI会让您像专业歌手一样完美。",
    reserveBtn: "立即预约",
    videoTitle: "真实的",
    videoTitleHighlight: "录音体验",
    videoDesc: "观看客人的录音现场",
    pillar1Title: "梦幻般的体验",
    pillar1Desc: "距离河畔酒店步行30秒，在与K-POP偶像相同的录音室里成为主角。",
    pillar2Title: "AI完美修正",
    pillar2Desc: "即使不擅长唱歌也没关系。尖端AI技术会让您像专业歌手一样。",
    pillar3Title: "一生的资产",
    pillar3Desc: "不仅仅是体验。在全世界发行音源，创造可以获得版权收入的终身资产。",
    featuresTitle: "Recording Café的",
    featuresTitleHighlight: "特点",
    feature1Title: "专业级录音室",
    feature1Desc: "K-POP艺人也使用的专业录音设备",
    feature2Title: "30分钟起可体验",
    feature2Desc: "旅途中也能轻松体验专业录音",
    feature3Title: "AI语音修正技术",
    feature3Desc: "即使对唱歌没有自信也能保证专业级完成度",
    feature4Title: "全球发行&版权",
    feature4Desc: "在Spotify、Apple Music等全球平台发行",
    ctaTitle: "今天，",
    ctaTitleHighlight: "成为明星",
    ctaDesc: "距离河畔酒店步行30秒\n住宿期间请务必光临",
    ctaBtn: "预约"
  },
  en: {
    langName: "English",
    badge: "30 seconds walk from Riverside Hotel",
    heroTitle1: "Become the star in the same",
    heroTitle2: "Recording Studio",
    heroTitle3: "as K-POP idols",
    heroDesc: "Can't sing? No problem. Cutting-edge AI will make you sound like a pro.",
    reserveBtn: "Reserve Now",
    videoTitle: "Real",
    videoTitleHighlight: "Recording Experience",
    videoDesc: "Watch our guests' recording sessions",
    pillar1Title: "Dream Experience",
    pillar1Desc: "30 seconds from Riverside Hotel. Become the star in the same recording studio as K-POP idols.",
    pillar2Title: "AI Perfect Correction",
    pillar2Desc: "Even if you can't sing, our cutting-edge AI technology will make you sound like a professional.",
    pillar3Title: "Lifetime Asset",
    pillar3Desc: "It doesn't end as just an experience. Create a lifetime asset with worldwide music distribution and royalty income.",
    featuresTitle: "Recording Café",
    featuresTitleHighlight: "Features",
    feature1Title: "Professional Studio",
    feature1Desc: "Professional recording equipment used by K-POP artists",
    feature2Title: "From 30 Minutes",
    feature2Desc: "Easy professional recording experience even during your trip",
    feature3Title: "AI Voice Correction",
    feature3Desc: "Professional-grade results guaranteed even without singing confidence",
    feature4Title: "Global Distribution & Copyright",
    feature4Desc: "Music distribution on Spotify, Apple Music and more worldwide",
    ctaTitle: "Today,",
    ctaTitleHighlight: "Become a Star",
    ctaDesc: "30 seconds from Riverside Hotel\nPlease visit us during your stay",
    ctaBtn: "Reserve"
  }
};

const languageOptions: { code: Language; flag: string }[] = [
  { code: 'ko', flag: '🇰🇷' },
  { code: 'ja', flag: '🇯🇵' },
  { code: 'zh', flag: '🇨🇳' },
  { code: 'en', flag: '🇺🇸' }
];

export default function Hotel() {
  const [lang, setLang] = useState<Language>('ja');
  const t = translations[lang];

  return (
    <>
      <Helmet>
        <title>リバーサイドホテルから徒歩30秒 | K-POPレコーディング体験 | Recording Café</title>
        <meta name="description" content="K-POPアイドルと同じレコーディングスタジオで主人公になってみませんか？歌が苦手でもAIがプロ歌手のように補正します。" />
      </Helmet>
      
      <div className="min-h-screen bg-black text-white">
        {/* Language Selector - Fixed at Top */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center gap-2">
            {languageOptions.map((option) => (
              <button
                key={option.code}
                onClick={() => setLang(option.code)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  lang === option.code 
                    ? 'bg-[#D4AF37] text-black' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
                data-testid={`button-lang-${option.code}`}
              >
                <span>{option.flag}</span>
                <span>{translations[option.code].langName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Hero Section with Image */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
            <img 
              src={heroImage}
              alt="Recording Studio"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6" style={{ color: '#D4AF37' }}>
              <MapPin className="h-4 w-4" />
              {t.badge}
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t.heroTitle1}
              <br />
              <span style={{ color: '#D4AF37' }}>{t.heroTitle2}</span>
              <br />
              {t.heroTitle3}
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8">
              {t.heroDesc}
            </p>

            <Button 
              size="lg"
              className="text-lg px-8 py-6"
              style={{ backgroundColor: '#D4AF37', color: '#000' }}
              data-testid="button-hotel-reserve"
              asChild
            >
              <a href="https://record.co.kr/" target="_blank" rel="noopener noreferrer">
                {t.reserveBtn}
              </a>
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
            </div>
          </div>
        </section>

        {/* Video Section - Auto Play */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-black to-zinc-900">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {t.videoTitle}<span style={{ color: '#D4AF37' }}>{t.videoTitleHighlight}</span>
              </h2>
              <p className="text-white/60">
                {t.videoDesc}
              </p>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/sGMcHrmCmDU?autoplay=1&mute=1&loop=1&playlist=sGMcHrmCmDU&playsinline=1"
                title="Recording Café"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Three Pillars Section */}
        <section className="py-16 md:py-24 bg-zinc-900">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Fantasy */}
              <div className="text-center p-8 bg-black/50 rounded-2xl border border-white/10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}>
                  <Star className="h-8 w-8" style={{ color: '#D4AF37' }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>{t.pillar1Title}</h3>
                <p className="text-white/70">{t.pillar1Desc}</p>
              </div>

              {/* AI Technology */}
              <div className="text-center p-8 bg-black/50 rounded-2xl border border-white/10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}>
                  <Sparkles className="h-8 w-8" style={{ color: '#D4AF37' }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>{t.pillar2Title}</h3>
                <p className="text-white/70">{t.pillar2Desc}</p>
              </div>

              {/* Reward */}
              <div className="text-center p-8 bg-black/50 rounded-2xl border border-white/10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}>
                  <Globe className="h-8 w-8" style={{ color: '#D4AF37' }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>{t.pillar3Title}</h3>
                <p className="text-white/70">{t.pillar3Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Second Video Section */}
        <section className="py-16 md:py-24 bg-black">
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/YzdkeQidBbo"
                title="Recording Experience"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-zinc-900">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {t.featuresTitle}<span style={{ color: '#D4AF37' }}>{t.featuresTitleHighlight}</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-6 bg-black/50 rounded-xl border border-white/10">
                <Mic2 className="h-6 w-6 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <div>
                  <h4 className="font-bold mb-2">{t.feature1Title}</h4>
                  <p className="text-sm text-white/60">{t.feature1Desc}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-black/50 rounded-xl border border-white/10">
                <Clock className="h-6 w-6 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <div>
                  <h4 className="font-bold mb-2">{t.feature2Title}</h4>
                  <p className="text-sm text-white/60">{t.feature2Desc}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-black/50 rounded-xl border border-white/10">
                <Sparkles className="h-6 w-6 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <div>
                  <h4 className="font-bold mb-2">{t.feature3Title}</h4>
                  <p className="text-sm text-white/60">{t.feature3Desc}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-black/50 rounded-xl border border-white/10">
                <Music className="h-6 w-6 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <div>
                  <h4 className="font-bold mb-2">{t.feature4Title}</h4>
                  <p className="text-sm text-white/60">{t.feature4Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-black">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <div className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 rounded-3xl p-12 border border-amber-500/20">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                {t.ctaTitle}<span style={{ color: '#D4AF37' }}>{t.ctaTitleHighlight}</span>
              </h2>
              <p className="text-white/60 mb-8 whitespace-pre-line">
                {t.ctaDesc}
              </p>
              <Button 
                size="lg"
                className="text-lg px-8 py-6"
                style={{ backgroundColor: '#D4AF37', color: '#000' }}
                data-testid="button-hotel-cta"
                asChild
              >
                <a href="https://record.co.kr/" target="_blank" rel="noopener noreferrer">
                  {t.ctaBtn}
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-black border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Recording Café. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
