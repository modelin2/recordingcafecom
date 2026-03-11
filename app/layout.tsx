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
  title: "레코딩카페 | K-POP 녹음 체험 · 도슨트 · 멤버십",
  description:
    "실제 K-POP 스타들이 녹음한 전문 스튜디오를 직접 체험하세요. 녹음 체험, 릴테이프 도슨트(4개국어), K-PASS 멤버십, 단체 관람 · 신사역 도보 4분.",
  keywords:
    "레코딩카페, K-POP 체험, 녹음 체험, 도슨트 투어, 신사역 관광, 외국인 K-POP, 단체 현장학습, K-PASS 멤버십, 음원 발매",
  openGraph: {
    title: "레코딩카페 | K-POP 녹음 체험 · 도슨트 · 멤버십",
    description: "실제 K-POP 스타들이 녹음한 전문 스튜디오를 직접 체험하세요. 신사역 도보 4분.",
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
