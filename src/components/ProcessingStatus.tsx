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
    <div>
      <div className="h-3 w-3 rounded-full bg-purple-500 animate-pulse" />
      {metadata && (
        <div className="text-sm text-gray-400 mt-1">
          {metadata.resolution.width}x{metadata.resolution.height} • {metadata.fps}fps
        </div>
      )}
      
      <Progress value={progress} className="h-2 bg-purple-950 mt-4" />
      
      <div className="grid grid-cols-4 gap-2 mt-4">
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