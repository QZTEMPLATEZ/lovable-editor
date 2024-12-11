import React from 'react';
import { useVideoType } from '../contexts/VideoTypeContext';
import { Clock } from 'lucide-react';

const VideoTypeIndicator = () => {
  const { selectedVideoType } = useVideoType();

  if (!selectedVideoType) return null;

  return (
    <div className="fixed top-20 right-4 z-50">
      <div className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-lg rounded-lg p-3 shadow-lg border border-purple-500/20">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-white" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">{selectedVideoType.name}</span>
            <span className="text-xs text-white/80">{selectedVideoType.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTypeIndicator;