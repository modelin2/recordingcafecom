"use client";
import { useState } from "react";
import Link from "next/link";

const FAQS = [
  {
    category: "예약",
    items: [
      {
        q: "예약은 어떻게 하나요?",
        a: "홈페이지 상단 '입장권 구매'에서 날짜와 시간을 선택한 후 결제하시면 됩니다.",
      },
      {
        q: "당일 예약도 가능합니까?",
        a: "잔여석이 있는 경우 당일 예약이 가능합니다. 주말 오후는 조기 마감되는 경우가 많으므로 3일 전 예약을 권장합니다.",
      },
      {
        q: "예약 변경·취소 방법을 알려주세요.",
        a: "방문 3일 전까지 전액 환불됩니다. 2일 전 50% 환불, 1일 전·당일은 환불이 되지 않습니다.",
      },
      {
        q: "외국어 서비스가 가능합니까?",
        a: "영어, 중국어, 일본어로 예약 및 이용하실 수 있습니다. 도슨트 프로그램은 4개국어 해설사가 동반합니다.",
      },
    ],
  },
  {
    category: "이용",
    items: [
      {
        q: "주차장이 있습니까?",
        a: "전용 주차장은 없습니다. 인근 유료 주차장을 이용하시거나, 3호선 신사역 5번 출구에서 도보 4분 거리이므로 대중교통을 권장합니다.",
      },
      {
        q: "녹음할 곡을 미리 준비해야 합니까?",
        a: "준비하지 않으셔도 됩니다. 제공되는 K-POP 인기곡 목록 중 선택하시거나, MR(반주)을 직접 가져오셔도 됩니다.",
      },
      {
        q: "연령 제한이 있습니까?",
        a: "만 7세 이상부터 이용하실 수 있습니다. 미취학 아동은 보호자 동반이 필수입니다.",
      },
      {
        q: "외부 음식·음료 반입이 가능합니까?",
        a: "외부 음식·음료 반입은 허용되지 않습니다. 입장 시 음료가 제공됩니다.",
      },
    ],
  },
  {
    category: "녹음·결과물",
    items: [
      {
        q: "녹음한 파일은 어떻게 받습니까?",
        a: "체험 종료 당일 이메일 또는 카카오톡으로 MP3 파일을 전달합니다. WAV 고음질 파일은 별도 옵션 선택 시 제공됩니다.",
      },
      {
        q: "녹음 파일을 SNS에 올려도 됩니까?",
        a: "체험 음원은 개인 SNS에 자유롭게 게재하실 수 있습니다. 다만 기존 저작권이 있는 곡의 상업적 사용은 저작권법의 적용을 받습니다.",
      },
      {
        q: "정식 음원으로 발매하려면 어떻게 합니까?",
        a: "프로 에디션 또는 K-PASS Plus 이상 멤버십을 통해 국내외 150개 플랫폼에 동시 발매하실 수 있습니다.",
      },
    ],
  },
  {
    category: "멤버십",
    items: [
      {
        q: "멤버십은 언제든 해지할 수 있습니까?",
        a: "언제든 해지하실 수 있습니다. 해지 신청 다음 달부터 청구가 중단되며, 이미 결제된 기간의 혜택은 정상 이용하실 수 있습니다.",
      },
      {
        q: "미사용 녹음 횟수는 이월됩니까?",
        a: "멤버십 녹음 횟수는 매월 초기화됩니다. 미사용 횟수는 이월되지 않습니다.",
      },
      {
        q: "중도에 등급을 변경할 수 있습니까?",
        a: "당월 변경은 불가하며, 다음 달부터 적용됩니다. 마이페이지에서 업그레이드 또는 다운그레이드를 신청하실 수 있습니다.",
      },
    ],
  },
];

const NOTICES = [
  { date: "2025.12.01", title: "12월 예약 시 기념 굿즈 증정 이벤트", badge: "이벤트" },
  { date: "2025.11.15", title: "도슨트 프로그램 일본어 해설 추가 안내", badge: "공지" },
  { date: "2025.11.01", title: "K-PASS 멤버십 서비스 출시", badge: "신규" },
  { date: "2025.10.20", title: "주말 운영 시간 변경 안내", badge: "운영" },
];

