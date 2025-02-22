
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { DragDropContext } from '@hello-pangea/dnd';
import { useVideoType } from '@/contexts/VideoTypeContext';
import ProcessStatus from './ProcessStatus';
import CategoryGrid from './CategoryGrid';
import ClassifiedFilesGrid from './ClassifiedFilesGrid';
import { useFileProcessing } from './FileProcessingLogic';
import { useDragAndDrop } from './DragAndDropHandler';

interface FileOrganizerProps {
  isEditMode?: boolean;
}

const FileOrganizer: React.FC<FileOrganizerProps> = ({ isEditMode = false }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { videoLinks, musicLinks } = useVideoType();
  const [gridSize, setGridSize] = useState<number>(2);

  const {
    files,
    organizationResult,
    isProcessing,
    loadedFrames,
    setFiles,
    setOrganizationResult,
    setIsProcessing,
    processFiles,
    handleFrameLoad,
  } = useFileProcessing();

  const { handleDragEnd } = useDragAndDrop({
    organizationResult,
    setOrganizationResult,
  });

  const gridColumns = {
    1: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    2: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }[gridSize];

  useEffect(() => {
    const startInitialProcessing = async () => {
      setIsProcessing(true);
      try {
        const linkFiles = await Promise.all([
          ...videoLinks.map(async link => {
            const response = await fetch(link.url);
            const blob = await response.blob();
            return new File([blob], `video-${link.id}`, { type: 'video/mp4' });
          }),
          ...musicLinks.map(async link => {
            const response = await fetch(link.url);
            const blob = await response.blob();
            return new File([blob], `music-${link.id}`, { type: 'audio/mp3' });
          })
        ]);

        setFiles(linkFiles);
        await processFiles(linkFiles);
      } catch (error) {
        console.error('Erro ao processar arquivos:', error);
        toast({
          variant: "destructive",
          title: "Erro no processamento",
          description: "Não foi possível processar os arquivos dos links fornecidos. Tente novamente.",
        });
      }
    };

    if (videoLinks.length > 0 || musicLinks.length > 0) {
      startInitialProcessing();
    }
  }, [videoLinks, musicLinks]);

  const handleZoomIn = () => {
    setGridSize(prev => Math.min(prev + 1, 3));
  };

  const handleZoomOut = () => {
    setGridSize(prev => Math.max(prev - 1, 1));
  };

  const handleContinue = () => {
    if (!organizationResult || organizationResult.stats.totalFiles === 0) {
      toast({
        variant: "destructive",
        title: "Nenhum Arquivo Processado",
        description: "Por favor, faça o upload e processamento dos arquivos antes de continuar.",
      });
      return;
    }
    navigate('/edit');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 space-y-6"
    >
      {isProcessing && (
        <ProcessStatus
          totalFiles={files.length}
          processedFiles={loadedFrames.size}
          successCount={loadedFrames.size}
          errorCount={0}
        />
      )}

      {organizationResult && !isProcessing && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="space-y-8">
            <CategoryGrid
              organizationResult={organizationResult}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              isProcessing={isProcessing}
            />

            <div className="bg-editor-panel/50 rounded-xl p-4 border border-purple-500/20">
              <h3 className="text-lg font-semibold mb-4">Arquivos Classificados</h3>
              <ClassifiedFilesGrid
                organizationResult={organizationResult}
                onFrameLoad={handleFrameLoad}
                gridColumns={gridColumns}
              />
            </div>

            <div className="flex justify-end mt-8">
              <Button
                onClick={handleContinue}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
              >
                Continuar para Edição
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </DragDropContext>
      )}
    </motion.div>
  );
};

export default FileOrganizer;
