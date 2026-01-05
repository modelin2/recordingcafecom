import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Shield, 
  Eye, 
  Music, 
  Zap,
  CheckCircle,
  BarChart3,
  Play,
  Coffee,
  Award,
  Heart,
  MessageCircle,
  Share2
} from "lucide-react";
import { SiYoutube, SiInstagram, SiTiktok } from "react-icons/si";
import freeDrinkEvent from "@assets/recording_cafe_free_drink_event_20250928014515-1_1760262387083_1767617720476.png";
import tiktokStats1 from "@assets/Screenshot_20251012_165220_TikTok_1760260541954-D8rh0SBS_1767617720476.png";
import tiktokStats2 from "@assets/Screenshot_20251012_165248_TikTok_1760260536578-CttFpt_d_1767617720477.png";

const platforms = [
  { icon: SiYoutube, name: "YouTube Shorts", color: "#FF0000" },
  { icon: SiInstagram, name: "Instagram Reels", color: "#E4405F" },
  { icon: SiTiktok, name: "TikTok", color: "#000000" },
];

const caseStudies = [
  {
    image: tiktokStats1,
    title: "Songwriter's Template",
    views: "8,305,985",
    likes: "42K",
    comments: "88",
    shares: "395",
    duration: "87.72초"
  },
  {
    image: tiktokStats2,
    title: "Why I Don't Trust You",
    views: "1,137,936",
    likes: "10K",
    comments: "11",
    shares: "35",
    duration: "41.77초"
  }
];

const features = [
  {
    icon: Shield,
    title: "BM 특허 기술",
    description: "독자적인 비즈니스 모델 특허를 보유한 검증된 마케팅 솔루션"
  },
  {
    icon: Eye,
    title: "실시간 확인 가능",
    description: "어뷰징 없는 실제 사용자의 조회수를 실시간으로 확인"
  },
  {
    icon: TrendingUp,
    title: "수백만 조회수 달성",
    description: "쇼츠, 릴스, 틱톡을 통한 폭발적인 노출 효과"
  },
  {
    icon: Music,
    title: "저작권 수익 직결",
    description: "조회수가 곧 저작권료로 연결되는 수익 구조"
  }
];

const benefits = [
  "실제 사용자 기반의 진정성 있는 바이럴",
  "플랫폼별 맞춤 최적화 전략",
  "투명한 성과 리포팅",
  "저작권료 수익 극대화",
  "글로벌 팬덤 확보 지원",
  "아티스트 브랜딩 강화"
];

const eventSteps = [
  { step: 1, text: "Click the 'Use Music' button in the bottom right" },
  { step: 2, text: "Add it as background music to your photos/videos and upload" },
  { step: 3, text: "Show your post when visiting the store" }
];

