import React from 'react';
import { AnalysisResult } from '../../../services/FileAnalysisService';
import OrganizationResults from '../OrganizationResults';
import ProjectExportOptions from '../../editor/ProjectExportOptions';
import { FileVideo } from 'lucide-react';

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
  if (analysisResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileVideo className="w-12 h-12 text-purple-400 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No Videos Processed Yet</h3>
        <p className="text-gray-400">Upload and process your videos to see them organized here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Organized Videos</h2>
        <span className="text-sm text-purple-400">
          {analysisResults.length} videos processed
        </span>
      </div>

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

      {!isProcessing && analysisResults.length > 0 && (
        <div className="mt-8 pt-8 border-t border-purple-500/30">
          <ProjectExportOptions
            onExport={onExport}
            isProcessing={isProcessing}
          />
        </div>
      )}
    </div>
  );
};

export default AnalysisResultsView;