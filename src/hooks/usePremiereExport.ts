
import { useState } from 'react';
import { generateEditSequence } from '@/utils/premiere/sequenceGenerator';
import { exportProject } from '@/utils/projectExport';
import { toast } from '@/components/ui/use-toast';

export const usePremiereExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPremiereProject = async (
    categorizedFiles: Map<string, File[]>,
    musicTracks: File[],
    projectName: string
  ) => {
    setIsExporting(true);
    try {
      await exportProject(
        categorizedFiles,
        musicTracks,
        {
          format: 'premiere',
          includeAudio: true,
          includeTransitions: true,
          projectName
        }
      );

      toast({
        title: "Exportação Concluída",
        description: "Projeto exportado com sucesso!"
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        variant: "destructive",
        title: "Erro na Exportação",
        description: "Falha ao exportar o projeto. Tente novamente."
      });
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    exportToPremiereProject
  };
};

export default usePremiereExport;
