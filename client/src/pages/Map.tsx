import { Button } from "@/components/ui/button";
import { Phone, Calendar, MapPin, Navigation } from "lucide-react";

export default function Map() {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=서울특별시+서초구+강남대로107길+21";
  const bookingUrl = "https://booking.naver.com/booking/13/bizes/1068331";

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
            Tap to unmute
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Multilingual Descriptions */}
        <div className="space-y-6 text-sm leading-relaxed">
          {/* English */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold">English</h3>
            <p className="text-white/80">
              Walking route guide from Recording Café to Han River. Follow along with this video - no cuts, real-time directions.
            </p>
          </div>

          {/* Chinese */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold">中文</h3>
            <p className="text-white/80">
              从录音咖啡馆到汉江的步行路线指南。跟着视频走，全程无剪辑。
            </p>
          </div>

          {/* Japanese */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold">日本語</h3>
            <p className="text-white/80">
              レコーディングカフェから漢江への徒歩ルート案内。ノーカットで分かりやすい道案内です。
            </p>
          </div>
        </div>

        {/* Location & Navigation */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-lg font-semibold" style={{ color: '#D4AF37' }}>
              <MapPin className="h-5 w-5" />
              <span>레코딩 카페</span>
            </div>
            <p className="text-sm text-white/60">
              서울특별시 서초구 강남대로107길 21. 2층
            </p>
          </div>

          {/* Google Maps Button */}
          <Button
            asChild
            size="lg"
            className="w-full text-base font-semibold"
            style={{ backgroundColor: '#D4AF37', color: '#000' }}
            data-testid="button-navigation"
          >
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
              <Navigation className="h-5 w-5 mr-2" />
              Google Maps / 길찾기
            </a>
          </Button>

          {/* Call Button */}
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full text-base font-semibold border-white/30 text-white hover:bg-white/10"
            data-testid="button-call"
          >
            <a href="tel:02-525-6689">
              <Phone className="h-5 w-5 mr-2" />
              Call / 전화하기
            </a>
          </Button>
        </div>

        {/* Booking Button */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <Button
            asChild
            size="lg"
            className="w-full text-base font-semibold bg-white text-black hover:bg-white/90"
            data-testid="button-booking"
          >
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
              <Calendar className="h-5 w-5 mr-2" />
              Book Now / 예약하기 / 预约 / 予約
            </a>
          </Button>
        </div>

        {/* Recording Cafe Promo Video Section */}
        <div className="space-y-4 pt-8 border-t border-white/10">
          <h2 className="text-center text-lg font-semibold" style={{ color: '#D4AF37' }}>
            Recording Café
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
            className="text-sm text-white/50 hover:text-white/80 transition-colors"
            style={{ color: '#D4AF37' }}
            data-testid="link-home"
          >
            recordingcafe.com
          </a>
        </div>
      </div>
    </div>
  );
}
