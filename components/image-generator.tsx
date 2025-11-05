"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ImageGrid } from "./image-grid"
import { createImages } from "@/app/actions"
import { toast } from "sonner"
import { EditImageDialog } from "./edit-image-dialog"

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingIndices, setLoadingIndices] = useState<Set<number>>(new Set())

  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editMode, setEditMode] = useState<"konva" | "gemini" | null>(null)
  const selectedImageSrc = editingIndex !== null ? images[editingIndex] : null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!prompt) return
    try {
      setIsLoading(true)

      const placeholderCount = 1
      const placeholders = Array(placeholderCount).fill("loading")
      const startIndex = 0

      const newLoadingIndices = new Set<number>()
      for (let i = startIndex; i < startIndex + placeholderCount; i++) {
        newLoadingIndices.add(i)
      }
      setLoadingIndices(newLoadingIndices)

      setImages((prevImages) => [...placeholders, ...prevImages])

      const newImages = await createImages(prompt)

      setImages((prevImages) => {
        const updatedImages = [...prevImages]
        newImages.forEach((img, idx) => {
          updatedImages[idx] = img
        })
        return updatedImages
      })

      setLoadingIndices(new Set())
    } catch (error) {
      console.error("Error generating images:", error)
      toast.error("Failed to generate images. Using placeholder image instead.")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const newImageUrl = `https://picsum.photos/seed/${prompt}-${images.length}/200`
      setImages((prevImages) => {
        const updatedImages = [...prevImages]
        updatedImages[0] = newImageUrl
        return updatedImages
      })
      setLoadingIndices(new Set())
    } finally {
      setPrompt("")
      setIsLoading(false)
    }
  }

  const handleImageClick = (index: number, mode: "konva" | "gemini") => {
    setEditingIndex(index)
    setEditMode(mode)
  }

  const handleSaveImage = (newImageSrc: string) => {
    if (editingIndex === null) return

    const newImagesList = [...images]
    newImagesList[editingIndex] = newImageSrc

    setImages(newImagesList)
    setEditingIndex(null)
    setEditMode(null)
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate a new image</CardTitle>
          <CardDescription>
            Use the input below to describe the image you want to create.
            Be as specific as possible for the best results.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
            <Input
              type="text"
              placeholder="A cat wearing a tiny space helmet..."
              className="flex-1"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <ImageGrid images={images} onImageClick={handleImageClick} loadingIndices={loadingIndices} />

      <EditImageDialog
        isOpen={selectedImageSrc !== null}
        imageSrc={selectedImageSrc}
        onClose={() => {
          setEditingIndex(null)
          setEditMode(null)
        }}
        onSave={handleSaveImage}
        defaultTab={editMode}
      />
      {/* {editMode === 'konva' && (
      <KonvaEditor 
        base64Image={selectedImageSrc ?? ''}
      />
      )}
      {editMode === 'gemini' && (
        <p>Gemini editor</p>
      )} */}
    </div>
  )
}