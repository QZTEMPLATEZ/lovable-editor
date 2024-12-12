import React from 'react';
import { useVideoType } from '../../contexts/VideoTypeContext';
import { exportProject } from '@/utils/projectExport';
import { useToast } from '@/hooks/use-toast';
import NavigationButtons from './NavigationButtons';
import { FOLDER_CATEGORIES } from '../../constants/folderCategories';
import { useFileProcessing } from '../../hooks/useFileProcessing';
import FileUploadHandler from './upload/FileUploadHandler';
import ProcessingStatusBar from './ProcessingStatusBar';
import { FileVideo, AlertCircle } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { motion } from 'framer-motion';
import { ClipType } from '@/types/video';
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

  // Group results by category
  const categorizedResults = analysisResults.reduce((acc, result) => {
    const category = result.category || 'Untagged';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(result);
    return acc;
  }, {} as Record<string, typeof analysisResults>);

  const onFilesSelected = (selectedFiles: File[]) => {
    console.log('Files selected:', selectedFiles);
    if (selectedFiles.length > 0) {
      handleFilesSelected(selectedFiles);
    }
  };

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
            onFilesSelected={onFilesSelected}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {FOLDER_CATEGORIES.map((category) => (
            <motion.div
              key={category.name}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`p-4 rounded-xl border ${category.color} backdrop-blur-sm`}
            >
              <div className="flex items-center gap-3 mb-2">
                {category.icon}
                <h3 className="font-semibold text-white">{category.name}</h3>
                <span className="ml-auto bg-white/10 px-2 py-1 rounded-full text-sm">
                  {categorizedResults[category.name]?.length || 0}
                </span>
              </div>
              {categorizedResults[category.name]?.length > 0 && (
                <ScrollArea className="h-32 mt-2">
                  {categorizedResults[category.name].map((result, index) => (
                    <div key={index} className="text-sm text-gray-300 py-1 px-2">
                      {result.file.name}
                    </div>
                  ))}
                </ScrollArea>
              )}
            </motion.div>
          ))}
        </div>

        {/* Export Banner */}
        {successCount > 0 && (
          <ExportBanner onExport={handleExport} />
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