import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { VideoStyle } from '../../../types/video';
import StylePreviewVideo from './StylePreviewVideo';
import StyleContent from './StyleContent';
import StyleActions from './StyleActions';

interface StyleItemProps {
  style: {
    id: string;
    title: string;
    description: string;
    previewVideo: string;
    features: string[];
    darkMode?: boolean;
  };
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onStyleSelect: (style: VideoStyle) => void;
}

const StyleItem = ({
  style,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onStyleSelect,
}: StyleItemProps) => {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full [aspect-ratio:3.84/1] group cursor-pointer bg-editor-panel isolate overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => onStyleSelect(style.id as VideoStyle)}
    >
      <div className="absolute inset-0 z-[1] bg-editor-panel" />
      <div className="absolute inset-0 z-[2] bg-[url('/grid.svg')] opacity-5" />
      
      <StylePreviewVideo
        videoUrl={style.previewVideo}
        isHovered={isHovered}
        videoRef={videoRef}
      />
      
      <div className="absolute inset-0 z-[4] bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      
      <div className="absolute inset-0 z-[5] flex items-center justify-between h-full w-full px-8 md:px-16">
        <div className="space-y-1">
          <StyleContent
            title={style.title}
            description={style.description}
            isHovered={isHovered}
            features={style.features}
          />
        </div>
        
        <StyleActions
          onSelect={() => onStyleSelect(style.id as VideoStyle)}
          features={style.features}
        />
      </div>
    </motion.div>
  );
};

export default StyleItem;