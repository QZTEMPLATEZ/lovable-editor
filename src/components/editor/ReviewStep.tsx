import React, { useState } from 'react';
import { useVideoType } from '@/contexts/VideoTypeContext';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';
import ProcessingSteps from '../processing/ProcessingSteps';
import ProcessingHeader from '../processing/ProcessingHeader';
import ProcessingProgressBar from '../processing/ProcessingProgressBar';
import { Download } from 'lucide-react';
import ReviewClassificationStep from './review/ReviewClassificationStep';

interface ReviewStepProps {
  isEditMode?: boolean;
}

const ReviewStep = ({ isEditMode = false }: ReviewStepProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds
  const { toast } = useToast();
  const { selectedMusic, selectedStyle } = useVideoType();

  const handleStartProcessing = () => {
    setIsProcessing(true);
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
      setRemainingTime(prev => Math.max(0, prev - 1));
    }, 1000);
  };

  const handleExport = (format: 'premiere' | 'finalcut' | 'resolve') => {
    toast({
      title: "Exporting Project",
      description: `Preparing ${format} project file for download...`,
    });

    // Simulate export delay
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your project has been exported successfully!",
      });
    }, 2000);
  };

  if (!isEditMode) {
    return <ReviewClassificationStep />;
  }

  if (isProcessing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-editor-bg via-editor-bg/95 to-editor-bg relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
        
        <div className="relative max-w-[1920px] mx-auto p-6 space-y-8">
          <ProcessingHeader 
            remainingTime={remainingTime}
            onStopProcessing={() => setIsProcessing(false)}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="aspect-video w-full bg-editor-panel/40 rounded-2xl overflow-hidden border border-editor-glow-purple/20">
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="animate-spin h-8 w-8 border-4 border-editor-glow-purple rounded-full border-t-transparent mx-auto" />
                    <p className="text-editor-glow-purple">Processing your video...</p>
                  </div>
                </div>
              </div>
              <ProcessingProgressBar progress={progress} />
            </div>
            
            <div className="lg:col-span-4">
              <ProcessingSteps progress={progress} />
            </div>
          </div>

          {progress === 100 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Export Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => handleExport('premiere')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Adobe Premiere Pro
                </Button>
                <Button
                  onClick={() => handleExport('finalcut')}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Final Cut Pro
                </Button>
                <Button
                  onClick={() => handleExport('resolve')}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
                >
                  <Download className="w-4 h-4 mr-2" />
                  DaVinci Resolve
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-editor-bg/95 rounded-xl p-8 shadow-lg border border-purple-500/30"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Review & Process</h2>
        <Button
          onClick={handleStartProcessing}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 h-16 text-lg"
        >
          Start Processing
        </Button>
      </motion.div>
    </div>
  );
};

export default ReviewStep;