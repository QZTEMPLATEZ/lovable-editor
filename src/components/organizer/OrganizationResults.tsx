import React from 'react';
import { OrganizationResult } from '../../types/organizer';
import { Progress } from "@/components/ui/progress";
import { Folder } from 'lucide-react';
import { FOLDER_CATEGORIES } from '@/constants/folderCategories';
import { Separator } from "@/components/ui/separator";

interface OrganizationResultsProps {
  results: OrganizationResult;
}

const OrganizationResults: React.FC<OrganizationResultsProps> = ({ results }) => {
  if (!results || !results.stats) {
    return null;
  }

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
                    {files.map((file, index) => (
                      <React.Fragment key={index}>
                        <div className="text-sm text-gray-300 p-2 rounded-lg bg-black/20 hover:bg-black/30 transition-colors">
                          {file.name}
                        </div>
                        {index < files.length - 1 && (
                          <Separator className="bg-white/10" />
                        )}
                      </React.Fragment>
                    ))}
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
          <div className="space-y-2">
            {results.unorganizedFiles.map((file, index) => (
              <React.Fragment key={index}>
                <div className="text-sm text-gray-300 p-2 rounded-lg bg-black/20 hover:bg-black/30 transition-colors">
                  {file.name}
                </div>
                {index < results.unorganizedFiles.length - 1 && (
                  <Separator className="bg-white/10" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationResults;