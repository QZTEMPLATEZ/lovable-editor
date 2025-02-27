
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { VideoTypeProvider } from "./contexts/VideoTypeContext";
import { useState } from "react";
import { VideoStyle } from "./types/video";
import { VideoSizeRange } from "./types";

const queryClient = new QueryClient();

const Banner = ({ title, description, isActive, onClick }: { 
  title: string; 
  description: string; 
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div 
      className={`glass-panel cursor-pointer mb-4 ${isActive ? 'border-[#9b87f5]' : ''}`}
      onClick={onClick}
    >
      <h3 className="gradient-text text-xl mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

const DurationSection = ({ onSelect }: { onSelect: (size: VideoSizeRange) => void }) => {
  const sizes: VideoSizeRange[] = [
    {
      min: 0.5,
      max: 1.5,
      name: "Social",
      label: "30s - 1:30min",
      description: "Highlights para redes sociais",
      recommendedTracks: 1,
      tier: 'basic'
    },
    {
      min: 3,
      max: 5,
      name: "Trailer",
      label: "3-5 minutos",
      description: "Resumo dinâmico do evento",
      recommendedTracks: 2,
      tier: 'pro'
    },
    {
      min: 15,
      max: 20,
      name: "Wedding Movie",
      label: "15-20 minutos",
      description: "Filme completo do casamento",
      recommendedTracks: 4,
      tier: 'business'
    }
  ];

  return (
    <div className="space-y-4">
      {sizes.map((size) => (
        <div 
          key={size.name}
          className="category-card cursor-pointer"
          onClick={() => onSelect(size)}
        >
          <h4 className="gradient-text text-lg mb-1">{size.name}</h4>
          <p className="text-sm text-gray-400">{size.label}</p>
          <p className="text-xs text-gray-500">{size.description}</p>
        </div>
      ))}
    </div>
  );
};

const StyleSection = ({ onSelect }: { onSelect: (style: VideoStyle) => void }) => {
  const styles = [
    {
      id: 'classic',
      name: 'Classic',
      description: 'Estilo cinematográfico clássico',
    },
    {
      id: 'dynamic',
      name: 'Dynamic',
      description: 'Edição dinâmica e moderna',
    },
    {
      id: 'documentary',
      name: 'Documentary',
      description: 'Estilo documentário natural',
    }
  ];

  return (
    <div className="space-y-4">
      {styles.map((style) => (
        <div 
          key={style.id}
          className="category-card cursor-pointer"
          onClick={() => onSelect(style)}
        >
          <h4 className="gradient-text text-lg mb-1">{style.name}</h4>
          <p className="text-sm text-gray-400">{style.description}</p>
        </div>
      ))}
    </div>
  );
};

const EditionSection = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="space-y-4">
      <div className="glass-panel">
        <h4 className="gradient-text text-lg mb-2">Iniciar Edição</h4>
        <p className="text-sm text-gray-400 mb-4">Comece a edição automática com suas escolhas</p>
        <button className="elegant-button w-full" onClick={onStart}>
          Começar
        </button>
      </div>
    </div>
  );
};

const AppContent = () => {
  const [activeSection, setActiveSection] = useState<'duration' | 'style' | 'edition'>('duration');
  const [selectedSize, setSelectedSize] = useState<VideoSizeRange | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<VideoStyle | null>(null);

  const handleSizeSelect = (size: VideoSizeRange) => {
    setSelectedSize(size);
    setActiveSection('style');
  };

  const handleStyleSelect = (style: VideoStyle) => {
    setSelectedStyle(style);
    setActiveSection('edition');
  };

  const handleStartEdition = () => {
    console.log('Starting edition with:', { selectedSize, selectedStyle });
    // Aqui você pode adicionar a lógica para iniciar a edição
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'duration':
        return <DurationSection onSelect={handleSizeSelect} />;
      case 'style':
        return <StyleSection onSelect={handleStyleSelect} />;
      case 'edition':
        return <EditionSection onStart={handleStartEdition} />;
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#232323] text-white p-4">
        <h1 className="header-title mb-6">Wedding Video AI</h1>
        
        <div className="space-y-4 mb-6">
          <Banner 
            title="Duração" 
            description="Escolha a duração do seu vídeo"
            isActive={activeSection === 'duration'}
            onClick={() => setActiveSection('duration')}
          />
          <Banner 
            title="Estilo" 
            description="Defina o estilo da edição"
            isActive={activeSection === 'style'}
            onClick={() => setActiveSection('style')}
          />
          <Banner 
            title="Edição" 
            description="Inicie a edição automática"
            isActive={activeSection === 'edition'}
            onClick={() => setActiveSection('edition')}
          />
        </div>

        {renderContent()}
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
