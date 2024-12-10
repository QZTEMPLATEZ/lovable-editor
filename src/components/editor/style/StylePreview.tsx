import React from 'react';
import { motion } from 'framer-motion';

interface StylePreviewProps {
  videoUrl: string;
  isHovered: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
}

const StylePreview = ({ videoUrl, isHovered, videoRef }: StylePreviewProps) => {
  return (
    <>
      <motion.div 
        className="absolute inset-0 bg-editor-panel z-[1]"
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
          playsInline
          preload="metadata"
        />
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </motion.div>
    </>
  );
};

export default StylePreview;