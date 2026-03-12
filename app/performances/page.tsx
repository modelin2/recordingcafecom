import Link from "next/link";
import { getAdminClient } from "@/lib/supabaseAdmin";

export const revalidate = 60;

type Performance = {
  id: number;
  title: string;
  subtitle: string | null;
  category: string;
  image_url: string | null;
  start_date: string;
  end_date: string;
  venue: string | null;
  price: string | null;
  max_participants: number | null;
  current_participants: number;
  status: string;
};

async function getPerformances(): Promise<Performance[]> {
  const db = getAdminClient();
  if (!db) return [];
  const { data } = await db
    .from("rc_performances")
    .select("id, title, subtitle, category, image_url, start_date, end_date, venue, price, max_participants, current_participants, status")
    .eq("is_published", true)
    .eq("site_id", "recordingcafe")
    .order("start_date", { ascending: true });
  return data ?? [];
}

const STATUS_LABEL: Record<string, { label: string; color: string; bg: string }> = {
  open:      { label: "접수중",  color: "#fff",     bg: "#000" },
  closed:    { label: "마감",    color: "#FAFAFA",  bg: "#8B8675" },
  cancelled: { label: "취소",    color: "#FAFAFA",  bg: "#B00" },
};

const CATEGORY_COLORS: Record<string, string> = {
  "공연": "#DFCF99",
  "콘서트": "#B5D5F5",
  "뮤지컬": "#F5B5C8",
  "렉처콘서트": "#B5F5D5",
  "교육": "#D5B5F5",
};

export default async function PerformancesPage() {
  const items = await getPerformances();

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#0A0A0A", color: "#FAFAFA", minHeight: "100vh" }}>

      {/* 헤더 */}
      <section style={{ padding: "120px 48px 72px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "16px" }}>
            Performances
          </p>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 400, color: "#FAFAFA", letterSpacing: "-2px", lineHeight: 1.05, marginBottom: "24px" }}>
            공연
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(250,250,250,0.5)", maxWidth: "480px", lineHeight: 1.65 }}>
            레코딩카페 스튜디오에서 열리는 공연 · 콘서트 · 렉처콘서트를 만나보세요.
          </p>
        </div>
      </section>

      {/* 목록 */}
      <section style={{ padding: "64px 48px 120px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "120px 0" }}>
              <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "16px" }}>Coming Soon</p>
              <p style={{ fontSize: "24px", fontWeight: 400, color: "rgba(250,250,250,0.4)", letterSpacing: "-0.5px" }}>예정된 공연이 없습니다</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" style={{ gap: "0", borderLeft: "1px solid rgba(255,255,255,0.08)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {items.map((item) => {
                const status = STATUS_LABEL[item.status] ?? STATUS_LABEL.open;
                const catColor = CATEGORY_COLORS[item.category] ?? "#DFCF99";
                return (
                  <Link key={item.id} href={`/performances/${item.id}`}
                    style={{ display: "block", textDecoration: "none", borderRight: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    {/* 포스터 이미지 */}
                    <div style={{ position: "relative", paddingBottom: "140%", background: "#1A1A1A", overflow: "hidden" }}>
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.title}
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} />
                      ) : (
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <p style={{ fontSize: "11px", letterSpacing: "2px", color: "#3A3A3A", textTransform: "uppercase" }}>No Image</p>
                        </div>
                      )}
                      {/* 상태 배지 */}
                      <div style={{ position: "absolute", top: "16px", left: "16px" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", padding: "4px 10px", background: status.bg, color: status.color }}>
                          {status.label}
                        </span>
                      </div>
                    </div>
                    {/* 텍스트 */}
                    <div style={{ padding: "20px 20px 28px" }}>
                      <p style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: catColor, marginBottom: "10px" }}>{item.category}</p>
                      <h3 style={{ fontSize: "15px", fontWeight: 500, color: "#FAFAFA", lineHeight: 1.35, marginBottom: "12px", letterSpacing: "-0.2px" }}>{item.title}</h3>
                      <p style={{ fontSize: "12px", color: "rgba(250,250,250,0.4)", letterSpacing: "0.3px" }}>
                        {item.start_date} – {item.end_date}
                      </p>
                      {item.price && (
                        <p style={{ fontSize: "13px", fontWeight: 500, color: "#DFCF99", marginTop: "10px" }}>{item.price}</p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
