import React from 'react';
import EditingProgress from '../EditingProgress';
import { categorizeClip } from '../../utils/videoEditingLogic';

interface ProcessingViewProps {
  rawFiles: File[];
  onStopProcessing: () => void;
}

const ProcessingView = ({ rawFiles, onStopProcessing }: ProcessingViewProps) => {
  // Pre-categorize files to show their destinations
  const categorizedFiles = rawFiles.map(file => ({
    file,
    category: categorizeClip(file.name)
  }));

  return (
    <EditingProgress 
      videoFiles={rawFiles} 
      categorizedFiles={categorizedFiles}
      progress={0} 
      onStopProcessing={onStopProcessing}
    />
  );
};

export default ProcessingView;