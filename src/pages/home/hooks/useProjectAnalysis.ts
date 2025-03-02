
import { EditProject, VideoCategory } from '@/types/video';

interface UseProjectAnalysisProps {
  referenceVideo: File | null;
  rawFiles: File[];
  toast: any;
  setIsAnalyzing: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setAnalysisProgress: React.Dispatch<React.SetStateAction<number>>;
  setMatchingProgress: React.Dispatch<React.SetStateAction<number>>;
  setProject: React.Dispatch<React.SetStateAction<EditProject | null>>;
}

export const useProjectAnalysis = ({
  referenceVideo,
  rawFiles,
  toast,
  setIsAnalyzing,
  setCurrentStep,
  setAnalysisProgress,
  setMatchingProgress,
  setProject
}: UseProjectAnalysisProps) => {
  
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
    if (!referenceVideo) return;
    
    // Create a mock project for demonstration
    const newProject: EditProject = {
      name: "Wedding Auto Edit Project",
      referenceVideo: referenceVideo,
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

  return {
    handleStartAnalysis,
    simulateMatching,
    createMockProject
  };
};
