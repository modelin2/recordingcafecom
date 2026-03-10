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
    <div className="min-h-screen bg-[#050508]">
      {/* 헤더 */}
      <div className="bg-gradient-to-b from-[#0a0a0f] to-[#050508] border-b border-[#D4AF37]/10 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">홈</Link>
            <span>›</span>
            <span className="text-slate-300">매거진</span>
          </nav>
          <div className="text-[#D4AF37] text-xs font-mono uppercase tracking-widest mb-3">
            Recording Café Magazine
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            레코딩카페 <span className="gold-text">매거진</span>
          </h1>
          <p className="text-slate-400 text-lg">
            데이트, 음악, K-pop 체험에 관한 실용적인 정보
          </p>
        </div>
      </div>

      {/* 카테고리 탭 */}
      <div className="border-b border-white/5 bg-[#0a0a0f] sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center overflow-x-auto gap-1 py-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.slug ? `/magazine?cat=${cat.slug}` : "/magazine"}
                className="px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors text-slate-400 hover:text-[#D4AF37]"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">♪</div>
            <p className="text-slate-400 text-lg">아직 기사가 없습니다. 곧 업데이트될 예정입니다.</p>
          </div>
        ) : (
          <>
            {/* 피처드 기사 */}
            {featured && (
              <Link href={`/magazine/${featured.slug}`} className="group block mb-12">
                <div className="grid lg:grid-cols-2 gap-8 gold-card rounded-3xl overflow-hidden p-6 sm:p-8 hover:border-[#D4AF37]/40 transition-all">
                  <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-auto">
                    {featured.image_url ? (
                      <Image
                        src={featured.image_url}
                        alt={featured.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#D4AF37]/10 flex items-center justify-center">
                        <span className="text-6xl">♪</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="inline-block bg-[#D4AF37] text-black text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit">
                      {featured.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#D4AF37] transition-colors mb-3 leading-tight">
                      {featured.title}
                    </h2>
                    <p className="text-slate-400 leading-relaxed mb-6 line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>{new Date(featured.created_at).toLocaleDateString("ko-KR")}</span>
                      <span>·</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
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
