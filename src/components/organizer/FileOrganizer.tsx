
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import FileUploadZone from './FileUploadZone';
import { organizeFiles } from '@/utils/organizerUtils';
import { DEFAULT_CATEGORIES } from '@/utils/organizerUtils';
import { OrganizationResult } from '@/types/organizer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ProcessStatus from './ProcessStatus';
import { DragDropContext } from '@hello-pangea/dnd';
import { FOLDER_CATEGORIES } from '@/constants/folderCategories';
import ZoomControls from './ZoomControls';
import ClassifiedFilesGrid from './ClassifiedFilesGrid';

interface FileOrganizerProps {
  isEditMode?: boolean;
}

const FileOrganizer: React.FC<FileOrganizerProps> = ({ isEditMode = false }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [organizationResult, setOrganizationResult] = useState<OrganizationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadedFrames, setLoadedFrames] = useState<Set<string>>(new Set());
  const [gridSize, setGridSize] = useState<number>(2); // 2 = default size

  const gridColumns = {
    1: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    2: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }[gridSize];

  const handleZoomIn = () => {
    setGridSize(prev => Math.min(prev + 1, 3));
  };

  const handleZoomOut = () => {
    setGridSize(prev => Math.max(prev - 1, 1));
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    await processFiles(droppedFiles);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      await processFiles(selectedFiles);
    }
  };

  const processFiles = async (newFiles: File[]) => {
    setFiles(newFiles);
    setIsProcessing(true);
    setLoadedFrames(new Set());

    try {
      const result = await organizeFiles(newFiles, DEFAULT_CATEGORIES);
      setOrganizationResult(result);
      
      toast({
        title: "Arquivos Processados",
        description: `${result.stats.categorizedCount} arquivos categorizados com sucesso.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no Processamento",
        description: "Falha ao processar os arquivos. Tente novamente.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination || !organizationResult) return;

    const updatedFiles = new Map(organizationResult.categorizedFiles);
    const sourceFiles = updatedFiles.get(result.source.droppableId) || [];
    const destFiles = updatedFiles.get(result.destination.droppableId) || [];
    
    const [movedFile] = sourceFiles.splice(result.source.index, 1);
    destFiles.splice(result.destination.index, 0, movedFile);
    
    updatedFiles.set(result.source.droppableId, sourceFiles);
    updatedFiles.set(result.destination.droppableId, destFiles);
    
    setOrganizationResult({
      ...organizationResult,
      categorizedFiles: updatedFiles,
    });

    toast({
      title: "Categoria Atualizada",
      description: `Arquivo movido para ${result.destination.droppableId}`,
    });
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

  const handleFrameLoad = (fileName: string) => {
    setLoadedFrames(prev => new Set(prev).add(fileName));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 space-y-6"
    >
      {!organizationResult && !isEditMode && (
        <FileUploadZone
          onDrop={handleDrop}
          onFileSelect={handleFileSelect}
        />
      )}

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
            <div className="bg-editor-panel/50 rounded-xl p-4 border border-purple-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Categorias</h3>
                <ZoomControls
                  onZoomIn={handleZoomIn}
                  onZoomOut={handleZoomOut}
                  disabled={isProcessing}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {FOLDER_CATEGORIES.map((category) => {
                  const filesInCategory = organizationResult.categorizedFiles.get(category.name) || [];
                  return (
                    <div 
                      key={category.name}
                      className={`flex items-center justify-between p-3 rounded-lg ${category.color} border border-white/10`}
                    >
                      <div className="flex items-center gap-2">
                        {category.icon}
                        <span>{category.name}</span>
                      </div>
                      <span className="bg-black/20 px-2 py-1 rounded-full text-sm">
                        {filesInCategory.length} arquivos
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

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
