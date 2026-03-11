import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseAdmin";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  const { date } = await params;
  const db = getAdminClient();
  if (!db) return NextResponse.json({ bookedTimes: [] });

  const { data } = await db
    .from("rc_bookings")
    .select("booking_time")
    .eq("booking_date", date)
    .eq("site_id", "recordingcafe")
    .neq("status", "cancelled");

  const bookedTimes = (data ?? []).map((r: { booking_time: string }) => r.booking_time).filter(Boolean);
  return NextResponse.json({ bookedTimes });
}
