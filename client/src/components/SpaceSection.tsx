import { Card } from "@/components/ui/card";
import coupleImg from "@assets/레코딩카페커플_1763517988473.jpg";
import recordingImg from "@assets/레코딩_1763518051359.png";
import soloImg from "@assets/레코딩카페 1인석2_1763518051359.png";
import studioImg from "@assets/레코딩카페 녹음실3_1763518051360.png";
import loungeImg from "@assets/레코딩카페 라운지6_1763518051360.png";
import boraboxImg from "@assets/레코딩카페 보라박스_1763518051360.png";
import cafeImg from "@assets/레코딩카페_1763518051360.png";

export default function SpaceSection() {
  return (
    <section id="space" className="py-16 md:py-20" data-testid="section-space">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#D4AF37' }} data-testid="text-space-title">
              편안함과 전문성이 공존하는 공간
            </h2>

            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                레코딩 카페는 따뜻한 우드 인테리어와 세련된 디자인이 조화를 이루는 
                프리미엄 공간입니다. 커피를 즐기며 편안하게 엔터테인먼트 산업을 체험할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="aspect-[16/10] rounded-md overflow-hidden">
              <img src={coupleImg} alt="레코딩 카페 커플" className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="aspect-square rounded-md overflow-hidden">
                <img src={recordingImg} alt="레코딩 공간" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-md overflow-hidden">
                <img src={studioImg} alt="녹음실" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-md overflow-hidden">
                <img src={loungeImg} alt="라운지" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
