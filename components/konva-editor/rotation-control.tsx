import { useKonvaEditor } from '@/lib/konva-editor/konva-editor-provider';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { ShapeConfig } from './types';


export const RotationControl = ({
}) => {
    const { state, dispatch } = useKonvaEditor();
    const selectedShape = state.shapes.find(s => s.id === state.selectedId);


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
                        if (selectedShape) {
                            dispatch({
                                type: 'UPDATE_SHAPE',
                                payload: {
                                    id: selectedShape.id,
                                    updates: { rotation: value[0] },
                                },
                            });
                        }
                    }}
                    className="w-full"
                />
            </div>
        </div>
    );
};
