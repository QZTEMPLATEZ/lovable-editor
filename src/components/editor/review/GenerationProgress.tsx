import React from 'react';
import { Progress } from '@/components/ui/progress';

interface GenerationProgressProps {
  progress: number;
  isGenerating: boolean;
}

const GenerationProgress = ({ progress, isGenerating }: GenerationProgressProps) => {
  if (!isGenerating) return null;

  return (
    <div className="space-y-4">
      <Progress value={progress} className="h-2" />
      <p className="text-center text-sm text-gray-400">
        Generating your project... {progress}%
      </p>
    </div>
  );
};

export default GenerationProgress;