import React, { useRef, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import VideoStyleItem from './VideoStyleItem';
import ReferenceVideoBanner from './ReferenceVideoBanner';

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
    previewVideo: 'https://www.dropbox.com/scl/fi/6qe8m4ab7nzjj14ne0h6u/CLASSIC-LONG-OK-OK.mp4?rlkey=syb52596tbxhgxc6zliv3glrw&dl=1',
    darkMode: true
  },
  {
    id: 'cinematic',
    title: 'Cinematic',
    description: 'recorded by top sound engineers',
    previewVideo: 'https://www.dropbox.com/scl/fi/ng9ndcl10lcownk1mtx4g/CINEMATOGRAFICO-LONG-OK.mp4?rlkey=ygbln4b5xuaxqeljavln93r3q&dl=1',
    darkMode: true
  },
  {
    id: 'documentary',
    title: 'Documentary',
    description: 'with exclusive voice actors',
    previewVideo: 'https://www.dropbox.com/scl/fi/1mlqx5aq31pvyo67mpz4x/DOC-LONG-OK-OK.mp4?rlkey=pbbkz4xtf9rgl2mecemvp7la3&dl=1',
    darkMode: true
  },
  {
    id: 'dynamic',
    title: 'Dynamic',
    description: 'shot by pro filmmakers',
    previewVideo: 'https://www.dropbox.com/scl/fi/m75wtfagul3ui9qbi996b/DINAMICO-OK.mp4?rlkey=h545e8z9706sc6bawg9cm9gzc&dl=1',
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  return (
    <div className="flex flex-col w-screen max-w-[100vw] -mx-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
      {/* Header Section */}
      <div className="relative py-16 px-4 text-center before:absolute before:inset-0 before:bg-gradient-to-b before:from-editor-bg/50 before:to-transparent">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-cinzel mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
            Define Your Visual Story
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-italiana max-w-2xl mx-auto">
            Choose from our curated collection of professional video styles, each crafted to bring your vision to life
          </p>
        </div>
      </div>

      {/* Video Styles Grid */}
      <div className="w-full max-w-none px-0">
        {VIDEO_STYLES.map((style) => (
          <VideoStyleItem
            key={style.id}
            style={style}
            isHovered={hoveredStyle === style.id}
            isMuted={isMuted}
            onMouseEnter={() => handleMouseEnter(style.id)}
            onMouseLeave={() => handleMouseLeave(style.id)}
            onStyleSelect={(selectedStyle) => {
              onStyleSelect(selectedStyle);
              navigate('/edit');
            }}
            onToggleMute={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
          />
        ))}
      </div>

      {/* Reference Video Banner */}
      <ReferenceVideoBanner onFileInputClick={() => fileInputRef.current?.click()} />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="video/*"
        className="hidden"
      />
    </div>
  );
};

export default VideoStyleSelector;