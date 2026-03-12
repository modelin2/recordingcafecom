import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseAdmin";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  try {
    const body = await req.json();
    const { customerName, customerPhone, customerEmail, serviceType, desiredDate, desiredTime, headcount, message } = body;

    if (!customerName || !customerPhone || !serviceType || !desiredDate) {
      return NextResponse.json({ error: "필수 항목을 모두 입력해주세요." }, { status: 400 });
    }

    const db = getAdminClient();
    if (!db) return NextResponse.json({ error: "DB 연결 실패" }, { status: 500 });

    // 제휴사 조회
    const { data: affiliate, error: affError } = await db
      .from("rc_affiliates")
      .select("id, commission_rate")
      .eq("affiliate_code", code)
      .eq("status", "approved")
      .single();

    if (affError || !affiliate) {
      return NextResponse.json({ error: "유효하지 않은 파트너 코드입니다." }, { status: 404 });
    }

    // 예약 삽입
    const { error: bookError } = await db.from("rc_affiliate_bookings").insert({
      affiliate_id: affiliate.id,
      affiliate_code: code,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail || null,
      service_type: serviceType,
      desired_date: desiredDate,
      desired_time: desiredTime || null,
      headcount: headcount || 1,
      message: message || null,
      status: "pending",
      site_id: "recordingcafe",
    });

    if (bookError) return NextResponse.json({ error: bookError.message }, { status: 500 });

    // 파트너 예약 수 업데이트
    await db
      .from("rc_affiliates")
      .update({ total_bookings: affiliate.id }) // trigger 없이 단순 카운트는 별도 처리
      .eq("id", affiliate.id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[affiliate book POST]", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
