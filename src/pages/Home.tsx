
import React, { useState } from 'react';
import { Upload, Video, BarChart3, Download } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { EditProject, VideoCategory } from '@/types/video';
import StepsIndicator from '@/components/steps/StepsIndicator';
import ImportFilesStep from '@/components/steps/ImportFilesStep';
import AnalysisStep from '@/components/steps/AnalysisStep';
import ExportStep from '@/components/steps/ExportStep';

const Home = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [rawFiles, setRawFiles] = useState<File[]>([]);
  const [referenceVideo, setReferenceVideo] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [matchingProgress, setMatchingProgress] = useState<number>(0);
  const [project, setProject] = useState<EditProject | null>(null);

  // Step indicator data
  const steps = [
    { id: 1, title: "Import", icon: <Upload className="w-5 h-5" /> },
    { id: 2, title: "Analyze", icon: <BarChart3 className="w-5 h-5" /> },
    { id: 3, title: "Export", icon: <Download className="w-5 h-5" /> }
  ];

  const handleRawFileSelection = (files: File[]) => {
    setRawFiles(files);
    toast({
      title: "Success",
      description: `${files.length} raw video files selected`,
    });
  };

  const handleReferenceSelection = (file: File) => {
    setReferenceVideo(file);
    toast({
      title: "Success",
      description: "Reference video selected: " + file.name,
    });
  };

  const handleStartAnalysis = () => {
    if (!referenceVideo || rawFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "Missing files",
        description: "Please select both raw footage and a reference video before continuing.",
      });
      return;
    }

    setIsAnalyzing(true);
    setCurrentStep(2);
    
    // Simulate analysis progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setAnalysisProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsAnalyzing(false);
        simulateMatching();
      }
    }, 50);
  };

  const simulateMatching = () => {
    // Simulate matching progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setMatchingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        createMockProject();
        setCurrentStep(3);
      }
    }, 50);
  };

  const createMockProject = () => {
    // Create a mock project for demonstration
    const newProject: EditProject = {
      name: "Wedding Auto Edit Project",
      referenceVideo: referenceVideo!,
      rawFootage: rawFiles,
      referenceSegments: [
        { startTime: 0, endTime: 30, category: 'brideprep', duration: 30 },
        { startTime: 30, endTime: 60, category: 'groomprep', duration: 30 },
        { startTime: 60, endTime: 180, category: 'ceremony', duration: 120 },
        { startTime: 180, endTime: 240, category: 'reception', duration: 60 },
      ],
      matchedClips: [],
      created: new Date(),
      modified: new Date()
    };
    
    setProject(newProject);
  };

  const handleExport = (format: 'xml' | 'edl' | 'fcpxml') => {
    toast({
      title: "Exporting Project",
      description: `Preparing ${format.toUpperCase()} file for download...`,
    });
    
    // Simulate export delay
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Your ${format.toUpperCase()} file is ready for download.`,
      });
      
      // Create and download a mock file
      const element = document.createElement('a');
      const file = new Blob([`Mock ${format.toUpperCase()} content - This would be the actual editor project file in production`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `wedding_project.${format}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 2000);
  };

  const handleStepClick = (stepId: number) => {
    // Only allow going back to previous steps or current step
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
    }
  };

  const handleStartNewProject = () => {
    setCurrentStep(1);
    setRawFiles([]);
    setReferenceVideo(null);
    setAnalysisProgress(0);
    setMatchingProgress(0);
    setProject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 text-white">
      <div className="container mx-auto py-10 px-4">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Wedding Auto Edit
          </h1>
          <p className="text-lg text-purple-300">
            Transform raw footage into professional edits automatically
          </p>
        </header>

        {/* Step Indicators */}
        <StepsIndicator 
          steps={steps} 
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />

        <div className="max-w-4xl mx-auto">
          {/* Step 1: File Import */}
          {currentStep === 1 && (
            <ImportFilesStep 
              rawFiles={rawFiles}
              referenceVideo={referenceVideo}
              onRawFilesSelected={handleRawFileSelection}
              onReferenceVideoSelected={handleReferenceSelection}
              onContinue={handleStartAnalysis}
            />
          )}

          {/* Step 2: Analysis & Matching */}
          {currentStep === 2 && (
            <AnalysisStep 
              analysisProgress={analysisProgress}
              matchingProgress={matchingProgress}
              rawFilesCount={rawFiles.length}
              onContinue={() => setCurrentStep(3)}
            />
          )}

          {/* Step 3: Export */}
          {currentStep === 3 && (
            <ExportStep 
              rawFilesCount={rawFiles.length}
              onExport={handleExport}
              onStartNewProject={handleStartNewProject}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
