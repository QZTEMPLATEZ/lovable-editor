import React, { useEffect } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import DropZone from './DropZone';
import { ScrollArea } from "@/components/ui/scroll-area";
import VideoThumbnailGrid from './VideoThumbnailGrid';

interface UploadAreaProps {
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  videoFiles: File[];
  fileCategories: Record<string, string>;
  processingStatus: Record<string, boolean>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadArea = ({
  onDrop,
  onDragOver,
  videoFiles,
  fileCategories,
  processingStatus,
  fileInputRef,
  handleFileSelect
}: UploadAreaProps) => {
  return (
    <div className="space-y-6">
      <DropZone
        onDrop={onDrop}
        onDragOver={onDragOver}
        onClick={() => fileInputRef.current?.click()}
        fileInputRef={fileInputRef}
        handleFileSelect={handleFileSelect}
      />

      {videoFiles.length > 0 && (
        <div className="space-y-4">
          <Alert className="bg-purple-500/10 border-purple-500/30">
            <AlertDescription className="text-purple-200">
              {videoFiles.length} video{videoFiles.length !== 1 ? 's' : ''} selected. 
              Processing will start automatically.
            </AlertDescription>
          </Alert>
          
          <VideoThumbnailGrid
            videos={videoFiles}
            categories={fileCategories}
            processingStatus={processingStatus}
          />
        </div>
      )}
    </div>
  );
};

export default UploadArea;