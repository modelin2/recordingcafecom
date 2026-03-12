import { getAdminClient } from "@/lib/supabaseAdmin";

export const revalidate = 60;

type Press = {
  id: number;
  title: string;
  media_name: string;
  media_url: string | null;
  summary: string | null;
  published_date: string | null;
};

async function getPress(): Promise<Press[]> {
  const db = getAdminClient();
  if (!db) return [];
  const { data } = await db
    .from("rc_press")
    .select("id, title, media_name, media_url, summary, published_date")
    .eq("is_published", true)
    .eq("site_id", "recordingcafe")
    .order("published_date", { ascending: false });
  return data ?? [];
}

export default async function PressPage() {
  const items = await getPress();

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif", background: "#FAFAFA", color: "#5F5F5F" }}>
      <section style={{ background: "#F0EFEB", borderBottom: "1px solid #D3D3D3", padding: "120px 48px 64px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "16px" }}>Press</p>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 400, color: "#000", letterSpacing: "-2px" }}>언론보도</h1>
        </div>
      </section>

      <section style={{ padding: "48px 48px 120px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", border: "1px solid #D3D3D3" }}>
              <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "16px" }}>Coming Soon</p>
              <p style={{ fontSize: "15px", color: "#D3D3D3" }}>등록된 언론보도가 없습니다.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid #D3D3D3" }}>
              {items.map((item) => (
                <div key={item.id} style={{ borderBottom: "1px solid #D3D3D3", padding: "32px 0", display: "flex", gap: "32px", alignItems: "flex-start" }}>
                  <div style={{ minWidth: "120px" }}>
                    <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "#8B8675", marginBottom: "4px" }}>Press</p>
                    <p style={{ fontSize: "14px", fontWeight: 500, color: "#1A1A1A" }}>{item.media_name}</p>
                    {item.published_date && <p style={{ fontSize: "12px", color: "#8B8675", marginTop: "4px" }}>{item.published_date}</p>}
                  </div>
                  <div style={{ flex: 1 }}>
                    {item.media_url ? (
                      <a href={item.media_url} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: "17px", fontWeight: 400, color: "#000", textDecoration: "none", display: "block", marginBottom: "10px", lineHeight: 1.4 }}
                        onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                        onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}>
                        {item.title} ↗
                      </a>
                    ) : (
                      <p style={{ fontSize: "17px", color: "#1A1A1A", marginBottom: "10px" }}>{item.title}</p>
                    )}
                    {item.summary && <p style={{ fontSize: "14px", color: "#5F5F5F", lineHeight: 1.65 }}>{item.summary}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
