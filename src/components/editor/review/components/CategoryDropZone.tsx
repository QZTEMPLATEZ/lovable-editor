import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { ScrollArea } from "@/components/ui/scroll-area";
import DraggableClip from './DraggableClip';
import { FolderCategory } from '@/types';

interface CategoryDropZoneProps {
  category: FolderCategory;
  files: { id: string; file: File; category: string }[];
  lastMove: { fileId: string; fromCategory: string; toCategory: string } | null;
}

const CategoryDropZone: React.FC<CategoryDropZoneProps> = ({
  category,
  files,
  lastMove
}) => {
  const categoryFiles = files.filter(f => f.category === category.name);

  return (
    <Droppable key={category.name} droppableId={category.name}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`bg-editor-panel/50 rounded-xl p-4 border ${
            snapshot.isDraggingOver ? 'border-purple-500' : 'border-purple-500/20'
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            {category.icon}
            <h3 className="font-semibold text-white">{category.name}</h3>
            <span className="ml-auto bg-white/10 px-2 py-1 rounded-full text-xs">
              {categoryFiles.length}
            </span>
          </div>

          <ScrollArea className="h-[300px]">
            <div className="grid grid-cols-2 gap-2">
              {categoryFiles.map((file, index) => (
                <DraggableClip
                  key={file.id}
                  file={file}
                  index={index}
                  isLastMoved={lastMove?.fileId === file.id}
                />
              ))}
            </div>
            {provided.placeholder}
          </ScrollArea>
        </div>
      )}
    </Droppable>
  );
};

export default CategoryDropZone;