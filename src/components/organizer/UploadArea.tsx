import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import DropZone from './DropZone';
import { ScrollArea } from "@/components/ui/scroll-area";
import VideoThumbnailGrid from './VideoThumbnailGrid';

interface UploadAreaProps {
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  videoFiles: File[];
  fileCategories: Record<string, string>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadArea = ({
  onDrop,
  onDragOver,
  videoFiles,
  fileCategories,
  fileInputRef,
  handleFileSelect
}: UploadAreaProps) => {
  return (
    <div className="space-y-6">
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
          handleFileSelect={handleFileSelect}
        />
      )}
    </div>
  );
};

export default UploadArea;