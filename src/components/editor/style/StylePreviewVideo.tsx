import React from 'react';
import { motion } from 'framer-motion';

interface StylePreviewVideoProps {
  videoUrl: string;
  isHovered: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
}

const StylePreviewVideo = ({ videoUrl, isHovered, videoRef }: StylePreviewVideoProps) => {
  return (
    <div className="absolute inset-0 z-[3]">
      <motion.div 
        className="absolute inset-0 bg-editor-panel"
        initial={{ opacity: 1 }}
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 w-full h-full"
      >
        <video
          ref={videoRef}
          src={videoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          preload="auto"
        />
      </motion.div>
    </div>
  );
};

export default StylePreviewVideo;