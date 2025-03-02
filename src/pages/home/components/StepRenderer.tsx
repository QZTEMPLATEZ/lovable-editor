
import React from 'react';
import ImportFilesStep from '@/components/steps/ImportFilesStep';
import AnalysisStep from '@/components/steps/AnalysisStep';
import ExportStep from '@/components/steps/ExportStep';

interface StepRendererProps {
  currentStep: number;
  rawFiles: File[];
  referenceVideo: File | null;
  analysisProgress: number;
  matchingProgress: number;
  onRawFilesSelected: (files: File[]) => void;
  onReferenceVideoSelected: (file: File) => void;
  onStartAnalysis: () => void;
  onContinue: () => void;
  onExport: (format: 'xml' | 'edl' | 'fcpxml') => void;
  onStartNewProject: () => void;
}

const StepRenderer: React.FC<StepRendererProps> = ({
  currentStep,
  rawFiles,
  referenceVideo,
  analysisProgress,
  matchingProgress,
  onRawFilesSelected,
  onReferenceVideoSelected,
  onStartAnalysis,
  onContinue,
  onExport,
  onStartNewProject
}) => {
  return (
    <>
      {/* Step 1: File Import */}
      {currentStep === 1 && (
        <ImportFilesStep 
          rawFiles={rawFiles}
          referenceVideo={referenceVideo}
          onRawFilesSelected={onRawFilesSelected}
          onReferenceVideoSelected={onReferenceVideoSelected}
          onContinue={onStartAnalysis}
        />
      )}

      {/* Step 2: Analysis & Matching */}
      {currentStep === 2 && (
        <AnalysisStep 
          analysisProgress={analysisProgress}
          matchingProgress={matchingProgress}
          rawFilesCount={rawFiles.length}
          onContinue={onContinue}
        />
      )}

      {/* Step 3: Export */}
      {currentStep === 3 && (
        <ExportStep 
          rawFilesCount={rawFiles.length}
          onExport={onExport}
          onStartNewProject={onStartNewProject}
        />
      )}
    </>
  );
};

export default StepRenderer;
