import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface VideoStyleItemProps {
  style: {
    id: string;
    title: string;
    description: string;
    previewVideo: string;
    darkMode: boolean;
  };
  isHovered: boolean;
  isMuted: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onStyleSelect: () => void;
  onToggleMute: (e: React.MouseEvent) => void;
}

const VideoStyleItem = ({
  style,
  isHovered,
  isMuted,
  onMouseEnter,
  onMouseLeave,
  onStyleSelect,
  onToggleMute
}: VideoStyleItemProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video playback on hover
  React.useEffect(() => {
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
      className="relative h-[60vh] group cursor-pointer w-full bg-black"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onStyleSelect}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.video
            ref={videoRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full object-cover"
            src={style.previewVideo}
            loop
            muted={isMuted}
            playsInline
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex items-center justify-between h-full px-96 max-w-[2400px] mx-auto w-full">
        <div className="space-y-1">
          <motion.h2 
            className="text-3xl font-cinzel tracking-wider text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {style.title}
          </motion.h2>
          <motion.p 
            className="text-xs tracking-[0.2em] uppercase text-gray-400 font-italiana"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {style.description}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            variant="outline" 
            className="border border-white text-white hover:bg-white/10 uppercase tracking-wider text-xs"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/explore/${style.id}`;
            }}
          >
            EXPLORE
          </Button>
        </motion.div>
      </div>

      {isHovered && (
        <button
          onClick={onToggleMute}
          className="absolute bottom-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}
    </motion.div>
  );
};

export default VideoStyleItem;