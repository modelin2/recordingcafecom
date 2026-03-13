import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { company, name, email, phone, type, proposal } = body;
    if (!company || !name || !email) {
      return NextResponse.json({ error: "업체명, 담당자명, 이메일은 필수입니다." }, { status: 400 });
    }
    const db = getAdminClient();
    if (!db) return NextResponse.json({ error: "DB 오류" }, { status: 500 });
    const { error } = await db.from("rc_partnerships").insert({
      company, name, email, phone: phone ?? null, type: type ?? "기타", proposal: proposal ?? null,
      site_id: "recordingcafe",
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
