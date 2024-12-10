import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadStart = () => setIsLoading(true);
    const handleLoadedData = () => setIsLoading(false);
    const handleError = (error: ErrorEvent) => {
      setHasError(true);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Video Error",
        description: "Failed to load video. Please try again later."
      });
      console.error('Video loading error:', error);
    };

    videoElement.addEventListener('loadstart', handleLoadStart);
    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('error', handleError);

    if (isHovered) {
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('Video autoplay failed:', error);
          setHasError(true);
        });
      }
    } else {
      videoElement.pause();
      videoElement.currentTime = 0;
    }

    return () => {
      videoElement.removeEventListener('loadstart', handleLoadStart);
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('error', handleError);
    };
  }, [isHovered, toast]);

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full"
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
              </div>
            )}
            
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover opacity-70"
              src={style.previewVideo}
              loop
              playsInline
              muted={isMuted}
              preload="metadata"
              poster={`https://api.lovable.ai/thumbnail?url=${encodeURIComponent(style.previewVideo)}`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex items-center justify-between h-full w-full px-4">
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

      {isHovered && !hasError && (
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