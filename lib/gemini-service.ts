import { GoogleGenAI } from "@google/genai"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
export async function generateImageEdit(base64Image: string, editText: string): Promise<string> {
    const ai = new GoogleGenAI({
        apiKey: GEMINI_API_KEY!,
    })
    const prompt = [
        { text: editText },
        {
            
            inlineData: {
                mimeType: "image/png",
                data: base64Image
            },
        },
    ];
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: prompt,
    })
    if (!response.candidates || response.candidates.length === 0) {
        throw new Error("No candidates returned from Gemini API");
    }
    const parts = response.candidates?.[0]?.content?.parts ?? [];
    let savedImageBase64: string | undefined;
    for (const part of parts) {
        if (part.text) {
            console.log(part.text);
        } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            savedImageBase64 = imageData;
        }
    }
    console.log(parts)
    if (!savedImageBase64) {
        throw new Error("No image returned from Gemini API");
    }
    return savedImageBase64;
}