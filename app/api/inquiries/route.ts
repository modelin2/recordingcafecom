import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;
    if (!name || !email || !message) {
      return NextResponse.json({ error: "이름, 이메일, 문의 내용은 필수입니다." }, { status: 400 });
    }
    const db = getAdminClient();
    if (!db) return NextResponse.json({ error: "DB 오류" }, { status: 500 });
    const { error } = await db.from("rc_inquiries").insert({
      name, email, phone: phone ?? null, subject: subject ?? null, message,
      site_id: "recordingcafe", status: "pending",
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  if (req.headers.get("x-admin-token") !== "rc-admin-2025") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = getAdminClient();
  if (!db) return NextResponse.json({ error: "DB 오류" }, { status: 500 });
  const { data, error } = await db
    .from("rc_inquiries")
    .select("id, name, email, phone, subject, message, status, created_at")
    .eq("site_id", "recordingcafe")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}
