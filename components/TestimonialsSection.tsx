import ScrollReveal from "./ScrollReveal";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "김지수",
    tag: "커플 방문",
    rating: 5,
    text: "남자친구랑 처음 와봤는데 진짜 대박이에요! 녹음실에서 같이 노래하니까 엄청 설레고 좋았어요. 음원 파일도 바로 주셔서 지금도 종종 들어요. 다음에 또 올게요!",
  },
  {
    name: "박민준",
    tag: "생일 이벤트",
    rating: 5,
    text: "여자친구 생일 서프라이즈로 예약했어요. 좋아하는 노래 녹음해서 선물하니까 엄청 좋아하더라고요. 스태프분들도 친절하게 도와주셔서 완벽한 날이었습니다.",
  },
  {
    name: "Sarah K.",
    tag: "Tourist from USA",
    rating: 5,
    text: "This was the highlight of my Korea trip! Recording a K-pop song in a real studio was a dream come true. The staff was so helpful and the final audio quality was amazing. Highly recommend!",
  },
  {
    name: "이소영",
    tag: "친구들과 방문",
    rating: 5,
    text: "보라박스에서 라이브 방송 해봤는데 진짜 크리에이터가 된 기분이에요ㅋㅋ 촬영 조명이랑 장비가 다 갖춰져 있어서 초보자도 쉽게 할 수 있어요.",
  },
  {
    name: "田中さくら",
    tag: "日本から来訪",
    rating: 5,
    text: "韓国旅行でK-POPスタジオ体験！本物のレコーディングスタジオで録音できて最高でした。スタッフさんも優しくて、また来たいです。",
  },
  {
    name: "최현우",
    tag: "기념일 방문",
    rating: 5,
    text: "100일 기념으로 방문했어요. 거울 촬영 부스에서 사진도 찍고 노래도 녹음했는데 정말 특별한 추억이 됐어요. 일반 카페 데이트랑은 차원이 달랐습니다.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="text-center mb-14">
            <div className="text-[#D4AF37] text-sm font-mono uppercase tracking-widest mb-4">— Reviews</div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              다녀온 분들의 <span className="gold-text">후기</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <ScrollReveal key={review.name} animation="fade-up" delay={i * 80} duration={650}>
              <div className="gold-card rounded-2xl p-6 flex flex-col gap-4 h-full">
                {/* 별점 */}
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>

                {/* 후기 텍스트 */}
                <p className="text-slate-300 text-sm leading-relaxed flex-1">&ldquo;{review.text}&rdquo;</p>

                {/* 작성자 */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-xs font-bold">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{review.name}</div>
                    <div className="text-slate-500 text-xs">{review.tag}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
