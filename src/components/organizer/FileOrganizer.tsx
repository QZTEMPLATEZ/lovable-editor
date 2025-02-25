
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useVideoType } from '@/contexts/VideoTypeContext';
import { convertDropboxToDirectLink } from '@/utils/urlUtils';
import ProcessStatus from './ProcessStatus';
import EmptyState from './EmptyState';
import OrganizedContent from './OrganizedContent';
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
    console.log('VideoLinks:', videoLinks);
    console.log('MusicLinks:', musicLinks);

    const startInitialProcessing = async () => {
      setIsProcessing(true);
      try {
        const linkFiles = await Promise.all([
          ...videoLinks.map(async link => {
            console.log('Processando link de vídeo:', link.url);
            const directUrl = convertDropboxToDirectLink(link.url);
            console.log('URL direta gerada:', directUrl);
            
            try {
              const response = await fetch(directUrl, {
                headers: {
                  'Accept': 'video/mp4,video/*',
                }
              });

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              const blob = await response.blob();
              console.log('Blob criado com sucesso:', blob.size, 'bytes');
              return new File([blob], `video-${link.id}`, { type: 'video/mp4' });
            } catch (error) {
              console.error('Erro ao buscar vídeo:', error);
              toast({
                variant: "destructive",
                title: "Erro ao acessar vídeo",
                description: `Não foi possível acessar o vídeo: ${link.url}`,
              });
              return null;
            }
          }),
          ...musicLinks.map(async link => {
            console.log('Processando link de áudio:', link.url);
            const directUrl = convertDropboxToDirectLink(link.url);
            
            try {
              const response = await fetch(directUrl);
              const blob = await response.blob();
              return new File([blob], `music-${link.id}`, { type: 'audio/mp3' });
            } catch (error) {
              console.error('Erro ao buscar áudio:', error);
              return null;
            }
          })
        ]);

        const validFiles = linkFiles.filter(file => file !== null) as File[];
        console.log('Arquivos válidos criados:', validFiles.length);

        if (validFiles.length === 0) {
          throw new Error('Nenhum arquivo válido foi processado');
        }

        setFiles(validFiles);
        await processFiles(validFiles);
      } catch (error) {
        console.error('Erro ao processar arquivos:', error);
        toast({
          variant: "destructive",
          title: "Erro no processamento",
          description: "Não foi possível processar os arquivos dos links fornecidos. Verifique se os links do Dropbox são válidos e têm permissão de acesso.",
        });
      } finally {
        setIsProcessing(false);
      }
    };

    if (videoLinks.length > 0 || musicLinks.length > 0) {
      console.log('Iniciando processamento inicial');
      startInitialProcessing();
    } else {
      console.log('Sem links para processar');
    }
  }, [videoLinks, musicLinks]);

  if (!isProcessing && !organizationResult && (!videoLinks.length && !musicLinks.length)) {
    return <EmptyState />;
  }

  return (
    <>
      {isProcessing && (
        <ProcessStatus
          totalFiles={files.length}
          processedFiles={loadedFrames.size}
          successCount={loadedFrames.size}
          errorCount={0}
        />
      )}

      {organizationResult && !isProcessing && (
        <OrganizedContent
          organizationResult={organizationResult}
          onDragEnd={handleDragEnd}
          onZoomIn={() => setGridSize(prev => Math.min(prev + 1, 3))}
          onZoomOut={() => setGridSize(prev => Math.max(prev - 1, 1))}
          isProcessing={isProcessing}
          gridColumns={gridColumns}
          onFrameLoad={handleFrameLoad}
          onContinue={() => navigate('/edit')}
        />
      )}
    </>
  );
};

export default FileOrganizer;
