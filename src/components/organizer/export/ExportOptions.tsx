import React from 'react';
import ProjectExportOptions from '../../editor/ProjectExportOptions';
import { usePremiereExport } from '@/hooks/usePremiereExport';
import { OrganizationResult } from '@/types/organizer';

interface ExportOptionsProps {
  analysisResults: OrganizationResult;
  isProcessing: boolean;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({
  analysisResults,
  isProcessing
}) => {
  const { isExporting, handleExport } = usePremiereExport();

  if (analysisResults.stats.categorizedCount === 0 || isProcessing) {
    return null;
  }

  return (
    <div className="mt-8">
      <ProjectExportOptions
        onExport={(format) => handleExport(format, analysisResults)}
        isProcessing={isExporting}
      />
    </div>
  );
};

export default ExportOptions;