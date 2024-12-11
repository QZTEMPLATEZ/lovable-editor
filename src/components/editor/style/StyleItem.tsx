import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { VideoStyle } from '../../../types/video';

interface StyleItemProps {
  style: {
    id: string;
    title: string;
    description: string;
    previewVideo: string;
    features: string[];
  };
  onStyleSelect: (style: VideoStyle) => void;
}

const StyleItem = ({
  style,
  onStyleSelect,
}: StyleItemProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full [aspect-ratio:3.84/1] group cursor-pointer bg-editor-panel isolate overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        const videoStyle: VideoStyle = {
          id: style.id,
          name: style.title,
          description: style.description,
          thumbnail: style.previewVideo,
          videoUrl: style.previewVideo
        };
        onStyleSelect(videoStyle);
      }}
    >
      <div className="absolute inset-0 z-[1] bg-editor-panel" />
      <div className="absolute inset-0 z-[2] bg-[url('/grid.svg')] opacity-5" />
      
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 z-[3]"
      >
        <video
          ref={videoRef}
          src={style.previewVideo}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
          loop
          muted
          playsInline
          preload="metadata"
        />
      </motion.div>
      
      <div 
        className={`absolute inset-0 z-[4] bg-gradient-to-r from-black/80 via-transparent to-black/80 transition-opacity duration-300 ${
          isHovered ? 'opacity-50' : 'opacity-80'
        }`} 
      />
      
      <div className="absolute inset-0 z-[5] flex items-center justify-between h-full w-full px-8 md:px-16">
        <div className="space-y-1">
          <motion.h2 
            className="text-2xl md:text-3xl font-['Montserrat'] font-bold tracking-wider uppercase text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {style.title}
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

export default StyleItem;