import React from 'react';
import EditingProgress from '../EditingProgress';

interface ProcessingViewProps {
  rawFiles: File[];
  onStopProcessing: () => void;
}

const ProcessingView = ({ rawFiles, onStopProcessing }: ProcessingViewProps) => {
  return (
    <EditingProgress 
      videoFiles={rawFiles} 
      progress={0} 
      onStopProcessing={onStopProcessing}
    />
  );
};

export default ProcessingView;