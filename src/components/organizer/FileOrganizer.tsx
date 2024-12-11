import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { logger } from '../../utils/logger';
import { fileAnalysisService, AnalysisResult } from '../../services/FileAnalysisService';
import { ORGANIZER_CONFIG } from '../../config/organizerConfig';
import FileUploadHandler from './upload/FileUploadHandler';
import FileAnalysisStatus from './FileAnalysisStatus';
import OrganizationResults from './OrganizationResults';
import NavigationButtons from './NavigationButtons';
import FolderGrid from './FolderGrid';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useVideoType } from '../../contexts/VideoTypeContext';
import { FOLDER_CATEGORIES } from '../../constants/folderCategories';

const FileOrganizer = () => {
  const { toast } = useToast();
  const { selectedVideoType } = useVideoType();
  const [files, setFiles] = useState<File[]>([]);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const handleFilesSelected = async (newFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    processFiles(newFiles);
  };

  const processFiles = async (filesToProcess: File[]) => {
    setIsProcessing(true);
    setProgress(0);

    try {
      logger.info(`Starting processing of ${filesToProcess.length} files`);

      for (let i = 0; i < filesToProcess.length; i++) {
        setCurrentFile(filesToProcess[i]);
        setProgress((i / filesToProcess.length) * 100);

        const result = await fileAnalysisService.analyzeFile(filesToProcess[i]);
        
        setAnalysisResults(prev => [...prev, result]);

        if (result.error) {
          toast({
            variant: "destructive",
            title: "Processing Error",
            description: `Error processing ${result.file.name}: ${result.error}`
          });
        }
      }

      setProgress(100);
      toast({
        title: "Processing Complete",
        description: `Successfully processed ${filesToProcess.length} files`
      });

    } catch (error) {
      logger.error('Error processing files', error);
      toast({
        variant: "destructive",
        title: "Processing Error",
        description: "An unexpected error occurred while processing files"
      });
    } finally {
      setIsProcessing(false);
      setCurrentFile(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      <NavigationButtons showContinueButton={analysisResults.length > 0} />

      <div className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none" />
        
        <Alert className="mb-6 bg-purple-500/10 border-purple-500/30">
          <AlertDescription className="text-purple-200">
            For your {selectedVideoType?.name || 'video'} ({selectedVideoType?.label || 'selected duration'}), 
            we recommend selecting {Math.ceil((selectedVideoType?.max || 1) * 10)} to {Math.ceil((selectedVideoType?.max || 1) * 15)} clips 
            to ensure comprehensive coverage.
          </AlertDescription>
        </Alert>

        <div className="relative space-y-6">
          <FileUploadHandler 
            onFilesSelected={handleFilesSelected}
            isProcessing={isProcessing}
          />

          <FileAnalysisStatus 
            isProcessing={isProcessing}
            progress={progress}
            currentFile={currentFile}
          />

          {analysisResults.length > 0 && (
            <OrganizationResults 
              results={{
                categorizedFiles: new Map(
                  analysisResults
                    .filter(r => !r.error)
                    .map(r => [r.category, [r.file]])
                ),
                unorganizedFiles: analysisResults
                  .filter(r => r.error)
                  .map(r => r.file),
                stats: {
                  totalFiles: analysisResults.length,
                  categorizedCount: analysisResults.filter(r => !r.error).length,
                  uncategorizedCount: analysisResults.filter(r => r.error).length
                }
              }} 
            />
          )}

          <FolderGrid categories={FOLDER_CATEGORIES} />
        </div>
      </div>
    </div>
  );
};

export default FileOrganizer;