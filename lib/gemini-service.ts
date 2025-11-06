import { GoogleGenAI } from "@google/genai"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
export async function generateImageEdit(base64Image: string, editText: string): Promise<string> {
    const ai = new GoogleGenAI({
        apiKey: GEMINI_API_KEY!,
    })
    const cleanedBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const prompt = [
        { text: editText },
        {
            
            inlineData: {
                mimeType: "image/png",
                data: cleanedBase64
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
        } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            savedImageBase64 = imageData;
        }
    }
    if (!savedImageBase64) {
        throw new Error("No image returned from Gemini API");
    }
    return `data:image/png;base64,${savedImageBase64}`;
}