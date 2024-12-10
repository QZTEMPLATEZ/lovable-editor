import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { VideoStyle } from '@/types/video';
import { motion } from 'framer-motion';

const VIDEO_STYLES = [
  {
    id: 'classic',
    title: 'Classic',
    description: 'Timeless and elegant style for traditional content',
    previewVideo: '/classic-preview.mp4',
  },
  {
    id: 'cinematic',
    title: 'Cinematic',
    description: 'Professional film-like quality with dramatic effects',
    previewVideo: 'https://www.dropbox.com/scl/fi/qw3o0cemsv3acfc8qmbkh/Trailer-Rafa-e-Joao.mp4',
    startTime: 10,
    endTime: 30,
  },
  {
    id: 'documentary',
    title: 'Documentary',
    description: 'Authentic and journalistic approach to storytelling',
    previewVideo: '/documentary-preview.mp4',
  }
] as const;

interface VideoStyleSelectorProps {
  selectedStyle: VideoStyle | null;
  onStyleSelect: (style: VideoStyle) => void;
  onCustomVideoUpload: (file: File) => void;
}

const VideoStyleSelector = ({ selectedStyle, onStyleSelect, onCustomVideoUpload }: VideoStyleSelectorProps) => {
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);

  return (
    <div className="space-y-6 w-full max-w-[1920px] mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-cinzel tracking-wider mb-4 gradient-text">
          Choose Your Style
        </h1>
        <p className="text-lg text-editor-text/80">
          Select a style that best matches your vision
        </p>
      </div>

      <div className="space-y-4">
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

            {hoveredStyle === style.id && (
              <motion.div
                className="absolute right-8 top-1/2 -translate-y-1/2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Button 
                  variant="outline"
                  className="border border-white/20 text-white hover:bg-white/10 uppercase tracking-wider text-xs"
                >
                  Select Style
                </Button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <input
          type="file"
          accept="video/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onCustomVideoUpload(file);
          }}
          className="hidden"
          id="custom-video-upload"
        />
        <label htmlFor="custom-video-upload">
          <Button 
            variant="outline" 
            className="border border-editor-border text-editor-text hover:bg-editor-button/50"
            onClick={() => document.getElementById('custom-video-upload')?.click()}
          >
            Upload Custom Reference
          </Button>
        </label>
      </div>
    </div>
  );
};

export default VideoStyleSelector;