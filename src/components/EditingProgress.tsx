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
    <div className="min-h-screen bg-gradient-to-br from-editor-bg via-editor-bg/95 to-editor-bg">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - AI Instructions */}
          <div className="space-y-6">
            <div className="adobe-style-panel backdrop-blur-xl">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 mb-6">
                AI Video Editor
              </h2>
              <AIInstructionsInput 
                value={aiInstructions}
                onChange={setAiInstructions}
              />
            </div>
          </div>

          {/* Right Column - Preview and Progress */}
          <div className="space-y-6">
            <ProcessingPreview 
              videoFiles={videoFiles}
              currentFrameIndex={currentFrameIndex}
            />
            <ProcessingSteps progress={progress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditingProgress;