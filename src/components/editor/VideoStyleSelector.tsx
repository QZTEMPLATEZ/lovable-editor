import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { VideoStyle } from '@/types/video';
import { Upload } from 'lucide-react';

const VIDEO_STYLES = [
  {
    id: 'classic',
    title: 'Classic',
    description: 'Timeless and elegant style for traditional content',
    bannerImage: '/classic-banner.jpg'
  },
  {
    id: 'cinematic',
    title: 'Cinematic',
    description: 'Professional film-like quality with dramatic effects',
    bannerImage: '/cinematic-banner.jpg'
  },
  {
    id: 'documentary',
    title: 'Documentary',
    description: 'Authentic and journalistic approach to storytelling',
    bannerImage: '/documentary-banner.jpg'
  },
  {
    id: 'dynamic',
    title: 'Dynamic',
    description: 'Fast-paced and energetic style for modern content',
    bannerImage: '/dynamic-banner.jpg'
  }
] as const;

interface VideoStyleSelectorProps {
  selectedStyle: VideoStyle | null;
  onStyleSelect: (style: VideoStyle) => void;
  onCustomVideoUpload: (file: File) => void;
}

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
      <div className="text-center mb-12">
        <h1 className="text-4xl font-cinzel tracking-wider mb-4 bg-clip-text text-transparent bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue animate-gradient">
          Choose Your Style
        </h1>
        <p className="text-lg text-editor-text/80">
          Select a style that best matches your vision
        </p>
      </div>

      <div className="grid gap-6">
        {VIDEO_STYLES.map((style) => (
          <motion.div
            key={style.id}
            className={`relative w-full h-32 rounded-lg overflow-hidden cursor-pointer
              ${selectedStyle === style.id ? 'ring-2 ring-editor-glow-purple' : 'hover:ring-2 hover:ring-editor-glow-purple/50'}
              transition-all duration-300`}
            onClick={() => onStyleSelect(style.id as VideoStyle)}
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
            
            <div className="relative h-full flex items-center px-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-cinzel tracking-wider text-white">
                  {style.title}
                </h2>
                <p className="text-sm tracking-[0.2em] uppercase text-editor-text/90 font-italiana">
                  {style.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Custom Upload Banner */}
        <motion.div
          className={`relative w-full h-32 rounded-lg overflow-hidden cursor-pointer
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
                <h2 className="text-2xl font-cinzel tracking-wider text-white mb-2">
                  Custom Style
                </h2>
                <p className="text-sm tracking-[0.2em] uppercase text-editor-text/90 font-italiana">
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