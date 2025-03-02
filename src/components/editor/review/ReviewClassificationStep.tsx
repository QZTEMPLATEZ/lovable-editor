import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { FOLDER_CATEGORIES } from '@/constants/folderCategories';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import CategoryDropZone from './components/CategoryDropZone';
import ReviewHeader from './components/ReviewHeader';
import VideoThumbnailGrid from '../../organizer/VideoThumbnailGrid';

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

  // Create a map of file names to their categories for the thumbnail grid
  const fileCategories = files.reduce((acc, { file, category }) => {
    acc[file.name] = category;
    return acc;
  }, {} as { [key: string]: string });

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
        title: "Categoria Atualizada",
        description: `Vídeo movido para ${destinationCategory}`,
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
        title: "Ação Desfeita",
        description: "Vídeo retornou à categoria original",
      });
    }
  };

  const handleNext = () => {
    const untaggedFiles = files.filter(file => file.category === 'untagged');
    if (untaggedFiles.length > 0) {
      toast({
        variant: "destructive",
        title: "Vídeos Não Classificados",
        description: "Por favor, classifique todos os vídeos antes de continuar.",
      });
      return;
    }
    navigate('/review');
  };

  return (
    <div className="p-6 space-y-6">
      <ReviewHeader lastMove={lastMove} onUndo={handleUndo} />

      <VideoThumbnailGrid 
        videos={files.map(f => f.file)}
        categories={fileCategories}
        onReclassify={(videoIndex, newCategory) => {
          const fileId = files[videoIndex].id;
          if (onClassificationUpdate) {
            onClassificationUpdate(fileId, newCategory);
          }
        }}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FOLDER_CATEGORIES.map((category) => (
            <CategoryDropZone
              key={category.name}
              category={category}
              files={files}
              lastMove={lastMove}
            />
          ))}
        </div>
      </DragDropContext>

      <div className="flex justify-end mt-8">
        <Button
          onClick={handleNext}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
        >
          Próxima Etapa
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ReviewClassificationStep;