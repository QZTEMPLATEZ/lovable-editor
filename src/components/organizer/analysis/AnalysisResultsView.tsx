import React from 'react';
import { AnalysisResult } from '../../../services/FileAnalysisService';
import OrganizationResults from '../OrganizationResults';
import ProjectExportOptions from '../../editor/ProjectExportOptions';

interface AnalysisResultsViewProps {
  analysisResults: AnalysisResult[];
  isProcessing: boolean;
  onExport: (format: 'premiere' | 'finalcut' | 'resolve') => void;
}

const AnalysisResultsView = ({ 
  analysisResults, 
  isProcessing, 
  onExport 
}: AnalysisResultsViewProps) => {
  if (analysisResults.length === 0) return null;

  return (
    <>
      <OrganizationResults 
        results={{
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
        }} 
      />

      <div className="mt-8 pt-8 border-t border-purple-500/30">
        <ProjectExportOptions
          onExport={onExport}
          isProcessing={isProcessing}
        />
      </div>
    </>
  );
};

export default AnalysisResultsView;