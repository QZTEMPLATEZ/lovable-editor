import React, { useState } from 'react';
import { VideoStyle } from '@/types/video';
import { motion } from 'framer-motion';
import { ChevronLeft, Film, Play } from 'lucide-react';
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
  const navigate = useNavigate();

  const handleStyleSelectAndNext = (styleId: string) => {
    onStyleSelect(styleId as VideoStyle);
    if (onNext) {
      onNext();
    }
    navigate('/music');
  };

  return (
    <div className="flex flex-col w-screen max-w-[100vw] -mx-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
      <div className="text-center py-12 px-4 bg-editor-panel relative">
        <button
          onClick={() => navigate('/duration')}
          className="absolute left-8 top-1/2 -translate-y-1/2 p-2 rounded-full bg-editor-button hover:bg-editor-glow-purple/20 border border-editor-border transition-colors duration-300"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-3xl font-cinzel tracking-[0.2em] text-white/90 uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-editor-glow-purple to-editor-glow-pink">
          Choose Your Style
        </h1>
      </div>

      <div className="w-full max-w-none px-0 space-y-1">
        {VIDEO_STYLES.map((style) => (
          <motion.div
            key={style.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full h-[300px] group cursor-pointer bg-editor-bg transition-all duration-300 border-y border-editor-border hover:bg-editor-panel"
            onMouseEnter={() => setHoveredStyle(style.id)}
            onMouseLeave={() => setHoveredStyle(null)}
            onClick={() => handleStyleSelectAndNext(style.id)}
          >
            {/* Background Video */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-editor-bg via-transparent to-editor-bg opacity-50" />
              <video
                key={style.id}
                src={style.previewVideo}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  hoveredStyle === style.id ? 'opacity-50' : 'opacity-20'
                }`}
                loop
                muted
                playsInline
                autoPlay
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-between h-full w-full px-16 md:px-32">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-editor-glow-purple/20 flex items-center justify-center border border-editor-glow-purple/30">
                    <Film className="w-6 h-6 text-editor-glow-purple" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-cinzel tracking-wider text-white group-hover:text-editor-glow-purple transition-colors">
                      {style.title}
                    </h2>
                    <p className="text-sm md:text-base tracking-[0.2em] uppercase text-editor-text font-italiana group-hover:text-white/80 transition-colors">
                      {style.description}
                    </p>
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleStyleSelectAndNext(style.id);
                }}
                className="bg-editor-button hover:bg-editor-glow-purple/20 border border-editor-border text-white px-8 py-3 rounded-md transition-all duration-300 hover:border-editor-glow-purple hover:shadow-lg hover:shadow-editor-glow-purple/20 flex items-center space-x-2"
              >
                <span>Preview</span>
                <Play className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VideoStyleSelector;