
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { EditProject } from '@/types/video';
import StepsIndicator from '@/components/steps/StepsIndicator';
import { useStepNavigation } from './hooks/useStepNavigation';
import { useFileHandling } from './hooks/useFileHandling';
import { useProjectAnalysis } from './hooks/useProjectAnalysis';
import { useProjectExport } from './hooks/useProjectExport';
import HomeHeader from './components/HomeHeader';
import StepRenderer from './components/StepRenderer';

const HomeContent = () => {
  const { toast } = useToast();
  const [rawFiles, setRawFiles] = useState<File[]>([]);
  const [referenceVideo, setReferenceVideo] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [matchingProgress, setMatchingProgress] = useState<number>(0);
  const [project, setProject] = useState<EditProject | null>(null);
  
  // Step navigation
  const { currentStep, setCurrentStep, handleStepClick } = useStepNavigation();
  
  // File handling
  const { 
    handleRawFileSelection, 
    handleReferenceSelection 
  } = useFileHandling({ setRawFiles, setReferenceVideo, toast });
  
  // Analysis
  const { 
    handleStartAnalysis, 
    simulateMatching,
    createMockProject
  } = useProjectAnalysis({
    referenceVideo,
    rawFiles,
    toast,
    setIsAnalyzing,
    setCurrentStep,
    setAnalysisProgress,
    setMatchingProgress,
    setProject
  });
  
  // Export
  const { 
    handleExport,
    handleStartNewProject 
  } = useProjectExport({
    toast,
    setCurrentStep,
    setRawFiles,
    setReferenceVideo,
    setAnalysisProgress,
    setMatchingProgress,
    setProject
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 text-white">
      <div className="container mx-auto py-10 px-4">
        <HomeHeader />

        {/* Step Indicators */}
        <StepsIndicator 
          steps={getSteps()} 
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />

        <div className="max-w-4xl mx-auto">
          <StepRenderer 
            currentStep={currentStep}
            rawFiles={rawFiles}
            referenceVideo={referenceVideo}
            analysisProgress={analysisProgress}
            matchingProgress={matchingProgress}
            onRawFilesSelected={handleRawFileSelection}
            onReferenceVideoSelected={handleReferenceSelection}
            onStartAnalysis={handleStartAnalysis}
            onContinue={() => setCurrentStep(3)}
            onExport={handleExport}
            onStartNewProject={handleStartNewProject}
          />
        </div>
      </div>
    </div>
  );
};

// Helper function to get steps data
const getSteps = () => {
  const { Upload, BarChart3, Download } = require('lucide-react');
  return [
    { id: 1, title: "Import", icon: <Upload className="w-5 h-5" /> },
    { id: 2, title: "Analyze", icon: <BarChart3 className="w-5 h-5" /> },
    { id: 3, title: "Export", icon: <Download className="w-5 h-5" /> }
  ];
};

export default HomeContent;
