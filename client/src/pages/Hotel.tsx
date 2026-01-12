import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Mic2, Sparkles, Globe, Music, Star, Clock, MapPin, Coffee, Navigation, Calendar } from "lucide-react";
import heroImage from "@assets/RECORDINGCAFE_1768187595497.jpeg";
import { useState } from "react";

// Gallery images
import galleryCouple from "@assets/레코딩카페_라운지_1768188070629.jpg";
import galleryBooth1 from "@assets/레코딩카페_녹음부스_1768188070630.png";
import galleryLounge1 from "@assets/레코딩카페_라운지_(5)_1768188070630.png";
import galleryLounge2 from "@assets/레코딩카페_라운지_1768188070631.png";
import galleryLounge3 from "@assets/레코딩카페_라운지5_1768188070631.png";
import galleryLounge4 from "@assets/레코딩카페_라운지6_1768188070632.png";
import galleryBooth2 from "@assets/레코딩카페_부스_(2)_1768188070632.png";
import galleryBooth3 from "@assets/레코딩카페_부스_(3)_1768188070632.png";
import galleryBooth4 from "@assets/레코딩카페_부스_(4)_1768188070633.png";
import galleryBooth5 from "@assets/레코딩카페_부스_1768188070633.png";
import galleryLuggage from "@assets/레코딩카페_여행가방보관장소_1768188070633.png";
import galleryControl from "@assets/레코딩카페_컨트롤룸_1768188070634.png";
import buildingEntrance from "@assets/레코딩카페_건물입구4_1768190998588.png";

// Review screenshots
import review1 from "@assets/Screenshot_20251111_171617_Chrome_1768192361919.jpg";
import review2 from "@assets/Screenshot_20251111_171635_Chrome_1768192361919.jpg";
import review3 from "@assets/Screenshot_20251111_171655_Chrome_1768192361920.jpg";
import review4 from "@assets/Screenshot_20251111_171715_Chrome_1768192361920.jpg";
import review5 from "@assets/Screenshot_20251111_171728_Chrome_1768192361921.jpg";
import review6 from "@assets/Screenshot_20251111_171738_Chrome_1768192361921.jpg";
import review7 from "@assets/Screenshot_20251111_171748_Chrome_1768192361922.jpg";
import review8 from "@assets/Screenshot_20251111_171756_Chrome_1768192361922.jpg";
import review9 from "@assets/Screenshot_20251111_171805_Chrome_1768192361923.jpg";
import review10 from "@assets/Screenshot_20251111_171818_Chrome_1768192361924.jpg";

const reviewImages = [review1, review2, review3, review4, review5, review6, review7, review8, review9, review10];

type Language = 'ko' | 'ja' | 'zh' | 'en';

const galleryImages = [
  galleryCouple,
  galleryBooth1,
  galleryLounge1,
  galleryLounge2,
  galleryLounge3,
  galleryLounge4,
  galleryBooth2,
  galleryBooth3,
  galleryBooth4,
  galleryBooth5,
  galleryLuggage,
  galleryControl
];

