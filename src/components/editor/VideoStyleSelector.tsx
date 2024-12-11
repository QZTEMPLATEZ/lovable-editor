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

  const handleStyleSelect = (styleId: VideoStyle) => {
    const style = VIDEO_STYLES.find(s => s.id === styleId);
    onStyleSelect(styleId);
    
    toast({
      title: `${style?.title} Style Selected`,
      description: style?.description,
    });

    if (onNext) {
      onNext();
    }
    navigate('/music');
  };

  return (
    <div className="flex flex-col w-screen max-w-[100vw] -mx-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] bg-[#0A0A0A] font-cinzel">
      <StyleHeader />
      <StyleGrid onStyleSelect={handleStyleSelect} />
    </div>
  );
};

export default VideoStyleSelector;