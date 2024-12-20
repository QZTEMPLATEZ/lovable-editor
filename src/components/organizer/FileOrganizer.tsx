import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFileProcessing } from '../../hooks/useFileProcessing';
import FileUploadZone from './FileUploadZone';
import FileProcessing from './FileProcessing';
import FileAnalysisStatus from './FileAnalysisStatus';
import ClassificationGrid from './ClassificationGrid';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const FileOrganizer = () => {
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

  const [previewFile, setPreviewFile] = useState<File | null>(null);

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
  };

  const handleReclassify = (videoId: string, newCategory: string) => {
    // In a real implementation, this would update the backend/database
    console.log('Reclassifying video:', videoId, 'to category:', newCategory);
    
    toast({
      title: "Video Reclassified",
      description: "The AI will learn from this correction.",
    });
  };

  const handlePreviewVideo = (file: File) => {
    setPreviewFile(file);
  };

  const handleContinue = () => {
    if (analysisResults.length === 0) {
      toast({
        variant: "destructive",
        title: "No files processed",
        description: "Please upload and process some files before continuing."
      });
      return;
    }
    navigate('/review');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 space-y-8"
    >
      <div className="space-y-6">
        <FileUploadZone
          onDrop={handleDrop}
          onFileSelect={handleFileSelect}
        />

        <FileProcessing
          files={files}
          isProcessing={isProcessing}
          onProcessStart={handleFilesSelected}
        />

        <FileAnalysisStatus
          currentFile={currentFile}
          progress={(successCount + errorCount) / (files.length || 1) * 100}
          isProcessing={isProcessing}
        />

        {analysisResults.length > 0 && (
          <>
            <ClassificationGrid
              videos={analysisResults.map(result => ({
                file: result.file,
                category: result.category,
                confidence: result.confidence
              }))}
              onReclassify={handleReclassify}
              onPreviewVideo={handlePreviewVideo}
            />
            
            <div className="flex justify-end mt-6">
              <Button
                onClick={handleContinue}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
              >
                Continue to Review
              </Button>
            </div>
          </>
        )}

        {previewFile && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="relative w-full max-w-4xl">
              <video
                src={URL.createObjectURL(previewFile)}
                className="w-full rounded-lg"
                controls
                autoPlay
              />
              <Button
                className="absolute top-4 right-4"
                variant="outline"
                onClick={() => setPreviewFile(null)}
              >
                Close Preview
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FileOrganizer;