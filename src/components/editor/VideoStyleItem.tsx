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
        return "https://www.dropbox.com/scl/fi/2ctxlrnuqeqe8r4lcnnoz/first-page.mp4?rlkey=qknrts8gb6lwepv0vhupydosy&raw=1";
      case 'modern':
        return "https://www.dropbox.com/scl/fi/2ctxlrnuqeqe8r4lcnnoz/first-page.mp4?rlkey=qknrts8gb6lwepv0vhupydosy&raw=1";
      case 'documentary':
        return "https://www.dropbox.com/scl/fi/2ctxlrnuqeqe8r4lcnnoz/first-page.mp4?rlkey=qknrts8gb6lwepv0vhupydosy&raw=1";
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
        <div className="space-y-1">
          <motion.h2 
            className="text-2xl md:text-3xl font-['Montserrat'] font-bold tracking-wider uppercase text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {style.name}
          </motion.h2>
          <motion.p 
            className="text-sm md:text-base font-['Montserrat'] font-light tracking-wide text-white/70"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {style.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoStyleItem;