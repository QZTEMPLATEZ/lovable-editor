import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useVideoType } from '@/contexts/VideoTypeContext';
import ReviewHeader from './ReviewHeader';
import ReviewSummary from './ReviewSummary';
import ActionButtons from './ActionButtons';
import PreDownloadModal from './PreDownloadModal';
import { useToast } from "@/hooks/use-toast";
import { buildPremiereSequence } from '@/utils/premiere/sequenceBuilder';
import { logger } from '@/utils/logger';

export const ReviewLayout = () => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
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
      // Show processing toast
      toast({
        title: "Generating Sequence",
        description: "Please wait while we prepare your sequence file...",
      });

      // Generate all three versions
      const versions = ['legacy', 'current', 'compatible'] as const;
      
      for (const version of versions) {
        const sequenceXML = await buildPremiereSequence({
          categorizedFiles: new Map([['Main', selectedMusic]]),
          unorganizedFiles: [],
          stats: {
            totalFiles: selectedMusic.length,
            categorizedCount: selectedMusic.length,
            uncategorizedCount: 0
          }
        }, {
          version,
          projectName: 'Wedding Highlights'
        });

        // Create blob and trigger download
        const blob = new Blob([sequenceXML], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `wedding_highlights_${version}.prproj`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      toast({
        title: "Success",
        description: "Your sequences have been generated and downloaded!",
      });
    } catch (error) {
      logger.error('Sequence generation failed:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate sequence files.",
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