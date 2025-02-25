import React from 'react';
import { AnalysisResult } from '@/hooks/useVideoAnalysis';

export interface VideoFrameProps {
  file: File;
  onAnalysisResult: (result: AnalysisResult) => void;
}

const VideoFrame: React.FC<VideoFrameProps> = ({ file, onAnalysisResult }) => {
  return (
    <div>
      {file.name}
    </div>
  );
};

export default VideoFrame;
