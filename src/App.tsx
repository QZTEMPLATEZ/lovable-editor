
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TopNavigation from "./components/TopNavigation";
import VideoSizeSelector from "./components/VideoSizeSelector";
import VideoStyleSelector from "./components/editor/VideoStyleSelector";
import FileOrganizer from "./components/organizer/FileOrganizer";
import { VideoTypeProvider } from "./contexts/VideoTypeContext";
import { useState } from "react";
import { VideoStyle } from "./types/video";
import StepIndicator from "./components/StepIndicator";
import { EDITOR_STEPS } from "./components/editor/EditorSteps";
import VideoTypeIndicator from "./components/VideoTypeIndicator";
import { VideoSizeRange } from "./types";

const queryClient = new QueryClient();

const AppContent = () => {
  const [selectedStyle, setSelectedStyle] = useState<VideoStyle | null>(null);
  const [selectedSize, setSelectedSize] = useState<VideoSizeRange | null>(null);

  const handleStyleSelect = (style: VideoStyle) => {
    setSelectedStyle(style);
  };

  const handleSizeSelect = (size: VideoSizeRange) => {
    setSelectedSize(size);
  };

  const handleCustomVideoUpload = (file: File) => {
    console.log('Custom video uploaded:', file);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#232323] text-white relative">
        <div className="relative">
          <TopNavigation />
          <VideoTypeIndicator />
          
          <Routes>
            <Route path="/" element={<Navigate to="/duration" replace />} />
            <Route 
              path="/duration" 
              element={
                <>
                  <StepIndicator currentStep={0} steps={EDITOR_STEPS} />
                  <VideoSizeSelector 
                    selectedSize={selectedSize}
                    onSizeSelect={handleSizeSelect}
                    userTier="basic"
                  />
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
              path="/organize" 
              element={
                <>
                  <StepIndicator currentStep={2} steps={EDITOR_STEPS} />
                  <FileOrganizer />
                </>
              }
            />
            <Route 
              path="/edit" 
              element={
                <>
                  <StepIndicator currentStep={3} steps={EDITOR_STEPS} />
                  <FileOrganizer isEditMode />
                </>
              }
            />
          </Routes>
        </div>
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
