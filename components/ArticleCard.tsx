import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  category_slug: string;
  read_time: number;
  created_at: string;
  image_url?: string | null;
}

export default function ArticleCard({ article }: { article: Article }) {
  const date = new Date(article.created_at).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/magazine/${article.slug}`} className="group block">
      <div className="gold-card rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-[#D4AF37]/40 group-hover:-translate-y-1">
        {/* 이미지 */}
        <div className="relative h-48 bg-[#0f0f18]">
          {article.image_url ? (
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                <span className="text-[#D4AF37] text-xl">♪</span>
              </div>
            </div>
          )}
          {/* 카테고리 배지 */}
          <div className="absolute top-3 left-3">
            <span className="bg-[#D4AF37] text-black text-xs font-bold px-2.5 py-1 rounded-full">
              {article.category}
            </span>
          </div>
        </div>

        {/* 내용 */}
        <div className="p-5">
          <h3 className="text-white font-bold text-base leading-snug mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>{date}</span>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.read_time}분 읽기
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
