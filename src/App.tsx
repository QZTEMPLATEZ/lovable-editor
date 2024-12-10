import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopNavigation from "./components/TopNavigation";
import Index from "./pages/Index";
import VideoSizeSelector from "./components/VideoSizeSelector";
import VideoStyleSelector from "./components/editor/VideoStyleSelector";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95 text-white relative overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
        
        <div className="relative">
          <TopNavigation />
          <div className="container mx-auto px-4 py-8">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/duration" element={<VideoSizeSelector selectedSize={null} onSizeSelect={() => {}} />} />
                <Route path="/style" element={<VideoStyleSelector />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;