import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FileVideo, Check, Undo, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { FOLDER_CATEGORIES } from '@/constants/folderCategories';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ReviewClassificationStepProps {
  rawFiles?: File[];
  onClassificationUpdate?: (fileId: string, newCategory: string) => void;
}

const ReviewClassificationStep: React.FC<ReviewClassificationStepProps> = ({
  rawFiles = [],
  onClassificationUpdate
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [files, setFiles] = useState<{ id: string; file: File; category: string }[]>(
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

      if (onClassificationUpdate) {
        onClassificationUpdate(fileId, destinationCategory);
      }

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
      
      if (onClassificationUpdate) {
        onClassificationUpdate(lastMove.fileId, lastMove.fromCategory);
      }
      setLastMove(null);

      toast({
        title: "Action Undone",
        description: "File moved back to original category",
      });
    }
  };

  const handleNext = () => {
    const untaggedFiles = files.filter(file => file.category === 'untagged');
    if (untaggedFiles.length > 0) {
      toast({
        variant: "destructive",
        title: "Untagged Files",
        description: "Please categorize all files before proceeding.",
      });
      return;
    }
    navigate('/review');
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
                      <AnimatePresence>
                        {files
                          .filter(file => file.category === category.name)
                          .map((file, index) => (
                            <Draggable
                              key={file.id}
                              draggableId={file.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`relative rounded-lg overflow-hidden border ${
                                    snapshot.isDragging ? 'border-purple-500' : 'border-purple-500/20'
                                  } ${lastMove?.fileId === file.id ? 'border-green-500' : ''}`}
                                >
                                  <div className="aspect-video bg-black relative">
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ 
                                        opacity: 1, 
                                        scale: snapshot.isDragging ? 1.05 : 1
                                      }}
                                      exit={{ opacity: 0, scale: 0.8 }}
                                      className="absolute inset-0 flex items-center justify-center bg-editor-panel/50"
                                    >
                                      <FileVideo className="w-8 h-8 text-purple-400" />
                                    </motion.div>
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
                                </div>
                              )}
                            </Draggable>
                          ))}
                      </AnimatePresence>
                    </div>
                    {provided.placeholder}
                  </ScrollArea>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <div className="flex justify-end mt-8">
        <Button
          onClick={handleNext}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
        >
          Next Step
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ReviewClassificationStep;