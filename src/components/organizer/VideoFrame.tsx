
import React from 'react';
import { AnalysisResult } from '@/hooks/useVideoAnalysis';

export interface VideoFrameProps {
  file: File;
  onAnalysisResult: (result: AnalysisResult) => void;
  className?: string;
  onLoad?: () => void;
}

const VideoFrame: React.FC<VideoFrameProps> = ({ file, onAnalysisResult, className, onLoad }) => {
  return (
    <div className={className} onLoad={onLoad}>
      {file.name}
    </div>
  );
};

export default VideoFrame;
