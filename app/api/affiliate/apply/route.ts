import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseAdmin";

// 제휴 코드 자동 생성: 업체명 기반 슬러그 + 랜덤 4자리
function generateAffiliateCode(businessName: string): string {
  const slug = businessName
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 16);
  const rand = Math.random().toString(36).substring(2, 6);
  return `${slug}-${rand}`.replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").substring(0, 24);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessName, contactName, email, phone, websiteUrl, platformType, audienceSize, description } = body;

    if (!businessName || !contactName || !email || !phone || !platformType) {
      return NextResponse.json({ error: "필수 항목을 모두 입력해주세요." }, { status: 400 });
    }

    const db = getAdminClient();
    if (!db) return NextResponse.json({ error: "DB 연결 실패" }, { status: 500 });

    // 코드 생성 (승인 시 활성화됨 — 미리 생성해 놓기)
    const affiliateCode = generateAffiliateCode(businessName);

    const { error } = await db.from("rc_affiliates").insert({
      business_name: businessName,
      contact_name: contactName,
      email, phone: phone || null,
      website_url: websiteUrl || null,
      platform_type: platformType,
      audience_size: audienceSize || null,
      description: description || null,
      affiliate_code: affiliateCode,
      status: "pending",
      commission_rate: 20,
      site_id: "recordingcafe",
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, affiliateCode });
  } catch (err) {
    console.error("[affiliate apply POST]", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
