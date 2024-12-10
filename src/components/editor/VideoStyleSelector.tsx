import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { VideoStyle } from '@/types/video';
import StyleHeader from './style/StyleHeader';
import StyleGrid from './style/StyleGrid';
import { VIDEO_STYLES } from '@/constants/videoStyles';

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

  const handleStyleSelectAndNext = (styleId: string) => {
    const style = VIDEO_STYLES.find(s => s.id === styleId);
    onStyleSelect(styleId as VideoStyle);
    
    toast({
      title: `${style?.title} Style Selected`,
      description: style?.id === 'documentary' 
        ? "Your video will be edited with a focus on authenticity and natural storytelling, preserving real moments and ambient sounds."
        : style?.id === 'cinematic'
          ? "Your video will be edited with advanced cinematic techniques, emphasizing dramatic storytelling and dynamic visuals."
          : style?.id === 'dynamic'
            ? "Your video will be edited with high-energy pacing and creative transitions for a contemporary feel."
            : "Your video will be edited with timeless cinematic techniques for an elegant result.",
    });

    if (onNext) {
      onNext();
    }
    navigate('/music');
  };

  return (
    <div className="flex flex-col w-screen max-w-[100vw] -mx-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] bg-[#0A0A0A] font-cinzel">
      <StyleHeader />
      <StyleGrid onStyleSelect={handleStyleSelectAndNext} />
    </div>
  );
};

export default VideoStyleSelector;