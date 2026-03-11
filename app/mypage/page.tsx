"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

type Booking = {
  id: number;
  booking_path: string;
  booking_type: string;
  session_date: string;
  session_time: string;
  customer_name: string;
  status: string;
  created_at: string;
  total_price: number;
};

const MEMBERSHIP_LABELS: Record<string, { label: string; color: string; price: string }> = {
  basic: { label: "K-PASS Basic", color: "#8B8675", price: "₩99,000/월" },
  plus:  { label: "K-PASS Plus",  color: "#1A1A1A", price: "₩199,000/월" },
  pro:   { label: "K-PASS Pro",   color: "#000",    price: "₩399,000/월" },
  none:  { label: "일반 회원",     color: "#5F5F5F", price: "미가입" },
};

export default function MyPage() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [membership, setMembership] = useState<string>("none");
  const [tab, setTab] = useState<"overview" | "bookings" | "membership">("overview");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = getClient();
    if (!supabase) { setLoading(false); return; }

    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        router.replace("/login");
        return;
      }
      setUser(data.session.user);

      // 예약 내역 불러오기
      const { data: bData } = await supabase
        .from("rc_bookings")
        .select("*")
        .eq("customer_email", data.session.user.email)
        .order("created_at", { ascending: false })
        .limit(20);
      setBookings(bData ?? []);

      // 멤버십 정보 (rc_members 테이블 있으면)
      const { data: mData } = await supabase
        .from("rc_members")
        .select("membership_tier")
        .eq("user_id", data.session.user.id)
        .maybeSingle();
      setMembership(mData?.membership_tier ?? "none");

      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/login");
    });
    return () => listener.subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await getClient()?.auth.signOut();
    router.replace("/");
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-dm-sans), sans-serif",
        color: "#5F5F5F",
        fontSize: 14,
      }}>
        로딩 중...
      </div>
    );
  }

  if (!user) return null;

  const mem = MEMBERSHIP_LABELS[membership] ?? MEMBERSHIP_LABELS.none;
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const displayName = (user.user_metadata?.full_name as string) || (user.user_metadata?.name as string) || user.email?.split("@")[0] || "회원";

  const tabs = [
    { key: "overview", label: "홈" },
    { key: "bookings", label: "예약 내역" },
    { key: "membership", label: "멤버십" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FAFAFA",
      paddingTop: 96,
      paddingBottom: 64,
      fontFamily: "var(--font-dm-sans), sans-serif",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>

        {/* 프로필 헤더 */}
        <div style={{
          background: "#FAFAFA",
          border: "1px solid #D3D3D3",
          padding: "24px 32px",
          marginBottom: 24,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 20,
        }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt={displayName} style={{ width: 56, height: 56, objectFit: "cover", display: "block" }} />
            ) : (
              <div style={{
                width: 56,
                height: 56,
                background: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span style={{ color: "#FAFAFA", fontWeight: 400, fontSize: 20 }}>{displayName[0]}</span>
              </div>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
              <h1 style={{ color: "#000", fontWeight: 400, fontSize: 18, margin: 0, letterSpacing: "-1px" }}>{displayName}</h1>
              <span style={{
                fontSize: 11,
                letterSpacing: "2px",
                textTransform: "uppercase" as const,
                color: mem.color,
                border: "1px solid #D3D3D3",
                padding: "2px 8px",
              }}>
                {mem.label}
              </span>
            </div>
            <p style={{ color: "#5F5F5F", fontSize: 13, margin: 0 }}>{user.email}</p>
          </div>

          <button onClick={handleLogout} style={{
            color: "#5F5F5F",
            fontSize: 12,
            border: "1px solid #D3D3D3",
            background: "transparent",
            padding: "8px 16px",
            borderRadius: 0,
            cursor: "pointer",
            fontFamily: "var(--font-dm-sans), sans-serif",
            flexShrink: 0,
          }}>
            로그아웃
          </button>
        </div>

        {/* 탭 */}
        <div style={{
          borderBottom: "1px solid #D3D3D3",
          display: "flex",
          gap: 0,
          marginBottom: 24,
        }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)} style={{
              padding: "12px 20px",
              fontSize: 13,
              fontWeight: 400,
              fontFamily: "var(--font-dm-sans), sans-serif",
              background: "transparent",
              border: "none",
              borderBottom: tab === t.key ? "2px solid #000" : "2px solid transparent",
              color: tab === t.key ? "#000" : "#5F5F5F",
              cursor: "pointer",
              marginBottom: -1,
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* 홈 탭 */}
        {tab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
              {[
                { label: "전체 예약", value: bookings.length },
                { label: "완료된 체험", value: bookings.filter(b => b.status === "completed").length },
                { label: "예정 예약", value: bookings.filter(b => b.status === "confirmed").length },
                { label: "멤버십", value: mem.label },
              ].map((stat, i) => (
                <div key={i} style={{
                  background: "#F0EFEB",
                  border: "1px solid #D3D3D3",
                  padding: 20,
                  textAlign: "center",
                }}>
                  <div style={{ color: "#000", fontWeight: 400, fontSize: 22, marginBottom: 6, letterSpacing: "-1px" }}>{stat.value}</div>
                  <div style={{ color: "#5F5F5F", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* 최근 예약 */}
            <div style={{ border: "1px solid #D3D3D3", padding: 24, background: "#FAFAFA" }}>
              <h3 style={{ color: "#000", fontWeight: 400, fontSize: 16, letterSpacing: "-1px", marginTop: 0, marginBottom: 20 }}>최근 예약</h3>
              {bookings.length === 0 ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <p style={{ color: "#5F5F5F", fontSize: 13, marginBottom: 16 }}>아직 예약 내역이 없습니다</p>
                  <Link href="/menu" style={{
                    display: "inline-block",
                    background: "#000",
                    color: "#fff",
                    fontSize: 12,
                    padding: "10px 24px",
                    textDecoration: "none",
                    letterSpacing: "1px",
                  }}>
                    첫 예약하기
                  </Link>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {bookings.slice(0, 3).map((b) => (
                    <BookingRow key={b.id} booking={b} />
                  ))}
                  {bookings.length > 3 && (
                    <button onClick={() => setTab("bookings")} style={{
                      color: "#8B8675",
                      fontSize: 12,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      padding: 0,
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}>
                      전체 보기 ({bookings.length}건) →
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* 멤버십 CTA (미가입 시) */}
            {membership === "none" && (
              <div style={{
                background: "#F0EFEB",
                border: "1px solid #D3D3D3",
                padding: 24,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 16,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    color: "#8B8675",
                    fontSize: 11,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}>K-PASS 멤버십</div>
                  <p style={{ color: "#5F5F5F", fontSize: 13, margin: 0 }}>매달 녹음하고 앨범을 발매하세요. 월 ₩99,000부터 시작.</p>
                </div>
                <Link href="/membership" style={{
                  flexShrink: 0,
                  background: "#000",
                  color: "#fff",
                  fontSize: 12,
                  padding: "10px 24px",
                  textDecoration: "none",
                  letterSpacing: "1px",
                }}>
                  멤버십 알아보기 →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* 예약 내역 탭 */}
        {tab === "bookings" && (
          <div style={{ border: "1px solid #D3D3D3", padding: 24, background: "#FAFAFA" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ color: "#000", fontWeight: 400, fontSize: 16, letterSpacing: "-1px", margin: 0 }}>예약 내역 ({bookings.length}건)</h3>
              <Link href="/menu" style={{
                background: "#000",
                color: "#fff",
                fontSize: 12,
                padding: "8px 16px",
                textDecoration: "none",
                letterSpacing: "1px",
              }}>
                + 새 예약
              </Link>
            </div>
            {bookings.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <p style={{ color: "#5F5F5F", fontSize: 13, marginBottom: 16 }}>예약 내역이 없습니다</p>
                <Link href="/menu" style={{
                  display: "inline-block",
                  background: "#000",
                  color: "#fff",
                  fontSize: 12,
                  padding: "10px 24px",
                  textDecoration: "none",
                  letterSpacing: "1px",
                }}>
                  예약하기
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {bookings.map((b) => (
                  <BookingRow key={b.id} booking={b} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* 멤버십 탭 */}
        {tab === "membership" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* 현재 멤버십 상태 */}
            <div style={{ border: "1px solid #D3D3D3", padding: 24, background: "#FAFAFA" }}>
              <h3 style={{ color: "#000", fontWeight: 400, fontSize: 16, letterSpacing: "-1px", marginTop: 0, marginBottom: 20 }}>현재 멤버십</h3>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: 20,
                background: "#F0EFEB",
                border: "1px solid #D3D3D3",
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 400, fontSize: 15, color: mem.color, marginBottom: 4 }}>{mem.label}</div>
                  <div style={{ color: "#5F5F5F", fontSize: 13 }}>{mem.price}</div>
                </div>
                {membership !== "none" && (
                  <button style={{
                    color: "#5F5F5F",
                    fontSize: 12,
                    border: "1px solid #D3D3D3",
                    background: "transparent",
                    padding: "6px 12px",
                    borderRadius: 0,
                    cursor: "pointer",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                  }}>
                    해지
                  </button>
                )}
              </div>
            </div>

            {/* 요금제 변경 안내 */}
            {membership === "none" ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <p style={{ color: "#5F5F5F", fontSize: 13, marginBottom: 20 }}>아직 멤버십에 가입하지 않으셨습니다.</p>
                <Link href="/membership" style={{
                  display: "inline-block",
                  background: "#000",
                  color: "#fff",
                  fontSize: 13,
                  padding: "12px 32px",
                  textDecoration: "none",
                  letterSpacing: "1px",
                }}>
                  K-PASS 멤버십 알아보기 →
                </Link>
              </div>
            ) : (
              <div style={{ border: "1px solid #D3D3D3", padding: 24, background: "#FAFAFA" }}>
                <h3 style={{ color: "#000", fontWeight: 400, fontSize: 16, letterSpacing: "-1px", marginTop: 0, marginBottom: 16 }}>요금제 변경</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {(["basic", "plus", "pro"] as const).map((tier) => {
                    const m = MEMBERSHIP_LABELS[tier];
                    return (
                      <div key={tier} style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 16,
                        background: membership === tier ? "#F0EFEB" : "#fff",
                        border: "1px solid #D3D3D3",
                      }}>
                        <div>
                          <span style={{ fontWeight: 400, fontSize: 13, color: m.color }}>{m.label}</span>
                          <span style={{ color: "#5F5F5F", fontSize: 12, marginLeft: 12 }}>{m.price}</span>
                        </div>
                        {membership === tier ? (
                          <span style={{ color: "#8B8675", fontSize: 11, letterSpacing: "1px", textTransform: "uppercase" }}>현재 이용 중</span>
                        ) : (
                          <Link href="/membership" style={{
                            color: "#5F5F5F",
                            fontSize: 12,
                            border: "1px solid #D3D3D3",
                            padding: "6px 12px",
                            textDecoration: "none",
                          }}>
                            변경
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function BookingRow({ booking }: { booking: Booking }) {
  const statusMap: Record<string, { label: string; color: string }> = {
    confirmed:  { label: "예약확정", color: "#1A1A1A" },
    pending:    { label: "대기중",   color: "#8B8675" },
    completed:  { label: "완료",     color: "#5F5F5F" },
    cancelled:  { label: "취소됨",   color: "#dc2626" },
  };
  const status = statusMap[booking.status] ?? { label: booking.status, color: "#5F5F5F" };
  const pathLabel: Record<string, string> = {
    docent: "도슨트 투어", recording: "녹음 체험", pro: "프로 에디션",
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: 16,
      background: "#F0EFEB",
      border: "1px solid #D3D3D3",
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: "#000", fontWeight: 400, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {pathLabel[booking.booking_path] ?? booking.booking_type ?? booking.booking_path}
        </div>
        <div style={{ color: "#5F5F5F", fontSize: 12, marginTop: 2 }}>
          {booking.session_date} {booking.session_time}
        </div>
      </div>
      {booking.total_price > 0 && (
        <div style={{ color: "#1A1A1A", fontWeight: 400, fontSize: 13, flexShrink: 0 }}>
          ₩{booking.total_price.toLocaleString()}
        </div>
      )}
      <span style={{
        fontSize: 11,
        letterSpacing: "1px",
        textTransform: "uppercase" as const,
        padding: "3px 8px",
        border: "1px solid #D3D3D3",
        color: status.color,
        flexShrink: 0,
      }}>
        {status.label}
      </span>
    </div>
  );
}
