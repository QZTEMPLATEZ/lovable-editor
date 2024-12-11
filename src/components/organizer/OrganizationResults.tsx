import React from 'react';
import { OrganizationResult } from '../../types/organizer';
import { Progress } from "@/components/ui/progress";
import { Folder, AlertCircle } from 'lucide-react';
import { FOLDER_CATEGORIES } from '@/constants/folderCategories';
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OrganizationResultsProps {
  results: OrganizationResult;
}

const OrganizationResults: React.FC<OrganizationResultsProps> = ({ results }) => {
  if (!results || !results.stats) {
    return null;
  }

  const categorizedPercentage = (results.stats.categorizedCount / results.stats.totalFiles) * 100;

  // Create a map of all categories with their files (including empty categories)
  const allCategories = new Map(FOLDER_CATEGORIES.map(cat => [cat.name, []]));
  results.categorizedFiles.forEach((files, category) => {
    allCategories.set(category, files);
  });

  return (
    <div className="space-y-6 bg-black/20 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Folder className="w-5 h-5 text-purple-400" />
          <span className="text-lg font-medium">Organization Results</span>
        </div>
        <div className="text-sm text-gray-400 space-x-2">
          <span className="px-2 py-1 rounded-full bg-purple-500/20">
            {results.stats.categorizedCount} / {results.stats.totalFiles} files organized
          </span>
        </div>
      </div>

      <Progress value={categorizedPercentage} className="h-2 mb-6" />

      <ScrollArea className="h-[60vh] pr-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array.from(allCategories.entries()).map(([category, files]) => {
            const categoryDetails = FOLDER_CATEGORIES.find(cat => cat.name === category);
            const hasFiles = files.length > 0;
            
            return (
              <div 
                key={category}
                className={`p-4 rounded-xl border transition-all duration-300
                  ${hasFiles 
                    ? `${categoryDetails?.color || 'from-gray-500/20 to-gray-400/20'} border-white/10` 
                    : 'border-dashed border-white/5 bg-black/10'
                  }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${hasFiles ? 'bg-white/10' : 'bg-white/5'}`}>
                    {categoryDetails?.icon || <Folder className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-semibold ${hasFiles ? 'text-white' : 'text-white/60'}`}>
                        {category}
                      </h4>
                      <span className="text-sm text-gray-400">
                        {files.length} files
                      </span>
                    </div>
                    
                    {hasFiles ? (
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
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-gray-500 p-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>No files in this category</span>
                      </div>
                    )}
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
            Unorganized Files
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