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
  basic: { label: "K-PASS Basic", color: "#A855F7", price: "₩99,000/월" },
  plus:  { label: "K-PASS Plus",  color: "#D4AF37", price: "₩199,000/월" },
  pro:   { label: "K-PASS Pro",   color: "#fff",    price: "₩399,000/월" },
  none:  { label: "일반 회원",     color: "#64748b", price: "미가입" },
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
      <div className="min-h-screen bg-[#050508] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const mem = MEMBERSHIP_LABELS[membership] ?? MEMBERSHIP_LABELS.none;
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const displayName = (user.user_metadata?.full_name as string) || (user.user_metadata?.name as string) || user.email?.split("@")[0] || "회원";

  return (
    <div className="min-h-screen bg-[#050508] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* 프로필 헤더 */}
        <div className="bg-[#0f0f18] rounded-2xl border border-white/5 p-6 sm:p-8 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt={displayName} className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                <span className="text-[#D4AF37] font-black text-xl">{displayName[0]}</span>
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#22c55e] border-2 border-[#0f0f18]" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h1 className="text-white font-black text-xl">{displayName}</h1>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full"
                style={{ background: `${mem.color}20`, color: mem.color }}>
                {mem.label}
              </span>
            </div>
            <p className="text-slate-500 text-sm">{user.email}</p>
          </div>

          <button onClick={handleLogout}
            className="text-slate-600 hover:text-slate-400 text-xs border border-white/10 px-4 py-2 rounded-xl transition-colors flex-shrink-0">
            로그아웃
          </button>
        </div>

        {/* 탭 */}
        <div className="flex gap-1 bg-[#0f0f18] p-1 rounded-xl mb-6 w-fit">
          {[
            { key: "overview", label: "홈" },
            { key: "bookings", label: "예약 내역" },
            { key: "membership", label: "멤버십" },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                tab === t.key ? "bg-[#D4AF37] text-black" : "text-slate-400 hover:text-white"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* 홈 탭 */}
        {tab === "overview" && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "전체 예약", value: bookings.length, icon: "🎟" },
                { label: "완료된 체험", value: bookings.filter(b => b.status === "completed").length, icon: "✅" },
                { label: "예정 예약", value: bookings.filter(b => b.status === "confirmed").length, icon: "📅" },
                { label: "멤버십", value: mem.label, icon: "⭐" },
              ].map((stat, i) => (
                <div key={i} className="bg-[#0f0f18] rounded-2xl p-5 border border-white/5 text-center">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-white font-black text-xl mb-1">{stat.value}</div>
                  <div className="text-slate-500 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* 최근 예약 */}
            <div className="bg-[#0f0f18] rounded-2xl border border-white/5 p-6">
              <h3 className="text-white font-black mb-4">최근 예약</h3>
              {bookings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-500 text-sm mb-4">아직 예약 내역이 없습니다</p>
                  <Link href="/menu" className="inline-block bg-[#D4AF37] hover:bg-[#F0D060] text-black font-black px-6 py-2.5 rounded-xl text-xs transition-colors">
                    🎟 첫 예약하기
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.slice(0, 3).map((b) => (
                    <BookingRow key={b.id} booking={b} />
                  ))}
                  {bookings.length > 3 && (
                    <button onClick={() => setTab("bookings")} className="text-[#D4AF37] text-xs hover:underline">
                      전체 보기 ({bookings.length}건) →
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* 멤버십 CTA (미가입 시) */}
            {membership === "none" && (
              <div className="bg-gradient-to-r from-[#A855F7]/10 to-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <div className="text-[#D4AF37] font-black text-sm mb-1">K-PASS 멤버십</div>
                  <p className="text-slate-300 text-sm">매달 녹음하고 앨범을 발매하세요. 월 ₩99,000부터 시작.</p>
                </div>
                <Link href="/membership" className="flex-shrink-0 bg-[#D4AF37] hover:bg-[#F0D060] text-black font-black px-6 py-2.5 rounded-xl text-xs transition-colors">
                  멤버십 알아보기 →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* 예약 내역 탭 */}
        {tab === "bookings" && (
          <div className="bg-[#0f0f18] rounded-2xl border border-white/5 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-black">예약 내역 ({bookings.length}건)</h3>
              <Link href="/menu" className="bg-[#D4AF37] hover:bg-[#F0D060] text-black font-black px-4 py-2 rounded-xl text-xs transition-colors">
                + 새 예약
              </Link>
            </div>
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-500 text-sm mb-4">예약 내역이 없습니다</p>
                <Link href="/menu" className="inline-block bg-[#D4AF37] text-black font-black px-6 py-2.5 rounded-xl text-xs">
                  🎟 예약하기
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <BookingRow key={b.id} booking={b} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* 멤버십 탭 */}
        {tab === "membership" && (
          <div className="space-y-5">
            {/* 현재 멤버십 상태 */}
            <div className="bg-[#0f0f18] rounded-2xl border border-white/5 p-6">
              <h3 className="text-white font-black mb-5">현재 멤버십</h3>
              <div className="flex items-center gap-4 p-5 rounded-xl border"
                style={{ borderColor: `${mem.color}30`, background: `${mem.color}08` }}>
                <div className="text-3xl">⭐</div>
                <div className="flex-1">
                  <div className="font-black text-lg" style={{ color: mem.color }}>{mem.label}</div>
                  <div className="text-slate-500 text-sm">{mem.price}</div>
                </div>
                {membership !== "none" && (
                  <button className="text-slate-600 hover:text-red-400 text-xs border border-white/10 px-3 py-1.5 rounded-lg transition-colors">
                    해지
                  </button>
                )}
              </div>
            </div>

            {/* 요금제 변경 안내 */}
            {membership === "none" ? (
              <div className="text-center py-6">
                <p className="text-slate-500 text-sm mb-5">아직 멤버십에 가입하지 않으셨습니다.</p>
                <Link href="/membership"
                  className="inline-block bg-[#D4AF37] hover:bg-[#F0D060] text-black font-black px-8 py-3.5 rounded-xl text-sm transition-colors">
                  K-PASS 멤버십 알아보기 →
                </Link>
              </div>
            ) : (
              <div className="bg-[#0f0f18] rounded-2xl border border-white/5 p-6">
                <h3 className="text-white font-black mb-4">요금제 변경</h3>
                <div className="space-y-3">
                  {(["basic", "plus", "pro"] as const).map((tier) => {
                    const m = MEMBERSHIP_LABELS[tier];
                    return (
                      <div key={tier} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                        membership === tier ? "border-[#D4AF37]/40 bg-[#D4AF37]/5" : "border-white/5 hover:border-white/10"
                      }`}>
                        <div>
                          <span className="font-bold text-sm" style={{ color: m.color }}>{m.label}</span>
                          <span className="text-slate-500 text-xs ml-2">{m.price}</span>
                        </div>
                        {membership === tier ? (
                          <span className="text-[#D4AF37] text-xs font-bold">현재 이용 중</span>
                        ) : (
                          <Link href="/membership" className="text-slate-400 hover:text-white text-xs border border-white/10 px-3 py-1.5 rounded-lg transition-colors">
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
    confirmed:  { label: "예약확정", color: "#22c55e" },
    pending:    { label: "대기중",   color: "#f59e0b" },
    completed:  { label: "완료",     color: "#64748b" },
    cancelled:  { label: "취소됨",   color: "#ef4444" },
  };
  const status = statusMap[booking.status] ?? { label: booking.status, color: "#64748b" };
  const pathLabel: Record<string, string> = {
    docent: "도슨트 투어", recording: "녹음 체험", pro: "프로 에디션",
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-[#050508] rounded-xl border border-white/5">
      <div className="flex-1 min-w-0">
        <div className="text-white font-bold text-sm truncate">
          {pathLabel[booking.booking_path] ?? booking.booking_type ?? booking.booking_path}
        </div>
        <div className="text-slate-500 text-xs mt-0.5">
          {booking.session_date} {booking.session_time}
        </div>
      </div>
      {booking.total_price > 0 && (
        <div className="text-[#D4AF37] font-bold text-sm flex-shrink-0">
          ₩{booking.total_price.toLocaleString()}
        </div>
      )}
      <span className="text-[10px] font-black px-2.5 py-1 rounded-full flex-shrink-0"
        style={{ background: `${status.color}20`, color: status.color }}>
        {status.label}
      </span>
    </div>
  );
}
