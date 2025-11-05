import { Stage, Layer, Image, Line, Text, Rect, Circle, Arrow } from 'react-konva';
import { ShapeConfig } from './types';

interface EditorCanvasProps {
    stageRef: React.RefObject<any>;
    dimensions: { width: number; height: number };
    image: HTMLImageElement | undefined;
    shapes: ShapeConfig[];
    setSelectedId: (id: string | null) => void;
    updateShape: (id: string, updates: Partial<ShapeConfig>) => void;
}
function eventHandlers(shape: ShapeConfig, setSelectedId: (id: string | null) => void, updateShape: (id: string, updates: Partial<ShapeConfig>) => void) {
    return {
        onClick: () => setSelectedId(shape.id),
        onTap: () => setSelectedId(shape.id),
        onDragEnd: (e: any) => {
            updateShape(shape.id, {
                x: e.target.x(),
                y: e.target.y(),
            });
        },
        draggable: true,
    }
}
export const EditorCanvas = ({
    stageRef,
    dimensions,
    image,
    shapes,
    setSelectedId,
    updateShape,
}: EditorCanvasProps) => {
    return (
        <div className="relative rounded-lg overflow-hidden shadow-lg flex items-center justify-center bg-white p-4">
            <Stage 
                ref={stageRef}
                width={dimensions.width} 
                height={dimensions.height}
                className="bg-gray-50"
                onMouseDown={(e) => {
                    const clickedOnEmpty = e.target === e.target.getStage();
                    if (clickedOnEmpty) {
                        setSelectedId(null);
                    }
                }}
            >
                <Layer>
                    <Image 
                        image={image} 
                        x={0} 
                        y={0} 
                        height={dimensions.height}
                        width={dimensions.width} 
                    />

                    {shapes.map((shape) => {
                        switch (shape.type) {
                            case 'text':
                                return (
                                    <Text
                                        {...shape}
                                        key={shape.id}
                                        {...eventHandlers(shape, setSelectedId, updateShape)}
                                    />
                                );
                            case 'rectangle':
                                return (
                                    <Rect
                                        key={shape.id}
                                        {...shape}
                                        {...eventHandlers(shape, setSelectedId, updateShape)}
                                    />
                                );
                            case 'circle':
                                return (
                                    <Circle
                                        key={shape.id}
                                        {...shape}
                                        {...eventHandlers(shape, setSelectedId, updateShape)}
                                    />
                                );
                            case 'line':
                                return (
                                    <Line
                                        key={shape.id}
                                        {...shape}
                                        {...eventHandlers(shape, setSelectedId, updateShape)}
                                    />
                                );
                            case 'arrow':
                                return (
                                    <Arrow
                                        key={shape.id}
                                        points={shape.points ?? []}
                                        {...shape}
                                        {...eventHandlers(shape, setSelectedId, updateShape)}
                                    />
                                );
                            default:
                                return null;
                        }
                    })}
                </Layer>
            </Stage>
        </div>
    );
};
