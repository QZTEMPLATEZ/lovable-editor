import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProcessingHeader from './processing/ProcessingHeader';
import ProcessingPreview from './processing/ProcessingPreview';
import ProcessingSteps from './processing/ProcessingSteps';
import ProcessingProgressBar from './processing/ProcessingProgressBar';

interface EditingProgressProps {
  videoFiles: File[];
  progress: number;
}

const EditingProgress = ({ videoFiles, progress }: EditingProgressProps) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(300);
  
  useEffect(() => {
    if (videoFiles.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentFrameIndex((prev) => (prev + 1) % videoFiles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [videoFiles.length]);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [remainingTime]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-editor-bg via-editor-bg/95 to-editor-bg relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
      
      <div className="relative max-w-[1920px] mx-auto p-6 space-y-8">
        {/* Header Section */}
        <ProcessingHeader remainingTime={remainingTime} />
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Preview Section */}
          <div className="lg:col-span-8 space-y-6">
            <ProcessingPreview 
              videoFiles={videoFiles}
              currentFrameIndex={currentFrameIndex}
            />
            <ProcessingProgressBar progress={progress} />
          </div>
          
          {/* Steps Section */}
          <div className="lg:col-span-4">
            <ProcessingSteps progress={progress} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EditingProgress;