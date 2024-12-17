import React, { useRef, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { FolderCategory } from '@/types';
import { ScrollArea } from './ui/scroll-area';
import { Alert, AlertDescription } from './ui/alert';
import ProcessingStatus from './organizer/ProcessingStatus';
import DropZone from './organizer/DropZone';
import FolderGrid from './organizer/FolderGrid';
import VideoThumbnailGrid from './organizer/VideoThumbnailGrid';
import { FOLDERS } from '@/constants/folderCategories';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { videoAnalysisService } from '@/services/VideoAnalysisService';

interface RawFilesSectionProps {
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  videoFiles: File[];
  onContinue?: () => void;
}

const RawFilesSection = ({ onDrop, onDragOver, videoFiles }: RawFilesSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentFile, setCurrentFile] = useState<string>();
  const [currentCategory, setCurrentCategory] = useState<string>();
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [categorizedFiles, setCategorizedFiles] = useState<Record<string, number>>(
    FOLDERS.reduce((acc, folder) => ({ ...acc, [folder.name]: 0 }), {})
  );
  const { toast } = useToast();
  const [fileCategories, setFileCategories] = useState<Record<string, string>>({});

  useEffect(() => {
    const processFiles = async () => {
      if (videoFiles.length > 0 && !isProcessing) {
        setIsProcessing(true);
        setProgress(0);
        setIsComplete(false);

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

  return (
    <div className="space-y-6">
      {/* Grid de Pastas sempre visível */}
      <FolderGrid 
        categories={FOLDERS}
        categorizedFiles={categorizedFiles}
      />

      <div className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 rounded-xl p-8 border border-purple-500/30">
        {isProcessing ? (
          <ProcessingStatus
            currentStep="organizing"
            progress={progress}
            currentFile={currentFile}
            currentCategory={currentCategory}
            isComplete={isComplete}
          />
        ) : (
          <>
            {videoFiles.length > 0 ? (
              <div className="space-y-6">
                <Alert>
                  <AlertDescription>
                    Review the classification of videos below. Drag and drop to reclassify if needed.
                  </AlertDescription>
                </Alert>
                
                <ScrollArea className="h-[600px] rounded-lg">
                  <VideoThumbnailGrid
                    videos={videoFiles}
                    categories={fileCategories}
                  />
                </ScrollArea>
              </div>
            ) : (
              <DropZone
                onDrop={onDrop}
                onDragOver={onDragOver}
                onClick={() => fileInputRef.current?.click()}
                fileInputRef={fileInputRef}
                handleFileSelect={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const dragEvent = new DragEvent('drop');
                    Object.defineProperty(dragEvent, 'dataTransfer', {
                      value: {
                        files: e.target.files
                      }
                    });
                    onDrop(dragEvent as unknown as React.DragEvent);
                  }
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RawFilesSection;