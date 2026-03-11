"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

// ─── 타입 ─────────────────────────────────────────────────────────────────────
type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface DrinkOrder {
  id: string;
  temperature: "hot" | "iced" | "none";
  quantity: number;
}

// ─── 상수 ─────────────────────────────────────────────────────────────────────
const MIXING_OPTIONS = [
  { id: "basic",    name: "기본",              price: 0,      desc: "베스트 구간 편집 + 음량 조절 + 에코 효과 추가" },
  { id: "ai",       name: "기본 + AI 보정",     price: 20000,  desc: "틀린 음정을 AI로 자동 수정" },
  { id: "engineer", name: "기본 + 전문가 보정", price: 100000, desc: "틀린 음정을 전문가가 하나하나 수작업으로 수정" },
];

const VIDEO_OPTIONS = [
  { id: "self",      name: "셀프 촬영",          price: 0,      desc: "셀피용 스탠드 제공, 자신의 휴대폰으로 직접 촬영" },
  { id: "cameraman", name: "셀프 + 촬영기사",    price: 20000,  desc: "촬영기사가 DSLR로 노래하는 모습 촬영 (원본 파일 제공)" },
  { id: "mv",        name: "AI 숏폼 뮤직비디오", price: 100000, desc: "1분 이내 AI가 생성한 숏폼 뮤직비디오" },
];

const ALBUM_OPTION = {
  name: "앨범 발매", price: 200000,
  desc: "유튜브·스포티파이·틱톡 등 전세계 음원 사이트에 K-POP 가수처럼 발매",
  features: [
    { title: "리메이크 라이선스 취득",  desc: "원곡을 합법적으로 리메이크해 저작권 걱정 없이 배포하세요." },
    { title: "반주 새로 제작",          desc: "AI 기반으로 원곡 분위기를 살린 새로운 MR을 제작합니다." },
    { title: "앨범 표지 디자인",        desc: "K-POP 스타일의 세련된 앨범 커버를 전문 디자이너가 제작합니다." },
    { title: "평생 저작권료",           desc: "Spotify, Apple Music 등에서 재생될 때마다 저작권료가 적립됩니다." },
  ],
};

const PRO_ALBUM_OPTION = {
  name: "전문가 앨범 발매", price: 500000,
  desc: "음악 전공자·프로를 위한 맞춤 발매 (스타일 반주 제작 + 앨범 자켓 + 수정 2회)",
};

const LP_OPTION = {
  name: "LP 레코드 제작", price: 300000,
  desc: "물리적 레코드판을 만들어 집주소로 배송해드립니다.",
};

const DRINK_CATALOG = [
  { id: "coffee",         name: "커피",         hasTemp: true  },
  { id: "coffee-decaf",   name: "디카페인",     hasTemp: true  },
  { id: "green-tea",      name: "녹차",         hasTemp: true  },
  { id: "hibiscus",       name: "히비스커스",   hasTemp: true  },
  { id: "earl-grey",      name: "얼그레이",     hasTemp: true  },
  { id: "peppermint",     name: "페퍼민트",     hasTemp: true  },
  { id: "chamomile",      name: "캐모마일",     hasTemp: true  },
  { id: "lemonade",       name: "레몬에이드",   hasTemp: false },
  { id: "strawberry-ade", name: "딸기에이드",   hasTemp: false },
  { id: "orange-ade",     name: "오렌지에이드", hasTemp: false },
  { id: "grapefruit-ade", name: "자몽에이드",   hasTemp: false },
  { id: "iced-tea",       name: "아이스티",     hasTemp: false },
];

const PLATFORMS = ["Naver", "Klook", "KKday", "Creatrip", "Trip.com", "데이트팝", "기타"];

const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let h = 10; h <= 21; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 21 && m > 0) break;
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return slots;
};
const ALL_SLOTS = generateTimeSlots();

const toLocalDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const fmt = (p: number) => (p === 0 ? "무료" : `₩${p.toLocaleString()}`);

