import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editImage } from "@/app/actions";

interface GeminiEditorProps {
    imageSrc: string;
}

export function GeminiEditor({
    imageSrc
}: GeminiEditorProps) {
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateVariation = async () => {
        if (!prompt.trim() || !imageSrc) return;

        setIsGenerating(true);
        try {
            const newImage = await editImage(imageSrc, prompt)
            console.log(newImage)
            setEditedImage(newImage)
            console.log("Generating variation with prompt:", prompt);
        } catch (error) {
            console.error("Error generating variation:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {imageSrc && (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Original Image</Label>
                        <div className="relative w-full">
                            <img 
                                src={imageSrc} 
                                alt="Original" 
                                className="w-full h-auto rounded-lg border"
                            />
                        </div>
                    </div>
                )}
                
                {editedImage && (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Generated Variation</Label>
                        <div className="relative w-full">
                            <img 
                                src={editedImage} 
                                alt="Generated variation" 
                                className="w-full h-auto rounded-lg border"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-4">
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