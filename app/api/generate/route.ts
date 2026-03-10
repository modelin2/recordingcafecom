import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getAdminClient } from "@/lib/supabaseAdmin";
import { DEFAULT_ARTICLE_PROMPT } from "@/lib/articlePrompt";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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

const CATEGORY_MAP: Record<string, string> = {
  "데이트": "date",
  "음악": "music",
  "크리에이터": "creator",
  "관광": "travel",
  "기술": "tech",
  "창업": "startup",
};

export async function POST(req: NextRequest) {
  try {
    const { keyword, category = "데이트", customPrompt } = await req.json();

    if (!keyword) {
      return NextResponse.json({ error: "keyword is required" }, { status: 400 });
    }

    const promptTemplate = (customPrompt as string) || DEFAULT_ARTICLE_PROMPT;
    const promptContent = promptTemplate
      .replace(/\{\{keyword\}\}/g, keyword)
      .replace(/\{\{category\}\}/g, category);

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      messages: [{ role: "user", content: promptContent }],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "";

    function extractSection(text: string, tag: string): string {
      const match = text.match(new RegExp(`\\[${tag}\\]([\\s\\S]*?)\\[\\/${tag}\\]`));
      return match ? match[1].trim() : "";
    }

    const title = extractSection(raw, "TITLE");
    const excerpt = extractSection(raw, "EXCERPT");
    const meta_description = extractSection(raw, "META");
    const tagsRaw = extractSection(raw, "TAGS");
    const content = extractSection(raw, "CONTENT");
    const tags = tagsRaw.split(",").map((t) => t.trim()).filter(Boolean);

    if (!title || !content) {
      return NextResponse.json({ error: "AI 응답 파싱 실패", raw }, { status: 500 });
    }

    const categorySlug = CATEGORY_MAP[category] ?? "date";
    const slug = generateSlug(title, categorySlug);
    const readTime = estimateReadTime(content);
    const today = new Date().toISOString().slice(0, 10);

    const db = getAdminClient();
    if (!db) {
      return NextResponse.json({ error: "DB 클라이언트 초기화 실패" }, { status: 500 });
    }

    const { data, error } = await db
      .from("articles")
      .insert({
        slug,
        title,
        excerpt,
        content,
        meta_description,
        category,
        category_slug: categorySlug,
        tags,
        author: "편집부",
        read_time: readTime,
        featured: false,
        published: true,
        created_at: today,
        image_url: null,
        site_id: "recordingcafe",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, article: data, keyword });
  } catch (err) {
    console.error("[generate]", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
