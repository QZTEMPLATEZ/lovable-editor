import React from 'react';
import { Button } from "@/components/ui/button";
import { Save } from 'lucide-react';

interface ExportOptionsProps {
  onExport: (format: 'premiere' | 'finalcut' | 'resolve') => void;
  isGenerating: boolean;
}

const ExportOptions = ({ onExport, isGenerating }: ExportOptionsProps) => {
  return (
    <div className="w-full bg-editor-panel rounded-xl overflow-hidden border border-editor-border">
      <div className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-cinzel bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">
            Export Your Project
          </h3>
          <p className="text-gray-400">
            Choose your preferred editing software to continue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => onExport('premiere')}
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            <Save className="w-4 h-4 mr-2" />
            Premiere Pro
          </Button>

          <Button
            onClick={() => onExport('finalcut')}
            disabled={isGenerating}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            <Save className="w-4 h-4 mr-2" />
            Final Cut Pro
          </Button>

          <Button
            onClick={() => onExport('resolve')}
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            <Save className="w-4 h-4 mr-2" />
            DaVinci Resolve
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;