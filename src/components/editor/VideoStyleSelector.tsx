
import { TooltipProvider } from "@/components/ui/tooltip";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { VideoStyle } from '@/types/video';
import StyleGrid from './style/StyleGrid';
import { useVideoType } from '@/contexts/VideoTypeContext';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface VideoStyleSelectorProps {
  selectedStyle: VideoStyle | null;
  onStyleSelect: (style: VideoStyle) => void;
  onCustomVideoUpload: (file: File) => void;
  onNext?: () => void;
}

const VideoStyleSelector = ({ 
  selectedStyle, 
  onStyleSelect, 
  onCustomVideoUpload, 
  onNext 
}: VideoStyleSelectorProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { selectedVideoType, setSelectedStyle } = useVideoType();

  const handleStyleSelect = (style: VideoStyle) => {
    onStyleSelect(style);
    setSelectedStyle(style);
    
    // Verifica se temos tanto o tipo de vídeo quanto o estilo selecionados
    if (selectedVideoType) {
      toast({
        title: `${style.name} Style Selected`,
        description: `Duration: ${selectedVideoType.label} - Style: ${style.description}`,
      });

      console.log('Selected Configuration:', {
        duration: {
          min: selectedVideoType.min,
          max: selectedVideoType.max,
          name: selectedVideoType.name
        },
        style: {
          id: style.id,
          name: style.name,
          description: style.description
        }
      });
    }

    if (onNext) {
      onNext();
    }
    navigate('/organize');
  };

  const handleContinue = () => {
    if (!selectedStyle || !selectedVideoType) {
      toast({
        title: "Please make a selection",
        description: "Both duration and style must be selected to continue",
        variant: "destructive"
      });
      return;
    }

    // Aqui podemos processar as configurações selecionadas
    const configuration = {
      duration: {
        min: selectedVideoType.min,
        max: selectedVideoType.max,
        name: selectedVideoType.name,
        label: selectedVideoType.label
      },
      style: {
        id: selectedStyle.id,
        name: selectedStyle.name,
        description: selectedStyle.description,
        features: selectedStyle.features,
        technicalDetails: selectedStyle.technicalDetails
      }
    };

    console.log('Final Configuration:', configuration);
    
    // Aqui você pode adicionar a lógica para enviar estas configurações
    // para o Premiere Pro ou para onde for necessário
    
    navigate('/organize');
  };

  return (
    <div className="flex flex-col w-screen max-w-[100vw] -mx-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] bg-[#0A0A0A]">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-[#0A0A0A] overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          >
            <source src="https://www.dropbox.com/scl/fi/rxab2rc98t7ox9hxcrb4b/251219_Urban-Couple-Photoshoot-Photography_By_Azulroto_Artlist_4K.mp4?raw=1" type="video/mp4" />
          </video>
          {/* Darker gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/95" />
        </div>
        
        {/* Content container */}
        <div className="relative container mx-auto h-full max-w-[2560px] px-4 lg:px-8">
          <div className="flex flex-col justify-center h-full max-w-2xl lg:max-w-3xl xl:max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-cinzel font-extrabold tracking-[0.2em] uppercase text-white mb-4 leading-tight">
              SELECT YOUR<br />FILM STYLE
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 mb-6 max-w-xl lg:max-w-2xl font-['Montserrat'] font-light leading-relaxed">
              {selectedVideoType ? (
                `Selected Duration: ${selectedVideoType.label} - Choose a style that best matches your vision.`
              ) : (
                'Choose the perfect style for your video project. Each option is carefully designed to match different content needs.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Style Grid Section */}
      <StyleGrid onStyleSelect={handleStyleSelect} />

      {/* Selected Configuration Summary */}
      {(selectedStyle && selectedVideoType) && (
        <div className="fixed bottom-8 right-8 bg-black/80 p-4 rounded-lg backdrop-blur-sm border border-purple-500/30">
          <div className="text-white mb-2">
            <p className="text-sm font-semibold">Selected Configuration:</p>
            <p className="text-xs text-gray-400">Duration: {selectedVideoType.label}</p>
            <p className="text-xs text-gray-400">Style: {selectedStyle.name}</p>
          </div>
          <Button 
            className="w-full bg-purple-500 hover:bg-purple-600 text-white"
            onClick={handleContinue}
          >
            <Check className="w-4 h-4 mr-2" />
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoStyleSelector;
