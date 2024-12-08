import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Clock, StopCircle, Film, Wand2 } from 'lucide-react';
import ProcessingPreview from './processing/ProcessingPreview';
import ProcessingSteps from './processing/ProcessingSteps';

interface EditingProgressProps {
  videoFiles: File[];
  progress: number;
}

const EditingProgress = ({ videoFiles, progress }: EditingProgressProps) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(300);
  const { toast } = useToast();
  
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStopProcessing = () => {
    toast({
      title: "Processing Stopped",
      description: "Your video processing has been cancelled.",
      variant: "destructive",
    });
  };

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
      
      <div className="relative max-w-[1920px] mx-auto p-4 lg:p-6">
        {/* Top Info Bar */}
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Status */}
          <div className="bg-editor-panel/50 backdrop-blur-lg rounded-xl p-4 border border-purple-500/20">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Film className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-purple-300">Processing Video</h2>
                <p className="text-sm text-gray-400">AI-powered editing in progress</p>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div className="bg-editor-panel/50 backdrop-blur-lg rounded-xl p-4 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-purple-300">Remaining Time</h2>
                  <p className="text-sm font-mono text-gray-400">{formatTime(remainingTime)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-editor-panel/50 backdrop-blur-lg rounded-xl p-4 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <StopCircle className="h-5 w-5 text-red-400" />
                </div>
                <Button
                  onClick={handleStopProcessing}
                  variant="destructive"
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30"
                >
                  Stop Processing
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Large Preview */}
          <div className="lg:col-span-8 space-y-4">
            <ProcessingPreview 
              videoFiles={videoFiles}
              currentFrameIndex={currentFrameIndex}
            />
          </div>
          
          {/* Side Info */}
          <div className="lg:col-span-4 space-y-4">
            <ProcessingSteps progress={progress} />
          </div>
        </div>

        {/* Progress Bar */}
        <motion.div 
          className="mt-6 bg-editor-panel/30 rounded-full h-2 overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 background-animate"
            style={{ width: `${progress}%` }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EditingProgress;