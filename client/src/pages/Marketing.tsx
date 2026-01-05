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
  Share2,
  ChevronDown,
  ExternalLink
} from "lucide-react";
import { SiYoutube, SiInstagram, SiTiktok } from "react-icons/si";
import freeDrinkEvent from "@assets/recording_cafe_free_drink_event_20250928014515-1_1760262387083_1767617720476.png";
import tiktokStats1 from "@assets/Screenshot_20251012_165220_TikTok_1760260541954-D8rh0SBS_1767617720476.png";
import tiktokStats2 from "@assets/Screenshot_20251012_165248_TikTok_1760260536578-CttFpt_d_1767617720477.png";
import musicPromo from "@assets/음원_홍보_1760259957866-EJ3826T3_1767617720477.gif";
import { useState } from "react";

const platforms = [
  { icon: SiYoutube, name: "YouTube Shorts" },
  { icon: SiInstagram, name: "Instagram Reels" },
  { icon: SiTiktok, name: "TikTok" },
];

const stats = [
  { value: "1,347,262", label: "누적 조회수" },
  { value: "434,347", label: "좋아요" },
  { value: "132,910", label: "공유" }
];

const caseStudies = [
  {
    image: tiktokStats1,
    title: "Songwriter's Template",
    views: "8.3M",
    likes: "42K",
    comments: "88",
    shares: "395",
    duration: "87.72초"
  },
  {
    image: tiktokStats2,
    title: "Why I Don't Trust You",
    views: "1.1M",
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

const processSteps = [
  {
    step: "01",
    title: "음원 분석",
    description: "타겟 청중과 트렌드를 분석하여 최적의 마케팅 전략 수립"
  },
  {
    step: "02",
    title: "콘텐츠 확산",
    description: "쇼츠, 릴스, 틱톡을 통한 대규모 바이럴 캠페인 실행"
  },
  {
    step: "03",
    title: "성과 리포팅",
    description: "실시간 조회수 및 수익 데이터를 투명하게 제공"
  }
];

const faqs = [
  {
    question: "어떤 플랫폼에서 홍보가 진행되나요?",
    answer: "TikTok, Instagram Reels, YouTube Shorts 등 숏폼 플랫폼에서 동시에 진행됩니다."
  },
  {
    question: "조회수는 실제 사용자인가요?",
    answer: "네, 어뷰징 없는 100% 실제 사용자들의 조회수입니다. 실시간으로 확인 가능합니다."
  },
  {
    question: "마케팅 비용은 어떻게 되나요?",
    answer: "음원과 목표에 따라 맞춤 견적을 제공합니다. 상담을 통해 자세한 안내를 받으실 수 있습니다."
  },
  {
    question: "저작권 수익은 어떻게 발생하나요?",
    answer: "TikTok, Instagram 등에서 음원이 사용될 때마다 저작권료가 발생합니다. 조회수가 늘어날수록 수익도 증가합니다."
  }
];

export default function Marketing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Helmet>
        <title>음원 바이럴 마케팅 | 쇼츠·릴스·틱톡으로 실제 조회수 보장 | 저작권 수익 직결</title>
        <meta name="description" content="BM 특허 받은 독자적 음원 바이럴 마케팅. 유튜브 쇼츠, 인스타 릴스, 틱톡으로 수백만 조회수 달성. 어뷰징 없는 실제 사용자, 실시간 확인 가능. 음악 아티스트와 음반 레이블을 위한 검증된 마케팅 솔루션." />
        <meta property="og:title" content="음원 바이럴 마케팅 | 실제 조회수 보장" />
        <meta property="og:description" content="쇼츠·릴스·틱톡으로 수백만 조회수 달성. 어뷰징 없는 실시간 확인 가능한 음원 홍보." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="min-h-screen bg-black">
        <Header />
        <main>
          {/* Hero Section with Gradient */}
          <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden" data-testid="section-marketing-hero">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-pink-900/30" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8 text-purple-300">
                <Zap className="h-4 w-4" />
                BM 특허 보유
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
                음원 바이럴 마케팅의
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  새로운 표준
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-8">
                쇼츠 · 릴스 · 틱톡으로 수백만 조회수 달성
                <br />
                어뷰징 없는 실제 사용자, 실시간 확인 가능
              </p>

              {/* Platform Icons */}
              <div className="flex justify-center gap-4 mb-12">
                {platforms.map((platform, index) => {
                  const Icon = platform.icon;
                  return (
                    <div 
                      key={index}
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  );
                })}
              </div>

              <Button 
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-0"
                data-testid="button-marketing-consult"
                asChild
              >
                <a href="https://record.co.kr/" target="_blank" rel="noopener noreferrer">
                  지금 무료 상담받기
                </a>
              </Button>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 bg-black border-t border-white/10" data-testid="section-stats">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/50">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Real Results Section */}
          <section className="py-20 md:py-32 bg-black" data-testid="section-case-studies">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                  직접 눈으로 확인하세요
                </h2>
                <p className="text-lg text-white/50">
                  실제 마케팅 성과 데이터
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {caseStudies.map((study, index) => (
                  <div key={index} className="bg-gradient-to-b from-white/5 to-transparent rounded-2xl p-1" data-testid={`card-case-${index}`}>
                    <div className="bg-black/80 rounded-2xl overflow-hidden">
                      <div className="aspect-[9/16] relative overflow-hidden bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
                        <img 
                          src={study.image} 
                          alt={study.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-2 text-white">{study.title}</h3>
                        <div className="flex items-center gap-2 mb-4">
                          <SiTiktok className="h-4 w-4 text-white/60" />
                          <span className="text-sm text-white/40">{study.duration}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center">
                          <div>
                            <div className="font-bold text-sm text-purple-400">{study.views}</div>
                            <div className="text-xs text-white/40">조회수</div>
                          </div>
                          <div>
                            <div className="font-bold text-sm text-white/80">{study.likes}</div>
                            <div className="text-xs text-white/40">좋아요</div>
                          </div>
                          <div>
                            <div className="font-bold text-sm text-white/80">{study.comments}</div>
                            <div className="text-xs text-white/40">댓글</div>
                          </div>
                          <div>
                            <div className="font-bold text-sm text-white/80">{study.shares}</div>
                            <div className="text-xs text-white/40">공유</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Free Drink Event Section */}
          <section className="py-20 md:py-32 bg-gradient-to-b from-black via-purple-950/20 to-black" data-testid="section-free-drink">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                  수백만 팔로워의 <span className="text-purple-400">'노래 프로젝트'</span>
                </h2>
                <p className="text-lg text-white/50">
                  무료 음료 이벤트와 함께하는 바이럴 마케팅
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-2xl" />
                    <img 
                      src={freeDrinkEvent} 
                      alt="Free Drink Event"
                      className="relative rounded-2xl max-w-sm w-full shadow-2xl"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Coffee className="h-6 w-6 text-amber-400" />
                    <span className="text-xl font-bold text-amber-400">FREE DRINK EVENT</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                    Use Our Song & Get a Free Drink!
                  </h3>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/10">
                    <h4 className="font-semibold mb-4 text-white flex items-center gap-2">
                      <Zap className="h-5 w-5 text-purple-400" />
                      How to Participate
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center flex-shrink-0 text-sm font-bold text-white">1</div>
                        <span className="text-white/70 text-sm">Click the 'Use Music' button in the bottom right</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center flex-shrink-0 text-sm font-bold text-white">2</div>
                        <span className="text-white/70 text-sm">Add it as background music to your photos/videos and upload</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center flex-shrink-0 text-sm font-bold text-white">3</div>
                        <span className="text-white/70 text-sm">Show your post when visiting the store</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-6 border border-amber-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-5 w-5 text-amber-400" />
                      <span className="font-semibold text-amber-400">Instant Reward</span>
                    </div>
                    <p className="font-bold text-lg text-white">Free Americano/Ade (Choose one)</p>
                    <p className="text-xs text-white/40 mt-2">*Visit by reservation only</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Music Promo Section */}
          <section className="py-20 md:py-32 bg-black" data-testid="section-music-promo">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                  아티스트와 레이블을 위한 <span className="text-pink-400">솔루션</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                <div className="space-y-6">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex items-start gap-4 bg-white/5 rounded-xl p-5 border border-white/10">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                          <p className="text-sm text-white/50">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-2xl blur-2xl" />
                    <img 
                      src={musicPromo} 
                      alt="Music Promo"
                      className="relative rounded-2xl max-w-xs w-full shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-20 md:py-32 bg-gradient-to-b from-black via-purple-950/10 to-black" data-testid="section-benefits">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                  직접적인 바이럴 팬들 프로젝트
                </h2>
                <p className="text-white/50">
                  검증된 솔루션으로 아티스트의 성공을 지원합니다
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-purple-400" />
                    <span className="text-sm text-white/80">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-20 md:py-32 bg-black" data-testid="section-process">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                  마케팅 <span className="text-purple-400">프로세스</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {processSteps.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-white/50 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 md:py-32 bg-gradient-to-b from-black to-purple-950/20" data-testid="section-faq">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                  자주 묻는 질문
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div 
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left"
                      data-testid={`button-faq-${index}`}
                    >
                      <span className="font-medium text-white">{faq.question}</span>
                      <ChevronDown className={`h-5 w-5 text-white/50 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-4">
                        <p className="text-white/60 text-sm">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 md:py-32 bg-black" data-testid="section-cta">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-purple-900/50 rounded-3xl p-12 border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                    음원을 더 많은 사람에게
                  </h2>
                  <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                    지금 바로 무료 상담을 신청하고<br />
                    당신의 음악을 전 세계에 알리세요
                  </p>
                  <Button 
                    size="lg"
                    className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-0"
                    data-testid="button-marketing-cta"
                    asChild
                  >
                    <a href="https://record.co.kr/" target="_blank" rel="noopener noreferrer">
                      무료 상담 신청
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
