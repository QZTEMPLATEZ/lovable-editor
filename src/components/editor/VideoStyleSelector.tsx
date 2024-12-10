import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  onNext?: () => void;
}

const VideoStyleSelector = ({ selectedStyle, onStyleSelect, onCustomVideoUpload, onNext }: VideoStyleSelectorProps) => {
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});

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

  return (
    <div className="flex flex-col w-screen max-w-[100vw] -mx-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] bg-black min-h-screen">
      <div className="text-center py-8 px-4 bg-editor-bg border-b border-editor-border relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-purple-300 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-cinzel tracking-[0.2em] text-white/90 uppercase mb-2">
          SELECT MOOD FILM
        </h1>
        <p className="text-xs text-white/60 tracking-wider font-light">
          Choose the perfect aesthetic to bring your vision to life
        </p>
      </div>

      <div className="w-full max-w-none px-0 bg-editor-bg flex-grow">
        {VIDEO_STYLES.map((style) => (
          <div
            key={style.id}
            className="relative w-full [aspect-ratio:3/1] group cursor-pointer bg-editor-panel hover:bg-editor-panel/80 transition-colors"
            onClick={() => handleStyleSelectAndNext(style.id)}
          >
            <video
              key={style.id}
              src={style.previewVideo}
              className="absolute inset-0 w-full h-full object-cover"
              loop
              muted
              autoPlay
              playsInline
              preload="auto"
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