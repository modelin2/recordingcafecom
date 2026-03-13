"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const ADMIN_PASSWORD = "0060alsdk!";
const COOKIE_NAME = "rc_admin_auth";
const ADMIN_TOKEN = "rc-admin-2025";

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[2]) : null;
}
function setCookie(name: string, value: string, days: number) {
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${new Date(Date.now() + days * 864e5).toUTCString()}; path=/; SameSite=Lax`;
}
function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

const adminFetch = (url: string, options?: RequestInit) =>
  fetch(url, { ...options, headers: { "Content-Type": "application/json", "x-admin-token": ADMIN_TOKEN, ...(options?.headers ?? {}) } });

// 공통 인풋 스타일
const inp: React.CSSProperties = { width: "100%", border: "1px solid #D3D3D3", background: "#FAFAFA", padding: "10px 14px", fontSize: "14px", color: "#000", outline: "none", boxSizing: "border-box", fontFamily: "var(--font-dm-sans), sans-serif" };
const lbl: React.CSSProperties = { display: "block", fontSize: "12px", color: "#5F5F5F", marginBottom: "6px" };

// ─── 로그인 폼 ────────────────────────────────────────────────
function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { setCookie(COOKIE_NAME, "1", 7); onSuccess(); }
    else setError("비밀번호가 올바르지 않습니다.");
  };
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-dm-sans), sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", background: "#000", marginBottom: "20px" }}>
            <span style={{ color: "#FAFAFA", fontSize: "12px", fontWeight: 700 }}>RC</span>
          </div>
          <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "8px" }}>Admin</p>
          <h1 style={{ fontSize: "24px", fontWeight: 400, color: "#000", letterSpacing: "-0.5px" }}>관리자 로그인</h1>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={lbl}>비밀번호</label>
            <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="비밀번호" autoFocus style={inp} />
          </div>
          {error && <p style={{ fontSize: "13px", color: "#c00" }}>{error}</p>}
          <button type="submit" style={{ width: "100%", background: "#000", color: "#FAFAFA", border: "none", padding: "14px", fontSize: "15px", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif" }}>로그인</button>
        </form>
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <Link href="/" style={{ fontSize: "13px", color: "#8B8675", textDecoration: "none" }}>← 홈으로</Link>
        </div>
      </div>
    </div>
  );
}

// ─── 예약 탭 ────────────────────────────────────────────────
function BookingsTab() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/bookings").then(r => r.json()).then(d => setItems(Array.isArray(d) ? d : [])).finally(() => setLoading(false));
  }, []);
  if (loading) return <div style={{ padding: "80px", textAlign: "center", color: "#8B8675" }}>불러오는 중...</div>;
  if (!items.length) return <div style={{ padding: "80px", textAlign: "center", border: "1px solid #D3D3D3", color: "#D3D3D3" }}>예약 없음</div>;
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead><tr style={{ borderBottom: "2px solid #D3D3D3" }}>
          {["ID", "이름", "이메일", "연락처", "예약일", "시간", "경로", "금액", "접수일"].map(h => <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase", color: "#8B8675" }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {items.map((b, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #D3D3D3" }}>
              <td style={{ padding: "14px 16px", color: "#8B8675" }}>{String(b.id ?? "")}</td>
              <td style={{ padding: "14px 16px", fontWeight: 500, color: "#000" }}>{String(b.name ?? "")}</td>
              <td style={{ padding: "14px 16px", color: "#5F5F5F" }}>{String(b.email ?? "")}</td>
              <td style={{ padding: "14px 16px", color: "#5F5F5F" }}>{String(b.phone ?? "")}</td>
              <td style={{ padding: "14px 16px", color: "#5F5F5F" }}>{String(b.booking_date ?? "")}</td>
              <td style={{ padding: "14px 16px", color: "#5F5F5F" }}>{String(b.booking_time ?? "")}</td>
              <td style={{ padding: "14px 16px" }}><span style={{ fontSize: "11px", padding: "3px 8px", background: "#F0EFEB", color: "#6B625A" }}>{String(b.booking_path ?? "")}</span></td>
              <td style={{ padding: "14px 16px", fontWeight: 500 }}>{b.total_price ? `₩${Number(b.total_price).toLocaleString()}` : "-"}</td>
              <td style={{ padding: "14px 16px", color: "#8B8675", fontSize: "12px" }}>{b.created_at ? new Date(String(b.created_at)).toLocaleDateString("ko-KR") : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── 공지사항 탭 ────────────────────────────────────────────
function NoticesTab() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", category: "공지", content: "", is_pinned: false });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const r = await adminFetch("/api/admin/notices");
    const d = await r.json();
    setItems(Array.isArray(d) ? d : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setErr("");
    try {
      const r = await adminFetch("/api/admin/notices", { method: "POST", body: JSON.stringify(form) });
      if (!r.ok) throw new Error((await r.json()).error);
      setForm({ title: "", category: "공지", content: "", is_pinned: false });
      await load();
    } catch (e: unknown) { setErr(e instanceof Error ? e.message : "오류"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: unknown) => {
    if (!confirm("삭제하시겠습니까?")) return;
    await adminFetch(`/api/admin/notices?id=${id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      {/* 작성 폼 */}
      <div style={{ border: "1px solid #D3D3D3", background: "#F0EFEB", padding: "32px" }}>
        <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "20px" }}>새 공지 작성</p>
        <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: "12px" }}>
            <div>
              <label style={lbl}>제목 *</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="공지 제목" style={inp} />
            </div>
            <div>
              <label style={lbl}>분류</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={inp}>
                {["공지", "이벤트", "운영안내"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={lbl}>내용</label>
            <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="공지 내용을 입력하세요." rows={5} style={{ ...inp, resize: "none" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input type="checkbox" id="pin" checked={form.is_pinned} onChange={e => setForm(f => ({ ...f, is_pinned: e.target.checked }))} />
            <label htmlFor="pin" style={{ fontSize: "13px", color: "#5F5F5F", cursor: "pointer" }}>상단 고정</label>
          </div>
          {err && <p style={{ fontSize: "13px", color: "#c00" }}>{err}</p>}
          <div><button type="submit" disabled={saving} style={{ background: "#000", color: "#FAFAFA", border: "none", padding: "12px 32px", fontSize: "14px", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif" }}>{saving ? "저장 중..." : "공지 등록"}</button></div>
        </form>
      </div>
      {/* 목록 */}
      {loading ? <div style={{ color: "#8B8675" }}>불러오는 중...</div> : (
        <div style={{ borderTop: "2px solid #000" }}>
          {items.length === 0 ? <p style={{ padding: "40px", textAlign: "center", color: "#D3D3D3" }}>등록된 공지가 없습니다.</p> : items.map((n) => (
            <div key={String(n.id)} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 0", borderBottom: "1px solid #D3D3D3" }}>
              <span style={{ fontSize: "10px", padding: "2px 8px", background: "#000", color: "#FAFAFA", whiteSpace: "nowrap" }}>{String(n.category ?? "")}</span>
              {n.is_pinned && <span style={{ fontSize: "12px" }}>📌</span>}
              <span style={{ flex: 1, fontSize: "15px", color: "#000" }}>{String(n.title ?? "")}</span>
              <span style={{ fontSize: "12px", color: "#8B8675", whiteSpace: "nowrap" }}>{String(n.created_at ?? "").slice(0, 10)}</span>
              <button onClick={() => handleDelete(n.id)} style={{ background: "none", border: "1px solid #D3D3D3", padding: "4px 12px", fontSize: "12px", cursor: "pointer", color: "#8B8675", fontFamily: "var(--font-dm-sans), sans-serif" }}>삭제</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── 언론보도 탭 ────────────────────────────────────────────
function PressTab() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", media_name: "", media_url: "", summary: "", published_date: "" });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const r = await adminFetch("/api/admin/press");
    const d = await r.json();
    setItems(Array.isArray(d) ? d : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setErr("");
    try {
      const r = await adminFetch("/api/admin/press", { method: "POST", body: JSON.stringify(form) });
      if (!r.ok) throw new Error((await r.json()).error);
      setForm({ title: "", media_name: "", media_url: "", summary: "", published_date: "" });
      await load();
    } catch (e: unknown) { setErr(e instanceof Error ? e.message : "오류"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: unknown) => {
    if (!confirm("삭제하시겠습니까?")) return;
    await adminFetch(`/api/admin/press?id=${id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      <div style={{ border: "1px solid #D3D3D3", background: "#F0EFEB", padding: "32px" }}>
        <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "20px" }}>언론보도 등록</p>
        <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div><label style={lbl}>기사 제목 *</label><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="기사 제목" style={inp} /></div>
            <div><label style={lbl}>매체명 *</label><input value={form.media_name} onChange={e => setForm(f => ({ ...f, media_name: e.target.value }))} placeholder="조선일보, KBS 등" style={inp} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: "12px" }}>
            <div><label style={lbl}>기사 URL</label><input value={form.media_url} onChange={e => setForm(f => ({ ...f, media_url: e.target.value }))} placeholder="https://" style={inp} /></div>
            <div><label style={lbl}>게재일</label><input type="date" value={form.published_date} onChange={e => setForm(f => ({ ...f, published_date: e.target.value }))} style={inp} /></div>
          </div>
          <div><label style={lbl}>요약</label><textarea value={form.summary} onChange={e => setForm(f => ({ ...f, summary: e.target.value }))} placeholder="기사 요약 (2~3줄)" rows={3} style={{ ...inp, resize: "none" }} /></div>
          {err && <p style={{ fontSize: "13px", color: "#c00" }}>{err}</p>}
          <div><button type="submit" disabled={saving} style={{ background: "#000", color: "#FAFAFA", border: "none", padding: "12px 32px", fontSize: "14px", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif" }}>{saving ? "저장 중..." : "등록"}</button></div>
        </form>
      </div>
      {loading ? <div style={{ color: "#8B8675" }}>불러오는 중...</div> : (
        <div style={{ borderTop: "2px solid #000" }}>
          {items.length === 0 ? <p style={{ padding: "40px", textAlign: "center", color: "#D3D3D3" }}>등록된 언론보도가 없습니다.</p> : items.map((p) => (
            <div key={String(p.id)} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 0", borderBottom: "1px solid #D3D3D3" }}>
              <span style={{ fontSize: "12px", fontWeight: 500, color: "#6B625A", minWidth: "80px" }}>{String(p.media_name ?? "")}</span>
              <span style={{ flex: 1, fontSize: "15px", color: "#000" }}>{String(p.title ?? "")}{p.media_url ? " ↗" : ""}</span>
              <span style={{ fontSize: "12px", color: "#8B8675", whiteSpace: "nowrap" }}>{String(p.published_date ?? "")}</span>
              <button onClick={() => handleDelete(p.id)} style={{ background: "none", border: "1px solid #D3D3D3", padding: "4px 12px", fontSize: "12px", cursor: "pointer", color: "#8B8675", fontFamily: "var(--font-dm-sans), sans-serif" }}>삭제</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── 자주묻는질문 탭 ────────────────────────────────────────
function FaqTab() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ question: "", answer: "", category: "예약" });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const r = await adminFetch("/api/admin/faq");
    const d = await r.json();
    setItems(Array.isArray(d) ? d : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setErr("");
    try {
      const r = await adminFetch("/api/admin/faq", { method: "POST", body: JSON.stringify(form) });
      if (!r.ok) throw new Error((await r.json()).error);
      setForm({ question: "", answer: "", category: "예약" });
      await load();
    } catch (e: unknown) { setErr(e instanceof Error ? e.message : "오류"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: unknown) => {
    if (!confirm("삭제하시겠습니까?")) return;
    await adminFetch(`/api/admin/faq?id=${id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      <div style={{ border: "1px solid #D3D3D3", background: "#F0EFEB", padding: "32px" }}>
        <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#8B8675", marginBottom: "20px" }}>FAQ 등록</p>
        <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: "12px" }}>
            <div><label style={lbl}>질문 *</label><input value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))} placeholder="질문을 입력하세요" style={inp} /></div>
            <div><label style={lbl}>카테고리</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={inp}>
                {["예약", "이용", "녹음·결과물", "멤버십", "일반"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div><label style={lbl}>답변 *</label><textarea value={form.answer} onChange={e => setForm(f => ({ ...f, answer: e.target.value }))} placeholder="답변을 입력하세요." rows={4} style={{ ...inp, resize: "none" }} /></div>
          {err && <p style={{ fontSize: "13px", color: "#c00" }}>{err}</p>}
          <div><button type="submit" disabled={saving} style={{ background: "#000", color: "#FAFAFA", border: "none", padding: "12px 32px", fontSize: "14px", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif" }}>{saving ? "저장 중..." : "등록"}</button></div>
        </form>
      </div>
      {loading ? <div style={{ color: "#8B8675" }}>불러오는 중...</div> : (
        <div style={{ borderTop: "2px solid #000" }}>
          {items.length === 0 ? <p style={{ padding: "40px", textAlign: "center", color: "#D3D3D3" }}>등록된 FAQ가 없습니다.</p> : items.map((f) => (
            <div key={String(f.id)} style={{ padding: "20px 0", borderBottom: "1px solid #D3D3D3" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                <span style={{ fontSize: "10px", padding: "2px 8px", background: "#F0EFEB", color: "#6B625A", whiteSpace: "nowrap", marginTop: "4px" }}>{String(f.category ?? "")}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "15px", fontWeight: 500, color: "#000", marginBottom: "8px" }}>Q. {String(f.question ?? "")}</p>
                  <p style={{ fontSize: "14px", color: "#5F5F5F", lineHeight: 1.65 }}>A. {String(f.answer ?? "")}</p>
                </div>
                <button onClick={() => handleDelete(f.id)} style={{ background: "none", border: "1px solid #D3D3D3", padding: "4px 12px", fontSize: "12px", cursor: "pointer", color: "#8B8675", fontFamily: "var(--font-dm-sans), sans-serif", flexShrink: 0 }}>삭제</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── 1:1 문의 탭 ────────────────────────────────────────────
function InquiriesTab() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    adminFetch("/api/inquiries").then(r => r.json()).then(d => setItems(Array.isArray(d) ? d : [])).finally(() => setLoading(false));
  }, []);
  if (loading) return <div style={{ padding: "80px", textAlign: "center", color: "#8B8675" }}>불러오는 중...</div>;
  if (!items.length) return <div style={{ padding: "80px", textAlign: "center", border: "1px solid #D3D3D3", color: "#D3D3D3" }}>접수된 문의가 없습니다.</div>;
  return (
    <div style={{ borderTop: "2px solid #000" }}>
      {items.map((q) => (
        <div key={String(q.id)} style={{ padding: "24px 0", borderBottom: "1px solid #D3D3D3" }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "12px" }}>
            <span style={{ fontSize: "10px", padding: "2px 8px", background: "#F0EFEB", color: "#6B625A" }}>{String(q.subject ?? "")}</span>
            <span style={{ fontWeight: 500, color: "#000", fontSize: "14px" }}>{String(q.name ?? "")}</span>
            <span style={{ color: "#5F5F5F", fontSize: "13px" }}>{String(q.email ?? "")}</span>
            <span style={{ color: "#8B8675", fontSize: "13px" }}>{String(q.phone ?? "")}</span>
            <span style={{ marginLeft: "auto", color: "#8B8675", fontSize: "12px", whiteSpace: "nowrap" }}>{q.created_at ? new Date(String(q.created_at)).toLocaleDateString("ko-KR") : ""}</span>
          </div>
          <p style={{ fontSize: "14px", color: "#5F5F5F", lineHeight: 1.75 }}>{String(q.message ?? "")}</p>
        </div>
      ))}
    </div>
  );
}

// ─── 어드민 대시보드 ────────────────────────────────────────
const TABS = [
  { key: "bookings", label: "예약 관리" },
  { key: "notices", label: "공지사항" },
  { key: "press", label: "언론보도" },
  { key: "faq", label: "자주 묻는 질문" },
  { key: "inquiries", label: "1:1 문의" },
] as const;

type TabKey = typeof TABS[number]["key"];

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<TabKey>("bookings");
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", fontFamily: "var(--font-dm-sans), sans-serif" }}>
      {/* 헤더 */}
      <div style={{ background: "#000", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
        <span style={{ color: "#FAFAFA", fontSize: "12px", fontWeight: 700, letterSpacing: "1px" }}>RC ADMIN</span>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link href="/" style={{ fontSize: "13px", color: "rgba(250,250,250,0.6)", textDecoration: "none" }}>홈 →</Link>
          <button onClick={onLogout} style={{ background: "none", border: "1px solid rgba(250,250,250,0.2)", color: "rgba(250,250,250,0.6)", padding: "6px 16px", fontSize: "12px", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif" }}>로그아웃</button>
        </div>
      </div>
      {/* 탭 바 */}
      <div style={{ borderBottom: "1px solid #D3D3D3", padding: "0 48px", display: "flex", gap: "0", overflowX: "auto" }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            style={{ padding: "16px 24px", fontSize: "13px", fontWeight: activeTab === t.key ? 500 : 400, color: activeTab === t.key ? "#000" : "#8B8675", borderBottom: activeTab === t.key ? "2px solid #000" : "2px solid transparent", background: "none", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif", whiteSpace: "nowrap" }}>
            {t.label}
          </button>
        ))}
      </div>
      {/* 콘텐츠 */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px" }}>
        {activeTab === "bookings" && <BookingsTab />}
        {activeTab === "notices" && <NoticesTab />}
        {activeTab === "press" && <PressTab />}
        {activeTab === "faq" && <FaqTab />}
        {activeTab === "inquiries" && <InquiriesTab />}
      </div>
    </div>
  );
}

// ─── 메인 ────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  useEffect(() => { setAuthed(getCookie(COOKIE_NAME) === "1"); }, []);
  const handleLogout = () => { deleteCookie(COOKIE_NAME); setAuthed(false); };
  if (authed === null) return null;
  if (!authed) return <LoginForm onSuccess={() => setAuthed(true)} />;
  return <AdminDashboard onLogout={handleLogout} />;
}
