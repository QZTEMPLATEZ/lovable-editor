import React from 'react';
import { OrganizationResult } from '../../types/organizer';
import { Progress } from "@/components/ui/progress";
import { Folder, Film, Music, Camera, Clock } from 'lucide-react';

interface OrganizationResultsProps {
  results: OrganizationResult;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'ceremony':
      return <Film className="w-4 h-4" />;
    case 'music':
      return <Music className="w-4 h-4" />;
    case 'photos':
      return <Camera className="w-4 h-4" />;
    case 'timelapses':
      return <Clock className="w-4 h-4" />;
    default:
      return <Folder className="w-4 h-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'ceremony':
      return 'from-purple-500/20 to-pink-500/20';
    case 'music':
      return 'from-blue-500/20 to-cyan-500/20';
    case 'photos':
      return 'from-green-500/20 to-emerald-500/20';
    case 'timelapses':
      return 'from-orange-500/20 to-amber-500/20';
    default:
      return 'from-gray-500/20 to-gray-400/20';
  }
};

const OrganizationResults: React.FC<OrganizationResultsProps> = ({ results }) => {
  const categorizedPercentage = (results.stats.categorizedCount / results.stats.totalFiles) * 100;

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
        {Array.from(results.categorizedFiles.entries()).map(([category, files]) => (
          <div 
            key={category}
            className={`p-4 rounded-xl bg-gradient-to-br ${getCategoryColor(category)} border border-white/10 backdrop-blur-sm`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                {getCategoryIcon(category)}
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
        ))}
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