import React from 'react';
import { Upload, Film, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ReferenceFilmsSectionProps {
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  videoFiles: File[];
}

const ReferenceFilmsSection = ({ onDrop, onDragOver, videoFiles }: ReferenceFilmsSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 rounded-xl p-8 border border-purple-500/30">
        <div className="flex items-center gap-4 mb-6">
          <Film className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-semibold text-purple-300">Reference Films</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-5 h-5 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>Upload up to 3 reference films to guide the AI in creating your video. 
                The AI will analyze visual style, transitions, and music synchronization.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((slot) => (
            <div
              key={slot}
              className={`relative aspect-video rounded-lg overflow-hidden ${
                videoFiles.length >= slot ? 'border-purple-500' : 'border-purple-500/30'
              } border-2 border-dashed`}
            >
              {videoFiles.length >= slot ? (
                <div className="absolute inset-0 bg-editor-bg/80 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-purple-300">Reference {slot}</span>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <Film className="w-8 h-8 text-purple-400 mb-2" />
                  <span className="text-sm text-gray-400">Reference {slot}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div 
          onDrop={onDrop}
          onDragOver={onDragOver}
          className="border-2 border-dashed border-purple-500/50 rounded-xl p-12 text-center cursor-pointer hover:bg-purple-500/5 transition-all duration-300 backdrop-blur-sm relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 transform group-hover:scale-105 transition-transform duration-300" />
          <Upload className="w-16 h-16 mx-auto mb-6 text-purple-400 animate-bounce" />
          <p className="text-xl mb-2 font-medium relative z-10">
            Drag and drop your reference videos here
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
      </div>
    </div>
  );
};

export default ReferenceFilmsSection;