import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseAdmin";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getAdminClient();
  if (!db) return NextResponse.json({ error: "DB 연결 실패" }, { status: 500 });
  const { data, error } = await db
    .from("rc_performances")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .single();
  if (error || !data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item: data });
}
