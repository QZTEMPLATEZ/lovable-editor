import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { logger } from '../utils/logger';
import { fileAnalysisService, AnalysisResult } from '../services/FileAnalysisService';

export const useFileProcessing = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [successCount, setSuccessCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

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

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    processFiles(newFiles);
  };

  return {
    files,
    analysisResults,
    isProcessing,
    currentFile,
    successCount,
    errorCount,
    handleFilesSelected
  };
};