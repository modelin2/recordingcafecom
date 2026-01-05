import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  TrendingUp, 
  Shield, 
  Eye, 
  Music, 
  Zap,
  CheckCircle,
  BarChart3,
  Globe,
  Users
} from "lucide-react";
import { SiYoutube, SiInstagram, SiTiktok } from "react-icons/si";

const platforms = [
  { icon: SiYoutube, name: "YouTube Shorts", color: "#FF0000" },
  { icon: SiInstagram, name: "Instagram Reels", color: "#E4405F" },
  { icon: SiTiktok, name: "TikTok", color: "#000000" },
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

const stats = [
  { value: "1,000만+", label: "누적 조회수" },
  { value: "500+", label: "성공 프로젝트" },
  { value: "98%", label: "고객 만족도" },
  { value: "200%", label: "평균 ROI" }
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

          {/* Stats Section */}
          <section className="py-16 bg-muted/30" data-testid="section-marketing-stats">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#D4AF37' }}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
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

          {/* How It Works Section */}
          <section className="py-20 md:py-32 bg-black text-white" data-testid="section-marketing-process">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <p className="text-sm font-medium mb-4 tracking-widest" style={{ color: '#D4AF37' }}>
                  HOW IT WORKS
                </p>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  바이럴 마케팅 프로세스
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-white/5 border-white/10 p-8 text-center">
                  <div className="text-xs font-medium tracking-widest mb-4" style={{ color: '#D4AF37' }}>STEP 01</div>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                    <Music className="h-8 w-8" style={{ color: '#D4AF37' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">음원 분석</h3>
                  <p className="text-white/60 text-sm">타겟 청중과 트렌드를 분석하여 최적의 마케팅 전략 수립</p>
                </Card>

                <Card className="bg-white/5 border-white/10 p-8 text-center">
                  <div className="text-xs font-medium tracking-widest mb-4" style={{ color: '#D4AF37' }}>STEP 02</div>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                    <Play className="h-8 w-8" style={{ color: '#D4AF37' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">콘텐츠 확산</h3>
                  <p className="text-white/60 text-sm">쇼츠, 릴스, 틱톡을 통한 대규모 바이럴 캠페인 실행</p>
                </Card>

                <Card className="bg-white/5 border-white/10 p-8 text-center">
                  <div className="text-xs font-medium tracking-widest mb-4" style={{ color: '#D4AF37' }}>STEP 03</div>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                    <BarChart3 className="h-8 w-8" style={{ color: '#D4AF37' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">성과 리포팅</h3>
                  <p className="text-white/60 text-sm">실시간 조회수 및 수익 데이터를 투명하게 제공</p>
                </Card>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-20 md:py-32 bg-muted/30" data-testid="section-marketing-benefits">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium mb-6" style={{ color: '#D4AF37' }}>
                    Benefits
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    아티스트와 레이블을 위한
                    <br />
                    <span style={{ color: '#D4AF37' }}>검증된 마케팅 솔루션</span>
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    어뷰징 없는 진정성 있는 바이럴로 음원의 가치를 높이고, 
                    지속 가능한 팬덤을 구축합니다.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Card className="p-6 hover-elevate">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Globe className="h-6 w-6" style={{ color: '#D4AF37' }} />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">글로벌 노출</h4>
                        <p className="text-sm text-muted-foreground">전 세계 청취자에게 음원을 노출시켜 글로벌 팬덤 확보</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 hover-elevate">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Users className="h-6 w-6" style={{ color: '#D4AF37' }} />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">실제 청취자</h4>
                        <p className="text-sm text-muted-foreground">봇이 아닌 실제 사용자들의 진정성 있는 반응과 참여</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 hover-elevate">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="h-6 w-6" style={{ color: '#D4AF37' }} />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">수익 극대화</h4>
                        <p className="text-sm text-muted-foreground">조회수 증가가 저작권료 수익으로 직결되는 구조</p>
                      </div>
                    </div>
                  </Card>
                </div>
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
