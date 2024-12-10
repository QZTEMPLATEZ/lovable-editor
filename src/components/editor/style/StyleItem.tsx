import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { VideoStyle } from '@/types/video';
import StylePreview from './StylePreview';
import StyleContent from './StyleContent';
import StyleActions from './StyleActions';

interface StyleItemProps {
  style: {
    id: string;
    title: string;
    description: string;
    previewVideo: string;
    features: string[];
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
      className="relative w-full [aspect-ratio:3.84/1] group cursor-pointer bg-editor-panel isolate"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => onStyleSelect(style.id as VideoStyle)}
    >
      <StylePreview
        videoUrl={style.previewVideo}
        isHovered={isHovered}
        videoRef={videoRef}
      />
      
      <div className="relative z-[2] flex items-center justify-between h-full w-full px-8 md:px-16">
        <StyleContent
          title={style.title}
          description={style.description}
          isHovered={isHovered}
          features={style.features}
        />
        
        <StyleActions
          onSelect={() => onStyleSelect(style.id as VideoStyle)}
          features={style.features}
        />
      </div>
    </motion.div>
  );
};

export default StyleItem;