import React from 'react';
import { Clock, Film, Music, Palette } from 'lucide-react';
import { useVideoType } from '@/contexts/VideoTypeContext';

const ReviewSummary = () => {
  const { selectedVideoType, selectedStyle, selectedMusic } = useVideoType();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="bg-editor-panel border border-editor-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold">Duration</h3>
        </div>
        <p className="text-gray-400">
          {selectedVideoType?.label || "No duration selected"}
        </p>
      </div>

      <div className="bg-editor-panel border border-editor-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold">Style</h3>
        </div>
        <p className="text-gray-400">
          {selectedStyle?.name || "No style selected"}
        </p>
      </div>

      <div className="bg-editor-panel border border-editor-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Music className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold">Music</h3>
        </div>
        <p className="text-gray-400">
          {selectedMusic?.length 
            ? `${selectedMusic.length} track${selectedMusic.length > 1 ? 's' : ''} selected`
            : "No music selected"}
        </p>
      </div>

      <div className="bg-editor-panel border border-editor-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Film className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold">Preview</h3>
        </div>
        <div className="aspect-video bg-editor-panel/50 rounded-lg flex items-center justify-center">
          <Film className="w-12 h-12 text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;