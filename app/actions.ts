'use server'

import { generateImage } from "@/lib/openai-service";

export async function createImages(prompt: string): Promise<string[]> {
    return generateImage(prompt)
}