const translations = {
  ko: {
    langName: "한국어",
    badge: "리버사이드 호텔에서 도보 30초",
    heroTitle1: "K-POP 아이돌과 같은",
    heroTitle2: "레코딩 스튜디오",
    heroTitle3: "에서 주인공이 되세요",
    heroDesc: "노래를 못 해도 괜찮습니다. 최첨단 AI가 프로 가수처럼 만들어 드립니다.",
    videoTitle: "실제",
    videoTitleHighlight: "레코딩 체험",
    videoDesc: "고객님의 레코딩 현장을 확인하세요",
    pillar1Title: "꿈같은 체험",
    pillar1Desc: "리버사이드 호텔 앞 30초, K-POP 아이돌과 똑같은 녹음실에서 주인공이 되어보세요.",
    pillar2Title: "AI가 완벽하게 보정",
    pillar2Desc: "노래를 못 해도 괜찮습니다. 최첨단 AI가 프로 가수처럼 만들어 드립니다.",
    pillar3Title: "평생의 자산",
    pillar3Desc: "그냥 체험으로 끝나지 않습니다. 전 세계에 음원이 발매되고 저작권료가 들어오는 평생의 자산을 만드세요.",
    featuresTitle: "Recording Café의",
    featuresTitleHighlight: "특징",
    feature1Title: "카페 & 스튜디오",
    feature1Desc: "카페처럼 편안하게 음료를 즐기면서 녹음을 체험할 수 있는 공간",
    feature2Title: "프로 사양 스튜디오",
    feature2Desc: "K-POP 아티스트도 사용하는 본격적인 레코딩 장비",
    feature3Title: "AI 음성 보정 기술",
    feature3Desc: "노래에 자신이 없어도 프로급 완성도 보장",
    feature4Title: "전 세계 배포 & 저작권",
    feature4Desc: "Spotify, Apple Music 등 전 세계에 음원 배포",
    galleryTitle: "공간",
    galleryTitleHighlight: "둘러보기",
    mapTitle: "오시는",
    mapTitleHighlight: "길",
    mapSinsa: "신사역",
    mapSinsaDesc: "3호선",
    mapHotel: "리버사이드 호텔",
    mapHotelDesc: "정문",
    mapCafe: "레코딩카페",
    mapCafeDesc: "대능빌딩 2F",
    mapWalk1: "도보 4분",
    mapWalk2: "도보 30초",
    hangangTitle: "한강까지",
    hangangTitleHighlight: "도보 10분",
    hangangDesc: "레코딩카페에서 한강고수부지까지 걸어가는 방법을 확인하세요",
    pricingTitle: "이용",
    pricingTitleHighlight: "요금",
    pricingPackage: "패키지",
    pricingDrinks: "음료 메뉴",
    pricingPerson: "인",
    pricingDrink: "음료",
    pricingRecording: "녹음실 체험 10분",
    pricingHot: "따뜻한 음료",
    pricingCold: "차가운 음료",
    drinkCoffee: "커피",
    drinkCoffeeDecaf: "디카페인 커피",
    drinkGreenTea: "그린티",
    drinkHibiscus: "히비스커스",
    drinkEarlGrey: "얼그레이",
    drinkPeppermint: "페퍼민트",
    drinkChamomile: "캐모마일",
    drinkHotChocolate: "핫초코",
    drinkLemonade: "레몬에이드",
    drinkStrawberryAde: "딸기에이드",
    drinkOrangeAde: "오렌지에이드",
    drinkGrapefruitAde: "자몽에이드",
    drinkIcedTea: "아이스티",
    reviewsTitle: "고객",
    reviewsTitleHighlight: "후기",
    reviewsRating: "Klook 평점",
    reviewsDesc: "전 세계 여행객들이 남긴 실제 후기를 확인하세요",
    visitTitle: "방문",
    visitTitleHighlight: "방법",
    visitDesc: "리버사이드 호텔 정문에서 아래쪽으로 30초만 걸어 내려오세요. 왼쪽에 대능빌딩이 보이면 2층으로 올라오시면 됩니다.",
    address: "서울특별시 서초구 강남대로107길 21, 2층",
    nearStation: "신사역 3호선에서 도보 4분",
    hours: "매일 12:00 - 21:00",
    visitOption1: "즉시 방문",
    visitOption1Desc: "예약 없이 바로 방문 가능합니다. 대기가 있을 수 있습니다.",
    visitOption2: "예약 방문",
    visitOption2Desc: "3시간 후 방문을 예약하시면 대기 없이 바로 체험 가능합니다.",
    reserveBtn: "3시간 뒤 방문예약",
    ctaTitle: "오늘,",
    ctaTitleHighlight: "스타가 되세요",
    ctaDesc: "리버사이드 호텔에서 도보 30초\n숙박 중에 꼭 들러주세요",
    ctaBtn: "방문예약"
  },
  ja: {
    langName: "日本語",
    badge: "リバーサイドホテルから徒歩30秒",
    heroTitle1: "K-POPアイドルと同じ",
    heroTitle2: "レコーディングスタジオ",
    heroTitle3: "で主人公になる",
    heroDesc: "歌が苦手でも大丈夫。最先端AIがプロ歌手のように仕上げます。",
    videoTitle: "実際の",
    videoTitleHighlight: "レコーディング体験",
    videoDesc: "お客様のレコーディング風景をご覧ください",
    pillar1Title: "夢のような体験",
    pillar1Desc: "リバーサイドホテルから徒歩30秒。K-POPアイドルと同じレコーディングスタジオで主人公になってみませんか？",
    pillar2Title: "AIが完璧に補正",
    pillar2Desc: "歌が苦手でも大丈夫です。最先端のAI技術がプロの歌手のように仕上げます。",
    pillar3Title: "一生の資産に",
    pillar3Desc: "ただの体験で終わりません。全世界で音源が配信され、著作権収入が入る一生の資産を作りましょう。",
    featuresTitle: "Recording Caféの",
    featuresTitleHighlight: "特徴",
    feature1Title: "カフェ & スタジオ",
    feature1Desc: "カフェのようにリラックスしてドリンクを楽しみながらレコーディング体験",
    feature2Title: "プロ仕様のスタジオ",
    feature2Desc: "K-POPアーティストも使用する本格的なレコーディング機材",
    feature3Title: "AI音声補正技術",
    feature3Desc: "歌に自信がなくてもプロ級の仕上がりを保証",
    feature4Title: "世界配信&著作権",
    feature4Desc: "Spotify、Apple Musicなど全世界で音源配信",
    galleryTitle: "空間を",
    galleryTitleHighlight: "見る",
    mapTitle: "アクセス",
    mapTitleHighlight: "マップ",
    mapSinsa: "新沙駅",
    mapSinsaDesc: "3号線",
    mapHotel: "リバーサイドホテル",
    mapHotelDesc: "正門",
    mapCafe: "Recording Café",
    mapCafeDesc: "大能ビル 2F",
    mapWalk1: "徒歩4分",
    mapWalk2: "徒歩30秒",
    hangangTitle: "漢江まで",
    hangangTitleHighlight: "徒歩10分",
    hangangDesc: "Recording Caféから漢江高水敷までの道順をご確認ください",
    pricingTitle: "ご利用",
    pricingTitleHighlight: "料金",
    pricingPackage: "パッケージ",
    pricingDrinks: "ドリンクメニュー",
    pricingPerson: "名",
    pricingDrink: "ドリンク",
    pricingRecording: "レコーディング体験10分",
    pricingHot: "ホットドリンク",
    pricingCold: "コールドドリンク",
    drinkCoffee: "コーヒー",
    drinkCoffeeDecaf: "デカフェコーヒー",
    drinkGreenTea: "緑茶",
    drinkHibiscus: "ハイビスカス",
    drinkEarlGrey: "アールグレイ",
    drinkPeppermint: "ペパーミント",
    drinkChamomile: "カモミール",
    drinkHotChocolate: "ホットチョコレート",
    drinkLemonade: "レモネード",
    drinkStrawberryAde: "いちごエード",
    drinkOrangeAde: "オレンジエード",
    drinkGrapefruitAde: "グレープフルーツエード",
    drinkIcedTea: "アイスティー",
    reviewsTitle: "お客様の",
    reviewsTitleHighlight: "レビュー",
    reviewsRating: "Klook評価",
    reviewsDesc: "世界中の旅行者からの実際のレビューをご覧ください",
    visitTitle: "訪問",
    visitTitleHighlight: "方法",
    visitDesc: "リバーサイドホテル正門から下方向に30秒歩いてください。左側に大能ビルが見えたら2階へお上がりください。",
    address: "2F, 21, Gangnam-daero 107-gil, Seocho-gu, Seoul",
    nearStation: "新沙駅（3号線）から徒歩4分",
    hours: "毎日 12:00 - 21:00",
    visitOption1: "即時訪問",
    visitOption1Desc: "予約なしでそのまま訪問可能です。待ち時間が発生する場合があります。",
    visitOption2: "予約訪問",
    visitOption2Desc: "3時間後の訪問を予約すると、待ち時間なしで体験できます。",
    reserveBtn: "3時間後の訪問予約",
    ctaTitle: "今日、",
    ctaTitleHighlight: "スターになる",
    ctaDesc: "リバーサイドホテルから徒歩30秒\nご滞在中にぜひお立ち寄りください",
    ctaBtn: "訪問予約"
  },
  zh: {
    langName: "中文",
    badge: "距离河畔酒店步行30秒",
    heroTitle1: "在与K-POP偶像相同的",
    heroTitle2: "录音室",
    heroTitle3: "里成为主角",
    heroDesc: "即使不擅长唱歌也没关系。尖端AI会让您像专业歌手一样完美。",
    videoTitle: "真实的",
    videoTitleHighlight: "录音体验",
    videoDesc: "观看客人的录音现场",
    pillar1Title: "梦幻般的体验",
    pillar1Desc: "距离河畔酒店步行30秒，在与K-POP偶像相同的录音室里成为主角。",
    pillar2Title: "AI完美修正",
    pillar2Desc: "即使不擅长唱歌也没关系。尖端AI技术会让您像专业歌手一样。",
    pillar3Title: "一生的资产",
    pillar3Desc: "不仅仅是体验。在全世界发行音源，创造可以获得版权收入的终身资产。",
    featuresTitle: "Recording Café的",
    featuresTitleHighlight: "特点",
    feature1Title: "咖啡厅 & 录音室",
    feature1Desc: "像咖啡厅一样轻松享受饮品的同时体验录音",
    feature2Title: "专业级录音室",
    feature2Desc: "K-POP艺人也使用的专业录音设备",
    feature3Title: "AI语音修正技术",
    feature3Desc: "即使对唱歌没有自信也能保证专业级完成度",
    feature4Title: "全球发行&版权",
    feature4Desc: "在Spotify、Apple Music等全球平台发行",
    galleryTitle: "空间",
    galleryTitleHighlight: "浏览",
    mapTitle: "交通",
    mapTitleHighlight: "指南",
    mapSinsa: "新沙站",
    mapSinsaDesc: "3号线",
    mapHotel: "河畔酒店",
    mapHotelDesc: "正门",
    mapCafe: "Recording Café",
    mapCafeDesc: "大能大厦 2F",
    mapWalk1: "步行4分钟",
    mapWalk2: "步行30秒",
    hangangTitle: "到汉江",
    hangangTitleHighlight: "步行10分钟",
    hangangDesc: "查看从Recording Café到汉江河畔的步行路线",
    pricingTitle: "使用",
    pricingTitleHighlight: "价格",
    pricingPackage: "套餐",
    pricingDrinks: "饮品菜单",
    pricingPerson: "人",
    pricingDrink: "饮品",
    pricingRecording: "录音体验10分钟",
    pricingHot: "热饮",
    pricingCold: "冷饮",
    drinkCoffee: "咖啡",
    drinkCoffeeDecaf: "低因咖啡",
    drinkGreenTea: "绿茶",
    drinkHibiscus: "洛神花茶",
    drinkEarlGrey: "伯爵茶",
    drinkPeppermint: "薄荷茶",
    drinkChamomile: "洋甘菊茶",
    drinkHotChocolate: "热巧克力",
    drinkLemonade: "柠檬汁",
    drinkStrawberryAde: "草莓汁",
    drinkOrangeAde: "橙汁",
    drinkGrapefruitAde: "西柚汁",
    drinkIcedTea: "冰茶",
    reviewsTitle: "客户",
    reviewsTitleHighlight: "评价",
    reviewsRating: "Klook评分",
    reviewsDesc: "查看来自世界各地游客的真实评价",
    visitTitle: "访问",
    visitTitleHighlight: "方式",
    visitDesc: "从河畔酒店正门向下步行30秒。看到左侧的大能大厦后上2楼即可。",
    address: "首尔市瑞草区江南大路107街21号 2楼",
    nearStation: "新沙站(3号线)步行4分钟",
    hours: "每天 12:00 - 21:00",
    visitOption1: "即时访问",
    visitOption1Desc: "无需预约即可访问。可能需要等待。",
    visitOption2: "预约访问",
    visitOption2Desc: "预约3小时后访问，无需等待即可体验。",
    reserveBtn: "预约3小时后访问",
    ctaTitle: "今天，",
    ctaTitleHighlight: "成为明星",
    ctaDesc: "距离河畔酒店步行30秒\n住宿期间请务必光临",
    ctaBtn: "预约访问"
  },
  en: {
    langName: "English",
    badge: "30 seconds walk from Riverside Hotel",
    heroTitle1: "Become the star in the same",
    heroTitle2: "Recording Studio",
    heroTitle3: "as K-POP idols",
    heroDesc: "Can't sing? No problem. Cutting-edge AI will make you sound like a pro.",
    videoTitle: "Real",
    videoTitleHighlight: "Recording Experience",
    videoDesc: "Watch our guests' recording sessions",
    pillar1Title: "Dream Experience",
    pillar1Desc: "30 seconds from Riverside Hotel. Become the star in the same recording studio as K-POP idols.",
    pillar2Title: "AI Perfect Correction",
    pillar2Desc: "Even if you can't sing, our cutting-edge AI technology will make you sound like a professional.",
    pillar3Title: "Lifetime Asset",
    pillar3Desc: "It doesn't end as just an experience. Create a lifetime asset with worldwide music distribution and royalty income.",
    featuresTitle: "Recording Café",
    featuresTitleHighlight: "Features",
    feature1Title: "Café & Studio",
    feature1Desc: "Experience recording while enjoying drinks in a cozy café atmosphere",
    feature2Title: "Professional Studio",
    feature2Desc: "Professional recording equipment used by K-POP artists",
    feature3Title: "AI Voice Correction",
    feature3Desc: "Professional-grade results guaranteed even without singing confidence",
    feature4Title: "Global Distribution & Copyright",
    feature4Desc: "Music distribution on Spotify, Apple Music and more worldwide",
    galleryTitle: "Explore",
    galleryTitleHighlight: "Our Space",
    mapTitle: "Location",
    mapTitleHighlight: "Map",
    mapSinsa: "Sinsa Station",
    mapSinsaDesc: "Line 3",
    mapHotel: "Riverside Hotel",
    mapHotelDesc: "Main Gate",
    mapCafe: "Recording Café",
    mapCafeDesc: "Daenung Bldg 2F",
    mapWalk1: "4 min walk",
    mapWalk2: "30 sec walk",
    hangangTitle: "To Hangang River",
    hangangTitleHighlight: "10 min walk",
    hangangDesc: "See directions from Recording Café to Hangang River Park",
    pricingTitle: "Our",
    pricingTitleHighlight: "Pricing",
    pricingPackage: "Packages",
    pricingDrinks: "Drink Menu",
    pricingPerson: "Person",
    pricingDrink: "Drink",
    pricingRecording: "10 min Recording",
    pricingHot: "Hot Drinks",
    pricingCold: "Cold Drinks",
    drinkCoffee: "Coffee",
    drinkCoffeeDecaf: "Decaf Coffee",
    drinkGreenTea: "Green Tea",
    drinkHibiscus: "Hibiscus",
    drinkEarlGrey: "Earl Grey",
    drinkPeppermint: "Peppermint",
    drinkChamomile: "Chamomile",
    drinkHotChocolate: "Hot Chocolate",
    drinkLemonade: "Lemonade",
    drinkStrawberryAde: "Strawberry Ade",
    drinkOrangeAde: "Orange Ade",
    drinkGrapefruitAde: "Grapefruit Ade",
    drinkIcedTea: "Iced Tea",
    reviewsTitle: "Customer",
    reviewsTitleHighlight: "Reviews",
    reviewsRating: "Klook Rating",
    reviewsDesc: "See real reviews from travelers around the world",
    visitTitle: "How to",
    visitTitleHighlight: "Visit",
    visitDesc: "Walk 30 seconds down from Riverside Hotel main entrance. You'll see Daenung Building on your left - come up to the 2nd floor.",
    address: "2F, 21, Gangnam-daero 107-gil, Seocho-gu, Seoul",
    nearStation: "4 mins walk from Sinsa Station (Line 3)",
    hours: "Open Daily: 12:00 PM - 09:00 PM",
    visitOption1: "Walk-in Visit",
    visitOption1Desc: "Visit without reservation. There may be a wait time.",
    visitOption2: "Reserved Visit",
    visitOption2Desc: "Book 3 hours ahead for a guaranteed no-wait experience.",
    reserveBtn: "Reserve for 3 Hours Later",
    ctaTitle: "Today,",
    ctaTitleHighlight: "Become a Star",
    ctaDesc: "30 seconds from Riverside Hotel\nPlease visit us during your stay",
    ctaBtn: "Make Reservation"
  }
};

const languageOptions: { code: Language; flag: string }[] = [
  { code: 'ko', flag: '🇰🇷' },
  { code: 'ja', flag: '🇯🇵' },
  { code: 'zh', flag: '🇨🇳' },
  { code: 'en', flag: '🇺🇸' }
];

export default function Hotel() {
  const [lang, setLang] = useState<Language>('ja');
  const t = translations[lang];

  return (
    <>
      <Helmet>
        <title>リバーサイドホテルから徒歩30秒 | K-POPレコーディング体験 | Recording Café</title>
        <meta name="description" content="K-POPアイドルと同じレコーディングスタジオで主人公になってみませんか？歌が苦手でもAIがプロ歌手のように補正します。" />
      </Helmet>
      
      <div className="min-h-screen bg-black text-white">
        {/* Language Selector - Fixed at Top */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center gap-2">
            {languageOptions.map((option) => (
              <button
                key={option.code}
                onClick={() => setLang(option.code)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  lang === option.code 
                    ? 'bg-[#D4AF37] text-black' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
                data-testid={`button-lang-${option.code}`}
              >
                <span>{option.flag}</span>
                <span>{translations[option.code].langName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Hero Section with Image */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
            <img 
              src={heroImage}
              alt="Recording Studio"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6" style={{ color: '#D4AF37' }}>
              <MapPin className="h-4 w-4" />
              {t.badge}
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t.heroTitle1}
              <br />
              <span style={{ color: '#D4AF37' }}>{t.heroTitle2}</span>
              <br />
              {t.heroTitle3}
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8">
              {t.heroDesc}
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
            </div>
          </div>
        </section>

        {/* Video Section - Auto Play */}
        <section className="py-8 md:py-24 bg-gradient-to-b from-black to-zinc-900">
          <div className="max-w-4xl mx-auto px-2 md:px-4">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {t.videoTitle}<span style={{ color: '#D4AF37' }}>{t.videoTitleHighlight}</span>
              </h2>
              <p className="text-white/60">
                {t.videoDesc}
              </p>
            </div>

            <div className="relative aspect-[9/16] md:aspect-video rounded-xl md:rounded-2xl overflow-hidden max-w-sm md:max-w-full mx-auto">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/sGMcHrmCmDU?autoplay=1&mute=1&loop=1&playlist=sGMcHrmCmDU&playsinline=1"
                title="Recording Café"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Three Pillars Section */}
        <section className="py-16 md:py-24 bg-zinc-900">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Fantasy */}
              <div className="text-center p-8 bg-black/50 rounded-2xl border border-white/10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}>
                  <Star className="h-8 w-8" style={{ color: '#D4AF37' }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>{t.pillar1Title}</h3>
                <p className="text-white/70">{t.pillar1Desc}</p>
              </div>

              {/* AI Technology */}
              <div className="text-center p-8 bg-black/50 rounded-2xl border border-white/10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}>
                  <Sparkles className="h-8 w-8" style={{ color: '#D4AF37' }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>{t.pillar2Title}</h3>
                <p className="text-white/70">{t.pillar2Desc}</p>
              </div>

              {/* Reward */}
              <div className="text-center p-8 bg-black/50 rounded-2xl border border-white/10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }}>
                  <Globe className="h-8 w-8" style={{ color: '#D4AF37' }} />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>{t.pillar3Title}</h3>
                <p className="text-white/70">{t.pillar3Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 md:py-24 bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {t.galleryTitle} <span style={{ color: '#D4AF37' }}>{t.galleryTitleHighlight}</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((img, index) => (
                <div 
                  key={index} 
                  className={`relative overflow-hidden rounded-xl ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
                >
                  <img 
                    src={img} 
                    alt={`Recording Café ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    style={{ aspectRatio: index === 0 ? '1' : '4/3' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16 md:py-24 bg-zinc-900">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {t.reviewsTitle} <span style={{ color: '#D4AF37' }}>{t.reviewsTitleHighlight}</span>
              </h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-2xl font-bold" style={{ color: '#D4AF37' }}>5.0</span>
              </div>
              <p className="text-white/60 text-sm">{t.reviewsRating}</p>
              <p className="text-white/50 text-sm mt-2">{t.reviewsDesc}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {reviewImages.map((img, index) => (
                <div 
                  key={index} 
                  className="relative overflow-hidden rounded-xl border border-white/10 hover:border-amber-500/50 transition-all"
                >
                  <img 
                    src={img} 
                    alt={`Review ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-black">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {t.featuresTitle} <span style={{ color: '#D4AF37' }}>{t.featuresTitleHighlight}</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-6 bg-black/50 rounded-xl border border-white/10">
                <Coffee className="h-6 w-6 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <div>
                  <h4 className="font-bold mb-2">{t.feature1Title}</h4>
                  <p className="text-sm text-white/60">{t.feature1Desc}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-black/50 rounded-xl border border-white/10">
                <Mic2 className="h-6 w-6 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <div>
                  <h4 className="font-bold mb-2">{t.feature2Title}</h4>
                  <p className="text-sm text-white/60">{t.feature2Desc}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-black/50 rounded-xl border border-white/10">
                <Sparkles className="h-6 w-6 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <div>
                  <h4 className="font-bold mb-2">{t.feature3Title}</h4>
                  <p className="text-sm text-white/60">{t.feature3Desc}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-black/50 rounded-xl border border-white/10">
                <Music className="h-6 w-6 flex-shrink-0" style={{ color: '#D4AF37' }} />
                <div>
                  <h4 className="font-bold mb-2">{t.feature4Title}</h4>
                  <p className="text-sm text-white/60">{t.feature4Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 md:py-24 bg-black">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {t.mapTitle} <span style={{ color: '#D4AF37' }}>{t.mapTitleHighlight}</span>
              </h2>
            </div>

            <div className="bg-zinc-900/50 rounded-2xl p-6 md:p-10 border border-white/10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                {/* Sinsa Station */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-500 flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.5 3.37 1.41 4.84.95 1.54 2.2 2.86 3.16 4.4.47.75.81 1.45 1.17 2.26.26.55.47 1.5 1.26 1.5s1-.95 1.26-1.5c.37-.81.7-1.51 1.17-2.26.96-1.53 2.21-2.85 3.16-4.4C18.5 12.37 19 10.74 19 9c0-3.87-3.13-7-7-7zm0 9.75c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg">{t.mapSinsa}</h4>
                  <p className="text-sm text-white/60">{t.mapSinsaDesc}</p>
                </div>

                {/* Arrow 1 */}
                <div className="flex flex-col items-center">
                  <div className="hidden md:block w-24 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500" />
                  <div className="md:hidden h-12 w-0.5 bg-gradient-to-b from-orange-500 to-blue-500" />
                  <p className="text-xs text-white/50 mt-1">{t.mapWalk1}</p>
                </div>

                {/* Riverside Hotel */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-500 flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 14c1.66 0 3-1.34 3-3S8.66 8 7 8s-3 1.34-3 3 1.34 3 3 3zm12-7h-8v8H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg">{t.mapHotel}</h4>
                  <p className="text-sm text-white/60">{t.mapHotelDesc}</p>
                </div>

                {/* Arrow 2 */}
                <div className="flex flex-col items-center">
                  <div className="hidden md:block w-24 h-0.5 bg-gradient-to-r from-blue-500 to-[#D4AF37]" />
                  <div className="md:hidden h-12 w-0.5 bg-gradient-to-b from-blue-500 to-[#D4AF37]" />
                  <p className="text-xs text-white/50 mt-1">{t.mapWalk2}</p>
                </div>

                {/* Recording Café */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: '#D4AF37' }}>
                    <Mic2 className="w-8 h-8 md:w-10 md:h-10 text-black" />
                  </div>
                  <h4 className="font-bold text-lg" style={{ color: '#D4AF37' }}>{t.mapCafe}</h4>
                  <p className="text-sm text-white/60">{t.mapCafeDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Second Video Section */}
        <section className="py-16 md:py-24 bg-black">
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/YzdkeQidBbo"
                title="Recording Experience"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Hangang River Walk Section */}
        <section className="py-16 md:py-24 bg-zinc-900">
          <div className="max-w-2xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {t.hangangTitle} <span style={{ color: '#D4AF37' }}>{t.hangangTitleHighlight}</span>
              </h2>
              <p className="text-white/60">
                {t.hangangDesc}
              </p>
            </div>

            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden max-w-xs mx-auto">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/FzBqrwM5nvk"
                title="Walk to Hangang River"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Visit Section */}
        <section className="py-16 md:py-24 bg-black">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {t.visitTitle} <span style={{ color: '#D4AF37' }}>{t.visitTitleHighlight}</span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto mb-8">
                {t.visitDesc}
              </p>
              <div className="max-w-md mx-auto">
                <img 
                  src={buildingEntrance} 
                  alt="Building Entrance" 
                  className="w-full rounded-xl border border-white/10"
                />
              </div>
            </div>

            {/* Location Info */}
            <div className="grid md:grid-cols-3 gap-4 mb-12">
              <div className="bg-black/50 rounded-xl p-6 border border-white/10 text-center">
                <MapPin className="h-6 w-6 mx-auto mb-3" style={{ color: '#D4AF37' }} />
                <p className="text-sm text-white/80">{t.address}</p>
              </div>
              <div className="bg-black/50 rounded-xl p-6 border border-white/10 text-center">
                <Navigation className="h-6 w-6 mx-auto mb-3" style={{ color: '#D4AF37' }} />
                <p className="text-sm text-white/80">{t.nearStation}</p>
              </div>
              <div className="bg-black/50 rounded-xl p-6 border border-white/10 text-center">
                <Clock className="h-6 w-6 mx-auto mb-3" style={{ color: '#D4AF37' }} />
                <p className="text-sm text-white/80">{t.hours}</p>
              </div>
            </div>

            {/* Walk-in Only */}
            <div className="bg-gradient-to-br from-amber-900/30 to-yellow-900/30 rounded-2xl p-8 border border-amber-500/30 text-center max-w-lg mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212, 175, 55, 0.3)' }}>
                <Navigation className="h-8 w-8" style={{ color: '#D4AF37' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#D4AF37' }}>{t.visitOption1}</h3>
              <p className="text-white/70">{t.visitOption1Desc}</p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 md:py-24 bg-zinc-900">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {t.pricingTitle} <span style={{ color: '#D4AF37' }}>{t.pricingTitleHighlight}</span>
              </h2>
            </div>

            {/* Package Pricing */}
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-6 text-center" style={{ color: '#D4AF37' }}>{t.pricingPackage}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { person: 1, price: '₩30,000' },
                  { person: 2, price: '₩40,000' },
                  { person: 3, price: '₩50,000' },
                  { person: 4, price: '₩60,000' },
                ].map((pkg) => (
                  <div key={pkg.person} className="bg-black/50 rounded-xl p-6 border border-white/10 text-center">
                    <div className="text-3xl font-bold mb-2" style={{ color: '#D4AF37' }}>{pkg.person}{t.pricingPerson}</div>
                    <p className="text-sm text-white/60 mb-3">{t.pricingDrink} + {t.pricingRecording}</p>
                    <p className="text-xl font-bold text-white">{pkg.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Drink Menu */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Hot Drinks */}
              <div className="bg-black/50 rounded-xl p-6 border border-white/10">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#D4AF37' }}>
                  <Coffee className="h-5 w-5" />
                  {t.pricingHot}
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="text-white/80">{t.drinkCoffee}</p>
                  <p className="text-white/80">{t.drinkCoffeeDecaf}</p>
                  <p className="text-white/80">{t.drinkGreenTea}</p>
                  <p className="text-white/80">{t.drinkHibiscus}</p>
                  <p className="text-white/80">{t.drinkEarlGrey}</p>
                  <p className="text-white/80">{t.drinkPeppermint}</p>
                  <p className="text-white/80">{t.drinkChamomile}</p>
                  <p className="text-white/80">{t.drinkHotChocolate}</p>
                </div>
              </div>

              {/* Cold Drinks */}
              <div className="bg-black/50 rounded-xl p-6 border border-white/10">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#D4AF37' }}>
                  <Coffee className="h-5 w-5" />
                  {t.pricingCold}
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="text-white/80">{t.drinkCoffee}</p>
                  <p className="text-white/80">{t.drinkCoffeeDecaf}</p>
                  <p className="text-white/80">{t.drinkLemonade}</p>
                  <p className="text-white/80">{t.drinkStrawberryAde}</p>
                  <p className="text-white/80">{t.drinkOrangeAde}</p>
                  <p className="text-white/80">{t.drinkGrapefruitAde}</p>
                  <p className="text-white/80">{t.drinkIcedTea}</p>
                  <p className="text-white/80">{t.drinkGreenTea}</p>
                  <p className="text-white/80">{t.drinkHibiscus}</p>
                  <p className="text-white/80">{t.drinkEarlGrey}</p>
                  <p className="text-white/80">{t.drinkPeppermint}</p>
                  <p className="text-white/80">{t.drinkChamomile}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-black">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <div className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 rounded-3xl p-12 border border-amber-500/20">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                {t.ctaTitle}<span style={{ color: '#D4AF37' }}>{t.ctaTitleHighlight}</span>
              </h2>
              <p className="text-white/60 whitespace-pre-line">
                {t.ctaDesc}
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-black border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Recording Café. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