const badgeBorderColor: Record<string, string> = {
  이벤트: "#DFCF99",
  공지: "#D3D3D3",
  신규: "#6B625A",
  운영: "#D3D3D3",
};

const badgeTextColor: Record<string, string> = {
  이벤트: "#6B625A",
  공지: "#5F5F5F",
  신규: "#FAFAFA",
  운영: "#5F5F5F",
};

const badgeBg: Record<string, string> = {
  이벤트: "#F5EDD8",
  공지: "transparent",
  신규: "#6B625A",
  운영: "transparent",
};

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("예약");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [tab, setTab] = useState<"faq" | "notice">("faq");

  const currentFaqs = FAQS.find((f) => f.category === activeCategory)?.items ?? [];

  return (
    <>
      {/* 히어로 */}
      <section
        style={{
          background: "#FAFAFA",
          paddingTop: "120px",
          paddingBottom: "80px",
          paddingLeft: "48px",
          paddingRight: "48px",
          borderBottom: "1px solid #D3D3D3",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "11px",
              color: "#8B8675",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "28px",
            }}
          >
            고객센터
          </p>
          <h1
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(32px, 6vw, 64px)",
              fontWeight: 400,
              color: "#000000",
              letterSpacing: "-2px",
              lineHeight: 1.1,
              marginBottom: "32px",
            }}
          >
            무엇을 도와드릴까요
          </h1>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "16px",
              color: "#5F5F5F",
              lineHeight: 1.75,
            }}
          >
            자주 묻는 질문과 공지사항을 확인하시거나, 아래 채널로 직접 문의하실 수 있습니다.
          </p>
        </div>
      </section>

      {/* 탭 바 */}
      <section
        style={{
          background: "#FAFAFA",
          borderBottom: "1px solid #D3D3D3",
          position: "sticky",
          top: "64px",
          zIndex: 20,
          paddingLeft: "48px",
          paddingRight: "48px",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", gap: "0" }}>
          {[
            { key: "faq", label: "자주 묻는 질문" },
            { key: "notice", label: "공지사항" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as "faq" | "notice")}
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                color: tab === t.key ? "#000000" : "#8B8675",
                background: "none",
                border: "none",
                borderBottom: tab === t.key ? "2px solid #000000" : "2px solid transparent",
                padding: "20px 24px 18px",
                cursor: "pointer",
                letterSpacing: "0.3px",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ 섹션 */}
      {tab === "faq" && (
        <section
          style={{
            background: "#FAFAFA",
            paddingTop: "72px",
            paddingBottom: "96px",
            paddingLeft: "48px",
            paddingRight: "48px",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ display: "flex", gap: "0", alignItems: "flex-start" }} className="flex-col md:flex-row">
              {/* 카테고리 사이드바 */}
              <div
                style={{
                  width: "180px",
                  flexShrink: 0,
                  borderRight: "1px solid #D3D3D3",
                  paddingRight: "0",
                  marginRight: "0",
                }}
                className="w-full md:w-44"
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {FAQS.map((f) => (
                    <button
                      key={f.category}
                      onClick={() => {
                        setActiveCategory(f.category);
                        setOpenIndex(null);
                      }}
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "14px",
                        fontWeight: 400,
                        color: activeCategory === f.category ? "#000000" : "#8B8675",
                        background: activeCategory === f.category ? "#F0EFEB" : "none",
                        border: "none",
                        borderBottom: "1px solid #D3D3D3",
                        padding: "18px 24px",
                        cursor: "pointer",
                        textAlign: "left",
                        borderLeft: activeCategory === f.category ? "2px solid #000000" : "2px solid transparent",
                      }}
                    >
                      {f.category}
                    </button>
                  ))}
                </div>
              </div>

              {/* 아코디언 */}
              <div style={{ flex: 1, borderLeft: "1px solid #D3D3D3" }}>
                {currentFaqs.map((item, i) => (
                  <div
                    key={i}
                    style={{ borderBottom: "1px solid #D3D3D3" }}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "24px 32px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "15px",
                          fontWeight: 400,
                          color: "#000000",
                          lineHeight: 1.5,
                          paddingRight: "24px",
                        }}
                      >
                        {item.q}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "20px",
                          color: "#8B8675",
                          flexShrink: 0,
                          transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                          transition: "transform 0.2s",
                          display: "inline-block",
                        }}
                      >
                        +
                      </span>
                    </button>
                    {openIndex === i && (
                      <div
                        style={{
                          padding: "0 32px 28px",
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "15px",
                          color: "#5F5F5F",
                          lineHeight: 1.75,
                          borderTop: "1px solid #D3D3D3",
                          paddingTop: "20px",
                        }}
                      >
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 공지사항 섹션 */}
      {tab === "notice" && (
        <section
          id="notice"
          style={{
            background: "#FAFAFA",
            paddingTop: "72px",
            paddingBottom: "96px",
            paddingLeft: "48px",
            paddingRight: "48px",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ border: "1px solid #D3D3D3" }}>
              {NOTICES.map((n, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    padding: "24px 32px",
                    borderBottom: i < NOTICES.length - 1 ? "1px solid #D3D3D3" : "none",
                    borderLeft: `3px solid ${badgeBorderColor[n.badge] ?? "#D3D3D3"}`,
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "11px",
                      fontWeight: 400,
                      letterSpacing: "1px",
                      color: badgeTextColor[n.badge] ?? "#5F5F5F",
                      background: badgeBg[n.badge] ?? "transparent",
                      border: `1px solid ${badgeBorderColor[n.badge] ?? "#D3D3D3"}`,
                      padding: "3px 10px",
                      flexShrink: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {n.badge}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "15px",
                      fontWeight: 400,
                      color: "#000000",
                      flex: 1,
                    }}
                  >
                    {n.title}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "12px",
                      color: "#8B8675",
                      flexShrink: 0,
                    }}
                  >
                    {n.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 추가 문의 */}
      <section
        style={{
          background: "#F0EFEB",
          paddingTop: "96px",
          paddingBottom: "96px",
          paddingLeft: "48px",
          paddingRight: "48px",
          borderTop: "1px solid #D3D3D3",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "11px",
              color: "#8B8675",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Contact
          </p>
          <h2
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 400,
              color: "#000000",
              letterSpacing: "-1px",
              marginBottom: "48px",
            }}
          >
            직접 문의하기
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ border: "1px solid #D3D3D3" }}>
            {[
              {
                title: "네이버 톡톡",
                desc: "실시간 채팅 문의",
                sub: "평일 10:00 – 18:00 빠른 응답",
                href: "https://talk.naver.com/ct/wu2kkmv",
                label: "문의하기",
                primary: true,
              },
              {
                title: "전화 문의",
                desc: "운영 중 통화 가능",
                sub: "매일 12:00 – 21:00",
                href: "tel:02-0000-0000",
                label: "전화하기",
                primary: false,
              },
              {
                title: "방문 문의",
                desc: "신사역 5번 출구 도보 4분",
                sub: "서초구 강남대로107길 21, 2층",
                href: "/about#location",
                label: "찾아오는 길",
                primary: false,
              },
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  padding: "40px 32px",
                  borderRight: i < 2 ? "1px solid #D3D3D3" : "none",
                  background: "#FAFAFA",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "11px",
                    color: "#8B8675",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: "14px",
                  }}
                >
                  {c.title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#000000",
                    marginBottom: "6px",
                  }}
                >
                  {c.desc}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "13px",
                    color: "#5F5F5F",
                    lineHeight: 1.6,
                    marginBottom: "28px",
                    flex: 1,
                  }}
                >
                  {c.sub}
                </p>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    display: "block",
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: 400,
                    letterSpacing: "1px",
                    padding: "13px 24px",
                    border: "1px solid #000000",
                    background: c.primary ? "#000000" : "transparent",
                    color: c.primary ? "#FFFFFF" : "#000000",
                    textDecoration: "none",
                    borderRadius: 0,
                  }}
                >
                  {c.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
