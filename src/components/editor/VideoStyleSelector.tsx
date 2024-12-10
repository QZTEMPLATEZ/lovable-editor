import React, { useState, useRef } from 'react';
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import VideoStyleItem from './VideoStyleItem';

export type VideoStyle = 'classic' | 'cinematic' | 'documentary' | 'dynamic' | 'custom';

interface VideoStyleSelectorProps {
  selectedStyle: VideoStyle | null;
  onStyleSelect: (style: VideoStyle) => void;
  onCustomVideoUpload: (file: File) => void;
}

const VIDEO_STYLES = [
  {
    id: 'classic',
    title: 'Classic',
    description: 'made by world-class artists',
    previewVideo: 'https://dl.dropboxusercontent.com/s/zosb18kemlx6d4qde73x3/youtube.mp4',
    darkMode: true
  },
  {
    id: 'cinematic',
    title: 'Cinematic',
    description: 'recorded by top sound engineers',
    previewVideo: 'https://dl.dropboxusercontent.com/s/g8by45dy1nwjxfhpdko5v/cinematic.mp4',
    darkMode: true
  },
  {
    id: 'documentary',
    title: 'Documentary',
    description: 'with exclusive voice actors',
    previewVideo: 'https://dl.dropboxusercontent.com/s/mewmbqaeyazkv6bwk5nob/video-oficial-casamento_1.mp4',
    darkMode: true
  },
  {
    id: 'dynamic',
    title: 'Dynamic',
    description: 'shot by pro filmmakers',
    previewVideo: 'https://dl.dropboxusercontent.com/s/qw3o0cemsv3acfc8qmbkh/Trailer-Rafa-e-Joao.mp4',
    darkMode: true
  }
] as const;

const VideoStyleSelector = ({ selectedStyle, onStyleSelect, onCustomVideoUpload }: VideoStyleSelectorProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const handleMouseEnter = (styleId: string) => {
    setHoveredStyle(styleId);
  };

  const handleMouseLeave = (styleId: string) => {
    setHoveredStyle(null);
  };

  return (
    <div className="flex flex-col w-screen max-w-[100vw] -mx-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
      <div className="text-center py-12">
        <h1 className="text-2xl font-cinzel tracking-[0.2em] text-white/90 uppercase">
          Define Your Visual Story
        </h1>
      </div>

      {VIDEO_STYLES.map((style) => (
        <VideoStyleItem
          key={style.id}
          style={style}
          isHovered={hoveredStyle === style.id}
          isMuted={isMuted}
          onMouseEnter={() => handleMouseEnter(style.id)}
          onMouseLeave={() => handleMouseLeave(style.id)}
          onStyleSelect={() => onStyleSelect(style.id as VideoStyle)}
          onToggleMute={(e) => {
            e.stopPropagation();
            setIsMuted(!isMuted);
          }}
        />
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

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (!file.type.startsWith('video/')) {
              toast({
                variant: "destructive",
                title: "Invalid file type",
                description: "Please upload a video file."
              });
              return;
            }
            onCustomVideoUpload(file);
            onStyleSelect('custom');
          }
        }}
        accept="video/*"
        className="hidden"
      />
    </div>
  );
};

export default VideoStyleSelector;