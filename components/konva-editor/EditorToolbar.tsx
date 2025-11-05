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
import { Tool } from './types';

interface EditorToolbarProps {
    tool: Tool;
    setTool: (tool: Tool) => void;
    addShape: (type: Tool) => void;
    undo: () => void;
    redo: () => void;
    deleteSelected: () => void;
    canUndo: boolean;
    canRedo: boolean;
    hasSelection: boolean;
}

export const EditorToolbar = ({
    tool,
    setTool,
    addShape,
    undo,
    redo,
    deleteSelected,
    canUndo,
    canRedo,
    hasSelection,
}: EditorToolbarProps) => {
    return (
        <div className="flex items-center gap-2 flex-wrap border-b pb-4">
            <span className="text-sm font-semibold text-gray-700 mr-2">Tools:</span>
            <Button
                onClick={() => setTool('select')}
                variant={tool === 'select' ? 'default' : 'secondary'}
                size="icon"
                title="Select"
            >
                <Move size={20} />
            </Button>
            <Button
                onClick={() => addShape('text')}
                variant="secondary"
                size="icon"
                title="Add Text"
            >
                <Type size={20} />
            </Button>
            <Button
                onClick={() => addShape('rectangle')}
                variant="secondary"
                size="icon"
                title="Add Rectangle"
            >
                <Square size={20} />
            </Button>
            <Button
                onClick={() => addShape('circle')}
                variant="secondary"
                size="icon"
                title="Add Circle"
            >
                <CircleIcon size={20} />
            </Button>
            <Button
                onClick={() => addShape('line')}
                variant="secondary"
                size="icon"
                title="Add Line"
            >
                <Minus size={20} />
            </Button>
            <Button
                onClick={() => addShape('arrow')}
                variant="secondary"
                size="icon"
                title="Add Arrow"
            >
                <ArrowRight size={20} />
            </Button>
            
            <div className="w-px h-8 bg-gray-300 mx-2" />
            
            <Button
                onClick={undo}
                disabled={!canUndo}
                variant="secondary"
                size="icon"
                title="Undo"
            >
                <Undo2 size={20} />
            </Button>
            <Button
                onClick={redo}
                disabled={!canRedo}
                variant="secondary"
                size="icon"
                title="Redo"
            >
                <Redo2 size={20} />
            </Button>
            
            <div className="w-px h-8 bg-gray-300 mx-2" />
            
            <Button
                onClick={deleteSelected}
                disabled={!hasSelection}
                variant="destructive"
                size="icon"
                title="Delete Selected"
            >
                <Trash2 size={20} />
            </Button>
        </div>
    );
};
