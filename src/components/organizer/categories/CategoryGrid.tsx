import React from 'react';
import { motion } from 'framer-motion';
import { Folder } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { OrganizationCategory, OrganizationResult } from '@/types/organizer';
import VideoThumbnail from '../VideoThumbnail';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface CategoryGridProps {
  categories: OrganizationCategory[];
  organizationResult: OrganizationResult;
  onCategoryUpdate: (fileId: string, newCategory: string) => void;
}

const CategoryGrid = ({ categories, organizationResult, onCategoryUpdate }: CategoryGridProps) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceCategory = result.source.droppableId;
    const destinationCategory = result.destination.droppableId;
    const fileId = result.draggableId;

    if (sourceCategory !== destinationCategory) {
      onCategoryUpdate(fileId, destinationCategory);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const filesInCategory = organizationResult.categorizedFiles.get(category.name) || [];
          
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
                    <Folder className="w-5 h-5 text-purple-400" />
                    <h3 className="font-semibold text-white">{category.name}</h3>
                    <span className="ml-auto bg-white/10 px-2 py-1 rounded-full text-xs">
                      {filesInCategory.length}
                    </span>
                  </div>

                  <ScrollArea className="h-[300px]">
                    <div className="grid grid-cols-2 gap-2">
                      {filesInCategory.map((file, index) => (
                        <Draggable
                          key={file.name}
                          draggableId={file.name}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <VideoThumbnail
                                file={file}
                                isSelected={snapshot.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </ScrollArea>
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default CategoryGrid;