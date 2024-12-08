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
  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds
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
    // Add your stop processing logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-editor-bg via-editor-bg/95 to-editor-bg relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
      
      <div className="relative max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="flex justify-between items-center bg-editor-panel/50 backdrop-blur-lg rounded-xl p-4 border border-purple-500/20"
          >
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Film className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-purple-300">Processing Your Video</h2>
                <p className="text-sm text-gray-400">AI-powered video editing in progress</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 bg-editor-panel/70 px-4 py-2 rounded-lg border border-purple-500/20">
                <Clock className="h-4 w-4 text-purple-400" />
                <span className="text-purple-300 font-mono">{formatTime(remainingTime)}</span>
              </div>
              
              <Button
                onClick={handleStopProcessing}
                variant="destructive"
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30"
              >
                <StopCircle className="h-4 w-4 mr-2" />
                Stop Processing
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ProcessingPreview 
              videoFiles={videoFiles}
              currentFrameIndex={currentFrameIndex}
            />
          </div>
          
          <div className="space-y-6">
            <ProcessingSteps progress={progress} />
          </div>
        </div>

        {/* Progress Indicator */}
        <motion.div 
          className="mt-8 bg-editor-panel/30 rounded-full h-2 overflow-hidden"
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