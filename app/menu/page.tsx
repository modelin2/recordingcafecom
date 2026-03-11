"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  { id: "self",       name: "셀프 촬영",          price: 0,      desc: "셀피용 스탠드 제공, 자신의 휴대폰으로 직접 촬영" },
  { id: "cameraman",  name: "셀프 + 촬영기사",    price: 20000,  desc: "촬영기사가 DSLR로 노래하는 모습 촬영 (원본 파일 제공)" },
  { id: "mv",         name: "AI 숏폼 뮤직비디오", price: 100000, desc: "1분 이내 AI가 생성한 숏폼 뮤직비디오" },
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
  { id: "coffee",         name: "커피",        hasTemp: true  },
  { id: "coffee-decaf",   name: "디카페인",    hasTemp: true  },
  { id: "green-tea",      name: "녹차",        hasTemp: true  },
  { id: "hibiscus",       name: "히비스커스",  hasTemp: true  },
  { id: "earl-grey",      name: "얼그레이",    hasTemp: true  },
  { id: "peppermint",     name: "페퍼민트",    hasTemp: true  },
  { id: "chamomile",      name: "캐모마일",    hasTemp: true  },
  { id: "lemonade",       name: "레몬에이드",  hasTemp: false },
  { id: "strawberry-ade", name: "딸기에이드",  hasTemp: false },
  { id: "orange-ade",     name: "오렌지에이드",hasTemp: false },
  { id: "grapefruit-ade", name: "자몽에이드",  hasTemp: false },
  { id: "iced-tea",       name: "아이스티",    hasTemp: false },
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
function SimpleCal({
  value, onChange,
}: { value: Date | null; onChange: (d: Date) => void }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = month.getFullYear();
  const mon  = month.getMonth();
  const firstDay = new Date(year, mon, 1).getDay();
  const daysInMonth = new Date(year, mon + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div style={{ border: "1px solid #D3D3D3", background: "#FAFAFA", maxWidth: 320, padding: 24, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <button
          onClick={() => setMonth(new Date(year, mon - 1, 1))}
          style={{ padding: "4px 8px", color: "#5F5F5F", background: "none", border: "none", cursor: "pointer", fontSize: 14 }}
        >
          ◀
        </button>
        <span style={{ color: "#000000", fontWeight: 400, fontSize: 15 }}>{year}년 {mon + 1}월</span>
        <button
          onClick={() => setMonth(new Date(year, mon + 1, 1))}
          style={{ padding: "4px 8px", color: "#5F5F5F", background: "none", border: "none", cursor: "pointer", fontSize: 14 }}
        >
          ▶
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, textAlign: "center", marginBottom: 6 }}>
        {["일","월","화","수","목","금","토"].map(d => (
          <span key={d} style={{ color: "#8B8675", fontSize: 11, textTransform: "uppercase", fontWeight: 500 }}>{d}</span>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {cells.map((day, i) => {
          if (!day) return <span key={i} />;
          const d = new Date(year, mon, day);
          d.setHours(0, 0, 0, 0);
          const isPast = d < today;
          const isSel = value && toLocalDate(d) === toLocalDate(value);
          return (
            <button
              key={i}
              disabled={isPast}
              onClick={() => onChange(d)}
              style={{
                padding: "6px 2px",
                fontSize: 14,
                fontWeight: isSel ? 600 : 400,
                background: isSel ? "#000000" : "transparent",
                color: isSel ? "#FFFFFF" : isPast ? "#000000" : "#1A1A1A",
                opacity: isPast ? 0.2 : 1,
                cursor: isPast ? "not-allowed" : "pointer",
                border: "none",
                outline: "none",
              }}
              onMouseEnter={e => {
                if (!isPast && !isSel) (e.currentTarget as HTMLButtonElement).style.background = "#F0EFEB";
              }}
              onMouseLeave={e => {
                if (!isPast && !isSel) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
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

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────
export default function MenuPage() {
  const router = useRouter();
  const [step, setStep]             = useState<Step>(0);
  const [bookingPath, setBookingPath] = useState<"existing" | "homepage" | null>(null);
  const [platform, setPlatform]     = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedTimes, setBookedTimes]   = useState<string[]>([]);
  const [drinks, setDrinks]         = useState<DrinkOrder[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [name, setName]             = useState("");
  const [phone, setPhone]           = useState("");
  const [email, setEmail]           = useState("");
  const [mixing, setMixing]         = useState("basic");
  const [video, setVideo]           = useState("self");
  const [album, setAlbum]           = useState(false);
  const [proAlbum, setProAlbum]     = useState(false);
  const [lp, setLp]                 = useState(false);
  const [albumOpen, setAlbumOpen]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]             = useState(false);
  const [error, setError]           = useState("");

  // 예약된 시간 조회
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

  // 총 금액 계산
  const total = useCallback(() => {
    let t = 0;
    t += MIXING_OPTIONS.find(o => o.id === mixing)?.price ?? 0;
    t += VIDEO_OPTIONS.find(o => o.id === video)?.price ?? 0;
    if (album) t += ALBUM_OPTION.price;
    if (proAlbum) t += PRO_ALBUM_OPTION.price;
    if (lp) t += LP_OPTION.price;
    return t;
  }, [mixing, video, album, proAlbum, lp]);

  // 음료 수량 조절
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

  // 예약 제출
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
      <div style={{ minHeight: "100vh", background: "#FAFAFA", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <div style={{ width: 64, height: 64, background: "#000000", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <span style={{ color: "#FFFFFF", fontSize: 28 }}>✓</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 400, color: "#000000", marginBottom: 12, letterSpacing: "-1px" }}>예약 완료!</h1>
          <p style={{ color: "#5F5F5F", marginBottom: 8 }}>선택이 완료되었습니다. 즐거운 레코딩 되세요!</p>
          {total() > 0 && (
            <p style={{ color: "#000000", fontWeight: 500, marginBottom: 24 }}>
              추가 서비스 비용 ₩{total().toLocaleString()}은 현장에서 결제하시면 됩니다.
            </p>
          )}
          <Link
            href="/"
            style={{ display: "inline-block", background: "#000000", color: "#FFFFFF", fontWeight: 500, padding: "12px 32px", textDecoration: "none" }}
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  // ─── 진행 바 ─────────────────────────────────────────────────────────────────
  const STEPS_TOTAL = bookingPath === "existing" ? 6 : 7;
  const progress = Math.round((step / STEPS_TOTAL) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", color: "#000000", fontFamily: "var(--font-dm-sans), sans-serif" }}>
      {/* 헤더 */}
      <div style={{ position: "sticky", top: 0, zIndex: 40, background: "#FAFAFA", borderBottom: "1px solid #D3D3D3" }}>
        <div style={{ maxWidth: 512, margin: "0 auto", padding: "16px", display: "flex", alignItems: "center", gap: 12 }}>
          {step > 0 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as Step)}
              style={{ color: "#5F5F5F", background: "none", border: "none", cursor: "pointer", fontSize: 18, padding: "4px 8px" }}
            >
              ←
            </button>
          ) : (
            <Link href="/" style={{ color: "#5F5F5F", textDecoration: "none", fontSize: 18, padding: "4px 8px" }}>←</Link>
          )}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#8B8675", marginBottom: 4 }}>
              <span>레코딩카페 예약</span>
              <span>{progress}%</span>
            </div>
            <div style={{ height: 2, background: "#D3D3D3", overflow: "hidden" }}>
              <div
                style={{ height: "100%", background: "#000000", transition: "width 0.5s", width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 512, margin: "0 auto", padding: "32px 16px" }}>

        {/* ─── STEP 0: 예약 유형 선택 ─────────────────────────────────────── */}
        {step === 0 && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 400, color: "#000000", marginBottom: 8, letterSpacing: "-1px" }}>예약 유형을 선택하세요</h1>
            <p style={{ color: "#5F5F5F", marginBottom: 32, fontSize: 14 }}>클룩, 네이버 등 다른 플랫폼에서 이미 예약하셨나요?</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <button
                onClick={() => { setBookingPath("existing"); setStep(1); }}
                style={{ width: "100%", textAlign: "left", padding: 20, border: "1px solid #D3D3D3", background: "#FAFAFA", cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "#F0EFEB"}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "#FAFAFA"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                  <span style={{ color: "#000000", fontSize: 16 }}>✓</span>
                  <span style={{ fontWeight: 500, color: "#000000", fontSize: 17 }}>기존 예약자</span>
                </div>
                <p style={{ color: "#5F5F5F", fontSize: 14, paddingLeft: 28 }}>다른 플랫폼 (클룩·네이버 등)에서 이미 예약하셨나요?</p>
              </button>
              <button
                onClick={() => { setBookingPath("homepage"); setStep(1); }}
                style={{ width: "100%", textAlign: "left", padding: 20, border: "1px solid #D3D3D3", background: "#FAFAFA", cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "#F0EFEB"}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "#FAFAFA"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                  <span style={{ color: "#000000", fontSize: 16 }}>★</span>
                  <span style={{ fontWeight: 500, color: "#000000", fontSize: 17 }}>처음 예약자</span>
                </div>
                <p style={{ color: "#5F5F5F", fontSize: 14, paddingLeft: 28 }}>홈페이지로 처음 방문하셨나요? 지금 바로 예약하세요!</p>
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 1: 플랫폼 선택 (기존 예약자) 또는 날짜 선택 ─────────── */}
        {step === 1 && bookingPath === "existing" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 400, color: "#000000", marginBottom: 8, letterSpacing: "-1px" }}>예약 플랫폼 선택</h1>
            <p style={{ color: "#5F5F5F", marginBottom: 32, fontSize: 14 }}>어디에서 예약하셨나요?</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {PLATFORMS.map(p => (
                <button
                  key={p}
                  onClick={() => { setPlatform(p); setStep(2); }}
                  style={{
                    padding: 16,
                    border: platform === p ? "1px solid #000000" : "1px solid #D3D3D3",
                    background: platform === p ? "#000000" : "#FAFAFA",
                    color: platform === p ? "#FFFFFF" : "#5F5F5F",
                    fontWeight: 500,
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && bookingPath === "homepage" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 400, color: "#000000", marginBottom: 8, letterSpacing: "-1px" }}>날짜와 시간을 선택하세요</h1>
            <p style={{ color: "#5F5F5F", marginBottom: 24, fontSize: 14 }}>원하시는 녹음 일정을 선택하세요</p>
            <SimpleCal value={selectedDate} onChange={d => { setSelectedDate(d); setSelectedTime(""); }} />
            {selectedDate && (
              <div style={{ marginTop: 24 }}>
                <p style={{ color: "#5F5F5F", fontSize: 14, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <span>🕐</span>
                  {toLocalDate(selectedDate)} 시간 선택
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                  {ALL_SLOTS.map(slot => {
                    const booked = bookedTimes.includes(slot);
                    const selected = selectedTime === slot && !booked;
                    return (
                      <button
                        key={slot}
                        disabled={booked}
                        onClick={() => setSelectedTime(slot)}
                        style={{
                          padding: "8px 4px",
                          fontSize: 13,
                          fontWeight: 400,
                          background: selected ? "#000000" : booked ? "#F0EFEB" : "#F0EFEB",
                          color: selected ? "#FFFFFF" : booked ? "#5F5F5F" : "#5F5F5F",
                          border: "1px solid #D3D3D3",
                          cursor: booked ? "not-allowed" : "pointer",
                          opacity: booked ? 0.4 : 1,
                          textDecoration: booked ? "line-through" : "none",
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
              onClick={() => setStep(2)}
              disabled={!selectedDate || !selectedTime}
              style={{
                width: "100%",
                marginTop: 32,
                padding: "14px 0",
                background: "#000000",
                color: "#FFFFFF",
                fontWeight: 500,
                fontSize: 16,
                border: "none",
                cursor: (!selectedDate || !selectedTime) ? "not-allowed" : "pointer",
                opacity: (!selectedDate || !selectedTime) ? 0.3 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              다음 →
            </button>
          </div>
        )}

        {/* ─── STEP 2: 날짜/시간 (기존) 또는 음료 선택 ────────────────────── */}
        {step === 2 && bookingPath === "existing" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 400, color: "#000000", marginBottom: 8, letterSpacing: "-1px" }}>날짜와 시간을 선택하세요</h1>
            <p style={{ color: "#5F5F5F", marginBottom: 24, fontSize: 14 }}>원하시는 녹음 일정을 선택하세요</p>
            <SimpleCal value={selectedDate} onChange={d => { setSelectedDate(d); setSelectedTime(""); }} />
            {selectedDate && (
              <div style={{ marginTop: 24 }}>
                <p style={{ color: "#5F5F5F", fontSize: 14, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <span>🕐</span>
                  {toLocalDate(selectedDate)} 시간 선택
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                  {ALL_SLOTS.map(slot => {
                    const booked = bookedTimes.includes(slot);
                    const selected = selectedTime === slot && !booked;
                    return (
                      <button
                        key={slot}
                        disabled={booked}
                        onClick={() => setSelectedTime(slot)}
                        style={{
                          padding: "8px 4px",
                          fontSize: 13,
                          fontWeight: 400,
                          background: selected ? "#000000" : "#F0EFEB",
                          color: selected ? "#FFFFFF" : "#5F5F5F",
                          border: "1px solid #D3D3D3",
                          cursor: booked ? "not-allowed" : "pointer",
                          opacity: booked ? 0.4 : 1,
                          textDecoration: booked ? "line-through" : "none",
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
              onClick={() => setStep(3)}
              disabled={!selectedDate || !selectedTime}
              style={{
                width: "100%",
                marginTop: 32,
                padding: "14px 0",
                background: "#000000",
                color: "#FFFFFF",
                fontWeight: 500,
                fontSize: 16,
                border: "none",
                cursor: (!selectedDate || !selectedTime) ? "not-allowed" : "pointer",
                opacity: (!selectedDate || !selectedTime) ? 0.3 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              다음 →
            </button>
          </div>
        )}

        {/* 음료 선택 - step에 따라 다른 번호 */}
        {((step === 2 && bookingPath === "homepage") || (step === 3 && bookingPath === "existing")) && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 400, color: "#000000", marginBottom: 8, letterSpacing: "-1px" }}>음료를 선택하세요</h1>
            <p style={{ color: "#5F5F5F", marginBottom: 24, fontSize: 14 }}>녹음 중 즐기실 음료를 선택하세요 (복수 선택 가능)</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {DRINK_CATALOG.map(drink => (
                <div key={drink.id} style={{ border: "1px solid #D3D3D3", background: "#F0EFEB", padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ color: "#1A1A1A", fontWeight: 500 }}>{drink.name}</span>
                  </div>
                  {drink.hasTemp ? (
                    <div style={{ display: "flex", gap: 16 }}>
                      {(["hot", "iced"] as const).map(temp => (
                        <div key={temp} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 11, fontWeight: 500, color: temp === "hot" ? "#c00000" : "#1A1A1A", textTransform: "uppercase" }}>
                            {temp === "hot" ? "HOT" : "ICE"}
                          </span>
                          <button
                            onClick={() => setDrinkQty(drink.id, temp, -1)}
                            style={{ width: 26, height: 26, background: "#FAFAFA", border: "1px solid #D3D3D3", color: "#1A1A1A", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            −
                          </button>
                          <span style={{ color: "#1A1A1A", fontSize: 14, width: 20, textAlign: "center" }}>{getDrinkQty(drink.id, temp)}</span>
                          <button
                            onClick={() => setDrinkQty(drink.id, temp, 1)}
                            style={{ width: 26, height: 26, background: "#FAFAFA", border: "1px solid #D3D3D3", color: "#1A1A1A", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button
                        onClick={() => setDrinkQty(drink.id, "none", -1)}
                        style={{ width: 26, height: 26, background: "#FAFAFA", border: "1px solid #D3D3D3", color: "#1A1A1A", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        −
                      </button>
                      <span style={{ color: "#1A1A1A", fontSize: 14, width: 20, textAlign: "center" }}>{getDrinkQty(drink.id, "none")}</span>
                      <button
                        onClick={() => setDrinkQty(drink.id, "none", 1)}
                        style={{ width: 26, height: 26, background: "#FAFAFA", border: "1px solid #D3D3D3", color: "#1A1A1A", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep((s) => (s + 1) as Step)}
              style={{
                width: "100%",
                marginTop: 32,
                padding: "14px 0",
                background: "#000000",
                color: "#FFFFFF",
                fontWeight: 500,
                fontSize: 16,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              다음 →
            </button>
          </div>
        )}

        {/* 사운드 보정 선택 */}
        {((step === 3 && bookingPath === "homepage") || (step === 4 && bookingPath === "existing")) && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 400, color: "#000000", marginBottom: 8, letterSpacing: "-1px" }}>사운드 보정 서비스</h1>
            <p style={{ color: "#5F5F5F", marginBottom: 24, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <span>♪</span> 하나를 선택해주세요
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {MIXING_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setMixing(opt.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: 20,
                    border: mixing === opt.id ? "1px solid #000000" : "1px solid #D3D3D3",
                    background: mixing === opt.id ? "#F0EFEB" : "#FAFAFA",
                    cursor: "pointer",
                    transition: "border-color 0.15s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <span style={{ fontWeight: 500, color: "#000000" }}>{opt.name}</span>
                      <p style={{ color: "#5F5F5F", fontSize: 13, marginTop: 4 }}>{opt.desc}</p>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: mixing === opt.id ? 500 : 400, color: mixing === opt.id ? "#000000" : "#5F5F5F", marginLeft: 16, flexShrink: 0 }}>
                      {fmt(opt.price)}
                    </span>
                  </div>
                  {mixing === opt.id && <span style={{ color: "#000000", fontSize: 13, marginTop: 8, display: "block" }}>✓</span>}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep((s) => (s + 1) as Step)}
              style={{
                width: "100%",
                marginTop: 32,
                padding: "14px 0",
                background: "#000000",
                color: "#FFFFFF",
                fontWeight: 500,
                fontSize: 16,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              다음 →
            </button>
          </div>
        )}

        {/* 영상 서비스 선택 */}
        {((step === 4 && bookingPath === "homepage") || (step === 5 && bookingPath === "existing")) && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 400, color: "#000000", marginBottom: 8, letterSpacing: "-1px" }}>영상 서비스</h1>
            <p style={{ color: "#5F5F5F", marginBottom: 24, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <span>▶</span> 녹음 영상을 어떻게 촬영하시겠어요?
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {VIDEO_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setVideo(opt.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: 20,
                    border: video === opt.id ? "1px solid #000000" : "1px solid #D3D3D3",
                    background: video === opt.id ? "#F0EFEB" : "#FAFAFA",
                    cursor: "pointer",
                    transition: "border-color 0.15s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <span style={{ fontWeight: 500, color: "#000000" }}>{opt.name}</span>
                      <p style={{ color: "#5F5F5F", fontSize: 13, marginTop: 4 }}>{opt.desc}</p>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: video === opt.id ? 500 : 400, color: video === opt.id ? "#000000" : "#5F5F5F", marginLeft: 16, flexShrink: 0 }}>
                      {fmt(opt.price)}
                    </span>
                  </div>
                  {video === opt.id && <span style={{ color: "#000000", fontSize: 13, marginTop: 8, display: "block" }}>✓</span>}
                </button>
              ))}
            </div>

            {/* 앨범 발매 */}
            <div style={{ marginTop: 24 }}>
              <p style={{ color: "#5F5F5F", fontSize: 14, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span>◉</span> 선택 사항 (복수 선택 가능)
              </p>
              {/* 앨범 발매 */}
              <div style={{ border: album ? "1px solid #000000" : "1px solid #D3D3D3", background: album ? "#F0EFEB" : "#FAFAFA", marginBottom: 12, transition: "all 0.15s" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: 20 }}>
                  <input
                    type="checkbox"
                    checked={album}
                    onChange={e => { setAlbum(e.target.checked); if (e.target.checked) setProAlbum(false); }}
                    style={{ width: 18, height: 18, marginTop: 2, flexShrink: 0, cursor: "pointer", accentColor: "#000000" }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: 500, color: "#000000" }}>{ALBUM_OPTION.name}</span>
                      <span style={{ color: "#000000", fontWeight: 500, fontSize: 13 }}>{fmt(ALBUM_OPTION.price)}</span>
                    </div>
                    <p style={{ color: "#5F5F5F", fontSize: 13, marginTop: 4 }}>{ALBUM_OPTION.desc}</p>
                    <button
                      onClick={() => setAlbumOpen(v => !v)}
                      style={{ fontSize: 12, color: "#8B8675", marginTop: 8, background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 4 }}
                    >
                      자세히 보기 {albumOpen ? "▲" : "▼"}
                    </button>
                    {albumOpen && (
                      <ul style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8, listStyle: "none", padding: 0 }}>
                        {ALBUM_OPTION.features.map(f => (
                          <li key={f.title} style={{ display: "flex", gap: 8, fontSize: 12, color: "#5F5F5F" }}>
                            <span style={{ color: "#000000", flexShrink: 0 }}>✓</span>
                            <div><span style={{ color: "#000000", fontWeight: 500 }}>{f.title}</span> — {f.desc}</div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* 전문가 앨범 */}
              <div style={{ border: proAlbum ? "1px solid #000000" : "1px solid #D3D3D3", background: proAlbum ? "#F0EFEB" : "#FAFAFA", marginBottom: 12, transition: "all 0.15s" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: 20 }}>
                  <input
                    type="checkbox"
                    checked={proAlbum}
                    onChange={e => { setProAlbum(e.target.checked); if (e.target.checked) setAlbum(false); }}
                    style={{ width: 18, height: 18, marginTop: 2, flexShrink: 0, cursor: "pointer", accentColor: "#000000" }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: 500, color: "#000000" }}>{PRO_ALBUM_OPTION.name}</span>
                      <span style={{ color: "#000000", fontWeight: 500, fontSize: 13 }}>{fmt(PRO_ALBUM_OPTION.price)}</span>
                    </div>
                    <p style={{ color: "#5F5F5F", fontSize: 13, marginTop: 4 }}>{PRO_ALBUM_OPTION.desc}</p>
                  </div>
                </div>
              </div>

              {/* LP */}
              <div style={{ border: lp ? "1px solid #000000" : "1px solid #D3D3D3", background: lp ? "#F0EFEB" : "#FAFAFA", transition: "all 0.15s" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: 20 }}>
                  <input
                    type="checkbox"
                    checked={lp}
                    onChange={e => setLp(e.target.checked)}
                    style={{ width: 18, height: 18, marginTop: 2, flexShrink: 0, cursor: "pointer", accentColor: "#000000" }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: 500, color: "#000000" }}>{LP_OPTION.name}</span>
                      <span style={{ color: "#000000", fontWeight: 500, fontSize: 13 }}>{fmt(LP_OPTION.price)}</span>
                    </div>
                    <p style={{ color: "#5F5F5F", fontSize: 13, marginTop: 4 }}>{LP_OPTION.desc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 유튜브 반주 URL */}
            <div style={{ marginTop: 24 }}>
              <label style={{ color: "#5F5F5F", fontSize: 14, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                <span>▷</span> 반주 URL (YouTube) — 선택 사항
              </label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={e => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                style={{
                  width: "100%",
                  background: "#FAFAFA",
                  border: "1px solid #D3D3D3",
                  padding: "12px 16px",
                  color: "#1A1A1A",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              onClick={() => setStep((s) => (s + 1) as Step)}
              style={{
                width: "100%",
                marginTop: 32,
                padding: "14px 0",
                background: "#000000",
                color: "#FFFFFF",
                fontWeight: 500,
                fontSize: 16,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              다음 →
            </button>
          </div>
        )}

        {/* 고객 정보 입력 + 최종 확인 */}
        {((step === 5 && bookingPath === "homepage") || (step === 6 && bookingPath === "existing")) && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 400, color: "#000000", marginBottom: 8, letterSpacing: "-1px" }}>고객 정보 입력</h1>
            <p style={{ color: "#5F5F5F", marginBottom: 24, fontSize: 14 }}>예약 확인을 위해 정보를 입력해주세요</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ color: "#5F5F5F", fontSize: 13, marginBottom: 6, display: "block" }}>
                  이름 <span style={{ color: "#c00000" }}>*</span>
                </label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="이름을 입력하세요"
                  style={{
                    width: "100%",
                    background: "#FAFAFA",
                    border: "1px solid #D3D3D3",
                    padding: "12px 16px",
                    color: "#1A1A1A",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label style={{ color: "#5F5F5F", fontSize: 13, marginBottom: 6, display: "block" }}>
                  전화번호 <span style={{ color: "#c00000" }}>*</span>
                </label>
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  style={{
                    width: "100%",
                    background: "#FAFAFA",
                    border: "1px solid #D3D3D3",
                    padding: "12px 16px",
                    color: "#1A1A1A",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label style={{ color: "#5F5F5F", fontSize: 13, marginBottom: 6, display: "block" }}>이메일 (선택)</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  style={{
                    width: "100%",
                    background: "#FAFAFA",
                    border: "1px solid #D3D3D3",
                    padding: "12px 16px",
                    color: "#1A1A1A",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            {/* 선택 요약 */}
            <div style={{ marginTop: 32, background: "#F0EFEB", border: "1px solid #D3D3D3", padding: 20 }}>
              <h3 style={{ color: "#000000", fontWeight: 500, marginBottom: 16, fontSize: 15 }}>예약 요약</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
                {bookingPath === "existing" && platform && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#5F5F5F", paddingBottom: 8, borderBottom: "1px solid #D3D3D3" }}>
                    <span>예약 플랫폼</span><span style={{ color: "#1A1A1A" }}>{platform}</span>
                  </div>
                )}
                {selectedDate && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#5F5F5F", paddingBottom: 8, borderBottom: "1px solid #D3D3D3" }}>
                    <span>날짜</span><span style={{ color: "#1A1A1A" }}>{toLocalDate(selectedDate)}</span>
                  </div>
                )}
                {selectedTime && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#5F5F5F", paddingBottom: 8, borderBottom: "1px solid #D3D3D3" }}>
                    <span>시간</span><span style={{ color: "#1A1A1A" }}>{selectedTime}</span>
                  </div>
                )}
                {drinks.length > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#5F5F5F", paddingBottom: 8, borderBottom: "1px solid #D3D3D3" }}>
                    <span>음료</span><span style={{ color: "#1A1A1A", textAlign: "right", maxWidth: "60%" }}>{drinkSummary}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", color: "#5F5F5F", paddingBottom: 8, borderBottom: "1px solid #D3D3D3" }}>
                  <span>사운드 보정</span>
                  <span style={{ color: "#1A1A1A" }}>{MIXING_OPTIONS.find(o => o.id === mixing)?.name}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#5F5F5F", paddingBottom: 8, borderBottom: "1px solid #D3D3D3" }}>
                  <span>영상 서비스</span>
                  <span style={{ color: "#1A1A1A" }}>{VIDEO_OPTIONS.find(o => o.id === video)?.name}</span>
                </div>
                {album && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#5F5F5F", paddingBottom: 8, borderBottom: "1px solid #D3D3D3" }}>
                    <span>앨범 발매</span><span style={{ color: "#000000" }}>{fmt(ALBUM_OPTION.price)}</span>
                  </div>
                )}
                {proAlbum && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#5F5F5F", paddingBottom: 8, borderBottom: "1px solid #D3D3D3" }}>
                    <span>전문가 앨범</span><span style={{ color: "#000000" }}>{fmt(PRO_ALBUM_OPTION.price)}</span>
                  </div>
                )}
                {lp && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#5F5F5F", paddingBottom: 8, borderBottom: "1px solid #D3D3D3" }}>
                    <span>LP 레코드</span><span style={{ color: "#000000" }}>{fmt(LP_OPTION.price)}</span>
                  </div>
                )}
                <div style={{ paddingTop: 8, display: "flex", justifyContent: "space-between", fontWeight: 500 }}>
                  <span style={{ color: "#000000" }}>추가 서비스 합계</span>
                  <span style={{ color: "#000000", fontSize: 16 }}>{total() === 0 ? "무료" : `₩${total().toLocaleString()}`}</span>
                </div>
                {total() > 0 && (
                  <p style={{ fontSize: 12, color: "#8B8675" }}>※ 추가 서비스 비용은 현장에서 결제하시면 됩니다.</p>
                )}
              </div>
            </div>

            {error && <p style={{ color: "#c00000", fontSize: 14, marginTop: 16 }}>{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              style={{
                width: "100%",
                marginTop: 24,
                padding: "16px 0",
                background: "#000000",
                color: "#FFFFFF",
                fontWeight: 500,
                fontSize: 17,
                border: "none",
                cursor: submitting ? "not-allowed" : "pointer",
                opacity: submitting ? 0.3 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {submitting ? "처리 중..." : "예약 완료하기"}
              {!submitting && <span>✓</span>}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
