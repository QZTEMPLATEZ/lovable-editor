import React from 'react';
import FolderCard from './FolderCard';
import { LucideIcon } from 'lucide-react';

interface FolderGridProps {
  folders: {
    name: string;
    icon: React.ReactElement<LucideIcon>;
  }[];
  categorizedFiles: Record<string, number>;
}

const FolderGrid = ({ folders, categorizedFiles }: FolderGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {folders.map((folder) => (
        <FolderCard
          key={folder.name}
          name={folder.name}
          icon={folder.icon}
          count={categorizedFiles[folder.name]}
        />
      ))}
    </div>
  );
};

export default FolderGrid;