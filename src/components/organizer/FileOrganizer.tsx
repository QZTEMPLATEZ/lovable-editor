import React from 'react';
import { useVideoType } from '../../contexts/VideoTypeContext';
import { exportProject } from '@/utils/projectExport';
import { categorizeClip } from '@/utils/videoEditingLogic';
import { useToast } from '@/hooks/use-toast';
import NavigationButtons from './NavigationButtons';
import { FOLDER_CATEGORIES } from '../../constants/folderCategories';
import { useFileProcessing } from '../../hooks/useFileProcessing';
import FileUploadHandler from './upload/FileUploadHandler';
import { motion } from 'framer-motion';
import ProcessingStatus from './processing/ProcessingStatus';
import CategoryGrid from './categories/CategoryGrid';
import { FileVideo, AlertCircle } from 'lucide-react';
import ProjectExportOptions from '../editor/ProjectExportOptions';

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
    if (analysisResults.length === 0) {
      toast({
        variant: "destructive",
        title: "No files to export",
        description: "Please process some files before exporting.",
      });
      return;
    }

    try {
      const processedClips = analysisResults.map(result => ({
        file: result.file,
        type: result.category as "preparation" | "ceremony" | "celebration",
        startTime: 0,
        endTime: 30,
        significance: 1
      }));

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
        {analysisResults.length > 0 && !isProcessing && (
          <div className="mt-8">
            <ProjectExportOptions
              onExport={handleExport}
              isProcessing={isProcessing}
            />
          </div>
        )}

        {/* Processing Summary */}
        {(successCount > 0 || errorCount > 0) && (
          <div className="fixed bottom-0 left-0 right-0 bg-editor-bg/95 border-t border-purple-500/20 p-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <FileVideo className="text-green-400" />
                  <span className="text-green-300">{successCount} Processed</span>
                </div>
                {errorCount > 0 && (
                  <div className="flex items-center gap-2">
                    <AlertCircle className="text-red-400" />
                    <span className="text-red-300">{errorCount} Errors</span>
                  </div>
                )}
              </div>
              <NavigationButtons showContinueButton={successCount > 0} />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FileOrganizer;
