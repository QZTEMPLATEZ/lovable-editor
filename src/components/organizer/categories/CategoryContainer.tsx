import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { ScrollArea } from "@/components/ui/scroll-area";
import CategoryHeader from './CategoryHeader';
import VideoGrid from './VideoGrid';
import { FolderCategory } from '@/types/organizer';

interface CategoryContainerProps {
  category: FolderCategory;
  files: File[];
  isDraggingOver: boolean;
}

const CategoryContainer = ({ category, files, isDraggingOver }: CategoryContainerProps) => {
  return (
    <div
      className={`bg-editor-panel/50 rounded-xl p-4 border ${
        isDraggingOver ? 'border-purple-500' : 'border-purple-500/20'
      }`}
    >
      <CategoryHeader
        name={category.name}
        icon={category.icon}
        fileCount={files.length}
      />
      <ScrollArea className="h-[300px]">
        <VideoGrid files={files} />
      </ScrollArea>
    </div>
  );
};

export default CategoryContainer;