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
import { Button } from '../ui/button';
import { Save } from 'lucide-react';

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

  const handleExportPremiereSequence = async () => {
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

      const exportedFile = await exportProject(project, { format: 'premiere' });
      
      const url = URL.createObjectURL(exportedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'organized_wedding_sequence.prproj';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Sequence Exported Successfully",
        description: "Your organized sequence has been exported for Adobe Premiere Pro. You can now proceed to the editing step.",
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

      <div className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none" />
        
        <div className="relative space-y-6">
          <FileProcessingSection
            isProcessing={isProcessing}
            onFilesSelected={handleFilesSelected}
            totalFiles={files.length}
            processedFiles={successCount + errorCount}
            successCount={successCount}
            errorCount={errorCount}
            currentFile={currentFile?.name}
          />

          <AnalysisResultsView
            analysisResults={analysisResults}
            isProcessing={isProcessing}
            onExport={handleExportPremiereSequence}
          />

          {analysisResults.length > 0 && !isProcessing && (
            <div className="flex justify-center mt-8 pt-8 border-t border-purple-500/20">
              <Button
                onClick={handleExportPremiereSequence}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Organized Premiere Sequence
              </Button>
            </div>
          )}

          <FolderGrid categories={FOLDER_CATEGORIES} />
        </div>
      </div>
    </div>
  );
};

export default FileOrganizer;