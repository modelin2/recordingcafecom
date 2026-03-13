import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseAdmin";

function checkAuth(req: NextRequest) {
  return req.headers.get("x-admin-token") === "rc-admin-2025";
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getAdminClient();
  if (!db) return NextResponse.json({ error: "DB 오류" }, { status: 500 });
  const { data, error } = await db
    .from("rc_press")
    .select("id, title, media_name, media_url, summary, published_date, is_published")
    .eq("site_id", "recordingcafe")
    .order("published_date", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getAdminClient();
  if (!db) return NextResponse.json({ error: "DB 오류" }, { status: 500 });
  const body = await req.json();
  const { title, media_name, media_url, summary, published_date } = body;
  if (!title || !media_name) return NextResponse.json({ error: "제목과 매체명은 필수입니다." }, { status: 400 });
  const { data, error } = await db
    .from("rc_press")
    .insert({ title, media_name, media_url: media_url ?? null, summary: summary ?? null, published_date: published_date ?? null, is_published: true, site_id: "recordingcafe" })
    .select("id").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, id: data.id });
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getAdminClient();
  if (!db) return NextResponse.json({ error: "DB 오류" }, { status: 500 });
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id 필요" }, { status: 400 });
  const { error } = await db.from("rc_press").delete().eq("id", id).eq("site_id", "recordingcafe");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
