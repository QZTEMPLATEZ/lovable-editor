import React, { useRef } from 'react';
import { useVideoProcessing } from '@/hooks/useVideoProcessing';
import { ScrollArea } from './ui/scroll-area';
import ProcessingStatus from './organizer/ProcessingStatus';
import UploadArea from './organizer/UploadArea';
import FolderGrid from './organizer/FolderGrid';
import { FOLDERS } from '@/constants/folderCategories';

interface RawFilesSectionProps {
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  videoFiles: File[];
  onContinue?: () => void;
}

const RawFilesSection = ({ onDrop, onDragOver, videoFiles }: RawFilesSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    currentFile,
    currentCategory,
    progress,
    isProcessing,
    isComplete,
    categorizedFiles,
    fileCategories,
    processingStatus
  } = useVideoProcessing(videoFiles);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const dragEvent = new DragEvent('drop');
      Object.defineProperty(dragEvent, 'dataTransfer', {
        value: {
          files: e.target.files
        }
      });
      onDrop(dragEvent as unknown as React.DragEvent);
    }
  };

  return (
    <div className="space-y-6">
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
          <UploadArea
            onDrop={onDrop}
            onDragOver={onDragOver}
            videoFiles={videoFiles}
            fileCategories={fileCategories}
            processingStatus={processingStatus}
            fileInputRef={fileInputRef}
            handleFileSelect={handleFileSelect}
          />
        )}
      </div>
    </div>
  );
};

export default RawFilesSection;