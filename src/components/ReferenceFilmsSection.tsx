import React from 'react';
import { Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ReferenceFilmsSectionProps {
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  videoFiles: File[];
  onContinue: () => void;
}

const ReferenceFilmsSection = ({ onDrop, onDragOver, videoFiles, onContinue }: ReferenceFilmsSectionProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-purple-300">Reference Videos</h2>
        <p className="text-gray-400">Upload up to 3 videos that inspire your desired style</p>
      </div>

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center space-y-4 hover:border-purple-500/50 transition-colors"
      >
        <Upload className="w-12 h-12 mx-auto text-purple-400" />
        <p className="text-gray-400">Drag and drop your reference videos here</p>
        <p className="text-sm text-gray-500">(or click to browse)</p>
      </div>

      {videoFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-300">Uploaded Videos</h3>
          <div className="grid gap-4">
            {videoFiles.map((file, index) => (
              <div
                key={index}
                className="bg-purple-950/20 p-4 rounded-lg flex items-center justify-between"
              >
                <span className="text-purple-300">{file.name}</span>
                <span className="text-sm text-gray-400">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {videoFiles.length >= 1 && (
        <Button
          onClick={onContinue}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white"
        >
          Continue
        </Button>
      )}
    </div>
  );
};

export default ReferenceFilmsSection;