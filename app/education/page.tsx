import Link from "next/link";
import { getAdminClient } from "@/lib/supabaseAdmin";

export const revalidate = 60;

type Education = {
  id: number;
  title: string;
  subtitle: string | null;
  category: string;
  image_url: string | null;
  instructor: string | null;
  start_date: string;
  end_date: string;
  schedule: string | null;
  total_sessions: number | null;
  price: string | null;
  max_participants: number | null;
  current_participants: number;
  status: string;
};

async function getEducation(): Promise<Education[]> {
  const db = getAdminClient();
  if (!db) return [];
  const { data } = await db
    .from("rc_education")
    .select("id, title, subtitle, category, image_url, instructor, start_date, end_date, schedule, total_sessions, price, max_participants, current_participants, status")
    .eq("is_published", true)
    .eq("site_id", "recordingcafe")
    .order("start_date", { ascending: true });
  return data ?? [];
}

const STATUS: Record<string, { label: string; color: string }> = {
  open:   { label: "수강신청 가능", color: "#22C55E" },
  closed: { label: "마감",          color: "#8B8675" },
};

const CAT_COLORS: Record<string, string> = {
  "교육":        "#D5B5F5",
  "워크샵":      "#F5D5B5",
  "마스터클래스": "#B5D5F5",
  "세미나":      "#F5B5C8",
};

export default async function EducationPage() {
  const items = await getEducation();
  const categories = ["전체", ...Array.from(new Set(items.map(i => i.category)))];

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#FAFAFA", color: "#5F5F5F" }}>

      {/* 헤더 */}
      <section style={{ background: "#F0EFEB", borderBottom: "1px solid #D3D3D3", padding: "120px 48px 64px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "16px" }}>
            Education Programs
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 400, color: "#000", letterSpacing: "-2px", lineHeight: 1.05 }}>
              교육
            </h1>
            <p style={{ fontSize: "16px", color: "#5F5F5F", maxWidth: "400px", lineHeight: 1.65 }}>
              음악·녹음·프로듀싱을 배울 수 있는 전문 교육 프로그램입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 필터 탭 */}
      <div style={{ background: "#FAFAFA", borderBottom: "1px solid #D3D3D3", position: "sticky", top: "64px", zIndex: 10 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", display: "flex", gap: "0", overflowX: "auto" }}>
          {categories.map((cat, i) => (
            <span key={cat} style={{
              padding: "16px 24px", fontSize: "13px", fontWeight: i === 0 ? 500 : 400,
              color: i === 0 ? "#000" : "#8B8675",
              borderBottom: i === 0 ? "2px solid #000" : "2px solid transparent",
              cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
            }}>{cat}</span>
          ))}
        </div>
      </div>

      {/* 목록 */}
      <section style={{ padding: "48px 48px 120px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "120px 0", border: "1px solid #D3D3D3" }}>
              <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "16px" }}>Coming Soon</p>
              <p style={{ fontSize: "20px", fontWeight: 400, color: "#D3D3D3" }}>예정된 교육 프로그램이 없습니다</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0", borderTop: "1px solid #D3D3D3" }}>
              {items.map((item) => {
                const st = STATUS[item.status] ?? STATUS.open;
                const catColor = CAT_COLORS[item.category] ?? "#D5B5F5";
                const isFull = item.max_participants && item.current_participants >= item.max_participants;
                const remaining = item.max_participants ? item.max_participants - item.current_participants : null;
                return (
                  <Link key={item.id} href={`/education/${item.id}`}
                    style={{ textDecoration: "none", borderBottom: "1px solid #D3D3D3", display: "flex", gap: "0", transition: "background 0.15s" }}>
                    {/* 썸네일 */}
                    <div style={{ width: "180px", minHeight: "140px", background: "#F0EFEB", flexShrink: 0, overflow: "hidden", position: "relative" }}>
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", inset: 0 }}>
                          <p style={{ fontSize: "10px", letterSpacing: "1px", color: "#D3D3D3", textTransform: "uppercase" }}>RC</p>
                        </div>
                      )}
                    </div>

                    {/* 본문 */}
                    <div style={{ flex: 1, padding: "28px 32px", display: "flex", gap: "32px", alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", padding: "3px 10px", background: catColor, color: "#000" }}>{item.category}</span>
                          <span style={{ fontSize: "12px", color: st.color, fontWeight: 500 }}>● {st.label}</span>
                        </div>
                        <h3 style={{ fontSize: "18px", fontWeight: 500, color: "#000", marginBottom: "6px", letterSpacing: "-0.3px" }}>{item.title}</h3>
                        {item.subtitle && <p style={{ fontSize: "14px", color: "#8B8675", marginBottom: "16px" }}>{item.subtitle}</p>}
                        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                          {item.instructor && <span style={{ fontSize: "13px", color: "#5F5F5F" }}>강사: {item.instructor}</span>}
                          {item.schedule && <span style={{ fontSize: "13px", color: "#5F5F5F" }}>{item.schedule}</span>}
                          {item.total_sessions && <span style={{ fontSize: "13px", color: "#5F5F5F" }}>{item.total_sessions}회</span>}
                        </div>
                      </div>

                      {/* 우측 정보 */}
                      <div style={{ textAlign: "right", flexShrink: 0, minWidth: "140px" }}>
                        <p style={{ fontSize: "13px", color: "#8B8675", marginBottom: "8px" }}>{item.start_date}</p>
                        {item.price && <p style={{ fontSize: "17px", fontWeight: 500, color: "#000", marginBottom: "8px" }}>{item.price}</p>}
                        {remaining !== null && (
                          <p style={{ fontSize: "12px", color: isFull ? "#B00" : "#22C55E" }}>
                            {isFull ? "마감" : `잔여 ${remaining}명`}
                          </p>
                        )}
                        <div style={{ marginTop: "16px", display: "inline-block", padding: "8px 20px", background: item.status === "open" ? "#000" : "#F0EFEB", color: item.status === "open" ? "#FAFAFA" : "#8B8675", fontSize: "13px", fontWeight: 500 }}>
                          {item.status === "open" ? "신청하기 →" : "마감"}
                        </div>
                      </div>
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
