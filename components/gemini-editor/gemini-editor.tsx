import { imageUrlToBase64 } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GeminiEditorProps {
    imageUrl: string;
}

export function GeminiEditor({
    imageUrl
}: GeminiEditorProps) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        imageUrlToBase64(imageUrl)
            .then(setImageSrc)
            .catch((err) => console.error("Error converting image:", err));
    }, [imageUrl]);

    const handleGenerateVariation = async () => {
        if (!prompt.trim() || !imageSrc) return;

        setIsGenerating(true);
        try {
            // TODO: Implement variation generation
            console.log("Generating variation with prompt:", prompt);
        } catch (error) {
            console.error("Error generating variation:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4">
                {imageSrc && (
                    <div className="relative w-full max-w-md mx-auto">
                        <img 
                            src={imageSrc} 
                            alt="Original" 
                            className="w-full h-auto rounded-lg border"
                        />
                    </div>
                )}
                
                <div className="space-y-2">
                    <Label htmlFor="prompt">Prompt for Variation</Label>
                    <Input
                        id="prompt"
                        type="text"
                        placeholder="Describe the variation you want..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !isGenerating) {
                                handleGenerateVariation();
                            }
                        }}
                    />
                </div>

                <Button 
                    onClick={handleGenerateVariation}
                    disabled={!prompt.trim() || isGenerating || !imageSrc}
                    className="w-full"
                >
                    {isGenerating ? "Generating..." : "Generate Variation"}
                </Button>
            </div>
        </div>
    );
}