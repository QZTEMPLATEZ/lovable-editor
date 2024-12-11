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
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const FileOrganizer = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [organizationResult, setOrganizationResult] = useState<OrganizationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isClassifierReady, setIsClassifierReady] = useState(false);
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

          {/* Analysis Details Section */}
          {isProcessing && (
            <div className="space-y-6 bg-editor-panel/50 rounded-xl p-6 border border-purple-500/20">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white font-montserrat">Analysis Progress</h2>
                <span className="text-sm text-purple-300">{progress}% Complete</span>
              </div>

              <Progress value={progress} className="h-2 bg-purple-950" />

              {currentFile && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-editor-panel/50 rounded-xl p-4 border border-purple-500/20"
                >
                  <h3 className="text-lg font-semibold text-purple-300 mb-2 font-montserrat">
                    Currently Processing: {currentFile.name}
                  </h3>
                  <video 
                    src={URL.createObjectURL(currentFile)}
                    className="w-full aspect-video rounded-lg object-cover"
                    autoPlay
                    muted
                    loop
                  />
                </motion.div>
              )}

              {unrecognizedFiles.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-yellow-500">
                    <AlertCircle className="w-5 h-5" />
                    <h3 className="text-lg font-semibold font-montserrat">Needs Your Input</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatePresence>
                      {unrecognizedFiles.map((file, index) => (
                        <motion.div
                          key={file.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-editor-panel/30 rounded-lg p-4 border border-yellow-500/20"
                        >
                          <p className="text-sm text-yellow-300 mb-2 font-montserrat">{file.name}</p>
                          <div className="flex gap-2 flex-wrap">
                            {["Ceremony", "Reception", "Preparation", "Extras"].map((category) => (
                              <button
                                key={category}
                                onClick={() => handleCategorySelect(file, category)}
                                className="px-3 py-1 text-sm rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 transition-colors font-montserrat"
                              >
                                {category}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-green-500">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-montserrat">
                  Analysis will continue for other files while you categorize
                </span>
              </div>
            </div>
          )}

          {organizationResult && <OrganizationResults results={organizationResult} />}

          <FolderGrid categories={FOLDER_CATEGORIES} />
        </div>
      </div>
    </div>
  );
};

export default FileOrganizer;
