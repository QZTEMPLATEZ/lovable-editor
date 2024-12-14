import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { FileVideo, Check } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DraggableClipProps {
  file: { id: string; file: File; category: string };
  index: number;
  isLastMoved: boolean;
}

const DraggableClip: React.FC<DraggableClipProps> = ({ file, index, isLastMoved }) => {
  return (
    <Draggable draggableId={file.id} index={index}>
      {(provided, snapshot) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`relative rounded-lg overflow-hidden border ${
                  snapshot.isDragging ? 'border-purple-500' : 'border-purple-500/20'
                } ${isLastMoved ? 'border-green-500' : ''}`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: snapshot.isDragging ? 1.05 : 1
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="aspect-video bg-black relative"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-editor-panel/50">
                    <FileVideo className="w-8 h-8 text-purple-400" />
                  </div>
                  {isLastMoved && (
                    <div className="absolute top-1 right-1 bg-green-500 rounded-full p-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </motion.div>
                <div className="p-2">
                  <p className="text-xs text-gray-300 truncate">
                    {file.file.name}
                  </p>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-medium">{file.file.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </Draggable>
  );
};

export default DraggableClip;