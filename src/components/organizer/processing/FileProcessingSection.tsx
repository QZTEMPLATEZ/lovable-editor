import React from 'react';
import FileUploadHandler from '../upload/FileUploadHandler';
import ProcessStatus from '../ProcessStatus';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useVideoType } from '../../../contexts/VideoTypeContext';

interface FileProcessingSectionProps {
  isProcessing: boolean;
  onFilesSelected: (files: File[]) => void;
  totalFiles: number;
  processedFiles: number;
  successCount: number;
  errorCount: number;
  currentFile: string | undefined;
}

const FileProcessingSection = ({
  isProcessing,
  onFilesSelected,
  totalFiles,
  processedFiles,
  successCount,
  errorCount,
  currentFile
}: FileProcessingSectionProps) => {
  const { selectedVideoType } = useVideoType();

  return (
    <>
      <Alert className="mb-6 bg-purple-500/10 border-purple-500/30">
        <AlertDescription className="text-purple-200">
          For your {selectedVideoType?.name || 'video'} ({selectedVideoType?.label || 'selected duration'}), 
          we recommend selecting {Math.ceil((selectedVideoType?.max || 1) * 10)} to {Math.ceil((selectedVideoType?.max || 1) * 15)} clips 
          to ensure comprehensive coverage.
        </AlertDescription>
      </Alert>

      <FileUploadHandler 
        onFilesSelected={onFilesSelected}
        isProcessing={isProcessing}
      />

      {isProcessing && (
        <ProcessStatus
          totalFiles={totalFiles}
          processedFiles={processedFiles}
          successCount={successCount}
          errorCount={errorCount}
          currentFile={currentFile}
        />
      )}
    </>
  );
};

export default FileProcessingSection;