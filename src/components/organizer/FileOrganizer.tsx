import React from 'react';
import { useVideoType } from '../../contexts/VideoTypeContext';
import { exportProject } from '@/utils/projectExport';
import { useToast } from '@/hooks/use-toast';
import { FOLDER_CATEGORIES } from '../../constants/folderCategories';
import { useFileProcessing } from '../../hooks/useFileProcessing';
import { motion } from 'framer-motion';
import { ClipType } from '@/types/video';
import FileUploadHandler from './upload/FileUploadHandler';
import ProcessingStatusBar from './ProcessingStatusBar';
import CategoryGrid from './categories/CategoryGrid';
import ProcessingSummary from './status/ProcessingSummary';
import ExportBanner from './export/ExportBanner';

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
        analysisResults.map(async result => {
          const clipType = (result.category?.toLowerCase() || 'preparation') as ClipType;
          return {
            file: result.file,
            type: clipType,
            startTime: 0,
            endTime: 30,
            significance: 1
          };
        })
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
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "There was an error exporting your sequence. Please try again.",
      });
    }
  };

  const categorizedResults = analysisResults.reduce((acc, result) => {
    const category = result.category || 'Untagged';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(result);
    return acc;
  }, {} as Record<string, typeof analysisResults>);

  const onFilesSelected = (selectedFiles: File[]) => {
    if (selectedFiles.length > 0) {
      console.log('Starting file processing:', selectedFiles);
      handleFilesSelected(selectedFiles);
      toast({
        title: "Processing Started",
        description: `Starting to process ${selectedFiles.length} files...`,
      });
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
            onFilesSelected={onFilesSelected}
            isProcessing={isProcessing}
          />
        </div>

        {isProcessing && (
          <ProcessingStatusBar
            currentFile={currentFile}
            totalFiles={files.length}
            processedFiles={successCount + errorCount}
            onStop={stopProcessing}
          />
        )}

        <CategoryGrid categorizedResults={categorizedResults} />

        {successCount > 0 && (
          <ExportBanner onExport={handleExport} />
        )}

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