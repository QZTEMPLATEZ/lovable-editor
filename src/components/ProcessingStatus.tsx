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
    </div>
  );
};

export default ProcessingStatus;