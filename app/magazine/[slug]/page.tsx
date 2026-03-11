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

  const hasImage = !!dbArticle.image_url;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAFAFA" }}>
      {/* 히어로 */}
      <div style={{ position: "relative", height: 480, width: "100%" }}>
        {hasImage ? (
          <>
            <Image
              src={dbArticle.image_url}
              alt={dbArticle.title}
              fill
              style={{ objectFit: "cover", filter: "grayscale(40%) brightness(0.4)" }}
              priority
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, #050508 0%, rgba(5,5,8,0.5) 60%, transparent 100%)",
              }}
            />
          </>
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#F0EFEB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 96, color: "#D3D3D3" }}>♪</span>
          </div>
        )}

        <div
          style={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingBottom: 40,
            maxWidth: 896,
            margin: "0 auto",
            padding: "0 16px 40px",
          }}
        >
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: hasImage ? "rgba(255,255,255,0.7)" : "#5F5F5F",
              marginBottom: 24,
            }}
          >
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }} className="hover:underline">홈</Link>
            <span>›</span>
            <Link href="/magazine" style={{ color: "inherit", textDecoration: "none" }} className="hover:underline">매거진</Link>
            <span>›</span>
            <span>{dbArticle.category}</span>
          </nav>
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: hasImage ? "#C8BEA8" : "#8B8675",
              marginBottom: 16,
            }}
          >
            {dbArticle.category}
          </span>
          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 400,
              letterSpacing: -1,
              color: hasImage ? "#ffffff" : "#000000",
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            {dbArticle.title}
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              color: hasImage ? "rgba(255,255,255,0.6)" : "#5F5F5F",
            }}
          >
            <span>{dbArticle.author}</span>
            <span>·</span>
            <span>{new Date(dbArticle.created_at).toLocaleDateString("ko-KR")}</span>
            {dbArticle.read_time && (
              <>
                <span>·</span>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Clock style={{ width: 14, height: 14 }} />
                  {dbArticle.read_time}분 읽기
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "64px 16px 48px",
          backgroundColor: "#FAFAFA",
        }}
      >
        {/* 리드 */}
        <p
          style={{
            fontSize: 18,
            color: "#5F5F5F",
            lineHeight: 1.75,
            fontStyle: "italic",
            borderBottom: "1px solid #D3D3D3",
            paddingBottom: 40,
            marginBottom: 40,
          }}
        >
          {dbArticle.excerpt}
        </p>

        {/* 본문 HTML */}
        <div
          className="prose-archdeco"
          dangerouslySetInnerHTML={{ __html: dbArticle.content ?? "" }}
        />

        {/* 태그 */}
        {dbArticle.tags?.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 48,
              paddingTop: 32,
              borderTop: "1px solid #D3D3D3",
            }}
          >
            {(dbArticle.tags as string[]).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 12,
                  padding: "4px 12px",
                  border: "1px solid #D3D3D3",
                  color: "#5F5F5F",
                  backgroundColor: "#FAFAFA",
                }}
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
          style={{ display: "block", marginTop: 40, textDecoration: "none" }}
          className="group"
        >
          <div
            style={{
              backgroundColor: "#F0EFEB",
              border: "1px solid #D3D3D3",
              padding: "24px 32px",
              display: "flex",
              alignItems: "center",
              gap: 24,
              transition: "border-color 0.2s",
            }}
            className="group-hover:border-[#8B8675]"
          >
            <div
              style={{
                width: 56,
                height: 56,
                backgroundColor: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ color: "#ffffff", fontWeight: 700, fontSize: 14, letterSpacing: 1 }}>RC</span>
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#8B8675",
                  marginBottom: 4,
                }}
              >
                Recording Café
              </p>
              <h3 style={{ color: "#000000", fontWeight: 500, fontSize: 16, marginBottom: 4 }}>
                우리만의 노래를 만들어볼까요?
              </h3>
              <p style={{ color: "#5F5F5F", fontSize: 13 }}>
                커플 이색 데이트 · 전문 녹음 스튜디오 · 지금 예약하기
              </p>
            </div>
            <span
              style={{
                flexShrink: 0,
                backgroundColor: "#000000",
                color: "#ffffff",
                fontSize: 13,
                fontWeight: 500,
                padding: "10px 20px",
                display: "inline-block",
              }}
            >
              예약 문의 →
            </span>
          </div>
        </a>

        {/* 뒤로 가기 */}
        <div style={{ marginTop: 40 }}>
          <Link
            href="/magazine"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#5F5F5F",
              fontSize: 13,
              textDecoration: "none",
            }}
            className="hover:text-black"
          >
            <ArrowLeft style={{ width: 16, height: 16 }} />
            매거진으로 돌아가기
          </Link>
        </div>
      </div>

      {/* 관련 기사 */}
      {related.length > 0 && (
        <section
          style={{
            backgroundColor: "#F0EFEB",
            borderTop: "1px solid #D3D3D3",
            paddingTop: 48,
            paddingBottom: 48,
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2
              style={{
                fontSize: 20,
                fontWeight: 400,
                color: "#000000",
                letterSpacing: -0.5,
                marginBottom: 24,
              }}
            >
              더 읽을거리
            </h2>
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
