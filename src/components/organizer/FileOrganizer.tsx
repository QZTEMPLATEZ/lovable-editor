import React, { useState, useEffect } from 'react';
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
import { initializeImageClassifier, analyzeImage } from '@/utils/imageAnalysis';

const FileOrganizer = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [organizationResult, setOrganizationResult] = useState<OrganizationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    initializeImageClassifier().then(success => {
      if (success) {
        console.log('Image recognition system initialized');
      }
    });
  }, []);

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

    const categorizedFiles = new Map<string, File[]>();
    const unorganizedFiles: File[] = [];
    let processedCount = 0;

    // Initialize categories
    FOLDER_CATEGORIES.forEach(category => {
      categorizedFiles.set(category.name, []);
    });

    try {
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          const analysis = await analyzeImage(file);
          const categoryFiles = categorizedFiles.get(analysis.category) || [];
          categoryFiles.push(file);
          categorizedFiles.set(analysis.category, categoryFiles);
          
          if (analysis.confidence < 0.6) {
            console.log(`Low confidence (${analysis.confidence}) for file: ${file.name}`);
          }
        } else {
          // Handle non-image files using existing logic
          unorganizedFiles.push(file);
        }

        processedCount++;
        setProgress((processedCount / files.length) * 100);
      }

      const result: OrganizationResult = {
        categorizedFiles,
        unorganizedFiles,
        stats: {
          totalFiles: files.length,
          categorizedCount: files.length - unorganizedFiles.length,
          uncategorizedCount: unorganizedFiles.length
        }
      };

      setOrganizationResult(result);
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
              accept="image/*,audio/*,video/*"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto text-purple-400 mb-4" />
              <p className="text-lg text-purple-200 mb-2">
                Drag and drop your files here or click to browse
              </p>
              <p className="text-sm text-purple-300/70">
                Supported formats: Images (JPG, PNG), Audio (WAV, MP3), Video (MP4, MOV)
              </p>
            </label>
          </div>

          {files.length > 0 && !organizationResult && (
            <div className="flex justify-center mb-8">
              <Button
                onClick={handleOrganize}
                disabled={isProcessing}
                className="relative px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg rounded-xl"
              >
                <Wand2 className="w-5 h-5 mr-2" />
                Start Organizing
              </Button>
            </div>
          )}

          {isProcessing && (
            <div className="space-y-4">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-center text-purple-300">
                Organizing files... {Math.round(progress)}%
              </p>
            </div>
          )}

          {organizationResult && <OrganizationResults results={organizationResult} />}

          <Alert className="mb-6 bg-purple-500/10 border-purple-500/30">
            <AlertDescription className="text-purple-200">
              Your files will be organized into the following categories using AI image recognition:
            </AlertDescription>
          </Alert>

          <FolderGrid categories={FOLDER_CATEGORIES} />

          {organizationResult && (
            <div className="flex justify-end gap-4 mt-6">
              <Button
                onClick={() => navigate('/edit')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
              >
                Continue to Edit
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileOrganizer;
