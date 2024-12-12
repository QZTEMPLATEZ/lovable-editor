import React from 'react';
import { FileVideo, Clock, StopCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

interface ProcessingStatusBarProps {
  isProcessing: boolean;
  currentFile: File | null;
  successCount: number;
  errorCount: number;
  totalFiles: number;
  onStopProcessing?: () => void;
}

const ProcessingStatusBar = ({
  isProcessing,
  currentFile,
  successCount,
  errorCount,
  totalFiles,
  onStopProcessing
}: ProcessingStatusBarProps) => {
  const { toast } = useToast();
  const progress = ((successCount + errorCount) / totalFiles) * 100;
  const estimatedTimeRemaining = Math.ceil((totalFiles - (successCount + errorCount)) * 2); // 2 seconds per file

  const handleStopProcessing = () => {
    if (onStopProcessing) {
      onStopProcessing();
      toast({
        title: "Processing Stopped",
        description: "File analysis has been cancelled.",
        variant: "destructive",
      });
    }
  };

  if (!isProcessing) return null;

  return (
    <div className="space-y-4 bg-editor-bg/50 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FileVideo className="w-5 h-5 text-purple-400" />
          <span className="text-lg font-medium text-purple-100">Processing Videos</span>
        </div>
        <Button
          onClick={handleStopProcessing}
          variant="destructive"
          size="sm"
          className="bg-red-500/10 hover:bg-red-500/20 text-red-400"
        >
          <StopCircle className="w-4 h-4 mr-2" />
          Stop Processing
        </Button>
      </div>

      <Progress value={progress} className="h-2" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2 text-purple-300">
          <Clock className="w-4 h-4" />
          <span>Remaining: ~{estimatedTimeRemaining}s</span>
        </div>
        <div className="text-center text-purple-300">
          Progress: {Math.round(progress)}%
        </div>
        <div className="text-right text-purple-300">
          {successCount + errorCount} / {totalFiles} files
        </div>
      </div>

      {currentFile && (
        <Alert className="mt-4 bg-purple-500/10 border-purple-500/30">
          <AlertDescription className="flex items-center gap-2">
            <FileVideo className="animate-pulse" />
            <span>Processing: {currentFile.name}</span>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ProcessingStatusBar;