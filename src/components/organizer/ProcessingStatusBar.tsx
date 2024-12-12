import React from 'react';
import { FileVideo, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';

interface ProcessingStatusBarProps {
  isProcessing: boolean;
  currentFile: File | null;
  successCount: number;
  errorCount: number;
  totalFiles: number;
}

const ProcessingStatusBar = ({
  isProcessing,
  currentFile,
  successCount,
  errorCount,
  totalFiles
}: ProcessingStatusBarProps) => {
  if (!isProcessing) return null;

  return (
    <Alert className="mb-6 bg-purple-500/10 border-purple-500/30">
      <AlertDescription className="flex items-center gap-2">
        <FileVideo className="animate-pulse" />
        <span>Processing: {currentFile?.name}</span>
        <Progress value={(successCount + errorCount) / totalFiles * 100} className="ml-4" />
      </AlertDescription>
    </Alert>
  );
};

export default ProcessingStatusBar;