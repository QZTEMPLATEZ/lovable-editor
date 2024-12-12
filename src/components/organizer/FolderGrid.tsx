import React from 'react';
import FolderCard from './FolderCard';
import { FolderCategory } from '@/types';

interface FolderGridProps {
  categories: FolderCategory[];
  categorizedFiles?: Record<string, number>;
}

const FolderGrid = ({ categories, categorizedFiles = {} }: FolderGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {categories.map((folder) => (
        <FolderCard
          key={folder.name}
          name={folder.name}
          icon={folder.icon}
          count={categorizedFiles[folder.name] || 0}
        />
      ))}
    </div>
  );
};

export default FolderGrid;