import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFileProcessing } from '../../hooks/useFileProcessing';
import FileUploadZone from './FileUploadZone';
import FileProcessing from './FileProcessing';
import FileAnalysisStatus from './FileAnalysisStatus';
import FolderGrid from './FolderGrid';
import { Button } from "@/components/ui/button";
import { FOLDER_CATEGORIES } from '@/constants/folderCategories';
import { useToast } from "@/hooks/use-toast";
import ProcessingStatus from './processing/ProcessingStatus';
import ProcessingStatusDisplay from './status/ProcessingStatusDisplay';
import { Alert, AlertDescription } from "@/components/ui/alert";

const VideoOrganizer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  const [remainingTimeMinutes, setRemainingTimeMinutes] = useState(5);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (isProcessing) return;

    const droppedFiles = Array.from(e.dataTransfer.files);
    const videoFiles = droppedFiles.filter(file => file.type.startsWith('video/'));
    
    if (videoFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "No video files",
        description: "Please upload video files only."
      });
      return;
    }

    handleFilesSelected(videoFiles);
    setRemainingTimeMinutes(Math.ceil(videoFiles.length * 0.5));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isProcessing || !e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const videoFiles = selectedFiles.filter(file => file.type.startsWith('video/'));

    if (videoFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "No video files",
        description: "Please upload video files only."
      });
      return;
    }

    handleFilesSelected(videoFiles);
    setRemainingTimeMinutes(Math.ceil(videoFiles.length * 0.5));
  };

  const totalProgress = files.length ? ((successCount + errorCount) / files.length) * 100 : 0;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 space-y-8"
    >
      <div className="space-y-6">
        <Alert className="bg-purple-500/10 border-purple-500/30">
          <AlertDescription className="text-purple-200">
            Your files will be organized into the following categories using AI image recognition.
            Upload your files when ready.
          </AlertDescription>
        </Alert>

        <FolderGrid categories={FOLDER_CATEGORIES} />

        <div className="mt-8">
          <FileUploadZone
            onDrop={handleDrop}
            onFileSelect={handleFileSelect}
          />
        </div>

        <ProcessingStatus
          isProcessing={isProcessing}
          currentFile={currentFile}
          totalProgress={totalProgress}
          remainingTimeMinutes={remainingTimeMinutes}
          onStopProcessing={stopProcessing}
        />

        <FileProcessing
          files={files}
          isProcessing={isProcessing}
          onProcessStart={handleFilesSelected}
        />

        <FileAnalysisStatus
          currentFile={currentFile}
          progress={totalProgress}
          isProcessing={isProcessing}
        />

        <ProcessingStatusDisplay
          successCount={successCount}
          errorCount={errorCount}
          isProcessing={isProcessing}
        />
      </div>
    </motion.div>
  );
};

export default VideoOrganizer;