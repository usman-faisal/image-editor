import { useState, useEffect, useRef } from 'react';
import useImage from 'use-image';
import { Spinner } from '../ui/spinner';
import { EditorToolbar } from './EditorToolbar';
import { EditorStyleControls } from './EditorStyleControls';
import { TextStyleControls } from './TextStyleControls';
import { RotationControl } from './RotationControl';
import { ExportButtons } from './ExportButtons';
import { EditorCanvas } from './EditorCanvas';
import { Tool, ShapeConfig } from './types';
import { Stage } from 'konva/lib/Stage';

export interface KonvaEditorProps {
    imageUrl: string;
    maxWidth?: number;
    maxHeight?: number;
    stageRef: React.RefObject<Stage | null>;
}

export const KonvaEditor = ({
    imageUrl,
    maxWidth = 800,
    maxHeight = 600,
    stageRef,
}: KonvaEditorProps) => {
    const [image, status] = useImage(imageUrl, 'anonymous');
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [tool, setTool] = useState<Tool>('select');
    const [shapes, setShapes] = useState<ShapeConfig[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [history, setHistory] = useState<ShapeConfig[][]>([[]]);
    const [historyStep, setHistoryStep] = useState(0);

    const [fillColor, setFillColor] = useState('#3b82f6');
    const [strokeColor, setStrokeColor] = useState('#1e40af');
    const [strokeWidth, setStrokeWidth] = useState(2);
    const [opacity, setOpacity] = useState(1);
    const [fontSize, setFontSize] = useState(24);
    const [fontFamily, setFontFamily] = useState('Arial');

    useEffect(() => {
        if (status === 'loaded' && image) {
            const { width: originalWidth, height: originalHeight } = image;

            const scale = Math.min(
                maxWidth / originalWidth,
                maxHeight / originalHeight
            );

            const newWidth = originalWidth * scale;
            const newHeight = originalHeight * scale;

            setDimensions({ width: newWidth, height: newHeight });
        }
    }, [image, status, maxWidth, maxHeight]);



    const addToHistory = (newShapes: ShapeConfig[]) => {
        const newHistory = history.slice(0, historyStep + 1);
        console.log(newHistory)
        newHistory.push(newShapes);
        setHistory(newHistory);
        setHistoryStep(newHistory.length - 1);
    };

    const undo = () => {
        if (historyStep > 0) {
            setHistoryStep(historyStep - 1);
            setShapes(history[historyStep - 1]);
        }
    };

    const redo = () => {
        if (historyStep < history.length - 1) {
            setHistoryStep(historyStep + 1);
            setShapes(history[historyStep + 1]);
        }
    };

    const addShape = (type: Tool) => {
        if (type === 'select') return;

        const id = `${type}-${Date.now()}`;
        const baseConfig = {
            id,
            x: dimensions.width / 2,
            y: dimensions.height / 2,
            fill: fillColor,
            stroke: strokeColor,
            strokeWidth,
            opacity,
            rotation: 0,
        };

        let newShape: ShapeConfig;

        switch (type) {
            case 'text':
                newShape = {
                    ...baseConfig,
                    type: 'text',
                    text: 'Double click to edit',
                    fontSize,
                    fontFamily,
                };
                break;
            case 'rectangle':
                newShape = {
                    ...baseConfig,
                    type: 'rectangle',
                    width: 150,
                    height: 100,
                };
                break;
            case 'circle':
                newShape = {
                    ...baseConfig,
                    type: 'circle',
                    radius: 50,
                };
                break;
            case 'line':
                newShape = {
                    ...baseConfig,
                    type: 'line',
                    points: [0, 0, 150, 0],
                };
                break;
            case 'arrow':
                newShape = {
                    ...baseConfig,
                    type: 'arrow',
                    points: [0, 0, 150, 0],
                };
                break;
            default:
                return;
        }

        const newShapes = [...shapes, newShape];
        setShapes(newShapes);
        addToHistory(newShapes);
        setSelectedId(id);
    };

    const updateShape = (id: string, updates: Partial<ShapeConfig>) => {
        const newShapes = shapes.map(shape =>
            shape.id === id ? { ...shape, ...updates } : shape
        );
        setShapes(newShapes);
        addToHistory(newShapes);
    };

    const deleteSelected = () => {
        if (!selectedId) return;
        const newShapes = shapes.filter(shape => shape.id !== selectedId);
        setShapes(newShapes);
        addToHistory(newShapes);
        setSelectedId(null);
    };

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

    const selectedShape = shapes.find(s => s.id === selectedId);

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
                    tool={tool}
                    setTool={setTool}
                    addShape={addShape}
                    undo={undo}
                    redo={redo}
                    deleteSelected={deleteSelected}
                    canUndo={historyStep > 0}
                    canRedo={historyStep < history.length - 1}
                    hasSelection={!!selectedId}
                />

                <EditorStyleControls
                    fillColor={fillColor}
                    setFillColor={setFillColor}
                    strokeColor={strokeColor}
                    setStrokeColor={setStrokeColor}
                    strokeWidth={strokeWidth}
                    setStrokeWidth={setStrokeWidth}
                    opacity={opacity}
                    setOpacity={setOpacity}
                    selectedShape={selectedShape}
                    updateShape={updateShape}
                />

                <TextStyleControls
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    fontFamily={fontFamily}
                    setFontFamily={setFontFamily}
                    selectedShape={selectedShape}
                    tool={tool}
                    updateShape={updateShape}
                />

                <RotationControl
                    selectedShape={selectedShape}
                    updateShape={updateShape}
                />

                <ExportButtons exportImage={exportImage} />
            </div>

            <EditorCanvas
                stageRef={stageRef}
                dimensions={dimensions}
                image={image}
                shapes={shapes}
                setSelectedId={setSelectedId}
                updateShape={updateShape}
            />
        </div>
    );
};