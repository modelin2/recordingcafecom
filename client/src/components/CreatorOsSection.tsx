import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function CreatorOsSection() {
  const [location] = useLocation();

  const getCurrentLanguage = () => {
    if (location.startsWith('/en')) return 'en';
    if (location.startsWith('/zh')) return 'zh';
    return 'ko';
  };

  const getPipelines = () => {
    const lang = getCurrentLanguage();
    if (lang === 'en') {
      return [
        {
          title: "Actor OS",
          subtitle: "Hollywood Profile",
          description: "AI hair/makeup/location simulation. Global casting site profile registration agency",
          result: "Improved audition success rate, expanded overseas opportunities",
          link: "https://holly.ai.kr/",
          buttonText: "Hollywood Profile"
        },
        {
          title: "Singer OS",
          subtitle: "Recording Café",
          description: "From AI-assisted creation to timestamp/copyright registration, overseas distribution",
          result: "Initial royalty generation, music asset portfolio building",
          link: "https://chinastage.co.kr/",
          buttonText: "China Fan Meeting Agency"
        },
        {
          title: "Influencer OS",
          subtitle: "Bora Box",
          description: "Small influencers grow through collaboration. Basic livelihood support through artist certification",
          result: "Diverse revenue sources, stable influencer growth",
          link: "https://influencer.kr/",
          buttonText: "Korea Influencer Association"
        }
      ];
    } else if (lang === 'zh') {
      return [
        {
          title: "演员 OS",
          subtitle: "好莱坞档案",
          description: "AI发型/化妆/地点模拟。全球选角网站档案注册代理业务",
          result: "提高试镜通过率，扩大海外机会",
          link: "https://holly.ai.kr/",
          buttonText: "好莱坞档案"
        },
        {
          title: "歌手 OS",
          subtitle: "录音咖啡馆",
          description: "从AI辅助创作到时间戳/版权注册，海外发行",
          result: "初期版税产生，音乐资产组合构建",
          link: "https://chinastage.co.kr/",
          buttonText: "中国粉丝见面会专业代理"
        },
        {
          title: "网红 OS",
          subtitle: "宝拉盒子",
          description: "订阅数少的网红也能通过合作成长。通过艺术家认证获得基本生活支持",
          result: "确保多样化收入来源，稳定网红成长",
          link: "https://influencer.kr/",
          buttonText: "韩国网红协会"
        }
      ];
    }
    return [
      {
        title: "배우 OS",
        subtitle: "할리우드 프로필",
        description: "AI 헤어/메이크업/로케이션 시뮬레이션. 글로벌 캐스팅 사이트 프로필 등록 대행 사업",
        result: "오디션 합격률 향상, 해외 진출 기회 확대",
        link: "https://holly.ai.kr/",
        buttonText: "할리우드 프로필"
      },
      {
        title: "가수 OS",
        subtitle: "레코딩 카페",
        description: "AI 어시스트 창작부터 타임스탬프/저작권 등록, 해외 유통까지",
        result: "초기 로열티 발생, 음악 자산 포트폴리오 구축",
        link: "https://chinastage.co.kr/",
        buttonText: "중국 팬미팅 전문 대행"
      },
      {
        title: "인플루언서 OS",
        subtitle: "보라박스",
        description: "구독자가 적은 인플루언서도 콜라보를 통해 성장. 예술인 인증을 통한 기초생활 지원",
        result: "다양한 수익원 확보, 안정적 인플루언서로 성장",
        link: "https://influencer.kr/",
        buttonText: "한국인플루언서협회"
      }
    ];
  };

  const getText = () => {
    const lang = getCurrentLanguage();
    if (lang === 'en') {
      return {
        title: "Creator Operating System",
        tagline: "AI × Entertainment × Finance",
        subtitle: "Designing and operating creators' lifetime revenue structure",
        investment: "Investing in making creators' dreams a reality with AI technology",
        footer: "Recording Café provides a Career Operating System (OS) for professional growth"
      };
    } else if (lang === 'zh') {
      return {
        title: "创作者操作系统",
        tagline: "AI × 娱乐 × 金融",
        subtitle: "设计并运营创作者的终身收入结构",
        investment: "用AI技术投资，让创作者的梦想成真",
        footer: "录音咖啡馆为成为专业人士提供职业操作系统(OS)"
      };
    }
    return {
      title: "크리에이터 운영체제",
      tagline: "AI × Entertainment × Finance",
      subtitle: "창작자의 생애 수익 구조를 설계 운영",
      investment: "AI 기술로 창작자의 꿈을 현실로 만드는 투자",
      footer: "레코딩 카페는 프로로 성장하기 위한 커리어 운영체제(OS)를 제공합니다"
    };
  };

  const pipelines = getPipelines();

  return (
    <section id="creator-os" className="py-20 md:py-32 bg-background" data-testid="section-creator-os">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium mb-6" style={{ color: '#D4AF37' }}>
            Creator OS
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6" data-testid="text-creator-os-title">
            {getText().title}
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            <span style={{ color: '#D4AF37' }}>{getText().tagline}</span><br className="hidden sm:block" />{' '}
            {getText().subtitle}
          </p>

          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            {getText().investment}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pipelines.map((pipeline, index) => (
            <Card key={index} className="border-border/50 hover-elevate" data-testid={`card-pipeline-${index}`}>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">{pipeline.title}</h3>
                <p className="text-sm mb-4" style={{ color: '#D4AF37' }}>{pipeline.subtitle}</p>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {pipeline.description}
                </p>

                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-start gap-2 mb-4">
                    <Sparkles className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <p className="text-sm text-muted-foreground">{pipeline.result}</p>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full group"
                    style={{ backgroundColor: '#D4AF37', color: '#000' }}
                    data-testid={`button-pipeline-${index}`}
                    asChild
                  >
                    <a href={pipeline.link} target="_blank" rel="noopener noreferrer">
                      <span>{pipeline.buttonText}</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-muted/30 border-border/50">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {getText().footer}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
