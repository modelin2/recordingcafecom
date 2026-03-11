import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { getAdminClient } from "@/lib/supabaseAdmin";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "레코딩카페 매거진 | 데이트·음악·K-pop 체험 정보",
  description:
    "커플 이색 데이트, 음악 제작, K-pop 체험에 관한 실용적인 정보와 이야기. 레코딩카페 매거진에서 만나보세요.",
};

export const revalidate = 60;

const CATEGORIES = [
  { label: "전체", slug: "" },
  { label: "데이트", slug: "date" },
  { label: "음악", slug: "music" },
  { label: "크리에이터", slug: "creator" },
  { label: "관광", slug: "travel" },
  { label: "기술", slug: "tech" },
  { label: "창업", slug: "startup" },
];

type DBArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  category_slug: string;
  author: string;
  read_time: number;
  created_at: string;
  image_url: string | null;
};

async function getArticles(): Promise<DBArticle[]> {
  const db = getAdminClient();
  if (!db) return [];
  const { data } = await db
    .from("articles")
    .select("slug, title, excerpt, category, category_slug, author, read_time, created_at, image_url")
    .eq("published", true)
    .eq("site_id", "recordingcafe")
    .order("id", { ascending: false })
    .limit(60);
  return data ?? [];
}

export default async function MagazinePage() {
  const articles = await getArticles();
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAFAFA", fontFamily: "var(--font-dm-sans), sans-serif" }}>
      {/* 헤더 */}
      <div
        style={{
          backgroundColor: "#F0EFEB",
          borderBottom: "1px solid #D3D3D3",
          paddingTop: 96,
          paddingBottom: 64,
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#5F5F5F", marginBottom: 24 }}>
            <Link href="/" style={{ color: "#5F5F5F", textDecoration: "none" }} className="hover:underline">홈</Link>
            <span>›</span>
            <span>매거진</span>
          </nav>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#8B8675",
              marginBottom: 12,
            }}
          >
            Recording Café Magazine
          </div>
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              letterSpacing: -2,
              color: "#000000",
              marginBottom: 12,
              lineHeight: 1.1,
            }}
          >
            레코딩카페 매거진
          </h1>
          <p style={{ color: "#5F5F5F", fontSize: 16 }}>
            데이트, 음악, K-pop 체험에 관한 실용적인 정보
          </p>
        </div>
      </div>

      {/* 카테고리 탭 */}
      <div
        style={{
          borderBottom: "1px solid #D3D3D3",
          backgroundColor: "#FAFAFA",
          position: "sticky",
          top: 64,
          zIndex: 30,
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center overflow-x-auto gap-1 py-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.slug ? `/magazine?cat=${cat.slug}` : "/magazine"}
                style={{
                  padding: "10px 16px",
                  fontSize: 13,
                  color: "#5F5F5F",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  display: "block",
                }}
                className="hover:text-black"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {articles.length === 0 ? (
          <div style={{ textAlign: "center", paddingTop: 80, paddingBottom: 80 }}>
            <div style={{ fontSize: 48, color: "#8B8675", marginBottom: 16 }}>♪</div>
            <p style={{ color: "#5F5F5F", fontSize: 16 }}>아직 기사가 없습니다. 곧 업데이트될 예정입니다.</p>
          </div>
        ) : (
          <>
            {/* 피처드 기사 */}
            {featured && (
              <Link href={`/magazine/${featured.slug}`} className="group block" style={{ marginBottom: 48, textDecoration: "none" }}>
                <div
                  style={{
                    display: "grid",
                    border: "1px solid #D3D3D3",
                    overflow: "hidden",
                    backgroundColor: "#FAFAFA",
                    transition: "background-color 0.2s",
                  }}
                  className="grid lg:grid-cols-2 group-hover:[background-color:#F0EFEB]"
                >
                  <div style={{ position: "relative", minHeight: 280, backgroundColor: "#F0EFEB" }} className="aspect-video lg:aspect-auto">
                    {featured.image_url ? (
                      <Image
                        src={featured.image_url}
                        alt={featured.title}
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
                        <span style={{ fontSize: 64, color: "#8B8675" }}>♪</span>
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "32px 40px" }}>
                    <span
                      style={{
                        fontSize: 11,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: "#8B8675",
                        display: "inline-block",
                        marginBottom: 16,
                      }}
                    >
                      {featured.category}
                    </span>
                    <h2
                      style={{
                        fontSize: "clamp(22px, 3vw, 32px)",
                        fontWeight: 400,
                        letterSpacing: -1,
                        color: "#000000",
                        marginBottom: 12,
                        lineHeight: 1.3,
                      }}
                      className="line-clamp-3"
                    >
                      {featured.title}
                    </h2>
                    <p
                      style={{ color: "#5F5F5F", lineHeight: 1.75, marginBottom: 24, fontSize: 14 }}
                      className="line-clamp-3"
                    >
                      {featured.excerpt}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#8B8675" }}>
                      <span>{new Date(featured.created_at).toLocaleDateString("ko-KR")}</span>
                      <span>·</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Clock style={{ width: 12, height: 12 }} />
                        {featured.read_time}분 읽기
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* 나머지 기사 그리드 */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
