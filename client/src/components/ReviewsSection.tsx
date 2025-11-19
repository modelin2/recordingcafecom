import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, ArrowRight } from "lucide-react";

export default function ReviewsSection() {
  const reviews = [
    {
      name: "Emma",
      date: "2025/09/07",
      rating: 5.0,
      text: "녹음 카페 첫 경험이었는데 정말 멋졌어요! 프로듀서분들이 매우 따뜻하고 전문적이었습니다 (한국어를 잘 못해도 영어로 소통 가능해요). 녹음 세션 전에 맛있는 음료를 즐길 수 있고, 모든 과정을 친절하게 설명해주세요. 경험이 없어도 전 과정을 안내해주시고, 긴장하면 편안하게 도와주십니다. 케이팝과 노래를 좋아하는 모든 분들께 강력 추천합니다!"
    },
    {
      name: "Kristijan",
      date: "2025/10/06",
      rating: 5.0,
      text: "케이팝 전문가의 멋진 녹음을 원하신다면 이PD님과 그의 팀을 꼭 방문하세요. 저희 딸이 너무 재미있어 했고 다시 오고 싶어 합니다. 처음 환영부터 녹음 완료까지 모든 것이 훌륭했고, 마치 작은 가족처럼 아늑하게 느껴졌습니다. 전국의 케이팝을 프로듀싱하는 전문가들을 만날 수 있어 정말 가볼 만한 가치가 있습니다. 함께한 1시간이 정말 좋았습니다. 크로아티아에서 온 Lena, Luka, Veki & Kristijan 인사드립니다."
    },
    {
      name: "Julian",
      date: "2025/10/12",
      rating: 5.0,
      text: "정말 재미있는 경험이었어요! 노래를 좋아한다면 꼭 경험해보세요! 가사 외울 걱정은 하지 마세요. 방 안에 가라오케 트랙과 함께 가사가 나오는 모니터가 있습니다! 이PD님과 프론트 데스크의 신사분이 정말 훌륭하셨어요!! 멋진 경험을 주셔서 감사합니다! 곧 다시 올게요!! 정말 사랑스러워요!"
    },
    {
      name: "Patrix",
      date: "2025/11/08",
      rating: 5.0,
      text: "K-Recording Cafe에서 정말 놀라운 시간을 보냈습니다! 이곳은 정말 재미있어요. 비디오 녹음과 AI 뮤직 비디오 제작의 조합으로 모든 경험이 전문적이고 흥미진진하게 느껴졌습니다. 여기서 제가 좋아하는 중국 노래를 녹음했어요! 스태프분들이 매우 친절하고 도움이 되었으며, 더 잘 부르는 방법에 대해 진심 어린 조언을 해주셨습니다. 하루 동안 케이팝 스타가 된 것 같은 잊을 수 없는 경험을 원하신다면 꼭 방문해보세요! 강력 추천합니다!"
    }
  ];

  return (
    <section id="reviews" className="py-20 md:py-32 bg-muted/30" data-testid="section-reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium mb-6" style={{ color: '#D4AF37' }}>
            Reviews
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6" data-testid="text-reviews-title">
            이용자 후기
          </h2>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-6 w-6 fill-current" style={{ color: '#D4AF37' }} />
              ))}
            </div>
            <span className="text-2xl font-bold">5.0</span>
            <span className="text-muted-foreground">/5.0</span>
          </div>

          <p className="text-lg text-muted-foreground">
            전 세계 고객들의 진솔한 후기
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {reviews.map((review, index) => (
            <Card key={index} className="border-border/50 hover-elevate" data-testid={`card-review-${index}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{review.name}</h3>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full" style={{ backgroundColor: '#D4AF37', color: '#000' }}>
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-semibold">{review.rating}</span>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="h-8 w-8 absolute -top-2 -left-2 opacity-20" style={{ color: '#D4AF37' }} />
                  <p className="text-muted-foreground leading-relaxed pl-6">
                    {review.text}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="group"
            style={{ backgroundColor: '#D4AF37', color: '#000' }}
            data-testid="button-all-reviews"
            asChild
          >
            <a href="https://www.klook.com/en-US/activity/121254-1-song-recording-with-drink-seoul/" target="_blank" rel="noopener noreferrer">
              <span>전체 후기 보기</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
