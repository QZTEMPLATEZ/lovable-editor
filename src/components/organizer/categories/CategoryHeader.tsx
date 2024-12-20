import React from 'react';
import { Folder } from 'lucide-react';

interface CategoryHeaderProps {
  name: string;
  icon: React.ReactNode;
  fileCount: number;
}

const CategoryHeader = ({ name, icon, fileCount }: CategoryHeaderProps) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      {icon || <Folder className="w-5 h-5 text-purple-400" />}
      <h3 className="font-semibold text-white">{name}</h3>
      <span className="ml-auto bg-white/10 px-2 py-1 rounded-full text-xs">
        {fileCount}
      </span>
    </div>
  );
};

export default CategoryHeader;