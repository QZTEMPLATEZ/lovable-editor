import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import StyleCard from './StyleCard';
import { VideoStyle } from '@/types/video';

const VIDEO_STYLES = [
  {
    id: 'classic',
    title: 'Music',
    description: 'made by world-class artists',
    previewVideo: '/classic-preview.mp4',
    darkMode: true
  },
  {
    id: 'cinematic',
    title: 'Cinematic',
    description: 'recorded by top sound engineers',
    previewVideo: 'https://www.dropbox.com/scl/fi/qw3o0cemsv3acfc8qmbkh/Trailer-Rafa-e-Joao.mp4',
    startTime: 10,
    endTime: 30,
    darkMode: true
  },
  {
    id: 'documentary',
    title: 'SFX',
    description: 'recorded by top sound engineers',
    previewVideo: '/documentary-preview.mp4',
    darkMode: true
  }
] as const;

interface VideoStyleSelectorProps {
  selectedStyle: VideoStyle | null;
  onStyleSelect: (style: VideoStyle) => void;
  onCustomVideoUpload: (file: File) => void;
}

const VideoStyleSelector = ({ selectedStyle, onStyleSelect, onCustomVideoUpload }: VideoStyleSelectorProps) => {
  const navigate = useNavigate();
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="flex flex-col w-screen max-w-[100vw] -mx-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
      <div className="text-center py-12">
        <h1 className="text-2xl font-cinzel tracking-[0.2em] text-black/90 uppercase">
          Define Your Visual Story
        </h1>
      </div>

      {VIDEO_STYLES.map((style) => (
        <div key={style.id} className="relative h-[60vh] group cursor-pointer">
          <StyleCard
            style={style}
            isHovered={hoveredStyle === style.id}
            isMuted={isMuted}
            onHover={setHoveredStyle}
            onToggleMute={() => setIsMuted(!isMuted)}
            onStyleSelect={onStyleSelect}
          />
        </div>
      ))}

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex gap-4">
        <Button
          onClick={() => navigate('/duration')}
          variant="outline"
          className="bg-black/50 border border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
        >
          Back
        </Button>
        <Button
          onClick={() => navigate('/edit')}
          className="bg-gradient-to-r from-editor-glow-purple to-editor-glow-pink hover:opacity-90"
          disabled={!selectedStyle}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default VideoStyleSelector;