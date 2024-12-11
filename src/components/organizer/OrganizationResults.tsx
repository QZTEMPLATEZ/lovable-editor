import React from 'react';
import { OrganizationResult } from '../../types/organizer';
import { Progress } from "@/components/ui/progress";
import { Folder } from 'lucide-react';

interface OrganizationResultsProps {
  results: OrganizationResult;
}

const OrganizationResults: React.FC<OrganizationResultsProps> = ({ results }) => {
  const categorizedPercentage = (results.stats.categorizedCount / results.stats.totalFiles) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Folder className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-medium">Organization Results</span>
        </div>
        <span className="text-sm text-gray-400">
          {results.stats.categorizedCount} / {results.stats.totalFiles} files organized
        </span>
      </div>

      <Progress value={categorizedPercentage} className="h-2" />

      <div className="grid grid-cols-2 gap-4">
        {Array.from(results.categorizedFiles.entries()).map(([category, files]) => (
          <div key={category} className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <h3 className="font-medium mb-2">{category}</h3>
            <p className="text-sm text-gray-400">{files.length} files</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationResults;