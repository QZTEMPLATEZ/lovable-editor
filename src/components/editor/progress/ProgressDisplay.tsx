import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ProgressDisplayProps {
  progress: number;
  remainingTime: number;
}

const ProgressDisplay = ({ progress, remainingTime }: ProgressDisplayProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">Processing videos...</span>
        <span className="text-sm text-gray-400">
          {remainingTime > 0 ? `${remainingTime}s remaining` : 'Almost done...'}
        </span>
      </div>
      <Progress value={progress} className="w-full" />
      <p className="text-center text-sm text-gray-400">
        {progress.toFixed(0)}% complete
      </p>
    </div>
  );
};

export default ProgressDisplay;