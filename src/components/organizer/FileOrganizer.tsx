import React from 'react';
import { useVideoType } from '../../contexts/VideoTypeContext';
import { exportProject } from '@/utils/projectExport';
import { categorizeClip } from '@/utils/videoEditingLogic';
import { useToast } from '@/hooks/use-toast';
import NavigationButtons from './NavigationButtons';
import { FOLDER_CATEGORIES } from '../../constants/folderCategories';
import { useFileProcessing } from '../../hooks/useFileProcessing';
import FileUploadHandler from './upload/FileUploadHandler';
import { FileVideo, AlertCircle } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Progress } from '../ui/progress';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from '../ui/alert';

const mapCategoryToClipType = (category: string): "preparation" | "ceremony" | "celebration" => {
  // Map categories to clip types
  if (category.toLowerCase().includes('prep') || category.toLowerCase().includes('detail')) {
    return 'preparation';
  }
  if (category.toLowerCase().includes('ceremony') || category.toLowerCase().includes('vow')) {
    return 'ceremony';
  }
  return 'celebration'; // Default to celebration for other categories
};

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
          type: mapCategoryToClipType(result.category || 'Untagged'),
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
          <Alert className="mb-6 bg-purple-500/10 border-purple-500/30">
            <AlertDescription className="flex items-center gap-2">
              <FileVideo className="animate-pulse" />
              <span>Processing: {currentFile?.name}</span>
              <Progress value={(successCount + errorCount) / files.length * 100} className="ml-4" />
            </AlertDescription>
          </Alert>
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