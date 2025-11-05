import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { ShapeConfig } from './types';

interface RotationControlProps {
    selectedShape: ShapeConfig | undefined;
    updateShape: (id: string, updates: Partial<ShapeConfig>) => void;
}

export const RotationControl = ({
    selectedShape,
    updateShape,
}: RotationControlProps) => {
    if (!selectedShape) {
        return null;
    }

    return (
        <div className="pt-4 border-t">
            <div className="space-y-2">
                <Label className="text-sm font-medium">
                    Rotation: {Math.round(selectedShape.rotation || 0)}°
                </Label>
                <Slider
                    min={0}
                    max={360}
                    value={[selectedShape.rotation || 0]}
                    onValueChange={(value) => {
                        updateShape(selectedShape.id, { rotation: value[0] });
                    }}
                    className="w-full"
                />
            </div>
        </div>
    );
};
