import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function imageUrlToBase64(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch image from ${url}: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    
    const buffer = Buffer.from(await blob.arrayBuffer());
    
    const base64 = buffer.toString('base64');
    
    const contentType = blob.type;
    
    return `data:${contentType};base64,${base64}`;
}