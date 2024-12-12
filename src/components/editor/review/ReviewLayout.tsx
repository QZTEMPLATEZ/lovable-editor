import React from 'react';
import { motion } from 'framer-motion';
import { useVideoType } from '@/contexts/VideoTypeContext';
import ReviewHeader from './ReviewHeader';
import ReviewSummary from './ReviewSummary';
import ActionButtons from './ActionButtons';
import PreDownloadModal from './PreDownloadModal';
import { useToast } from "@/hooks/use-toast";

export const ReviewLayout = () => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const { selectedMusic, selectedStyle, selectedVideoType } = useVideoType();
  const { toast } = useToast();

  const handleStartEditing = async () => {
    if (!selectedStyle || !selectedMusic?.length) {
      toast({
        variant: "destructive",
        title: "Missing Requirements",
        description: "Please ensure you have selected a style and music before starting.",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Success",
        description: "Your project is ready for editing!",
      });
      window.location.href = '/edit';
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to start editing. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-editor-bg p-6"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <ReviewHeader />
        <ReviewSummary />
        
        <ActionButtons 
          onStartEditing={handleStartEditing}
          onPreDownload={() => setIsDownloadModalOpen(true)}
          isProcessing={isProcessing}
        />

        <PreDownloadModal 
          open={isDownloadModalOpen}
          onOpenChange={setIsDownloadModalOpen}
        />
      </div>
    </motion.div>
  );
};

export default ReviewLayout;