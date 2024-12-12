import React from 'react';
import { motion } from 'framer-motion';
import { useFileProcessing } from '../../hooks/useFileProcessing';
import FileUploadHandler from './upload/FileUploadHandler';
import ProcessingStatusBar from './ProcessingStatusBar';
import ExportBanner from './export/ExportBanner';
import ProcessingSummary from './status/ProcessingSummary';
import CategoryGrid from './categories/CategoryGrid';

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

  // Group results by category
  const categorizedResults = analysisResults.reduce((acc, result) => {
    const category = result.category || 'Untagged';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(result);
    return acc;
  }, {} as Record<string, typeof analysisResults>);

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
        {isProcessing && (
          <ProcessingStatusBar
            currentFile={currentFile}
            totalFiles={files.length}
            processedFiles={successCount + errorCount}
            onStop={stopProcessing}
          />
        )}

        {/* Categories Grid */}
        <CategoryGrid categorizedResults={categorizedResults} />

        {/* Export Options */}
        {successCount > 0 && (
          <ExportBanner analysisResults={analysisResults} />
        )}

        {/* Processing Summary */}
        {(successCount > 0 || errorCount > 0) && (
          <ProcessingSummary
            successCount={successCount}
            errorCount={errorCount}
          />
        )}
      </div>
    </motion.div>
  );
};

export default FileOrganizer;