import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion, PanInfo } from 'framer-motion';
import { FileVideo, Check, Undo } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { FOLDER_CATEGORIES } from '@/constants/folderCategories';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface ReviewClassificationStepProps {
  rawFiles: File[];
  onClassificationUpdate: (fileId: string, newCategory: string) => void;
}

interface FileWithCategory {
  id: string;
  file: File;
  category: string;
}

const ReviewClassificationStep: React.FC<ReviewClassificationStepProps> = ({
  rawFiles,
  onClassificationUpdate
}) => {
  const { toast } = useToast();
  const [files, setFiles] = useState<FileWithCategory[]>(
    rawFiles.map((file, index) => ({
      id: `file-${index}`,
      file,
      category: 'untagged'
    }))
  );
  const [lastMove, setLastMove] = useState<{
    fileId: string;
    fromCategory: string;
    toCategory: string;
  } | null>(null);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceCategory = result.source.droppableId;
    const destinationCategory = result.destination.droppableId;
    const fileId = result.draggableId;

    if (sourceCategory !== destinationCategory) {
      setFiles(prevFiles => 
        prevFiles.map(file => 
          file.id === fileId 
            ? { ...file, category: destinationCategory }
            : file
        )
      );

      setLastMove({
        fileId,
        fromCategory: sourceCategory,
        toCategory: destinationCategory
      });

      onClassificationUpdate(fileId, destinationCategory);

      toast({
        title: "Category Updated",
        description: `File moved to ${destinationCategory}`,
      });
    }
  };

  const handleUndo = () => {
    if (lastMove) {
      setFiles(prevFiles =>
        prevFiles.map(file =>
          file.id === lastMove.fileId
            ? { ...file, category: lastMove.fromCategory }
            : file
        )
      );
      
      onClassificationUpdate(lastMove.fileId, lastMove.fromCategory);
      setLastMove(null);

      toast({
        title: "Action Undone",
        description: "File moved back to original category",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Review Classifications</h2>
        {lastMove && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleUndo}
            className="flex items-center gap-2"
          >
            <Undo className="w-4 h-4" />
            Undo Last Move
          </Button>
        )}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    {category.icon}
                    <h3 className="font-semibold text-white">{category.name}</h3>
                    <span className="ml-auto bg-white/10 px-2 py-1 rounded-full text-xs">
                      {files.filter(f => f.category === category.name).length}
                    </span>
                  </div>

                  <ScrollArea className="h-[300px]">
                    <div className="grid grid-cols-2 gap-2">
                      {files
                        .filter(file => file.category === category.name)
                        .map((file, index) => (
                          <Draggable
                            key={file.id}
                            draggableId={file.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              const dragHandleProps = {
                                ...provided.dragHandleProps,
                                onDragStart: undefined,
                                onDrag: undefined,
                                onDragEnd: undefined
                              };

                              return (
                                <motion.div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...dragHandleProps}
                                  initial={false}
                                  animate={{
                                    scale: snapshot.isDragging ? 1.05 : 1,
                                  }}
                                  className={`relative rounded-lg overflow-hidden border ${
                                    snapshot.isDragging ? 'border-purple-500' : 'border-purple-500/20'
                                  }`}
                                >
                                  <div className="aspect-video bg-black relative">
                                    <div className="absolute inset-0 flex items-center justify-center bg-editor-panel/50">
                                      <FileVideo className="w-8 h-8 text-purple-400" />
                                    </div>
                                    {lastMove?.fileId === file.id && (
                                      <div className="absolute top-1 right-1 bg-green-500 rounded-full p-0.5">
                                        <Check className="w-3 h-3 text-white" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="p-2">
                                    <p className="text-xs text-gray-300 truncate">
                                      {file.file.name}
                                    </p>
                                  </div>
                                </motion.div>
                              );
                            }}
                          </Draggable>
                        ))}
                    </div>
                    {provided.placeholder}
                  </ScrollArea>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default ReviewClassificationStep;