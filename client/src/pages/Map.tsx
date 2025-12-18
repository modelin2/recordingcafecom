import { Button } from "@/components/ui/button";
import { Phone, Calendar, MapPin } from "lucide-react";

export default function Map() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/kTsgj9n-9ks?autoplay=1&mute=1&playsinline=1&loop=1&playlist=kTsgj9n-9ks&rel=0&modestbranding=1"
          title="레코딩카페 오시는 길"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          data-testid="video-map-guide"
        />
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-sm text-white/80 bg-black/50 inline-block px-4 py-2 rounded-full">
            화면을 터치하면 소리가 나옵니다
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-lg font-semibold" style={{ color: '#D4AF37' }}>
            <MapPin className="h-5 w-5" />
            <span>레코딩 카페</span>
          </div>
          <p className="text-sm text-white/60">
            서울특별시 서초구 강남대로107길 21. 2층
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-center text-sm text-white/80">
            길 못 찾으시겠으면 연락주세요
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
              전화 걸기
            </a>
          </Button>
        </div>

        <div className="space-y-3 pt-4 border-t border-white/10">
          <p className="text-center text-sm text-white/80">
            지금 바로 예약하세요
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full text-base font-semibold border-white/30 text-white hover:bg-white/10"
            data-testid="button-booking"
          >
            <a href="https://booking.naver.com/booking/13/bizes/1068331" target="_blank" rel="noopener noreferrer">
              <Calendar className="h-5 w-5 mr-2" />
              녹음 예약하기
            </a>
          </Button>
        </div>

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
