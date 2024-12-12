import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { VideoStyle } from '@/types/video';

interface VideoStyleItemProps {
  style: VideoStyle;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onStyleSelect: (style: VideoStyle) => void;
}

const VideoStyleItem = ({
  style,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onStyleSelect,
}: VideoStyleItemProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoPlay = useCallback(async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
      } catch (error) {
        console.log('Video autoplay failed:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        handleVideoPlay();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, handleVideoPlay]);

  // Map style IDs to video URLs
  const getVideoUrl = (styleId: string) => {
    switch (styleId) {
      case 'classic':
        return "https://www.dropbox.com/scl/fi/6qe8m4ab7nzjj14ne0h6u/CLASSIC-LONG-OK-OK.mp4?raw=1";
      case 'modern':
        return "https://www.dropbox.com/scl/fi/m75wtfagul3ui9qbi996b/DINAMICO-OK.mp4?raw=1";
      case 'documentary':
        return "https://www.dropbox.com/scl/fi/rxab2rc98t7ox9hxcrb4b/251219_Urban-Couple-Photoshoot-Photography_By_Azulroto_Artlist_4K.mp4?raw=1";
      default:
        return "https://www.dropbox.com/scl/fi/2ctxlrnuqeqe8r4lcnnoz/first-page.mp4?rlkey=qknrts8gb6lwepv0vhupydosy&raw=1";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full [aspect-ratio:3.84/1] group cursor-pointer bg-editor-panel isolate overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => onStyleSelect(style)}
    >
      <div className="absolute inset-0 z-[1] bg-editor-panel" />
      <div className="absolute inset-0 z-[2] bg-[url('/grid.svg')] opacity-5" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-[3]"
      >
        <video
          ref={videoRef}
          src={getVideoUrl(style.id)}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          preload="metadata"
        />
      </motion.div>
      
      <div className="absolute inset-0 z-[4] bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      
      <div className="absolute inset-0 z-[5] flex items-center justify-between h-full w-full px-8 md:px-16">
        <div className="space-y-4">
          <motion.h2 
            className="text-2xl md:text-3xl font-['Montserrat'] font-bold tracking-wider uppercase text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {style.name}
          </motion.h2>
          <motion.p 
            className="text-sm md:text-base font-['Montserrat'] font-light tracking-wide text-white/70 max-w-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {style.description}
          </motion.p>

          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <p className="text-sm text-white/90 font-medium">Key Features:</p>
              <ul className="list-disc list-inside space-y-1">
                <li className="text-sm text-white/70">Professional color grading</li>
                <li className="text-sm text-white/70">Cinematic transitions</li>
                <li className="text-sm text-white/70">Custom sound design</li>
                <li className="text-sm text-white/70">Emotional storytelling</li>
              </ul>
            </motion.div>
          )}
        </div>

        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="self-center"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStyleSelect(style);
              }}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white rounded-lg transition-all duration-300 hover:border-purple-500/30"
            >
              Select Style
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default VideoStyleItem;