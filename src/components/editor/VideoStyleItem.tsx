import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Volume2, VolumeX } from 'lucide-react';

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
  onStyleSelect: () => void;
  onToggleMute: (e: React.MouseEvent) => void;
}

const VideoStyleItem: React.FC<VideoStyleItemProps> = ({
  style,
  isHovered,
  isMuted,
  onMouseEnter,
  onMouseLeave,
  onStyleSelect,
  onToggleMute,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative aspect-[2.26/1] group cursor-pointer w-full bg-black"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onStyleSelect}
    >
      <div className="absolute inset-0 bg-black/40 z-[1]" />
      
      <video
        src={style.previewVideo}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
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
            className="absolute top-8 right-8 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
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
        <div className="space-y-2">
          <motion.h2 
            className="text-4xl md:text-5xl font-cinzel tracking-wider text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {style.title}
          </motion.h2>
          <motion.p 
            className="text-sm md:text-base tracking-[0.2em] uppercase text-gray-400 font-italiana"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {style.description}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.4
          }}
        >
          <Button 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white/10 uppercase tracking-wider text-xs md:text-sm px-6 py-6"
          >
            EXPLORE
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VideoStyleItem;