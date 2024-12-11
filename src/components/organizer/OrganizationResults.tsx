import React from 'react';
import { OrganizationResult } from '../../types/organizer';
import { Progress } from "@/components/ui/progress";
import { Folder } from 'lucide-react';
import { FOLDER_CATEGORIES } from '@/constants/folderCategories';

interface OrganizationResultsProps {
  results: OrganizationResult;
}

const OrganizationResults: React.FC<OrganizationResultsProps> = ({ results }) => {
  const categorizedPercentage = (results.stats.categorizedCount / results.stats.totalFiles) * 100;

  const findCategoryDetails = (categoryName: string) => {
    return FOLDER_CATEGORIES.find(cat => cat.name === categoryName);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Folder className="w-5 h-5 text-purple-400" />
          <span className="text-lg font-medium">Organization Results</span>
        </div>
        <span className="text-sm text-gray-400">
          {results.stats.categorizedCount} / {results.stats.totalFiles} files organized
        </span>
      </div>

      <Progress value={categorizedPercentage} className="h-2 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from(results.categorizedFiles.entries()).map(([category, files]) => {
          const categoryDetails = findCategoryDetails(category);
          return (
            <div 
              key={category}
              className={`p-4 rounded-xl bg-gradient-to-br ${categoryDetails?.color || 'from-gray-500/20 to-gray-400/20'} border border-white/10 backdrop-blur-sm`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  {categoryDetails?.icon || <Folder className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{category}</h4>
                    <span className="text-sm text-gray-300">{files.length} files</span>
                  </div>
                  <div className="space-y-2">
                    {files.slice(0, 3).map((file, index) => (
                      <div key={index} className="text-xs text-gray-400 truncate">
                        {file.name}
                      </div>
                    ))}
                    {files.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{files.length - 3} more files
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {results.unorganizedFiles.length > 0 && (
        <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
          <h4 className="text-red-400 font-medium mb-2">Unorganized Files</h4>
          <div className="space-y-1">
            {results.unorganizedFiles.map((file, index) => (
              <div key={index} className="text-sm text-gray-400">
                {file.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationResults;