import { Button } from "@/components/ui/button";
import { Phone, Calendar, MapPin } from "lucide-react";

export default function Map() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Han River Walking Guide Video (YouTube Shorts - vertical) */}
      <div className="relative w-full max-w-md mx-auto" style={{ paddingTop: '177.78%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/FzBqrwM5nvk?autoplay=1&mute=1&playsinline=1&loop=1&playlist=FzBqrwM5nvk&rel=0&modestbranding=1"
          title="Han River Walking Route Guide"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          data-testid="video-han-river-guide"
        />
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-sm text-white/80 bg-black/50 inline-block px-4 py-2 rounded-full">
            Tap to unmute / 터치하면 소리가 나옵니다
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Multilingual Descriptions */}
        <div className="space-y-6 text-sm leading-relaxed">
          {/* English */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold flex items-center gap-2">
              <span>English</span>
            </h3>
            <p className="text-white/80">
              This video is a walking route guide from a recording café to the Han River riverside.
              I filmed it while holding my phone and walking the entire way, so you can easily follow the exact path without getting lost.
            </p>
            <p className="text-white/80">
              If you're heading to the Han River from this area, just walk along with this video.
            </p>
            <p className="text-white/60 text-xs">
              Simple, real-time walking directions | No cuts, no shortcuts
            </p>
          </div>

          {/* Chinese */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold flex items-center gap-2">
              <span>中文（简体）</span>
            </h3>
            <p className="text-white/80">
              这是一个步行路线指引视频，从录音咖啡馆一路走到汉江江边。
              为了不迷路，我一直拿着手机，按照实际行走的路线完整拍摄，方便大家照着视频走。
            </p>
            <p className="text-white/80">
              如果你也要从这里前往汉江，可以直接跟着这条路线走。
            </p>
            <p className="text-white/60 text-xs">
              真实步行路线 | 全程拍摄，无剪辑
            </p>
          </div>

          {/* Japanese */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold flex items-center gap-2">
              <span>日本語</span>
            </h3>
            <p className="text-white/80">
              この動画は、レコーディングカフェから漢江（ハンガン）の河川敷までの徒歩ルート案内動画です。
            </p>
            <p className="text-white/80">
              道に迷わないように、スマートフォンを持ったまま実際に歩いたルートをそのまま撮影しています。
              同じ場所から漢江へ向かう方は、この動画を見ながら歩いてみてください。
            </p>
            <p className="text-white/60 text-xs">
              実際の徒歩ルート | ノーカットで分かりやすい道案内
            </p>
          </div>
        </div>

        {/* Location Info */}
        <div className="text-center space-y-2 pt-4 border-t border-white/10">
          <div className="flex items-center justify-center gap-2 text-lg font-semibold" style={{ color: '#D4AF37' }}>
            <MapPin className="h-5 w-5" />
            <span>레코딩 카페</span>
          </div>
          <p className="text-sm text-white/60">
            서울특별시 서초구 강남대로107길 21. 2층
          </p>
        </div>

        {/* Call Button */}
        <div className="space-y-3">
          <p className="text-center text-sm text-white/80">
            길 못 찾으시겠으면 연락주세요 / Can't find the way? Call us!
          </p>
          <Button
            asChild
            size="lg"
            className="w-full text-base font-semibold"
            style={{ backgroundColor: '#D4AF37', color: '#000' }}
            data-testid="button-call"
          >
            <a href="tel:02-1234-5678">
              <Phone className="h-5 w-5 mr-2" />
              전화 걸기 / Call Now
            </a>
          </Button>
        </div>

        {/* Multilingual Booking Buttons */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <p className="text-center text-sm text-white/80">
            Book a Recording Session
          </p>
          <div className="grid grid-cols-1 gap-3">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full text-base font-semibold border-white/30 text-white hover:bg-white/10"
              data-testid="button-booking-en"
            >
              <a href="https://booking.naver.com/booking/13/bizes/1068331" target="_blank" rel="noopener noreferrer">
                <Calendar className="h-5 w-5 mr-2" />
                Book Recording Cafe (English)
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full text-base font-semibold border-white/30 text-white hover:bg-white/10"
              data-testid="button-booking-cn"
            >
              <a href="https://booking.naver.com/booking/13/bizes/1068331" target="_blank" rel="noopener noreferrer">
                <Calendar className="h-5 w-5 mr-2" />
                预约录音室 (中文)
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full text-base font-semibold border-white/30 text-white hover:bg-white/10"
              data-testid="button-booking-jp"
            >
              <a href="https://booking.naver.com/booking/13/bizes/1068331" target="_blank" rel="noopener noreferrer">
                <Calendar className="h-5 w-5 mr-2" />
                レコーディング予約 (日本語)
              </a>
            </Button>
          </div>
        </div>

        {/* Recording Cafe Promo Video Section */}
        <div className="space-y-4 pt-8 border-t border-white/10">
          <h2 className="text-center text-lg font-semibold" style={{ color: '#D4AF37' }}>
            레코딩 카페 홍보 영상
          </h2>
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/kTsgj9n-9ks?autoplay=1&mute=1&playsinline=1&loop=1&playlist=kTsgj9n-9ks&rel=0&modestbranding=1"
              title="레코딩 카페 홍보 영상"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              data-testid="video-promo"
            />
          </div>
        </div>

        {/* Home Link */}
        <div className="pt-6 text-center">
          <a 
            href="/" 
            className="text-xs text-white/40 hover:text-white/60 transition-colors"
            data-testid="link-home"
          >
            레코딩카페 홈페이지 바로가기
          </a>
        </div>
      </div>
    </div>
  );
}
