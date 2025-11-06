import { useState, useEffect, useRef, useContext } from 'react';
import useImage from 'use-image';
import { Spinner } from '../ui/spinner';
import { EditorToolbar } from './editor-toolbar';
import { EditorStyleControls } from './editor-style-controls';
import { TextStyleControls } from './text-style-controls';
import { RotationControl } from './rotation-control';
import { ExportButtons } from './export-buttons';
import { EditorCanvas } from './editor-canvas';
import { Stage } from 'konva/lib/Stage';
import { useKonvaEditor } from '@/lib/konva-editor/konva-editor-provider';

export interface KonvaEditorProps {
    imageSrc: string;
    maxWidth?: number;
    maxHeight?: number;
    stageRef: React.RefObject<Stage | null>;
}

export const KonvaEditor = ({
    imageSrc,
    maxWidth = 800,
    maxHeight = 600,
    stageRef,
}: KonvaEditorProps) => {
    const { state, dispatch } = useKonvaEditor()

    const [image, status] = useImage(imageSrc);

    
    useEffect(() => {
        if (status === 'loaded' && image) {
            const { width: originalWidth, height: originalHeight } = image;
            
            const scale = Math.min(
                maxWidth / originalWidth,
                maxHeight / originalHeight
            );
            
            const newWidth = originalWidth * scale;
            const newHeight = originalHeight * scale;
            dispatch({ type: 'SET_DIMENSIONS', payload: { width: newWidth, height: newHeight } });
        }
    }, [image, status, maxWidth, maxHeight]);
    useEffect(() => {
        dispatch({ type: 'SET_STAGE_REF', payload: stageRef });
        dispatch({ type: 'SET_IMAGE', payload: { image: image ?? null } });
    }, [image])
    
    const exportImage = (format: 'png' | 'jpeg') => {
        if (!stageRef.current) return;

        const uri = stageRef.current.toDataURL({
            mimeType: `image/${format}`,
            quality: 1,
            pixelRatio: 2,
        });

        const link = document.createElement('a');
        link.download = `konva-export.${format}`;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (status !== 'loaded') {
        return (
            <div className="flex items-center justify-center w-full h-[60vh]">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white rounded-lg shadow-lg p-4 space-y-4">
                <EditorToolbar
                />

                <EditorStyleControls
                />

                <TextStyleControls
                />

                <RotationControl
                />

                <ExportButtons exportImage={exportImage} />
            </div>

            <EditorCanvas
            />
        </div>
    );
};