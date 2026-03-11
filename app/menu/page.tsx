"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Check, Clock, Music, Video,
  Disc, Star, X, Play, ChevronDown, ChevronUp
} from "lucide-react";

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
    <div className="bg-[#0f0f18] rounded-2xl p-4 w-full max-w-xs mx-auto">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setMonth(new Date(year, mon - 1, 1))} className="p-1 text-slate-400 hover:text-white">◀</button>
        <span className="text-white font-bold">{year}년 {mon + 1}월</span>
        <button onClick={() => setMonth(new Date(year, mon + 1, 1))} className="p-1 text-slate-400 hover:text-white">▶</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500 mb-1">
        {["일","월","화","수","목","금","토"].map(d => <span key={d}>{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
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
              className={`rounded-lg py-1.5 text-sm font-medium transition-all
                ${isPast ? "text-slate-700 cursor-not-allowed" : "hover:bg-[#D4AF37]/20 text-slate-300"}
                ${isSel ? "!bg-[#D4AF37] !text-black font-bold" : ""}`}
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
      <div className="min-h-screen bg-[#050508] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-[#D4AF37]" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">예약 완료!</h1>
          <p className="text-slate-400 mb-2">선택이 완료되었습니다. 즐거운 레코딩 되세요!</p>
          {total() > 0 && (
            <p className="text-[#D4AF37] font-bold mb-6">
              추가 서비스 비용 ₩{total().toLocaleString()}은 현장에서 결제하시면 됩니다.
            </p>
          )}
          <Link
            href="/"
            className="inline-block bg-[#D4AF37] text-black font-bold px-8 py-3 rounded-xl hover:bg-[#F0D060] transition-colors"
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
    <div className="min-h-screen bg-[#050508] text-white">
      {/* 헤더 */}
      <div className="sticky top-0 z-40 bg-[#050508]/95 backdrop-blur border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          {step > 0 ? (
            <button onClick={() => setStep((s) => (s - 1) as Step)} className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <Link href="/" className="text-slate-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
          )}
          <div className="flex-1">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>레코딩카페 예약</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D4AF37] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8">

        {/* ─── STEP 0: 예약 유형 선택 ─────────────────────────────────────── */}
        {step === 0 && (
          <div>
            <h1 className="text-2xl font-black text-white mb-2">예약 유형을 선택하세요</h1>
            <p className="text-slate-400 mb-8 text-sm">클룩, 네이버 등 다른 플랫폼에서 이미 예약하셨나요?</p>
            <div className="space-y-4">
              <button
                onClick={() => { setBookingPath("existing"); setStep(1); }}
                className="w-full text-left p-5 rounded-2xl border border-white/10 hover:border-[#D4AF37]/40 bg-[#0f0f18] transition-all group"
              >
                <div className="flex items-center gap-3 mb-1">
                  <Check className="w-5 h-5 text-[#D4AF37]" />
                  <span className="font-bold text-white text-lg">기존 예약자</span>
                </div>
                <p className="text-slate-400 text-sm pl-8">다른 플랫폼 (클룩·네이버 등)에서 이미 예약하셨나요?</p>
              </button>
              <button
                onClick={() => { setBookingPath("homepage"); setStep(1); }}
                className="w-full text-left p-5 rounded-2xl border border-white/10 hover:border-[#D4AF37]/40 bg-[#0f0f18] transition-all group"
              >
                <div className="flex items-center gap-3 mb-1">
                  <Star className="w-5 h-5 text-[#D4AF37]" />
                  <span className="font-bold text-white text-lg">처음 예약자</span>
                </div>
                <p className="text-slate-400 text-sm pl-8">홈페이지로 처음 방문하셨나요? 지금 바로 예약하세요!</p>
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 1: 플랫폼 선택 (기존 예약자) 또는 날짜 선택 ─────────── */}
        {step === 1 && bookingPath === "existing" && (
          <div>
            <h1 className="text-2xl font-black text-white mb-2">예약 플랫폼 선택</h1>
            <p className="text-slate-400 mb-8 text-sm">어디에서 예약하셨나요?</p>
            <div className="grid grid-cols-2 gap-3">
              {PLATFORMS.map(p => (
                <button
                  key={p}
                  onClick={() => { setPlatform(p); setStep(2); }}
                  className={`p-4 rounded-2xl border font-bold transition-all
                    ${platform === p
                      ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                      : "border-white/10 bg-[#0f0f18] text-white hover:border-[#D4AF37]/40"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && bookingPath === "homepage" && (
          <div>
            <h1 className="text-2xl font-black text-white mb-2">날짜와 시간을 선택하세요</h1>
            <p className="text-slate-400 mb-6 text-sm">원하시는 녹음 일정을 선택하세요</p>
            <SimpleCal value={selectedDate} onChange={d => { setSelectedDate(d); setSelectedTime(""); }} />
            {selectedDate && (
              <div className="mt-6">
                <p className="text-slate-400 text-sm mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {toLocalDate(selectedDate)} 시간 선택
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {ALL_SLOTS.map(slot => {
                    const booked = bookedTimes.includes(slot);
                    return (
                      <button
                        key={slot}
                        disabled={booked}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 rounded-xl text-sm font-medium transition-all
                          ${booked ? "bg-white/5 text-slate-600 cursor-not-allowed line-through" : ""}
                          ${selectedTime === slot && !booked ? "bg-[#D4AF37] text-black" : ""}
                          ${selectedTime !== slot && !booked ? "bg-[#0f0f18] text-slate-300 hover:bg-[#D4AF37]/20" : ""}`}
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
              className="w-full mt-8 py-3 bg-[#D4AF37] text-black font-bold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F0D060] transition-colors flex items-center justify-center gap-2"
            >
              다음 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ─── STEP 2: 날짜/시간 (기존) 또는 음료 선택 ────────────────────── */}
        {step === 2 && bookingPath === "existing" && (
          <div>
            <h1 className="text-2xl font-black text-white mb-2">날짜와 시간을 선택하세요</h1>
            <p className="text-slate-400 mb-6 text-sm">원하시는 녹음 일정을 선택하세요</p>
            <SimpleCal value={selectedDate} onChange={d => { setSelectedDate(d); setSelectedTime(""); }} />
            {selectedDate && (
              <div className="mt-6">
                <p className="text-slate-400 text-sm mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {toLocalDate(selectedDate)} 시간 선택
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {ALL_SLOTS.map(slot => {
                    const booked = bookedTimes.includes(slot);
                    return (
                      <button
                        key={slot}
                        disabled={booked}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 rounded-xl text-sm font-medium transition-all
                          ${booked ? "bg-white/5 text-slate-600 cursor-not-allowed line-through" : ""}
                          ${selectedTime === slot && !booked ? "bg-[#D4AF37] text-black" : ""}
                          ${selectedTime !== slot && !booked ? "bg-[#0f0f18] text-slate-300 hover:bg-[#D4AF37]/20" : ""}`}
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
              className="w-full mt-8 py-3 bg-[#D4AF37] text-black font-bold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F0D060] transition-colors flex items-center justify-center gap-2"
            >
              다음 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 음료 선택 - step에 따라 다른 번호 */}
        {((step === 2 && bookingPath === "homepage") || (step === 3 && bookingPath === "existing")) && (
          <div>
            <h1 className="text-2xl font-black text-white mb-2">음료를 선택하세요</h1>
            <p className="text-slate-400 mb-6 text-sm">녹음 중 즐기실 음료를 선택하세요 (복수 선택 가능)</p>
            <div className="space-y-3">
              {DRINK_CATALOG.map(drink => (
                <div key={drink.id} className="bg-[#0f0f18] rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{drink.name}</span>
                  </div>
                  {drink.hasTemp ? (
                    <div className="flex gap-3">
                      {(["hot", "iced"] as const).map(temp => (
                        <div key={temp} className="flex items-center gap-2">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${temp === "hot" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}>
                            {temp === "hot" ? "HOT" : "ICE"}
                          </span>
                          <button onClick={() => setDrinkQty(drink.id, temp, -1)} className="w-6 h-6 bg-white/10 rounded-full text-white text-sm hover:bg-white/20">−</button>
                          <span className="text-white text-sm w-4 text-center">{getDrinkQty(drink.id, temp)}</span>
                          <button onClick={() => setDrinkQty(drink.id, temp, 1)} className="w-6 h-6 bg-[#D4AF37]/20 rounded-full text-[#D4AF37] text-sm hover:bg-[#D4AF37]/40">+</button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button onClick={() => setDrinkQty(drink.id, "none", -1)} className="w-6 h-6 bg-white/10 rounded-full text-white text-sm hover:bg-white/20">−</button>
                      <span className="text-white text-sm w-4 text-center">{getDrinkQty(drink.id, "none")}</span>
                      <button onClick={() => setDrinkQty(drink.id, "none", 1)} className="w-6 h-6 bg-[#D4AF37]/20 rounded-full text-[#D4AF37] text-sm hover:bg-[#D4AF37]/40">+</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep((s) => (s + 1) as Step)}
              className="w-full mt-8 py-3 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#F0D060] transition-colors flex items-center justify-center gap-2"
            >
              다음 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 사운드 보정 선택 */}
        {((step === 3 && bookingPath === "homepage") || (step === 4 && bookingPath === "existing")) && (
          <div>
            <h1 className="text-2xl font-black text-white mb-2">사운드 보정 서비스</h1>
            <p className="text-slate-400 mb-6 text-sm flex items-center gap-2">
              <Music className="w-4 h-4" /> 하나를 선택해주세요
            </p>
            <div className="space-y-3">
              {MIXING_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setMixing(opt.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all
                    ${mixing === opt.id
                      ? "border-[#D4AF37] bg-[#D4AF37]/10"
                      : "border-white/10 bg-[#0f0f18] hover:border-[#D4AF37]/30"}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-white">{opt.name}</span>
                      <p className="text-slate-400 text-sm mt-1">{opt.desc}</p>
                    </div>
                    <span className={`text-sm font-bold ml-4 flex-shrink-0 ${opt.price === 0 ? "text-green-400" : "text-[#D4AF37]"}`}>
                      {fmt(opt.price)}
                    </span>
                  </div>
                  {mixing === opt.id && <Check className="w-4 h-4 text-[#D4AF37] mt-2" />}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep((s) => (s + 1) as Step)}
              className="w-full mt-8 py-3 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#F0D060] transition-colors flex items-center justify-center gap-2"
            >
              다음 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 영상 서비스 선택 */}
        {((step === 4 && bookingPath === "homepage") || (step === 5 && bookingPath === "existing")) && (
          <div>
            <h1 className="text-2xl font-black text-white mb-2">영상 서비스</h1>
            <p className="text-slate-400 mb-6 text-sm flex items-center gap-2">
              <Video className="w-4 h-4" /> 녹음 영상을 어떻게 촬영하시겠어요?
            </p>
            <div className="space-y-3">
              {VIDEO_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setVideo(opt.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all
                    ${video === opt.id
                      ? "border-[#D4AF37] bg-[#D4AF37]/10"
                      : "border-white/10 bg-[#0f0f18] hover:border-[#D4AF37]/30"}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-white">{opt.name}</span>
                      <p className="text-slate-400 text-sm mt-1">{opt.desc}</p>
                    </div>
                    <span className={`text-sm font-bold ml-4 flex-shrink-0 ${opt.price === 0 ? "text-green-400" : "text-[#D4AF37]"}`}>
                      {fmt(opt.price)}
                    </span>
                  </div>
                  {video === opt.id && <Check className="w-4 h-4 text-[#D4AF37] mt-2" />}
                </button>
              ))}
            </div>

            {/* 앨범 발매 */}
            <div className="mt-6">
              <p className="text-slate-400 text-sm mb-3 flex items-center gap-2">
                <Disc className="w-4 h-4" /> 선택 사항 (복수 선택 가능)
              </p>
              {/* 앨범 발매 */}
              <div className={`rounded-2xl border mb-3 transition-all ${album ? "border-[#D4AF37] bg-[#D4AF37]/10" : "border-white/10 bg-[#0f0f18]"}`}>
                <div className="flex items-start gap-3 p-5">
                  <input type="checkbox" checked={album} onChange={e => { setAlbum(e.target.checked); if (e.target.checked) setProAlbum(false); }}
                    className="w-5 h-5 rounded mt-0.5 accent-yellow-400 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-bold text-white">{ALBUM_OPTION.name}</span>
                      <span className="text-[#D4AF37] font-bold text-sm">{fmt(ALBUM_OPTION.price)}</span>
                    </div>
                    <p className="text-slate-400 text-sm mt-1">{ALBUM_OPTION.desc}</p>
                    <button onClick={() => setAlbumOpen(v => !v)} className="text-xs text-[#D4AF37] mt-2 flex items-center gap-1">
                      자세히 보기 {albumOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                    {albumOpen && (
                      <ul className="mt-3 space-y-2">
                        {ALBUM_OPTION.features.map(f => (
                          <li key={f.title} className="flex gap-2 text-xs text-slate-400">
                            <Check className="w-3 h-3 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                            <div><span className="text-white font-medium">{f.title}</span> — {f.desc}</div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* 전문가 앨범 */}
              <div className={`rounded-2xl border mb-3 transition-all ${proAlbum ? "border-[#D4AF37] bg-[#D4AF37]/10" : "border-white/10 bg-[#0f0f18]"}`}>
                <div className="flex items-start gap-3 p-5">
                  <input type="checkbox" checked={proAlbum} onChange={e => { setProAlbum(e.target.checked); if (e.target.checked) setAlbum(false); }}
                    className="w-5 h-5 rounded mt-0.5 accent-yellow-400 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-bold text-white">{PRO_ALBUM_OPTION.name}</span>
                      <span className="text-[#D4AF37] font-bold text-sm">{fmt(PRO_ALBUM_OPTION.price)}</span>
                    </div>
                    <p className="text-slate-400 text-sm mt-1">{PRO_ALBUM_OPTION.desc}</p>
                  </div>
                </div>
              </div>

              {/* LP */}
              <div className={`rounded-2xl border transition-all ${lp ? "border-[#D4AF37] bg-[#D4AF37]/10" : "border-white/10 bg-[#0f0f18]"}`}>
                <div className="flex items-start gap-3 p-5">
                  <input type="checkbox" checked={lp} onChange={e => setLp(e.target.checked)}
                    className="w-5 h-5 rounded mt-0.5 accent-yellow-400 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-bold text-white">{LP_OPTION.name}</span>
                      <span className="text-[#D4AF37] font-bold text-sm">{fmt(LP_OPTION.price)}</span>
                    </div>
                    <p className="text-slate-400 text-sm mt-1">{LP_OPTION.desc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 유튜브 반주 URL */}
            <div className="mt-6">
              <label className="text-slate-400 text-sm mb-2 flex items-center gap-2">
                <Play className="w-4 h-4" /> 반주 URL (YouTube) — 선택 사항
              </label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={e => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#D4AF37]/50"
              />
            </div>

            <button
              onClick={() => setStep((s) => (s + 1) as Step)}
              className="w-full mt-8 py-3 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#F0D060] transition-colors flex items-center justify-center gap-2"
            >
              다음 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 고객 정보 입력 + 최종 확인 */}
        {((step === 5 && bookingPath === "homepage") || (step === 6 && bookingPath === "existing")) && (
          <div>
            <h1 className="text-2xl font-black text-white mb-2">고객 정보 입력</h1>
            <p className="text-slate-400 mb-6 text-sm">예약 확인을 위해 정보를 입력해주세요</p>

            <div className="space-y-4">
              <div>
                <label className="text-slate-400 text-sm mb-1 block">이름 <span className="text-red-400">*</span></label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="이름을 입력하세요"
                  className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">전화번호 <span className="text-red-400">*</span></label>
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">이메일 (선택)</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full bg-[#0f0f18] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>
            </div>

            {/* 선택 요약 */}
            <div className="mt-8 bg-[#0f0f18] rounded-2xl p-5 border border-white/5">
              <h3 className="text-white font-bold mb-4">예약 요약</h3>
              <div className="space-y-2 text-sm">
                {bookingPath === "existing" && platform && (
                  <div className="flex justify-between text-slate-400">
                    <span>예약 플랫폼</span><span className="text-white">{platform}</span>
                  </div>
                )}
                {selectedDate && (
                  <div className="flex justify-between text-slate-400">
                    <span>날짜</span><span className="text-white">{toLocalDate(selectedDate)}</span>
                  </div>
                )}
                {selectedTime && (
                  <div className="flex justify-between text-slate-400">
                    <span>시간</span><span className="text-white">{selectedTime}</span>
                  </div>
                )}
                {drinks.length > 0 && (
                  <div className="flex justify-between text-slate-400">
                    <span>음료</span><span className="text-white text-right max-w-[60%]">{drinkSummary}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>사운드 보정</span>
                  <span className="text-white">{MIXING_OPTIONS.find(o => o.id === mixing)?.name}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>영상 서비스</span>
                  <span className="text-white">{VIDEO_OPTIONS.find(o => o.id === video)?.name}</span>
                </div>
                {album && <div className="flex justify-between text-slate-400"><span>앨범 발매</span><span className="text-[#D4AF37]">{fmt(ALBUM_OPTION.price)}</span></div>}
                {proAlbum && <div className="flex justify-between text-slate-400"><span>전문가 앨범</span><span className="text-[#D4AF37]">{fmt(PRO_ALBUM_OPTION.price)}</span></div>}
                {lp && <div className="flex justify-between text-slate-400"><span>LP 레코드</span><span className="text-[#D4AF37]">{fmt(LP_OPTION.price)}</span></div>}

                <div className="pt-3 border-t border-white/10 flex justify-between font-bold">
                  <span className="text-white">추가 서비스 합계</span>
                  <span className="text-[#D4AF37] text-lg">{total() === 0 ? "무료" : `₩${total().toLocaleString()}`}</span>
                </div>
                {total() > 0 && (
                  <p className="text-xs text-slate-500">※ 추가 서비스 비용은 현장에서 결제하시면 됩니다.</p>
                )}
              </div>
            </div>

            {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full mt-6 py-4 bg-[#D4AF37] text-black font-black text-lg rounded-xl disabled:opacity-40 hover:bg-[#F0D060] transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? "처리 중..." : "예약 완료하기"}
              {!submitting && <Check className="w-5 h-5" />}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
