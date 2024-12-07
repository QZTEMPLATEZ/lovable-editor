import React from 'react';
import { Progress } from "@/components/ui/progress";
import { VideoMetadata } from '@/utils/videoProcessing';

interface ProcessingStatusProps {
  currentStep: string;
  progress: number;
  metadata?: VideoMetadata;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ currentStep, progress, metadata }) => {
  return (
    <div className="space-y-6 bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-purple-500 animate-pulse" />
          <h3 className="text-xl font-semibold text-white">{currentStep}</h3>
        </div>
        {metadata && (
          <div className="text-sm text-gray-400">
            {metadata.resolution.width}x{metadata.resolution.height} • {metadata.fps}fps
          </div>
        )}
      </div>
      
      <Progress value={progress} className="h-2 bg-purple-950" />
      
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-1 bg-purple-500/20 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-purple-500/50 animate-pulse"
              style={{
                width: `${progress}%`,
                transition: 'width 0.5s ease-out',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessingStatus;