import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopNavigation from "./components/TopNavigation";
import Index from "./pages/Index";
import VideoSizeSelector from "./components/VideoSizeSelector";
import VideoStyleSelector from "./components/editor/VideoStyleSelector";
import { useState } from "react";
import { VideoStyle } from "./components/editor/VideoStyleSelector";
import PricingPlans from "./components/pricing/PricingPlans";

const queryClient = new QueryClient();

const App = () => {
  const [selectedStyle, setSelectedStyle] = useState<VideoStyle | null>(null);
  const [showIntro, setShowIntro] = useState(() => {
    const stored = localStorage.getItem('showIntro');
    return stored === null ? true : JSON.parse(stored);
  });

  const handleStyleSelect = (style: VideoStyle) => {
    setSelectedStyle(style);
  };

  const handleCustomVideoUpload = (file: File) => {
    console.log('Custom video uploaded:', file);
  };

  const handleDontShowAgain = (checked: boolean) => {
    localStorage.setItem('showIntro', (!checked).toString());
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95 text-white relative overflow-hidden">
            {/* Background grid pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
            
            <div className="relative">
              <TopNavigation />
              <div className="container mx-auto px-4 py-8">
                <Routes>
                  <Route 
                    path="/" 
                    element={
                      <Index 
                        showIntro={showIntro} 
                        onDontShowAgain={handleDontShowAgain} 
                      />
                    } 
                  />
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
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;