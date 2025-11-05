import Image from "next/image"
import { Button } from "./ui/button"
import { Pencil, Sparkles, Loader2 } from "lucide-react"

interface ImageGridProps {
  images: string[]
  onImageClick: (index: number, mode: "konva" | "gemini") => void
  loadingIndices?: Set<number>
}

export function ImageGrid({ images, onImageClick, loadingIndices = new Set() }: ImageGridProps) {
  if (images.length === 0) {
    return (
      <div className="w-full min-h-[400px] bg-muted border rounded-lg flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Your generated images will appear here
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((src, index) => {
        const isLoading = loadingIndices.has(index) || src === "loading"
        
        return (
          <div key={index} className="aspect-square rounded-lg overflow-hidden border relative group">
            {isLoading ? (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Generating...</p>
                </div>
              </div>
            ) : (
              <>
                <Image
                  src={src}
                  alt={`Generated image ${index + 1}`}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                  <Button
                    onClick={() => onImageClick(index, "konva")}
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Pencil className="h-4 w-4" />
                    Konva
                  </Button>
                  <Button
                    onClick={() => onImageClick(index, "gemini")}
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    Gemini
                  </Button>
                </div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}