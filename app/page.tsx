import HeroSection from "@/components/HeroSection";
import CoupleDateSection from "@/components/CoupleDateSection";
import ServicesSection from "@/components/ServicesSection";
import SpaceGallerySection from "@/components/SpaceGallerySection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import ArticleCard from "@/components/ArticleCard";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { getAdminClient } from "@/lib/supabaseAdmin";

export const revalidate = 60;

async function getLatestArticles() {
  const db = getAdminClient();
  if (!db) return [];
  const { data } = await db
    .from("articles")
    .select("slug, title, excerpt, category, category_slug, read_time, created_at, image_url")
    .eq("published", true)
    .eq("site_id", "recordingcafe")
    .order("id", { ascending: false })
    .limit(3);
  return data ?? [];
}

export default async function Home() {
  const latestArticles = await getLatestArticles();

  return (
    <>
      <HeroSection />
      <CoupleDateSection />
      <ServicesSection />
      <SpaceGallerySection />
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsSection />
      <CtaSection />

      {/* 매거진 섹션 */}
      {latestArticles.length > 0 && (
        <section className="py-24 bg-[#0a0a0f] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <ScrollReveal animation="fade-up" duration={700}>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <div className="text-[#D4AF37] text-sm font-mono uppercase tracking-widest mb-3">— Magazine</div>
                  <h2 className="text-4xl font-black text-white">
                    레코딩카페 <span className="gold-text">매거진</span>
                  </h2>
                  <p className="text-slate-400 mt-2">
                    데이트, 음악, K-pop 체험에 관한 실용적인 정보
                  </p>
                </div>
                <Link
                  href="/magazine"
                  className="inline-flex items-center gap-2 glass-dark text-slate-300 hover:text-[#D4AF37] px-5 py-2.5 rounded-xl text-sm font-medium transition-all self-start sm:self-auto"
                >
                  매거진 더 보기 →
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((article, i) => (
                <ScrollReveal key={article.slug} animation="fade-up" delay={i * 100} duration={650}>
                  <ArticleCard article={article} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
