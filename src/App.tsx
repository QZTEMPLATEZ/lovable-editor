import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import TopNavigation from "./components/TopNavigation";
import Index from "./pages/Index";
import VideoSizeSelector from "./components/VideoSizeSelector";
import VideoStyleSelector from "./components/editor/VideoStyleSelector";
import MusicSelector from "./components/editor/MusicSelector";
import { useState } from "react";
import { VideoStyle } from "./types/video";
import PricingPlans from "./components/pricing/PricingPlans";
import StepIndicator from "./components/StepIndicator";
import { EDITOR_STEPS } from "./components/editor/EditorSteps";
import FileOrganizer from "./components/organizer/FileOrganizer";
import TutorialVideo from "./components/TutorialVideo";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const [selectedStyle, setSelectedStyle] = useState<VideoStyle | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);

  const getCurrentStep = () => {
    switch (location.pathname) {
      case '/duration':
        return 0;
      case '/style':
        return 1;
      case '/music':
        return 2;
      case '/organize':
        return 3;
      default:
        return -1;
    }
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
  };

  const handleStyleSelect = (style: VideoStyle) => {
    setSelectedStyle(style);
  };

  const handleCustomVideoUpload = (file: File) => {
    console.log('Custom video uploaded:', file);
  };

  const currentStep = getCurrentStep();

  return (
    <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95 text-white relative overflow-hidden">
      {showTutorial && <TutorialVideo onComplete={handleTutorialComplete} />}

      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
      
      <div className="relative">
        <TopNavigation />
        <div className="container mx-auto px-4 py-8">
          {currentStep >= 0 && (
            <StepIndicator currentStep={currentStep} steps={EDITOR_STEPS} />
          )}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/plans" element={<PricingPlans />} />
            <Route path="/duration" element={<VideoSizeSelector selectedSize={null} onSizeSelect={() => {}} />} />
            <Route 
              path="/style" 
              element={
                <VideoStyleSelector 
                  selectedStyle={selectedStyle}
                  onStyleSelect={handleStyleSelect}
                  onCustomVideoUpload={handleCustomVideoUpload}
                />
              } 
            />
            <Route 
              path="/music" 
              element={<MusicSelector />}
            />
            <Route 
              path="/organize" 
              element={<FileOrganizer />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;