
import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import VideoFrame from './VideoFrame';
import { ScrollArea } from '@/components/ui/scroll-area';
import { OrganizationResult } from '@/types/organizer';

interface ClassifiedFilesGridProps {
  organizationResult: OrganizationResult;
  onFrameLoad: (fileName: string) => void;
  gridColumns: string;
}

const ClassifiedFilesGrid: React.FC<ClassifiedFilesGridProps> = ({
  organizationResult,
  onFrameLoad,
  gridColumns,
}) => {
  return (
    <ScrollArea className="h-[500px]">
      <div className={`grid ${gridColumns} gap-4`}>
        {Array.from(organizationResult.categorizedFiles.entries()).map(([category, files]) => (
          files.map((file, index) => (
            <Droppable key={`${file.name}-${index}`} droppableId={category}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="group">
                    <VideoFrame
                      file={file}
                      className="border border-purple-500/20 hover:border-purple-500/40 transition-colors"
                      onLoad={() => onFrameLoad(file.name)}
                    />
                    <div className="mt-2">
                      <p className="text-xs text-gray-300 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {category}
                      </p>
                    </div>
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))
        ))}
      </div>
    </ScrollArea>
  );
};

export default ClassifiedFilesGrid;
