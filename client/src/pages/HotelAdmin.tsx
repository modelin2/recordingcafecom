import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Lock, LogOut, Users, Calendar, Clock, DoorOpen, Key, BarChart3 } from "lucide-react";
import type { HotelReservation } from "@shared/schema";

interface AdminInfo {
  id: string;
  hotelCode: string;
  hotelName: string;
  username: string;
}

export default function HotelAdmin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const loginMutation = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const response = await apiRequest('POST', '/api/hotel-admin/login', data);
      return response.json();
    },
    onSuccess: (data) => {
      setAdminInfo(data);
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
      toast({
        title: "로그인 성공",
        description: `${data.hotelName} 관리자로 로그인했습니다.`,
      });
    },
    onError: () => {
      toast({
        title: "로그인 실패",
        description: "아이디 또는 비밀번호가 올바르지 않습니다.",
        variant: "destructive",
      });
    },
  });

  const passwordChangeMutation = useMutation({
    mutationFn: async (data: { adminId: string; currentPassword: string; newPassword: string }) => {
      const response = await apiRequest('POST', '/api/hotel-admin/change-password', data);
      return response.json();
    },
    onSuccess: () => {
      setShowPasswordChange(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast({
        title: "비밀번호 변경 완료",
        description: "새 비밀번호가 설정되었습니다.",
      });
    },
    onError: () => {
      toast({
        title: "비밀번호 변경 실패",
        description: "현재 비밀번호가 올바르지 않습니다.",
        variant: "destructive",
      });
    },
  });

  const { data: reservations = [], isLoading: reservationsLoading } = useQuery<HotelReservation[]>({
    queryKey: [`/api/reservations/${adminInfo?.hotelCode}`],
    enabled: isLoggedIn && !!adminInfo?.hotelCode,
  });

  const handleLogin = () => {
    if (!username || !password) {
      toast({
        title: "입력 오류",
        description: "아이디와 비밀번호를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }
    loginMutation.mutate({ username, password });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAdminInfo(null);
    queryClient.clear();
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "입력 오류",
        description: "모든 필드를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "입력 오류",
        description: "새 비밀번호가 일치하지 않습니다.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword.length < 4) {
      toast({
        title: "입력 오류",
        description: "비밀번호는 4자 이상이어야 합니다.",
        variant: "destructive",
      });
      return;
    }
    
    passwordChangeMutation.mutate({
      adminId: adminInfo!.id,
      currentPassword,
      newPassword,
    });
  };

  const todayReservations = reservations.filter(r => {
    const today = new Date().toISOString().split('T')[0];
    return r.visitDate === today;
  });

  const totalGuests = reservations.reduce((sum, r) => sum + r.partySize, 0);

  if (!isLoggedIn) {
    return (
      <>
        <Helmet>
          <title>호텔 관리자 로그인 | Recording Café</title>
        </Helmet>
        
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-zinc-800 border-zinc-700">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}>
                <Lock className="h-8 w-8" style={{ color: '#D4AF37' }} />
              </div>
              <CardTitle className="text-2xl text-white">호텔 관리자 로그인</CardTitle>
              <p className="text-zinc-400 text-sm mt-2">Recording Café 제휴 호텔 관리자 전용</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-zinc-300">아이디</Label>
                <Input
                  id="username"
                  placeholder="아이디 입력"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-500"
                  data-testid="input-admin-username"
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-300">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-500"
                  data-testid="input-admin-password"
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              
              <Button
                onClick={handleLogin}
                disabled={loginMutation.isPending}
                className="w-full py-6"
                style={{ backgroundColor: '#D4AF37', color: 'black' }}
                data-testid="button-admin-login"
              >
                {loginMutation.isPending ? "로그인 중..." : "로그인"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{adminInfo?.hotelName} 관리자 | Recording Café</title>
      </Helmet>
      
      <div className="min-h-screen bg-zinc-900">
        <header className="bg-black border-b border-zinc-700 p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4AF37' }}>
                <BarChart3 className="h-5 w-5 text-black" />
              </div>
              <div>
                <h1 className="text-white font-bold">{adminInfo?.hotelName}</h1>
                <p className="text-zinc-400 text-sm">관리자: {adminInfo?.username}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPasswordChange(!showPasswordChange)}
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
                data-testid="button-toggle-password-change"
              >
                <Key className="h-4 w-4 mr-2" />
                비밀번호 변경
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4 mr-2" />
                로그아웃
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-4 space-y-6">
          {showPasswordChange && (
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Key className="h-5 w-5" style={{ color: '#D4AF37' }} />
                  비밀번호 변경
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-zinc-300">현재 비밀번호</Label>
                    <Input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="bg-zinc-700 border-zinc-600 text-white"
                      data-testid="input-current-password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-300">새 비밀번호</Label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-zinc-700 border-zinc-600 text-white"
                      data-testid="input-new-password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-300">새 비밀번호 확인</Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-zinc-700 border-zinc-600 text-white"
                      data-testid="input-confirm-password"
                    />
                  </div>
                </div>
                <Button
                  onClick={handlePasswordChange}
                  disabled={passwordChangeMutation.isPending}
                  style={{ backgroundColor: '#D4AF37', color: 'black' }}
                  data-testid="button-change-password"
                >
                  {passwordChangeMutation.isPending ? "변경 중..." : "비밀번호 변경"}
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-zinc-800 border-zinc-700">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}>
                    <Calendar className="h-6 w-6" style={{ color: '#D4AF37' }} />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">총 예약 건수</p>
                    <p className="text-2xl font-bold text-white">{reservations.length}건</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-800 border-zinc-700">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}>
                    <Clock className="h-6 w-6" style={{ color: '#D4AF37' }} />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">오늘 예약</p>
                    <p className="text-2xl font-bold text-white">{todayReservations.length}건</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-800 border-zinc-700">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}>
                    <Users className="h-6 w-6" style={{ color: '#D4AF37' }} />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">총 방문 예정 인원</p>
                    <p className="text-2xl font-bold text-white">{totalGuests}명</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <DoorOpen className="h-5 w-5" style={{ color: '#D4AF37' }} />
                예약 목록
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reservationsLoading ? (
                <div className="text-center py-8 text-zinc-400">로딩 중...</div>
              ) : reservations.length === 0 ? (
                <div className="text-center py-8 text-zinc-400">예약 내역이 없습니다.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-700">
                        <th className="text-left py-3 px-4 text-zinc-400 font-medium">호실</th>
                        <th className="text-left py-3 px-4 text-zinc-400 font-medium">닉네임</th>
                        <th className="text-left py-3 px-4 text-zinc-400 font-medium">인원</th>
                        <th className="text-left py-3 px-4 text-zinc-400 font-medium">방문 일자</th>
                        <th className="text-left py-3 px-4 text-zinc-400 font-medium">방문 시간</th>
                        <th className="text-left py-3 px-4 text-zinc-400 font-medium">예약일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map((reservation) => (
                        <tr key={reservation.id} className="border-b border-zinc-700/50 hover:bg-zinc-700/30">
                          <td className="py-3 px-4 text-white">{reservation.roomNumber}</td>
                          <td className="py-3 px-4 text-white">{reservation.nickname}</td>
                          <td className="py-3 px-4 text-white">{reservation.partySize}명</td>
                          <td className="py-3 px-4 text-white">{reservation.visitDate}</td>
                          <td className="py-3 px-4 text-white">{reservation.visitTime}</td>
                          <td className="py-3 px-4 text-zinc-400 text-sm">
                            {reservation.createdAt ? new Date(reservation.createdAt).toLocaleDateString('ko-KR') : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}
