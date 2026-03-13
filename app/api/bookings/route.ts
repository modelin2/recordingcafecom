import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const db = getAdminClient();
    if (!db) return NextResponse.json({ error: "DB 연결 실패" }, { status: 500 });
    const { data, error } = await db
      .from("rc_bookings")
      .select("id, name, email, phone, booking_date, booking_time, booking_path, total_price, created_at")
      .eq("site_id", "recordingcafe")
      .order("id", { ascending: false })
      .limit(200);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("[bookings GET]", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name, phone, email,
      booking_date, booking_time,
      drinks, youtube_url,
      mixing_option, video_option,
      wants_album, wants_pro_album, wants_lp,
      total_price, platform, booking_path,
    } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "이름과 전화번호는 필수입니다." }, { status: 400 });
    }

    const db = getAdminClient();
    if (!db) return NextResponse.json({ error: "DB 연결 실패" }, { status: 500 });

    const { data, error } = await db
      .from("rc_bookings")
      .insert({
        name, phone, email: email || null,
        booking_date: booking_date || null,
        booking_time: booking_time || null,
        drinks: drinks || null,
        youtube_url: youtube_url || null,
        mixing_option: mixing_option || "basic",
        video_option: video_option || "self",
        wants_album: wants_album || false,
        wants_pro_album: wants_pro_album || false,
        wants_lp: wants_lp || false,
        total_price: total_price || 0,
        platform: platform || null,
        booking_path: booking_path || "homepage",
        status: "pending",
        site_id: "recordingcafe",
      })
      .select("id")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error("[bookings POST]", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
