import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Mic2, Sparkles, Globe, Music, Star, Clock, MapPin } from "lucide-react";
import hotelPromo from "@assets/recordingcafe_1768187037122.png";

export default function Hotel() {
  return (
    <>
      <Helmet>
        <title>リバーサイドホテルから徒歩30秒 | K-POPレコーディング体験 | Recording Café</title>
        <meta name="description" content="K-POPアイドルと同じレコーディングスタジオで主人公になってみませんか？歌が苦手でもAIがプロ歌手のように補正します。" />
      </Helmet>
      
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section with YouTube Video */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* YouTube Video Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <iframe
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh] md:w-[120vw] md:h-[120vh] pointer-events-none"
              src="https://www.youtube.com/embed/sGMcHrmCmDU?autoplay=1&mute=1&loop=1&playlist=sGMcHrmCmDU&controls=0&showinfo=0&modestbranding=1&playsinline=1"
              title="Recording Café"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Content */}
          <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6" style={{ color: '#D4AF37' }}>
              <MapPin className="h-4 w-4" />
              リバーサイドホテルから徒歩30秒
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              K-POPアイドルと同じ
              <br />
              <span style={{ color: '#D4AF37' }}>レコーディングスタジオ</span>で
              <br />
              主人公になる
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8">
              歌が苦手でも大丈夫。最先端AIがプロ歌手のように仕上げます。
            </p>

            <Button 
              size="lg"
              className="text-lg px-8 py-6"
              style={{ backgroundColor: '#D4AF37', color: '#000' }}
              data-testid="button-hotel-reserve"
              asChild
            >
              <a href="https://record.co.kr/" target="_blank" rel="noopener noreferrer">
                今すぐ予約する
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

        {/* Main Promo Image Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-black to-zinc-900">
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-2xl blur-3xl" />
              <img 
                src={hotelPromo} 
                alt="Recording Café K-POP Experience"
                className="relative w-full rounded-2xl shadow-2xl"
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
                <h3 className="text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>夢のような体験</h3>
                <p className="text-white/70">
                  リバーサイドホテルから徒歩30秒。K-POPアイドルと同じレコーディングスタジオで主人公になってみませんか？
                </p>
              </div>

              {/* AI Technology */}
              <div className="text-center p-8 bg-black/50 rounded-2xl border border-white/10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}>
                  <Sparkles className="h-8 w-8" style={{ color: '#D4AF37' }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>AIが完璧に補正</h3>
                <p className="text-white/70">
                  歌が苦手でも大丈夫です。最先端のAI技術がプロの歌手のように仕上げます。
                </p>
              </div>

              {/* Reward */}
              <div className="text-center p-8 bg-black/50 rounded-2xl border border-white/10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}>
                  <Globe className="h-8 w-8" style={{ color: '#D4AF37' }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>一生の資産に</h3>
                <p className="text-white/70">
                  ただの体験で終わりません。全世界で音源が配信され、著作権収入が入る一生の資産を作りましょう。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16 md:py-24 bg-black">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                実際の<span style={{ color: '#D4AF37' }}>レコーディング体験</span>
              </h2>
              <p className="text-white/60">
                お客様のレコーディング風景をご覧ください
              </p>
            </div>

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
                Recording Caféの<span style={{ color: '#D4AF37' }}>特徴</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-6 bg-black/50 rounded-xl border border-white/10">
                <Mic2 className="h-6 w-6 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <div>
                  <h4 className="font-bold mb-2">プロ仕様のスタジオ</h4>
                  <p className="text-sm text-white/60">K-POPアーティストも使用する本格的なレコーディング機材</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-black/50 rounded-xl border border-white/10">
                <Clock className="h-6 w-6 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <div>
                  <h4 className="font-bold mb-2">30分から体験可能</h4>
                  <p className="text-sm text-white/60">旅行の合間にも気軽に本格レコーディング体験</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-black/50 rounded-xl border border-white/10">
                <Sparkles className="h-6 w-6 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <div>
                  <h4 className="font-bold mb-2">AI音声補正技術</h4>
                  <p className="text-sm text-white/60">歌に自信がなくてもプロ級の仕上がりを保証</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-black/50 rounded-xl border border-white/10">
                <Music className="h-6 w-6 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <div>
                  <h4 className="font-bold mb-2">世界配信&著作権</h4>
                  <p className="text-sm text-white/60">Spotify、Apple Musicなど全世界で音源配信</p>
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
                今日、<span style={{ color: '#D4AF37' }}>スターになる</span>
              </h2>
              <p className="text-white/60 mb-8">
                リバーサイドホテルから徒歩30秒
                <br />
                ご滞在中にぜひお立ち寄りください
              </p>
              <Button 
                size="lg"
                className="text-lg px-8 py-6"
                style={{ backgroundColor: '#D4AF37', color: '#000' }}
                data-testid="button-hotel-cta"
                asChild
              >
                <a href="https://record.co.kr/" target="_blank" rel="noopener noreferrer">
                  予約する
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
