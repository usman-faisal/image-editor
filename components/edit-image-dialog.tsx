"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { KonvaEditor } from "./konva-editor/konva-editor"
import { GeminiEditor } from "./gemini-editor/gemini-editor"
import { Stage } from "konva/lib/Stage"
import { toast } from "sonner"
import { KonvaEditorProvider } from "@/lib/konva-editor/konva-editor-provider"

interface EditImageDialogProps {
  isOpen: boolean
  imageSrc: string | null
  onClose: () => void
  onSave: (newImageSrc: string) => void
  defaultTab: 'konva' | 'gemini' | null
}

export function EditImageDialog({
  isOpen,
  imageSrc,
  onClose,
  onSave,
  defaultTab
}: EditImageDialogProps) {
  const konvaEditorRef = useRef<Stage | null>(null);
  const [geminiEditedImage, setGeminiEditedImage] = useState<string | null>(null);

  if (!imageSrc) return null

  const handleSaveChanges = () => {
    if (defaultTab === 'konva') {
      const imageDataURL = konvaEditorRef.current?.toDataURL();
      if (imageDataURL) {
        onSave(imageDataURL)
        return
      }
      toast.error("Failed to get edited image from Konva editor.")
    }
    if (defaultTab === 'gemini') {
      if (geminiEditedImage) {
        onSave(geminiEditedImage)
        return
      }
      toast.error("No edited image from Gemini editor to save.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open: any) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl min-w-xl w-auto max-h-full overflow-scroll">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
        </DialogHeader>
        {defaultTab === 'konva' && (
          <KonvaEditorProvider>
            <KonvaEditor
              imageSrc={imageSrc}
              maxWidth={1000}
              stageRef={konvaEditorRef}
            />
          </KonvaEditorProvider>
        )}
        {defaultTab === 'gemini' && (
          <GeminiEditor imageSrc={imageSrc} editedImage={geminiEditedImage} setEditedImage={setGeminiEditedImage} />
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}