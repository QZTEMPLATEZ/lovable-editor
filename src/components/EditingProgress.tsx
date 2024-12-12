import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProcessingHeader from './processing/ProcessingHeader';
import ProcessingPreview from './processing/ProcessingPreview';
import ProcessingSteps from './processing/ProcessingSteps';
import ProcessingProgressBar from './processing/ProcessingProgressBar';
import { Badge } from './ui/badge';
import { Folder } from 'lucide-react';

interface EditingProgressProps {
  videoFiles: File[];
  categorizedFiles: Array<{ file: File; category: string }>;
  progress: number;
  onStopProcessing: () => void;
}

const EditingProgress = ({ videoFiles, categorizedFiles, progress, onStopProcessing }: EditingProgressProps) => {
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

  // Group files by category
  const filesByCategory = categorizedFiles.reduce((acc, { category, file }) => {
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(file);
    return acc;
  }, {} as Record<string, File[]>);

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
        <ProcessingHeader 
          remainingTime={remainingTime} 
          onStopProcessing={onStopProcessing}
        />
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Preview Section */}
          <div className="lg:col-span-8 space-y-6">
            <ProcessingPreview 
              videoFiles={videoFiles}
              currentFrameIndex={currentFrameIndex}
              currentCategory={categorizedFiles[currentFrameIndex]?.category}
            />
            <ProcessingProgressBar progress={progress} />

            {/* Categories Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {Object.entries(filesByCategory).map(([category, files]) => (
                <div
                  key={category}
                  className="bg-editor-bg/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Folder className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-semibold text-purple-300 capitalize">
                      {category}
                    </h3>
                    <Badge variant="secondary" className="ml-auto">
                      {files.length} files
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="text-sm text-gray-400 truncate"
                      >
                        {file.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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