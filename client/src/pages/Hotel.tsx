import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Construction } from "lucide-react";

export default function Hotel() {
  return (
    <>
      <Helmet>
        <title>호텔 | 레코딩 카페</title>
      </Helmet>
      
      <div className="min-h-screen bg-black">
        <Header />
        <main className="flex items-center justify-center min-h-[70vh]">
          <div className="text-center px-4">
            <Construction className="h-24 w-24 mx-auto mb-8 text-[#D4AF37]" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              공사중
            </h1>
            <p className="text-lg text-white/60">
              페이지 준비 중입니다. 곧 만나요!
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
