import React from 'react';
import { Progress } from "@/components/ui/progress";

interface OrganizationProgressProps {
  isProcessing: boolean;
  progress: number;
}

const OrganizationProgress: React.FC<OrganizationProgressProps> = ({ isProcessing, progress }) => {
  if (!isProcessing) return null;

  return (
    <div className="space-y-4">
      <Progress value={progress} className="h-2" />
      <p className="text-sm text-center text-purple-300">
        Organizing files... {Math.round(progress)}%
      </p>
    </div>
  );
};

export default OrganizationProgress;