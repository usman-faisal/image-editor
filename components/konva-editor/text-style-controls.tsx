import { ShapeConfig, Tool } from './types';
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

interface TextStyleControlsProps {
    fontSize: number;
    setFontSize: (size: number) => void;
    fontFamily: string;
    setFontFamily: (family: string) => void;
    selectedShape: ShapeConfig | undefined;
    tool: Tool;
    updateShape: (id: string, updates: Partial<ShapeConfig>) => void;
}

export const TextStyleControls = ({
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    selectedShape,
    tool,
    updateShape,
}: TextStyleControlsProps) => {
    if (selectedShape?.type !== 'text' && tool !== 'text') {
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
