import { ShapeConfig } from "@/components/konva-editor/types";
import { EditorAction } from "./actions";

export type EditorState = {
    selectedId: string | null;
    history: ShapeConfig[][];
    historyStep: number;
    shapes: ShapeConfig[];
    styles: {
        fillColor: string;
        strokeColor: string;
        strokeWidth: number;
        opacity: number;
        fontSize: number;
        fontFamily: string;
    }
    dimensions: {
        width: number;
        height: number;
    }
    stageRef: any;
    image: HTMLImageElement | null;
}

export const editorInitialState: EditorState = {
    selectedId: null,
    history: [[]],
    historyStep: 0,
    shapes: [],
    styles: {
        fillColor: "#ffffff",
        strokeColor: "#000000",
        strokeWidth: 2,
        opacity: 1,
        fontSize: 24,
        fontFamily: "Arial"
    },
    dimensions: {
        width: 0,
        height: 0
    },
    stageRef: null,
    image: null,
}


export function editorReducer(state: EditorState, action: EditorAction): EditorState {
    switch (action.type) {
        case 'ADD_SHAPE': {
            const { type } = action.payload;
            if (type === 'select') return state;

            const id = `${type}-${Date.now()}`;
            const baseConfig = {
                id,
                x: state.dimensions.width / 2,
                y: state.dimensions.height / 2,
                fill: '#ffffff',
                stroke: '#111111',
                strokeWidth: 0,
                opacity: 1,
                rotation: 0,
            };

            let newShape: ShapeConfig;

            switch (type) {
                case 'text':
                    newShape = {
                        ...baseConfig,
                        type: 'text',
                        text: 'Double click to edit',
                        fontSize: state.styles.fontSize,
                        fontFamily: state.styles.fontFamily,
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
                    return state;
            }

            const newShapes = [...state.shapes, newShape];
            const newHistory = state.history.slice(0, state.historyStep + 1);
            newHistory.push(newShapes);
            return {
                ...state,
                shapes: newShapes,
                history: newHistory,
                selectedId: id,
                historyStep: newHistory.length - 1,
            }
        }
        case 'UPDATE_SHAPE': {
            const { id, updates } = action.payload;
            const newShapes = state.shapes.map(shape =>
                shape.id === id ? { ...shape, ...updates } : shape
            );
            const newHistory = state.history.slice(0, state.historyStep + 1);
            newHistory.push(newShapes);
            return {
                ...state,
                shapes: newShapes,
                history: newHistory,
                historyStep: newHistory.length - 1,
            }
        }
        case 'DELETE_SELECTED': {
            if (!state.selectedId) return state;
            const newShapes = state.shapes.filter(shape => shape.id !== state.selectedId);
            const newHistory = state.history.slice(0, state.historyStep + 1);
            newHistory.push(newShapes);
            return {
                ...state,
                shapes: newShapes,
                history: newHistory,
                historyStep: newHistory.length - 1,
                selectedId: null,
            }
        }
        case 'DELETE_SHAPE': {
            const { id } = action.payload;
            const newShapes = state.shapes.filter(shape => shape.id !== id);
            const newHistory = state.history.slice(0, state.historyStep + 1);
            newHistory.push(newShapes);
            return {
                ...state,
                shapes: newShapes,
                history: newHistory,
                historyStep: newHistory.length - 1,
                selectedId: state.selectedId === id ? null : state.selectedId,
            }
        }
        case 'UNDO': {
            if (state.historyStep === 0) return state;
            const prevStep = state.historyStep - 1;
            return {
                ...state,
                shapes: state.history[prevStep],
                historyStep: prevStep,
            }
        }
        case 'REDO': {
            if (state.historyStep === state.history.length - 1) return state;
            const nextStep = state.historyStep + 1;
            return {
                ...state,
                shapes: state.history[nextStep],
                historyStep: nextStep,
            }
        }
        case 'SELECT_SHAPE': {
            const { id } = action.payload;
            return {
                ...state,
                selectedId: id,
            }
        }
        case 'UPDATE_STYLE': {
            const { styleType, value } = action.payload;
            return {
                ...state,
                styles: {
                    ...state.styles,
                    [styleType]: value,
                }
            }
        }
        case 'SET_DIMENSIONS': {
            const { width, height } = action.payload;
            return {
                ...state,
                dimensions: {
                    width,
                    height
                }
            }
        }
        case 'SET_STAGE_REF': {
            return {
                ...state,
                stageRef: action.payload,
            }
        }
        case 'SET_IMAGE': {
            return {
                ...state,
                image: action.payload.image,
            }
        }
        default:
            return state;
    }
}
