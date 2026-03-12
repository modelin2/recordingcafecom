import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { programType, programId, programTitle, name, phone, email, headcount, message } = body;
    if (!name || !phone || !programTitle) {
      return NextResponse.json({ error: "필수 항목을 입력해주세요." }, { status: 400 });
    }
    const db = getAdminClient();
    if (!db) return NextResponse.json({ error: "DB 연결 실패" }, { status: 500 });
    const { error } = await db.from("rc_program_applications").insert({
      program_type: programType, program_id: programId ?? null,
      program_title: programTitle, name, phone,
      email: email || null, headcount: headcount || 1,
      message: message || null, status: "pending",
      site_id: "recordingcafe",
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[program-apply POST]", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
