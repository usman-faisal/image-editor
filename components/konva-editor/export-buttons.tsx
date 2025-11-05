import { Download } from 'lucide-react';
import { Button } from '../ui/button';

interface ExportButtonsProps {
    exportImage: (format: 'png' | 'jpeg') => void;
}

export const ExportButtons = ({ exportImage }: ExportButtonsProps) => {
    return (
        <div className="flex gap-2 pt-4 border-t">
            <Button
                onClick={() => exportImage('png')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            >
                <Download size={16} />
                Export as PNG
            </Button>
            <Button
                onClick={() => exportImage('jpeg')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            >
                <Download size={16} />
                Export as JPEG
            </Button>
        </div>
    );
};
