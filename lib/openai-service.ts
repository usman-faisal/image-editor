import { imageUrlToBase64 } from "./utils"

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ""
export const generateImage = async (prompt: string): Promise<string[]> => {
    const url = "https://api.openai.com/v1/images/generations"
    const body = {
        prompt,
        model: "gpt-image-1",
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify(body),
    })

    if (!response.ok) {
        throw new Error("Failed to generate image")
    }

    const responseData = await response.json()
    return responseData.data.map(
        (i: { b64_json: string }) => {
            return `data:image/png;base64,${i.b64_json}`;
        }
    );
}