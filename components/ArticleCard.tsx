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
      <div
        style={{
          backgroundColor: "#FAFAFA",
          border: "1px solid #D3D3D3",
          borderRadius: 0,
          overflow: "hidden",
          transition: "background-color 0.2s",
        }}
        className="group-hover:[background-color:#F0EFEB]"
      >
        {/* 이미지 */}
        <div style={{ position: "relative", height: 220, backgroundColor: "#F0EFEB" }}>
          {article.image_url ? (
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#8B8675", fontSize: 36 }}>♪</span>
            </div>
          )}
        </div>

        {/* 내용 */}
        <div style={{ padding: "16px 20px 20px" }}>
          {/* 카테고리 레이블 */}
          <div
            style={{
              fontSize: 11,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#8B8675",
              marginBottom: 8,
            }}
          >
            {article.category}
          </div>
          <h3
            style={{
              color: "#000000",
              fontWeight: 500,
              fontSize: 15,
              lineHeight: 1.4,
              marginBottom: 8,
            }}
            className="line-clamp-2"
          >
            {article.title}
          </h3>
          <p
            style={{
              color: "#5F5F5F",
              fontSize: 13,
              lineHeight: 1.75,
              marginBottom: 16,
            }}
            className="line-clamp-2"
          >
            {article.excerpt}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#8B8675", fontSize: 12 }}>
            <span>{date}</span>
            <span>·</span>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Clock style={{ width: 12, height: 12 }} />
              {article.read_time}분 읽기
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
