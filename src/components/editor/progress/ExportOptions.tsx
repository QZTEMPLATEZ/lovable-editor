
import React from 'react';
import { Button } from '@/components/ui/button';
import { exportProject } from '@/utils/projectExport';

interface ExportOptionsProps {
  projectName: string;
  isComplete: boolean;
  videoFiles: File[];
  onStopProcessing: () => void;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ 
  projectName, 
  isComplete, 
  videoFiles, 
  onStopProcessing 
}) => {
  const handleExport = async () => {
    try {
      await exportProject(
        new Map([['videos', videoFiles]]),
        [],
        {
          format: 'premiere',
          includeAudio: true,
          includeTransitions: true,
          projectName
        }
      );
      onStopProcessing();
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  return (
    <div className="space-y-4">
      {isComplete ? (
        <Button onClick={handleExport} className="bg-gradient-to-r from-purple-500 to-pink-500">
          Exportar para Premiere Pro
        </Button>
      ) : (
        <Button onClick={onStopProcessing} variant="destructive">
          Cancelar Processamento
        </Button>
      )}
    </div>
  );
};

export default ExportOptions;
