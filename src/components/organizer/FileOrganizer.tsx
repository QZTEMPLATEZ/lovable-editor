import React from 'react';
import { motion } from 'framer-motion';
import { useFileProcessing } from '../../hooks/useFileProcessing';
import FileUploadHandler from './upload/FileUploadHandler';
import ProcessingStatus from './processing/ProcessingStatus';
import CategoryGrid from './categories/CategoryGrid';
import ProcessingStatusDisplay from './status/ProcessingStatusDisplay';
import ExportOptions from './export/ExportOptions';
import { FOLDER_CATEGORIES } from '../../constants/folderCategories';

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

  // Calculate progress percentage
  const totalProgress = files.length > 0 ? ((successCount + errorCount) / files.length) * 100 : 0;
  const remainingFiles = files.length - (successCount + errorCount);
  const estimatedTimePerFile = 30; // seconds per file
  const remainingTimeSeconds = remainingFiles * estimatedTimePerFile;
  const remainingTimeMinutes = Math.ceil(remainingTimeSeconds / 60);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95 p-6"
    >
      <div className="max-w-5xl mx-auto">
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

        {/* Categories Grid */}
        <CategoryGrid 
          categories={FOLDER_CATEGORIES}
          analysisResults={analysisResults}
        />

        {/* Export Options */}
        <ExportOptions 
          analysisResults={analysisResults}
          isProcessing={isProcessing}
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