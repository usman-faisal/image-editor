import { 
    Type, 
    Square, 
    Circle as CircleIcon, 
    Minus, 
    ArrowRight,
    Undo2,
    Redo2,
    Trash2,
    Move
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useKonvaEditor } from '@/lib/konva-editor/konva-editor-provider';


export const EditorToolbar = ({
}) => {
    const {state, dispatch} = useKonvaEditor()

    return (
        <div className="flex items-center gap-2 flex-wrap border-b pb-4">
            <span className="text-sm font-semibold text-gray-700 mr-2">Tools:</span>
            <Button
                size="icon"
                title="Select"
            >
                <Move size={20} />
            </Button>
            <Button
                onClick={() => dispatch({ type: 'ADD_SHAPE', payload: { type: 'text' } })}
                variant="secondary"
                size="icon"
                title="Add Text"
            >
                <Type size={20} />
            </Button>
            <Button
                onClick={() => dispatch({ type: 'ADD_SHAPE', payload: { type: 'rectangle' } })}
                variant="secondary"
                size="icon"
                title="Add Rectangle"
            >
                <Square size={20} />
            </Button>
            <Button
                onClick={() => dispatch({ type: 'ADD_SHAPE', payload: { type: 'circle' } })}
                variant="secondary"
                size="icon"
                title="Add Circle"
            >
                <CircleIcon size={20} />
            </Button>
            <Button
                onClick={() => dispatch({ type: 'ADD_SHAPE', payload: { type: 'line' } })}
                variant="secondary"
                size="icon"
                title="Add Line"
            >
                <Minus size={20} />
            </Button>
            <Button
                onClick={() => dispatch({ type: 'ADD_SHAPE', payload: { type: 'arrow' } })}
                variant="secondary"
                size="icon"
                title="Add Arrow"
            >
                <ArrowRight size={20} />
            </Button>
            
            <div className="w-px h-8 bg-gray-300 mx-2" />
            
            <Button
                onClick={() => dispatch({ type: 'UNDO' })}
                disabled={
                    state.historyStep === 0
                }
                variant="secondary"
                size="icon"
                title="Undo"
            >
                <Undo2 size={20} />
            </Button>
            <Button
                onClick={() => dispatch({ type: 'REDO' })}
                disabled={state.historyStep >= state.history.length - 1}
                variant="secondary"
                size="icon"
                title="Redo"
            >
                <Redo2 size={20} />
            </Button>
            
            <div className="w-px h-8 bg-gray-300 mx-2" />
            
            <Button
                onClick={() => dispatch({ type: 'DELETE_SELECTED' })}
                disabled={!state.selectedId}
                variant="destructive"
                size="icon"
                title="Delete Selected"
            >
                <Trash2 size={20} />
            </Button>
        </div>
    );
};
