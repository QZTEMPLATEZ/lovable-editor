import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { VideoStyle } from '@/types/video';
import StyleGrid from './style/StyleGrid';
import { useVideoType } from '@/contexts/VideoTypeContext';

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
  const { setSelectedStyle } = useVideoType();

  const handleStyleSelect = (style: VideoStyle) => {
    onStyleSelect(style);
    setSelectedStyle(style);
    
    toast({
      title: `${style.name} Style Selected`,
      description: style.description,
    });

    if (onNext) {
      onNext();
    }
    navigate('/music');
  };

  return (
    <div className="flex flex-col w-screen max-w-[100vw] -mx-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] bg-[#0A0A0A]">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-[#0A0A0A] overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/95" />
        
        {/* Content container */}
        <div className="relative container mx-auto h-full max-w-[2560px] px-4 lg:px-8">
          <div className="flex flex-col justify-center h-full max-w-2xl lg:max-w-3xl xl:max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-cinzel font-extrabold tracking-[0.2em] uppercase text-white mb-4 leading-tight">
              SELECT YOUR<br />FILM STYLE
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 mb-6 max-w-xl lg:max-w-2xl font-['Montserrat'] font-light leading-relaxed">
              Choose the perfect style for your video project. Each option is carefully designed 
              to match different content needs.
            </p>
          </div>
        </div>
      </div>

      {/* Style Grid Section */}
      <StyleGrid onStyleSelect={handleStyleSelect} />
    </div>
  );
};

export default VideoStyleSelector;