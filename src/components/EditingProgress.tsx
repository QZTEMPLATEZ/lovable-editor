
import React from 'react';
import { Progress } from "@/components/ui/progress";
import ExportOptions from './editor/progress/ExportOptions';
import { OrganizationResult } from '@/types/organizer';

interface EditingProgressProps {
  progress: number;
  isComplete: boolean;
  videoFiles: File[];
  onStopProcessing: () => void;
}

const EditingProgress = ({ progress, isComplete, videoFiles, onStopProcessing }: EditingProgressProps) => {
  // Mock organization result for export options
  const mockOrganizationResult: OrganizationResult = {
    categorizedFiles: new Map(videoFiles.map(file => ['uncategorized', [file]])),
    unorganizedFiles: [],
    stats: {
      totalFiles: videoFiles.length,
      categorizedCount: videoFiles.length,
      uncategorizedCount: 0
    }
  };

  const handleExport = (format: string) => {
    console.log(`Exporting to ${format}`);
    // Implement export logic here
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6">
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">
          {isComplete ? "Processing Complete!" : "Processing Videos..."}
        </h3>
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-gray-400 mt-2">
          {progress.toFixed(0)}% Complete
        </p>
      </div>

      <ExportOptions 
        organizationResult={mockOrganizationResult}
        onExport={handleExport}
      />
    </div>
  );
};

export default EditingProgress;
