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
import { FileVideo, FolderOpen } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

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

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      <NavigationButtons showContinueButton={analysisResults.length > 0} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel - Upload and Processing */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 p-6 rounded-2xl backdrop-blur-lg border border-purple-500/30 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <FileVideo className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Upload Videos</h2>
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
          </div>

          <div className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 p-6 rounded-2xl backdrop-blur-lg border border-purple-500/30 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <FolderOpen className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Available Categories</h2>
            </div>
            <ScrollArea className="h-[400px] pr-4">
              <FolderGrid categories={FOLDER_CATEGORIES} />
            </ScrollArea>
          </div>
        </div>

        {/* Right Panel - Results and Export */}
        <div className="lg:col-span-8">
          <AnalysisResultsView
            analysisResults={analysisResults}
            isProcessing={isProcessing}
            onExport={handleExport}
          />
        </div>
      </div>
    </div>
  );
};

export default FileOrganizer;
