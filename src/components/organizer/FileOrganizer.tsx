import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, FolderOpen, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { DEFAULT_CATEGORIES, organizeFiles, generateProjectStructure } from '@/utils/organizerUtils';
import { OrganizationResult } from '@/types/organizer';
import OrganizationResults from '../organizer/OrganizationResults';

const FileOrganizer = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [organizationResult, setOrganizationResult] = useState<OrganizationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleOrganize = async () => {
    if (files.length === 0) {
      toast({
        variant: "destructive",
        title: "No files selected",
        description: "Please upload some files to organize.",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const result = await organizeFiles(files, DEFAULT_CATEGORIES);
      clearInterval(progressInterval);
      setProgress(100);
      setOrganizationResult(result);

      toast({
        title: "Organization Complete",
        description: `Successfully organized ${result.stats.categorizedCount} files.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Organization Failed",
        description: "An error occurred while organizing files.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleContinue = () => {
    if (organizationResult) {
      const projectStructure = generateProjectStructure(organizationResult, "WeddingProject", DEFAULT_CATEGORIES);
      console.log('Project structure generated:', projectStructure);
      navigate('/edit');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/music')}
          className="text-purple-400 hover:text-purple-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Music
        </Button>
      </div>

      <div className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none" />
        
        <div className="relative space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <FolderOpen className="w-5 h-5 text-purple-400" />
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
              Organize Your Files
            </h3>
          </div>

          <Alert className="mb-6 bg-purple-500/10 border-purple-500/30">
            <AlertDescription className="text-purple-200">
              Upload your raw footage and let AI organize it into meaningful categories.
            </Alert>

          {!isProcessing && !organizationResult && (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500/50 transition-all duration-300"
            >
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                multiple
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto text-purple-400 mb-4" />
                <p className="text-lg text-purple-200 mb-2">
                  Drag and drop your files here or click to browse
                </p>
                <p className="text-sm text-purple-300/70">
                  Supported formats: MP4, MOV, WAV, MP3
                </p>
              </label>
            </div>
          )}

          {files.length > 0 && !organizationResult && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4">Selected Files ({files.length})</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {files.map((file, index) => (
                  <div key={index} className="bg-purple-500/10 rounded-lg p-4 flex items-center gap-3">
                    <FolderOpen className="w-4 h-4 text-purple-400" />
                    <span className="text-sm truncate">{file.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isProcessing && (
            <div className="space-y-4">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-center text-purple-300">
                Organizing files... {progress}%
              </p>
            </div>
          )}

          {organizationResult && (
            <OrganizationResults results={organizationResult} />
          )}

          <div className="flex justify-end gap-4 mt-6">
            {!isProcessing && !organizationResult && files.length > 0 && (
              <Button
                onClick={handleOrganize}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
              >
                Start Organizing
              </Button>
            )}

            {organizationResult && (
              <Button
                onClick={handleContinue}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
              >
                Continue to Edit
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileOrganizer;