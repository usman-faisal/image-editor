import { ShapeConfig } from "@/components/konva-editor/types";
import { EditorState } from "./konva-editor-reducer";

export type ShapeType = 'select' | 'text' | 'rectangle' | 'circle' | 'line' | 'arrow';

type AddShapeAction = {
    type: 'ADD_SHAPE';
    payload: { type: ShapeType };
};

type UpdateShapeAction = {
    type: 'UPDATE_SHAPE';
    payload: { id: string, updates: Partial<ShapeConfig> };
};

type DeleteShapeAction = {
    type: 'DELETE_SHAPE';
    payload: { id: string };
};

type UndoAction = {
    type: 'UNDO';
};

type RedoAction = {
    type: 'REDO';
};

type SelectShapeAction = {
    type: 'SELECT_SHAPE';
    payload: { id: string | null };
};



type SetStageRefAction = {
    type: 'SET_STAGE_REF';
    payload: any;
};
type DeleteSelectedAction = {
    type: 'DELETE_SELECTED';
};

type SetDimensionsAction = {
    type: 'SET_DIMENSIONS';
    payload: { width: number, height: number };
};

type SetImageAction = {
    type: 'SET_IMAGE';
    payload: { image: HTMLImageElement | null };
}
export type EditorAction =
    | AddShapeAction
    | UpdateShapeAction
    | DeleteShapeAction
    | UndoAction
    | RedoAction
    | SelectShapeAction
    | SetDimensionsAction
    | DeleteSelectedAction
    | SetStageRefAction
    | SetImageAction;