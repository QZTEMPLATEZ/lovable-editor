import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useVideoType } from '@/contexts/VideoTypeContext';
import ReviewSummary from './review/ReviewSummary';
import GenerationProgress from './review/GenerationProgress';
import ExportOptions from './review/ExportOptions';
import StartEditingButton from './StartEditingButton';

const ReviewStep = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const { selectedMusic } = useVideoType();
  const { toast } = useToast();

  const handleDownloadSequences = async () => {
    if (!selectedMusic || selectedMusic.length === 0) {
      toast({
        variant: "destructive",
        title: "No music selected",
        description: "Please select music tracks before downloading sequences.",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would call your backend API
      // to generate and return the separated sequences
      
      toast({
        title: "Sequences Ready",
        description: "Your separated sequences are ready for download.",
      });
      
      // Simulate file download
      const dummyLink = document.createElement('a');
      dummyLink.href = '#';
      dummyLink.download = 'sequences.zip';
      dummyLink.click();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Processing Error",
        description: "Failed to generate sequences. Please try again.",
      });
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Review & Start Editing</h1>
        <p className="text-gray-400">
          Review your selections and start the editing process
        </p>
      </div>

      {/* Summary Section */}
      <ReviewSummary />

      {/* Download Sequences Button */}
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          className="gap-2"
          onClick={handleDownloadSequences}
          disabled={isGenerating || !selectedMusic?.length}
        >
          <Download className="w-4 h-4" />
          Download Pre-separated Sequences
        </Button>
      </div>

      {/* Progress Section */}
      {isGenerating && (
        <GenerationProgress progress={progress} isGenerating={isGenerating} />
      )}

      {/* Instructions */}
      <div className="text-center text-sm text-gray-400 mt-8">
        <p>
          Review your selections and click "Start Editing" when you're ready to begin.
        </p>
      </div>

      {/* Start Editing Button */}
      <div className="flex justify-center">
        <StartEditingButton
          onClick={() => {
            if (!selectedMusic?.length) {
              toast({
                variant: "destructive",
                title: "No music selected",
                description: "Please select at least one music track before continuing.",
              });
              return;
            }
            // Navigate to editing page
            window.location.href = '/edit';
          }}
          disabled={!selectedMusic?.length}
        />
      </div>
    </motion.div>
  );
};

export default ReviewStep;