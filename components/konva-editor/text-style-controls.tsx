import { ShapeConfig } from './types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useKonvaEditor } from '@/lib/konva-editor/konva-editor-provider';
import { useState } from 'react';


export const TextStyleControls = () => {
    const { state, dispatch } = useKonvaEditor();
    const selectedShape = state.shapes.find(s => s.id === state.selectedId);
    const [fontSize, setFontSize] = useState(selectedShape?.fontSize || 24);
    const [fontFamily, setFontFamily] = useState(selectedShape?.fontFamily || 'Arial');
    
    const updateShape = (id: string, updates: Partial<ShapeConfig>) => {
        dispatch({ type: 'UPDATE_SHAPE', payload: { id, updates } });
    }
    if (selectedShape?.type !== 'text') {
        return null;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t items-center">
            <div className="space-y-2">
                <Label>
                    Font Size: {fontSize}px
                </Label>
                <Slider
                    min={12}
                    max={96}
                    step={1}
                    value={[fontSize]}
                    onValueChange={([value]) => {
                        setFontSize(value);
                        if (selectedShape && selectedShape.type === 'text') {
                            updateShape(selectedShape.id, { fontSize: value });
                        }
                    }}
                />
            </div>

            <div className="space-y-2 ">
                <Label>Font Family</Label>
                <Select
                    value={fontFamily}
                    onValueChange={(value: string) => {
                        setFontFamily(value);
                        if (selectedShape && selectedShape.type === 'text') {
                            updateShape(selectedShape.id, { fontFamily: value });
                        }
                    }}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Helvetica">Helvetica</SelectItem>
                        <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                        <SelectItem value="Courier New">Courier New</SelectItem>
                        <SelectItem value="Georgia">Georgia</SelectItem>
                        <SelectItem value="Verdana">Verdana</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {selectedShape?.type === 'text' && (
                <div className="space-y-2">
                    <Label>Text Content</Label>
                    <Input
                        type="text"
                        value={selectedShape.text || ''}
                        onChange={(e) => {
                            updateShape(selectedShape.id, { text: e.target.value });
                        }}
                    />
                </div>
            )}
        </div>
    );
};
