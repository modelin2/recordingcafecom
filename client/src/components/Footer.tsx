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
    <footer className="bg-background border-t" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-8">
          <div className="text-xl font-bold tracking-wide mb-1" style={{ color: '#D4AF37' }}>레코딩 카페</div>
          <div className="text-xs tracking-wide text-muted-foreground mb-6">음악과 커피가 만나는 특별한 공간</div>
        </div>

        <div className="text-xs text-muted-foreground space-y-1 mb-8">
          <p>서울특별시 서초구 강남대로107길 21. 2층</p>
          <p>이메일: biz@recordingcafe.com</p>
          <p>영업시간: 평일 12:00-21:00</p>
        </div>

        <div className="text-xs text-muted-foreground space-y-3 mb-8">
          <div>
            <p className="font-medium text-foreground mb-1">주차안내</p>
            <p>1. 공영 주차장: 서울특별시 서초구 잠원동 89-5 (도보 5분거리, 저렴)</p>
            <p>2. 유료 주차장: 서울특별시 서초구 강남대로 101길 40 (도보 10초거리)</p>
          </div>
        </div>

        <div className="flex gap-3 mb-8">
          <a href="https://blog.naver.com/recordingcafe" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="button-social-naver">
            <SiNaver className="h-4 w-4" />
          </a>
          <a href="https://www.youtube.com/@recording-cafe" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="button-social-youtube">
            <Youtube className="h-4 w-4" />
          </a>
          <a href="https://www.instagram.com/recordingcafe" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="button-social-instagram">
            <Instagram className="h-4 w-4" />
          </a>
          <a href="https://www.facebook.com/recordingcafe" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="button-social-facebook">
            <SiFacebook className="h-4 w-4" />
          </a>
        </div>

        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-muted-foreground">
          <p>COPYRIGHT 2025. 레코딩 카페. ALL RIGHTS RESERVED. Patent-protected business model.</p>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <button className="hover:text-foreground transition-colors">개인정보처리방침</button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>개인정보처리방침</DialogTitle>
                  <DialogDescription>
                    레코딩 카페 개인정보처리방침
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[60vh] pr-4">
                  <div className="space-y-6 text-sm">
                    <p className="font-semibold">레코딩 카페(이하 "회사")는 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.</p>
                    
                    <div>
                      <h3 className="font-bold text-base mb-3">제1조 (개인정보의 처리 목적)</h3>
                      <p className="text-muted-foreground mb-2">회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
                      <ul className="list-decimal list-inside mt-2 text-muted-foreground space-y-2 ml-4">
                        <li>서비스 제공 및 예약 관리: 서비스 이용, 예약 확인, 일정 관리, 맞춤 서비스 제공</li>
                        <li>회원 관리: 회원제 서비스 이용에 따른 본인확인, 개인식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 연령확인, 불만처리 등 민원처리, 고지사항 전달</li>
                        <li>마케팅 및 광고에의 활용: 신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-3">제2조 (개인정보의 처리 및 보유기간)</h3>
                      <p className="text-muted-foreground mb-2">회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                      <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1 ml-4">
                        <li>서비스 이용 기록: 서비스 종료 시까지</li>
                        <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)</li>
                        <li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래법)</li>
                        <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래법)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-3">제3조 (처리하는 개인정보의 항목)</h3>
                      <p className="text-muted-foreground mb-2">회사는 다음의 개인정보 항목을 처리하고 있습니다:</p>
                      <div className="ml-4 space-y-3">
                        <div>
                          <p className="font-semibold text-foreground">1. 필수항목</p>
                          <ul className="list-disc list-inside mt-1 text-muted-foreground space-y-1">
                            <li>성명, 생년월일, 성별, 연락처(전화번호)</li>
                            <li>서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">2. 선택항목</p>
                          <ul className="list-disc list-inside mt-1 text-muted-foreground">
                            <li>이메일 주소, 프로필 사진</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-3">제4조 (개인정보의 제3자 제공)</h3>
                      <p className="text-muted-foreground mb-2">회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-3">제5조 (개인정보처리의 위탁)</h3>
                      <p className="text-muted-foreground mb-2">회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:</p>
                      <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1 ml-4">
                        <li>네이버(예약 시스템 운영)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-3">제6조 (정보주체의 권리·의무 및 행사방법)</h3>
                      <p className="text-muted-foreground mb-2">정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:</p>
                      <ul className="list-decimal list-inside mt-2 text-muted-foreground space-y-1 ml-4">
                        <li>개인정보 열람 요구</li>
                        <li>오류 등이 있을 경우 정정 요구</li>
                        <li>삭제 요구</li>
                        <li>처리정지 요구</li>
                      </ul>
                      <p className="text-muted-foreground mt-3">권리 행사는 개인정보 보호법 시행규칙 별지 제8호 서식에 따라 서면, 전자우편, 팩스 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-3">제7조 (개인정보의 파기)</h3>
                      <p className="text-muted-foreground mb-2">회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p>
                      <p className="text-muted-foreground">파기의 절차 및 방법은 다음과 같습니다:</p>
                      <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1 ml-4">
                        <li>파기절차: 불필요하다고 판단되는 경우 내부 방침에 따라 파기</li>
                        <li>파기방법: 전자적 파일은 복구 불가능한 방법으로 영구 삭제, 종이 문서는 분쇄 또는 소각</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-3">제8조 (개인정보 보호책임자)</h3>
                      <p className="text-muted-foreground mb-2">회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                      <div className="ml-4 mt-2">
                        <p className="text-muted-foreground">▶ 이메일: biz@recordingcafe.com</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-3">제9조 (개인정보의 안전성 확보 조치)</h3>
                      <p className="text-muted-foreground mb-2">회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:</p>
                      <ul className="list-decimal list-inside mt-2 text-muted-foreground space-y-1 ml-4">
                        <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등</li>
                        <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치</li>
                        <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
                      </ul>
                    </div>

                    <p className="text-muted-foreground mt-6 font-semibold">본 개인정보처리방침은 2025년 1월 1일부터 적용됩니다.</p>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <button className="hover:text-foreground transition-colors">이용약관</button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>이용약관</DialogTitle>
                  <DialogDescription>
                    레코딩 카페 서비스 이용약관
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[60vh] pr-4">
                  <div className="space-y-6 text-sm">
                    <div>
                      <h3 className="font-bold text-base mb-3">제1조 (목적)</h3>
                      <p className="text-muted-foreground">본 약관은 레코딩 카페(이하 "회사")가 제공하는 서비스의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-3">제2조 (용어의 정의)</h3>
                      <p className="text-muted-foreground mb-2">본 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
                      <ul className="list-decimal list-inside mt-2 text-muted-foreground space-y-2 ml-4">
                        <li>"서비스"라 함은 회사가 제공하는 레코딩 스튜디오, AI 셀프 사진관, 다채널 라이브 방송 등 모든 서비스를 의미합니다.</li>
                        <li>"이용자"라 함은 회사의 서비스에 접속하여 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
                        <li>"회원"이라 함은 회사와 서비스 이용계약을 체결하고 이용자 아이디를 부여받은 이용자를 말합니다.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-3">제3조 (약관의 효력 및 변경)</h3>
                      <p className="text-muted-foreground mb-2">① 본 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을 발생합니다.</p>
                      <p className="text-muted-foreground mb-2">② 회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있으며, 변경된 약관은 서비스 화면에 공지함으로써 효력이 발생합니다.</p>
                      <p className="text-muted-foreground">③ 이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 이용계약을 해지할 수 있습니다.</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-3">제4조 (서비스의 제공 및 변경)</h3>
                      <p className="text-muted-foreground mb-2">회사가 제공하는 서비스는 다음과 같습니다:</p>
                      <ul className="list-decimal list-inside mt-2 text-muted-foreground space-y-2 ml-4">
                        <li>레코딩 스튜디오 서비스: 전문 음향 장비를 활용한 음원 녹음 및 편집 서비스</li>
                        <li>AI 셀프 사진관 서비스: 특허받은 거울 카메라 기술과 AI 후보정을 활용한 프로필 촬영 서비스</li>
                        <li>다채널 라이브 방송 서비스: 다채널 동시 송출이 가능한 방송 시스템 제공</li>
                        <li>카페 공간 제공 및 기타 부대서비스</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-3">제5조 (서비스 이용 신청)</h3>
                      <p className="text-muted-foreground mb-2">① 서비스 이용을 위해서는 사전 예약이 필요하며, 예약은 네이버 예약 시스템 또는 회사가 제공하는 기타 예약 수단을 통해 진행됩니다.</p>
                      <p className="text-muted-foreground mb-2">② 예약 시 정확한 정보를 제공해야 하며, 허위 정보로 인한 불이익은 이용자가 부담합니다.</p>
                      <p className="text-muted-foreground">③ 회사는 예약 확정 후 이용자에게 확인 메시지를 발송합니다.</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-3">제6조 (이용 요금 및 결제)</h3>
                      <p className="text-muted-foreground mb-2">① 서비스 이용 요금은 서비스별로 차등 적용되며, 회사 웹사이트 및 예약 시스템에 명시된 요금표에 따릅니다.</p>
                      <p className="text-muted-foreground mb-2">② 결제는 신용카드, 계좌이체, 현금 등 회사가 지정하는 방법으로 가능합니다.</p>
                      <p className="text-muted-foreground">③ 결제 완료 시 영수증 또는 세금계산서를 발행해드립니다.</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-3">제7조 (예약 취소 및 환불)</h3>
                      <p className="text-muted-foreground mb-2">① 예약 취소는 다음의 기준에 따라 환불됩니다:</p>
                      <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1 ml-4">
                        <li>이용일 7일 전 취소: 전액 환불</li>
                        <li>이용일 3~6일 전 취소: 70% 환불</li>
                        <li>이용일 1~2일 전 취소: 50% 환불</li>
                        <li>이용 당일 취소 또는 노쇼: 환불 불가</li>
                      </ul>
                      <p className="text-muted-foreground mt-3">② 회사의 귀책사유로 서비스를 제공할 수 없는 경우 전액 환불됩니다.</p>
                      <p className="text-muted-foreground">③ 환불은 결제수단에 따라 영업일 기준 3~7일 소요될 수 있습니다.</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-3">제8조 (이용자의 의무)</h3>
                      <p className="text-muted-foreground mb-2">이용자는 다음 각 호의 행위를 하여서는 안 됩니다:</p>
                      <ul className="list-decimal list-inside mt-2 text-muted-foreground space-y-2 ml-4">
                        <li>신청 또는 변경 시 허위내용의 등록</li>
                        <li>타인의 정보 도용</li>
                        <li>회사가 제공하는 장비 및 시설의 고의적 훼손 또는 부주의에 의한 파손</li>
                        <li>회사 및 제3자의 저작권 등 지적재산권에 대한 침해</li>
                        <li>다른 이용자에게 피해를 주거나 방해하는 행위</li>
                        <li>공공질서 및 미풍양속에 위반되는 내용의 정보, 문장, 도형, 음성 등을 타인에게 유포하는 행위</li>
                        <li>범죄와 결부된다고 객관적으로 판단되는 행위</li>
                        <li>기타 관련 법령에 위배되는 행위</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-3">제9조 (서비스 이용 시간)</h3>
                      <p className="text-muted-foreground mb-2">① 서비스는 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간을 원칙으로 합니다.</p>
                      <p className="text-muted-foreground">② 다만, 정기 점검 및 시스템 업그레이드 등의 사유로 일시적으로 서비스가 중단될 수 있으며, 이 경우 사전에 공지합니다.</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-3">제10조 (저작권의 귀속)</h3>
                      <p className="text-muted-foreground mb-2">① 이용자가 서비스를 이용하여 제작한 콘텐츠의 저작권은 이용자에게 귀속됩니다.</p>
                      <p className="text-muted-foreground mb-2">② 회사가 제공하는 서비스, 그에 필요한 소프트웨어, 이미지, 마크, 로고, 디자인, 서비스명칭, 정보 및 상표 등과 관련된 지적재산권 및 기타 권리는 회사에 소유권이 있습니다.</p>
                      <p className="text-muted-foreground">③ 이용자는 회사가 명시적으로 승인한 경우를 제외하고는 회사의 지적재산권을 사용, 복제, 배포할 수 없습니다.</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-3">제11조 (면책조항)</h3>
                      <p className="text-muted-foreground mb-2">① 회사는 천재지변, 전쟁 및 기타 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</p>
                      <p className="text-muted-foreground mb-2">② 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애 또는 손해에 대하여 책임을 지지 않습니다.</p>
                      <p className="text-muted-foreground">③ 회사는 이용자가 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지 않습니다.</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-3">제12조 (분쟁의 해결)</h3>
                      <p className="text-muted-foreground mb-2">① 회사와 이용자는 서비스와 관련하여 발생한 분쟁을 원만하게 해결하기 위하여 필요한 모든 노력을 하여야 합니다.</p>
                      <p className="text-muted-foreground">② 전항의 노력에도 불구하고 분쟁이 해결되지 않을 경우 양 당사자는 민사소송법상의 관할법원에 소를 제기할 수 있습니다.</p>
                    </div>

                    <p className="text-muted-foreground mt-6 font-semibold">부칙: 본 약관은 2025년 1월 1일부터 시행됩니다.</p>
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
