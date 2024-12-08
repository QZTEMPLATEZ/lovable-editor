import React, { useState, useEffect } from 'react';
import AIInstructionsInput from './processing/AIInstructionsInput';
import ProcessingPreview from './processing/ProcessingPreview';
import ProcessingSteps from './processing/ProcessingSteps';

interface EditingProgressProps {
  videoFiles: File[];
  progress: number;
}

const EditingProgress = ({ videoFiles, progress }: EditingProgressProps) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [aiInstructions, setAiInstructions] = useState('');
  
  useEffect(() => {
    if (videoFiles.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentFrameIndex((prev) => (prev + 1) % videoFiles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [videoFiles.length]);

  return (
    <div className="space-y-8 w-full max-w-6xl mx-auto">
      <AIInstructionsInput 
        value={aiInstructions}
        onChange={setAiInstructions}
      />
      
      <ProcessingPreview 
        videoFiles={videoFiles}
        currentFrameIndex={currentFrameIndex}
      />
      
      <ProcessingSteps progress={progress} />
    </div>
  );
};

export default EditingProgress;