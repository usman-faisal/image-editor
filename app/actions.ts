'use server'

import { generateImageEdit } from "@/lib/gemini-service";
import { generateImage } from "@/lib/openai-service";


export async function createImages(prompt: string): Promise<string[]> {
    return generateImage(prompt)
}

export async function editImage(base64Image: string, editText: string): Promise<string> {
    return generateImageEdit(base64Image, editText)
}