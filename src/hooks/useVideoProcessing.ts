import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { videoAnalysisService } from '@/services/VideoAnalysisService';
import { FOLDERS } from '@/constants/folderCategories';

export const useVideoProcessing = (videoFiles: File[]) => {
  const [currentFile, setCurrentFile] = useState<string>();
  const [currentCategory, setCurrentCategory] = useState<string>();
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [categorizedFiles, setCategorizedFiles] = useState<Record<string, number>>(
    FOLDERS.reduce((acc, folder) => ({ ...acc, [folder.name]: 0 }), {})
  );
  const [fileCategories, setFileCategories] = useState<Record<string, string>>({});
  const [processingStatus, setProcessingStatus] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    const processFiles = async () => {
      if (videoFiles.length > 0 && !isProcessing) {
        setIsProcessing(true);
        setProgress(0);
        setIsComplete(false);

        // Initialize processing status for all files
        const initialStatus = videoFiles.reduce((acc, file) => ({
          ...acc,
          [file.name]: true
        }), {});
        setProcessingStatus(initialStatus);

        for (let i = 0; i < videoFiles.length; i++) {
          const file = videoFiles[i];
          setCurrentFile(file.name);

          try {
            const result = await videoAnalysisService.analyzeVideo(file);
            const category = result.category || 'Untagged';
            setCurrentCategory(category);
            
            setCategorizedFiles(prev => ({
              ...prev,
              [category]: (prev[category] || 0) + 1
            }));

            setFileCategories(prev => ({
              ...prev,
              [file.name]: category
            }));

            // Update processing status for this file
            setProcessingStatus(prev => ({
              ...prev,
              [file.name]: false
            }));

            setProgress(((i + 1) / videoFiles.length) * 100);
          } catch (error) {
            console.error('Error processing file:', error);
            toast({
              variant: "destructive",
              title: "Processing Error",
              description: `Error processing ${file.name}. File will be marked as Untagged.`,
            });
            
            setFileCategories(prev => ({
              ...prev,
              [file.name]: 'Untagged'
            }));
            setCategorizedFiles(prev => ({
              ...prev,
              'Untagged': (prev['Untagged'] || 0) + 1
            }));

            // Mark as complete even if there was an error
            setProcessingStatus(prev => ({
              ...prev,
              [file.name]: false
            }));
          }
        }

        setIsComplete(true);
        setIsProcessing(false);
        toast({
          title: "Processing Complete",
          description: "All videos have been classified. Review the categories if needed.",
        });
      }
    };

    processFiles();
  }, [videoFiles, toast]);

  return {
    currentFile,
    currentCategory,
    progress,
    isProcessing,
    isComplete,
    categorizedFiles,
    fileCategories,
    processingStatus
  };
};