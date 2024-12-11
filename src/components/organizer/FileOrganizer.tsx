import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, ArrowLeft, ArrowRight, Wand2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { FOLDER_CATEGORIES } from '@/constants/folderCategories';
import FolderGrid from './FolderGrid';
import OrganizationResults from './OrganizationResults';
import { OrganizationResult, OrganizationStats } from '@/types';

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

      // Mock organization result
      const result: OrganizationResult = {
        categorizedFiles: new Map([['MakingOf', files]]),
        unorganizedFiles: [],
        stats: {
          totalFiles: files.length,
          categorizedCount: files.length,
          uncategorizedCount: 0
        }
      };

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

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
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
          {/* Upload Section - Moved to top */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500/50 transition-all duration-300 mb-8"
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

          {/* Start Button - Added at top */}
          {files.length > 0 && !organizationResult && (
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <Button
                  onClick={handleOrganize}
                  disabled={isProcessing}
                  className="relative px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Wand2 className="w-5 h-5 mr-2 animate-pulse" />
                  <span className="relative">Start Organizing</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl animate-pulse" />
                </Button>
              </div>
            </div>
          )}

          {/* Selected Files Display */}
          {files.length > 0 && !organizationResult && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4">Selected Files ({files.length})</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {files.map((file, index) => (
                  <div key={index} className="bg-purple-500/10 rounded-lg p-4 flex items-center gap-3">
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

          {/* Folder Categories - Moved to bottom */}
          <Alert className="mb-6 bg-purple-500/10 border-purple-500/30">
            <AlertDescription className="text-purple-200">
              Your files will be organized into the following categories:
            </AlertDescription>
          </Alert>

          <FolderGrid categories={FOLDER_CATEGORIES} />

          <div className="flex justify-end gap-4 mt-6">
            {organizationResult && (
              <Button
                onClick={() => navigate('/edit')}
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