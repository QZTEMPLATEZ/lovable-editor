import React from 'react';
import { Upload, Film, Info } from 'lucide-react';
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
}

const RawFilesSection = ({ onDrop, onDragOver, videoFiles }: RawFilesSectionProps) => {
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
          className="border-2 border-dashed border-purple-500/50 rounded-xl p-12 text-center cursor-pointer hover:bg-purple-500/5 transition-all duration-300 backdrop-blur-sm relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 transform group-hover:scale-105 transition-transform duration-300" />
          <Upload className="w-16 h-16 mx-auto mb-6 text-purple-400 animate-bounce" />
          <p className="text-xl mb-2 font-medium relative z-10">
            Drag and drop your raw wedding footage here
          </p>
          <p className="text-sm text-gray-400 relative z-10">or click to browse</p>
          
          <div className="mt-8 p-6 bg-editor-bg/50 rounded-lg border border-purple-500/20">
            <h3 className="text-lg font-semibold text-purple-300 mb-4">Tips for Raw Footage:</h3>
            <ul className="text-sm text-gray-400 space-y-2 text-left list-disc list-inside">
              <li>Upload high-quality, uncompressed footage</li>
              <li>Include key moments from the ceremony</li>
              <li>Add reception highlights and special moments</li>
              <li>Include both wide shots and close-ups</li>
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