// ─── 달력 컴포넌트 ─────────────────────────────────────────────────────────────
function SimpleCal({ value, onChange }: { value: Date | null; onChange: (d: Date) => void }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = month.getFullYear();
  const mon  = month.getMonth();
  const firstDay = new Date(year, mon, 1).getDay();
  const daysInMonth = new Date(year, mon + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div style={{ border: "1px solid #D3D3D3", background: "#FAFAFA", padding: "24px", maxWidth: "320px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <button
          onClick={() => setMonth(new Date(year, mon - 1, 1))}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#5F5F5F", fontSize: "14px", padding: "4px 8px" }}
        >◀</button>
        <span style={{ fontSize: "14px", fontWeight: 500, color: "#000" }}>{year}년 {mon + 1}월</span>
        <button
          onClick={() => setMonth(new Date(year, mon + 1, 1))}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#5F5F5F", fontSize: "14px", padding: "4px 8px" }}
        >▶</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "8px" }}>
        {["일","월","화","수","목","금","토"].map(d => (
          <span key={d} style={{ textAlign: "center", fontSize: "11px", color: "#8B8675", padding: "4px 0" }}>{d}</span>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
        {cells.map((day, i) => {
          if (!day) return <span key={i} />;
          const d = new Date(year, mon, day);
          d.setHours(0, 0, 0, 0);
          const isPast = d < today;
          const isSel  = value ? toLocalDate(d) === toLocalDate(value) : false;
          return (
            <button
              key={i}
              disabled={isPast}
              onClick={() => onChange(d)}
              style={{
                padding: "6px 0",
                fontSize: "13px",
                fontWeight: isSel ? 500 : 400,
                background: isSel ? "#000000" : "transparent",
                color: isSel ? "#FFFFFF" : isPast ? "#D3D3D3" : "#1A1A1A",
                border: "none",
                cursor: isPast ? "not-allowed" : "pointer",
                textAlign: "center",
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── 공통 스타일 ──────────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #D3D3D3",
  background: "#FAFAFA",
  padding: "10px 14px",
  fontSize: "14px",
  color: "#000000",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "var(--font-dm-sans), sans-serif",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  color: "#5F5F5F",
  marginBottom: "6px",
};

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────
export default function MenuPage() {
  const router = useRouter();
  const [step, setStep]               = useState<Step>(0);
  const [bookingPath, setBookingPath] = useState<"existing" | "homepage" | null>(null);
  const [platform, setPlatform]       = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [drinks, setDrinks]           = useState<DrinkOrder[]>([]);
  const [youtubeUrl, setYoutubeUrl]   = useState("");
  const [name, setName]               = useState("");
  const [phone, setPhone]             = useState("");
  const [email, setEmail]             = useState("");
  const [mixing, setMixing]           = useState("basic");
  const [video, setVideo]             = useState("self");
  const [album, setAlbum]             = useState(false);
  const [proAlbum, setProAlbum]       = useState(false);
  const [lp, setLp]                   = useState(false);
  const [albumOpen, setAlbumOpen]     = useState(false);
  const [submitting, setSubmitting]   = useState(false);
  const [done, setDone]               = useState(false);
  const [error, setError]             = useState("");

  useEffect(() => {
    if (!selectedDate) return;
    fetch(`/api/booked-times/${toLocalDate(selectedDate)}`)
      .then(r => r.json())
      .then(d => {
        setBookedTimes(d.bookedTimes ?? []);
        if (selectedTime && d.bookedTimes?.includes(selectedTime)) setSelectedTime("");
      })
      .catch(() => setBookedTimes([]));
  }, [selectedDate]);

  const total = useCallback(() => {
    let t = 0;
    t += MIXING_OPTIONS.find(o => o.id === mixing)?.price ?? 0;
    t += VIDEO_OPTIONS.find(o => o.id === video)?.price ?? 0;
    if (album) t += ALBUM_OPTION.price;
    if (proAlbum) t += PRO_ALBUM_OPTION.price;
    if (lp) t += LP_OPTION.price;
    return t;
  }, [mixing, video, album, proAlbum, lp]);

  const setDrinkQty = (id: string, temp: "hot" | "iced" | "none", delta: number) => {
    setDrinks(prev => {
      const key = `${id}-${temp}`;
      const existing = prev.find(d => `${d.id}-${d.temperature}` === key);
      if (!existing) {
        if (delta <= 0) return prev;
        return [...prev, { id, temperature: temp, quantity: 1 }];
      }
      const newQty = existing.quantity + delta;
      if (newQty <= 0) return prev.filter(d => `${d.id}-${d.temperature}` !== key);
      return prev.map(d => `${d.id}-${d.temperature}` === key ? { ...d, quantity: newQty } : d);
    });
  };

  const getDrinkQty = (id: string, temp: "hot" | "iced" | "none") =>
    drinks.find(d => d.id === id && d.temperature === temp)?.quantity ?? 0;

  const drinkSummary = drinks
    .map(d => {
      const nm = DRINK_CATALOG.find(c => c.id === d.id)?.name ?? d.id;
      const tl = d.temperature === "hot" ? " (HOT)" : d.temperature === "iced" ? " (ICE)" : "";
      return `${nm}${tl} x${d.quantity}`;
    })
    .join(", ") || "없음";

  const handleSubmit = async () => {
    if (!name || !phone) { setError("이름과 전화번호를 입력해주세요."); return; }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, phone, email,
          booking_date: selectedDate ? toLocalDate(selectedDate) : null,
          booking_time: selectedTime || null,
          drinks: drinkSummary,
          youtube_url: youtubeUrl || null,
          mixing_option: mixing,
          video_option: video,
          wants_album: album,
          wants_pro_album: proAlbum,
          wants_lp: lp,
          total_price: total(),
          platform: platform || null,
          booking_path: bookingPath,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDone(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "서버 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  // ─── 완료 화면 ───────────────────────────────────────────────────────────────
  if (done) {
    return (
      <div style={{ minHeight: "100vh", background: "#FAFAFA", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
        <div style={{ textAlign: "center", maxWidth: "400px" }}>
          <div style={{ width: "56px", height: "56px", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <Check style={{ width: "28px", height: "28px", color: "#FAFAFA" }} />
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "12px" }}>예약이 완료되었습니다</h1>
          <p style={{ fontSize: "15px", color: "#5F5F5F", lineHeight: 1.75, marginBottom: "12px" }}>선택이 완료되었습니다. 즐거운 레코딩 되세요.</p>
          {total() > 0 && (
            <p style={{ fontSize: "14px", color: "#1A1A1A", fontWeight: 500, marginBottom: "32px" }}>
              추가 서비스 비용 ₩{total().toLocaleString()}은 현장에서 결제하시면 됩니다.
            </p>
          )}
          <Link
            href="/"
            style={{ display: "inline-block", background: "#000", color: "#FAFAFA", padding: "14px 40px", fontSize: "14px", textDecoration: "none", letterSpacing: "0.5px" }}
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const STEPS_TOTAL = bookingPath === "existing" ? 6 : 7;
  const progress = Math.round((step / STEPS_TOTAL) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", fontFamily: "var(--font-dm-sans), sans-serif" }}>

      {/* ─── 헤더 ─── */}
      <div style={{ position: "sticky", top: 0, zIndex: 40, background: "#FAFAFA", borderBottom: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: "520px", margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", gap: "16px" }}>
          {step > 0 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as Step)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#5F5F5F", display: "flex" }}
            >
              <ArrowLeft style={{ width: "20px", height: "20px" }} />
            </button>
          ) : (
            <Link href="/" style={{ color: "#5F5F5F", display: "flex" }}>
              <ArrowLeft style={{ width: "20px", height: "20px" }} />
            </Link>
          )}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#8B8675", letterSpacing: "1px", marginBottom: "6px", textTransform: "uppercase" }}>
              <span>레코딩카페 예약</span>
              <span>{progress}%</span>
            </div>
            <div style={{ height: "2px", background: "#D3D3D3" }}>
              <div style={{ height: "100%", background: "#000000", width: `${progress}%`, transition: "width 0.4s ease" }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "520px", margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ─── STEP 0: 예약 유형 ─── */}
        {step === 0 && (
          <div>
            <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>예약 시작</p>
            <h1 style={{ fontSize: "28px", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "8px" }}>예약 유형을 선택하십시오</h1>
            <p style={{ fontSize: "14px", color: "#5F5F5F", marginBottom: "32px", lineHeight: 1.75 }}>클룩, 네이버 등 다른 플랫폼에서 이미 예약하셨습니까?</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                onClick={() => { setBookingPath("existing"); setStep(1); }}
                style={{ width: "100%", textAlign: "left", padding: "24px", border: "1px solid #D3D3D3", background: "#FAFAFA", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                <p style={{ fontSize: "15px", fontWeight: 500, color: "#000", marginBottom: "4px" }}>기존 예약자</p>
                <p style={{ fontSize: "13px", color: "#5F5F5F" }}>다른 플랫폼(클룩·네이버 등)에서 이미 예약하셨습니까?</p>
              </button>
              <button
                onClick={() => { setBookingPath("homepage"); setStep(1); }}
                style={{ width: "100%", textAlign: "left", padding: "24px", border: "1px solid #D3D3D3", background: "#FAFAFA", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                <p style={{ fontSize: "15px", fontWeight: 500, color: "#000", marginBottom: "4px" }}>처음 예약자</p>
                <p style={{ fontSize: "13px", color: "#5F5F5F" }}>홈페이지를 통해 처음 예약하십니까?</p>
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 1 (기존): 플랫폼 선택 ─── */}
        {step === 1 && bookingPath === "existing" && (
          <div>
            <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>예약 플랫폼</p>
            <h1 style={{ fontSize: "28px", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "8px" }}>어디에서 예약하셨습니까?</h1>
            <p style={{ fontSize: "14px", color: "#5F5F5F", marginBottom: "28px" }}>예약하신 플랫폼을 선택해주세요.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {PLATFORMS.map(p => (
                <button
                  key={p}
                  onClick={() => { setPlatform(p); setStep(2); }}
                  style={{
                    padding: "14px 16px",
                    border: platform === p ? "1px solid #000" : "1px solid #D3D3D3",
                    background: platform === p ? "#000" : "#FAFAFA",
                    color: platform === p ? "#FAFAFA" : "#5F5F5F",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── 날짜/시간 선택 (신규 Step 1, 기존 Step 2) ─── */}
        {((step === 1 && bookingPath === "homepage") || (step === 2 && bookingPath === "existing")) && (
          <div>
            <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>일정 선택</p>
            <h1 style={{ fontSize: "28px", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "8px" }}>날짜와 시간을 선택하십시오</h1>
            <p style={{ fontSize: "14px", color: "#5F5F5F", marginBottom: "28px" }}>원하시는 녹음 일정을 선택하십시오.</p>
            <SimpleCal value={selectedDate} onChange={d => { setSelectedDate(d); setSelectedTime(""); }} />
            {selectedDate && (
              <div style={{ marginTop: "24px" }}>
                <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>
                  {toLocalDate(selectedDate)} 시간 선택
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px" }}>
                  {ALL_SLOTS.map(slot => {
                    const booked = bookedTimes.includes(slot);
                    const isSel  = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        disabled={booked}
                        onClick={() => setSelectedTime(slot)}
                        style={{
                          padding: "8px 0",
                          fontSize: "13px",
                          border: isSel ? "1px solid #000" : "1px solid #D3D3D3",
                          background: isSel ? "#000" : booked ? "#F0EFEB" : "#FAFAFA",
                          color: isSel ? "#FAFAFA" : booked ? "#D3D3D3" : "#5F5F5F",
                          cursor: booked ? "not-allowed" : "pointer",
                          textDecoration: booked ? "line-through" : "none",
                          fontFamily: "var(--font-dm-sans), sans-serif",
                        }}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            <button
              onClick={() => setStep((s) => (s + 1) as Step)}
              disabled={!selectedDate || !selectedTime}
              style={{
                width: "100%", marginTop: "32px", padding: "14px",
                background: "#000", color: "#FAFAFA", border: "none",
                cursor: (!selectedDate || !selectedTime) ? "not-allowed" : "pointer",
                opacity: (!selectedDate || !selectedTime) ? 0.3 : 1,
                fontSize: "14px", fontFamily: "var(--font-dm-sans), sans-serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}
            >
              다음 <ArrowRight style={{ width: "16px", height: "16px" }} />
            </button>
          </div>
        )}

        {/* ─── 음료 선택 (신규 Step 2, 기존 Step 3) ─── */}
        {((step === 2 && bookingPath === "homepage") || (step === 3 && bookingPath === "existing")) && (
          <div>
            <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>음료 선택</p>
            <h1 style={{ fontSize: "28px", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "8px" }}>음료를 선택하십시오</h1>
            <p style={{ fontSize: "14px", color: "#5F5F5F", marginBottom: "28px" }}>녹음 중 즐기실 음료를 선택하십시오. 복수 선택 가능합니다.</p>
            <div style={{ border: "1px solid #D3D3D3" }}>
              {DRINK_CATALOG.map((drink, i) => (
                <div key={drink.id} style={{
                  padding: "14px 16px",
                  borderBottom: i < DRINK_CATALOG.length - 1 ? "1px solid #D3D3D3" : "none",
                  background: "#FAFAFA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "8px",
                }}>
                  <span style={{ fontSize: "14px", color: "#000", minWidth: "80px" }}>{drink.name}</span>
                  {drink.hasTemp ? (
                    <div style={{ display: "flex", gap: "16px" }}>
                      {(["hot", "iced"] as const).map(temp => (
                        <div key={temp} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "1px" }}>{temp === "hot" ? "HOT" : "ICE"}</span>
                          <button onClick={() => setDrinkQty(drink.id, temp, -1)} style={{ width: "24px", height: "24px", border: "1px solid #D3D3D3", background: "#FAFAFA", cursor: "pointer", fontSize: "14px", color: "#5F5F5F", fontFamily: "var(--font-dm-sans), sans-serif" }}>−</button>
                          <span style={{ fontSize: "13px", color: "#000", minWidth: "16px", textAlign: "center" }}>{getDrinkQty(drink.id, temp)}</span>
                          <button onClick={() => setDrinkQty(drink.id, temp, 1)} style={{ width: "24px", height: "24px", border: "1px solid #D3D3D3", background: "#FAFAFA", cursor: "pointer", fontSize: "14px", color: "#5F5F5F", fontFamily: "var(--font-dm-sans), sans-serif" }}>+</button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <button onClick={() => setDrinkQty(drink.id, "none", -1)} style={{ width: "24px", height: "24px", border: "1px solid #D3D3D3", background: "#FAFAFA", cursor: "pointer", fontSize: "14px", color: "#5F5F5F", fontFamily: "var(--font-dm-sans), sans-serif" }}>−</button>
                      <span style={{ fontSize: "13px", color: "#000", minWidth: "16px", textAlign: "center" }}>{getDrinkQty(drink.id, "none")}</span>
                      <button onClick={() => setDrinkQty(drink.id, "none", 1)} style={{ width: "24px", height: "24px", border: "1px solid #D3D3D3", background: "#FAFAFA", cursor: "pointer", fontSize: "14px", color: "#5F5F5F", fontFamily: "var(--font-dm-sans), sans-serif" }}>+</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep((s) => (s + 1) as Step)}
              style={{ width: "100%", marginTop: "32px", padding: "14px", background: "#000", color: "#FAFAFA", border: "none", cursor: "pointer", fontSize: "14px", fontFamily: "var(--font-dm-sans), sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            >
              다음 <ArrowRight style={{ width: "16px", height: "16px" }} />
            </button>
          </div>
        )}

        {/* ─── 사운드 보정 (신규 Step 3, 기존 Step 4) ─── */}
        {((step === 3 && bookingPath === "homepage") || (step === 4 && bookingPath === "existing")) && (
          <div>
            <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>사운드 보정</p>
            <h1 style={{ fontSize: "28px", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "8px" }}>사운드 보정 서비스</h1>
            <p style={{ fontSize: "14px", color: "#5F5F5F", marginBottom: "28px" }}>하나를 선택하십시오.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {MIXING_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setMixing(opt.id)}
                  style={{ width: "100%", textAlign: "left", padding: "20px", border: mixing === opt.id ? "1px solid #000" : "1px solid #D3D3D3", background: mixing === opt.id ? "#F0EFEB" : "#FAFAFA", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontSize: "15px", fontWeight: 500, color: "#000", marginBottom: "4px" }}>{opt.name}</p>
                      <p style={{ fontSize: "13px", color: "#5F5F5F", lineHeight: 1.6 }}>{opt.desc}</p>
                    </div>
                    <span style={{ fontSize: "14px", fontWeight: 500, color: opt.price === 0 ? "#8B8675" : "#000", marginLeft: "16px", flexShrink: 0 }}>{fmt(opt.price)}</span>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep((s) => (s + 1) as Step)}
              style={{ width: "100%", marginTop: "32px", padding: "14px", background: "#000", color: "#FAFAFA", border: "none", cursor: "pointer", fontSize: "14px", fontFamily: "var(--font-dm-sans), sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            >
              다음 <ArrowRight style={{ width: "16px", height: "16px" }} />
            </button>
          </div>
        )}

        {/* ─── 영상 서비스 + 추가 옵션 (신규 Step 4, 기존 Step 5) ─── */}
        {((step === 4 && bookingPath === "homepage") || (step === 5 && bookingPath === "existing")) && (
          <div>
            <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>영상 서비스</p>
            <h1 style={{ fontSize: "28px", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "8px" }}>영상 서비스</h1>
            <p style={{ fontSize: "14px", color: "#5F5F5F", marginBottom: "28px" }}>녹음 영상을 어떻게 촬영하시겠습니까?</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "32px" }}>
              {VIDEO_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setVideo(opt.id)}
                  style={{ width: "100%", textAlign: "left", padding: "20px", border: video === opt.id ? "1px solid #000" : "1px solid #D3D3D3", background: video === opt.id ? "#F0EFEB" : "#FAFAFA", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontSize: "15px", fontWeight: 500, color: "#000", marginBottom: "4px" }}>{opt.name}</p>
                      <p style={{ fontSize: "13px", color: "#5F5F5F", lineHeight: 1.6 }}>{opt.desc}</p>
                    </div>
                    <span style={{ fontSize: "14px", fontWeight: 500, color: opt.price === 0 ? "#8B8675" : "#000", marginLeft: "16px", flexShrink: 0 }}>{fmt(opt.price)}</span>
                  </div>
                </button>
              ))}
            </div>

            <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>추가 옵션 (복수 선택 가능)</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
              {/* 앨범 발매 */}
              <div style={{ border: album ? "1px solid #000" : "1px solid #D3D3D3", background: album ? "#F0EFEB" : "#FAFAFA", padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <input type="checkbox" checked={album}
                    onChange={e => { setAlbum(e.target.checked); if (e.target.checked) setProAlbum(false); }}
                    style={{ width: "16px", height: "16px", marginTop: "2px", cursor: "pointer", accentColor: "#000", flexShrink: 0 }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <p style={{ fontSize: "15px", fontWeight: 500, color: "#000" }}>{ALBUM_OPTION.name}</p>
                      <span style={{ fontSize: "14px", fontWeight: 500, color: "#000", marginLeft: "16px", flexShrink: 0 }}>{fmt(ALBUM_OPTION.price)}</span>
                    </div>
                    <p style={{ fontSize: "13px", color: "#5F5F5F", marginTop: "4px", lineHeight: 1.6 }}>{ALBUM_OPTION.desc}</p>
                    <button
                      onClick={() => setAlbumOpen(v => !v)}
                      style={{ fontSize: "12px", color: "#8B8675", background: "none", border: "none", cursor: "pointer", padding: "6px 0 0", fontFamily: "var(--font-dm-sans), sans-serif" }}
                    >
                      {albumOpen ? "접기 ▲" : "자세히 보기 ▼"}
                    </button>
                    {albumOpen && (
                      <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                        {ALBUM_OPTION.features.map(f => (
                          <div key={f.title} style={{ display: "flex", gap: "8px", fontSize: "12px", color: "#5F5F5F" }}>
                            <span style={{ color: "#000", flexShrink: 0 }}>—</span>
                            <span><span style={{ color: "#000", fontWeight: 500 }}>{f.title}</span> {f.desc}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 전문가 앨범 */}
              <div style={{ border: proAlbum ? "1px solid #000" : "1px solid #D3D3D3", background: proAlbum ? "#F0EFEB" : "#FAFAFA", padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <input type="checkbox" checked={proAlbum}
                    onChange={e => { setProAlbum(e.target.checked); if (e.target.checked) setAlbum(false); }}
                    style={{ width: "16px", height: "16px", marginTop: "2px", cursor: "pointer", accentColor: "#000", flexShrink: 0 }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <p style={{ fontSize: "15px", fontWeight: 500, color: "#000" }}>{PRO_ALBUM_OPTION.name}</p>
                      <span style={{ fontSize: "14px", fontWeight: 500, color: "#000", marginLeft: "16px", flexShrink: 0 }}>{fmt(PRO_ALBUM_OPTION.price)}</span>
                    </div>
                    <p style={{ fontSize: "13px", color: "#5F5F5F", marginTop: "4px", lineHeight: 1.6 }}>{PRO_ALBUM_OPTION.desc}</p>
                  </div>
                </div>
              </div>

              {/* LP 레코드 */}
              <div style={{ border: lp ? "1px solid #000" : "1px solid #D3D3D3", background: lp ? "#F0EFEB" : "#FAFAFA", padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <input type="checkbox" checked={lp} onChange={e => setLp(e.target.checked)}
                    style={{ width: "16px", height: "16px", marginTop: "2px", cursor: "pointer", accentColor: "#000", flexShrink: 0 }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <p style={{ fontSize: "15px", fontWeight: 500, color: "#000" }}>{LP_OPTION.name}</p>
                      <span style={{ fontSize: "14px", fontWeight: 500, color: "#000", marginLeft: "16px", flexShrink: 0 }}>{fmt(LP_OPTION.price)}</span>
                    </div>
                    <p style={{ fontSize: "13px", color: "#5F5F5F", marginTop: "4px", lineHeight: 1.6 }}>{LP_OPTION.desc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 유튜브 URL */}
            <div style={{ marginBottom: "32px" }}>
              <label style={labelStyle}>반주 URL (YouTube) — 선택 사항</label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={e => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                style={inputStyle}
              />
            </div>

            <button
              onClick={() => setStep((s) => (s + 1) as Step)}
              style={{ width: "100%", padding: "14px", background: "#000", color: "#FAFAFA", border: "none", cursor: "pointer", fontSize: "14px", fontFamily: "var(--font-dm-sans), sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            >
              다음 <ArrowRight style={{ width: "16px", height: "16px" }} />
            </button>
          </div>
        )}

        {/* ─── 고객 정보 + 최종 확인 (신규 Step 5, 기존 Step 6) ─── */}
        {((step === 5 && bookingPath === "homepage") || (step === 6 && bookingPath === "existing")) && (
          <div>
            <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>고객 정보</p>
            <h1 style={{ fontSize: "28px", fontWeight: 400, color: "#000", letterSpacing: "-1px", marginBottom: "8px" }}>고객 정보를 입력하십시오</h1>
            <p style={{ fontSize: "14px", color: "#5F5F5F", marginBottom: "28px" }}>예약 확인을 위해 정보를 입력해주십시오.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
              <div>
                <label style={labelStyle}>이름 <span style={{ color: "#c00000" }}>*</span></label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="이름을 입력하십시오" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>전화번호 <span style={{ color: "#c00000" }}>*</span></label>
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="010-0000-0000" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>이메일 (선택)</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" style={inputStyle} />
              </div>
            </div>

            {/* 예약 요약 */}
            <div style={{ border: "1px solid #D3D3D3", background: "#F0EFEB", padding: "24px", marginBottom: "24px" }}>
              <p style={{ fontSize: "11px", color: "#8B8675", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>예약 요약</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
                {bookingPath === "existing" && platform && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#5F5F5F" }}>예약 플랫폼</span>
                    <span style={{ color: "#000" }}>{platform}</span>
                  </div>
                )}
                {selectedDate && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#5F5F5F" }}>날짜</span>
                    <span style={{ color: "#000" }}>{toLocalDate(selectedDate)}</span>
                  </div>
                )}
                {selectedTime && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#5F5F5F" }}>시간</span>
                    <span style={{ color: "#000" }}>{selectedTime}</span>
                  </div>
                )}
                {drinks.length > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#5F5F5F" }}>음료</span>
                    <span style={{ color: "#000", textAlign: "right", maxWidth: "60%" }}>{drinkSummary}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#5F5F5F" }}>사운드 보정</span>
                  <span style={{ color: "#000" }}>{MIXING_OPTIONS.find(o => o.id === mixing)?.name}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#5F5F5F" }}>영상 서비스</span>
                  <span style={{ color: "#000" }}>{VIDEO_OPTIONS.find(o => o.id === video)?.name}</span>
                </div>
                {album && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#5F5F5F" }}>앨범 발매</span>
                    <span style={{ color: "#000" }}>{fmt(ALBUM_OPTION.price)}</span>
                  </div>
                )}
                {proAlbum && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#5F5F5F" }}>전문가 앨범</span>
                    <span style={{ color: "#000" }}>{fmt(PRO_ALBUM_OPTION.price)}</span>
                  </div>
                )}
                {lp && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#5F5F5F" }}>LP 레코드</span>
                    <span style={{ color: "#000" }}>{fmt(LP_OPTION.price)}</span>
                  </div>
                )}
                <div style={{ borderTop: "1px solid #D3D3D3", paddingTop: "12px", marginTop: "4px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "14px", fontWeight: 500, color: "#000" }}>추가 서비스 합계</span>
                  <span style={{ fontSize: "16px", fontWeight: 500, color: "#000" }}>{total() === 0 ? "무료" : `₩${total().toLocaleString()}`}</span>
                </div>
                {total() > 0 && (
                  <p style={{ fontSize: "11px", color: "#8B8675" }}>※ 추가 서비스 비용은 현장에서 결제하시면 됩니다.</p>
                )}
              </div>
            </div>

            {error && <p style={{ fontSize: "13px", color: "#c00000", marginBottom: "16px" }}>{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              style={{
                width: "100%", padding: "16px",
                background: "#000", color: "#FAFAFA", border: "none",
                cursor: submitting ? "not-allowed" : "pointer",
                opacity: submitting ? 0.5 : 1,
                fontSize: "15px", fontWeight: 500,
                fontFamily: "var(--font-dm-sans), sans-serif",
                letterSpacing: "0.5px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}
            >
              {submitting ? "처리 중..." : "예약 완료하기"}
              {!submitting && <Check style={{ width: "18px", height: "18px" }} />}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
