import React, { useState, useRef, useEffect } from 'react';
import { VideoStyle } from '@/types/video';
import { motion } from 'framer-motion';
import StyleContent from './StyleContent';
import StyleActions from './StyleActions';
import { useToast } from '@/components/ui/use-toast';

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

const StyleItem = ({ style, onStyleSelect }: StyleItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Video autoplay failed:', error);
          });
        }
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  const handleSelect = () => {
    const videoStyle: VideoStyle = {
      id: style.id,
      name: style.title,
      description: style.description,
      thumbnail: style.previewVideo,
      videoUrl: style.previewVideo
    };
    onStyleSelect(videoStyle);
    toast({
      title: "Style Selected",
      description: `${style.title} style has been selected.`,
    });
  };

  return (
    <div
      className="relative w-full [aspect-ratio:3.84/1] group cursor-pointer bg-editor-panel isolate overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleSelect}
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
        <StyleContent
          title={style.title}
          description={style.description}
          isHovered={isHovered}
          features={style.features}
        />
        {isHovered && <StyleActions onSelect={handleSelect} />}
      </div>
    </div>
  );
};

export default StyleItem;