export default function Marketing() {
  return (
    <>
      <Helmet>
        <title>음원 바이럴 마케팅 | 쇼츠·릴스·틱톡으로 실제 조회수 보장 | 저작권 수익 직결</title>
        <meta name="description" content="BM 특허 받은 독자적 음원 바이럴 마케팅. 유튜브 쇼츠, 인스타 릴스, 틱톡으로 수백만 조회수 달성. 어뷰징 없는 실제 사용자, 실시간 확인 가능. 음악 아티스트와 음반 레이블을 위한 검증된 마케팅 솔루션." />
        <meta property="og:title" content="음원 바이럴 마케팅 | 실제 조회수 보장" />
        <meta property="og:description" content="쇼츠·릴스·틱톡으로 수백만 조회수 달성. 어뷰징 없는 실시간 확인 가능한 음원 홍보." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="min-h-screen">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden" data-testid="section-marketing-hero">
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-black" />
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8" style={{ color: '#D4AF37' }}>
                <Zap className="h-4 w-4" />
                BM 특허 보유 마케팅 솔루션
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                음원 바이럴 마케팅
                <br />
                <span style={{ color: '#D4AF37' }}>실제 조회수 보장</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-8">
                쇼츠 · 릴스 · 틱톡으로 수백만 조회수 달성
                <br />
                어뷰징 없는 실제 사용자, 실시간 확인 가능
              </p>

              {/* Platform Icons */}
              <div className="flex justify-center gap-6 mb-12">
                {platforms.map((platform, index) => {
                  const Icon = platform.icon;
                  return (
                    <div 
                      key={index}
                      className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center hover-elevate"
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  );
                })}
              </div>

              <Button 
                size="lg"
                className="text-lg px-8 py-6"
                style={{ backgroundColor: '#D4AF37', color: '#000' }}
                data-testid="button-marketing-consult"
                asChild
              >
                <a href="https://record.co.kr/" target="_blank" rel="noopener noreferrer">
                  마케팅 상담 신청하기
                </a>
              </Button>
            </div>
          </section>

          {/* Real Case Studies Section */}
          <section className="py-20 md:py-32 bg-muted/30" data-testid="section-case-studies">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium mb-4" style={{ color: '#D4AF37' }}>
                  Real Results
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  실제 마케팅 성과
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  TikTok에서 달성한 실제 조회수 데이터입니다
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {caseStudies.map((study, index) => (
                  <Card key={index} className="overflow-hidden hover-elevate" data-testid={`card-case-${index}`}>
                    <div className="aspect-[9/16] relative overflow-hidden bg-black">
                      <img 
                        src={study.image} 
                        alt={study.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2">{study.title}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <SiTiktok className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">{study.duration}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div>
                          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                            <Play className="h-3 w-3" />
                          </div>
                          <div className="font-bold text-sm" style={{ color: '#D4AF37' }}>{study.views}</div>
                          <div className="text-xs text-muted-foreground">조회수</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                            <Heart className="h-3 w-3" />
                          </div>
                          <div className="font-bold text-sm">{study.likes}</div>
                          <div className="text-xs text-muted-foreground">좋아요</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                            <MessageCircle className="h-3 w-3" />
                          </div>
                          <div className="font-bold text-sm">{study.comments}</div>
                          <div className="text-xs text-muted-foreground">댓글</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                            <Share2 className="h-3 w-3" />
                          </div>
                          <div className="font-bold text-sm">{study.shares}</div>
                          <div className="text-xs text-muted-foreground">공유</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Total Stats */}
              <div className="mt-12 text-center">
                <div className="inline-block bg-black text-white rounded-2xl px-12 py-8">
                  <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#D4AF37' }}>
                    9,443,921+
                  </div>
                  <div className="text-white/70">누적 조회수 달성</div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 md:py-32 bg-background" data-testid="section-marketing-features">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium mb-4" style={{ color: '#D4AF37' }}>
                  Why Choose Us
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  왜 레코딩 카페 마케팅인가?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  검증된 기술력과 투명한 성과로 아티스트의 성공을 지원합니다
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card key={index} className="p-6 text-center hover-elevate" data-testid={`card-feature-${index}`}>
                      <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-7 w-7" style={{ color: '#D4AF37' }} />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Free Drink Event Section */}
          <section className="py-20 md:py-32 bg-black text-white" data-testid="section-free-drink">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <div className="flex items-center gap-3 mb-6">
                    <Coffee className="h-8 w-8" style={{ color: '#D4AF37' }} />
                    <span className="text-2xl font-bold" style={{ color: '#D4AF37' }}>FREE DRINK EVENT</span>
                    <Coffee className="h-8 w-8" style={{ color: '#D4AF37' }} />
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Use Our Song & Get a Free Drink!
                  </h2>
                  
                  <div className="bg-white/5 rounded-xl p-6 mb-8">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Zap className="h-5 w-5" style={{ color: '#D4AF37' }} />
                      How to Participate <span className="text-sm text-white/60">(Takes only 30 seconds!)</span>
                    </h3>
                    <div className="space-y-3">
                      {eventSteps.map((item) => (
                        <div key={item.step} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                            {item.step}
                          </div>
                          <span className="text-white/80 text-sm">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="h-5 w-5" style={{ color: '#D4AF37' }} />
                      <span className="font-semibold" style={{ color: '#D4AF37' }}>Instant Reward</span>
                    </div>
                    <p className="font-bold text-lg mb-2">Free Americano/Ade (Choose one)</p>
                    <p className="text-xs text-white/50">*Visit by reservation only (100% reservation required)</p>
                    <p className="text-xs text-white/50">*Post must remain public</p>
                  </div>
                </div>

                <div className="order-1 md:order-2 flex justify-center">
                  <div className="relative">
                    <img 
                      src={freeDrinkEvent} 
                      alt="Free Drink Event"
                      className="rounded-2xl max-w-sm w-full shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-20 md:py-32 bg-muted/30" data-testid="section-marketing-process">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium mb-4" style={{ color: '#D4AF37' }}>
                  HOW IT WORKS
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  바이럴 마케팅 프로세스
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="p-8 text-center hover-elevate">
                  <div className="text-xs font-medium tracking-widest mb-4" style={{ color: '#D4AF37' }}>STEP 01</div>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Music className="h-8 w-8" style={{ color: '#D4AF37' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">음원 분석</h3>
                  <p className="text-muted-foreground text-sm">타겟 청중과 트렌드를 분석하여 최적의 마케팅 전략 수립</p>
                </Card>

                <Card className="p-8 text-center hover-elevate">
                  <div className="text-xs font-medium tracking-widest mb-4" style={{ color: '#D4AF37' }}>STEP 02</div>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Play className="h-8 w-8" style={{ color: '#D4AF37' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">콘텐츠 확산</h3>
                  <p className="text-muted-foreground text-sm">쇼츠, 릴스, 틱톡을 통한 대규모 바이럴 캠페인 실행</p>
                </Card>

                <Card className="p-8 text-center hover-elevate">
                  <div className="text-xs font-medium tracking-widest mb-4" style={{ color: '#D4AF37' }}>STEP 03</div>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="h-8 w-8" style={{ color: '#D4AF37' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">성과 리포팅</h3>
                  <p className="text-muted-foreground text-sm">실시간 조회수 및 수익 데이터를 투명하게 제공</p>
                </Card>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-20 md:py-32 bg-background" data-testid="section-marketing-benefits">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium mb-6" style={{ color: '#D4AF37' }}>
                  Benefits
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  아티스트와 레이블을 위한
                  <br />
                  <span style={{ color: '#D4AF37' }}>검증된 마케팅 솔루션</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  어뷰징 없는 진정성 있는 바이럴로 음원의 가치를 높이고, 
                  지속 가능한 팬덤을 구축합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 bg-muted/50 rounded-lg p-4">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 md:py-32 bg-black text-white" data-testid="section-marketing-cta">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                지금 바로 시작하세요
              </h2>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                음원 바이럴 마케팅 전문가와 상담하고, 
                당신의 음악을 더 많은 청취자에게 알리세요.
              </p>
              <Button 
                size="lg"
                className="text-lg px-8 py-6"
                style={{ backgroundColor: '#D4AF37', color: '#000' }}
                data-testid="button-marketing-cta"
                asChild
              >
                <a href="https://record.co.kr/" target="_blank" rel="noopener noreferrer">
                  무료 상담 신청
                </a>
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
