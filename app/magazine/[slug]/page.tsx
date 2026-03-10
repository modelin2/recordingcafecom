import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowLeft } from "lucide-react";
import { getAdminClient } from "@/lib/supabaseAdmin";
import ArticleCard from "@/components/ArticleCard";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const db = getAdminClient();
  if (!db) return {};
  const { data } = await db
    .from("articles")
    .select("title, excerpt, image_url")
    .eq("slug", slug)
    .eq("site_id", "recordingcafe")
    .single();
  if (!data) return {};
  return {
    title: `${data.title} | 레코딩카페 매거진`,
    description: data.excerpt,
    openGraph: {
      title: data.title,
      description: data.excerpt,
      images: data.image_url ? [{ url: data.image_url, width: 1280, height: 720 }] : [],
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const db = getAdminClient();
  const { data: dbArticle } = db
    ? await db.from("articles").select("*").eq("slug", slug).eq("site_id", "recordingcafe").single()
    : { data: null };

  if (!dbArticle || !dbArticle.published) notFound();

  // 관련 기사
  let related: { slug: string; title: string; excerpt: string; category: string; created_at: string; image_url?: string | null | undefined; read_time: number; category_slug: string }[] = [];
  if (db) {
    const { data: relatedDb } = await db
      .from("articles")
      .select("slug, title, excerpt, category, category_slug, created_at, image_url, read_time")
      .eq("published", true)
      .eq("site_id", "recordingcafe")
      .neq("slug", slug)
      .order("created_at", { ascending: false })
      .limit(3);
    related = relatedDb ?? [];
  }

  return (
    <div className="min-h-screen bg-[#050508]">
      {/* 히어로 */}
      <div className="relative h-[480px] w-full">
        {dbArticle.image_url ? (
          <>
            <Image
              src={dbArticle.image_url}
              alt={dbArticle.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-[#050508]/20" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f18] via-[#1a1a2e] to-[#050508]">
            <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-10">♪</div>
          </div>
        )}

        {/* 골드 빛 */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl" />

        <div className="relative h-full flex flex-col justify-end pb-10 max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">홈</Link>
            <span>›</span>
            <Link href="/magazine" className="hover:text-[#D4AF37] transition-colors">매거진</Link>
            <span>›</span>
            <span className="text-slate-300">{dbArticle.category}</span>
          </nav>
          <span className="inline-block bg-[#D4AF37] text-black text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit">
            {dbArticle.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
            {dbArticle.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <span>{dbArticle.author}</span>
            <span>·</span>
            <span>{new Date(dbArticle.created_at).toLocaleDateString("ko-KR")}</span>
            {dbArticle.read_time && (
              <>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {dbArticle.read_time}분 읽기
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* 리드 */}
        <p className="text-xl text-slate-300 leading-relaxed mb-10 pb-10 border-b border-[#D4AF37]/20 italic">
          {dbArticle.excerpt}
        </p>

        {/* 본문 HTML */}
        <div
          className="prose-dark"
          dangerouslySetInnerHTML={{ __html: dbArticle.content ?? "" }}
        />

        {/* 태그 */}
        {dbArticle.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/5">
            {(dbArticle.tags as string[]).map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* 레코딩카페 CTA 배너 */}
        <a
          href="https://talk.naver.com/ct/wu2kkmv"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-10 rounded-2xl overflow-hidden group"
        >
          <div className="relative bg-gradient-to-r from-[#0a0a0f] to-[#1a1a2e] border border-[#D4AF37]/30 p-6 sm:p-8 hover:border-[#D4AF37]/60 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                🎤
              </div>
              <div className="flex-1">
                <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-1">Recording Café</p>
                <h3 className="text-white font-bold text-lg mb-1">
                  우리만의 노래를 만들어볼까요?
                </h3>
                <p className="text-slate-400 text-sm">
                  커플 이색 데이트 · 전문 녹음 스튜디오 · 지금 예약하기
                </p>
              </div>
              <span className="flex-shrink-0 bg-[#D4AF37] text-black text-sm font-bold px-5 py-2.5 rounded-xl group-hover:bg-[#F0D060] transition-colors">
                예약 문의 →
              </span>
            </div>
          </div>
        </a>

        {/* 뒤로 가기 */}
        <div className="mt-10">
          <Link
            href="/magazine"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-[#D4AF37] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            매거진으로 돌아가기
          </Link>
        </div>
      </div>

      {/* 관련 기사 */}
      {related.length > 0 && (
        <section className="border-t border-white/5 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-black text-white mb-6">더 읽을거리</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
