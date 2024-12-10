import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoStyleItem from './VideoStyleItem';
import ReferenceVideoBanner from './ReferenceVideoBanner';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { VideoStyle } from '@/types/video';

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
];

interface VideoStyleSelectorProps {
  selectedStyle: VideoStyle | null;
  onStyleSelect: (style: VideoStyle) => void;
  onCustomVideoUpload: (file: File) => void;
}

const VideoStyleSelector = ({ selectedStyle, onStyleSelect, onCustomVideoUpload }: VideoStyleSelectorProps) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);

  const handleStyleSelect = (style: VideoStyle) => {
    onStyleSelect(style);
    navigate('/music'); // Navigate to music route after style selection
  };

  return (
    <div className="flex flex-col w-screen max-w-[100vw] -mx-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] bg-editor-bg min-h-screen">
      <div className="text-center py-12 px-4 bg-editor-bg border-b border-editor-border">
        <h1 className="text-3xl font-cinzel tracking-[0.2em] text-white/90 uppercase mb-3">
          Select Your Visual Direction
        </h1>
        <p className="text-sm text-white/60 tracking-wider font-light">
          Choose the perfect aesthetic to bring your vision to life
        </p>
      </div>

      <div className="w-full max-w-none px-0 bg-editor-bg flex-grow">
        {VIDEO_STYLES.map((style) => (
          <VideoStyleItem
            key={style.id}
            style={style}
            isHovered={hoveredStyle === style.id}
            onMouseEnter={() => setHoveredStyle(style.id)}
            onMouseLeave={() => setHoveredStyle(null)}
            onStyleSelect={handleStyleSelect}
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
            navigate('/music');
          }
        }}
        accept="video/*"
        className="hidden"
      />

      <div className="flex justify-start p-6 bg-editor-bg border-t border-editor-border">
        <Button
          variant="outline"
          className="bg-editor-bg hover:bg-editor-panel border-editor-border/30"
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
