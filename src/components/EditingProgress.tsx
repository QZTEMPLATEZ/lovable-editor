import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ProcessingPreview from './processing/ProcessingPreview';
import ProcessingSteps from './processing/ProcessingSteps';

interface EditingProgressProps {
  videoFiles: File[];
  progress: number;
  onStopProcessing?: () => void;
}

const EditingProgress = ({ videoFiles, progress, onStopProcessing }: EditingProgressProps) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const { toast } = useToast();
  
  useEffect(() => {
    if (videoFiles.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentFrameIndex((prev) => (prev + 1) % videoFiles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [videoFiles.length]);

  const handleStopProcessing = () => {
    if (onStopProcessing) {
      onStopProcessing();
      toast({
        title: "Processing Stopped",
        description: "Video processing has been cancelled.",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-editor-bg via-editor-bg/95 to-editor-bg relative"
    >
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="relative max-w-7xl mx-auto p-6 space-y-8">
        <div className="space-y-6">
          <ProcessingPreview 
            videoFiles={videoFiles}
            currentFrameIndex={currentFrameIndex}
          />
          <ProcessingSteps progress={progress} />
          
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleStopProcessing}
              variant="destructive"
              className="bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30"
            >
              <Square className="w-4 h-4 mr-2" />
              Stop Processing
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EditingProgress;