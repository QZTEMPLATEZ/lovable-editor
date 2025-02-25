
import React, { useState } from 'react';
import { FileVideo } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useVideoAnalysis } from '@/hooks/useVideoAnalysis';
import VideoFrame from './VideoFrame';
import { createEditingSequence } from '@/services/premiere/premiereIntegration';

interface OrganizedFiles {
  brideprep: File[];
  groomprep: File[];
  decoration: File[];
  drone: File[];
  ceremony: File[];
  reception: File[];
  untagged: File[];
}

const FileOrganizer = ({ isEditMode = false }: { isEditMode?: boolean }) => {
  const { toast } = useToast();
  const [files, setFiles] = useState<OrganizedFiles>({
    brideprep: [],
    groomprep: [],
    decoration: [],
    drone: [],
    ceremony: [],
    reception: [],
    untagged: []
  });
  const [processing, setProcessing] = useState(false);
  const { analysisResults, addAnalysisResult } = useVideoAnalysis();

  const handleFileDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setProcessing(true);

    try {
      // Adiciona arquivos à categoria "untagged" inicialmente
      setFiles(prev => ({
        ...prev,
        untagged: [...prev.untagged, ...droppedFiles]
      }));

      toast({
        title: "Arquivos importados",
        description: `${droppedFiles.length} arquivos adicionados para análise.`,
      });
    } catch (error) {
      console.error('Erro ao importar arquivos:', error);
      toast({
        title: "Erro ao importar",
        description: "Não foi possível importar alguns arquivos.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleStartEditing = async () => {
    setProcessing(true);
    try {
      await createEditingSequence(analysisResults, "Wedding Edit", (step, progress) => {
        toast({
          title: step,
          description: `${progress}% concluído`,
        });
      });

      toast({
        title: "Edição criada",
        description: "Sequência criada com sucesso no Premiere Pro.",
      });
    } catch (error) {
      console.error('Erro ao criar sequência:', error);
      toast({
        title: "Erro na edição",
        description: "Não foi possível criar a sequência.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Área de Drop */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center hover:border-purple-500 transition-colors"
        >
          <FileVideo className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-400">
            Arraste seus arquivos aqui ou{' '}
            <button className="text-purple-500 hover:text-purple-400">
              escolha os arquivos
            </button>
          </p>
        </div>

        {/* Grid de Vídeos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(files).map(([category, categoryFiles]) =>
            categoryFiles.map((file, index) => (
              <VideoFrame
                key={`${category}-${index}`}
                file={file}
                onAnalysisResult={addAnalysisResult}
              />
            ))
          )}
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            disabled={processing || !files.untagged.length}
            onClick={() => setFiles({ ...files, untagged: [] })}
          >
            Limpar
          </Button>
          <Button
            disabled={processing || !analysisResults.length}
            onClick={handleStartEditing}
          >
            {processing ? "Processando..." : "Criar Sequência"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileOrganizer;
