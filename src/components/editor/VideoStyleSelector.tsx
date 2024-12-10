import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { VideoStyle } from '@/types/video';

interface VideoStyleSelectorProps {
  selectedStyle: VideoStyle | null;
  onStyleSelect: (style: VideoStyle) => void;
  onCustomVideoUpload: (file: File) => void;
}

const VIDEO_STYLES = [
  {
    id: 'classic' as VideoStyle,
    title: 'Music',
    description: 'made by world-class artists',
    bannerImage: '/classic-banner.jpg',
    buttonText: 'Explore Music'
  },
  {
    id: 'cinematic' as VideoStyle,
    title: 'SFX',
    description: 'recorded by top sound engineers',
    bannerImage: '/cinematic-banner.jpg',
    buttonText: 'Explore SFX'
  },
  {
    id: 'documentary' as VideoStyle,
    title: 'AI voiceover',
    description: 'with exclusive voice actors',
    bannerImage: '/documentary-banner.jpg',
    buttonText: 'Explore Voiceover'
  },
  {
    id: 'dynamic' as VideoStyle,
    title: 'Footage',
    description: 'shot by pro filmmakers',
    bannerImage: '/dynamic-banner.jpg',
    buttonText: 'Explore Footage'
  }
];

const VideoStyleSelector = ({ selectedStyle, onStyleSelect, onCustomVideoUpload }: VideoStyleSelectorProps) => {
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onCustomVideoUpload(file);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-[1920px] mx-auto">
      <div className="grid gap-4">
        {VIDEO_STYLES.map((style) => (
          <motion.div
            key={style.id}
            className={`relative w-full h-[200px] rounded-none overflow-hidden cursor-pointer
              ${selectedStyle === style.id ? 'ring-2 ring-editor-glow-purple' : 'hover:ring-2 hover:ring-editor-glow-purple/50'}
              transition-all duration-300`}
            onClick={() => onStyleSelect(style.id)}
            onMouseEnter={() => setHoveredStyle(style.id)}
            onMouseLeave={() => setHoveredStyle(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${style.bannerImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-editor-bg/95 via-editor-bg/80 to-transparent" />
            
            <div className="relative h-full flex items-center justify-between px-12">
              <div className="space-y-2">
                <h2 className="text-5xl font-italiana tracking-wider text-white">
                  {style.title}
                </h2>
                <p className="text-sm tracking-[0.2em] uppercase text-editor-text/90">
                  {style.description}
                </p>
              </div>
              <button className="px-4 py-2 border border-white/20 rounded hover:bg-white/10 transition-colors">
                {style.buttonText}
              </button>
            </div>
          </motion.div>
        ))}

        {/* Custom Upload Banner */}
        <motion.div
          className={`relative w-full h-[200px] rounded-none overflow-hidden cursor-pointer
            ${selectedStyle === 'custom' ? 'ring-2 ring-editor-glow-purple' : 'hover:ring-2 hover:ring-editor-glow-purple/50'}
            transition-all duration-300 bg-editor-panel/50`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-editor-glow-purple/10 to-editor-glow-pink/10" />
          
          <div className="relative h-full flex items-center justify-center">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
              id="custom-style-upload"
            />
            <label
              htmlFor="custom-style-upload"
              className="flex flex-col items-center space-y-4 cursor-pointer"
            >
              <Upload className="w-8 h-8 text-editor-text/80" />
              <div className="text-center">
                <h2 className="text-4xl font-italiana tracking-wider text-white mb-2">
                  Custom Style
                </h2>
                <p className="text-sm tracking-[0.2em] uppercase text-editor-text/90">
                  Upload your own reference video
                </p>
              </div>
            </label>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoStyleSelector;