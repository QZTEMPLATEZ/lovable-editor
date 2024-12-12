import React from 'react';
import ProjectExportOptions from '../../editor/ProjectExportOptions';
import { usePremiereExport } from '@/hooks/usePremiereExport';
import { AnalysisResult } from '@/services/FileAnalysisService';
import { OrganizationResult } from '@/types/organizer';

interface ExportOptionsProps {
  analysisResults: AnalysisResult[];
  isProcessing: boolean;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({
  analysisResults,
  isProcessing
}) => {
  const { isExporting, handleExport } = usePremiereExport();

  // Convert AnalysisResult[] to OrganizationResult
  const organizationResult: OrganizationResult = {
    categorizedFiles: new Map(
      analysisResults
        .filter(r => !r.error)
        .map(r => [r.category, [r.file]])
    ),
    unorganizedFiles: analysisResults
      .filter(r => r.error)
      .map(r => r.file),
    stats: {
      totalFiles: analysisResults.length,
      categorizedCount: analysisResults.filter(r => !r.error).length,
      uncategorizedCount: analysisResults.filter(r => r.error).length
    }
  };

  if (analysisResults.length === 0 || isProcessing) {
    return null;
  }

  return (
    <div className="mt-8">
      <ProjectExportOptions
        onExport={(format) => handleExport(format, organizationResult)}
        isProcessing={isExporting}
      />
    </div>
  );
};

export default ExportOptions;