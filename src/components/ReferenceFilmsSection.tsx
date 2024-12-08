import React, { useRef } from 'react';
import { Upload, Film, Info, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ReferenceFilmsSectionProps {
  onDrop: (e: React.DragEvent<Element>) => void;
  onDragOver: (e: React.DragEvent) => void;
  videoFiles: File[];
  onContinue: () => void;
}

const ReferenceFilmsSection = ({ onDrop, onDragOver, videoFiles, onContinue }: ReferenceFilmsSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const videoFiles = files.filter(file => file.type.startsWith('video/'));
    
    if (videoFiles.length > 0) {
      const syntheticEvent = {
        preventDefault: () => {},
        dataTransfer: {
          files: videoFiles
        }
      } as unknown as React.DragEvent<Element>;
      
      onDrop(syntheticEvent);
    }
  };

  const handleDeleteVideo = (index: number) => {
    const newFiles = [...videoFiles];
    newFiles.splice(index, 1);
    const syntheticEvent = {
      preventDefault: () => {},
      dataTransfer: {
        files: newFiles
      }
    } as unknown as React.DragEvent<Element>;
    
    onDrop(syntheticEvent);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 rounded-xl p-8 border border-purple-500/30">
        <div className="flex items-center gap-4 mb-6">
          <Logo className="w-8 h-8" />
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
                <div className="relative w-full h-full group">
                  <video 
                    src={URL.createObjectURL(videoFiles[slot - 1])} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <span className="text-lg font-bold text-white">Reference {slot}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteVideo(slot - 1)}
                    className="absolute top-2 right-2 p-1 bg-red-500/80 hover:bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
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
          onClick={handleClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
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

        {videoFiles.length === 3 && (
          <div className="mt-6 flex justify-center">
            <Button 
              onClick={onContinue}
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-2 rounded-lg flex items-center gap-2"
            >
              Continue to Raw Footage
              <Film className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferenceFilmsSection;