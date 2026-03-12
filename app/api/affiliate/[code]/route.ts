import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseAdmin";

// GET /api/affiliate/[code] — 제휴사 정보 조회 (승인된 것만)
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  try {
    const db = getAdminClient();
    if (!db) return NextResponse.json({ error: "DB 연결 실패" }, { status: 500 });

    const { data, error } = await db
      .from("rc_affiliates")
      .select("id, business_name, affiliate_code, commission_rate")
      .eq("affiliate_code", code)
      .eq("status", "approved")
      .single();

    if (error || !data) return NextResponse.json({ error: "파트너를 찾을 수 없습니다." }, { status: 404 });
    return NextResponse.json({ affiliate: data });
  } catch (err) {
    console.error("[affiliate GET]", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
