import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "레코딩카페 | 커플 이색 데이트 · 나만의 노래 만들기",
  description:
    "레코딩카페에서 특별한 커플 데이트를 경험해보세요. 전문 녹음 스튜디오, AI 포토 부스, 보라박스 라이브 방송까지. 음악으로 만드는 잊지 못할 추억.",
  keywords:
    "레코딩카페, 커플 이색 데이트, 녹음 카페, 녹음 스튜디오 데이트, K-pop 체험, 보라박스, 이색 데이트 코스, 홍대 데이트",
  openGraph: {
    title: "레코딩카페 | 커플 이색 데이트 · 나만의 노래 만들기",
    description: "음악으로 만드는 잊지 못할 커플 데이트. 전문 녹음 스튜디오에서 우리만의 노래를.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={notoSansKr.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
