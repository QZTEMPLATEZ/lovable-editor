
import React from 'react';
import EditingProgress from '../EditingProgress';

interface ProcessingViewProps {
  videoFiles: File[];
  progress: number;
  onStopProcessing: () => void;
}

const ProcessingView = ({ videoFiles, progress, onStopProcessing }: ProcessingViewProps) => {
  return (
    <EditingProgress 
      videoFiles={videoFiles}
      progress={progress}
      isComplete={progress === 100}
      onStopProcessing={onStopProcessing}
    />
  );
};

export default ProcessingView;
