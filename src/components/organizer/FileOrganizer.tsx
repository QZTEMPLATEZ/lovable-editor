import React from 'react';
import { motion } from 'framer-motion';
import { useFileProcessing } from '../../hooks/useFileProcessing';
import FileUploadHandler from './upload/FileUploadHandler';
import ProcessingStatus from './processing/ProcessingStatus';
import CategoryGrid from './categories/CategoryGrid';
import ProcessingStatusDisplay from './status/ProcessingStatusDisplay';
import InteractiveReview from './review/InteractiveReview';
import { FOLDER_CATEGORIES } from '../../constants/folderCategories';
import { useToast } from "@/hooks/use-toast";

const FileOrganizer = () => {
  const {
    files,
    analysisResults,
    isProcessing,
    currentFile,
    successCount,
    errorCount,
    handleFilesSelected,
    stopProcessing
  } = useFileProcessing();

  const { toast } = useToast();

  // Calculate progress percentage
  const totalProgress = files.length > 0 ? ((successCount + errorCount) / files.length) * 100 : 0;
  const remainingFiles = files.length - (successCount + errorCount);
  const estimatedTimePerFile = 30; // seconds per file
  const remainingTimeSeconds = remainingFiles * estimatedTimePerFile;
  const remainingTimeMinutes = Math.ceil(remainingTimeSeconds / 60);

  const handleClipMove = (clipId: string, sourceCategory: string, destinationCategory: string) => {
    // Here we would integrate with the AI feedback system
    console.log('Clip moved:', { clipId, sourceCategory, destinationCategory });
    
    toast({
      title: "AI Feedback Recorded",
      description: "This correction will help improve future classifications.",
    });
  };

  // Mock data for demonstration - replace with real data from your system
  const mockClips = analysisResults.map((result, index) => ({
    id: `clip-${index}`,
    name: result.file.name,
    duration: "0:30",
    thumbnail: URL.createObjectURL(result.file),
    category: result.category,
    confidence: Math.random() * 0.5 + 0.5, // Random confidence between 0.5 and 1
  }));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95 p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Upload Section */}
        <div className="mb-8">
          <FileUploadHandler 
            onFilesSelected={handleFilesSelected}
            isProcessing={isProcessing}
          />
        </div>

        {/* Processing Status */}
        <ProcessingStatus
          isProcessing={isProcessing}
          currentFile={currentFile}
          totalProgress={totalProgress}
          remainingTimeMinutes={remainingTimeMinutes}
          onStopProcessing={stopProcessing}
        />

        {/* Interactive Review Section */}
        {!isProcessing && analysisResults.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Review & Correct Classifications</h2>
            <InteractiveReview
              clips={mockClips}
              onClipMove={handleClipMove}
            />
          </div>
        )}

        {/* Categories Grid */}
        <CategoryGrid 
          categories={FOLDER_CATEGORIES}
          analysisResults={analysisResults}
        />

        {/* Processing Summary */}
        <ProcessingStatusDisplay 
          successCount={successCount}
          errorCount={errorCount}
          isProcessing={isProcessing}
        />
      </div>
    </motion.div>
  );
};

export default FileOrganizer;