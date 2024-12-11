import React, { useState } from 'react';
import { useVideoType } from '../../contexts/VideoTypeContext';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FOLDER_CATEGORIES } from '@/constants/folderCategories';
import { OrganizationResult } from '@/types';
import { initializeImageClassifier, analyzeImage } from '@/utils/imageAnalysis';
import { APP_CONFIG, ERROR_MESSAGES } from '@/config/appConfig';
import FolderGrid from './FolderGrid';
import OrganizationResults from './OrganizationResults';
import FileUploadZone from './FileUploadZone';
import NavigationButtons from './NavigationButtons';
import FileAnalysisHandler from './analysis/FileAnalysisHandler';
import FileProcessing from './FileProcessing';
import FileAnalysisStatus from './FileAnalysisStatus';

const FileOrganizer = () => {
  const { selectedVideoType } = useVideoType();
  const [files, setFiles] = useState<File[]>([]);
  const [organizationResult, setOrganizationResult] = useState<OrganizationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [unrecognizedFiles, setUnrecognizedFiles] = useState<File[]>([]);

  const handleFileSelect = (newFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const processFiles = async () => {
    setIsProcessing(true);
    setProgress(0);
    const categorizedFiles = new Map<string, File[]>();
    const tempUnrecognizedFiles: File[] = [];
    
    FOLDER_CATEGORIES.forEach(category => {
      categorizedFiles.set(category.name, []);
    });

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setCurrentFile(file);
        
        if (APP_CONFIG.analysis.supportedFileTypes.includes(file.type)) {
          const analysis = await analyzeImage(file);
          
          if (analysis.category !== APP_CONFIG.organization.uncategorizedLabel && 
              analysis.confidence > APP_CONFIG.analysis.confidenceThreshold) {
            const categoryFiles = categorizedFiles.get(analysis.category) || [];
            categoryFiles.push(file);
            categorizedFiles.set(analysis.category, categoryFiles);
          } else {
            tempUnrecognizedFiles.push(file);
          }
        } else {
          tempUnrecognizedFiles.push(file);
        }

        setProgress(((i + 1) / files.length) * 100);
      }

      setUnrecognizedFiles(tempUnrecognizedFiles);
      setOrganizationResult({
        categorizedFiles,
        unorganizedFiles: tempUnrecognizedFiles,
        stats: {
          totalFiles: files.length,
          categorizedCount: files.length - tempUnrecognizedFiles.length,
          uncategorizedCount: tempUnrecognizedFiles.length
        }
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

          <FileProcessing 
            files={files}
            isProcessing={isProcessing}
            onProcessStart={processFiles}
          />

          <FileAnalysisStatus 
            isProcessing={isProcessing}
            progress={progress}
            currentFile={currentFile}
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