import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FileAnalysisStatusProps {
  currentFile: File | null;
  progress: number;
  isProcessing: boolean;
}

const FileAnalysisStatus = ({ currentFile, progress, isProcessing }: FileAnalysisStatusProps) => {
  if (!isProcessing) return null;

  return (
    <div className="space-y-4">
      <Progress value={progress} className="w-full" />
      <Alert className="bg-purple-500/10 border-purple-500/30">
        <AlertDescription className="text-purple-200">
          {currentFile ? `Processing: ${currentFile.name}` : 'Initializing...'}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default FileAnalysisStatus;