export interface ShapeConfig {
    id: string;
    type: 'text' | 'rectangle' | 'circle' | 'line' | 'arrow';
    x: number;
    y: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    opacity?: number;
    rotation?: number;
    text?: string;
    fontSize?: number;
    fontFamily?: string;
    width?: number;
    height?: number;
    radius?: number;
    points?: number[];
}
