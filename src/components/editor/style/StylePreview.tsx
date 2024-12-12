import React from 'react';
import { motion } from 'framer-motion';

interface StylePreviewProps {
  videoUrl: string;
  isHovered: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  onError: () => void;
}

const StylePreview = ({ videoUrl, isHovered, videoRef, onError }: StylePreviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovered ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-[3]"
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        playsInline
        preload="metadata"
        onError={onError}
      />
    </motion.div>
  );
};

export default StylePreview;