import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { FOLDER_CATEGORIES } from '@/constants/folderCategories';
import FolderGrid from './FolderGrid';
import OrganizationResults from './OrganizationResults';
import FileUploadZone from './FileUploadZone';
import OrganizationProgress from './OrganizationProgress';
import NavigationButtons from './NavigationButtons';
import { OrganizationResult } from '@/types';
import { initializeImageClassifier, analyzeImage } from '@/utils/imageAnalysis';
import VideoAnalysisModal from './VideoAnalysisModal';

const FileOrganizer = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [organizationResult, setOrganizationResult] = useState<OrganizationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isClassifierReady, setIsClassifierReady] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [unrecognizedFiles, setUnrecognizedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const processFiles = async (newFiles: File[]) => {
    if (!isClassifierReady) {
      toast({
        variant: "destructive",
        title: "System Not Ready",
        description: "The image classifier is not initialized. Please wait or refresh the page.",
      });
      return;
    }

    setFiles(newFiles);
    setIsProcessing(true);
    setProgress(0);
    setShowAnalysisModal(true);

    const categorizedFiles = new Map<string, File[]>();
    const tempUnrecognizedFiles: File[] = [];
    
    // Initialize categories
    FOLDER_CATEGORIES.forEach(category => {
      categorizedFiles.set(category.name, []);
    });

    try {
      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i];
        setCurrentFile(file);
        console.log(`Processing file ${i + 1}/${newFiles.length}: ${file.name}`);

        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
          try {
            const analysis = await analyzeImage(file);
            console.log(`Analysis result for ${file.name}:`, analysis);

            if (analysis.category !== 'Extras' && analysis.confidence > 0.3) {
              const categoryFiles = categorizedFiles.get(analysis.category) || [];
              categoryFiles.push(file);
              categorizedFiles.set(analysis.category, categoryFiles);
              console.log(`Categorized ${file.name} as ${analysis.category} with confidence ${analysis.confidence}`);
            } else {
              console.log(`File ${file.name} not confidently categorized (confidence: ${analysis.confidence})`);
              tempUnrecognizedFiles.push(file);
            }
          } catch (error) {
            console.error(`Error analyzing file ${file.name}:`, error);
            tempUnrecognizedFiles.push(file);
          }
        } else {
          console.log(`Skipping non-image/video file: ${file.name}`);
          tempUnrecognizedFiles.push(file);
        }

        setProgress(((i + 1) / newFiles.length) * 100);
      }

      setUnrecognizedFiles(tempUnrecognizedFiles);

      const result: OrganizationResult = {
        categorizedFiles,
        unorganizedFiles: tempUnrecognizedFiles,
        stats: {
          totalFiles: newFiles.length,
          categorizedCount: newFiles.length - tempUnrecognizedFiles.length,
          uncategorizedCount: tempUnrecognizedFiles.length
        }
      };

      setOrganizationResult(result);
      console.log('Organization complete:', result.stats);
      
      toast({
        title: "Organization Complete",
        description: `Successfully organized ${result.stats.categorizedCount} files.`,
      });
    } catch (error) {
      console.error('Error during organization:', error);
      toast({
        variant: "destructive",
        title: "Organization Failed",
        description: "An error occurred while organizing files.",
      });
    } finally {
      setIsProcessing(false);
      setProgress(100);
    }
  };

  const handleCategorySelect = (file: File, category: string) => {
    setUnrecognizedFiles(prev => prev.filter(f => f !== file));
    
    if (organizationResult) {
      const newCategorizedFiles = new Map(organizationResult.categorizedFiles);
      const categoryFiles = newCategorizedFiles.get(category) || [];
      categoryFiles.push(file);
      newCategorizedFiles.set(category, categoryFiles);
      
      setOrganizationResult({
        ...organizationResult,
        categorizedFiles: newCategorizedFiles,
        unorganizedFiles: organizationResult.unorganizedFiles.filter(f => f !== file),
        stats: {
          ...organizationResult.stats,
          categorizedCount: organizationResult.stats.categorizedCount + 1,
          uncategorizedCount: organizationResult.stats.uncategorizedCount - 1
        }
      });
    }

    toast({
      title: "File Categorized",
      description: `${file.name} has been moved to ${category}`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      <NavigationButtons showContinueButton={!!organizationResult} />

      <div className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none" />
        
        <div className="relative space-y-6">
          <FileUploadZone 
            onDrop={(e) => {
              e.preventDefault();
              const droppedFiles = Array.from(e.dataTransfer.files);
              processFiles(droppedFiles);
            }}
            onFileSelect={(e) => {
              if (e.target.files) {
                const selectedFiles = Array.from(e.target.files);
                processFiles(selectedFiles);
              }
            }}
          />

          <OrganizationProgress 
            isProcessing={isProcessing}
            progress={progress}
          />

          {organizationResult && <OrganizationResults results={organizationResult} />}

          <FolderGrid categories={FOLDER_CATEGORIES} />

          <VideoAnalysisModal 
            isOpen={showAnalysisModal}
            onClose={() => setShowAnalysisModal(false)}
            currentFile={currentFile}
            progress={progress}
            unrecognizedFiles={unrecognizedFiles}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </div>
    </div>
  );
};

export default FileOrganizer;