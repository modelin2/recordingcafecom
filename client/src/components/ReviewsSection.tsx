import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function ReviewsSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [location] = useLocation();

  const getCurrentLanguage = () => {
    if (location.startsWith('/en')) return 'en';
    if (location.startsWith('/zh')) return 'zh';
    return 'ko';
  };

  const getText = () => {
    const lang = getCurrentLanguage();
    if (lang === 'en') {
      return {
        title: "Customer Reviews",
        subtitle: "Authentic reviews from customers worldwide",
        closeButton: "Close"
      };
    } else if (lang === 'zh') {
      return {
        title: "用户评价",
        subtitle: "来自全球客户的真实评价",
        closeButton: "关闭"
      };
    }
    return {
      title: "이용자 후기",
      subtitle: "전 세계 고객들의 진솔한 후기",
      closeButton: "닫기"
    };
  };

  const reviews = [
    { id: 1, image: "/reviews/review-1.jpg" },
    { id: 2, image: "/reviews/review-2.jpg" },
    { id: 3, image: "/reviews/review-3.jpg" },
    { id: 4, image: "/reviews/review-4.jpg" },
    { id: 5, image: "/reviews/review-5.jpg" },
    { id: 6, image: "/reviews/review-6.jpg" },
    { id: 7, image: "/reviews/review-7.jpg" },
    { id: 8, image: "/reviews/review-8.jpg" },
    { id: 9, image: "/reviews/review-9.jpg" },
    { id: 10, image: "/reviews/review-10.jpg" },
  ];

  return (
    <section id="reviews" className="py-20 md:py-32 bg-muted/30" data-testid="section-reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium mb-6" style={{ color: '#D4AF37' }}>
            Reviews
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6" data-testid="text-reviews-title">
            {getText().title}
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
            {getText().subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card 
              key={review.id} 
              className="overflow-hidden border-border/50 hover-elevate cursor-pointer"
              onClick={() => setSelectedImage(review.image)}
              data-testid={`card-review-${review.id}`}
            >
              <div className="relative w-full overflow-hidden h-96">
                <img
                  src={review.image}
                  alt={`고객 후기 ${review.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Full-size image modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          data-testid="modal-review-image"
        >
          <div className="relative max-w-2xl w-full max-h-[90vh] flex flex-col">
            <button
              className="absolute -top-12 right-0 text-white hover:opacity-80 text-sm flex items-center gap-2"
              onClick={() => setSelectedImage(null)}
              data-testid="button-close-modal"
            >
              <span>{getText().closeButton}</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="bg-background rounded-lg overflow-y-auto shadow-2xl">
              <img
                src={selectedImage}
                alt="후기 확대보기"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
