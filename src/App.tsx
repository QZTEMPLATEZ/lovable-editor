
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { VideoTypeProvider } from "./contexts/VideoTypeContext";
import { useState } from "react";
import { VideoStyle } from "./types/video";
import { VideoSizeRange } from "./types";
import { Clock, Film, Play } from "lucide-react";

const queryClient = new QueryClient();

const StepCard = ({ 
  title, 
  description, 
  icon,
  isActive, 
  onClick 
}: { 
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl p-6 
        bg-gradient-to-br from-white/[0.05] to-white/[0.08]
        border border-white/[0.05] backdrop-blur-md
        transform transition-all duration-300 ease-out
        hover:scale-[1.02] hover:from-white/[0.07] hover:to-white/[0.1]
        cursor-pointer
        ${isActive ? 'ring-2 ring-[#9b87f5] ring-opacity-50' : ''}
      `}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-2 rounded-xl bg-white/5">
            {icon}
          </div>
          <h3 className="gradient-text text-2xl font-medium">{title}</h3>
        </div>
        <p className="text-gray-400 text-[15px] leading-relaxed">{description}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#9b87f5]/5 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
    </div>
  );
};

const AppContent = () => {
  const [activeStep, setActiveStep] = useState<'duration' | 'style' | 'edition'>('duration');

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#1A1A1A] text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="header-title text-4xl mb-12 text-center">Wedding Video AI</h1>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <StepCard 
              title="Duração" 
              description="Escolha o tempo ideal para seu vídeo, desde highlights rápidos até filmes completos"
              icon={<Clock className="w-6 h-6 text-[#9b87f5]" />}
              isActive={activeStep === 'duration'}
              onClick={() => setActiveStep('duration')}
            />
            <StepCard 
              title="Estilo" 
              description="Defina a estética e o tom da sua edição, desde clássico até contemporâneo"
              icon={<Film className="w-6 h-6 text-[#9b87f5]" />}
              isActive={activeStep === 'style'}
              onClick={() => setActiveStep('style')}
            />
            <StepCard 
              title="Automação" 
              description="Nossa IA analisa e monta seu vídeo seguindo suas escolhas de estilo"
              icon={<Play className="w-6 h-6 text-[#9b87f5]" />}
              isActive={activeStep === 'edition'}
              onClick={() => setActiveStep('edition')}
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <VideoTypeProvider>
          <AppContent />
        </VideoTypeProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
