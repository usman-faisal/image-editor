import { createContext, useContext, useReducer } from "react";
import { editorInitialState, editorReducer, EditorState } from "./konva-editor-reducer";
import { EditorAction } from "./actions";

type EditorContextType = {
    state: EditorState;
    dispatch: React.Dispatch<EditorAction>;
}
export const KonvaEditorContext = createContext<EditorContextType | undefined>(undefined);

export const KonvaEditorProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(editorReducer, editorInitialState);
    const value = {
        state, 
        dispatch,
    }

    return (
        <KonvaEditorContext.Provider value={value}>
            {children}
        </KonvaEditorContext.Provider>
    );
}

export const useKonvaEditor = () => {
    const context = useContext(KonvaEditorContext);
    if (!context) {
        throw new Error("useKonvaEditor must be used within an EditorProvider");
    }
    return context;
}
