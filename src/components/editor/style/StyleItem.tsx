import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { VideoStyle } from '@/types/video';
import { useToast } from "@/components/ui/use-toast";
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

  // Map style IDs to video URLs
  const getVideoUrl = (styleId: string) => {
    switch (styleId) {
      case 'classic':
        return "https://www.dropbox.com/scl/fi/6qe8m4ab7nzjj14ne0h6u/CLASSIC-LONG-OK-OK.mp4?raw=1";
      case 'modern':
        return "https://www.dropbox.com/scl/fi/ng9ndcl10lcownk1mtx4g/CINEMATOGRAFICO-LONG-OK.mp4?raw=1";
      case 'documentary':
        return "https://www.dropbox.com/scl/fi/rxab2rc98t7ox9hxcrb4b/251219_Urban-Couple-Photoshoot-Photography_By_Azulroto_Artlist_4K.mp4?raw=1";
      case 'dynamic':
        return "https://www.dropbox.com/scl/fi/m75wtfagul3ui9qbi996b/DINAMICO-OK.mp4?raw=1";
      default:
        return style.previewVideo;
    }
  };

  const handleSelect = () => {
    const videoStyle: VideoStyle = {
      id: style.id,
      name: style.title,
      description: style.description,
      thumbnail: style.previewVideo,
      videoUrl: getVideoUrl(style.id)
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
    >
      <div className="absolute inset-0 z-[1] bg-editor-panel" />
      <div className="absolute inset-0 z-[2] bg-[url('/grid.svg')] opacity-5" />
      
      <StylePreview
        videoUrl={getVideoUrl(style.id)}
        isHovered={isHovered}
        videoRef={videoRef}
        onError={() => setVideoError(true)}
      />
      
      <div className="absolute inset-0 z-[4] bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      
      <div className="absolute inset-0 z-[5] flex items-center justify-between h-full w-full px-8 md:px-16">
        <StyleContent
          title={style.title}
          description={style.description}
          isHovered={isHovered}
          features={style.features}
        />

        {isHovered && <StyleActions onSelect={handleSelect} />}
      </div>
    </motion.div>
  );
};

export default StyleItem;