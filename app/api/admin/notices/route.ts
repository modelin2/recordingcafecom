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
    .from("rc_notices")
    .select("id, title, content, category, is_pinned, is_published, created_at")
    .eq("site_id", "recordingcafe")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getAdminClient();
  if (!db) return NextResponse.json({ error: "DB 오류" }, { status: 500 });
  const body = await req.json();
  const { title, content, category, is_pinned } = body;
  if (!title) return NextResponse.json({ error: "제목은 필수입니다." }, { status: 400 });
  const { data, error } = await db
    .from("rc_notices")
    .insert({ title, content: content ?? "", category: category ?? "공지", is_pinned: is_pinned ?? false, is_published: true, site_id: "recordingcafe" })
    .select("id")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, id: data.id });
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getAdminClient();
  if (!db) return NextResponse.json({ error: "DB 오류" }, { status: 500 });
  const body = await req.json();
  const { id, ...updates } = body;
  const { error } = await db.from("rc_notices").update(updates).eq("id", id).eq("site_id", "recordingcafe");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getAdminClient();
  if (!db) return NextResponse.json({ error: "DB 오류" }, { status: 500 });
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id 필요" }, { status: 400 });
  const { error } = await db.from("rc_notices").delete().eq("id", id).eq("site_id", "recordingcafe");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
