import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { logger } from '../../utils/logger';
import { fileAnalysisService, AnalysisResult } from '../../services/FileAnalysisService';
import { ORGANIZER_CONFIG } from '../../config/organizerConfig';
import FileUploadHandler from './upload/FileUploadHandler';
import FileAnalysisStatus from './FileAnalysisStatus';
import OrganizationResults from './OrganizationResults';
import NavigationButtons from './NavigationButtons';
import FolderGrid from './FolderGrid';
import ProjectExportOptions from '../editor/ProjectExportOptions';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useVideoType } from '../../contexts/VideoTypeContext';
import { FOLDER_CATEGORIES } from '../../constants/folderCategories';
import { exportProject } from '@/utils/projectExport';
import { categorizeClip, analyzeClipSignificance } from '@/utils/videoEditingLogic';
import ProcessStatus from './ProcessStatus';

const FileOrganizer = () => {
  const { toast } = useToast();
  const { selectedVideoType } = useVideoType();
  const [files, setFiles] = useState<File[]>([]);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [successCount, setSuccessCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  const handleFilesSelected = async (newFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    processFiles(newFiles);
  };

  const handleExport = async (format: 'premiere' | 'finalcut' | 'resolve') => {
    try {
      setIsProcessing(true);
      
      // Process clips with required properties for EditingProject type
      const processedClips = await Promise.all(
        analysisResults.map(async result => ({
          file: result.file,
          type: categorizeClip(result.file.name),
          startTime: 0,
          endTime: 30, // Default 30-second segments
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
      
      // Create download link
      const url = URL.createObjectURL(exportedFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wedding_project.${format === 'premiere' ? 'prproj' : format === 'finalcut' ? 'fcpxml' : 'drp'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: `Project file has been exported for ${format === 'premiere' ? 'Adobe Premiere Pro' : format === 'finalcut' ? 'Final Cut Pro' : 'DaVinci Resolve'}.`,
      });
    } catch (error) {
      logger.error('Export error:', error);
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "There was an error exporting your project. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const processFiles = async (filesToProcess: File[]) => {
    setIsProcessing(true);
    setProgress(0);
    setSuccessCount(0);
    setErrorCount(0);

    try {
      logger.info(`Starting processing of ${filesToProcess.length} files`);

      for (let i = 0; i < filesToProcess.length; i++) {
        setCurrentFile(filesToProcess[i]);
        setProgress((i / filesToProcess.length) * 100);

        const result = await fileAnalysisService.analyzeFile(filesToProcess[i]);
        
        setAnalysisResults(prev => [...prev, result]);

        if (result.error) {
          setErrorCount(prev => prev + 1);
          toast({
            variant: "destructive",
            title: "Processing Error",
            description: `Error processing ${result.file.name}: ${result.error}`
          });
        } else {
          setSuccessCount(prev => prev + 1);
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

          {isProcessing && (
            <ProcessStatus
              totalFiles={files.length}
              processedFiles={successCount + errorCount}
              successCount={successCount}
              errorCount={errorCount}
              currentFile={currentFile?.name}
            />
          )}

          {analysisResults.length > 0 && (
            <>
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

              <div className="mt-8 pt-8 border-t border-purple-500/30">
                <ProjectExportOptions
                  onExport={handleExport}
                  isProcessing={isProcessing}
                />
              </div>
            </>
          )}

          <FolderGrid categories={FOLDER_CATEGORIES} />
        </div>
      </div>
    </div>
  );
};

export default FileOrganizer;