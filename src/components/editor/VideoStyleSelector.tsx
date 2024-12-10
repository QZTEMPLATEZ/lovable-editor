import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoStyleItem from './VideoStyleItem';
import ReferenceVideoBanner from './ReferenceVideoBanner';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="flex flex-col w-screen max-w-[100vw] -mx-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
      <div className="text-center py-12 px-4">
        <h1 className="text-2xl font-cinzel tracking-[0.2em] text-white/90 uppercase">
          Choose Your Style
        </h1>
      </div>

      <div className="w-full max-w-none px-0">
        {VIDEO_STYLES.map((style) => (
          <VideoStyleItem
            key={style.id}
            style={style}
            isHovered={hoveredStyle === style.id}
            isMuted={isMuted}
            onMouseEnter={() => setHoveredStyle(style.id)}
            onMouseLeave={() => setHoveredStyle(null)}
            onStyleSelect={() => {
              onStyleSelect(style.id as VideoStyle);
              navigate('/edit');
            }}
            onToggleMute={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
          />
        ))}
      </div>

      <ReferenceVideoBanner onFileInputClick={() => fileInputRef.current?.click()} />

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files?.[0]) {
            onCustomVideoUpload(e.target.files[0]);
            onStyleSelect('custom');
            navigate('/edit');
          }
        }}
        accept="video/*"
        className="hidden"
      />

      <div className="flex justify-start p-6 mt-8">
        <Button
          variant="outline"
          className="bg-editor-panel/50 hover:bg-editor-panel border-editor-border/30"
          onClick={() => navigate('/duration')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  );
};

export default VideoStyleSelector;