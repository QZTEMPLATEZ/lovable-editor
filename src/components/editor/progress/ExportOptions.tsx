
import React from 'react';
import { Button } from '@/components/ui/button';
import { generateEditSequence } from '@/utils/premiere/sequenceGenerator';
import { exportProject } from '@/utils/projectExport';

interface ExportOptionsProps {
  projectName: string;
  onExport: () => void;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ projectName, onExport }) => {
  const handleExport = async () => {
    try {
      await exportProject(
        new Map(), // This should be replaced with actual categorizedFiles
        [], // This should be replaced with actual musicTracks
        {
          format: 'premiere',
          includeAudio: true,
          includeTransitions: true,
          projectName
        }
      );
      onExport();
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleExport}>Exportar para Premiere Pro</Button>
    </div>
  );
};

export default ExportOptions;
