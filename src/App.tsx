
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopNavigation from "./components/TopNavigation";
import Index from "./pages/Index";
import VideoSizeSelector from "./components/VideoSizeSelector";
import VideoStyleSelector from "./components/editor/VideoStyleSelector";
import MusicSelector from "./components/editor/MusicSelector";
import FileOrganizer from "./components/organizer/FileOrganizer";
import { VideoTypeProvider } from "./contexts/VideoTypeContext";
import { useState } from "react";
import { VideoStyle } from "./types/video";
import StepIndicator from "./components/StepIndicator";
import { EDITOR_STEPS } from "./components/editor/EditorSteps";
import VideoTypeIndicator from "./components/VideoTypeIndicator";
import LoginModal from "./components/auth/LoginModal";

const queryClient = new QueryClient();

const AppContent = () => {
  const [selectedStyle, setSelectedStyle] = useState<VideoStyle | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleStyleSelect = (style: VideoStyle) => {
    setSelectedStyle(style);
  };

  const handleCustomVideoUpload = (file: File) => {
    console.log('Custom video uploaded:', file);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
        
        <div className="relative">
          <TopNavigation />
          <VideoTypeIndicator />
          
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/duration" 
              element={
                <>
                  <StepIndicator currentStep={0} steps={EDITOR_STEPS} />
                  <VideoSizeSelector />
                </>
              } 
            />
            <Route 
              path="/style" 
              element={
                <>
                  <StepIndicator currentStep={1} steps={EDITOR_STEPS} />
                  <VideoStyleSelector 
                    selectedStyle={selectedStyle}
                    onStyleSelect={handleStyleSelect}
                    onCustomVideoUpload={handleCustomVideoUpload}
                  />
                </>
              } 
            />
            <Route 
              path="/music" 
              element={
                <>
                  <StepIndicator currentStep={2} steps={EDITOR_STEPS} />
                  <MusicSelector onMusicSelect={() => {}} />
                </>
              }
            />
            <Route 
              path="/organize" 
              element={
                <>
                  <StepIndicator currentStep={3} steps={EDITOR_STEPS} />
                  <FileOrganizer />
                </>
              }
            />
            <Route 
              path="/edit" 
              element={
                <>
                  <StepIndicator currentStep={4} steps={EDITOR_STEPS} />
                  <FileOrganizer isEditMode />
                </>
              }
            />
          </Routes>
        </div>

        <LoginModal 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onPlanSelect={() => setShowLoginModal(false)}
        />
      </div>
    </TooltipProvider>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <VideoTypeProvider>
          <AppContent />
        </VideoTypeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
