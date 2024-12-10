import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);

  return (
    <div className="flex flex-col w-screen max-w-[100vw] -mx-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] bg-editor-bg min-h-screen">
      <div className="text-center py-12 px-4 bg-editor-bg border-b border-editor-border">
        <h1 className="text-2xl font-cinzel tracking-[0.2em] text-white/90 uppercase mb-3">
          Select Your Visual Direction
        </h1>
        <p className="text-xs text-white/60 tracking-wider font-light">
          Choose the perfect aesthetic to bring your vision to life
        </p>
      </div>

      <div className="w-full max-w-none px-0 bg-editor-bg flex-grow">
        {VIDEO_STYLES.map((style) => (
          <div
            key={style.id}
            className="relative w-full [aspect-ratio:2.74/1] group cursor-pointer bg-editor-panel hover:bg-editor-panel/80 transition-colors"
            onMouseEnter={() => setHoveredStyle(style.id)}
            onMouseLeave={() => setHoveredStyle(null)}
            onClick={() => onStyleSelect(style.id as VideoStyle)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-editor-panel/60 via-editor-panel/40 to-editor-panel/60 z-[1]" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
            
            <AnimatePresence>
              {hoveredStyle === style.id && (
                <motion.video
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  src={style.previewVideo}
                  className="absolute inset-0 w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  autoPlay
                />
              )}
            </AnimatePresence>

            <div className="relative z-10 flex items-center justify-between h-full w-full px-16 md:px-32">
              <div className="space-y-1">
                <h2 className="text-2xl md:text-3xl font-cinzel tracking-wider text-white">
                  {style.title}
                </h2>
                <p className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-gray-400 font-italiana">
                  {style.description}
                </p>
              </div>
              <button
                className="bg-editor-bg/20 hover:bg-editor-bg/40 border border-white/20 text-white px-6 py-2 rounded-md transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onStyleSelect(style.id as VideoStyle);
                }}
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