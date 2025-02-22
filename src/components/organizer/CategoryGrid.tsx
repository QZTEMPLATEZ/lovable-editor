
import React from 'react';
import { FOLDER_CATEGORIES } from '@/constants/folderCategories';
import { OrganizationResult } from '@/types/organizer';
import ZoomControls from './ZoomControls';

interface CategoryGridProps {
  organizationResult: OrganizationResult;
  onZoomIn: () => void;
  onZoomOut: () => void;
  isProcessing: boolean;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
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
        {FOLDER_CATEGORIES.map((category) => {
          const filesInCategory = organizationResult.categorizedFiles.get(category.name) || [];
          return (
            <div 
              key={category.name}
              className={`flex items-center justify-between p-3 rounded-lg ${category.color} border border-white/10`}
            >
              <div className="flex items-center gap-2">
                {category.icon}
                <span>{category.name}</span>
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
