import React from 'react';
import { OrganizationResult } from '../../types/organizer';
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FOLDER_CATEGORIES } from '@/constants/folderCategories';
import { AlertCircle } from 'lucide-react';

interface OrganizationResultsProps {
  results: OrganizationResult;
}

const OrganizationResults: React.FC<OrganizationResultsProps> = ({ results }) => {
  if (!results || !results.stats) {
    return null;
  }

  const categorizedPercentage = (results.stats.categorizedCount / results.stats.totalFiles) * 100;

  // Only show categories that have files
  const categoriesWithFiles = Array.from(results.categorizedFiles.entries())
    .filter(([_, files]) => files.length > 0);

  return (
    <div className="space-y-6 bg-black/20 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Categorized Videos</h3>
        <span className="text-sm text-purple-300">
          {results.stats.categorizedCount} / {results.stats.totalFiles} videos
        </span>
      </div>

      <Progress value={categorizedPercentage} className="h-2 mb-6" />

      <ScrollArea className="h-[60vh] pr-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {categoriesWithFiles.map(([category, files]) => {
            const categoryDetails = FOLDER_CATEGORIES.find(cat => cat.name === category);
            
            return (
              <div 
                key={category}
                className={`p-4 rounded-xl border transition-all duration-300 ${categoryDetails?.color || 'from-gray-500/20 to-gray-400/20'} border-white/10`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/10">
                    {categoryDetails?.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">
                        {category}
                      </h4>
                      <span className="text-sm text-gray-400">
                        {files.length} files
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <React.Fragment key={file.name}>
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
      </ScrollArea>

      {results.unorganizedFiles.length > 0 && (
        <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
          <h4 className="text-red-400 font-medium mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Videos Needing Review
          </h4>
          <div className="space-y-2">
            {results.unorganizedFiles.map((file, index) => (
              <React.Fragment key={file.name}>
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