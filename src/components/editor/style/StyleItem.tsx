import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { VideoStyle } from '@/types/video';
import { useToast } from "@/components/ui/use-toast";

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
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const { toast } = useToast();

  const handleVideoPlay = useCallback(async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setVideoError(false);
      } catch (error) {
        console.log('Video autoplay failed:', error);
        setVideoError(true);
        toast({
          variant: "destructive",
          title: "Video Playback Error",
          description: "Failed to play the preview video. Please try again.",
        });
      }
    }
  }, [toast]);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered && !videoError) {
        handleVideoPlay();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, handleVideoPlay, videoError]);

  const handleSelect = () => {
    const videoStyle: VideoStyle = {
      id: style.id,
      name: style.title,
      description: style.description,
      thumbnail: style.previewVideo,
      videoUrl: style.previewVideo
    };
    onStyleSelect(videoStyle);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full [aspect-ratio:3.84/1] group cursor-pointer bg-editor-panel isolate overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleSelect}
      key={style.id}
    >
      <div className="absolute inset-0 z-[1] bg-editor-panel" />
      <div className="absolute inset-0 z-[2] bg-[url('/grid.svg')] opacity-5" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-[3]"
      >
        <video
          ref={videoRef}
          src={style.previewVideo}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          preload="metadata"
        />
      </motion.div>
      
      <div className="absolute inset-0 z-[4] bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      
      <div className="absolute inset-0 z-[5] flex items-center justify-between h-full w-full px-8 md:px-16">
        <div className="space-y-4">
          <motion.h2 
            className="text-2xl md:text-3xl font-['Montserrat'] font-bold tracking-wider uppercase text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {style.title}
          </motion.h2>
          <motion.p 
            className="text-sm md:text-base font-['Montserrat'] font-light tracking-wide text-white/70 max-w-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {style.description}
          </motion.p>

          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <p className="text-sm text-white/90 font-medium">Key Features:</p>
              <ul className="list-disc list-inside space-y-1">
                {style.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="text-sm text-white/70">{feature}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="self-center"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelect();
              }}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white rounded-lg transition-all duration-300 hover:border-purple-500/30"
            >
              Select Style
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default StyleItem;