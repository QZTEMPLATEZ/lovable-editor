import React from 'react';
import { AlertCircle, Clock, FileVideo, StopCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface ProcessingStatusBarProps {
  currentFile: File | null;
  totalFiles: number;
  processedFiles: number;
  onStop: () => void;
}

const ProcessingStatusBar: React.FC<ProcessingStatusBarProps> = ({
  currentFile,
  totalFiles,
  processedFiles,
  onStop
}) => {
  const { toast } = useToast();
  const progress = totalFiles ? (processedFiles / totalFiles) * 100 : 0;
  const remainingFiles = totalFiles - processedFiles;
  const estimatedTimePerFile = 30; // seconds per file
  const remainingTime = remainingFiles * estimatedTimePerFile;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStop = () => {
    onStop();
    toast({
      title: "Processing Stopped",
      description: "Video processing has been cancelled.",
      variant: "destructive",
    });
  };

  return (
    <Alert className="mb-6 bg-purple-500/10 border-purple-500/30">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileVideo className="animate-pulse" />
            <AlertDescription>
              Processing: {currentFile?.name}
            </AlertDescription>
          </div>
          <Button
            variant="destructive"
            size="sm"
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400"
            onClick={handleStop}
          >
            <StopCircle className="w-4 h-4 mr-2" />
            Stop
          </Button>
        </div>

        <Progress value={progress} className="h-2" />

        <div className="flex justify-between text-sm text-purple-300">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Remaining: {formatTime(remainingTime)}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{Math.round(progress)}% Complete</span>
            <span>{processedFiles}/{totalFiles} Files</span>
          </div>
        </div>
      </div>
    </Alert>
  );
};

export default ProcessingStatusBar;