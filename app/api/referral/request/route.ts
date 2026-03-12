import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseAdmin";

function generateCode(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .substring(0, 6) || "ref";
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${slug}${rand}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "이름과 이메일을 입력해주세요." }, { status: 400 });
    }

    const db = getAdminClient();
    if (!db) return NextResponse.json({ error: "DB 연결 실패" }, { status: 500 });

    // 기존 코드 조회 (동일 이메일)
    const { data: existing } = await db
      .from("rc_referral_codes")
      .select("code, referred_count")
      .eq("member_email", email.toLowerCase())
      .eq("site_id", "recordingcafe")
      .single();

    if (existing) {
      return NextResponse.json({ code: existing.code, referred_count: existing.referred_count });
    }

    // 신규 발급
    const code = generateCode(name);
    const { data, error } = await db
      .from("rc_referral_codes")
      .insert({
        code,
        member_name: name,
        member_email: email.toLowerCase(),
        site_id: "recordingcafe",
      })
      .select("code, referred_count")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ code: data.code, referred_count: data.referred_count });
  } catch (err) {
    console.error("[referral request POST]", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
