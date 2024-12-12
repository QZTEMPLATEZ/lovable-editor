import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReviewSummary from './review/ReviewSummary';
import ExportOptions from './review/ExportOptions';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { useVideoType } from '@/contexts/VideoTypeContext';

const ReviewStep = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const { selectedVideoType, selectedStyle, selectedMusic } = useVideoType();

  const handleExport = async (format: 'premiere' | 'finalcut' | 'resolve') => {
    if (!selectedVideoType || !selectedStyle || !selectedMusic?.length) {
      toast({
        variant: "destructive",
        title: "Missing Requirements",
        description: "Please ensure you have selected a duration, style, and music before exporting.",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Review & Export</h1>
        <p className="text-gray-400">
          Review your selections and export your project to your preferred editing software
        </p>
      </div>

      {/* Summary Section */}
      <ReviewSummary />

      {/* Progress Section */}
      {isGenerating && (
        <div className="space-y-4">
          <Progress value={progress} className="h-2" />
          <p className="text-center text-sm text-gray-400">
            Generating your project... {progress}%
          </p>
        </div>
      )}

      {/* Export Options */}
      <div className="max-w-md mx-auto">
        <ExportOptions 
          onExport={handleExport}
          isGenerating={isGenerating}
        />
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-gray-400 mt-8">
        <p>
          Once exported, open the project file in your preferred editing software to make final adjustments.
        </p>
      </div>
    </motion.div>
  );
};

export default ReviewStep;