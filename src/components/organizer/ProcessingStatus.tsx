import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ProcessingStatusProps {
  currentStep: string;
  progress: number;
  currentFile?: string;
  currentCategory?: string;
  isComplete?: boolean;
}

const ProcessingStatus = ({
  currentStep,
  progress,
  currentFile,
  currentCategory,
  isComplete
}: ProcessingStatusProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">
          {isComplete ? "Processamento Completo!" : "Processando vídeos..."}
        </h3>
        <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
      </div>
      
      <Progress value={progress} className="w-full" />
      
      {currentFile && !isComplete && (
        <div className="space-y-2">
          <p className="text-sm text-gray-400">
            Analisando: {currentFile}
          </p>
          {currentCategory && (
            <p className="text-sm text-gray-400">
              Categoria detectada: {currentCategory}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProcessingStatus;