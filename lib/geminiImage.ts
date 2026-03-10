import { GoogleGenAI } from "@google/genai";

/**
 * 기사 제목을 스토리지용 파일명으로 변환 (한글 유지)
 */
export function titleToImageFilename(title: string, categorySlug = "article"): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 5);

  // 제목에서 영문만 추출, 없으면 categorySlug 사용
  const titlePart = title
    .replace(/[^\x00-\x7F]/g, "")
    .replace(/[/\\:*?"<>|#%&{}]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 30);

  const base = titlePart || categorySlug;
  return `${base}-${date}-${rand}.jpg`;
}

// 하위 호환용 (기존 코드에서 호출되는 경우 대비)
export function keywordToImageFilename(keyword: string, _categorySlug: string): string {
  return titleToImageFilename(keyword);
}

// 구체적인 인플루언서/크리에이터 장면 풀 (짧고 직접적인 묘사)
const SCENE_POOL = [
  "Korean woman in her 20s filming herself on a smartphone tripod in a bright minimal apartment, mid-gesture, casual-chic outfit, soft natural light",
  "Korean man in his late 20s adjusting a ring light and mirrorless camera on a tripod in a home studio, sleeves rolled up, focused",
  "Korean woman in trendy streetwear walking through a Seoul shopping street holding a phone outward to film herself, golden hour, candid motion",
  "Close-up of Korean hands unboxing a brand product on a white table with pastel props, flat-lay composition, soft side lighting",
  "Korean woman in her 20s at a sunlit cafe table holding a latte cup up to photograph it, warm bokeh background, relaxed smile",
  "Korean creator in late 20s pointing a mirrorless camera directly at viewer in a colorful home studio, softbox lights visible, playful expression",
  "Korean woman lying on a pastel couch laughing at her phone, cozy home interior, afternoon light, candid natural emotion",
  "Korean influencer in late 20s holding a skincare product bottle toward camera in a bright white bathroom, clean minimal aesthetic",
  "Korean man in early 30s filming himself with a gimbal walking through a cherry blossom park, wide angle, movement energy",
  "Korean woman at a brand launch event in stylish attire, soft spot lighting, floral arrangements around her, confident pose",
  "Korean fashion creator in a fitting room holding up two clothing items comparing them, mirror reflection, natural daylight",
  "Close-up of Korean hands signing a document on a clean minimal desk, pen in hand, natural window light, no laptop visible",
  "Korean person in late 20s speaking into a podcast microphone, headphones on neck, warm dim recording booth light, expressive face",
  "Korean creator on a Seoul rooftop at sunset filming themselves with a phone on a selfie stick, cityscape behind them, cinematic",
  "Korean beauty influencer in their 20s applying lipstick while looking into a ring-light mirror, vanity setup, warm studio glow",
];

/**
 * 기사 제목·요약 기반 고유 이미지 프롬프트
 */
function buildImagePrompt(_keyword: string, title: string, excerpt: string): string {
  const combined = title + " " + (excerpt ?? "");

  // 키워드 오버라이드 - 장면 인덱스 지정
  let sceneIndex: number | null = null;
  if (/카메라|촬영|스튜디오|장비|조명|렌즈|삼각대/.test(combined)) sceneIndex = 1;
  else if (/언박싱|제품.*리뷰|선물.*박스|협찬.*제품/.test(combined)) sceneIndex = 3;
  else if (/카페|커피|음료|디저트/.test(combined)) sceneIndex = 4;
  else if (/야외|공원|여행|브이로그|거리|산책/.test(combined)) sceneIndex = 8;
  else if (/이벤트|행사|파티|론칭/.test(combined)) sceneIndex = 9;
  else if (/패션|스타일|의류|옷|코디/.test(combined)) sceneIndex = 10;
  else if (/계약|단가|협찬비|광고비|정산/.test(combined)) sceneIndex = 11;
  else if (/팟캐스트|마이크|녹음/.test(combined)) sceneIndex = 12;
  else if (/뷰티|스킨케어|화장품|메이크업/.test(combined)) sceneIndex = 14;

  // 오버라이드 없으면 완전 랜덤 선택 (매번 다른 씬)
  const idx = sceneIndex ?? Math.floor(Math.random() * SCENE_POOL.length);
  const scene = SCENE_POOL[idx];

  return `Photorealistic editorial photo, Korean influencer content creator, ${scene}, 16:9, magazine quality, sharp focus, no text no logos no watermarks`;
}

/**
 * Imagen 4로 기사 대표 이미지 생성
 */
export async function generateArticleImage(
  keyword: string,
  title: string,
  category: string,
  categorySlug: string,
  excerpt: string = ""
): Promise<{ imageBase64: string; filename: string } | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("[GeminiImage] GEMINI_API_KEY 미설정");
    return null;
  }

  void category;
  void categorySlug;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = buildImagePrompt(keyword, title, excerpt);

    const response = await ai.models.generateImages({
      model: "imagen-4.0-fast-generate-001",
      prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: "16:9",
        outputMimeType: "image/jpeg",
      },
    });

    const imageBytes = response.generatedImages?.[0]?.image?.imageBytes;
    if (!imageBytes) {
      console.error("[GeminiImage] 이미지 없음. RAI:", response.generatedImages?.[0]?.raiFilteredReason);
      return null;
    }

    const filename = titleToImageFilename(title, categorySlug);
    console.log("[GeminiImage] 생성 완료:", filename);
    return { imageBase64: imageBytes, filename };
  } catch (e) {
    console.error("[GeminiImage] 생성 실패:", e);
    return null;
  }
}
