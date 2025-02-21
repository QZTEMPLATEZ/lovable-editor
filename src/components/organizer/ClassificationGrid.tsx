
import React from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { VideoCamera, Sparkles, UserSquare2, Buildings, PartyPopper, Package } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ClassificationGridProps {
  files: File[];
  onClassify: (fileId: string, category: string) => void;
}

const categories = [
  { id: 'brideprep', name: 'Bride Prep', icon: UserSquare2, color: 'pink' },
  { id: 'groomprep', name: 'Groom Prep', icon: UserSquare2, color: 'blue' },
  { id: 'decoration', name: 'Decoration', icon: Sparkles, color: 'purple' },
  { id: 'drone', name: 'Drone Shots', icon: VideoCamera, color: 'sky' },
  { id: 'ceremony', name: 'Ceremony', icon: Buildings, color: 'amber' },
  { id: 'reception', name: 'Reception', icon: PartyPopper, color: 'green' },
  { id: 'uncategorized', name: 'Extras', icon: Package, color: 'gray' }
];

const ClassificationGrid: React.FC<ClassificationGridProps> = ({ files, onClassify }) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceCategory = result.source.droppableId;
    const destinationCategory = result.destination.droppableId;
    const fileId = result.draggableId;

    if (sourceCategory !== destinationCategory) {
      onClassify(fileId, destinationCategory);
      toast({
        title: "File Reclassified",
        description: `File moved to ${categories.find(c => c.id === destinationCategory)?.name}`,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-${category.color}-500/10 rounded-xl p-4 border border-${category.color}-500/20`}
          >
            <div className="flex items-center gap-3 mb-4">
              <category.icon className={`w-5 h-5 text-${category.color}-400`} />
              <h3 className="font-medium text-lg text-white">{category.name}</h3>
            </div>

            <Droppable droppableId={category.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[200px] rounded-lg transition-colors ${
                    snapshot.isDraggingOver ? `bg-${category.color}-500/20` : ''
                  }`}
                >
                  {files.filter(file => file.type.startsWith('video/')).map((file, index) => (
                    <Draggable key={file.name} draggableId={file.name} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-3 mb-2 rounded bg-${category.color}-500/30 backdrop-blur-sm
                            hover:bg-${category.color}-500/40 transition-colors cursor-move`}
                        >
                          <p className="text-sm text-white truncate">{file.name}</p>
                          <span className="text-xs text-white/60">
                            {(file.size / (1024 * 1024)).toFixed(1)} MB
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </motion.div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default ClassificationGrid;
