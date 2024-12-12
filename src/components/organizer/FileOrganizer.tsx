import React from 'react';
import { useVideoType } from '../../contexts/VideoTypeContext';
import { exportProject } from '@/utils/projectExport';
import { useToast } from '@/hooks/use-toast';
import { useFileProcessing } from '../../hooks/useFileProcessing';
import FileUploadHandler from './upload/FileUploadHandler';
import { motion } from 'framer-motion';
import ProcessingStatusBar from './ProcessingStatusBar';
import CategoryGrid from './categories/CategoryGrid';
import ExportBanner from './export/ExportBanner';
import ProcessingSummary from './status/ProcessingSummary';

const FileOrganizer = () => {
  const { toast } = useToast();
  const { selectedVideoType } = useVideoType();
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

  const handleExport = async (format: 'premiere' | 'finalcut' | 'resolve') => {
    try {
      const processedClips = await Promise.all(
        analysisResults.map(async result => ({
          file: result.file,
          type: (result.category?.toLowerCase() || 'preparation') as any,
          startTime: 0,
          endTime: 30,
          significance: 1
        }))
      );

      const project = {
        clips: processedClips,
        music: {
          file: new File([], "placeholder.mp3"),
          beats: []
        },
        duration: {
          min: selectedVideoType?.min || 3,
          max: selectedVideoType?.max || 6
        }
      };

      const exportedFile = await exportProject(project, { format });
      const fileExtension = format === 'premiere' ? 'prproj' : format === 'finalcut' ? 'fcpxml' : 'drp';
      const fileName = `organized_sequence.${fileExtension}`;
      
      const url = URL.createObjectURL(exportedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Sequence Exported Successfully",
        description: `Your organized sequence has been exported for ${
          format === 'premiere' ? 'Adobe Premiere Pro' : 
          format === 'finalcut' ? 'Final Cut Pro' : 
          'DaVinci Resolve'
        }.`,
      });
    } catch (error) {
      console.error('Export error:', error);
      throw error;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95 p-6"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <FileUploadHandler 
            onFilesSelected={handleFilesSelected}
            isProcessing={isProcessing}
          />
        </div>

        <ProcessingStatusBar
          isProcessing={isProcessing}
          currentFile={currentFile}
          successCount={successCount}
          errorCount={errorCount}
          totalFiles={files.length}
          onStopProcessing={stopProcessing}
        />

        <CategoryGrid analysisResults={analysisResults} />

        <ExportBanner 
          successCount={successCount}
          onExport={handleExport}
        />

        <ProcessingSummary
          successCount={successCount}
          errorCount={errorCount}
        />
      </div>
    </motion.div>
  );
};

export default FileOrganizer;