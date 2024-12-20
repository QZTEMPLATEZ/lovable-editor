import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Folder, FolderOpen } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import VideoThumbnail from './VideoThumbnail';
import { FOLDER_CATEGORIES } from '@/constants/folderCategories';
import { useToast } from "@/hooks/use-toast";

interface ClassifiedVideo {
  file: File;
  category: string;
  confidence: number;
}

interface ClassificationGridProps {
  videos: ClassifiedVideo[];
  onReclassify: (videoId: string, newCategory: string) => void;
  onPreviewVideo: (file: File) => void;
}

const ClassificationGrid: React.FC<ClassificationGridProps> = ({
  videos,
  onReclassify,
  onPreviewVideo
}) => {
  const { toast } = useToast();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceCategory = result.source.droppableId;
    const destinationCategory = result.destination.droppableId;
    const videoId = result.draggableId;

    if (sourceCategory !== destinationCategory) {
      onReclassify(videoId, destinationCategory);
      
      toast({
        title: "Video Reclassified",
        description: `Moved to ${destinationCategory}. This helps improve our AI.`,
      });
    }
  };

  const videosByCategory = FOLDER_CATEGORIES.reduce((acc, category) => {
    acc[category.name] = videos.filter(v => v.category === category.name);
    return acc;
  }, {} as Record<string, ClassifiedVideo[]>);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {FOLDER_CATEGORIES.map((category) => (
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
                  {snapshot.isDraggingOver ? (
                    <FolderOpen className="w-5 h-5 text-purple-400" />
                  ) : (
                    <Folder className="w-5 h-5 text-purple-400" />
                  )}
                  <h3 className="font-semibold text-white">{category.name}</h3>
                  <span className="ml-auto bg-white/10 px-2 py-1 rounded-full text-xs">
                    {videosByCategory[category.name]?.length || 0}
                  </span>
                </div>

                <ScrollArea className="h-[400px]">
                  <div className="grid grid-cols-1 gap-3">
                    {videosByCategory[category.name]?.map((video, index) => (
                      <Draggable
                        key={`${video.file.name}-${index}`}
                        draggableId={`${video.file.name}-${index}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <VideoThumbnail
                              file={video.file}
                              category={video.category}
                              confidence={video.confidence}
                              onPreview={onPreviewVideo}
                              isSelected={snapshot.isDragging}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </ScrollArea>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default ClassificationGrid;