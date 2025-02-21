import React, { useEffect, useState } from 'react';
import ProgressDisplay from './editor/progress/ProgressDisplay';
import ProcessingPreview from './editor/progress/ProcessingPreview';
import ExportOptions from './editor/progress/ExportOptions';

interface EditingProgressProps {
  videoFiles: File[];
  progress: number;
  onStopProcessing: () => void;
}

const EditingProgress = ({ videoFiles, progress, onStopProcessing }: EditingProgressProps) => {
  const [remainingTime, setRemainingTime] = useState(60);
  const [currentFile, setCurrentFile] = useState('');
  const isComplete = progress === 100;

  useEffect(() => {
    if (videoFiles.length > 0) {
      const currentIndex = Math.floor((progress / 100) * videoFiles.length);
      if (currentIndex < videoFiles.length) {
        setCurrentFile(videoFiles[currentIndex].name);
      }
    }
  }, [progress, videoFiles]);

  useEffect(() => {
    if (!isComplete && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isComplete, remainingTime]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <h2 className="text-2xl font-bold text-center mb-8">
        {isComplete ? 'Processing Complete!' : 'Processing Your Videos'}
      </h2>

      <ProgressDisplay progress={progress} remainingTime={remainingTime} />
      <ProcessingPreview currentFile={currentFile} />
      <ExportOptions 
        isComplete={isComplete}
        videoFiles={videoFiles}
        onStopProcessing={onStopProcessing}
      />
    </div>
  );
};

export default EditingProgress;