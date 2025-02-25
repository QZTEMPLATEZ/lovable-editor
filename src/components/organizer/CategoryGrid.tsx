
import React from 'react';
import { OrganizationResult } from '@/types/organizer';
import ZoomControls from './ZoomControls';

interface CategoryGridProps {
  categories: string[];
  organizationResult: OrganizationResult;
  onZoomIn: () => void;
  onZoomOut: () => void;
  isProcessing: boolean;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  organizationResult,
  onZoomIn,
  onZoomOut,
  isProcessing,
}) => {
  return (
    <div className="bg-editor-panel/50 rounded-xl p-4 border border-purple-500/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Categorias</h3>
        <ZoomControls
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          disabled={isProcessing}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const filesInCategory = organizationResult.categorizedFiles.get(category) || [];
          return (
            <div 
              key={category}
              className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10 border border-white/10"
            >
              <div className="flex items-center gap-2">
                <span>{category}</span>
              </div>
              <span className="bg-black/20 px-2 py-1 rounded-full text-sm">
                {filesInCategory.length} arquivos
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;
