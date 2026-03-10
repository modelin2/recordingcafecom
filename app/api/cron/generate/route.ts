import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getAdminClient } from "@/lib/supabaseAdmin";
import { generateArticleImage } from "@/lib/geminiImage";
import { uploadArticleImage } from "@/lib/supabaseAdmin";
import { KEYWORD_POOL } from "@/lib/keywords";
import { DEFAULT_ARTICLE_PROMPT } from "@/lib/articlePrompt";

export const maxDuration = 300;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const CATEGORY_MAP: Record<string, string> = {
  "데이트": "date",
  "음악": "music",
  "크리에이터": "creator",
  "관광": "travel",
  "기술": "tech",
  "창업": "startup",
};

function generateSlug(title: string, categorySlug: string): string {
  const date = new Date().toISOString().slice(0, 10);
  const rand = Math.random().toString(36).slice(2, 6);
  const clean = title
    .toLowerCase()
    .replace(/[가-힣]+/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 30);
  return `${clean || categorySlug}-${date}-${rand}`;
}

function estimateReadTime(content: string): number {
  return Math.max(3, Math.ceil(content.replace(/<[^>]+>/g, "").length / 2 / 400));
}

function extractSection(text: string, tag: string): string {
  const match = text.match(new RegExp(`\\[${tag}\\]([\\s\\S]*?)\\[\\/${tag}\\]`));
  return match ? match[1].trim() : "";
}

function pickKeyword(
  usedTitles: string[],
  categoryCounts: Record<string, number>
): { keyword: string; category: string } {
  const sortedCategories = Object.entries(categoryCounts).sort((a, b) => a[1] - b[1]);
  for (const [category] of sortedCategories) {
    const candidates = KEYWORD_POOL.filter(
      (k) =>
        k.category === category &&
        !usedTitles.some((t) => t.includes(k.keyword.slice(0, 10).toLowerCase()))
    );
    if (candidates.length > 0) {
      return candidates[Math.floor(Math.random() * candidates.length)];
    }
  }
  return KEYWORD_POOL[Math.floor(Math.random() * KEYWORD_POOL.length)];
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getAdminClient();
  if (!db) return NextResponse.json({ error: "DB 연결 실패" }, { status: 500 });

  try {
    const { data: existingArticles } = await db
      .from("articles")
      .select("title, category")
      .eq("published", true)
      .eq("site_id", "recordingcafe");

    const usedTitles = (existingArticles ?? []).map((a: { title: string }) => a.title.toLowerCase());
    const categoryCounts: Record<string, number> = {};
    for (const cat of Object.keys(CATEGORY_MAP)) categoryCounts[cat] = 0;
    for (const a of existingArticles ?? []) {
      if (a.category in categoryCounts) categoryCounts[a.category]++;
    }

    const dailyCount = 2;
    const results = [];

    for (let i = 0; i < dailyCount; i++) {
      try {
        const { keyword, category } = pickKeyword(usedTitles, categoryCounts);
        const categorySlug = CATEGORY_MAP[category] ?? "date";

        const promptContent = DEFAULT_ARTICLE_PROMPT
          .replace(/\{\{keyword\}\}/g, keyword)
          .replace(/\{\{category\}\}/g, category);

        const message = await anthropic.messages.create({
          model: "claude-sonnet-4-6",
          max_tokens: 4096,
          messages: [{ role: "user", content: promptContent }],
        });

        const raw = message.content[0].type === "text" ? message.content[0].text : "";
        const title = extractSection(raw, "TITLE");
        const excerpt = extractSection(raw, "EXCERPT");
        const meta_description = extractSection(raw, "META");
        const tags = extractSection(raw, "TAGS").split(",").map((t) => t.trim()).filter(Boolean);
        const content = extractSection(raw, "CONTENT");

        if (!title || !content) continue;

        // 이미지 생성
        let image_url: string | null = null;
        try {
          const imgResult = await generateArticleImage(keyword, title, category, categorySlug, excerpt);
          if (imgResult) {
            const publicUrl = await uploadArticleImage(imgResult.imageBase64, imgResult.filename);
            if (publicUrl) image_url = publicUrl;
          }
        } catch (imgErr) {
          console.error("[cron] 이미지 생성 실패:", imgErr);
        }

        const slug = generateSlug(title, categorySlug);
        const today = new Date().toISOString().slice(0, 10);

        const { data: article, error } = await db
          .from("articles")
          .insert({
            slug, title, excerpt, content, meta_description,
            category, category_slug: categorySlug, tags,
            author: "편집부",
            read_time: estimateReadTime(content),
            featured: false, published: true,
            created_at: today, image_url,
            site_id: "recordingcafe",
          })
          .select("id, title")
          .single();

        if (error) throw new Error(error.message);

        usedTitles.push(title.toLowerCase());
        categoryCounts[category] = (categoryCounts[category] ?? 0) + 1;
        results.push({ id: article.id, title: article.title, keyword, image_url });
      } catch (e) {
        console.error("[cron] 기사 생성 오류:", e);
      }
    }

    return NextResponse.json({ success: true, generated: results.length, articles: results });
  } catch (err) {
    console.error("[cron/generate]", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
