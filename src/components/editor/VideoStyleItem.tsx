import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { VideoStyle } from './VideoStyleSelector';

interface VideoStyleItemProps {
  style: {
    id: string;
    title: string;
    description: string;
    previewVideo: string;
    darkMode?: boolean;
  };
  isHovered: boolean;
  isMuted: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onStyleSelect: (style: VideoStyle) => void;
  onToggleMute: (e: React.MouseEvent) => void;
}

const VideoStyleItem = ({
  style,
  isHovered,
  isMuted,
  onMouseEnter,
  onMouseLeave,
  onStyleSelect,
  onToggleMute,
}: VideoStyleItemProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(error => {
          console.log('Video autoplay failed:', error);
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full [aspect-ratio:3.84/1] group cursor-pointer bg-editor-panel"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => onStyleSelect(style.id as VideoStyle)}
    >
      {/* Gray overlay that fades out on hover */}
      <motion.div 
        className="absolute inset-0 bg-editor-panel z-[1]"
        initial={{ opacity: 1 }}
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <video
        ref={videoRef}
        src={style.previewVideo}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
      />

      <AnimatePresence>
        {isHovered && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-8 right-8 z-20 p-2 rounded-full bg-editor-panel/50 hover:bg-editor-panel/70 transition-colors"
            onClick={onToggleMute}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-white" />
            ) : (
              <Volume2 className="w-6 h-6 text-white" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex items-center justify-between h-full w-full px-8 md:px-16">
        <div className="space-y-1">
          <motion.h2 
            className={`text-2xl md:text-3xl font-cinzel tracking-wider ${isHovered ? 'text-white' : 'text-white'}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {style.title}
          </motion.h2>
          <motion.p 
            className={`text-[8px] md:text-[10px] tracking-[0.2em] uppercase ${isHovered ? 'text-white/70' : 'text-gray-400'} font-italiana`}
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