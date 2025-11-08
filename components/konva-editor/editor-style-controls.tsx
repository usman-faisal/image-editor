import { ShapeConfig } from './types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useKonvaEditor } from '@/lib/konva-editor/konva-editor-provider';
import { useEffect, useState } from 'react';


export const EditorStyleControls = ({
}) => {
    const { state, dispatch } = useKonvaEditor();
    const selectedShape = state.shapes.find(s => s.id === state.selectedId);

    const handleStyleChange = (
        styleType: any,
        value: string | number
    ) => {
        if (selectedShape) {
            dispatch({
                type: 'UPDATE_SHAPE',
                payload: { id: selectedShape.id, updates: { [styleType]: value } },
            });
        }
    };

    if (!selectedShape || !state.selectedId) {
        return null;
    }

    const fill = selectedShape.fill ?? '#000000';
    const stroke = selectedShape.stroke ?? '#000000';
    const strokeWidth = selectedShape.strokeWidth ?? 0;
    const opacity = selectedShape.opacity ?? 1;
    
    const scale = selectedShape.scaleX ?? 1;

    return (
        <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-4">

            <div className="space-y-2">
                <Label>Fill Color</Label>
                <div className="flex gap-2">
                    <input
                        type="color"
                        value={fill}
                        onChange={(e) => {
                            handleStyleChange('fill', e.target.value);
                        }}
                        className="w-12 h-10 rounded cursor-pointer border"
                    />
                    <Input
                        type="text"
                        value={fill}
                        onChange={(e) => {
                            handleStyleChange('fill', e.target.value);
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
                        value={stroke}
                        onChange={(e) => {
                            handleStyleChange('stroke', e.target.value);
                        }}
                        className="w-12 h-10 rounded cursor-pointer border"
                    />
                    <Input
                        type="text"
                        value={stroke}
                        onChange={(e) => {
                            handleStyleChange('stroke', e.target.value);
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
                    min={0}
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

            <div className="space-y-2">
                <Label>
                    Size: {Math.round(scale * 100)}%
                </Label>
                <Slider
                    min={0.1}
                    max={3}
                    step={0.1}
                    value={[scale]}
                    onValueChange={([value]) => {
                        if (selectedShape) {
                            dispatch({
                                type: 'UPDATE_SHAPE',
                                payload: {
                                    id: selectedShape.id,
                                    updates: { scaleX: value, scaleY: value }
                                },
                            });
                        }
                    }}
                />
            </div>

        </div>
    );
};