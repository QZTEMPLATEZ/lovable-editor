import React from 'react';
import { FileVideo, StopCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ProcessingStatusProps {
  isProcessing: boolean;
  currentFile?: File | null;
  totalProgress: number;
  remainingTimeMinutes: number;
  onStopProcessing: () => void;
}

const ProcessingStatus = ({
  isProcessing,
  currentFile,
  totalProgress,
  remainingTimeMinutes,
  onStopProcessing
}: ProcessingStatusProps) => {
  if (!isProcessing) return null;

  return (
    <div className="space-y-4 mb-8">
      <Alert className="bg-purple-500/10 border-purple-500/30">
        <AlertDescription className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileVideo className="animate-pulse" />
            <span>Classificando seus vídeos...</span>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={onStopProcessing}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400"
          >
            <StopCircle className="w-4 h-4 mr-2" />
            Parar Processo
          </Button>
        </AlertDescription>
      </Alert>
      
      <div className="space-y-2">
        <Progress value={totalProgress} className="h-2" />
        <div className="flex justify-between text-sm text-gray-400">
          <span>{Math.round(totalProgress)}% Concluído</span>
          <span>~{remainingTimeMinutes} minutos restantes</span>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStatus;