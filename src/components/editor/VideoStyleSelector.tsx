import React, { useState, useRef, useEffect } from 'react';
import { VideoStyle } from '@/types/video';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VideoStyleSelectorProps {
  selectedStyle: VideoStyle | null;
  onStyleSelect: (style: VideoStyle) => void;
  onCustomVideoUpload: (file: File) => void;
  onNext?: () => void;
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
];

const VideoStyleSelector = ({ selectedStyle, onStyleSelect, onCustomVideoUpload, onNext }: VideoStyleSelectorProps) => {
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});
  const navigate = useNavigate();

  useEffect(() => {
    // Preload all videos
    VIDEO_STYLES.forEach(style => {
      const video = document.createElement('video');
      video.src = style.previewVideo;
      video.preload = 'auto';
      videoRefs.current[style.id] = video;
    });
  }, []);

  const handleStyleSelectAndNext = (styleId: string) => {
    onStyleSelect(styleId as VideoStyle);
    if (onNext) {
      onNext();
    }
  };

  const handleMouseEnter = (styleId: string) => {
    setHoveredStyle(styleId);
  };

  const handleMouseLeave = (styleId: string) => {
    setHoveredStyle(null);
  };

  const handleExploreClick = (styleId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent div's onClick
    handleStyleSelectAndNext(styleId);
    navigate('/music');
  };

  return (
    <div className="flex flex-col w-screen max-w-[100vw] -mx-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
      <div className="text-center py-12 px-4 bg-editor-panel relative">
        <button
          onClick={() => navigate('/duration')}
          className="absolute left-8 top-1/2 -translate-y-1/2 p-2 rounded-full bg-editor-bg/20 hover:bg-editor-bg/40 border border-white/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-2xl font-cinzel tracking-[0.2em] text-white/90 uppercase">
          Choose Your Style
        </h1>
      </div>

      <div className="w-full max-w-none px-0 space-y-0">
        {VIDEO_STYLES.map((style) => (
          <div
            key={style.id}
            className="relative w-full [aspect-ratio:3/1] group cursor-pointer bg-editor-panel hover:bg-editor-panel/80 transition-colors"
            onMouseEnter={() => handleMouseEnter(style.id)}
            onMouseLeave={() => handleMouseLeave(style.id)}
            onClick={() => handleStyleSelectAndNext(style.id)}
          >
            <video
              key={style.id}
              src={style.previewVideo}
              className="absolute inset-0 w-full h-full object-cover"
              loop
              muted
              playsInline
              autoPlay
            />

            <div className="relative z-10 flex items-center justify-between h-full w-full px-16 md:px-32">
              <div className="space-y-1">
                <h2 className="text-3xl md:text-4xl font-cinzel tracking-wider text-white">
                  {style.title}
                </h2>
                <p className="text-sm md:text-base tracking-[0.2em] uppercase text-gray-400 font-italiana">
                  {style.description}
                </p>
              </div>
              <button
                onClick={(e) => handleExploreClick(style.id, e)}
                className="bg-editor-bg/20 hover:bg-editor-bg/40 border border-white/20 text-white px-8 py-3 rounded-md transition-colors"
              >
                Explorar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoStyleSelector;