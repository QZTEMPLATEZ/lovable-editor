
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { organizeFiles } from '@/utils/organizerUtils';
import { DEFAULT_CATEGORIES } from '@/utils/organizerUtils';
import { OrganizationResult } from '@/types/organizer';

export const useFileProcessing = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [organizationResult, setOrganizationResult] = useState<OrganizationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadedFrames, setLoadedFrames] = useState<Set<string>>(new Set());

  const processFiles = async (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
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

  const handleFrameLoad = (fileName: string) => {
    setLoadedFrames(prev => new Set(prev).add(fileName));
  };

  return {
    files,
    setFiles,
    organizationResult,
    setOrganizationResult,
    isProcessing,
    setIsProcessing,
    loadedFrames,
    processFiles,
    handleFrameLoad,
  };
};
