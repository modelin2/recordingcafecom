/**
 * 레코딩카페 자동 기사 생성 키워드 풀
 * 타겟: 커플 이색 데이트 + K-pop 체험 + 음악 크리에이터
 */

export type KeywordItem = {
  keyword: string;
  category: string;
};

export const KEYWORD_POOL: KeywordItem[] = [
  // 커플 데이트
  { keyword: "이색 커플 데이트 코스 추천 TOP 7", category: "데이트" },
  { keyword: "기념일 특별하게 보내는 방법", category: "데이트" },
  { keyword: "100일 기념일 이벤트 아이디어", category: "데이트" },
  { keyword: "홍대 데이트 코스 이색 체험", category: "데이트" },
  { keyword: "커플 버킷리스트 함께하면 좋은 체험", category: "데이트" },
  { keyword: "남자친구 생일 선물 체험 아이디어", category: "데이트" },
  { keyword: "여자친구 깜짝 서프라이즈 이벤트 방법", category: "데이트" },
  { keyword: "커플 사진 잘 찍는 곳 서울 추천", category: "데이트" },
  { keyword: "처음 만나는 소개팅 장소 이색 데이트", category: "데이트" },
  { keyword: "친구와 함께하는 이색 체험 서울", category: "데이트" },

  // 녹음·음악
  { keyword: "커버곡 녹음하는 방법 초보자 가이드", category: "음악" },
  { keyword: "음원 저작권 등록 방법 개인 아티스트", category: "음악" },
  { keyword: "K-pop 커버 영상 잘 찍는 방법", category: "음악" },
  { keyword: "노래 녹음 잘하는 팁 보컬 준비", category: "음악" },
  { keyword: "인디 뮤지션 음원 발매 과정", category: "음악" },
  { keyword: "좋아하는 노래 커버해서 유튜브 올리는 법", category: "음악" },
  { keyword: "믹싱 마스터링이란 음원 제작 기초", category: "음악" },
  { keyword: "1인 아티스트 음원 유통 방법", category: "음악" },
  { keyword: "K-pop 아이돌 트레이닝 비법", category: "음악" },
  { keyword: "보컬 연습 혼자 잘 하는 방법", category: "음악" },

  // 크리에이터·콘텐츠
  { keyword: "유튜브 뮤직 채널 시작하는 방법", category: "크리에이터" },
  { keyword: "인스타그램 릴스 음악 콘텐츠 전략", category: "크리에이터" },
  { keyword: "틱톡 커버송 바이럴 만드는 방법", category: "크리에이터" },
  { keyword: "라이브 방송 처음 시작하는 방법", category: "크리에이터" },
  { keyword: "다중 플랫폼 동시 방송 방법 OBS", category: "크리에이터" },
  { keyword: "음악 크리에이터 수익화 전략", category: "크리에이터" },
  { keyword: "쇼츠·릴스 뮤직비디오 혼자 만드는 법", category: "크리에이터" },
  { keyword: "스트리밍 수익 정산 방법 유튜브 스포티파이", category: "크리에이터" },

  // 한국 여행·K-pop 관광
  { keyword: "한국 여행 K-pop 체험 코스", category: "관광" },
  { keyword: "서울 홍대 관광 명소 이색 체험", category: "관광" },
  { keyword: "외국인이 한국에서 꼭 해봐야 할 체험", category: "관광" },
  { keyword: "K-pop 성지 순례 코스 서울", category: "관광" },
  { keyword: "한류 체험 녹음 스튜디오 서울", category: "관광" },
  { keyword: "서울 데이트 관광 외국인 추천 코스", category: "관광" },

  // AI·기술
  { keyword: "AI 사진 보정 앱 비교 추천", category: "기술" },
  { keyword: "AI 음성 생성 기술 현황 2025", category: "기술" },
  { keyword: "스마트폰으로 전문가급 영상 찍는 법", category: "기술" },
  { keyword: "라이브 방송 장비 입문자 추천", category: "기술" },

  // 프랜차이즈·창업
  { keyword: "카페 창업 특색 있는 아이템 아이디어", category: "창업" },
  { keyword: "문화 공간 창업 수익 모델 분석", category: "창업" },
  { keyword: "엔터테인먼트 프랜차이즈 시장 전망", category: "창업" },
];
