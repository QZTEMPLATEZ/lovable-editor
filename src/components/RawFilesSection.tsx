import React, { useRef } from 'react';
import { Upload, Film, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RawFilesSectionProps {
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  videoFiles: File[];
  onContinue?: () => void;
}

const RawFilesSection = ({ onDrop, onDragOver, videoFiles }: RawFilesSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Create a synthetic drag event to reuse the existing onDrop handler
      const dragEvent = new DragEvent('drop');
      Object.defineProperty(dragEvent, 'dataTransfer', {
        value: {
          files: e.target.files
        }
      });
      onDrop(dragEvent as unknown as React.DragEvent);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 rounded-xl p-8 border border-purple-500/30">
        <div className="flex items-center gap-4 mb-6">
          <Film className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-semibold text-purple-300">Raw Wedding Footage</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-5 h-5 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>Upload your raw wedding footage. The AI will use your reference videos' style to edit these clips.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div 
          onDrop={onDrop}
          onDragOver={onDragOver}
          onClick={handleClick}
          className="border-2 border-dashed border-purple-500/50 rounded-xl p-12 text-center cursor-pointer hover:bg-purple-500/5 transition-all duration-300 backdrop-blur-sm relative overflow-hidden group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="video/*"
            multiple
            className="hidden"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 transform group-hover:scale-105 transition-transform duration-300" />
          <Upload className="w-16 h-16 mx-auto mb-6 text-purple-400 animate-bounce" />
          <p className="text-xl mb-2 font-medium relative z-10">
            Drag and drop your raw wedding footage here
          </p>
          <p className="text-sm text-gray-400 relative z-10">or click to browse</p>
          
          <div className="mt-8 p-6 bg-editor-bg/50 rounded-lg border border-purple-500/20">
            <h3 className="text-lg font-semibold text-purple-300 mb-4">How Reference Films Help:</h3>
            <ul className="text-sm text-gray-400 space-y-2 text-left list-disc list-inside">
              <li>AI analyzes visual style and composition</li>
              <li>Learns transition preferences and timing</li>
              <li>Understands color grading and mood</li>
              <li>Adapts to your preferred editing pace</li>
            </ul>
          </div>
        </div>

        {videoFiles.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videoFiles.map((file, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden border border-purple-500/30">
                <video 
                  src={URL.createObjectURL(file)} 
                  className="w-full h-48 object-cover"
                  controls
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/70">
                  <p className="text-sm text-white truncate">{file.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RawFilesSection;