import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "레코딩카페란 | 레코딩카페",
  description: "10년간 전속 아티스트 50명 이상의 음반을 제작해온 전문 스튜디오를 처음으로 일반에 공개합니다.",
};

export default function AboutPage() {
  return (
    <>
      {/* 히어로 */}
      <section
        style={{
          background: "#FAFAFA",
          paddingTop: "120px",
          paddingBottom: "96px",
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
              fontWeight: 400,
            }}
          >
            레코딩카페란
          </p>
          <h1
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 400,
              color: "#000000",
              letterSpacing: "-2px",
              lineHeight: 1.1,
              marginBottom: "32px",
              whiteSpace: "pre-line",
            }}
          >
            {"녹음이 일어나는 곳,\n그 현장을 엽니다"}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "16px",
              color: "#5F5F5F",
              lineHeight: 1.75,
              maxWidth: "560px",
            }}
          >
            2015년부터 전속 아티스트 50여 명의 음반을 제작해온 전문 스튜디오를 처음으로 일반에 공개합니다.
          </p>
        </div>
      </section>

      {/* 스토리 */}
      <section
        id="story"
        style={{
          background: "#F0EFEB",
          paddingTop: "96px",
          paddingBottom: "96px",
          paddingLeft: "48px",
          paddingRight: "48px",
          borderBottom: "1px solid #D3D3D3",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "72px", alignItems: "center" }}>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "11px",
                  color: "#8B8675",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "24px",
                }}
              >
                Our Story
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 400,
                  color: "#000000",
                  letterSpacing: "-1px",
                  lineHeight: 1.2,
                  marginBottom: "36px",
                  whiteSpace: "pre-line",
                }}
              >
                {"가수를 꿈꾸었던 모든 분들을 위해\n이 문을 처음으로 열었습니다."}
              </h2>
              <div
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "16px",
                  color: "#5F5F5F",
                  lineHeight: 1.75,
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <p>
                  2015년, 국내 중견 엔터테인먼트 회사가 운영하던 전문 녹음 스튜디오에서 시작되었습니다.
                  수십 명의 전속 아티스트들이 이 공간에서 데뷔 앨범을 녹음하고 히트곡을 만들어왔습니다.
                </p>
                <p>
                  오디션에 도전했지만 기회를 얻지 못하셨던 분들, K-POP을 사랑하여 한국까지 찾아오신 외국인 팬들,
                  그리고 음악으로 특별한 기억을 남기고 싶으신 모든 분들께 이 공간을 공개합니다.
                </p>
                <p>
                  레코딩카페는 지금도 현역 전문 스튜디오로 운영되고 있습니다.
                  체험 프로그램이 끝난 자리에서 실제 음반이 제작되는, 살아있는 현장입니다.
                </p>
              </div>
            </div>
            <div
              style={{
                position: "relative",
                aspectRatio: "4/3",
                border: "1px solid #D3D3D3",
                overflow: "hidden",
              }}
            >
              <Image src="/images/lounge-group.png" alt="레코딩카페 스토리" fill style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 수치 */}
      <section
        style={{
          background: "#FAFAFA",
          paddingTop: "80px",
          paddingBottom: "80px",
          paddingLeft: "48px",
          paddingRight: "48px",
          borderBottom: "1px solid #D3D3D3",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            className="grid grid-cols-2 sm:grid-cols-4"
            style={{ borderTop: "1px solid #D3D3D3" }}
          >
            {[
              { num: "2015",    label: "설립 연도",    sub: "10년 이상 운영" },
              { num: "50명+",   label: "전속 아티스트", sub: "음반 제작 실적" },
              { num: "50,000+", label: "누적 방문객",   sub: "국내외 K-POP 팬" },
              { num: "4개국어", label: "도슨트 해설",   sub: "한·영·중·일" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "48px 32px",
                  borderRight: i < 3 ? "1px solid #D3D3D3" : "none",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "clamp(28px, 4vw, 48px)",
                    fontWeight: 400,
                    color: "#000000",
                    letterSpacing: "-1px",
                    marginBottom: "8px",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "13px",
                    color: "#000000",
                    marginBottom: "4px",
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "12px",
                    color: "#8B8675",
                  }}
                >
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 공간 안내 */}
      <section
        id="spaces"
        style={{
          background: "#F0EFEB",
          paddingTop: "96px",
          paddingBottom: "96px",
          paddingLeft: "48px",
          paddingRight: "48px",
          borderBottom: "1px solid #D3D3D3",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "56px" }}>
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
              Spaces
            </p>
            <h2
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 400,
                color: "#000000",
                letterSpacing: "-1px",
              }}
            >
              공간 안내
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "0", border: "1px solid #D3D3D3" }}>
            {[
              {
                src: "/images/recording-booth.png",
                name: "레코딩 부스",
                eng: "Recording Booth",
                desc: "방음 처리된 전문 녹음 부스입니다. 콘덴서 마이크, 이어폰 모니터링 시스템이 완비되어 있으며 체험 프로그램의 주요 공간입니다.",
                tag: "체험 에디션",
              },
              {
                src: "/images/control-room.png",
                name: "컨트롤 룸",
                eng: "Control Room",
                desc: "프로 사운드 엔지니어가 실시간 믹싱·마스터링을 진행하는 공간입니다. 프로 에디션 이용 고객에게 제공됩니다.",
                tag: "프로 에디션",
              },
              {
                src: "/images/bora-box.png",
                name: "BORA BOX",
                eng: "Live Broadcast Studio",
                desc: "1인 미디어·라이브 방송 체험 공간입니다. 조명·카메라 장비가 갖추어져 있으며 유튜브·틱톡 라이브가 가능합니다.",
                tag: "체험 에디션",
              },
              {
                src: "/images/mirror-booth.png",
                name: "AI 포토 부스",
                eng: "AI Photo Studio",
                desc: "AI 기술로 앨범 재킷 스타일의 프로필 사진을 촬영합니다. K-POP 아이돌 콘셉트의 연출이 가능합니다.",
                tag: "체험 에디션",
              },
            ].map((space, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  borderRight: i % 2 === 0 ? "1px solid #D3D3D3" : "none",
                  borderBottom: i < 2 ? "1px solid #D3D3D3" : "none",
                  background: "#FAFAFA",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "160px",
                    flexShrink: 0,
                  }}
                >
                  <Image src={space.src} alt={space.name} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: "32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "11px",
                      color: "#8B8675",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                    }}
                  >
                    {space.tag}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "18px",
                      fontWeight: 400,
                      color: "#000000",
                      marginBottom: "4px",
                    }}
                  >
                    {space.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "11px",
                      color: "#8B8675",
                      marginBottom: "12px",
                    }}
                  >
                    {space.eng}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "14px",
                      color: "#5F5F5F",
                      lineHeight: 1.7,
                    }}
                  >
                    {space.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 찾아오는 길 */}
      <section
        id="location"
        style={{
          background: "#FAFAFA",
          paddingTop: "96px",
          paddingBottom: "96px",
          paddingLeft: "48px",
          paddingRight: "48px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "56px" }}>
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
              Location
            </p>
            <h2
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 400,
                color: "#000000",
                letterSpacing: "-1px",
              }}
            >
              찾아오는 길
            </h2>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{ border: "1px solid #D3D3D3", marginBottom: "48px" }}
          >
            {[
              {
                label: "주소",
                main: "서울 서초구 강남대로107길 21, 2층",
                sub: "2F, 21, Gangnam-daero 107-gil, Seocho-gu, Seoul",
              },
              {
                label: "지하철",
                main: "3호선 신사역 5번 출구",
                sub: "도보 4분 · 전용 주차장 없음 (인근 유료 주차장 이용)",
              },
              {
                label: "운영 시간",
                main: "매일 12:00 – 21:00",
                sub: "연중무휴 · 사전 예약 권장",
              },
            ].map((loc, i) => (
              <div
                key={i}
                style={{
                  padding: "48px 36px",
                  borderRight: i < 2 ? "1px solid #D3D3D3" : "none",
                }}
              >
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
                  {loc.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#000000",
                    marginBottom: "8px",
                    lineHeight: 1.4,
                  }}
                >
                  {loc.main}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "14px",
                    color: "#5F5F5F",
                    lineHeight: 1.6,
                  }}
                >
                  {loc.sub}
                </p>
              </div>
            ))}
          </div>
          <div>
            <Link
              href="/menu"
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                display: "inline-block",
                background: "#000000",
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: 400,
                letterSpacing: "1px",
                padding: "16px 40px",
                borderRadius: 0,
                textDecoration: "none",
                border: "1px solid #000000",
              }}
            >
              입장권 구매
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
