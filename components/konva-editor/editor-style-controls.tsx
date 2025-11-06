import { ShapeConfig } from './types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useKonvaEditor } from '@/lib/konva-editor/konva-editor-provider';
import { useState } from 'react';


export const EditorStyleControls = ({
}) => {
    const { state, dispatch } = useKonvaEditor();
    const selectedShape = state.shapes.find(s => s.id === state.selectedId);
    const fillColor = selectedShape?.fill;
    const strokeColor = selectedShape?.stroke;
    const strokeWidth = selectedShape?.strokeWidth ?? 0;
    const opacity = selectedShape?.opacity ?? 1;
    const handleStyleChange = (
        styleType: keyof typeof state.styles,
        value: string | number
    ) => {
        dispatch({ type: 'UPDATE_STYLE', payload: { styleType, value } });

        if (selectedShape) {
            dispatch({
                type: 'UPDATE_SHAPE',
                payload: { id: selectedShape.id, updates: { [styleType]: value } },
            });
        }
    };
    if (!selectedShape) {
        return null;
    }

    if (!state.selectedId) {
        return null;
    }
    return (
        <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-4">
            <div className="space-y-2">
                <Label>Fill Color</Label>
                <div className="flex gap-2">
                    <input
                        type="color"
                        value={fillColor}
                        onChange={(e) => {
                            handleStyleChange('fillColor', e.target.value);
                        }}
                        className="w-12 h-10 rounded cursor-pointer border"
                    />
                    <Input
                        type="text"
                        value={strokeColor}
                        onChange={(e) => {
                            handleStyleChange('fillColor', e.target.value);
                        }}
                        className="flex-1"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Stroke Color</Label>
                <div className="flex gap-2">
                    <input
                        type="color"
                        value={strokeWidth}
                        onChange={(e) => {
                            handleStyleChange('strokeWidth', Number(e.target.value));
                        }}
                        className="w-12 h-10 rounded cursor-pointer border"
                    />
                    <Input
                        type="text"
                        value={strokeColor}
                        onChange={(e) => {
                            handleStyleChange('strokeColor', e.target.value);
                        }}
                        className="flex-1"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>
                    Stroke Width: {strokeWidth}px
                </Label>
                <Slider
                    min={1}
                    max={20}
                    step={1}
                    value={[strokeWidth]}
                    onValueChange={([value]) => {
                        handleStyleChange('strokeWidth', value);
                    }}
                />
            </div>

            <div className="space-y-2">
                <Label>
                    Opacity: {Math.round(opacity * 100)}%
                </Label>
                <Slider
                    min={0}
                    max={1}
                    step={0.1}
                    value={[opacity]}
                    onValueChange={([value]) => {
                        handleStyleChange('opacity', value);
                    }}
                />
            </div>
        </div>
    );
};