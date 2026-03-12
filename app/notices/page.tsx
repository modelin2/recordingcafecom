import { getAdminClient } from "@/lib/supabaseAdmin";

export const revalidate = 60;

type Notice = {
  id: number;
  title: string;
  category: string;
  is_pinned: boolean;
  created_at: string;
};

async function getNotices(): Promise<Notice[]> {
  const db = getAdminClient();
  if (!db) return [];
  const { data } = await db
    .from("rc_notices")
    .select("id, title, category, is_pinned, created_at")
    .eq("is_published", true)
    .eq("site_id", "recordingcafe")
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });
  return data ?? [];
}

const CAT_COLORS: Record<string, string> = {
  "공지":    "#000",
  "이벤트":  "#8B5CF6",
  "운영안내": "#0EA5E9",
};

export default async function NoticesPage() {
  const items = await getNotices();

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#FAFAFA", color: "#5F5F5F" }}>
      <section style={{ background: "#F0EFEB", borderBottom: "1px solid #D3D3D3", padding: "120px 48px 64px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "16px" }}>Notices</p>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 400, color: "#000", letterSpacing: "-2px" }}>공지사항</h1>
        </div>
      </section>

      <section style={{ padding: "48px 48px 120px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", border: "1px solid #D3D3D3" }}>
              <p style={{ fontSize: "15px", color: "#D3D3D3" }}>등록된 공지사항이 없습니다.</p>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", borderTop: "2px solid #000" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #D3D3D3" }}>
                  {["분류", "제목", "날짜"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "#8B8675" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((n) => (
                  <tr key={n.id} style={{ borderBottom: "1px solid #D3D3D3" }}>
                    <td style={{ padding: "16px", width: "100px" }}>
                      <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", padding: "3px 10px", background: CAT_COLORS[n.category] ?? "#8B8675", color: "#FAFAFA" }}>
                        {n.category}
                      </span>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ fontSize: "15px", color: "#1A1A1A" }}>
                        {n.is_pinned && <span style={{ color: "#000", fontWeight: 700, marginRight: "8px" }}>📌</span>}
                        {n.title}
                      </span>
                    </td>
                    <td style={{ padding: "16px", fontSize: "13px", color: "#8B8675", whiteSpace: "nowrap" }}>
                      {n.created_at?.slice(0, 10)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
