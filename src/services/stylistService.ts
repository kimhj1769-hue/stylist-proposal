import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface StylingResult {
  analysis: string;
  recommendations: string[];
  tips: string[];
}

export async function getStylingAdvice(height: string, weight: string, imageBase64: string | null): Promise<StylingResult> {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    당신은 전문 퍼스널 스타일리스트입니다. 
    사용자의 신체 정보(키: ${height}cm, 몸무게: ${weight}kg)와 제공된 사진을 분석하여 다음 형식의 JSON 응답을 제공해주세요.
    응답은 반드시 한국어로 작성해야 합니다.
    
    1. analysis: 사용자의 체형과 전체적인 분위기에 대한 분석 (3-4문장)
    2. recommendations: 구체적인 코디 아이템 추천 (상의, 하의, 아우터, 신발 등) - 최소 4개
    3. tips: 해당 체형을 보완하거나 장점을 부각시킬 수 있는 스타일링 팁 - 최소 3개
    
    주의: 사진이 제공된 경우 사진의 실루엣과 비율을 적극적으로 참고하세요.
  `;

  const contents: any[] = [{ text: prompt }];

  if (imageBase64) {
    // Remove data URL prefix if present
    const base64Data = imageBase64.split(',')[1] || imageBase64;
    contents.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: base64Data,
      },
    });
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts: contents },
      config: {
        responseMimeType: "application/json",
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      analysis: result.analysis || "분석 정보를 가져올 수 없습니다.",
      recommendations: result.recommendations || [],
      tips: result.tips || []
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("스타일링 분석 중 오류가 발생했습니다.");
  }
}
