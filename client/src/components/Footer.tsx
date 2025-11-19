import { Button } from "@/components/ui/button";
import { Instagram, Youtube, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { SiTiktok, SiFacebook, SiNaver } from "react-icons/si";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Footer() {
  return (
    <footer className="bg-black text-white" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <div className="text-2xl font-bold tracking-wide mb-1" style={{ color: '#D4AF37' }}>레코딩 카페</div>
              <div className="text-xs tracking-widest opacity-60" style={{ color: '#D4AF37' }}>Recording Café</div>
            </div>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              음악과 커피가 만나는 특별한 공간
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-white/10" data-testid="button-social-naver" asChild>
                <a href="https://blog.naver.com/recordingcafe" target="_blank" rel="noopener noreferrer">
                  <SiNaver className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10" data-testid="button-social-youtube" asChild>
                <a href="https://www.youtube.com/@recording-cafe" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10" data-testid="button-social-instagram" asChild>
                <a href="https://www.instagram.com/recordingcafe" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10" data-testid="button-social-facebook" asChild>
                <a href="https://www.facebook.com/recordingcafe" target="_blank" rel="noopener noreferrer">
                  <SiFacebook className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">바로가기</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li><a href="#services" className="hover:text-white transition-colors">서비스</a></li>
              <li><a href="#space" className="hover:text-white transition-colors">공간 소개</a></li>
              <li><a href="#creator-os" className="hover:text-white transition-colors">Creator OS</a></li>
              <li><a href="#booking" className="hover:text-white transition-colors">예약하기</a></li>
              <li><a href="#franchise" className="hover:text-white transition-colors">가맹점 안내</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">주소</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <div>
                  <p>서울특별시 서초구</p>
                  <p>강남대로107길 21 2층</p>
                </div>
              </li>
              <li className="flex items-center gap-2 pt-2">
                <span className="text-xs text-white/40">영업시간: 평일 12:00-21:00</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">문의</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <a href="https://talk.naver.com/ct/wu2kkmv" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  네이버 톡톡
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <span>biz@recordingcafe.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© 2025 Recording Café. All rights reserved.</p>
          <div className="flex gap-6">
            <Dialog>
              <DialogTrigger asChild>
                <button className="hover:text-white transition-colors">개인정보처리방침</button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>개인정보처리방침</DialogTitle>
                  <DialogDescription>
                    레코딩 카페 개인정보처리방침
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[60vh] pr-4">
                  <div className="space-y-4 text-sm">
                    <p>레코딩 카페(이하 "회사")는 고객의 개인정보를 중요시하며, 개인정보 보호법을 준수하고 있습니다.</p>
                    
                    <div>
                      <h3 className="font-semibold mb-2">1. 개인정보의 수집 및 이용 목적</h3>
                      <p className="text-muted-foreground">회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
                      <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                        <li>서비스 제공 및 예약 관리</li>
                        <li>회원 관리 및 본인 확인</li>
                        <li>고객 문의 응대</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">2. 수집하는 개인정보 항목</h3>
                      <p className="text-muted-foreground">회사는 예약 및 서비스 제공을 위해 다음의 개인정보를 수집합니다:</p>
                      <ul className="list-disc list-inside mt-2 text-muted-foreground">
                        <li>필수항목: 이름, 연락처</li>
                        <li>선택항목: 이메일</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">3. 개인정보의 보유 및 이용기간</h3>
                      <p className="text-muted-foreground">회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">4. 개인정보의 제3자 제공</h3>
                      <p className="text-muted-foreground">회사는 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">5. 정보주체의 권리·의무 및 행사방법</h3>
                      <p className="text-muted-foreground">정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</p>
                    </div>

                    <p className="text-muted-foreground mt-4">본 개인정보처리방침은 2025년 1월 1일부터 적용됩니다.</p>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <button className="hover:text-white transition-colors">이용약관</button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>이용약관</DialogTitle>
                  <DialogDescription>
                    레코딩 카페 서비스 이용약관
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[60vh] pr-4">
                  <div className="space-y-4 text-sm">
                    <div>
                      <h3 className="font-semibold mb-2">제1조 (목적)</h3>
                      <p className="text-muted-foreground">본 약관은 레코딩 카페(이하 "회사")가 제공하는 서비스의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">제2조 (서비스의 내용)</h3>
                      <p className="text-muted-foreground">회사가 제공하는 서비스는 다음과 같습니다:</p>
                      <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                        <li>레코딩 스튜디오 서비스</li>
                        <li>AI 셀프 사진관 서비스</li>
                        <li>다채널 라이브 방송 서비스</li>
                        <li>카페 공간 제공</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">제3조 (예약 및 이용)</h3>
                      <p className="text-muted-foreground">서비스 이용을 위해서는 사전 예약이 필요하며, 예약은 네이버 예약 시스템을 통해 진행됩니다.</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">제4조 (이용자의 의무)</h3>
                      <p className="text-muted-foreground">이용자는 다음 각 호의 행위를 하여서는 안 됩니다:</p>
                      <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                        <li>타인의 정보 도용</li>
                        <li>회사가 제공하는 장비의 고의적 훼손</li>
                        <li>다른 이용자에게 피해를 주는 행위</li>
                        <li>공공질서 및 미풍양속에 위반되는 행위</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">제5조 (취소 및 환불)</h3>
                      <p className="text-muted-foreground">예약 취소 및 환불은 회사의 환불 정책에 따릅니다. 자세한 사항은 예약 시 안내드립니다.</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">제6조 (면책조항)</h3>
                      <p className="text-muted-foreground">회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</p>
                    </div>

                    <p className="text-muted-foreground mt-4">본 약관은 2025년 1월 1일부터 시행됩니다.</p>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </footer>
  );
}
