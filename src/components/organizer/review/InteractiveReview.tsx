import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { motion, PanInfo } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FOLDER_CATEGORIES } from '@/constants/folderCategories';
import { ScrollArea } from "@/components/ui/scroll-area";

interface VideoClip {
  id: string;
  name: string;
  duration: string;
  thumbnail: string;
  category: string;
  confidence: number;
}

interface InteractiveReviewProps {
  clips: VideoClip[];
  onClipMove: (clipId: string, sourceCategory: string, destinationCategory: string) => void;
}

const InteractiveReview: React.FC<InteractiveReviewProps> = ({ clips, onClipMove }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceCategory = result.source.droppableId;
    const destinationCategory = result.destination.droppableId;
    const clipId = result.draggableId;

    if (sourceCategory !== destinationCategory) {
      onClipMove(clipId, sourceCategory, destinationCategory);
      toast({
        title: "Clip Reclassified",
        description: `Moved to ${destinationCategory}. This will help improve our AI.`,
      });
    }
  };

  const filteredClips = clips.filter(clip => {
    const matchesSearch = clip.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filteredCategory || clip.category === filteredCategory;
    return matchesSearch && matchesCategory;
  });

  const clipsByCategory = FOLDER_CATEGORIES.reduce((acc, category) => {
    acc[category.name] = filteredClips.filter(clip => clip.category === category.name);
    return acc;
  }, {} as Record<string, VideoClip[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search clips..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setFilteredCategory(null)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          {filteredCategory || 'All Categories'}
        </Button>
      </div>

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
                    {category.icon}
                    <h3 className="font-semibold text-white">{category.name}</h3>
                    <span className="ml-auto bg-white/10 px-2 py-1 rounded-full text-sm">
                      {clipsByCategory[category.name]?.length || 0}
                    </span>
                  </div>

                  <ScrollArea className="h-[400px]">
                    {clipsByCategory[category.name]?.map((clip, index) => (
                      <Draggable key={clip.id} draggableId={clip.id} index={index}>
                        {(provided, snapshot) => (
                          <motion.div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            initial={false}
                            animate={{ scale: snapshot.isDragging ? 1.05 : 1 }}
                            className={`mb-3 rounded-lg overflow-hidden border ${
                              snapshot.isDragging ? 'border-purple-500' : 'border-purple-500/20'
                            }`}
                            style={{
                              ...provided.draggableProps.style,
                              transform: snapshot.isDragging
                                ? provided.draggableProps.style?.transform
                                : 'none'
                            }}
                          >
                            <div className="aspect-video bg-black relative">
                              <img
                                src={clip.thumbnail}
                                alt={clip.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs">
                                {clip.duration}
                              </div>
                            </div>
                            <div className="p-2 bg-editor-panel/80">
                              <p className="text-sm text-white truncate">{clip.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex-1 bg-gray-700 h-1 rounded-full">
                                  <div
                                    className="bg-purple-500 h-full rounded-full"
                                    style={{ width: `${clip.confidence * 100}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-400">
                                  {Math.round(clip.confidence * 100)}%
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
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

export default InteractiveReview;