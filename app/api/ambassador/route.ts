import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, channelName, channelUrl, platform, subscribers, contentType, message } = body;

    if (!name || !email || !channelName || !channelUrl || !platform) {
      return NextResponse.json({ error: "필수 항목을 모두 입력해주세요." }, { status: 400 });
    }

    const db = getAdminClient();
    if (!db) return NextResponse.json({ error: "DB 연결 실패" }, { status: 500 });

    const { error } = await db.from("rc_ambassador_applications").insert({
      name, email, phone: phone || null,
      channel_name: channelName, channel_url: channelUrl,
      platform, subscribers: subscribers || 0,
      content_type: contentType || null,
      message: message || null,
      status: "pending",
      site_id: "recordingcafe",
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ambassador POST]", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
