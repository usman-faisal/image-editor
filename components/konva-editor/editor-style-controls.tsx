import { ShapeConfig } from './types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

interface EditorStyleControlsProps {
    fillColor: string;
    setFillColor: (color: string) => void;
    strokeColor: string;
    setStrokeColor: (color: string) => void;
    strokeWidth: number;
    setStrokeWidth: (width: number) => void;
    opacity: number;
    setOpacity: (opacity: number) => void;
    selectedShape: ShapeConfig | undefined;
    updateShape: (id: string, updates: Partial<ShapeConfig>) => void;
}

export const EditorStyleControls = ({
    fillColor,
    setFillColor,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setStrokeWidth,
    opacity,
    setOpacity,
    selectedShape,
    updateShape,
}: EditorStyleControlsProps) => {
    if (!selectedShape) {
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
                            setFillColor(e.target.value);
                            if (selectedShape) {
                                updateShape(selectedShape.id, { fill: e.target.value });
                            }
                        }}
                        className="w-12 h-10 rounded cursor-pointer border"
                    />
                    <Input
                        type="text"
                        value={fillColor}
                        onChange={(e) => {
                            setFillColor(e.target.value);
                            if (selectedShape) {
                                updateShape(selectedShape.id, { fill: e.target.value });
                            }
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
                        value={strokeColor}
                        onChange={(e) => {
                            setStrokeColor(e.target.value);
                            if (selectedShape) {
                                updateShape(selectedShape.id, { stroke: e.target.value });
                            }
                        }}
                        className="w-12 h-10 rounded cursor-pointer border"
                    />
                    <Input
                        type="text"
                        value={strokeColor}
                        onChange={(e) => {
                            setStrokeColor(e.target.value);
                            if (selectedShape) {
                                updateShape(selectedShape.id, { stroke: e.target.value });
                            }
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
                        setStrokeWidth(value);
                        if (selectedShape) {
                            updateShape(selectedShape.id, { strokeWidth: value });
                        }
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
                        setOpacity(value);
                        if (selectedShape) {
                            updateShape(selectedShape.id, { opacity: value });
                        }
                    }}
                />
            </div>
        </div>
    );
};