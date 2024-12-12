import React from 'react';
import { useVideoType } from '../../contexts/VideoTypeContext';
import { exportProject } from '@/utils/projectExport';
import { categorizeClip, analyzeClipSignificance } from '@/utils/videoEditingLogic';
import { useToast } from '@/hooks/use-toast';
import NavigationButtons from './NavigationButtons';
import FolderGrid from './FolderGrid';
import { FOLDER_CATEGORIES } from '../../constants/folderCategories';
import { useFileProcessing } from '../../hooks/useFileProcessing';
import FileProcessingSection from './processing/FileProcessingSection';
import AnalysisResultsView from './analysis/AnalysisResultsView';
import { FileVideo, FolderOpen, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Alert, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';
import { motion } from 'framer-motion';

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
    handleFilesSelected
  } = useFileProcessing();

  const handleExport = async (format: 'premiere' | 'finalcut' | 'resolve') => {
    try {
      const processedClips = await Promise.all(
        analysisResults.map(async result => ({
          file: result.file,
          type: categorizeClip(result.file.name),
          startTime: 0,
          endTime: 30,
          significance: await analyzeClipSignificance(result.file)
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
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "There was an error exporting your sequence. Please try again.",
      });
    }
  };

  const totalProgress = files.length > 0 ? ((successCount + errorCount) / files.length) * 100 : 0;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95"
    >
      <div className="max-w-7xl mx-auto p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Video Organization</h1>
          <p className="text-gray-400">Organize and categorize your wedding footage automatically</p>
        </div>

        {/* Status Bar */}
        {isProcessing ? (
          <Alert className="bg-purple-500/10 border-purple-500/30 mb-8">
            <AlertDescription className="flex items-center gap-2 text-purple-200">
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing your videos... Please wait while we analyze and organize your content
            </AlertDescription>
          </Alert>
        ) : (
          analysisResults.length > 0 && (
            <div className="flex items-center gap-4 mb-8 bg-green-500/10 p-4 rounded-lg border border-green-500/30">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
              <span className="text-green-300">Analysis Complete! You can now proceed to edit your video.</span>
              <NavigationButtons showContinueButton={true} />
            </div>
          )
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel - Upload and Categories */}
          <div className="lg:col-span-4 space-y-6">
            {/* Upload Section */}
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="bg-editor-bg/80 backdrop-blur-xl rounded-xl border border-purple-500/20 p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <FileVideo className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Upload Videos</h2>
              </div>
              <FileProcessingSection
                isProcessing={isProcessing}
                onFilesSelected={handleFilesSelected}
                totalFiles={files.length}
                processedFiles={successCount + errorCount}
                successCount={successCount}
                errorCount={errorCount}
                currentFile={currentFile?.name}
              />
              {isProcessing && (
                <div className="mt-4 space-y-2">
                  <Progress value={totalProgress} className="h-2" />
                  <p className="text-sm text-purple-300 text-center">
                    {Math.round(totalProgress)}% Complete
                  </p>
                </div>
              )}
            </motion.div>

            {/* Categories Section */}
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="bg-editor-bg/80 backdrop-blur-xl rounded-xl border border-purple-500/20 p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <FolderOpen className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Categories</h2>
              </div>
              <ScrollArea className="h-[400px] pr-4">
                <FolderGrid categories={FOLDER_CATEGORIES} />
              </ScrollArea>
            </motion.div>
          </div>

          {/* Right Panel - Results */}
          <motion.div
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="lg:col-span-8"
          >
            <AnalysisResultsView
              analysisResults={analysisResults}
              isProcessing={isProcessing}
              onExport={handleExport}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FileOrganizer;