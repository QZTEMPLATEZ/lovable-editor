
import { OrganizationResult } from '@/types/organizer';
import { useToast } from '@/components/ui/use-toast';

interface UseDragAndDropProps {
  organizationResult: OrganizationResult | null;
  setOrganizationResult: (result: OrganizationResult) => void;
}

export const useDragAndDrop = ({ organizationResult, setOrganizationResult }: UseDragAndDropProps) => {
  const { toast } = useToast();

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

  return { handleDragEnd };
};
