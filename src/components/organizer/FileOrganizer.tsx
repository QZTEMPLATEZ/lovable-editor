import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FOLDER_CATEGORIES } from '@/constants/folderCategories';
import { useVideoType } from '../../contexts/VideoTypeContext';
import FolderGrid from './FolderGrid';
import OrganizationResults from './OrganizationResults';
import FileUploadZone from './FileUploadZone';
import OrganizationProgress from './OrganizationProgress';
import NavigationButtons from './NavigationButtons';
import FileAnalysisHandler from './analysis/FileAnalysisHandler';
import { OrganizationResult } from '@/types';
import { initializeImageClassifier, analyzeImage } from '@/utils/imageAnalysis';
import { Play } from 'lucide-react';

const FileOrganizer = () => {
  const { selectedVideoType } = useVideoType();
  const [files, setFiles] = useState<File[]>([]);
  const [organizationResult, setOrganizationResult] = useState<OrganizationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isClassifierReady, setIsClassifierReady] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [unrecognizedFiles, setUnrecognizedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleFileSelect = (newFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    toast({
      title: "Files Selected",
      description: `${newFiles.length} files have been added for organization.`,
    });
  };

  const processFiles = async () => {
    if (!files || files.length === 0) {
      toast({
        variant: "destructive",
        title: "No files selected",
        description: "Please select files to analyze.",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    const categorizedFiles = new Map<string, File[]>();
    const tempUnrecognizedFiles: File[] = [];
    
    // Initialize categories
    FOLDER_CATEGORIES.forEach(category => {
      categorizedFiles.set(category.name, []);
    });

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setCurrentFile(file);
        console.log(`Processing file ${i + 1}/${files.length}: ${file.name}`);

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

        setProgress(((i + 1) / files.length) * 100);
      }

      setUnrecognizedFiles(tempUnrecognizedFiles);

      const result: OrganizationResult = {
        categorizedFiles,
        unorganizedFiles: tempUnrecognizedFiles,
        stats: {
          totalFiles: files.length,
          categorizedCount: files.length - tempUnrecognizedFiles.length,
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
        
        <Alert className="mb-6 bg-purple-500/10 border-purple-500/30">
          <AlertDescription className="text-purple-200">
            For your {selectedVideoType?.name || 'video'} ({selectedVideoType?.label || 'selected duration'}), 
            we recommend selecting {Math.ceil((selectedVideoType?.max || 1) * 10)} to {Math.ceil((selectedVideoType?.max || 1) * 15)} clips 
            to ensure comprehensive coverage.
          </AlertDescription>
        </Alert>

        <div className="relative space-y-6">
          <FileUploadZone 
            onDrop={(e) => {
              e.preventDefault();
              const droppedFiles = Array.from(e.dataTransfer.files);
              handleFileSelect(droppedFiles);
            }}
            onFileSelect={(e) => {
              if (e.target.files) {
                const selectedFiles = Array.from(e.target.files);
                handleFileSelect(selectedFiles);
              }
            }}
          />

          {files.length > 0 && !isProcessing && (
            <div className="flex justify-center">
              <Button
                onClick={processFiles}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Organization Process
              </Button>
            </div>
          )}

          <OrganizationProgress 
            isProcessing={isProcessing}
            progress={progress}
          />

          <FileAnalysisHandler 
            files={files}
            isProcessing={isProcessing}
            progress={progress}
            currentFile={currentFile}
            unrecognizedFiles={unrecognizedFiles}
            onCategorySelect={handleCategorySelect}
          />

          {organizationResult && <OrganizationResults results={organizationResult} />}

          <FolderGrid categories={FOLDER_CATEGORIES} />
        </div>
      </div>
    </div>
  );
};

export default FileOrganizer;
