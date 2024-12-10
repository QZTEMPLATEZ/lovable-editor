import { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import StyleCard from './StyleCard';

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
    title: 'Documentary',
    description: 'with exclusive voice actors',
    previewVideo: '/documentary-preview.mp4',
    darkMode: true
  },
  {
    id: 'dynamic',
    title: 'Dynamic',
    description: 'shot by pro filmmakers',
    previewVideo: '/dynamic-preview.mp4',
    darkMode: true
  }
] as const;

const VideoStyleSelector = ({ selectedStyle, onStyleSelect, onCustomVideoUpload }: VideoStyleSelectorProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
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
        <StyleCard
          key={style.id}
          style={style}
          isHovered={hoveredStyle === style.id}
          isMuted={isMuted}
          onHover={setHoveredStyle}
          onToggleMute={() => setIsMuted(!isMuted)}
          onStyleSelect={onStyleSelect}
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